# PokeClaw (PocketClaw) — Local-First AI Phone Automation

<p align="center">
  <img src="pokeclaw-icon-light.png" width="96" alt="PokeClaw Logo" />
</p>

**PokeClaw (PocketClaw)** is a local-first AI phone automation agent harness. Originally designed for Android, this project has been rewritten as a high-fidelity React application, preserving all core features, automation tools, execution playbooks, model configurations, and authentic visual themes.

---

## 🌟 Ported Core Features

1. **Interactive Agent Chat & Task Runner**
   - **Dual Mode Execution**:
     - `Send`: Conversational dialogue with the assistant.
     - `🚀 Task`: Autonomous phone automation execution loop with step-by-step trace and animated status indicators.
   - **Live Task Steps Tree**: Real-time inspection of tool calls (`get_screen_info`, `find_and_tap`, `input_text`, `open_app`, `finish`).
   - **Interactive Virtual Device Companion**: Displays live screens (WhatsApp, Settings, YouTube, Home Launcher, Battery Info) with animated coordinate tap ripples and typed text as the agent executes actions.

2. **On-Device Models & LLM Harness (LiteRT-LM)**
   - **Quick Model Switcher Bottom Sheet**: Instant switching between active models.
   - **On-Device Models**:
     - `FunctionGemma 270M`: Mobile-actions specialist (289 MB).
     - `Qwen3 0.6B`: Lightweight conversational model (~300 MB).
     - `Gemma 3 1B INT4`: 4-bit quantized balanced model (~520 MB).
     - `Gemma 4 E2B-IT`: Capable LiteRT-LM tool calling model (2.6 GB).
   - **Model Storage Meter**: Visual allocation progress bar and download/delete simulator.
   - **Cloud LLM Support (BYOK)**: OpenAI (`gpt-4o`), Claude 3.5 Sonnet, Gemini 2.0 Flash, and custom OpenAI-compatible endpoints with temperature and base URL settings.

3. **Automation Tools Registry**
   - 20+ mobile and TV automation tools across 7 categories:
     - Screen: `get_screen_info`, `take_screenshot`, `scroll_to_find`, `find_node_info`
     - Actions: `tap`, `find_and_tap`, `long_press`, `swipe`, `input_text`
     - Navigation: `open_app`, `system_key`, `wait`
     - Device & Data: `get_device_info`, `get_notifications`, `clipboard`, `send_message`, `auto_reply`
     - Knowledge Base: `kb_write`, `kb_read`, `kb_search`, `kb_add_todo`
     - TV Remote: `dpad_center`, `dpad_up`, `dpad_down`, `volume_up`, `volume_down`
     - Safety: `finish` (locked ON)
   - Interactive Tool Tester to execute any tool with mock arguments and inspect JSON outputs.

4. **All 8 Original Themes**
   - Full faithful implementation of every theme:
     - `Abyss Dark` (default)
     - `Ember Dark`
     - `Moss Dark`
     - `Onyx Dark`
     - `Abyss Light`
     - `Ember Light`
     - `Moss Light`
     - `Onyx Light`

5. **Playbooks & Knowledge Base Vault**
   - Built-in Playbook readers: `Send Message`, `Direct Device Data`, `Open App and Search`, `Open and Navigate`.
   - Local Markdown Knowledge Vault `/vault/` with full-text search, notes editor, todo tracker, and metadata tags.

6. **Remote Control & LAN Configuration Web Portal**
   - Telegram & Discord bot connection configuration.
   - Embedded reproduction of the LAN Web Configuration Portal (port 8080) for browser-based setup.
   - Draggable Floating Assistant Circle widget simulation.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server (port 3000)
npm run dev

# Build for production
npm run build
```

## 📄 License

Licensed under the [Apache License 2.0](LICENSE).
