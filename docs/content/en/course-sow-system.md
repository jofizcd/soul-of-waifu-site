# Soul of Waifu System Module

> Setting up the multimedia environment: custom backgrounds, background sounds (ambient), fine-tuning frame rates, and voice call modes.

If you are tired of just texting in chat, the program offers a completely new level of immersion—live voice conversation. In this section, we will analyze the auxiliary multimedia module **Soul of Waifu System (SOW System)**, which is responsible for the character's environment, background sounds, and voice call operation.

---

## 1. Avatar Backgrounds

In modern versions of the program, you can replace the standard dark background of the chat or call window with any image or solid color.

Background settings are located in the **Settings → SoW Modules** tab:
*   **Color Background:** Allows you to set any solid color to fill the background.
*   **Image:** You can set any picture as a background.

::: tip
**Recommendations for choosing images:**
*   **For regular chat:** Since the animated avatar of the character is located on the right side of the screen, **vertical** images are best suited for the chat.
*   **For voice calls:** The call window can be freely stretched and scaled, so high-quality **horizontal** wallpapers and landscapes are ideal for it.
:::

All your custom background images are stored in the folder:
`assets/backgrounds/`

---

## 2. Audio Accompaniment Module (Ambient)

Environmental sounds are a critical element of a role-playing game's atmosphere. The rustling of leaves, the howling of a blizzard, the sound of rain tapping on the glass, or the hum of a fantasy tavern literally help you feel the setting.

### How to enable ambient:
1.  Go to the **Settings → SoW Modules** tab.
2.  Activate the audio accompaniment (ambient) module.
3.  Select the desired sound loop from the dropdown list that appears.
4.  You can add your own audio files in MP3 or WAV format to the program folder:
    `assets/ambient/`

---

## 3. Voice Call to the Character

A voice call allows you to communicate with your companion in real time without touching the keyboard at all. Depending on your preferences, the call supports two visual modes:

### Mode with Interface (Call Window)
In this mode, the program opens a separate window where the emphasis shifts from text chat to a large display of your animated character. The text chat takes a back seat and is located on the left.
*   You can freely scale the window and drag the character model across the screen.
*   If you have a Live2D model installed, you can limit its frame rate (FPS) in the Local LLM settings in the range of 30 to 120 frames per second to reduce the CPU load.

### Mode without Interface (Soul Companion)
The program launches a clean, transparent window containing **only your character model** (no borders, buttons, or chat history).
*   This is an ideal Speech-to-Speech presence mode. You can place the character in a corner of the screen and talk to them while working in a browser or playing games.

---

## 4. How is the Voice Communication Cycle Structured?

Soul of Waifu is equipped with an advanced speech recognition system (Speech-to-Text):
* **Faster Whisper:** A modern multilingual standard. It recognizes speech with phenomenal accuracy, accounts for punctuation marks, and can run on your graphics card (GPU).

```
                 [You speak into the microphone]
                            ↓
               [Step 1: Signal from Silero VAD]
           The program understands you started speaking,
           and instantly silences the character's voice (interruption)
                            ↓
             [Step 2: Transcription (STT)]
           Faster Whisper translates your voice into text
                            ↓
                [Step 3: Brain (LLM) + Voice (TTS)]
           The text is sent to the neural network, which generates a response,
           and the speech engine (e.g., Qwen3-TTS) voices it
                            ↓
               [Step 4: Animation and emotions]
           The character speaks, moves their lips (LipSync),
           and changes the avatar's facial expressions based on context
```

::: tip
**Instant Interruption Feature:**
You don't have to wait for the character to finish speaking their line. Our voice detection system (Silero VAD) will instantly understand if you start talking. The character will immediately stop speaking and start listening to your new phrase.
:::

---

## Conclusion

The Soul of Waifu System module combines visual, sound, and speech technologies into a single seamless pipeline. The ability to fine-tune the frame rate of the avatar, choose custom backgrounds and ambient loops, and use modern Faster Whisper speech recognition systems brings voice interaction to the level of a full-fledged live conversation. Now you are fully ready to customize your unique companion, choose the perfect voice, launch your favorite background ambient, and start an exciting journey into the world of voice AI roleplay!

---

## What next?

| Section | Description |
|---|---|
| [User Personas](#!/course-persona) | Configuring your profile: how to make the AI see the world through your eyes. |
| [System Prompt](#!/course-system-prompt) | Configuring the global instruction template and the structure of the assembled request. |
| [Soul Companion](#!/course-soul-companion) | Soul Companion architecture: how the character works in a desktop environment. |