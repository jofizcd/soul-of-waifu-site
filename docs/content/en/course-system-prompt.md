# System Prompt and Request Structure

> How the final request to the AI is structured, why prompt presets are needed, how automatic context compression works, and how to manage the plot "on the fly" using Author's Notes.

The **System Prompt** is a set of global laws, rules, and instructions that the AI model receives at the input before the start of any dialogue. This is the foundation of the model's behavior. If the character card describes *who* is in front of us, then the system prompt defines the rules of *how* the AI should describe it.

Every time you send a message to a character, Soul of Waifu takes all your settings, chat history, and current phrase, packs them into a single block of text (compiled prompt), and sends it to the model.

---

## Compiled Prompt Hierarchy

A complete request to the AI is assembled like a multi-layered cake. Understanding this hierarchy will help you comprehend which data the model sees best:

| Position in Request | Element | Description | Strength of Influence |
|---|---|---|---|
| **At the very beginning** | **System Prompt** | Global generation rules, text style, and OOC (Out of Character) boundaries. | **High** (sets the model's base laws) |
| **In the beginning** | **User Persona** | XML description of who you are in the chat. | **Medium** |
| **In the middle** | **Character Card** | Description of the appearance, personality, and backstory of the AI companion. | **Medium** (can fade over a long chat) |
| **In the middle** | **Lorebooks** | World and lore entries temporarily loaded by keywords. | **Medium** |
| **Near the end** | **Author's Notes** | Temporary dynamic instructions injected deep into the chat history. | **Very High** (due to recency bias) |
| **At the very end** | **Chat History** | Compressed summary of old events (summarization) + your and their recent messages. | **Very High** (the AI mimics the latest responses) |
| **Last line** | **Your Message** | The new message that the AI must respond to right now. | **Absolute** |

::: tip
**Recency Bias:**
As it turns out, language models react most strongly to information located at the very beginning of the system instructions and at the very end of the chat. What is in the middle may be partially ignored by the AI if the context is filled.
:::

---

## Pre-installed Prompt Presets

Several system prompt presets are built into Soul of Waifu, which you can choose in the settings or directly in the chat:

::: cards
#### <i class="fas fa-comments"></i> 1. Standard Chat (Standart RP)
This preset forces the AI to work as a co-author of an interactive book. It makes the model write in a beautiful literary style, use Markdown syntax to highlight the character's actions with asterisks (`*...*`), and completely forbids the model from speaking on behalf of the player.
---
#### <i class="fas fa-dice-d20"></i> 2. Adventure Mode (Adventure RP)
A preset that shifts the model into the mode of a classic text-based quest or a tabletop game (D&D). The AI takes on the role of a neutral Game Master. However, given the presence of a dedicated mode for RPG adventures, Soul Stage, the need to use this preset in a single chat is practically non-existent.
---
#### <i class="fas fa-phone"></i> 3. Call Mode (Soul of Waifu System)
When switching to voice communication mode, it is recommended to set this specific preset, as it prepares the model for a direct voice conversation without the need to describe actions in a literary format.
:::

---

## Secrets of Composing a System Prompt

If you decide to write your own system prompt in the **System Prompt Editor**, follow three rules of modern prompt engineering:

### 1. Use XML Tags for Boundaries
Modern reasoning models (such as **DeepSeek R1**) think in structures. Separating instructions with tags ensures that the AI does not get confused by the rules.

*Example of good instruction formatting:*
```xml
<system_instructions>
Write in a vivid, descriptive literary style. 
Avoid repetitive words and phrases.
</system_instructions>

<boundaries>
Never speak or perform actions on behalf of {{user}}.
Stay in character as {{char}} at all times.
</boundaries>
```

### 2. Avoid Negations ("Don't do this")
Language models are worse at processing the particle "NOT". An instruction like *"Don't write short messages"* might do the opposite, as the model will latch onto the word combination "write short".
*   **Bad:** *"Do not use modern slang when generating responses."*
*   **Great:** *"Write exclusively in the style of medieval fantasy, using archaic words and literary phrasing."*

### 3. The Golden Rule of a Clean Chat History
Language models learn from patterns. If the AI gives you a bad, silly, or out-of-character response and you continue the conversation, **you have broken the chat**. This bad response has become part of the chat history, and the model will start using it as a style baseline.

::: danger
**Never tolerate bad AI responses!**
If you did not like the character's response: do a swipe (regenerate), edit their message manually, delete the reply, or temporarily change the Author's Notes. The chat must always consist only of high-quality and logical responses.
:::

---

## Author's Notes

**Author's Notes** are a tool for operational plot management. This is a short text instruction that you can write or change directly during communication by clicking on the notepad icon in the chat.

*   *Example of use:* A roleplay is underway. You want the AI to reflect the fact that a severe thunderstorm has started and the character is extremely tired. You simply write in the Author's Notes: `[Genre: dark fantasy; Scene: heavy thunderstorm outside; {{char}} is physically exhausted and speaks weakly.]`
*   As soon as the AI generates a response, it will take these rules into account. As soon as the storm is over, you simply delete this line from the notes.

---

## Auto-Summarization (History Compression)

Even when using models with huge context windows, sooner or later a memory limit will be reached. When the length of the conversation exceeds a certain threshold, the AI begins to consume too much of the PC's RAM and VRAM, and the token generation speed drops.

To solve this issue, a **v2.4.0 Auto-Summarization (history compression)** module is built into Soul of Waifu.

### How Does It Work?
When the dialogue approaches context fullness, the program in the background takes the oldest part of the conversation (for example, the first 30 messages) and condenses them into a short text summary.

*Compression example:* Instead of dozens of messages, the model receives a concise summary: `“Earlier {{user}} and {{char}} met in the border forest, fought off wild beasts, and decided to head to Camelot together.”`

This summary is automatically placed in the model's system prompt. The AI remembers the entire thread and key events of your adventure, but the context window is freed up for new messages.

::: tip
**How to Enable Summarization:**
Go to the **Settings → SoW Modules** tab and check the **Auto-Summarization** box. You can configure the summarization interval (how many messages to compress the history after), which will allow you to communicate in a single chat for literally months without losing the thread of the plot.
:::

---

## What's Next?

| Section | Description |
|---|---|
| [Lorebooks](#!/course-lorebooks) | Mechanics of dynamic lore connection and creating an active game world. |
| [Soul Memory](#!/course-soul-memory) | How the Soul Memory long-term memory is structured and the character's personal diaries. |
| [LLM Setup](#!/llm-setup) | Practical guide to configuring Llama.cpp sliders, CPU threads, and GPU layers. |