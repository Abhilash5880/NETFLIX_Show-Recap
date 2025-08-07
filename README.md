# Netflix TV Show Summarizer Chrome Extension

## 📺 AI-Powered Episode Recaps for Netflix

**Link to Repository:** [click here](https://github.com/Abhilash5880/NETFLIX_Show-Recap)

This Chrome Extension enhances your Netflix viewing experience by providing quick, AI-generated summaries of TV show episodes. Never feel lost or forget key plot points before diving into the next episode!

### ✨ Features

* **Intelligent Episode Detection:** Automatically identifies the show, season, and episode you are currently watching on Netflix.
* **AI-Powered Summaries:** Utilizes a powerful Hugging Face model to generate brief, relevant recaps of events leading up to the current episode.
* **Quick Memory Refresh:** Get 3-4 bullet points summarizing previous events, perfect for reminding yourself of the plot without spoilers.
* **Seamless Integration:** Designed to work directly within your Netflix browser tab.

### 🚀 How It Works

The extension works by:
1.  Detecting the TV show title, season, and episode number from the active Netflix tab.
2.  Sending this information, along with a carefully crafted prompt, to a Hugging Face hosted language model (Qwen/Qwen3-Coder-480B-A35B-Instruct).
3.  Receiving a brief, bullet-point summary from the AI.
4.  Displaying the summary in a clean, concise popup within the extension.

### 🛠️ Setup and Installation (For Developers)

To get this extension running locally or contribute:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Your GitHub Username]/NETFLIX-Show-Recap.git
    cd NETFLIX-Show-Recap
    ```

2.  **Hugging Face API Token Setup:**
    * Go to [Hugging Face](https://huggingface.co/) and log in or create an account.
    * Navigate to your **Settings** > **Access Tokens** and generate a new User Access Token.
    * Create a file named `config.js` in the root directory of your project (the same directory as `background.js` and `manifest.json`).
    * Add the following content to `config.js`, **replacing `your_hugging_face_api_token_here` with your actual token**:
        ```javascript
        // config.js
        const HF_API_TOKEN = 'your_hugging_face_api_token_here';
        const HF_MODEL_API_URL = '[https://router.huggingface.co/v1/chat/completions](https://router.huggingface.co/v1/chat/completions)';

        export { HF_API_TOKEN, HF_MODEL_API_URL };
        ```
    * **IMPORTANT:** Add `config.js` to your `.gitignore` file to prevent it from being committed to your public repository:
        ```
        # Git ignore file for my Chrome Extension
        config.js
        ```

3.  **Load the Extension in Chrome:**
    * Open Chrome and go to `chrome://extensions`.
    * Enable **"Developer mode"** (usually a toggle in the top right).
    * Click on **"Load unpacked"**.
    * Select the root directory of your project (`NETFLIX-Show-Recap`).
    * The extension should now appear in your list of installed extensions.

### 🐛 Debugging Tips

* **Console Errors:** If the extension isn't working, right-click on the extension icon in your browser toolbar, select "Inspect popup" to open the popup's console. For background script errors, go to `chrome://extensions`, click "Details" on your extension, and then click "service worker" next to "Inspect views".
* **Manifest V3 Modules:** Remember that for `import` statements to work in `background.js`, your `manifest.json` must declare the background script as a module:
    ```json
    "background": {
        "service_worker": "background.js",
        "type": "module"
    },
    ```

### 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

### 📝 License

This project is open-source and available under the `[Choose your license, e.g., MIT License]` license.
