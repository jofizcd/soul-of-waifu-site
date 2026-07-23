# Introduction to Soul of Waifu

**Soul of Waifu** is an open-source desktop application that combines roleplay textual interaction, live voice dialogue, character visualization, and game logic into a unified ecosystem.

The core feature of the program is complete freedom of choice. You can either connect cloud AI networks (ChatGPT, Claude, DeepSeek, Grok, etc.) or run local language models on your computer offline using the built-in llama.cpp server. Easily transition from a solo text chat to a full-fledged AI assistant on your desktop. Or embark on complete RPG adventures right inside Soul of Waifu.

::: tip
If you have launched the program for the first time and want to start chatting quickly, go directly to the [Quick Start](#!/quick-start) section.
:::

---

## One Soul. Three Ways to Connect.

In Soul of Waifu, your companion exists in three dimensions simultaneously. You configure the character once, and they automatically work in all modes:

::: cards
#### <i class="fas fa-brain"></i> Long-Term Memory (Soul Memory)
Your companion won't forget your past conversations. They remember details, analyze your behavior, change their attitude toward you, and keep a personal first-person diary reflecting on your relationship.
---
#### <i class="fas fa-comments"></i> I. Text & Voice Chat
Standard messaging and voice calls without censorship or boundaries. Supports flexible scenarios, lorebooks, and custom state variables (like relationship or health bars) displayed at the top of the chat.
---
#### <i class="fas fa-dice-d20"></i> II. Text-Based RPG (Soul Stage)
Turns your chat into a tabletop RPG managed by a virtual Game Master. The engine drives the story, tracks your inventory and status, spawns random events, adds background music, and changes scene backdrops.
---
#### <i class="fas fa-desktop"></i> III. Desktop Companion (Soul Companion)
Your character steps directly onto your Windows desktop as an animated Live2D or VRM avatar. They live their own life: chatting, reacting to your PC activity, getting tired or sad, and executing 6 built-in tools (or external programs via an MCP server).
:::

---

## How the Program Works

All calculations and data processing can take place directly on your computer without sending any information to the cloud:

*   **Language Models (LLM):** You can communicate via cloud APIs or download local GGUF models to your hardware using the built-in Llama.cpp. Features full hardware acceleration support for NVIDIA (CUDA), AMD (HIP), Intel (SYCL), and integrated graphics (Vulkan).
*   **Speech Generation Engines (Text-to-Speech):** Support for Kokoro, EdgeTTS, ElevenLabs, Silero, and Qwen3-TTS speech systems. Text is played back instantly, sentence-by-sentence. Features quick voice cloning from a short 3-second audio file and speech-to-text (STT) recognition with the ability to interrupt the character mid-sentence.
*   **Avatars and Emotions:** Integration of animated Live2D and 3D VRM models. The AI automatically detects 28 types of emotions in the text and instantly changes the avatar's expression and pose during the conversation.

---

## Documentation Roadmap

To help you navigate the user guides, use this table to jump directly to the relevant sections:

| Section | Description |
|---|---|
| [Installation](#!/installation) | System requirements, launching batch scripts, and preparing your GPU. |
| [Quick Start](#!/quick-start) | Step-by-step path from first launch to sending your first message. |
| [Character Creation](#!/character-creation) | Using the visual editor, V2 spec cards, and setting up HUD variables. |
| [LLM Setup](#!/llm-setup) | Layer offloading, MoE setup, Flash Attention, and Thinking Mode. |
| [Text-to-Speech](#!/tts) | Configuring TTS engines and RVC models. |
| [Avatars](#!/avatars) | Importing Live2D and VRM models, setting up animations, and mapping character emotional states. |
| [AI RP Course](#!/course-llm) | Theory: from sampling parameters (Min-P, DRY) to cognitive memory structures. |

::: note
The project continuously evolves thanks to community contributions. If you want to share your character cards, suggest a feature, or report a bug — join our official [Discord Server](https://discord.com/invite/6vFtQGVfxM) or open an Issue on [GitHub](https://github.com/jofizcd/Soul-of-Waifu).
:::