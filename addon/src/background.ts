chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
        // Check if we're already injected
        try {
            const [{ result }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => !!document.getElementById('job-application-extension-root'),
            });

            if (!result) {
                // Only inject if not already present
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js'],
                });

                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ['content.styles.css'],
                });
            }
        } catch (error) {
            console.error('Failed to inject content script:', error);
        }
    }
}); 