// background.js

import { HF_API_TOKEN, HF_MODEL_API_URL } from './config.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestSummary") {
        (async () => {
            let summary = "Error: Could not get summary.";
            console.log("Background: Request received for summary.");

            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                if (tab && tab.id) {
                    await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    });

                    const responseFromContent = await chrome.tabs.sendMessage(tab.id, { action: "getEpisodeInfo" });

                    if (responseFromContent && responseFromContent.showTitle && responseFromContent.season && responseFromContent.episode) {
                        const { showTitle, season, episode } = responseFromContent;
                        console.log(`Background: Extracted: Show: ${showTitle}, S:${season}, E:${episode}`);

                        // The prompt to get a point-based summary.
                        const promptContent = `Generate a brief recap of the key events for a fan of the TV show "${showTitle}" Season ${season} Episode ${episode}. Provide bullet points describing the events that happened leading up to this episode to refresh their memory. Do not reproduce copyrighted content. Don't make it too short or too long, but also don't just give away all the spoilers like...if this is the 1st episode of a season 1....maybe just give an slight overview.`;
                        console.log("Background: Sending prompt content:", promptContent);

                        const requestBody = {
                            // This is the correct model string from your screenshot.
                            model: "Qwen/Qwen3-Coder-480B-A35B-Instruct:novita",
                            messages: [{
                                role: "user",
                                content: promptContent
                            }],
                            max_tokens: 400,
                            temperature: 0.7,
                        };

                        console.log("Background: Sending request body to Router API:", requestBody);

                        const apiResponse = await fetch(HF_MODEL_API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${HF_API_TOKEN}`
                            },
                            body: JSON.stringify(requestBody),
                        });

                        if (!apiResponse.ok) {
                            const errorText = await apiResponse.text();
                            console.error(`Background: Router API returned status ${apiResponse.status}: ${errorText}`);
                            throw new Error(`Router API error: ${apiResponse.status} - ${errorText}`);
                        }

                        const apiData = await apiResponse.json();
                        console.log("Background: Router API Raw Response:", apiData);

                        if (apiData && apiData.choices && Array.isArray(apiData.choices) && apiData.choices.length > 0 && apiData.choices[0].message && typeof apiData.choices[0].message.content === 'string') {
                            let rawContent = apiData.choices[0].message.content;
                            console.log("Background: Raw content from model:", rawContent);
                            summary = rawContent.trim(); // Trim whitespace and set as the final summary.
                        } else {
                            console.warn("Background: API response did not contain expected 'choices[0].message.content' or was empty:", apiData);
                            summary = "AI could not generate a summary for this episode. (Unexpected Router API response format or no output)";
                        }
                    } else {
                        summary = "Could not detect show/episode details on this Netflix page. Please navigate to an episode page where details are visible.";
                        console.warn("Background: Failed to extract show/episode details from content script.");
                    }
                } else {
                    summary = "No active tab found. Ensure you are on a valid tab when clicking the extension.";
                    console.warn("Background: No active tab found.");
                }
            } catch (error) {
                console.error("Background: Error in summary generation process:", error);
                summary = `Error generating summary: ${error.message || "An unexpected error occurred."}`;
            } finally {
                console.log("Background: Sending response to popup:", summary);
                sendResponse({ summary: summary });
            }
        })();
        return true;
    }
});