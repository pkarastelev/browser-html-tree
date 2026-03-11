// Sidebar Panel im Elements Tab erstellen
chrome.devtools.panels.elements.createSidebarPane('HTML Tree', (sidebar) => {
  // Initiales Update
  updateSidebar(sidebar);
  
  // Update wenn ein anderes Element ausgewählt wird
  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    updateSidebar(sidebar);
  });
});

function updateSidebar(sidebar) {
  // $0 ist das aktuell ausgewählte Element im Elements Panel
  chrome.devtools.inspectedWindow.eval(
    `(function() {
      function getSelector(element) {
        let selector = element.tagName.toLowerCase();
        if (element.id) {
          selector += '#' + element.id;
        }
        if (element.classList && element.classList.length > 0) {
          selector += '.' + Array.from(element.classList).join('.');
        }
        return selector;
      }
      
      function buildTree(element, depth = 0) {
        const indent = '    '.repeat(depth);
        let result = indent + getSelector(element) + '\\n';
        for (const child of element.children) {
          result += buildTree(child, depth + 1);
        }
        return result;
      }
      
      if ($0) {
        return buildTree($0).trimEnd();
      }
      return 'Kein Element ausgewählt';
    })()`,
    (result, error) => {
      if (error) {
        sidebar.setObject({ error: error.message });
      } else {
        // Zeige das Ergebnis in der Sidebar
        sidebar.setPage('sidebar.html');
        
        // Speichere das Ergebnis für die Sidebar-Seite
        chrome.storage.local.set({ currentTree: result });
      }
    }
  );
}
