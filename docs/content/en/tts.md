# Text-to-Speech (TTS)

> Guide to configuring speech generation engines, voice cloning, and RVC timbre conversion.

Soul of Waifu features a powerful audio pipeline that allows your companion to speak in real-time. By clicking the TTS button on any character card, you can configure and assign a voice using any of the supported speech engines.

::: tip
**Sentence-by-Sentence Streaming:**
In version v2.4.0, speech generation operates on a sentence-by-sentence basis. The application no longer has to wait for the LLM to complete its entire message. Audio playback starts automatically as soon as the first sentence is generated, reducing latency to an absolute minimum.
:::

---

## Supported Speech Generation Engines

The program supports both lightweight cloud-based options and advanced local models running directly on your computer:

::: cards
#### <i class="fas fa-microchip"></i> 1. Qwen3-TTS (Local Flagship)
The state-of-the-art standard for local speech synthesis. Available in a high-fidelity version (1.7B parameters) and a lightweight version (0.6B) for weaker graphics cards.
*   **Voice Cloning:** Simply provide the model with a short 3-second audio file, and your character will immediately adopt that specific timbre.
*   **Text-to-Voice Design (Instruct):** You can describe the desired voice using standard text (e.g., *"deep, raspy male voice with a slight accent"*), and the model will generate it from scratch. Supports 10 languages.
---
#### <i class="fas fa-bolt"></i> 2. Kokoro 82M (Ultra-Fast Local)
A revolutionary lightweight model that has gained massive popularity due to its phenomenal generation speeds and exceptional voice quality.
*   **Features:** Extremely light on system resources and has a tiny disk footprint. Perfect for running on CPUs and ideal for further timbre-masking via RVC.
---
#### <i class="fas fa-microphone-lines"></i> 3. XTTSv2 (Local Cloning)
A multilingual local model capable of cloning any voice from a short audio sample lasting 6 to 10 seconds.
*   **Features:** Comes with three built-in base voices. You can replace them with your own reference files. Requires downloading and accepting the license agreement on first launch.
---
#### <i class="fas fa-volume-high"></i> 4. Silero TTS (Local Russian)
An excellent offline speech engine designed specifically for Russian language text-to-speech.
*   **Features:** Runs fully locally, offers dozens of expressive pre-built Russian voices, requires very low computing power, and runs perfectly on budget PCs.
---
#### <i class="fas fa-cloud"></i> 5. Edge TTS & ElevenLabs (Cloud Engines)
*   **Edge TTS** — a free, fast, and highly stable cloud service by Microsoft. The ideal base voice "donor" for overlaying RVC models.
*   **ElevenLabs** — a premium cloud engine featuring incredibly realistic inflections, breathing, and emotional depth. Requires an API key (comes with a free monthly limit).
:::

---

## RVC Voice Conversion (Timbre Masks)

**RVC (Retrieval-Based Voice Conversion)** is a technology that takes generated audio (such as fast speech from Edge TTS or Kokoro) and overlays a "timbre mask" of a specific character from an anime, game, or real life.

This resolves the primary limitation of standard TTS engines — limited base voices. With RVC, your companion will sound exactly like their original prototype.

### How to Install an RVC Model:
1.  Download your preferred character model from **Weights** or the **AI Hub** Discord server.
2.  An RVC model consists of two files: `.pth` (the voice file) and `.index` (the intonation index).
3.  Create a new folder inside `Soul-of-Waifu/assets/rvc_models/`. The folder name **must match exactly** with the filenames of your RVC files.
4.  Place both files inside that folder.

*Example of a correct file path structure:*
`Soul-of-Waifu/assets/rvc_models/Gemma/Gemma.pth`
`Soul-of-Waifu/assets/rvc_models/Gemma/Gemma.index`

::: tip
**Fine-Tuning RVC in v2.4.0:**
RVC parameter sliders are now available directly inside the TTS configuration window. You can adjust consonant protection (to prevent distortion), sample rate, and the influence of the intonation index (Index Rate) to achieve perfect voice matching.
:::

---

## Voice Call Mode

You can talk to your character using your microphone in real-time. The system utilizes:
*   **Silero VAD** — an intelligent voice activity detector that instantly knows when you start speaking.
*   **Faster Whisper** — locally transcribes your microphone audio into text (STT).
*   **Interruption Support:** If the companion speaks for too long or if you want to cut them off, simply start speaking. The system will instantly stop both text generation and audio playback and begin listening to you.

---

## What's Next?

| Section | Description |
|---|---|
| [Avatars](#!/avatars) | Setting up animated Live2D actions, LipSync (mouth-matching), and VRM 3D models. |
| [Character Creation](#!/character-creation) | In-depth card editor guide if you wish to create a companion with a custom voice. |