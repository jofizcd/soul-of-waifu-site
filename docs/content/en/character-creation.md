# Character Creation

> A complete guide to creating modern, token-efficient character cards using the V2 Spec standard.

A character card is not just a collection of static attributes; it is a semantic profile for the language model. How you construct the card directly determines whether your companion will chat like a vivid, complex personality or default to dry, robotic, and formulaic responses.

This guide explores modern character design patterns optimized for flagship 2026-generation models (such as **Gemma 4** and **Qwen 3.6**).

::: tip
**Quick Import:** Remember, you do not have to fill out all fields manually. You can simply drag and drop a `.png` or `.json` card file from Windows Explorer into the Soul of Waifu window to instantly import it.
:::

---

## Paradigm Shift: Prose & XML vs. Code

In the past, creators relied heavily on W++ and PLists (bracketed pseudo-code like `[Appearance("tall", "blonde")]`) to conserve precious tokens inside narrow 2K–4K context windows.

Modern LLMs are vastly smarter. They have been trained extensively on rich creative literature and structured programming code. Using outdated pseudo-code formats hampers their ability to write expressive prose, making their outputs rigid and formulaic.

### How Character Cards are Designed:

1.  **Natural Prose:** Describe your character's traits, appearance, and history using standard, expressive creative language. Modern models capture the "vibe" and descriptive style of prose far better than a dry checklist of traits.
2.  **XML Tag Delimiters:** Enclose logical sections inside XML-like tags (e.g., `<appearance>` or `<personality>`). High-tier instruct models parse XML delimiters flawlessly, preventing prompt bleed and keeping character behavior highly stable over long conversations.

---

## Character Editor Fields Explained

Let us look at the role of each field in the **Character Editor** tab and how to configure them correctly:

### 1. Name and Avatar
The character's name is used by the model for self-identification. Always use the standard `{{char}}` (for the character) and `{{user}}` (for the user) macros in your internal descriptions to keep the card universally compatible.

### 2. Description
The core field where you define the character's physical description, backstory, and world context. Use XML-like tags to cleanly structure the information.

*Example of a modern Prose+XML description:*
```xml
<appearance>
{{char}} is a battle-hardened knight in her late twenties, with short-cut silver hair and amber eyes that rarely show warmth. She wears ornate, battle-scarred steel armor.
</appearance>

<backstory>
Raised in a strict military household, {{char}} treats most social interactions like a negotiation. She despises courtly diplomacy, believing that strength is the only true leverage. She currently commands a border patrol unit.
</backstory>
```

### 3. Personality
A summarized output of the character's psychological traits, habits, fears, likes, and dislikes.

*Example configuration:*
```xml
<personality>
{{char}} speaks bluntly and directly, harboring a deep hatred for deception. Beneath her cold exterior lies a fierce protectiveness toward anyone she considers worth defending.
</personality>

<likes_dislikes>
Likes: strong black coffee, maintaining her weaponry, disciplined soldiers.
Dislikes: flattery, cowardice, sweet desserts.
</likes_dislikes>
```

### 4. Scenario
Sets the starting situation, physical location, and general atmosphere of the chat. It is also highly effective to define mood tags here:

*Example:*
```markdown
[Scenario: {{user}} meets {{char}} in a dangerous border forest; Tags: fantasy, grim, adventure]
```

### 5. First Message (Greeting)
**The single most impactful field for the generation format.** The first message establishes the generation pattern: its length, descriptive style of physical actions, and speech mannerisms.
*   If you want deep, literary roleplay, write a long, descriptive first message.
*   If you want a quick, conversational chatbot, keep the greeting short and punchy.

::: danger
**Write ONLY from the character's perspective!**
Never write actions or dialogues for the user (`{{user}}`) in the first message. Doing so strips the player of their freedom of choice and encourages the model to write for the user as the chat progresses.
:::

### 6. Dialogue Examples (Ali:Chat)
This field explicitly demonstrates to the model how the character should talk: their slang, catchphrases, tone, and emotional inflections. This is known as the **Ali:Chat** method.

Separate dialogue examples using the `<START>` macro:

```markdown
<START>
{{user}}: "You look exhausted. Why don't you take a break?"
{{char}}: *She doesn't even look up, continuing to slowly slide her whetstone along the steel blade with a soft, rhythmic scrape.* "A break? There are no breaks on the border, mercenary. If you want to rest, crawl back to the capital."
```

### 7. Alternative Greetings
Allows you to create branching scenarios for starting the conversation. Each new greeting must begin with the `<GREETING>` macro. When launching a new chat, you can choose which scene to start with.

---

## Professional Card Design Tips

::: cards
#### <i class="fas fa-microchip"></i> Token Optimization
While modern PCs handle large context windows easily, keep your permanent card size within 600–1000 tokens. Bloated cards waste context space and slow down generation speeds on local hardware.
---
#### <i class="fas fa-feather-pointed"></i> Style Consistency
Avoid mixing narrative formats. Choose one style and stick to it: either **novel style** (*"Hello," she said, fixing her hair.*) or **markdown style** (*She smiles and fixes her hair.* "Hello!"). Models generate cleaner text when formats are not mixed.
---
#### <i class="fas fa-pen-fancy"></i> Prose Infiltration
The linguistic quality of your card description dictates the quality of the model's outputs. If you write the description using dry, clinical language, the AI's prose will be dry. Write with rich, expressive language to match the tone you want.
:::

---

## What's Next?

| Section | Description |
|---|---|
| [LLM Setup](#!/llm-setup) | CPU/GPU layer offloading, MoE setup, Flash Attention, and Llama.cpp optimization. |
| [Text-to-Speech](#!/tts) | Connecting TTS engines, voice cloning, and voice interruption parameters. |
| [Avatars](#!/avatars) | Loading Live2D and VRM models, setting up LipSync, and mapping emotions. |
```