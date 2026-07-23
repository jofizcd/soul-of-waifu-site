# Quick Start

> Create your first character and start chatting in just 5 minutes.

To breathe life into a character, the program needs a "brain" — a language model. You can choose one of two paths:
1.  **Cloud Models (Fast):** Run via the internet and require entering an API key.
2.  **Local Models (Private):** Run entirely on your computer offline, requiring you to download the model to your drive.

---

## Step 1 — Choosing Your AI (10 Supported Providers)

Soul of Waifu comes with built-in support for **10 different AI providers**. Go to the **Settings → API & Providers** tab and choose the option that suits you best:

::: cards
#### <i class="fas fa-globe"></i> 1. Cloud Hubs & Proxies
*   **OpenRouter** — grants access to hundreds of models. You can select models marked as `free` (such as `DeepSeek V3 (free)`) to chat completely for free.
*   **OpenAI-like API** — allows you to connect any third-party proxies or local servers (LM Studio, KoboldCPP, etc.).
---
#### <i class="fas fa-cloud"></i> 2. Direct Cloud Keys
Paste your API keys directly to work with the following AI networks:
*   **OpenAI** (ChatGPT)
*   **Anthropic Claude**
*   **DeepSeek**
*   **Grok** (xAI)
*   **Google Gemini**
*   **Qwen** (Alibaba)
*   **Mistral AI**
*   **Z.AI**
---
#### <i class="fas fa-microchip"></i> 3. Local Execution (Local AI)
*   **Llama.cpp** — fully autonomous execution of GGUF models on your CPU or GPU without internet or subscriptions, managed via the **Models Hub** tab.
:::

---

## Step 2 — Setting Up a Local Model (if you chose Local AI)

If you decided to run models on your own computer, evaluate your hardware capabilities before downloading:

### Requirements for Local Models (Q4_K_M Quantization)

| Model Size | Graphics Memory (VRAM) | System Memory (RAM) | Target Hardware |
|---|---|---|---|
| **7B (7 billion parameters)** | 5–6 GB | 16 GB | Laptops, budget PCs, GPUs like GTX 1060 / RTX 3050 |
| **13B / 14B** | 9–10 GB | 32 GB | Mid-range gaming PCs, GPUs like RTX 3060 / 4060 |
| **30B / 32B** | 20–24 GB | 64 GB | High-end PCs with GPUs like RTX 3090 / 4090 |
| **70B / 72B** | 40+ GB | 96–128 GB | Professional workstations |

::: info
**What is Quantization (Quants)?**
AI models are extremely large. To fit them onto standard home PCs, they are compressed (quantized). 
*   **Q4_K_M** — the golden standard. It compresses the model file by nearly 4x while preserving 99% of the original quality. We highly recommend selecting this one.
*   **Q6_K_M** — if you have plenty of free memory. The quality is near-perfect, but the file size is larger.
*   **Q3_K_M** — maximum compression for weaker graphics cards, with a 15-20% drop in quality.
:::

### Step-by-Step Local Model Launch:

1.  Navigate to the **Models Hub** tab.
2.  Search for your model of choice (e.g., `Gemma 4` or `Qwen 3.6`).
3.  Click the download button next to the desired quant (we recommend **Q4_K_M**).
4.  The built-in downloader displays download progress directly in the interface. You can cancel the download at any time by clicking the "Stop" button.
5.  After the download completes, go to **Settings → Local LLM** and choose the backend for your graphics card:
    *   **CUDA** — for NVIDIA graphics cards.
    *   **Vulkan** — for AMD, Intel, and integrated graphics.
6.  Return to the **Models Hub**, find your downloaded model, and click the **Start** button. Wait for the model to load into memory.

::: tip
**Boosting Performance (Flash Attention):**
In the Local LLM settings, make sure to enable the **Flash Attention** checkbox. This reduces video memory (VRAM) consumption by 25-30% during long conversations.
:::

---

## Step 3 — Adding a Character

Now that the application's "brain" is configured, choose or create a character to communicate with. You have three paths:

1.  **Quick Import (Drag-and-Drop):** Simply drag and drop your character card file (in `.png` or `.json` format) from explorer directly into the application window. The card will instantly be added to your library.
2.  **Characters Gateway:** Go to this tab, find a character you like in the built-in directory (integrated with Chub.ai), and download them in a single click.
3.  **Create from Scratch:** Open the **Character Editor** tab. Fill in the basic fields: name, character description, scenario, and first welcome message. Click "Create Character".

---

## Step 4 — Let's Go!

1.  Navigate to the **Main Menu** tab.
2.  Click on the card of your newly created or imported character to open the chat window.
3.  Type a message and send it. The character will reply using your chosen language model!

---

## What's Next?

| Section | Description |
|---|---|
| [Character Creation](#!/character-creation) | In-depth breakdown of editor fields, alternative greetings, and variables. |
| [LLM Setup](#!/llm-setup) | Configuring Llama.cpp to squeeze the maximum speed out of your PC. |
| [Text-to-Speech](#!/tts) | How to enable voice generation and configure voice calls. |