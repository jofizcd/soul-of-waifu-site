# Local Web Interface (Web Client)

> Guide to using the built-in web server: launching, connecting from mobile devices over your home network, voice messaging, and configuring the Windows Firewall.

Soul of Waifu feature a fast, built-in FastAPI web server. It broadcasts the application directly into your local area network (LAN). This means you can run the program on a powerful gaming PC with a dedicated GPU, yet chat with characters, and view their avatars from a smartphone, tablet, or another laptop while relaxing on your couch.

---

## Web Interface Features

The web client fully mirrors the functions of the main desktop chat and instantly synchronizes its state with the desktop application using the fast WebSockets protocol:

::: cards
#### <i class="fas fa-rotate"></i> Full Synchronization
All messages you send, edit, or delete on your phone are instantly updated in the desktop application window. Text generation can be halted at any moment using the "Stop" button.
---
#### <i class="fas fa-microphone"></i> Local STT (Voice Input)
You can tap the microphone icon in your mobile browser to record a voice message. Your smartphone transmits the audio to your PC, where the local **Faster Whisper** model instantly transcribes it and feeds it to the LLM.
---
#### <i class="fas fa-image"></i> Avatar and Background Support
Your mobile device's browser displays the active chat background and the character's avatar, preserving the immersive atmosphere of your conversations.
:::

---

## Step-by-Step: How to Connect from Your Phone?

To access the chat from your smartphone or tablet, follow these simple steps:

### Step 1 — Find Your PC's Local IP Address
Your home router assigns a unique local address to your computer (it usually starts with `192.168.`).
1.  On the computer running the application, open the Command Prompt (type `cmd` in the Windows search bar).
2.  Type `ipconfig` and press Enter.
3.  Locate the **IPv4 Address** line. It will look something like this: `192.168.1.50`.

### Step 2 — Connect from Your Mobile Device
1.  Make sure your phone is connected to the **same Wi-Fi network** as your computer.
2.  Open any web browser on your phone (Safari, Chrome, Firefox).
3.  In the address bar, type your PC's local IP address and port **8000** separated by a colon.
    *   *Example:* `http://192.168.1.50:8000`
4.  Press Enter. The mobile-friendly Soul of Waifu chat interface will load on your screen!

---

## Troubleshooting: What to Do If the Page Doesn't Load?

If you entered the address correctly but your phone displays a "Cannot connect to the server" error, in 99% of cases, it means the **Windows Defender Firewall has blocked the incoming connection**.

::: warning
**How to Open Port 8000 in Windows Defender:**
1.  Open the Windows **Control Panel** → **Windows Defender Firewall**.
2.  In the left column, click **Advanced settings**.
3.  Select **Inbound Rules** and click **New Rule** on the right.
4.  Choose Rule Type: **Port** → Protocol **TCP** → Specific local ports: enter `8000`.
5.  Select **Allow the connection** → Check all profiles (Domain, Private, Public) → Give the rule a name (e.g., `SoW Web Server`) and click **Finish**.
6.  Restart Soul of Waifu. The firewall will no longer prevent your phone from connecting to your PC.
:::

---

## Conclusion

The local web server bridges the gap between desktop performance and mobile convenience. Combining a lightweight, responsive web client, local voice recognition powered by Faster Whisper, and real-time audio streaming allows you to project the full computational power of your PC onto any home gadget. This turns Soul of Waifu into a truly flexible home AI ecosystem accessible from any corner of your living space.

---

## What's Next?

| Section | Description |
|---|---|
| [User Personas](#!/course-persona) | Configuring your profile: how to ensure the AI perceives you correctly. |
| [System Prompt](#!/course-system-prompt) | Configuring the global template of instructions and the compiled request structure. |
| [Soul Memory](#!/course-soul-memory) | How the Soul Memory long-term memory is structured and the character's personal diaries. |