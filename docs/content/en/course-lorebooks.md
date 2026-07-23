# Lorebooks and Knowledge Base

> Guide to the advanced lorebook system: multi-binding, semantic triggers, scene tension, event chains, and active injection modes.

In Soul of Waifu, lorebooks play a crucial role in context management. Instead of overloading the system prompt with all the world information, the system scans the context of your dialogue and dynamically injects only those entries that are relevant right now.

In recent versions of the program, lorebooks have evolved from a simple encyclopedia into a powerful interactive tool capable of dynamically managing the plot, triggering random events, and controlling character behavior.

---

## 1. Architectural Foundations: Multi-Binding and Runtime State

Unlike standard AI systems, Soul of Waifu offers a deep integration of multiple knowledge bases simultaneously:

::: cards
#### <i class="fas fa-link"></i> Multi-Binding
Multiple lorebooks can be bound to a single character at the same time. For example, you can connect a general fantasy world knowledge book, a specific kingdom's lorebook, and their family's private journal to your companion. Older cards are automatically migrated to this format.
---
#### <i class="fas fa-gauge-high"></i> Scene Tension
A dynamic "scene tension" metric is calculated in RAM for each lorebook. Each new exchange of lines in the chat adds +5 units to the tension scale, allowing you to deploy random events depending on the duration of the conversation.
---
#### <i class="fas fa-history"></i> Activity Metrics and Stickiness
The system tracks the runtime state of each entry: the dialogue step on which it triggered, and a "stickiness" (sticky) timer that forces the entry to remain active for a specified number of turns, even if the keywords are no longer mentioned.
:::

---

## 2. Multi-step Entry Activation Algorithm

When you send a message to a character, Soul of Waifu initiates a check of all bound lorebooks. Each entry passes through a rigid filtering system.

### Step A: Preliminary Filtering (Base Restrictions)
*   **Activity Flag (Enabled):** If the entry is disabled by you manually in the interface, it is ignored.
*   **Probability:** Allows you to set a percentage chance for the entry to trigger (from 1% to 100%). If the random number check fails, the entry is skipped.
*   **Start Delay (Delay):** Specifies the minimum number of messages in the chat after which the entry can activate. Useful for gradual plot development during a long game.
*   **Cooldown:** The minimum interval (in messages) between repeated activations. Protects the chat from spamming the exact same event.

### Step B: Determining the Trigger Type
If the base filters are passed, the system checks the triggering conditions depending on the selected trigger type:

*   **Always On:** Unconditional activation. The entry is loaded with every request to the AI.
*   **Message Range (Range):** Activated only within a specified interval of dialogue steps (e.g., from message 10 to 30). Perfect for rigidly modeling story phases.
*   **Random Event by Tension (Random):** The entry triggers only when the lorebook's internal "scene tension" metric reaches a value of 100 or higher. After activation, the counter resets to zero.
*   **Dependent Chains (Chain):** Allows you to create sequential quests. The entry is activated only if the parent entry has already triggered previously, and at least a specified number of messages (chain delay) have passed since then.
*   **Stickiness (Sticky):** Keeps the entry active for a specified number of turns after it triggers, ensuring the smoothness of the AI's memory of the recent event.

---

### Step C: Text Scanning and Semantic Matching

If the entry is bound to the chat context, the program scans your message history. In Soul of Waifu, two types of scanning are available:

#### Classical Keyword Scanning (Keyword)
The system extracts the latest messages to a specified depth (default is 3 messages), converts the text to lowercase, and checks for the presence of keywords (keys) with the mandatory absence of excluding words (exclude keys).

#### Semantic Situation Matching (Semantic Trigger)
Instead of searching for exact letter matches, the program utilizes artificial intelligence:
1.  The local embedding model `all-MiniLM-L6-v2` translates the text of the latest messages and your "semantic trigger" field into mathematical vectors.
2.  The cosine similarity between the vectors is calculated.
3.  If the similarity coefficient exceeds **0.72**, the trigger fires.

::: tip
**What does this give the user?**
This is a revolutionary feature. The character will recall the necessary lore not by an exact word, but by the general meaning of the situation. If a trigger for the situation *"the character is severely injured"* is configured in the lorebook, the entry will activate even if you write *"he is bleeding out on the ground"* or *"he was struck by a sword, he is barely breathing"* in the chat.
:::

---

## 3. Data Injection Behaviors

Once an entry is recognized as active, the program replaces the `{{char}}` and `{{user}}` macros with the actual names of the character and the player, and then routes the text along one of two paths:

### 1. Passive Injection (default)
The text is sent to the background knowledge category. When compiling the system prompt, these entries are merged into a single clean XML block:

```xml
<world_lore_and_knowledge>
- Text of the activated entry about the location
- Text of the activated entry about the history of the world
</world_lore_and_knowledge>
```

This block is embedded in the model's system context in accordance with the priority set in the system prompt editor. The model perceives this data as its background "world knowledge" and uses it as needed.

### 2. Active Injection — Rigid Directive
The text is sent to the scenario category. Instead of passive presence in the background, this data is injected directly into the user's incoming request (at the very end of your message) as a rigid system command:

```xml
<system_directive_narration>
The following event occurs immediately right now:
EVENT: Text of the activated random event entry (e.g., an earthquake has started)
(You must react to this event in your response)
</system_directive_narration>
```

::: danger
**The Power of Active Injection:**
Active injection **forces** the model to react to the event in the very next response. This is the ideal tool for modeling unexpected incidents, sudden weather changes, abrupt monster attacks, or unexpected actions of NPCs.
:::

---

## What's Next?

| Section | Description |
|---|---|
| [User Personas](#!/course-persona) | Configuring your profile: how to ensure the AI perceives you correctly. |
| [System Prompt](#!/course-system-prompt) | Configuring the global template of instructions and the compiled request structure. |
| [Smart Memory](#!/course-smart-memory) | How the Soul Memory long-term memory is structured and the character's personal diaries. |