// popup.js

/**
 * Formats the summary text by converting Markdown-like bold
 * syntax into HTML strong tags and newlines into <br> tags.
 * @param {string} text The raw summary text from the API.
 * @returns {string} The formatted HTML string.
 */
function formatSummary(text) {
    if (!text) return '';
    // Convert Markdown-like bold text to HTML <strong> tags
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert newlines to <br> tags for proper line breaks in HTML
    formattedText = formattedText.replace(/\n/g, '<br>');
    return formattedText;
}

document.addEventListener('DOMContentLoaded', () => {
    const summaryDisplay = document.getElementById('summaryDisplay');
    summaryDisplay.innerHTML = 'Loading...';

    chrome.runtime.sendMessage({ action: "requestSummary" }, (response) => {
        if (response && response.summary) {
            console.log("Popup: Received summary from background script:", response.summary);
            const formattedHtml = formatSummary(response.summary);
            summaryDisplay.innerHTML = formattedHtml;
        } else {
            console.warn("Popup: Failed to receive a valid summary.");
            summaryDisplay.innerText = response.summary || "Error: Could not get summary.";
        }
    });
});