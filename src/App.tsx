import React, { useState, useEffect, useRef } from 'react';
import { AgentProfile, TaskStatus, Session, AgentStep, BoundingBox, SmartSuggestion } from './types/artemis';
import { Navbar } from './components/Navbar';
import { DeviceViewport } from './components/DeviceViewport';
import { AgentStream } from './components/AgentStream';
import { FloatingDock } from './components/FloatingDock';
import { SmartTasksCatalog } from './components/SmartTasksCatalog';
import { DiagnosticsView } from './components/DiagnosticsView';
import { TraceInspector } from './components/TraceInspector';
import { SettingsModal } from './components/SettingsModal';
import { createStepsForTask } from './utils/taskExecutionEngine';

export const App: React.FC = () => {
  // Navigation & UI States
  const [currentView, setCurrentView] = useState<'workspace' | 'catalog' | 'diagnostics' | 'trace' | 'phone_only'>('workspace');
  const [profile, setProfile] = useState<AgentProfile>('flash');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('Open Google Maps, find SFO driving ETA, then open YouTube and play Coldplay');

  // Phone App States
  const [currentApp, setCurrentApp] = useState<'home' | 'maps' | 'youtube' | 'settings' | 'messages' | 'chrome'>('home');
  const [mapsQuery, setMapsQuery] = useState('SFO Airport');
  const [mapsHasRoute, setMapsHasRoute] = useState(false);
  const [youtubeQuery, setYoutubeQuery] = useState('Coldplay - Viva La Vida');
  const [youtubeIsPlaying, setYoutubeIsPlaying] = useState(false);
  const [messagesDraft, setMessagesDraft] = useState('Hey Alice! Maps says ETA is 24 min (arriving around 8:25 PM)');
  const [messagesSent, setMessagesSent] = useState(false);
  const [activeTapPoint, setActiveTapPoint] = useState<[number, number] | null>(null);

  // Active Session & Execution States
  const [session, setSession] = useState<Session>({
    id: 'artemis_sess_9021',
    goal: 'Open Google Maps, find SFO driving ETA, then open YouTube and play Coldplay',
    profile: 'flash',
    status: 'idle',
    startTime: Date.now(),
    steps: [],
    currentStepIndex: 0,
    metrics: {
      totalTokens: 0,
      cachedTokens: 0,
      totalDurationMs: 0,
      successRate: 100,
      actionsExecuted: 0,
    },
  });

  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  // Execution Timer Ref
  const plannedStepsRef = useRef<AgentStep[]>([]);
  const stepTimerRef = useRef<any>(null);

  // Handle Starting a Task
  const handleStartTask = (prompt: string, taskProfile: AgentProfile) => {
    // Generate planned steps
    const planned = createStepsForTask(prompt, taskProfile);
    plannedStepsRef.current = planned;

    // Reset phone state
    setCurrentApp('home');
    setMapsHasRoute(false);
    setYoutubeIsPlaying(false);
    setMessagesSent(false);

    // Update Session
    const newSession: Session = {
      id: `artemis_sess_${Math.floor(1000 + Math.random() * 9000)}`,
      goal: prompt,
      profile: taskProfile,
      status: 'running',
      startTime: Date.now(),
      steps: [],
      currentStepIndex: 0,
      metrics: {
        totalTokens: 0,
        cachedTokens: 0,
        totalDurationMs: 0,
        successRate: 100,
        actionsExecuted: 0,
      },
    };

    setSession(newSession);
    setSelectedStepIndex(0);
    setCurrentView('workspace');

    // Run execution loop step-by-step
    executeNextStep(0, planned, newSession);
  };

  const executeNextStep = (stepIdx: number, allPlanned: AgentStep[], currentSess: Session) => {
    if (stepIdx >= allPlanned.length) {
      // Completed all steps!
      setSession((prev) => ({
        ...prev,
        status: 'completed',
        endTime: Date.now(),
      }));
      return;
    }

    const step = allPlanned[stepIdx];

    // Trigger tap indicator if coordinates exist
    if (step.actionTaken.targetCoordinates) {
      setActiveTapPoint(step.actionTaken.targetCoordinates);
      setTimeout(() => setActiveTapPoint(null), 800);
    }

    // Update App State corresponding to step
    if (step.screenState.viewType) {
      setCurrentApp(step.screenState.viewType);
    }

    if (step.screenState.viewType === 'maps' && step.stepNumber >= 2) {
      setMapsHasRoute(true);
    }
    if (step.screenState.viewType === 'youtube' && step.stepNumber >= 4) {
      setYoutubeIsPlaying(true);
    }
    if (step.screenState.viewType === 'messages' && step.stepNumber >= 3) {
      setMessagesSent(true);
    }

    // Append this step to session
    setSession((prev) => {
      const updatedSteps = [...prev.steps, step];
      const newTokens = prev.metrics.totalTokens + step.tokenUsage.totalTokens;
      return {
        ...prev,
        steps: updatedSteps,
        currentStepIndex: stepIdx,
        metrics: {
          ...prev.metrics,
          totalTokens: newTokens,
          actionsExecuted: updatedSteps.length,
          totalDurationMs: prev.metrics.totalDurationMs + step.executionResult.durationMs,
        },
      };
    });

    setSelectedStepIndex(stepIdx);

    // Schedule next step (approx 2.5s delay to simulate real ADB & vision latency)
    const delay = profile === 'flash' ? 2200 : 3200;
    stepTimerRef.current = setTimeout(() => {
      executeNextStep(stepIdx + 1, allPlanned, currentSess);
    }, delay);
  };

  // Stop current execution
  const handleStopTask = () => {
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
    }
    setSession((prev) => ({
      ...prev,
      status: 'paused',
    }));
  };

  // Handle Preset Task Selection
  const handleSelectPreset = (task: SmartSuggestion) => {
    setCommandInput(task.goal);
    setProfile(task.profile);
    handleStartTask(task.goal, task.profile);
  };

  // User Tap on Screen (Direct Manual Interaction)
  const handleUserTap = (x: number, y: number) => {
    setActiveTapPoint([x, y]);
    setTimeout(() => setActiveTapPoint(null), 500);

    // If on home screen, tap near apps opens them
    if (currentApp === 'home') {
      if (y > 45 && y < 65) {
        if (x < 25) setCurrentApp('maps');
        else if (x < 50) setCurrentApp('youtube');
        else if (x < 75) setCurrentApp('chrome');
        else setCurrentApp('messages');
      }
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, []);

  // Compute active bounding boxes
  const activeStep = session.steps[selectedStepIndex];
  const activeBoxes: BoundingBox[] = activeStep?.screenState.elementBoxes || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        profile={profile}
        onProfileChange={setProfile}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main App Body */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Dynamic Aurora Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] aurora-glow-1" />
        <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] aurora-glow-2" />

        {/* 1. WORKSPACE VIEW (Dual Pane: Phone Live Stream + Agent Stream + Floating Dock) */}
        {currentView === 'workspace' && (
          <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 max-w-[1600px] w-full mx-auto overflow-hidden">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden pb-4">
              {/* Left Pane: Device Viewport (Android Phone Live Stream) */}
              <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center h-full min-h-[480px]">
                <DeviceViewport
                  currentApp={currentApp}
                  onAppChange={setCurrentApp}
                  boundingBoxes={activeBoxes}
                  activeTapPoint={activeTapPoint}
                  onUserTap={handleUserTap}
                  mapsQuery={mapsQuery}
                  mapsHasRoute={mapsHasRoute}
                  youtubeQuery={youtubeQuery}
                  youtubeIsPlaying={youtubeIsPlaying}
                  messagesDraft={messagesDraft}
                  messagesSent={messagesSent}
                />
              </div>

              {/* Right Pane: Agent Autonomous Stream & Thought Capsules */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full min-h-[480px] overflow-hidden">
                <AgentStream
                  steps={session.steps}
                  goal={session.goal}
                  profile={profile}
                  status={session.status}
                  currentStepIndex={session.currentStepIndex}
                  totalTokens={session.metrics.totalTokens}
                  selectedStepIndex={selectedStepIndex}
                  onSelectStep={setSelectedStepIndex}
                />
              </div>
            </div>

            {/* Bottom Floating Command Bar Dock */}
            <div className="pt-2">
              <FloatingDock
                inputPrompt={commandInput}
                onInputChange={setCommandInput}
                onSubmit={handleStartTask}
                onStop={handleStopTask}
                status={session.status}
                profile={profile}
                onProfileChange={setProfile}
              />
            </div>
          </div>
        )}

        {/* 2. SMART TASKS CATALOG VIEW */}
        {currentView === 'catalog' && (
          <div className="flex-1 overflow-y-auto">
            <SmartTasksCatalog
              onSelectTask={handleSelectPreset}
              selectedProfile={profile}
            />
          </div>
        )}

        {/* 3. DIAGNOSTICS & SYSTEM SETUP VIEW */}
        {currentView === 'diagnostics' && (
          <div className="flex-1 overflow-y-auto">
            <DiagnosticsView />
          </div>
        )}

        {/* 4. TRACE & AUDIT REPLAY INSPECTOR */}
        {currentView === 'trace' && (
          <div className="flex-1 overflow-y-auto">
            <TraceInspector
              session={session}
              selectedStepIndex={selectedStepIndex}
              onSelectStep={setSelectedStepIndex}
            />
          </div>
        )}

        {/* 5. PHONE ONLY VIEW (Focus Mobile View) */}
        {currentView === 'phone_only' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <DeviceViewport
              currentApp={currentApp}
              onAppChange={setCurrentApp}
              boundingBoxes={activeBoxes}
              activeTapPoint={activeTapPoint}
              onUserTap={handleUserTap}
              mapsQuery={mapsQuery}
              mapsHasRoute={mapsHasRoute}
              youtubeQuery={youtubeQuery}
              youtubeIsPlaying={youtubeIsPlaying}
              messagesDraft={messagesDraft}
              messagesSent={messagesSent}
            />
          </div>
        )}
      </main>

      {/* Engine Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
