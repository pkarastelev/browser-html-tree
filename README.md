# HTML Tree Browser Extension

A simple browser extension that copies the HTML structure of the current page to the clipboard.

## Installation

Since this extension is not yet in the official web stores, you need to install it manually (Developer Mode).

### 🌐 Google Chrome & Brave

Brave is based on Chromium, so the steps are identical to Chrome.

1.  Open your browser and navigate to `chrome://extensions/` (or `brave://extensions/`).
2.  Enable **Developer mode** using the toggle switch in the top right corner.
3.  Click the **Load unpacked** button in the top left.
4.  Select the folder where you have cloned or downloaded this project (the folder containing `manifest.json`).
5.  The extension should now appear in your list of extensions.

### 🦊 Firefox

1.  Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2.  Click on **Load Temporary Add-on...**.
3.  Navigate to the project folder and select the `manifest.json` file.
4.  The extension will be installed temporarily (it will remain until you restart Firefox).

*Note: For permanent installation in Firefox, the extension needs to be signed by Mozilla or installed in Firefox Developer Edition / Nightly with specific configurations.*

## Usage

1.  Click on the extension icon in your browser's toolbar.
2.  The popup will open, showing options to interact with the HTML tree.
3.  Open the Browser DevTools (F12) to see the "HTML Tree" tab for more advanced features.

## Development

- `manifest.json`: Extension configuration.
- `popup.html/js`: The UI and logic for the extension popup.
- `devtools.html/js`: The UI and logic for the DevTools panel.
- `sidebar.html/js`: Sidebar components.
