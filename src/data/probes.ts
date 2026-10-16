import { ProbeResult, DeviceInfo } from '../types/artemis';

export const INITIAL_DEVICE: DeviceInfo = {
  serial: 'emulator-5554',
  model: 'Pixel 9 Pro (Android AVD)',
  product: 'cuttlefish_x86_64',
  androidVersion: 'Android 15 (API 35)',
  resolution: '1344 x 2992 (480 dpi)',
  batteryLevel: 98,
  isCharging: true,
  isLocked: false,
  wifiConnected: true,
  ipAddress: '127.0.0.1:5555',
  fps: 60,
  a11yHelperInstalled: true,
  a11yHelperActive: true,
};

export const INITIAL_PROBES: ProbeResult[] = [
  {
    id: 'adb_daemon',
    category: 'device',
    title: 'Android Debug Bridge (ADB)',
    status: 'pass',
    isBlocker: true,
    summary: 'ADB server connected on 127.0.0.1:5037',
    description: 'Device emulator-5554 recognized and authorized with USB debugging active.',
    actionLabel: 'Check Devices'
  },
  {
    id: 'a11y_helper',
    category: 'runtime',
    title: 'Artemis Accessibility Helper',
    status: 'pass',
    isBlocker: true,
    summary: 'com.artemis.helper v1.2.0 active',
    description: 'Zero-overhead accessibility service installed, providing instant UI hierarchy dumps and coordinate tap execution under 15ms.',
    actionLabel: 'Verify Service'
  },
  {
    id: 'scrcpy_stream',
    category: 'toolchain',
    title: 'Screen Mirroring & Streamer',
    status: 'pass',
    isBlocker: false,
    summary: 'H.264 live stream at 60 FPS active',
    description: 'Real-time low-latency frame pipeline operational on display buffer 0.',
    actionLabel: 'Stream Settings'
  },
  {
    id: 'llm_gateway',
    category: 'auth',
    title: 'Multimodal LLM Provider Gateway',
    status: 'pass',
    isBlocker: true,
    summary: 'Gemini 2.5 Flash / Pro Multimodal API Ready',
    description: 'Native vision + text endpoint authorized with zero latency token metering enabled.',
    actionLabel: 'Configure API Key'
  },
  {
    id: 'mcp_server',
    category: 'runtime',
    title: 'Model Context Protocol (MCP) Server',
    status: 'pass',
    isBlocker: false,
    summary: 'IDE Tool Server listening on stdio / HTTP',
    description: 'Antigravity, Cursor, and Windsurf IDE hooks mounted for device automation and Logcat diagnostics.',
    actionLabel: 'Mount IDE Tools'
  },
  {
    id: 'video_recorder',
    category: 'toolchain',
    title: 'Hardware Video Capture & Audio Recorder',
    status: 'pass',
    isBlocker: false,
    summary: 'FFmpeg Screen Recorder standby',
    description: 'Capture synchronized MP4 runs with step-aligned keyframe metadata.',
    actionLabel: 'Replay Cache'
  }
];
