// content.js

console.log("Content Script: Script injected and running.");

if (window.location.hostname.includes("netflix.com") && (window.location.pathname.includes("/watch/") || window.location.pathname.includes("/title/"))) {
    console.log("Content Script: Detected a Netflix title page or watch page.");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "getEpisodeInfo") {
            console.log("Content Script: Received 'getEpisodeInfo' request.");
            let showTitle = "";
            let season = "";
            let episode = "";

            try {
                // Selector for Show Title
                let titleElement = document.querySelector('.previewModal--section-header strong');
                if (!titleElement) {
                    titleElement = document.querySelector('.player-title-info-title');
                }
                if (titleElement) {
                    showTitle = titleElement.innerText.trim();
                }

                // Selector for Season and Episode
                const urlPath = window.location.pathname;
                const match = urlPath.match(/\/watch\/\d+\?season=(\d+)&episode=(\d+)/);
                if (match) {
                    season = match[1];
                    episode = match[2];
                } else {
                    let episodeDetailsElement = document.querySelector('.previewModal-episodeDetails b');
                    if (episodeDetailsElement) {
                        const text = episodeDetailsElement.innerText.trim();
                        const seasonMatch = text.match(/S(\d+):/i);
                        const episodeMatch = text.match(/E(\d+)/i);
                        if (seasonMatch) season = seasonMatch[1];
                        if (episodeMatch) episode = episodeMatch[1];
                    }
                }
                
                if (showTitle && season && episode) {
                    console.log(`Content Script: Extracted info: Title: "${showTitle}", Season: "${season}", Episode: "${episode}"`);
                    sendResponse({ showTitle, season, episode });
                } else {
                    console.warn(`Content Script: Failed to extract all info. Title: "${showTitle}", Season: "${season}", Episode: "${episode}"`);
                    sendResponse({ showTitle: '', season: '', episode: '' });
                }

            } catch (e) {
                console.error("Content Script: Error during info extraction:", e);
                sendResponse({ showTitle: '', season: '', episode: '' });
            }
            
            return true;
        }
    });
} else {
    console.log("Content Script: Not on a Netflix title or watch page. No action taken.");
}