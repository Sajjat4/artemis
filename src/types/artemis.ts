export type AgentProfile = 'flash' | 'pro';

export type TaskStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

export interface BoundingBox {
  index: number;
  label: string;
  className?: string;
  resourceId?: string;
  bounds: [number, number, number, number]; // [x1, y1, x2, y2] percentages 0..100
  clickable?: boolean;
}

export interface AgentStep {
  stepId: string;
  stepNumber: number;
  timestamp: number;
  agentRole: 'Operator' | 'Explorer' | 'Checker' | 'Planner' | 'Validator' | 'Diagnoser';
  thought: string;
  planExcerpt?: string;
  actionTaken: {
    action: string;
    params?: Record<string, any>;
    targetIndex?: number;
    targetLabel?: string;
    targetCoordinates?: [number, number];
  };
  executionResult: {
    status: 'success' | 'blocked' | 'recovered' | 'failed';
    summary: string;
    durationMs: number;
    error?: string;
  };
  screenState: {
    app: string;
    screenTitle: string;
    viewType: 'maps' | 'youtube' | 'settings' | 'messages' | 'chrome' | 'home';
    elementBoxes: BoundingBox[];
    screenshotUrl?: string;
  };
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface Session {
  id: string;
  goal: string;
  profile: AgentProfile;
  status: TaskStatus;
  startTime: number;
  endTime?: number;
  steps: AgentStep[];
  videoUrl?: string;
  currentStepIndex: number;
  metrics: {
    totalTokens: number;
    cachedTokens: number;
    totalDurationMs: number;
    successRate: number;
    actionsExecuted: number;
  };
}

export interface DeviceInfo {
  serial: string;
  model: string;
  product: string;
  androidVersion: string;
  resolution: string;
  batteryLevel: number;
  isCharging: boolean;
  isLocked: boolean;
  wifiConnected: boolean;
  ipAddress: string;
  fps: number;
  a11yHelperInstalled: boolean;
  a11yHelperActive: boolean;
}

export interface ProbeResult {
  id: string;
  category: 'device' | 'auth' | 'toolchain' | 'runtime';
  title: string;
  status: 'pass' | 'warn' | 'fail';
  isBlocker: boolean;
  summary: string;
  description: string;
  actionLabel?: string;
}

export interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  goal: string;
  profile: AgentProfile;
  category: 'navigation' | 'media' | 'system' | 'cross_app' | 'benchmark';
  tag: string;
  apps: {
    name: string;
    pkg: string;
    icon: string;
  }[];
  expectedSteps: number;
}
