chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
        try {
            // Check if we're already injected
            const [{ result }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => !!document.getElementById('job-application-extension-root'),
            });

            if (result) {
                // If already injected, just remove the existing popup
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        const root = document.getElementById('job-application-extension-root');
                        if (root) root.remove();
                    },
                });
            } else {
                // Inject CSS first
                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ['content.styles.css'],
                });

                // Then inject our script
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js'],
                });
            }
        } catch (error) {
            console.error('Failed to inject content script:', error);
        }
    }
}); 