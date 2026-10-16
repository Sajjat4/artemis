# ARTEMIS — Autonomous Mobile Agent Platform

<p align="center">
  <img src="./public/logo.svg" alt="ARTEMIS Logo" width="120" />
</p>

<p align="center">
  <strong>Autonomous mobile agent platform for Android test automation, execution, and diagnostics.</strong>
</p>

## Overview

ARTEMIS empowers AI assistants, test suites, and autonomous workflows to navigate and test real Android phones like a human. This project provides a full-featured, interactive control plane with:

- **Dual-Pane Live Studio Workspace**: Real-time interactive Android Phone stream alongside the Autonomous Agent Stream with thought reasoning, step capsules, and telemetry.
- **Flash vs Pro Architectures**:
  - **Flash Mode**: Fast, single-look reactive steps (3–5s per step) for everyday mobile tasks.
  - **Pro Mode**: Hierarchical planning with pre-action verification, blocked action recovery, and diagnostic reporting.
- **Multimodal Element Bounding Box Overlay**: Inspect indexed interactive UI elements with resource IDs, class names, bounds, and tap coordinates.
- **Curated Smart Task Library**: Pre-validated tasks across Google Maps (directions, ETA), YouTube (search, playback), Android System Settings (Wi-Fi, Bluetooth, Dark Theme), Messages (RCS draft & dispatch), and Chrome.
- **Interactive Phone Simulation**: Functional Google Maps, YouTube video player, Android Settings, and SMS Messenger.
- **Diagnostic Probes & MCP Integration**: System probes checking ADB daemon, Accessibility Helper (`com.artemis.helper`), screen stream pipeline, and Model Context Protocol (MCP) server hooks for AI IDEs (Antigravity, Cursor, Windsurf, Claude Code).
- **Trace & Audit Inspector**: Timeline scrubber, step-by-step state inspection, and raw JSON export.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

Apache License 2.0
