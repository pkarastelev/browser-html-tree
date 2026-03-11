const treeEl = document.getElementById('tree');
const statusEl = document.getElementById('status');
const copyBtn = document.getElementById('copyBtn');

// Lade den aktuellen Baum
function loadTree() {
  chrome.storage.local.get(['currentTree'], (result) => {
    if (result.currentTree) {
      treeEl.textContent = result.currentTree;
      treeEl.classList.remove('hint');
    }
  });
}

// Initial laden
loadTree();

// Auf Änderungen lauschen
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.currentTree) {
    treeEl.textContent = changes.currentTree.newValue;
    treeEl.classList.remove('hint');
  }
});

// Kopieren-Button
copyBtn.addEventListener('click', () => {
  const text = treeEl.textContent;
  
  if (text && !treeEl.classList.contains('hint')) {
    navigator.clipboard.writeText(text).then(() => {
      statusEl.textContent = '✓ Kopiert!';
      setTimeout(() => {
        statusEl.textContent = '';
      }, 1500);
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      statusEl.textContent = '✓ Kopiert!';
      setTimeout(() => {
        statusEl.textContent = '';
      }, 1500);
    });
  }
});
