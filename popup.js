document.getElementById('copyBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractHtmlTree
  });
  
  const treeText = results[0].result;
  
  await navigator.clipboard.writeText(treeText);
  
  const status = document.getElementById('status');
  status.textContent = '✓ Kopiert!';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
});

function extractHtmlTree() {
  function getSelector(element) {
    let selector = element.tagName.toLowerCase();
    
    // ID mit # anhängen
    if (element.id) {
      selector += '#' + element.id;
    }
    
    // Klassen mit . anhängen (classList funktioniert auch für SVG)
    if (element.classList && element.classList.length > 0) {
      selector += '.' + Array.from(element.classList).join('.');
    }
    
    return selector;
  }
  
  function buildTree(element, depth = 0) {
    const indent = '    '.repeat(depth);
    let result = indent + getSelector(element) + '\n';
    
    // Nur Element-Kinder durchlaufen (keine Text-Nodes, Kommentare etc.)
    for (const child of element.children) {
      result += buildTree(child, depth + 1);
    }
    
    return result;
  }
  
  return buildTree(document.body).trimEnd();
}
