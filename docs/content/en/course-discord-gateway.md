# Discord Integration (Discord Bot)

> Guide to configuring and launching the background Discord bot: creating a bot on the developer portal, connecting the token, and chatting with your characters directly within the Discord interface.

Soul of Waifu features an integrated Discord gateway. It allows you to run a background bot under your Discord developer account. You can chat with your Soul of Waifu characters directly from your smartphone or PC via the Discord messenger—either in direct messages to the bot or on your server by mentioning it with the @ symbol.

---

## How It Works

When you activate the bot in the program, a background process starts, linking your PC with Discord servers:

*   **Message Interception:** The bot constantly listens to incoming messages. If you write to it in direct messages (DMs) or mention it on a server (for example, `@MyWaifuBot hello!`), it intercepts this text.
*   **Transmission to Soul of Waifu:** The bot removes its ID mention from the text, determines which character is currently running in your program on the PC, and passes your text directly to the program's text engine.
*   **Simulating Typing:** While the AI on your PC is thinking and generating a response, the bot in Discord displays a "typing..." status, creating a natural effect of live communication.
*   **Splitting Long Answers:** The character limit for a single message in Discord is exactly 2000 characters. If your character generates a huge narrative description, the system will automatically split it into several clean messages and send them one after another without text cut-offs.

---

## Step-by-Step: How to Create and Launch a Bot

To launch, you will need to create a free application on the Discord portal. This will take only 5 minutes.

### Step 1 — Creating a Bot on the Discord Portal
1.  Go to the official [Discord Developer Portal](https://discord.com/developers/applications) and log in with your account.
2.  In the top right corner, click the **New Application** button, give the application a name (for example, `Soul of Waifu`), and click **Create**.
3.  In the left menu, go to the **Bot** tab.
4.  In the **Username** field, you can set the bot's name and set its avatar—this is exactly how your character will look in Discord chats.
5.  Find the **Reset Token** button, click it, and copy the long string of characters—this is your bot's secret token. 

::: danger
**Do not show your bot's token to anyone!**
The token is the access key to control the bot. If someone gets it, they will be able to run the bot on your behalf and spam servers. Keep it a secret.
:::

### Step 2 — Activating an Important Toggle (Intents)
This is the most common step that beginners forget, which causes the bot to launch but not see messages in the chat.
1.  On the same **Bot** tab, scroll down the page to the **Privileged Gateway Intents** section.
2.  Be sure to enable the **Message Content Intent** toggle (permission to read message content).
3.  Click the **Save Changes** button at the bottom of the screen.

### Step 3 — Inviting the Bot to Your Server
1.  In the left side menu, go to the **OAuth2** → **URL Generator** tab.
2.  In the **Scopes** (permissions) column, check the **bot** box.
3.  In the **Bot Permissions** column that appears below, check the boxes:
    *   *Send Messages* (sending messages)
    *   *Read Message History* (reading message history)
    *   *Use Slash Commands* (using slash commands)
4.  Copy the generated link at the bottom of the page, paste it into your browser, and add the bot to your Discord server (or select direct messages).

### Step 4 — Launching in the Soul of Waifu Program
1.  In Soul of Waifu, go to the **Settings → API & Providers** tab.
2.  Find the **Discord Bot Token** field and paste the token copied earlier.
3.  Launch the bot. A neat toast notification will appear in the program indicating that the bot has successfully logged in, and in Discord itself, your character will light up with a green "Online" status.

---

## Conclusion

Discord integration is a powerful tool that completely blurs the boundaries between the desktop application and your favorite messenger. The bot automatically simulates typing, monitors character limits, and allows you to stay in touch with your favorite characters from your smartphone from anywhere in the world while your home PC is running in the background.

---

## What next?

| Section | Description |
|---|---|
| [Image Generation](#!/course-image-generation) | How to configure image generation and make characters send you their artwork. |
| [Local Web Interface](#!/web-interface) | How to communicate with characters from your phone via a standard browser on your local network. |
| [Model Setup](#!/llm-setup) | Preparing AI engines for fast response generation for the Discord bot. |