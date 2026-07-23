# Image Generation

> Guide to configuring visualization: integration with local (Automatic1111, ComfyUI, FLUX) and cloud (NovelAI, DALL-E 3) image generators.

Soul of Waifu features an advanced illustration generation module. Your characters can not only communicate with you via voice and text, but also send you their images upon request, visually illustrating the events taking place in the roleplay. 

All generated images are automatically saved to the character's individual gallery on your disk.

---

## Supported Generation Providers

The system supports five popular generation engines for every taste—ranging from completely local setups to commercial-grade cloud neural networks:

| Provider | Type | Style | Required for Startup |
|---|---|---|---|
| **Automatic1111** | Local | Universal | An Automatic1111 WebUI instance running on your PC with the API endpoint flag enabled. |
| **ComfyUI** | Local | Universal | A running ComfyUI instance configured for compatibility with the Automatic1111 API. |
| **FLUX** | Cloud | Photorealism | An ultra-detailed model. Requires a FAL API Token. |
| **NovelAI** | Cloud | Anime Art | The world's leading anime graphics generator. Requires a paid API key. |
| **DALL-E 3** | Cloud | Universal | An OpenAI generator. Requires a standard OpenAI API key. |

---

## How Generation Works: Prompt Formula

When you ask the character to send an image, the program automatically compiles the final request (prompt) from three components:

```
    [Quality Prefix (Prefix)] + [Core Prompt (Core Prompt)] 
                                ↓
                     [Final Prompt sent to AI]
                                ↓
                       [Negative Prompt applied (Negative)]
```

*   **Quality Prefix (Prefix Prompt):** Configured in the global settings. This is a set of default tags to improve the image (for example: *"masterpiece, best quality, highly detailed, vivid colors"*). It is automatically added to the beginning of any prompt.
*   **Core Request (Core Prompt):** Formed by the language model based on what is currently happening in the chat (for example, a description of the character's pose, their clothing, or the location).
*   **Negative Prompt (Negative Prompt):** A list of things that should not be in the image (for example: *"ugly, deformed, bad anatomy, blurry"*). Used for local models and NovelAI.

---

## Step-by-Step: Setting Up a Local Generator (Automatic1111 / ComfyUI)

If you want to generate images completely free on your own graphics card:

1.  Install and launch the local web interface for **Automatic1111** (Stable Diffusion) or **ComfyUI**.
2.  When launching, make sure to specify the `--api` flag so that Soul of Waifu can communicate with the generator's server.
3.  In the Soul of Waifu settings, go to the **Image Generation** tab.
4.  Specify the address of your local server (by default for Automatic1111 this is `http://127.0.0.1:7860`).
5.  Select the desired resolution of the images (for example, 512x768 or 1024x1024 for FLUX models) and configure the number of generation steps.

::: tip
**Optimization for Graphics Cards:**
If you have low video memory (VRAM), launching the text model and the image generator (Stable Diffusion / FLUX) simultaneously may cause the program to crash. In this case, it is recommended to use cloud providers (DALL-E 3 or NovelAI) or offload more layers of the text model to the processor (CPU).
:::

---

## Where are the Images Saved?

All images created during communication are automatically placed in your chat's personal folder:
`app/data/.soul/Character_Name/chats/Chat_ID/images/`

You can open the chat gallery at any time to review all received artwork, or look at the folder on your disk using standard Windows Explorer.

---

## Conclusion

The integration of image generators in Soul of Waifu completely blurs the boundary between textual storytelling and an interactive visual novel. The ability to fine-tune styles, support local diffusion models, and integrate top cloud generators allow your companion to visually demonstrate themselves and the surrounding world, adjusting the visuals to every scene of your adventure.

---

## What next?

| Section | Description |
|---|---|
| [Discord Integration](#!/course-discord) | How to connect a bot and generate images directly on your Discord server. |
| [Local Web Interface](#!/web-interface) | How to view generated images from a smartphone on your local network. |
| [Avatars](#!/avatars) | Setting up Live2D and VRM models that replace static image generation in real time. |