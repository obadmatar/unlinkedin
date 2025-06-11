# unlinkedin

**unlinkedin** is a lightweight browser script that enhances LinkedIn’s "My Network → Connections" page by adding a one-click **Remove** button to every connection card. It bypasses the need to use the dropdown menu and confirmation manually — making large-scale cleanup of connections smoother and faster.

## Features

- Adds a dedicated **Remove** button next to each connection
- Automatically confirms the removal dialog
- Hides default message and dropdown buttons for cleaner UI
- Reattaches itself when sorting options are changed
- Automatically detects and processes newly loaded cards every 10 seconds

## How to Use

1. Open your browser and go to [LinkedIn → My Network → Connections](https://www.linkedin.com/mynetwork/invite-connect/connections/).
2. Open Developer Tools (press `Cmd+Option+J` on Mac or `Ctrl+Shift+J` on Windows/Linux).
3. Paste the entire script from `unlinkedin.js` into the Console and press Enter.
4. You’ll see a **Remove** button added to each connection card. Click to instantly remove.

> **Note**: The script waits for LinkedIn’s connection cards to load, then starts applying enhancements. If you scroll to load more, it will catch up automatically.

## Why?

LinkedIn makes it unnecessarily tedious to clean up your connections — each removal involves clicking a dropdown, confirming a dialog, and repeating the cycle. This tool streamlines that into a direct, no-nonsense experience.

## Caveats

- The script depends on LinkedIn's current DOM structure. If LinkedIn updates their frontend, selectors may need updating.
- This is a user-run browser script. It does not make API calls, store data, or automate clicks outside the current tab.
- Use responsibly — removing connections in bulk might violate LinkedIn’s Terms of Service.

