# Soul Memory Module

> Guide to long-term memory architecture: 4 levels of data storage, emotional decay, memory self-healing, and choosing cognitive profiles.

Standard AI chatbots suffer from "amnesia": they only see the last 15–20 messages, and everything that happened before that disappears without a trace. To solve this problem, Soul of Waifu features an innovative built-in module called **Soul Memory**.

Instead of primitive keyword searches for old lines, this system operates as a full-fledged virtual brain. It continuously analyzes the subtext of your communication, tracks relationship development, shifts the character's emotional state, and keeps their personal diary.

---

## Four Levels of Cognitive Memory

All information regarding your communication is isolated within each character's private folder and organized across four independent storage levels:

::: cards
#### <i class="fas fa-user-gear"></i> 1. Inner World (MEMORY.md)
Your companion's subjective psychology. This stores their core personality, active mood (dominant emotion and its intensity), internal mental tension, and their secret agenda in the conversation right now (e.g., *"hiding embarrassment behind forced rudeness"*). This data is constantly fed into the AI's system prompt.
---
#### <i class="fas fa-user-vcard"></i> 2. Relationship Profile (USER.md)
A detailed dossier on you. It records your role in the story, your physical and social attributes, habits, tastes, as well as the promises you have made to each other. It also tracks the character's trust level toward you (ranging from wary to deeply bound).
---
#### <i class="fas fa-box-archive"></i> 3. Topical Archive (Episodes)
Separate text files inside the `topics/` folder dedicated to specific subjects. If you mention a new city, find an ancient artifact, or meet an NPC, the system will create a small "card" for this topic. When you speak of this object or place again, the character instantly retrieves the file from the archive and remembers all the details.
---
#### <i class="fas fa-book-open"></i> 4. Character's Personal Diary
Intimate entries that the character writes for themselves at the end of each day. The diary is written strictly in the first-person (*"I"*) and describes the character's pure emotions about you and how you made them feel that day. These files are protected from editing and are closed to direct AI prompts during dialogue.
:::

---

## How It Works: The Background Memory Pipeline

The process of analyzing dialogue and rewriting memory files takes place seamlessly in the background during your conversations.

### 1. Message Accumulation (Batch Analysis)
Rewriting memory files after every single sent word would be too slow and resource-heavy. Therefore, the system operates on the **accumulation principle**. By default, the program compiles a batch of **4 messages** (the batch size can be changed in the settings). Once the batch is full, an asynchronous background processing pipeline is triggered.

### 2. Three Agents of the Mind
Three invisible AI agents participate in processing the accumulated dialogue batch, each responsible for its own task:

*   **The Analyst (Router Agent):** Studies the psychological subtext of your recent responses. It decides if the character's attitude toward you has shifted, which emotion is currently dominant, and rewrites the `MEMORY.md` and `USER.md` index files.
*   **The Archivist (Archivist Agent):** Scans the dialogue for the emergence of new important entities (locations, names, items). If any are found, it creates new card files in the archive or complements existing ones.
*   **The Diary Writer (Diary Agent):** Sits down at the desk and writes a brief (2 to 4 sentences), honest entry into the character's diary, reflecting their genuine feelings about the past day.

::: tip
**Smart Semantic Search (Topic RAG):**
If your topical archive expands (exceeding 4 files), the program enables **RAG** technology. Utilizing the lightweight local embedding model `all-MiniLM-L6-v2`, the system encodes your recent responses into vectors, matches them against the archive, and loads only the 3 most relevant topics into the AI context, saving your PC's RAM.
:::

---

## Living Cognitive Brain Mechanics

To make the character feel like a real person, two unique mathematical systems are built directly into Soul Memory:

### 1. Natural Emotional Decay
If you have a fight with the character, the Analyst will record resentment or anger in the `MEMORY.md` file. However, emotions cannot last forever.

An emotional decay counter runs inside the system. If you behave in a friendly manner during subsequent communication cycles and the topic of the argument is no longer brought up, the counter increments. On step 3, the AI automatically softens the locked emotion, transitioning it into calmness, slight sadness, or contemplation. The character gradually "cools down" on their own, just like a real person.

### 2. Memory Self-Healing
Sometimes AI models contradict themselves: in the beginning of a chat, a character might state they are afraid of heights, but 100 messages later suddenly claim they dream of skydiving.

The Soul Memory system constantly cross-checks new messages with established facts in `MEMORY.md` and `USER.md`. If a direct contradiction is detected, the Analyst resolves it, prioritizing the most recent event, rewrites the outdated fact, and records the correction in a dedicated **healing log**. This prevents logical gaps and lapses in your companion's memory.

---

## Cognitive Profiles (Operation Modes)

Since running background agents requires CPU and GPU resources, you can choose one of 4 memory operation modes in the settings depending on your PC's hardware capabilities:

| Profile | Operation Mode | What's Enabled | Suitable Hardware |
|---|---|---|---|
| **"Full Synchronization"** | Maximum | All features are active: updates `MEMORY.md`, `USER.md`, creates topical archives, and writes diaries. | High-end PCs with powerful graphics cards. |
| **"Soul Link"** | Optimal | Updates only `MEMORY.md` and `USER.md` files, and writes the personal diary. Topical archives are disabled. | Perfect balance for mid-range gaming systems. |
| **"Mind Spark"** | Economical | Updates only the `MEMORY.md` and `USER.md` index files. Diaries and archives are disabled. | Energy-efficient mode for laptops. |
| **"Reflection Flow"** | Creative | Base memory files and the relationship profile are not overwritten, but the companion faithfully writes a diary entry at the end of each day. | For budget PCs or preserving a static personality. |

---

## What is the Main Difference from Standard Chatbots?

Thanks to Soul Memory, your companion gains a **long-term personal core**:
*   They can remember a promise you made three weeks ago and remind you of it.
*   They will harbor resentment over yesterday's actions and meet you coldly the next time you launch the program.
*   Their trust develops dynamically: from cold distrust to deep affection based on the real experience of your interactions.
*   You can read their secret diary at any moment to better understand their true feelings hidden behind a mask of politeness or coldness.

---

## What's Next?

| Section | Description |
|---|---|
| [LLM Setup](#!/llm-setup) | Choosing cognitive profiles, configuring memory batch sizes, and Llama.cpp optimization. |
| [Text-to-Speech](#!/tts) | Configuring TTS engines, voice cloning, and RVC processing. |
| [Avatars](#!/avatars) | Connecting Live2D and VRM models, setting up LipSync, and emotional states. |