# Variables and States

> Guide to deterministic game mechanics: two-level storage architecture, adaptive HUD, automatic AI command parser, and step-by-step update lifecycle.

The custom state variables system in Soul of Waifu is a deterministic game mechanic that allows you to turn regular text communication with a character into an interactive novel, RPG, or dating simulator without writing a single line of code.

This system works exclusively within a single text chat with a character, providing a role-play process with numerical and logical tracking of parameters on a special panel (HUD) in real time.

---

## What Makes This Mechanic Powerful and Unique?

In traditional role-playing shells, managing variables (such as affection levels or player health) is a massive headache for the creator. Authors are forced to write complex Javascript macros, set up cumbersome Quick Replies, manually write regular expressions to intercept text, or install third-party extensions that break after the very first program update.

### In Soul of Waifu, everything is set up much simpler and more reliably:
*   **Complete No-Code:** You configure variables in a convenient visual editor. Just choose a name, an icon, and a range of values.
*   **Automatic HUD:** The program itself calculates sizes, alignment, and smoothly animates progress bars during changes without taxing the CPU.
*   **AI Interceptor and Sanitizer:** The application backend automatically intercepts model commands, cleans JSON markup from typical AI typos (such as cutting out incorrect "plus" signs before numbers), and saves files to disk without risking damage to the chat history.

---

## 1. Two-Level Storage Architecture

The system is split into two isolated levels, which guarantees structural stability and protects user progress from mixing up:

### Variable Template (At the Character Level)
The configuration of the variable schema is described in the character settings file under the `sow_variables` tab. This is where metadata is fixed: unique text identifier (`id`), display name (`name`), data type (`type`), range of values (`min`/`max`), HUD icon (`icon`), default value (`default`), and system prompt template (`prompt_template`).

### Runtime State (At the Specific Chat Level)
The current live values of variables are written to the `variables_state` dictionary inside the specific chat object (`chats` → `Chat ID`).
*   **Progress Isolation:** If you communicate with a character in one chat branch where you accumulated a high level of trust, and then create a new dialogue branch, the variables in the new branch will start their countdown from default values. Progress is strictly tied to a specific conversation and is not transferred between different chats of the same character.

---

## 2. Data Types and HUD Visualization on the Chat Panel

The chat interface dynamically deploys a horizontal HUD panel directly beneath the chat header. Depending on the variable type, the renderer selects the corresponding widget:

::: cards
#### <i class="fas fa-heart"></i> int (Integer Value)
Displayed as a flat progress bar and a text indicator of the numerical balance (for example, 45/100). The appearance of the bar adapts to the variable's meaning using linear gradients:
*   **heart** (Love, Relationships): pinkish-red gradient.
*   **coin, star** (Currency, Luck): golden-yellow gradient.
*   **sword, shield** (Combat, Defense): steel gray-blue gradient.
*   **Any other icons:** sky-blue gradient.
---
#### <i class="fas fa-toggle-on"></i> bool (Boolean Value)
Displayed as a compact text badge with values of YES or NO. When True, the badge is highlighted with a muted green color; when False, with red.
---
#### <i class="fas fa-list-ul"></i> list (Lists and Inventory)
Used to track arrays of strings (for example, inventory: Steel Sword, Health Potion). Displayed as a comma-separated list of items with line wraps disabled, protecting the HUD from visual overflow and vertical stretching.
---
#### <i class="fas fa-font"></i> str (String Value)
Used to fix text statuses (for example, the player's current faction or their social status in the plot).
:::

---

## 3. Value Modification Logic and Runtime Animations

The method for modifying variable values on the backend processes mathematical and logical instructions sent by the language model or entered manually:

### Mathematical Boundaries (Clamping)
For numerical types (int), the backend automatically ensures that the value does not go beyond the limits of the specified min and max range. Any attempt to set a value above or below the limit will be forcibly "clamped" to the extreme points, preventing interface bugs (such as negative health or 120% love).

### List Management Mechanics (Prefixes + and -)
For lists (list), a convenient change parser is implemented. Instead of overwriting the entire array, the model can send pinpoint instructions:
*   **+Steel Sword** — the backend checks for the item's presence and adds it to the list if it is not already there.
*   **-Steel Sword** — the backend finds this element in the array and removes it.

### Smooth Scale Interpolation (Change Animation)
When a numerical variable is updated, the scale value does not jump instantly. A special animation method initializes a smooth animation object lasting 500 milliseconds using an OutCubic mathematical decay curve. During the animation process, the numerical indicator smoothly recalculates values in parallel with the movement of the filling bar, creating an appealing effect.

---

## 4. Game Presets (Blueprints) and Prompt Injections

For rapid deployment of game scenarios without manual configuration, 11 detailed presets are built into the editor for various genres (Dating Sim, RPG, Horror, Survival, etc.). Each preset is equipped with a strict system template (`prompt_template`) that forces the AI to follow the current numbers.

*Example of prompt injection:*
```xml
<affection_barrier>
Affection Level: {value}/100. 
If value is BELOW 30: You are polite but emotionally guarded, cold, and formal.
If value is ABOVE 70: You are deeply in love, caring, and show maximal warmth.
</affection_barrier>
```

When the backend assembles the system prompt, it takes the current value of the variable (for example, 25) and substitutes it in place of `{value}`. The AI model sees the instruction: *“Affection Level: 25/100. BELOW 30: You are polite...”* and, based on this, deterministically chooses a cold and detached tone of communication. If Affection rises to 80, the prompt template will automatically change, instructing the model to display maximum warmth and care.

---

## 5. Variable Update Lifecycle

```
 [Step 1 — Prompt Assembly]
 The backend reads the current state of all variables from the chat,
 substitutes values into the prompt template, and sends it to the LLM.
                          ↓
 [Step 2 — AI Response Generation]
 The model generates a response, making a mathematical inference at the end of the message
 in the form of a special XML tag:
 *She smiles.* "Thank you for the gift!" <state_update>{"affection": 5}</state_update>
                          ↓
 [Step 3 — Interception and Cleaning]
 The backend parser finds the <state_update> tag, cuts it out from the message text,
 and cleans the JSON from model typos.
                          ↓
 [Step 4 — Recording and Saving]
 The program then calculates the new value, applies boundaries (min/max),
 writes the data to the chat configuration, and saves the data to disk.
                          ↓
 [Step 5 — Animation Trigger]
 And finally, the smooth HUD rendering method is called.
 The scale on the HUD panel smoothly transitions to the new value.
```

Thanks to this architecture, Soul of Waifu’s game logic remains flexible and resilient to typos in language models, allowing character creators to build truly interactive dating sims, RPGs, or horror mechanics right within the chat window.

---

## What next?

| Section | Description |
|---|---|
| [System Prompt](#!/course-system-prompt) | Configuring the global instruction template and the structure of the assembled request. |
| [Lorebooks](#!/course-lorebooks) | Mechanics of dynamically connecting lore and creating a living game world. |
| [Soul Memory](#!/course-soul-memory) | How long-term Soul Memory and the character's personal diaries are structured. |