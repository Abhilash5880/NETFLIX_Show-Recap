# Netflix TV Show Summarizer Chrome Extension

## 📺 AI-Powered Episode Recaps for Netflix (work in progress)

**Link to Repository:** [click here](https://github.com/Abhilash5880/NETFLIX_Show-Recap)

This is a simple Chrome Extension that enhances your Netflix viewing experience by providing AI-generated recaps for TV show. Never feel lost or forget key plot points before diving into the next episode!

### ✨ Features

* **Intelligent Episode Detection:** Automatically identifies the show, season, and episode you are currently watching on Netflix. (for now only works with NETFLIX on particular show's title page, will add more integrations later on)
* **AI-Powered Summaries:** Utilizes a powerful Hugging Face model to generate brief, relevant recaps of events leading up to the current episode.
* **Quick Memory Refresh:** Get 3-4 bullet points summarizing previous events, perfect for reminding yourself of the plot without spoilers.
* **Seamless Integration:** Designed to work directly within your Netflix browser tab.

### 🚀 How It Works

The extension works by:
1.  Detecting the TV show title, season, and episode number from the active Netflix tab.
2.  Sending this information, along with a carefully crafted prompt, to a Hugging Face hosted language model (Qwen/Qwen3-Coder-480B-A35B-Instruct).
3.  Receiving a brief, bullet-point summary from the AI.
4.  Displaying the summary in a clean, concise, scrollable popup within the extension.

### 🛠️ Setup and Installation (For Developers)

To get this extension running locally or contribute:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)Abhilash5880/NETFLIX_Show-Recap.git
    cd NETFLIX_Show-Recap
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
  
### 🧠 Model Selection

Initially, I planned on Gemini and ChatGPT for generating results but after continous failures I realized they were paid. However, to maintain an open-source and cost-effective approach, the focus shifted to finding a suitable free model. This led to a search on Hugging Face, a platform known for hosting a vast collection of open-source and accessible AI models. 
A key challenge emerged during model testing. An initial model, zai-org/GLM-4.5, while capable, would often include a verbose "thinking" process in its output. It would start with an internal thought process like "Thought: The user wants a summary of..." before providing the actual summary. This unnecessary text was not suitable for a user-facing application. The issue was resolved by switching to a more suitable model, Qwen/Qwen3-Coder-480B-A35B-Instruct, which produced a clean, direct response without the extraneous conversational filler.
The Qwen/Qwen3-Coder-480B-A35B-Instruct model was finally chosen for its ability to follow instructions and generate accurate, concise recaps quickly.

### 🤝 Challenges and Solutions

This project provided valuable learning opportunities in several key areas:

* **Secure API Key Management:** Encountered lots of errors when attempting to push a hard-coded API key to GitHub. The solution involved moving the key to a separate `config.js` file and adding that file to `.gitignore` to prevent it from being exposed in the public repository.
* **Git History Rewriting:** The API key was still present in the commit history, causing GitHub's secret scanning to block all pushes. Resolved this by using `git reset --hard` to completely erase the bad commit from our local history before performing a `git push --force` to overwrite the remote history.
* **JavaScript Module Syntax:** Hit a `SyntaxError` when using `import` statements in `background.js`. This was fixed by correctly configuring the `manifest.json` file to declare the background script as a module, allowing the use of modern JavaScript syntax.
* **Hugging Face API Token Expiration:** After the API key was exposed, Hugging Face automatically revoked the token for security. The fix was to generate a new token and update the local `config.js` file, ensuring the application could once again authenticate with the API.


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
This project is open-source and available under the MIT license.
