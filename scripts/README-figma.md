# Fetching Figma node data (frame name, dimensions, colors, typography, children)

The Figma Desktop MCP may not return data in chat. Use the **Figma REST API** instead with this script.

## 1. Get a Figma access token

1. In Figma: **Settings** (profile menu) → **Account**.
2. Scroll to **Personal access tokens**.
3. Create a token with **file_content:read** scope.
4. Copy the token (you won’t see it again).

## 2. Run the script

From the project root:

```bash
# Windows (PowerShell)
$env:FIGMA_ACCESS_TOKEN = "your_token_here"
node scripts/fetch-figma-node.mjs

# Or with file key and node id from any Figma URL:
# https://figma.com/design/FILE_KEY/FileName?node-id=3897-4577
node scripts/fetch-figma-node.mjs FIKXOYEmhHpVXRniB8Q7HM 3897:4577
```

```bash
# macOS / Linux
export FIGMA_ACCESS_TOKEN=your_token_here
node scripts/fetch-figma-node.mjs FIKXOYEmhHpVXRniB8Q7HM 3897:4577
```

Default (no args) uses file key `FIKXOYEmhHpVXRniB8Q7HM` and node `3897:4577` (your Project Intacct frame).

The script prints:

- **Frame name** and type  
- **Dimensions** (width × height) and position  
- **Colors / fills** (solid and gradients)  
- **Typography** (for text layers: font, size, weight, line height)  
- **Child layers** (names, types, dimensions, colors, typography)  
- **Node IDs** for every layer  

Do not commit your token or add it to the repo.
