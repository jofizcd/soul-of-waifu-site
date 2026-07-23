# Soul Stage Game Mode

> A fundamental guide to the interactive roleplaying adventure system: scenario creation, the two-part Game Master AI, the world-state window, and smart turn-routing.

The **Soul Stage** mode is a full-fledged text-based RPG engine built directly into Soul of Waifu. It completely redefines standard one-on-one communication, turning your chat into a tabletop roleplaying game involving your entire party of characters.

Everything is managed by an invisible, virtual Game Master. It maintains world logic, describes the environment, creates temporary characters, inflicts injuries and poison statuses on you, handles items in your inventory, and dynamically changes the music and background images based on the plot context.

::: tip
**Ready-to-Play Scenarios in Characters Gateway:**
You do not have to create plots from scratch. Head over to the **Characters Gateway** tab, find the scenarios section, and download pre-written quests, worlds, and adventures created by other members of our community in a single click.
:::

---

## What Can the Soul Stage Mode Offer?

*   **Cooperative Adventure:** You can assemble a party of several favorite characters. They will converse with each other, argue, assist you, and react to your actions within a single shared world-lore.
*   **Complete Freedom of Choice:** You are not restricted by pre-written, linear story rails. You can head in any direction, make mistakes, or attempt to negotiate with a monster — the Game Master adapts the story to your choices on the fly.
*   **Media Immersion:** The application dynamically changes the chat background and smoothly transitions the ambient audio loop (rain sound, tavern chatter, battle march) during location shifts or combat encounters.

---

## Part 1. Scenario Creation & Setup (Scene Editor)

The adventure begins in the **Scene Editor**, where you act as the author of the campaign, setting the core rules for the AI Game Master.

### 1. Scene Identification
*   **Adventure Title:** The name of your story (e.g., *“The Secret of the Obsidian Citadel”*).
*   **Brief Description:** A concise summary displayed in the scene selection lobby.

### 2. World State & Environment
This is the most critical block. During gameplay, your characters' standard cards are bypassed — they obey the laws of this active scene:
*   **World Context:** The fundamental background rules of your universe (e.g., *“In this world, magic is strictly outlawed, inquisitors hunt offenders, and mechanical beasts roam the wilderness”*).
*   **Starting Location:** The specific physical spot where the story begins (e.g., *“An abandoned shack in the swamps”*).
*   **Time of Day:** Morning, Day, Evening, or Night. Time of day impacts character behavior and physical visibility.
*   **Game Tone (GM Tone):** Presets defining the genre and AI unpredictability. Options include: Standard RP, Adventure RP, and customized genre presets.
*   **Narrator Style:** Choose your preferred narrative voice to match the story's overall tone.

::: info
**Customization Tip:**
You can always write a custom system prompt preset or override the narrator's prose style to fit your specific vision in the campaign settings.
:::

*   **Starting Backdrop and Audio Ambient:** Choose a location image and background audio loop (crackling campfire, howling wind, tavern crowd) that will load automatically upon starting the campaign.

### 3. Story Opening
*   **Narrator's Opening:** The initial block of prose that sets the atmosphere when the quest is launched.
*   **First Character Line (Optional):** You can pre-write a starting line for one of your party members to initiate the dialogue immediately after the Narrator's introduction.

### 4. Party Members
Select checkboxes next to the companions in your library who will embark on this adventure with you. They will travel and interact as a unified party.

---

## Part 2. How the Virtual Game Master is Structured

Under the hood of Soul Stage lies a dual-agent AI architecture. When you submit an action, the Game Master splits its logic into two separate roles:

### 1. The Planner
This is the cold, analytical AI. It operates at a low temperature to prevent logical and structural errors. The Planner processes your action, cross-checks it with the active world-state and lore, and generates a structured JSON payload: whether to change the ambient loop, award a key to your inventory, inflict an injury status, determine the next speaker, or present choice options to the player.

### 2. The Executor / Narrator
The creative AI, operating at a high temperature. It takes the technical JSON blueprint from the Planner and translates it into descriptive prose, adhering to the selected author style.

::: warning
**Narrator Boundary Restriction:**
The Narrator strictly describes the physical world: weather, smells, environmental details, monster actions, and scenery. It never speaks for your companions or forces decisions on them — their dialogues are generated by their individual character cards.
:::

---

## Part 3. Gameplay and the World State Window

During gameplay, you can click the transition button to open the World State panel, allowing you to peek inside the active plot state and view live statistics:

### 1. Inventory, Statuses, and Key Facts
*   **Inventory Panel:** If you acquire an item during the story, the Game Master adds it to your inventory. The system automatically detects the item type by keywords and assigns a corresponding icon (sword, potion, key, coin, map, pistol).
*   **Quick-Use Items:** You can click on any item in your inventory list, and the program will automatically paste the use-action command (e.g., `*uses key*`) into your text field, allowing you to apply it in a single click.
*   **Full-screen Inventory:** Expanding the panel opens a detailed inventory overlay sorted by categories (Weapons, Consumables, Tools, Valuables, Quest Items), where you can read item descriptions or discard unnecessary gear.
*   **Status Effects:** If you are injured, poisoned, or exhausted, the GM inflicts a status effect (e.g., `injured in shoulder`). Your party companions see this status in the context and will comment on your physical state (e.g., *“Hey, you can barely stand. Let's make camp.”*).
*   **Key Facts Registry:** The Game Master records established world truths (e.g., `bridge: destroyed`). Companions will not forget this event and will not attempt to cross the destroyed bridge 50 messages later.

### 2. Dynamic Extras (Temporary NPCs)
The Game Master can generate minor side characters on the fly (up to two active simultaneously to avoid context bloat), such as merchants, guards, or hostile monsters. The AI automatically assigns an appropriate visual archetype avatar. They participate in the dialogue, play out their scene role, and are removed (despawned) by the GM once they leave or die.

### 3. Smart Speaker Queue
The Game Master determines which companion speaks next based on three strict logical rules:
*   **Direct Address:** If you or any companion explicitly mentions another companion's name in their dialogue (e.g., *“Golo, what do you think?”*), the engine immediately routes the next turn to that character, bypassing the standard queue.
*   **Loop Prevention:** The AI monitors interactions to ensure two companions do not get stuck in an infinite loop speaking only to each other. On the third turn of mutual dialogue, the system forces the speaker turn back to you or a third party member.
*   **Trait-Based Reactions:** If an abrupt world event occurs (e.g., an explosion), the turn is automatically routed to the party member whose character traits dictate they would react first (e.g., a cowardly character panics, while a brave one draws their weapon).

### 4. Interactive Choices Bar
An adaptive selector dynamically appears at the bottom of the screen, offering 2 to 4 tactical choices depending on the situation:
*   *In Combat (Encounter):* Battle and defensive maneuvers (attack, seek cover, retreat).
*   *Exploration (Discovery):* Environmental interactions (search chest, inspect altar).
*   *Dialogues:* Emotional tones or specific speech prompts.

You are always free to ignore the choices and type your own custom action — the Choices Bar serves as a helpful prompt and will slide away as soon as you start typing.

---

## Part 4. The "God" Control Panel

At the top of the interface, you have access to tools providing absolute control over the game session:

*   **Continue Plot:** Progresses the story forward without you having to type anything. The Narrator will make a turn, describing events, or pass the floor to companions.
*   **Interrupt:** Instantly stops the active AI text generation if the narrative begins to drift in an undesirable direction.
*   **World State Editor (Manual Mode):** Allows you to manually edit the game state at any moment: modify current weather, location, time of day, add or remove items from the inventory, clear injuries, or edit established world facts.
*   **View Soul Memory:** Allows you to open the long-term cognitive memory of any active party member during the game to review their inner thoughts, goals, and active trust levels.

---

## Part 5. Narrative Context Archiving

During long campaigns, the active context window inevitably fills up. To prevent characters from forgetting the beginning of your quest, Soul Stage includes a narrative compression module.

When the conversation history approaches your context window memory limit, the program automatically takes the oldest events (starting from 14 steps back) and compresses them into a single, dense, informational paragraph of historical summary. This allows you to play a single scene for weeks without experiencing logic breaks or slow generation speeds.

---

## Conclusion

The Soul Stage mode in Soul of Waifu lets you go beyond a simple chat and immerse yourself in an interactive environment where you can create vivid stories. A separate, independent Game Master role, tracking of your inventory and stats, dynamic NPC spawning, and smart turn allocation among your companions create a unique role-playing experience where you are the protagonist of your own story. Experiment with different Storyteller styles, write your own scenes, or download ready-made scenarios from Characters Gateway to discover new worlds alongside your companions.

---

## What's Next?

| Section | Description |
|---|---|
| [User Personas](#!/course-persona) | Configuring your profile: how to ensure the AI perceives you correctly. |
| [System Prompt](#!/course-system-prompt) | Configuring the global template of instructions and the compiled request structure. |
| [Soul Memory](#!/course-soul-memory) | How the Soul Memory long-term memory is structured and the character's personal diaries. |