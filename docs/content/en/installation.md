# Installation

> A simple step-by-step guide to installing Soul of Waifu and system requirements.

::: tip
**No coding required:** You do not need any knowledge of Python, command lines, or Git. The entire process is fully automated and takes only a few minutes.
:::

---

## System Requirements

Before starting the installation, ensure your computer meets the minimum system requirements:

| Hardware | Minimum Requirements | Recommended |
|---|---|---|
| **Operating System** | Windows 10 / 11 (64-bit) | Windows 10 / 11 (64-bit) |
| **System Memory (RAM)** | 8 GB | 16 GB or more |
| **Graphics Card (GPU)** | Any integrated or discrete GPU | NVIDIA with CUDA support (6 GB+ VRAM) |
| **Disk Space** | 10 GB of free space | Fast SSD drive |
| **Network** | Internet for initial setup | High-speed connection (for downloading models) |

---

## Step-by-Step Installation Process

### Step 1 — Downloading the Application
You can download the program archive in two ways:
1.  **Via the Official Website:** Go to the website and click the **"Download for Windows"** button.
2.  **Via GitHub:** Go to the [GitHub Releases page](https://github.com/jofizcd/Soul-of-Waifu/releases) and download the `.7z` archive of the latest version.

### Step 2 — Extracting the Archive
1.  Move the downloaded archive to the folder where you want to keep the program permanently.
2.  Extract the archive using any file archiver (such as 7-Zip or WinRAR).

::: warning
**Important Rule for Paths:** The path to the folder containing the program **must not** contain spaces or Cyrillic (Russian) characters.
*   *Incorrect:* `C:\Games\Soul of Waifu\`
*   *Correct:* `C:\Games\Soul-of-Waifu\`
:::

### Step 3 — Running the Installer
1.  Open the extracted folder.
2.  Locate the `installer.bat` file and run it by double-clicking.

::: danger
**Do NOT run the installer as Administrator!**
Running the script with admin rights forces Windows to change the working directory to the system folder (`C:\Windows\System32`), which will break the setup. Run it with a standard double-click.
:::

3.  In the terminal window that opens, select your preferred PyTorch version:
    *   Choose **CUDA** — if you have an NVIDIA graphics card.
    *   Choose **CPU** — if you have an AMD, Intel, integrated GPU, or a weak CPU.
4.  Wait for the setup to complete. This will take a few minutes depending on your internet connection speed.

::: info
**Installation Warnings and Errors:**
During this process, the console may display library compatibility or version conflict warnings (most commonly regarding `rvc-python` or generic `pip` dependency resolution).
**This is completely normal.** The installer automatically handles these conflicts and completes the configuration, and these warnings will disappear over time as the library ecosystem stabilizes. Just make sure your internet connection remains stable during the installation.
:::

### Step 4 — Launching the Application
Once the installer automatically closes, the program is ready for its first run:
1.  Locate `start.bat` (or `Soul of Waifu.exe`) in the folder and launch it.
2.  Wait for the graphical user interface to load.

---

## What to do with Antivirus False Positives?

Some antiviruses (including Windows Defender) might flag `.bat` and `.exe` files as suspicious. This happens because the program executes local terminal scripts and deploys a local Python virtual environment to run AI networks directly on your hardware.
*   If your antivirus blocks the files, simply add the application folder to your **exclusions list**. The source code is completely open-source, and you can audit every single line of our scripts on GitHub.

---

## What's Next?

Proceed to the [Quick Start](#!/quick-start) section to import and configure your first character.