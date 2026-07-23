# User Personas

> How to correctly configure the player profile, avoid confusion with gender and appearance in dialogue, and link different roles to characters.

In roleplay interaction with AI, the quality of responses depends not only on how well the character card is designed, but also on how well the model understands **exactly who** it is conversing with.

For this, Soul of Waifu uses a tool called **User Personas** — your digital avatar in the eyes of the language model.

---

## What is a Persona?

A **Persona** is a player profile consisting of a display name, an avatar, and a text description of your appearance, character, gender, age, and role in the story.

::: warning
**The Main Issue with AI Chatbots — Loss of Context about the User:**
If you do not use a Persona, language models will eventually start to confuse your gender, make assumptions about your hair color, age, or social status depending on how the conversation progressed. A Persona rigidly locks your parameters for the AI.
:::

---

## Advantages of the Multi-Persona System

Unlike simple AI interfaces where only one global user profile is available, in Soul of Waifu you can create an unlimited number of personas and manage them flexibly:

::: cards
#### <i class="fas fa-arrows-spin"></i> Switching Masks for the Setting
Create a standard persona (with your real name and appearance) for everyday communication with your desktop companion, a fantasy knight for text-based RPGs in Soul Stage, and a cyber-detective for noir plots.
---
#### <i class="fas fa-link"></i> Binding to Characters
You can bind a specific persona to a specific character card. When launching a chat, the application automatically activates the correct mask, saving you from having to switch profiles manually.
---
#### <i class="fas fa-users"></i> Group Chat Simulation
Within a single dialogue, you can switch your active persona "on the fly." This allows you to play out actions on behalf of different heroes, temporarily changing the mask right in the middle of an active roleplay scene.
:::

---

## How the Persona Editor Works

To create or edit a persona, navigate to the **Roleplay Editor** section (in the left sidebar) and open the **Personas** tab.

![Persona Editor](assets/sc_personas_1.png)
*Persona creation interface: fields for entering name, avatar, and role description*

When you click the add button, three key fields will open before you:
1.  **Avatar:** Your visual representation in the chat message bubbles (supported formats: JPG, PNG).
2.  **Display Name (`Name`):** The name the character will address you by in dialogues (it is automatically substituted in place of the `{{user}}` macro).
3.  **Description (`Description`):** A text block revealing your personality to the neural network.

---

## Golden Rules of Writing a Persona Description

For the model to understand your profile with 100% accuracy, write your description in accordance with modern prompt engineering rules:

### 1. Write in the Third Person via the `{{user}}` Macro
*   **Bad (first person):** *"I am a guy with dark hair, I am 25 years old, I love Soul of Waifu..."* (Using the word "I" often confuses local LLMs — the model might decide these are its own thoughts and start adopting your traits).
*   **Great (third person):** *"{{user}} is a dark-haired twenty-five-year-old guy. Enthusiastic about roleplaying games with neural networks, enjoys conversing on any topic."*

### 2. Use XML Structuring
2026-generation models are exceptionally well-trained to work with XML tags. Wrap the description in tags so the model clearly separates your parameters from the chat history.

*Example of an ideal persona description:*
```xml
<user_profile>
Name: {{user}}
Age: 28
Gender: Male
Appearance: Short, hunched from long hours over books. Sparse gray hair braided into a pigtail, thick round glasses on the bridge of his nose. Eyes are green, coming alive only when something of interest is mentioned. Dressed in multi-layered, sun-faded clothes tied with laces instead of buttons.
Personality: Conversational only about his own field. Treats practical matters with slight annoyance, viewing them as distractions from what is important. Cannot tolerate loud noises and hasty conclusions.
</user_profile>
```

### 3. Maintain a Token Diet (Keep it Brief)
Do not write giant 10-page biographies. The AI model must process your persona description **with every single request**.
*   Optimal description size: **300–600 characters** (roughly 2–4 concise sentences or a structured XML list). This conserves context window space and prevents cluttering the AI's attention with secondary details.

---

## What to Do If the AI Ignores You or Confuses Details?

If the character in the chat persistently calls or describes you differently from what you wrote in your persona:

1.  **Check the correctness of the macro:** Ensure that you are using the same name in the persona description and on the main website, and that the `{{user}}` macro is present in the description text.
2.  **Change priority in the System Prompt Editor:**
    In Soul of Waifu, you can navigate to the system prompt settings and physically move the **Persona Information** block closer to the end (closer to the chat history). The closer your persona description is to the latest messages, the higher priority it holds for the neural network's attention.

---

## What's Next?

| Section | Description |
|---|---|
| [System Prompt](#!/course-system-prompt) | How to configure global instructions and manage the layout of data blocks. |
| [Lorebooks](#!/course-lorebooks) | Mechanics of dynamic lore connection and creating an active game world. |
| [Soul Memory](#!/course-soul-memory) | How the Soul Memory long-term memory is structured and the character's personal diaries. |