import { SmartSuggestion } from '../types/artemis';

export const SMART_TASK_LIBRARY: SmartSuggestion[] = [
  {
    id: 'maps_youtube_demo',
    title: 'Maps Route ETA & YouTube Music',
    description: 'Calculate driving route to SFO on Maps, then launch YouTube and play Coldplay',
    goal: 'Open Google Maps, search for "San Francisco International Airport", calculate driving ETA, then open YouTube and play Coldplay - Yellow.',
    profile: 'flash',
    category: 'cross_app',
    tag: 'Maps + YouTube',
    apps: [
      { name: 'Maps', pkg: 'com.google.android.apps.maps', icon: 'map-pin' },
      { name: 'YouTube', pkg: 'com.google.android.youtube', icon: 'play-square' }
    ],
    expectedSteps: 5
  },
  {
    id: 'maps_coffee',
    title: 'Find Specialty Coffee Nearby',
    description: 'Search nearby top-rated cafes in Google Maps and inspect reviews',
    goal: 'Open Google Maps, search for top-rated specialty coffee shops nearby, view the first result, and check opening hours.',
    profile: 'flash',
    category: 'navigation',
    tag: 'Google Maps',
    apps: [{ name: 'Maps', pkg: 'com.google.android.apps.maps', icon: 'map-pin' }],
    expectedSteps: 4
  },
  {
    id: 'pro_commute_share',
    title: 'Commute ETA & SMS Share',
    description: 'Check transit time on Maps and draft arrival ETA in Messages',
    goal: 'Open Google Maps to check commute time to Downtown Station, calculate arrival time, then open Messages and draft an ETA message to Alice.',
    profile: 'pro',
    category: 'cross_app',
    tag: 'Maps + Messages',
    apps: [
      { name: 'Maps', pkg: 'com.google.android.apps.maps', icon: 'map-pin' },
      { name: 'Messages', pkg: 'com.google.android.apps.messaging', icon: 'message-square' }
    ],
    expectedSteps: 7
  },
  {
    id: 'youtube_search_play',
    title: 'YouTube Coldplay Song Playback',
    description: 'Search for Coldplay live concert performance and play video',
    goal: 'Open YouTube app, search for "Coldplay Viva La Vida Live", select the official video, and start playback.',
    profile: 'flash',
    category: 'media',
    tag: 'YouTube',
    apps: [{ name: 'YouTube', pkg: 'com.google.android.youtube', icon: 'play-square' }],
    expectedSteps: 4
  },
  {
    id: 'settings_dark_mode_wifi',
    title: 'Toggle Dark Theme & Wi-Fi Check',
    description: 'Navigate Android Settings, toggle dark theme and verify Wi-Fi state',
    goal: 'Open Settings, navigate to Display settings, toggle Dark Theme switch to ON, then return to Network & Internet and verify Wi-Fi status.',
    profile: 'flash',
    category: 'system',
    tag: 'System Settings',
    apps: [{ name: 'Settings', pkg: 'com.android.settings', icon: 'settings' }],
    expectedSteps: 5
  },
  {
    id: 'pro_stability_exploration',
    title: 'Deep UI Stability & Accessibility Audit',
    description: 'Pro exploratory agent crawls app hierarchy, tests edge gestures, and reports bugs',
    goal: 'Perform deep UI exploration across system apps, verify accessibility bounds on all clickable elements, stress test gesture resilience, and generate diagnostic report.',
    profile: 'pro',
    category: 'benchmark',
    tag: 'AndroidWorld SOTA',
    apps: [
      { name: 'Settings', pkg: 'com.android.settings', icon: 'settings' },
      { name: 'Chrome', pkg: 'com.android.chrome', icon: 'globe' }
    ],
    expectedSteps: 8
  },
  {
    id: 'chrome_research',
    title: 'Chrome Multimodal AI Research',
    description: 'Search latest multimodal AI agents on Chrome and summarize headlines',
    goal: 'Open Chrome browser, search for "autonomous mobile agent multimodal Android", click the top article, and extract key findings.',
    profile: 'flash',
    category: 'navigation',
    tag: 'Chrome Browser',
    apps: [{ name: 'Chrome', pkg: 'com.android.chrome', icon: 'globe' }],
    expectedSteps: 4
  }
];
