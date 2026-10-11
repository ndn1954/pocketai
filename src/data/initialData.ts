import { 
  ModelInfo, 
  AutomationTool, 
  PermissionItem, 
  Playbook, 
  VaultNote, 
  Conversation,
  ChannelSettings,
  CloudLlmSettings
} from '../types';

export const INITIAL_MODELS: ModelInfo[] = [
  {
    id: 'functiongemma-270m',
    name: 'FunctionGemma 270M',
    family: 'Gemma',
    description: 'Specialized for mobile actions & function calling · Fast warmup · Recommended for on-device tasks',
    type: 'local',
    sizeMb: 289,
    sizeLabel: '289 MB',
    ramRequired: '6 GB+ RAM',
    isDownloaded: true,
    recommended: true,
  },
  {
    id: 'qwen3-0.6b',
    name: 'Qwen3 0.6B',
    family: 'Qwen',
    description: 'Lightweight general conversation & fast reasoning · Low memory footprint',
    type: 'local',
    sizeMb: 300,
    sizeLabel: '~300 MB',
    ramRequired: '6 GB+ RAM',
    isDownloaded: true,
  },
  {
    id: 'gemma3-1b-int4',
    name: 'Gemma 3 1B INT4',
    family: 'Gemma',
    description: 'Balanced on-device general assistant with quantized 4-bit weights',
    type: 'local',
    sizeMb: 520,
    sizeLabel: '~520 MB',
    ramRequired: '6 GB+ RAM',
    isDownloaded: false,
  },
  {
    id: 'gemma4-e2b-it',
    name: 'Gemma 4 E2B-IT',
    family: 'Gemma',
    description: 'Most capable local model with native LiteRT-LM tool calling and deep reasoning',
    type: 'local',
    sizeMb: 2600,
    sizeLabel: '2.6 GB',
    ramRequired: '8 GB+ RAM',
    isDownloaded: false,
    recommended: true,
  },
  {
    id: 'cloud-openai-gpt4o',
    name: 'OpenAI GPT-4o',
    family: 'OpenAI',
    description: 'Cloud flagship multimodal model for complex multi-app cross-screen operations',
    type: 'cloud',
    sizeMb: 0,
    sizeLabel: 'Cloud API',
    ramRequired: 'Internet',
    isDownloaded: true,
    provider: 'openai',
  },
  {
    id: 'cloud-anthropic-claude',
    name: 'Claude 3.5 Sonnet',
    family: 'Anthropic',
    description: 'Cloud reasoning model with precise instruction following and guard compliance',
    type: 'cloud',
    sizeMb: 0,
    sizeLabel: 'Cloud API',
    ramRequired: 'Internet',
    isDownloaded: true,
    provider: 'anthropic',
  },
  {
    id: 'cloud-gemini-20-flash',
    name: 'Gemini 2.0 Flash',
    family: 'Google',
    description: 'Ultra-fast low-latency cloud model for high-throughput mobile actions',
    type: 'cloud',
    sizeMb: 0,
    sizeLabel: 'Cloud API',
    ramRequired: 'Internet',
    isDownloaded: true,
    provider: 'gemini',
  },
];

export const INITIAL_TOOLS: AutomationTool[] = [
  // Screen
  {
    name: 'get_screen_info',
    displayName: 'Get Screen Info',
    category: 'Screen',
    description: 'Inspect and dump the current screen UI hierarchy tree, text nodes, and bounds.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'none',
  },
  {
    name: 'take_screenshot',
    displayName: 'Take Screenshot',
    category: 'Screen',
    description: 'Capture the visual frame of the active display for OCR and computer vision.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'none',
  },
  {
    name: 'scroll_to_find',
    displayName: 'Scroll To Find',
    category: 'Screen',
    description: 'Scroll vertically until the targeted element or text is brought into viewport.',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'text: string, direction?: "up" | "down", maxScrolls?: number',
  },
  {
    name: 'find_node_info',
    displayName: 'Find Node Info',
    category: 'Screen',
    description: 'Find node details matching text or accessibility ID on the screen.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'query: string',
  },

  // Actions
  {
    name: 'tap',
    displayName: 'Tap Screen',
    category: 'Actions',
    description: 'Perform a single touch tap at exact screen coordinates (x, y).',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'x: number, y: number',
  },
  {
    name: 'find_and_tap',
    displayName: 'Find And Tap',
    category: 'Actions',
    description: 'Find UI element matching target text and tap its center coordinate automatically.',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'text: string, exactMatch?: boolean',
  },
  {
    name: 'long_press',
    displayName: 'Long Press',
    category: 'Actions',
    description: 'Hold finger press at screen coordinates for specified duration.',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'x: number, y: number, durationMs?: number',
  },
  {
    name: 'swipe',
    displayName: 'Swipe Gesture',
    category: 'Actions',
    description: 'Perform gesture swipe from start (x1, y1) to end (x2, y2).',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'x1: number, y1: number, x2: number, y2: number, durationMs?: number',
  },
  {
    name: 'input_text',
    displayName: 'Input Text',
    category: 'Actions',
    description: 'Type text into currently focused input field or target node.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'text: string, clearFirst?: boolean',
  },

  // Navigation
  {
    name: 'open_app',
    displayName: 'Open App',
    category: 'Navigation',
    description: 'Launch application by app name (e.g. WhatsApp, YouTube, Settings) or package ID.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'app_name: string',
  },
  {
    name: 'system_key',
    displayName: 'System Key',
    category: 'Navigation',
    description: 'Trigger system navigation key: back, home, recents, or enter.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'key: "back" | "home" | "recents" | "enter"',
  },
  {
    name: 'wait',
    displayName: 'Wait / Delay',
    category: 'Navigation',
    description: 'Pause execution for milliseconds to allow app transition or render.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'seconds?: number',
  },

  // Device & Data
  {
    name: 'get_device_info',
    displayName: 'Get Device Info',
    category: 'Device & Data',
    description: 'Query battery level, WiFi status, Bluetooth, storage, and OS version directly.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'category?: "battery" | "wifi" | "storage" | "all"',
  },
  {
    name: 'get_notifications',
    displayName: 'Get Notifications',
    category: 'Device & Data',
    description: 'Read active system status bar notifications and incoming messages.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'filterPackage?: string',
  },
  {
    name: 'clipboard',
    displayName: 'Clipboard Reader/Writer',
    category: 'Device & Data',
    description: 'Read or write current system clipboard text.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'action: "get" | "set", text?: string',
  },
  {
    name: 'send_message',
    displayName: 'Send Message Shortcut',
    category: 'Device & Data',
    description: 'High-level shortcut to compose and dispatch message via messaging app.',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'contact: string, message: string, app?: string',
  },
  {
    name: 'auto_reply',
    displayName: 'Auto Reply Watcher',
    category: 'Device & Data',
    description: 'Continuously monitors chat thread and replies based on context.',
    enabled: true,
    deviceType: 'mobile',
    paramsDoc: 'contact: string, app: string, promptGuidance?: string',
  },

  // Knowledge Base
  {
    name: 'kb_write',
    displayName: 'KB Write Note',
    category: 'Knowledge Base',
    description: 'Save or update markdown note with frontmatter metadata in local knowledge vault.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'path: string, content: string, frontmatter?: object',
  },
  {
    name: 'kb_read',
    displayName: 'KB Read Note',
    category: 'Knowledge Base',
    description: 'Read contents of a markdown note from local knowledge vault.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'path: string',
  },
  {
    name: 'kb_search',
    displayName: 'KB Full-Text Search',
    category: 'Knowledge Base',
    description: 'Search across all markdown notes in local knowledge vault.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'query: string',
  },
  {
    name: 'kb_add_todo',
    displayName: 'KB Add Todo',
    category: 'Knowledge Base',
    description: 'Append or update a task item inside todos.md in the knowledge vault.',
    enabled: true,
    deviceType: 'all',
    paramsDoc: 'task: string, done?: boolean',
  },

  // TV Remote
  {
    name: 'dpad_center',
    displayName: 'DPad Center / Select',
    category: 'TV Remote',
    description: 'Press Android TV center/OK d-pad navigation button.',
    enabled: true,
    deviceType: 'tv',
    paramsDoc: 'none',
  },
  {
    name: 'dpad_up',
    displayName: 'DPad Up',
    category: 'TV Remote',
    description: 'Send directional UP key to Android TV device.',
    enabled: true,
    deviceType: 'tv',
    paramsDoc: 'none',
  },
  {
    name: 'dpad_down',
    displayName: 'DPad Down',
    category: 'TV Remote',
    description: 'Send directional DOWN key to Android TV device.',
    enabled: true,
    deviceType: 'tv',
    paramsDoc: 'none',
  },
  {
    name: 'volume_up',
    displayName: 'Volume Up',
    category: 'TV Remote',
    description: 'Increment device system volume.',
    enabled: true,
    deviceType: 'tv',
    paramsDoc: 'none',
  },
  {
    name: 'volume_down',
    displayName: 'Volume Down',
    category: 'TV Remote',
    description: 'Decrement device system volume.',
    enabled: true,
    deviceType: 'tv',
    paramsDoc: 'none',
  },

  // Safety
  {
    name: 'finish',
    displayName: 'Finish Task',
    category: 'Safety',
    description: 'Signal successful completion of active phone automation task.',
    enabled: true,
    isLocked: true,
    deviceType: 'all',
    paramsDoc: 'summary: string, success?: boolean',
  },
];

export const INITIAL_PERMISSIONS: PermissionItem[] = [
  {
    id: 'accessibility',
    name: 'Accessibility Service',
    description: 'Required to read screen elements and dispatch taps / gestures',
    icon: '♿',
    status: 'granted',
    critical: true,
  },
  {
    id: 'notifications',
    name: 'Notification Listener',
    description: 'Read status bar alerts and monitor incoming chat triggers',
    icon: '🔔',
    status: 'granted',
  },
  {
    id: 'overlay',
    name: 'Display Over Apps',
    description: 'Show status overlay and floating circle controller',
    icon: '📱',
    status: 'granted',
  },
  {
    id: 'battery',
    name: 'Battery Optimization',
    description: 'Unrestricted background running without OS killing service',
    icon: '🔋',
    status: 'restricted', // Shows the authentic warning from the prototype!
    critical: true,
  },
  {
    id: 'storage',
    name: 'Storage Access',
    description: 'Persist markdown knowledge vault, models & screenshots',
    icon: '📁',
    status: 'granted',
  },
];

export const INITIAL_PLAYBOOKS: Playbook[] = [
  {
    id: 'send_message',
    name: 'Send Message',
    triggers: ['send', 'tell', 'reply', 'message', 'text'],
    summary: 'When user wants to deliver a message to a person via WhatsApp, Telegram, LINE, etc.',
    steps: [
      'Extract contact name, text message, and target application (default: WhatsApp)',
      'open_app(app_name="WhatsApp")',
      'get_screen_info() to scan search or contact list',
      'find_and_tap(text=contact)',
      'input_text(text=message)',
      'find_and_tap(text="Send") or tap send icon coordinate',
      'finish(summary="Sent message to contact")',
    ],
    markdown: `### Playbook: Send Message

When user wants to send a message:
1. **send_message** → call \`send_message(contact="[person]", message="[text]", app="[app]")\`
2. **finish** → call \`finish(summary="Sent '[text]' to [contact] on [app]")\`

Only activate when the user clearly directs delivery to another person.`,
  },
  {
    id: 'direct_device_data',
    name: 'Direct Device Data',
    triggers: ['battery', 'wifi', 'clipboard', 'notifications', 'bluetooth', 'storage', 'apps'],
    summary: 'Directly invoke phone hardware/OS observation tools instead of simulating or refusing.',
    steps: [
      'Identify device query category (battery, clipboard, notifications, system info)',
      'Call matching tool: get_device_info(), clipboard(action="get"), or get_notifications()',
      'Format factual summary in conversational voice',
      'finish(summary="Reported device data")',
    ],
    markdown: `### Playbook: Direct Device Data

Rules:
1. Do NOT answer as if you are a generic chatbot without device access.
2. Call the direct tool first before answering.
3. Report truthful values (e.g. 72% battery charging, clipboard content).`,
  },
  {
    id: 'open_and_search',
    name: 'Open App and Search',
    triggers: ['search', 'find', 'look up', 'look for'],
    summary: 'Open target application first, tap search bar, input query, and submit.',
    steps: [
      'open_app(app_name="[app]") - ALWAYS launch app first',
      'get_screen_info() to locate search bar element',
      'find_and_tap(text="Search")',
      'input_text(text="[query]")',
      'system_key(key="enter")',
      'get_screen_info() to read results',
      'finish(summary="Found search results")',
    ],
    markdown: `### Playbook: Open App and Search

Always open the app FIRST. Never type into the current screen without opening the target app.`,
  },
  {
    id: 'open_and_navigate',
    name: 'Open and Navigate',
    triggers: ['open', 'go to', 'switch to', 'turn on', 'turn off'],
    summary: 'Navigate system settings or multi-tier menus to toggle features or switch views.',
    steps: [
      'open_app(app_name="Settings")',
      'get_screen_info()',
      'scroll_to_find(text="Network & internet")',
      'find_and_tap(text="Internet")',
      'find_and_tap(text="Wi-Fi")',
      'finish(summary="Navigated to target setting")',
    ],
    markdown: `### Playbook: Open and Navigate

System-level settings and multi-screen hierarchy traversal using accessibility nodes.`,
  },
];

export const INITIAL_VAULT_NOTES: VaultNote[] = [
  {
    path: 'contacts/mom.md',
    title: 'Mom Contact & Preferences',
    category: 'Contacts',
    tags: ['family', 'whatsapp', 'vip'],
    content: `# Mom
- **WhatsApp**: +1 (555) 019-2831
- **Preferred language**: English
- **Notes**: Mom asked for Pinot Noir wine for dinner on Saturday. Usually sleeps by 10:30 PM.
- **Auto-reply rule**: Friendly tone, confirm dinner plans.`,
    updatedAt: '2026-10-10 18:24',
  },
  {
    path: 'todos/tasks.md',
    title: 'Action Items & Todos',
    category: 'Tasks',
    tags: ['todo', 'productivity'],
    content: `# Active Todos
- [x] Check flight boarding gate on Delta app
- [ ] Pick up groceries (olive oil, baguette, apples)
- [ ] Turn off WiFi before entering subway tunnel
- [ ] Back up photos to vault`,
    updatedAt: '2026-10-11 08:12',
  },
  {
    path: 'playbooks/custom-alarms.md',
    title: 'Custom Alarms Routine',
    category: 'Automation',
    tags: ['clock', 'routine'],
    content: `# Wake-up Routine
When user says "set morning alarm":
1. Open Clock app
2. Tap Alarm tab
3. Create alarm for requested time with Gentle Chime tone.`,
    updatedAt: '2026-10-09 14:00',
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Send hi to Mom on WhatsApp',
    group: 'Today',
    createdAt: '12:37 PM',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        text: 'Open WhatsApp and send hi to Mom',
        timestamp: '12:37 PM',
        isTask: true,
      },
      {
        id: 'msg-2',
        role: 'assistant',
        text: 'On it. Checking your screen.',
        timestamp: '12:37 PM',
        isTask: true,
        taskStatus: 'success',
        taskSteps: [
          { id: 's1', tool: 'get_screen_info', action: 'screen → found WhatsApp icon on Home', status: 'ok', detail: 'Found node id=com.whatsapp.launcher' },
          { id: 's2', tool: 'open_app', action: 'tap → opened WhatsApp', status: 'ok', detail: 'Package com.whatsapp resumed in 140ms' },
          { id: 's3', tool: 'get_screen_info', action: 'screen → found Mom in recent chats', status: 'ok', detail: 'Matched contact node "Mom"' },
          { id: 's4', tool: 'find_and_tap', action: 'tap → opened chat with Mom', status: 'ok', detail: 'Tap coordinate x=240, y=380' },
          { id: 's5', tool: 'input_text', action: 'type → "hi"', status: 'ok', detail: 'Dispatched text input to message_box' },
          { id: 's6', tool: 'find_and_tap', action: 'tap → dispatched send button', status: 'ok', detail: 'Message sent successfully' },
        ],
        tokens: 312,
        cost: 0.0,
        executionTimeMs: 1240,
        modelUsed: 'FunctionGemma 270M (On-device)',
      },
      {
        id: 'msg-3',
        role: 'assistant',
        text: 'Done! Sent "hi" to Mom on WhatsApp.',
        timestamp: '12:37 PM',
      },
      {
        id: 'msg-4',
        role: 'user',
        text: 'Check my battery level',
        timestamp: '12:38 PM',
        isTask: true,
      },
      {
        id: 'msg-5',
        role: 'assistant',
        text: 'Querying system battery service directly...',
        timestamp: '12:38 PM',
        isTask: true,
        taskStatus: 'success',
        taskSteps: [
          { id: 's7', tool: 'get_device_info', action: 'device_info → read battery status', status: 'ok', detail: 'level: 72%, status: discharging, health: good' },
        ],
        tokens: 148,
        cost: 0.0,
        executionTimeMs: 180,
        modelUsed: 'FunctionGemma 270M (On-device)',
      },
      {
        id: 'msg-6',
        role: 'assistant',
        text: '🔋 Your battery is currently at 72% and healthy. Unplugged.',
        timestamp: '12:38 PM',
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'Open Settings and turn off WiFi',
    group: 'Today',
    createdAt: '11:15 AM',
    messages: [
      {
        id: 'c2-1',
        role: 'user',
        text: 'Open Settings and turn off WiFi',
        timestamp: '11:15 AM',
        isTask: true,
      },
      {
        id: 'c2-2',
        role: 'assistant',
        text: 'Opening Settings to switch off Wi-Fi network.',
        timestamp: '11:15 AM',
        isTask: true,
        taskStatus: 'success',
        taskSteps: [
          { id: 'c2-s1', tool: 'open_app', action: 'open_app → Settings launched', status: 'ok' },
          { id: 'c2-s2', tool: 'find_and_tap', action: 'tap → Network & internet', status: 'ok' },
          { id: 'c2-s3', tool: 'find_and_tap', action: 'tap → Wi-Fi switch toggled to OFF', status: 'ok' },
        ],
        tokens: 280,
        cost: 0.0,
        executionTimeMs: 820,
        modelUsed: 'FunctionGemma 270M (On-device)',
      },
      {
        id: 'c2-3',
        role: 'assistant',
        text: 'WiFi has been turned off in Settings.',
        timestamp: '11:15 AM',
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Open YouTube and search cats',
    group: 'Yesterday',
    createdAt: '3:20 PM',
    messages: [
      {
        id: 'c3-1',
        role: 'user',
        text: 'Open YouTube and search funny cat videos',
        timestamp: '3:20 PM',
        isTask: true,
      },
      {
        id: 'c3-2',
        role: 'assistant',
        text: 'Opened YouTube and searched "funny cat videos". Top videos are ready on screen.',
        timestamp: '3:20 PM',
        isTask: true,
        taskStatus: 'success',
      },
    ],
  },
];

export const DEFAULT_CHANNELS: ChannelSettings = {
  telegram: {
    enabled: true,
    botToken: '7129481923:AAH78...xK9',
    chatId: '@pokeclaw_remote',
    status: 'connected',
  },
  discord: {
    enabled: false,
    botToken: '',
    channelId: '',
    status: 'disconnected',
  },
  lanServer: {
    enabled: true,
    port: 8080,
    accessUrl: 'http://192.168.1.104:8080',
  },
};

export const DEFAULT_CLOUD_CONFIG: CloudLlmSettings = {
  provider: 'openai',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  modelName: 'gpt-4o',
  temperature: 0.2,
  maxTokens: 2048,
};
