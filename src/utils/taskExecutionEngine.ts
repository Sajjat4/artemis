import { AgentStep, AgentProfile, BoundingBox } from '../types/artemis';

export function createStepsForTask(
  goal: string,
  profile: AgentProfile
): AgentStep[] {
  const lower = goal.toLowerCase();

  // 1. Maps + YouTube demo scenario (Coldplay & SFO)
  if (lower.includes('youtube') && (lower.includes('map') || lower.includes('sfo') || lower.includes('coldplay'))) {
    return [
      {
        stepId: 'step_1',
        stepNumber: 1,
        timestamp: Date.now(),
        agentRole: 'Operator',
        thought: 'Task requires driving directions on Google Maps followed by Coldplay playback on YouTube. I need to launch Google Maps from the home screen.',
        planExcerpt: profile === 'pro' ? '1. Launch Maps -> 2. Search SFO & calculate route -> 3. Switch to YouTube -> 4. Play Coldplay' : undefined,
        actionTaken: {
          action: 'launch_app(pkg="com.google.android.apps.maps")',
          targetIndex: 1,
          targetLabel: 'Maps',
          targetCoordinates: [18, 55],
        },
        executionResult: {
          status: 'success',
          summary: 'Started Activity com.google.android.apps.maps/com.google.android.maps.MapsActivity',
          durationMs: 420,
        },
        screenState: {
          app: 'Google Maps',
          screenTitle: 'Explore Nearby',
          viewType: 'maps',
          elementBoxes: [
            { index: 1, label: 'Search here', bounds: [5, 3, 95, 9], clickable: true },
            { index: 2, label: 'Explore Tab', bounds: [10, 90, 30, 96], clickable: true },
            { index: 3, label: 'Commute Tab', bounds: [40, 90, 60, 96], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1140, completionTokens: 180, totalTokens: 1320 },
      },
      {
        stepId: 'step_2',
        stepNumber: 2,
        timestamp: Date.now() + 1500,
        agentRole: 'Operator',
        thought: 'Google Maps is open. I will tap the search bar [1] and type "San Francisco International Airport (SFO)".',
        actionTaken: {
          action: 'input_text(text="San Francisco International Airport", press_enter=true)',
          targetIndex: 1,
          targetLabel: 'Search here',
          targetCoordinates: [50, 6],
        },
        executionResult: {
          status: 'success',
          summary: 'IME input committed and search route query dispatched via ADB',
          durationMs: 380,
        },
        screenState: {
          app: 'Google Maps',
          screenTitle: 'Route to SFO Airport',
          viewType: 'maps',
          elementBoxes: [
            { index: 1, label: 'SFO International Airport', bounds: [5, 3, 95, 9], clickable: true },
            { index: 2, label: 'Directions (24 min, 14.8 mi)', bounds: [10, 75, 90, 95], clickable: true },
            { index: 3, label: 'Start Navigation', bounds: [15, 85, 65, 92], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1420, completionTokens: 210, totalTokens: 1630 },
      },
      {
        stepId: 'step_3',
        stepNumber: 3,
        timestamp: Date.now() + 3000,
        agentRole: 'Operator',
        thought: 'Route calculated: 24 min (14.8 mi via US-101 S). First phase complete. Now launching YouTube to play Coldplay.',
        planExcerpt: profile === 'pro' ? 'Verify route ETA settlement -> Transition to YouTube' : undefined,
        actionTaken: {
          action: 'launch_app(pkg="com.google.android.youtube")',
          targetIndex: 4,
          targetLabel: 'YouTube',
          targetCoordinates: [82, 55],
        },
        executionResult: {
          status: 'success',
          summary: 'Brought YouTube activity to front',
          durationMs: 490,
        },
        screenState: {
          app: 'YouTube',
          screenTitle: 'YouTube Home',
          viewType: 'youtube',
          elementBoxes: [
            { index: 1, label: 'Search bar', bounds: [45, 2, 85, 7], clickable: true },
            { index: 2, label: 'Trending Feed', bounds: [5, 10, 95, 50], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1510, completionTokens: 195, totalTokens: 1705 },
      },
      {
        stepId: 'step_4',
        stepNumber: 4,
        timestamp: Date.now() + 4500,
        agentRole: 'Operator',
        thought: 'YouTube is active. I will search for "Coldplay - Viva La Vida" and tap the first official live concert video.',
        actionTaken: {
          action: 'tap_element(index=2, label="Coldplay - Viva La Vida (Live)")',
          targetIndex: 2,
          targetLabel: 'Coldplay Live',
          targetCoordinates: [50, 25],
        },
        executionResult: {
          status: 'success',
          summary: 'Video playback started; audio/video stream validated',
          durationMs: 310,
        },
        screenState: {
          app: 'YouTube',
          screenTitle: 'Coldplay - Viva La Vida Playing',
          viewType: 'youtube',
          elementBoxes: [
            { index: 1, label: 'Video Player View', bounds: [0, 8, 100, 38], clickable: true },
            { index: 2, label: 'Subscribe Button', bounds: [70, 48, 95, 54], clickable: true },
            { index: 3, label: 'Like Button', bounds: [10, 42, 25, 46], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1620, completionTokens: 160, totalTokens: 1780 },
      },
      {
        stepId: 'step_5',
        stepNumber: 5,
        timestamp: Date.now() + 6000,
        agentRole: 'Checker',
        thought: 'Goal criteria fulfilled: driving route to SFO calculated (24 min) on Google Maps, and Coldplay live performance playing smoothly on YouTube.',
        actionTaken: {
          action: 'report_verdict(outcome="SUCCESS")',
        },
        executionResult: {
          status: 'success',
          summary: 'Task successfully completed with 100% accuracy',
          durationMs: 120,
        },
        screenState: {
          app: 'YouTube',
          screenTitle: 'Video Playing',
          viewType: 'youtube',
          elementBoxes: [],
        },
        tokenUsage: { promptTokens: 980, completionTokens: 110, totalTokens: 1090 },
      },
    ];
  }

  // 2. Settings Dark Mode & Wi-Fi
  if (lower.includes('settings') || lower.includes('dark') || lower.includes('wifi')) {
    return [
      {
        stepId: 'step_1',
        stepNumber: 1,
        timestamp: Date.now(),
        agentRole: 'Operator',
        thought: 'Task requires modifying System Settings: toggle Dark Theme and check Wi-Fi. Launching com.android.settings.',
        actionTaken: {
          action: 'launch_app(pkg="com.android.settings")',
          targetIndex: 5,
          targetLabel: 'Settings',
          targetCoordinates: [80, 55],
        },
        executionResult: {
          status: 'success',
          summary: 'Settings main dashboard opened',
          durationMs: 350,
        },
        screenState: {
          app: 'Settings',
          screenTitle: 'Android Settings',
          viewType: 'settings',
          elementBoxes: [
            { index: 1, label: 'Network & internet', bounds: [5, 14, 95, 22], clickable: true },
            { index: 2, label: 'Connected devices', bounds: [5, 23, 95, 31], clickable: true },
            { index: 3, label: 'Dark Theme Toggle', bounds: [75, 33, 95, 39], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1080, completionTokens: 150, totalTokens: 1230 },
      },
      {
        stepId: 'step_2',
        stepNumber: 2,
        timestamp: Date.now() + 1500,
        agentRole: 'Operator',
        thought: 'Dark Theme toggle identified at index [3]. Tapping switch to ensure dark theme is active.',
        actionTaken: {
          action: 'tap_element(index=3, label="Dark Theme Switch")',
          targetIndex: 3,
          targetCoordinates: [85, 36],
        },
        executionResult: {
          status: 'success',
          summary: 'Night mode configuration enabled via android.provider.Settings',
          durationMs: 290,
        },
        screenState: {
          app: 'Settings',
          screenTitle: 'Settings - Dark Theme On',
          viewType: 'settings',
          elementBoxes: [
            { index: 1, label: 'Wi-Fi Switch (Connected)', bounds: [75, 15, 95, 21], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1250, completionTokens: 140, totalTokens: 1390 },
      },
      {
        stepId: 'step_3',
        stepNumber: 3,
        timestamp: Date.now() + 3000,
        agentRole: 'Checker',
        thought: 'Dark theme verified enabled; Wi-Fi network GoogleGuest-5G verified online.',
        actionTaken: {
          action: 'report_verdict(outcome="SUCCESS")',
        },
        executionResult: {
          status: 'success',
          summary: 'Settings verification complete',
          durationMs: 110,
        },
        screenState: {
          app: 'Settings',
          screenTitle: 'Settings Finished',
          viewType: 'settings',
          elementBoxes: [],
        },
        tokenUsage: { promptTokens: 890, completionTokens: 90, totalTokens: 980 },
      },
    ];
  }

  // 3. Messages / Commute Share
  if (lower.includes('message') || lower.includes('sms') || lower.includes('alice') || lower.includes('share')) {
    return [
      {
        stepId: 'step_1',
        stepNumber: 1,
        timestamp: Date.now(),
        agentRole: 'Operator',
        thought: 'Opening Google Maps to retrieve commute duration.',
        actionTaken: {
          action: 'launch_app(pkg="com.google.android.apps.maps")',
          targetLabel: 'Maps',
          targetCoordinates: [18, 55],
        },
        executionResult: {
          status: 'success',
          summary: 'Maps opened and route computed: 24 min',
          durationMs: 400,
        },
        screenState: {
          app: 'Google Maps',
          screenTitle: 'Directions',
          viewType: 'maps',
          elementBoxes: [],
        },
        tokenUsage: { promptTokens: 1100, completionTokens: 160, totalTokens: 1260 },
      },
      {
        stepId: 'step_2',
        stepNumber: 2,
        timestamp: Date.now() + 1500,
        agentRole: 'Operator',
        thought: 'Commute time is 24 min. Launching Messages app to draft and send SMS to Alice.',
        actionTaken: {
          action: 'launch_app(pkg="com.google.android.apps.messaging")',
          targetLabel: 'Messages',
          targetCoordinates: [65, 55],
        },
        executionResult: {
          status: 'success',
          summary: 'Opened chat conversation with Alice Chen',
          durationMs: 380,
        },
        screenState: {
          app: 'Messages',
          screenTitle: 'Chat with Alice',
          viewType: 'messages',
          elementBoxes: [
            { index: 1, label: 'Message Composer', bounds: [5, 92, 85, 98], clickable: true },
            { index: 2, label: 'Send Button', bounds: [88, 92, 98, 98], clickable: true },
          ],
        },
        tokenUsage: { promptTokens: 1320, completionTokens: 175, totalTokens: 1495 },
      },
      {
        stepId: 'step_3',
        stepNumber: 3,
        timestamp: Date.now() + 3000,
        agentRole: 'Operator',
        thought: 'Drafting ETA message into composer: "Hey Alice! Maps says ETA is 24 min (arriving around 8:25 PM)" and tapping Send [2].',
        actionTaken: {
          action: 'tap_element(index=2, label="Send SMS")',
          targetIndex: 2,
          targetCoordinates: [92, 95],
        },
        executionResult: {
          status: 'success',
          summary: 'Message delivered via RCS protocol',
          durationMs: 320,
        },
        screenState: {
          app: 'Messages',
          screenTitle: 'Message Sent',
          viewType: 'messages',
          elementBoxes: [],
        },
        tokenUsage: { promptTokens: 1410, completionTokens: 130, totalTokens: 1540 },
      },
      {
        stepId: 'step_4',
        stepNumber: 4,
        timestamp: Date.now() + 4500,
        agentRole: 'Checker',
        thought: 'Message successfully sent to Alice. Task completed.',
        actionTaken: {
          action: 'report_verdict(outcome="SUCCESS")',
        },
        executionResult: {
          status: 'success',
          summary: 'Cross-app communication task finished',
          durationMs: 90,
        },
        screenState: {
          app: 'Messages',
          screenTitle: 'Done',
          viewType: 'messages',
          elementBoxes: [],
        },
        tokenUsage: { promptTokens: 800, completionTokens: 70, totalTokens: 870 },
      },
    ];
  }

  // Generic / Default Task (Chrome Research or General Automation)
  return [
    {
      stepId: 'step_1',
      stepNumber: 1,
      timestamp: Date.now(),
      agentRole: 'Operator',
      thought: `Parsing goal: "${goal}". Launching Chrome browser to investigate multimodal Android agents.`,
      actionTaken: {
        action: 'launch_app(pkg="com.android.chrome")',
        targetLabel: 'Chrome',
        targetCoordinates: [50, 55],
      },
      executionResult: {
        status: 'success',
        summary: 'Opened Chrome browser window',
        durationMs: 410,
      },
      screenState: {
        app: 'Chrome',
        screenTitle: 'Search Results',
        viewType: 'chrome',
        elementBoxes: [
          { index: 1, label: 'URL / Search bar', bounds: [5, 2, 85, 7], clickable: true },
          { index: 2, label: 'ARTEMIS GitHub Repository', bounds: [5, 12, 95, 30], clickable: true },
        ],
      },
      tokenUsage: { promptTokens: 1100, completionTokens: 160, totalTokens: 1260 },
    },
    {
      stepId: 'step_2',
      stepNumber: 2,
      timestamp: Date.now() + 1500,
      agentRole: 'Operator',
      thought: 'Top search result is ARTEMIS: 99%+ SOTA on AndroidWorld. Navigating and validating page contents.',
      actionTaken: {
        action: 'tap_element(index=2, label="ARTEMIS Repository")',
        targetIndex: 2,
        targetCoordinates: [50, 20],
      },
      executionResult: {
        status: 'success',
        summary: 'Page loaded and parsed by vision encoder',
        durationMs: 360,
      },
      screenState: {
        app: 'Chrome',
        screenTitle: 'ARTEMIS Documentation',
        viewType: 'chrome',
        elementBoxes: [],
      },
      tokenUsage: { promptTokens: 1350, completionTokens: 180, totalTokens: 1530 },
    },
    {
      stepId: 'step_3',
      stepNumber: 3,
      timestamp: Date.now() + 3000,
      agentRole: 'Checker',
      thought: 'Action sequence succeeded. Target information gathered.',
      actionTaken: {
        action: 'report_verdict(outcome="SUCCESS")',
      },
      executionResult: {
        status: 'success',
        summary: 'Autonomous task concluded with high fidelity',
        durationMs: 100,
      },
      screenState: {
        app: 'Chrome',
        screenTitle: 'Completed',
        viewType: 'chrome',
        elementBoxes: [],
      },
      tokenUsage: { promptTokens: 900, completionTokens: 95, totalTokens: 995 },
    },
  ];
}
