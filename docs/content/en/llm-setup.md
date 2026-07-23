# LLM Setup

> In-depth guide to configuring AI models: generation parameters, hardware optimization, and advanced sampling.

In Soul of Waifu, AI settings are organized into four intuitive cards (panels) that allow you to seamlessly manage both cloud-based networks and local executions on your PC.

To modify these parameters, navigate to the **Options → LLM Settings** tab.

---

## Card 1: General Generation Parameters

These parameters control the default prose style of the AI. They apply to both local models and most cloud-based providers.

::: cards
#### <i class="fas fa-text-width"></i> Max Tokens (Response Length)
Controls the maximum size of the character's response in a single turn. A token is a fragment of a word (a syllable or a punctuation mark).
*   **Impact:** Setting this too low will cause the character to cut off their thoughts mid-sentence. Optimal for roleplay: `300–600` tokens.
---
#### <i class="fas fa-temperature-half"></i> Temperature
Determines the level of creativity and randomness in the generated text.
*   **Low (0.1–0.5):** The model responds logically, predictably, and dryly. Perfect for technical tasks.
*   **Medium (0.7–0.9):** The golden standard for roleplay. The character feels lively yet coherent.
*   **High (1.2–2.0):** Complete creative freedom. The AI starts inventing wild plots but might lose track of facts and ignore system prompts.
---
#### <i class="fas fa-filter"></i> Top-P (Core Sampler)
Restricts vocabulary choices based on probability, discarding highly unlikely words.
*   **Impact:** If Top-P is set to `0.9`, the AI only considers words making up the top 90% probability spectrum, discarding the 10% "absurd" options.
*   *Note:* If you are using the advanced **Min-P** parameter (in Card 4), set Top-P to `1.0` (disabled) to prevent conflicts.
:::

### Repetition Penalties
*   **Frequency Penalty:** Penalizes the model for repeating the exact same words too often within a response. Helps expand the companion's vocabulary and prevents repetitive verbal tics.
*   **Presence Penalty:** Penalizes the model for returning to topics that have already been mentioned. Stimulates the AI to progress the dialogue and explore new topics.

---

## Card 2: Hardware & Backend

This block configures the low-level execution of local GGUF models on your computer.

### Inference Engine Settings
*   **Compute Setup:** 
    *   **CPU / GPU:** Choose your computing device. CPU execution is slow but works on low-end systems; GPU execution is significantly faster.
    *   **GPU Device:** Select **CUDA** for NVIDIA graphics cards, **HIP** for AMD, **SYCL** for Intel, or the universal **Vulkan** backend for integrated graphics.
    *   **"Update" Button:** Automatically downloads and installs the latest, highly optimized `llama.cpp` binaries specifically compiled for your selected hardware backend.
*   **KV Cache Type (Context Cache Quantization):** 
    Compresses the context memory of the dialogue. Over long conversations, the chat history fills up your video memory. Selecting `q8_0` or `q4_0` compresses the dialogue cache several times over, freeing up vast amounts of VRAM.
*   **Optimization Checkboxes:**
    *   **MLock:** Forces the OS to lock the model file in your PC's physical RAM, preventing Windows from swapping it to the hard drive. Highly recommended for CPU-only inference.
    *   **Flash Attention:** A context optimization technology. Always keep this checked — it reduces VRAM overhead by 25-30% during long conversations.
    *   **Enable Thinking/Reasoning Mode:** Enables native support for reasoning models (such as DeepSeek-R1 or reasoning-capable Qwen 3.6 variants).

### Performance & Memory Tuning
*   **GPU Layers:** Determines how many model layers to offload to your graphics card. If you have a powerful GPU (e.g., RTX 4060), set this to maximum to run the model entirely on the GPU. If you run out of VRAM and the app crashes, lower this slider to keep some layers in system RAM.
*   **CPU MoE Layers:** A specialized setting for Mixture of Experts (MoE) models (like Mixtral). Keeps inactive "expert" layers in system RAM, saving massive amounts of VRAM.
*   **Context Size:** The maximum amount of past messages the AI can hold in its active memory. For local models, the recommended sweet spot for speed and memory is `4096` or `8192` tokens. For cloud APIs, set this to `-1` (unlimited).
*   **Prompt Batch Size:** The number of tokens processed in a single batch when analyzing history. Higher values (such as 2048) significantly speed up processing of large lorebooks and long-term memory.
*   **Custom Arguments:** A text field for advanced users. Allows you to pass specific startup flags directly to the Llama.cpp server (e.g., `--temp 0.8 --name "MyModel"`).

---

## Card 3: Prompting & Formatting

Dialogue structure configuration. The AI must understand where its turn ends and yours begins.

*   **Chat Template:** Defines the formatting syntax specific to each model family (`Llama-3`, `Qwen`, `Mistral`, `ChatML`). Leaving this on `Auto` allows the program to automatically extract the template from the downloaded model's metadata.
*   **Stop Strings:** A set of strings or tokens that instantly stop AI generation if produced (e.g., `\nUser:`, `<|im_end|>`). This prevents the model from generating dialogue on behalf of the user.

---

## Card 4: Advanced Local LLM Sampling

Check **"Enable Advanced Sampling"** to unlock these parameters (standard settings from Card 1 will be ignored when active). These filters make the AI's prose highly natural and eliminate standard chatbot loop behaviors.

::: cards
#### <i class="fas fa-wave-square"></i> Min-P (Modern Word Filter)
The best alternative to the legacy Top-P sampler. Discards words based on model confidence.
*   **How it works:** If Min-P is set to `0.05`, the model discards any tokens with a probability lower than 5% of the top token's probability. This eliminates incoherent gibberish while keeping the companion's vocabulary rich.
---
#### <i class="fas fa-arrows-spin"></i> Dynamic Temperature
Allows the temperature to float dynamically between a minimum and maximum range based on context.
*   **Impact:** The AI responds logically and structurally to straightforward questions, but displays vivid, rich, and creative prose during emotional actions or narrative descriptions.
---
#### <i class="fas fa-spell-check"></i> XTC (Anti-Cliché)
An advanced sampler that excludes highly predictable, boring, and cliché words from generation.
*   **Impact:** Forces the model to select creative synonyms, completely removing repetitive book tropes and clichés from the generated text. Recommended setting: `0.3–0.5`.
---
#### <i class="fas fa-ban"></i> DRY (Anti-Loop)
A mathematical algorithm designed to completely block action loops.
*   **Impact:** Prevents the companion from repeating the exact same physical actions or descriptions over and over (e.g., *«she quiet sighed and nodded»* in every single response). Recommended multiplier: `0.8`.
:::

---

## What's Next?

| Section | Description |
|---|---|
| [Text-to-Speech](#!/tts) | Configuring speech generation engines, Qwen3-TTS voice cloning, and calls. |
| [Avatars](#!/avatars) | Setting up animated Live2D actions, LipSync, and VRM 3D models. |