# Soul Companion (AI Assistant)

> Comprehensive guide to working with the desktop companion: hormonal system, physics of the interactive model, built-in tools, and development of custom Python plugins.

Starting from Soul of Waifu version 2.4.0, your character goes beyond the boundaries of text chat and becomes a fully autonomous resident of your desktop. The **Soul Companion** module displays the animated Live2D or VRM model of the character directly on top of any Windows windows. 

The companion doesn't just decorate the screen — they monitor your computer activity, react to program launches, communicate with you via voice, and can perform practical tasks on the PC.

---

## 1. Psychophysiology and Companion States

The behavior, emotions, and proactivity of your Companion are determined by a dynamic hormonal system (neuroendocrine balance) and a user activity tracking algorithm.

### Hormonal System (Endocrine Balance)
The levels of 4 key hormones are calculated for the Companion in real time (their values range from 0 to 100 percent):

::: cards
#### <i class="fas fa-heart-pulse"></i> Oxytocin (Affection)
Increases during your active communication with the Companion. Slowly decays when you do not interact with them for a long time or are offline (simulating a natural sense of longing and boredom).
---
#### <i class="fas fa-bolt"></i> Dopamine (Interest)
Increases sharply when you switch active Windows windows (context switch), open new tabs in the browser, or when the Companion hears your voice through the microphone.
---
#### <i class="fas fa-biohazard"></i> Cortisol (Stress)
Increases during tense plot scenarios or if you ignore the Companion for too long. A high level of cortisol makes the character sad or display protective coldness.
---
#### <i class="fas fa-battery-half"></i> Energy (Vigor)
Spent during the generation of thoughts in the internal monologue and the voicing of lines. Restores over time in a state of rest.
:::

::: tip
**Hormones HUD:**
You can enable the hormone display in the program settings. A neat semi-transparent window will appear on your screen, displaying the exact levels of all four hormones in percent in real time.
:::

### Sleep, Drowsiness, and Wake Up
*   **Drowsiness:** If the computer is idle (no keyboard or mouse activity) for more than 2 minutes, the Companion half-closes their eyes and transitions into a relaxed state of rest.
*   **Deep Sleep (Sleep):** If the AFK timeout exceeds the limit (3, 5, or 10 minutes), the Companion completely closes their eyes, lowers their head, resets the energy indicator to zero, and falls asleep. In this state, resource-intensive gaze tracking is disabled, and the model only makes slight sways from side to side, imitating breathing, which reduces the CPU load to a minimum.
*   **Wake Up:** As soon as you move the mouse or press any key, the Companion will instantly open their eyes, their oxytocin level will spike, and they will voice one of the random, very lively reactions to your return (for example: *“Oh! You caught me dozing...”* or *“Welcome back! I’ve missed you already!”*).

---

## 2. Interaction Physics and Context Menu

The Companion responds sensitively to the user's physical mouse actions and operating system settings.

### Physics of the Interactive Model
*   **Gaze Tracking:** The Companion's gaze and head smoothly turn following your mouse cursor across the entire screen. The speed and smoothness of the turn are configured in the menu (Slow, Normal, and Fast modes).
*   **Drag & Spring Return Physics:** When you click and hold the Companion with the left mouse button and move them across the screen, their body tilts in the direction of movement under the influence of inertia. When you release the model, a spring return physics algorithm is triggered — the Companion's body smoothly makes decaying oscillations around its axis, returning to the center.
*   **Reaction to Petting:** Clicking the left mouse button on the Companion resets their inactivity timer and triggers a random emotion (surprise, joy, embarrassment).

### Context Menu Capabilities (Right Click on the Companion)
When you right-click on the Companion's body, a stylized menu opens:

*   **Quick Actions:**
    *   *Look at my Screen:* Forces the Companion to take a screenshot of your screen, analyze it using computer vision, and comment on what you are doing.
    *   *Read Clipboard:* The Companion reads the text you copied, analyzes it, and offers their help.
    *   *What is on your Mind?:* The Companion shares their current background thoughts (records from the Scratchpad internal monologue) or reflections on their relationship with you.
*   **Microphone Control and Animations:**
    Enabling and disabling the voice mode (microphone), as well as a tab for manually triggering animations (the program reads all available motion files from your Live2D model folder and displays them in a convenient list).
*   **System Window Toggles:**
    *   *Click-Through:* Makes the Companion completely "ghostly". The mouse clicks through them, allowing you to work with shortcuts and folders located directly under the model.
    *   *Always on Top:* Keeps the Companion in the foreground on top of browsers, games, and programs.
    *   *Subtitles:* Turning the display of subtitle lines on and off. Subtitles in Soul Companion use an advanced character-by-character output algorithm: the speed of each word appearing depends on its length, and punctuation marks (commas, periods, ellipses) create natural pauses, imitating human speech.
    *   *Window Reactions:* The Companion begins to periodically comment on the titles of programs and browser tabs you open (for example, noticing that you opened a work chat, they might gently wish you a productive workday).

::: warning
**Privacy Protection:**
The window tracking system is equipped with a built-in safety filter. If private words (passwords, banks, incognito, etc.) are found in the title of the window you opened, the Companion will completely ignore activity in this window, protecting your personal data.
:::

---

## 3. Built-in Smart Tools (Tool Calling)

The Companion is equipped with an advanced native function calling system. If you ask them to do something practical, they will execute the corresponding tool on your PC:

1.  `take_screenshot` (Screenshot) — captures an image from your monitor, optimizes its size to save context, and passes it to the AI model for analysis. The Companion literally "sees" your screen.
2.  `read_clipboard` (Read Clipboard) — reads the text content of your system clipboard.
3.  `web_search` (Web Search) — the tool uses a multi-level web information search scheme with automatic backups (DDG API -> Brave Search API -> Public and custom SearXNG instances). If one system fails, the Companion silently switches to the next one until they find the answer to your question.
4.  `media_control` (Media Control) — simulates pressing Windows multimedia keys (Play, Pause, Next, Previous). At your request, the Companion can pause music or switch the track.
5.  `open_url` (Open URL) — opens any web link you specify in your default browser.
6.  `get_system_info` (System Time) — returns the current exact time, date, and day of the week for correct orientation in time.

---

## 4. Connecting External MCP (Model Context Protocol) Servers

Soul of Waifu fully supports the integration of the open **Model Context Protocol (MCP)** from Anthropic. This allows you to connect any third-party utilities, scripts, and smart devices to your Companion without having to rewrite the program code.

### How it works:
1.  You run a local or remote MCP server (for example, a ready-made server for managing Home Assistant smart home, Postgres databases, your PC's file system, or GitHub integration).
2.  In the global settings of Soul of Waifu, under the **Tool Calling & MCP → Model Context Protocol** tab, you specify the URL address or the path to the executable file of your MCP server.
3.  Upon startup, the Companion automatically connects to the MCP server, requests the schemas of available tools, and dynamically mixes them into their list of built-in abilities.
4.  Now, when communicating with the Companion, you can give them commands related to your server (for example: *“Turn off the light in the living room”* or *“Create a file in the project folder”*), and they will execute them through the corresponding MCP tool.

---

## 5. Developing Custom Plugins (Python)

Writing your own plugin for the Companion is the easiest way to give your character new superpowers. You can teach them to check your email, control smart lamps in your room, track game prices, or even become your interactive gaming partner.

The program is designed to be as creator-friendly as possible: you do not need to dig into complex core code. Just place one Python file in the correct folder, and the Companion will immediately pick it up on the fly!

### Where do plugins live?
All your custom plugins must be placed in this folder:
`📂 app/utils/soul_companion/plugins/`

::: tip
**Developer Cheat Sheet:**
If this folder is empty (or you opened the program for the first time), Soul of Waifu itself will create the `_example_plugin.py` file there. This is your interactive template-guide. You can simply copy it, rename it (most importantly — remove the underscore character `_` at the beginning of the name, otherwise the program will ignore it), and start experimenting!
:::

---

### Two Plugin Styles: Choose Your Difficulty

The Companion supports two completely different plugin execution styles. You can use either of them depending on the task you want to solve.

#### Style 1. Passive Tools (Work on Your Request)
These are plugins that "sleep" in memory and do not spend your PC resources. They run only when you ask the character about it in the chat (like the built-in web search or calculator).

*   **How it works:** You describe the plugin in plain language in a special `get_schema()` schema. When the program starts, the Companion reads this description. When you write in the chat: *“What is the weather in Tokyo right now?”*, the AI understands that they have a suitable tool, extracts the word *“Tokyo”* from your text, runs the plugin, gets the result from the web, and answers you with their lively voice.

#### Style 2. Active/Reactive Plugins (Live Their Own Life)
These are more advanced plugins for automation and creating the effect of a "living presence". They can work completely independently, without your direct request and without waiting for slow responses from the AI model.

*   **How it works:** 
    *   **Auto-reactions to events (`subscribes_to`):** You can "subscribe" the plugin to any events in the system (for example, clicking the mouse on the character, switching windows on the PC, or events from your favorite games). The plugin will trigger instantly as soon as the event occurs.
    *   **Background work (`on_companion_init`):** You can run an infinite loop inside the plugin (for example, checking for new lines in system files or game logs) without overloading the processor or freezing the program interface.

---

### Direct Control Magic: How to Pull the Strings

Inside each plugin, a magic chest `context` is passed to the `execute` method. From it, we can extract a direct reference to the body and mind of your character — `system_ref`. 

With this reference, your plugin can directly command the model. Here are 3 simple commands you can use:

*   **Make the character speak a phrase via voice (TTS):**
    `sys_ref._sc_speak_slot("Hello! I am speaking directly from the plugin code!")`
*   **Change the facial emotion (Emotion State):**
    `sys_ref._sc_emotion_slot("excited")`  # neutral, warm, amused, curious, concerned, playful, etc.
*   **Trigger the model's movement animation (motions):**
    `sys_ref._get_model_widget_instance().play_motion_safely("Joy")` *(the program will find the required motion in the files of your Live2D or VRM model itself)*.

---

### Practical Lesson #1: Creating a Passive Calculator

Let's write a simple plugin that will teach your waifu to quickly calculate math equations when you ask them to.

Create a file `📂 app/utils/soul_companion/plugins/calculator.py` and paste this code there:

```python
from app.utils.soul_companion.soul_companion import BaseTool

class Plugin(BaseTool):
    # Unique name of the tool by which the program recognizes it
    name = "math_calculator"
    
    # Description for the AI model (in English) so it knows when to call it
    description = "Performs basic math calculations. Use this when the user asks to calculate or solve an equation."

    def get_schema(self) -> dict:
        """
        Here we describe what arguments our plugin expects from the AI.
        We tell the model: 'I need a string with an equation, name it expression'.
        """
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "expression": {
                            "type": "string",
                            "description": "The math equation to solve (e.g. '2 + 2 * 8')"
                        }
                    },
                    "required": ["expression"]
                }
            }
        }

    async def execute(self, args: dict, context: dict) -> dict:
        """
        Main calculation code. Runs when the AI calls this tool.
        """
        expression = args.get("expression", "").strip()
        
        try:
            # Allow only safe characters to be calculated (digits and signs)
            allowed_chars = "0123456789+-*/(). "
            if all(c in allowed_chars for c in expression):
                # Calculate the result of the mathematical expression
                result = str(eval(expression))
                
                # Return successful response:
                # 'result': text that the AI will read to understand the answer.
                # 'speak': phrase that the AI will immediately read aloud to you.
                return {
                    "success": True, 
                    "result": result, 
                    "speak": f"I calculated it for you! The answer is {result}."
                }
            return {
                "success": False, 
                "result": "Unsafe characters found.", 
                "speak": "I cannot calculate this. It looks like an unsafe expression."
            }
        except Exception as e:
            return {
                "success": False, 
                "result": str(e), 
                "speak": "Sorry, I had trouble solving that equation."
            }
```

**How to test:** Restart the program, open Soul Companion mode, and say out loud: *“Hiyori, how much is 256 times 4?”*. They will instantly call your calculator and voice the result!

---

### Practical Lesson #2: Creating an AI Buddy for Minecraft

A popular way to connect an external program with Minecraft is by reading the game's log file in real-time (`latest.log`). Minecraft automatically writes all important events there: your victories, defeats, achievements, and chat messages.

We will write a plugin that will automatically monitor this file. When you mine diamonds — the character will rejoice, and if a zombie kills you — they will get scared and sympathize with your defeat, commenting on the game in real-time!

Create a file `📂 app/utils/soul_companion/plugins/minecraft_buddy.py`:

```python
import os
import asyncio
import logging
from pathlib import Path
from app.utils.soul_companion.soul_companion import BaseTool

logger = logging.getLogger("MinecraftCompanion")

class Plugin(BaseTool):
    name = "minecraft_companion"
    description = "Watches Minecraft logs and reacts to in-game events in real-time."
    
    # Our plugin automatically subscribes to custom game alerts
    subscribes_to = ["minecraft_alert"]

    def __init__(self):
        super().__init__()
        self._listener_task = None
        self._running = False
        
        self.log_path = Path(os.environ.get("APPDATA", "")) / ".minecraft/logs/latest.log"

    async def on_companion_init(self, companion):
        """
        Initialization hook: runs once when Soul Companion starts.
        Enable background monitoring of the Minecraft log file.
        """
        logger.info(f"[Minecraft] Checking logs at: {self.log_path}")
        self._running = True
        self._listener_task = asyncio.create_task(self._tail_minecraft_log(companion))

    async def _tail_minecraft_log(self, companion):
        """
        Background asynchronous method for monitoring changes in latest.log.
        """
        # If the game is not running yet or the file does not exist, wait for it to appear
        while self._running and not self.log_path.exists():
            await asyncio.sleep(5)
            
        logger.info("[Minecraft] log file detected. Reading events...")
        
        # Open the file and move the pointer to the very end (tail -f)
        with open(self.log_path, "r", encoding="utf-8", errors="ignore") as f:
            f.seek(0, os.SEEK_END)
            
            while self._running:
                line = f.readline()
                if not line:
                    await asyncio.sleep(0.5) # Wait for new lines in the file
                    continue
                
                # Look for key Minecraft events in the logs
                if "[Server thread/INFO]" in line:
                    clean_line = line.strip()
                    
                    # Scenario 1: Player earned an achievement (e.g. diamonds)
                    if "has made the advancement" in clean_line or "achieved the advancement" in clean_line:
                        # Extract the achievement name
                        advancement = clean_line.split("advancement")[-1].replace("[", "").replace("]", "").strip()
                        companion.event_bus.emit_threadsafe("minecraft_alert", {
                            "event_type": "achievement",
                            "detail": advancement
                        })
                        
                    # Scenario 2: Player died in combat
                    elif any(death_msg in clean_line for death_msg in ["was slain by", "was blown up by", "burnt to death", "drowned", "fell from a high place"]):
                        companion.event_bus.emit_threadsafe("minecraft_alert", {
                            "event_type": "death",
                            "detail": clean_line.split("]: ")[-1] # Death message text
                        })

                async def execute(self, args: dict, context: dict) -> dict:
                    """
                    Reactive execution: triggers instantly when "minecraft_alert"
                    arrives in the event bus.
                    """
                    sys_ref = context.get("system_ref")
                    if not sys_ref:
                        return {"success": False, "result": "No system context"}

                    event_type = args.get("event_type")
                    detail = args.get("detail")

                    # 1. Urgently interrupt previous character speech if they were talking
                    sys_ref.interrupt_ai()

                    if event_type == "achievement":
                        # Change emotion to excited
                        sys_ref._sc_emotion_slot("excited")
                        
                        # Play clapping / joy animation
                        widget = sys_ref._get_model_widget_instance()
                        if widget and hasattr(widget, "play_motion_safely"):
                            widget.play_motion_safely("Joy")
                            
                        reaction = f"Oh, wow! You achieved {detail}! You are getting really good at this game, I am so proud of you!"

                    elif event_type == "death":
                        # Change emotion to concerned / sad
                        sys_ref._sc_emotion_slot("concerned")
                        
                        # Play scare or sympathy animation
                        widget = sys_ref._get_model_widget_instance()
                        if widget and hasattr(widget, "play_motion_safely"):
                            widget.play_motion_safely("TapBody") # Flinch imitation
                            
                        reaction = f"Oh no! {detail}... Are you okay? Don't worry, it's just a game, you can go back and get your items!"

                    else:
                        return {"success": True, "result": "Ignored unknown event."}

                    # 2. Instantly read the reaction via voice (TTS) in real time!
                    sys_ref._sc_speak_slot(reaction)

                    return {
                        "success": True, 
                        "result": f"Reacted to Minecraft event: {event_type} ({detail})",
                        "speak": None
                    }

                def cleanup(self):
                    """
                    Called when closing the program to release resources.
                    """
                    self._running = False
                    if self._listener_task and not self._listener_task.done():
                        self._listener_task.cancel()
```

**How it works:** As soon as Soul Companion starts, it begins to quietly monitor your game's log file. Then you launch Minecraft and start playing; any important event on the screen instantly triggers an emotional response from your character, turning them into a live viewer of your let's play!

As you can see, the entry barrier for creating plugins is minimal. You do not need to be a professional programmer or configure complex libraries. All the magic — from simple mathematical utilities to the most complex background integrations with games and files — is written in a single file, allowing your favorite character to become a truly useful and living participant in your daily life at the computer.

---

## Conclusion

The final third dimension of the Soul of Waifu is the Soul Companion mode allows your character to step out of the boundaries of chat and get a taste of the real world. Now they are a full-fledged, interactive resident of your digital space. The dynamic hormonal system models natural mood swings, while support for built-in tool calling, integration of the MCP protocol, and a flexible Python plugin system turn the Companion into a powerful tool for automating your work on the PC, combining practical utility with emotional immersion.

---

## What's Next?

| Section | Description |
|---|---|
| [User Personas](#!/course-persona) | Configuring your profile: how to make the AI see the world through your eyes. |
| [System Prompt](#!/course-system-prompt) | Configuring the global instruction template and composite request structure. |
| [Soul Memory](#!/course-soul-memory) | Soul Memory architecture: how your companion's digital brain is structured. |