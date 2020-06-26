// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateDemoMenuEntries(editor: AceAjax.Editor) {
  const menu = document.getElementById('demos-menu')!;

  for (const key in demos) {
    const a = document.createElement('a');
    a.setAttribute('class', 'dropdown-item');
    a.setAttribute('href', '#');
    a.onclick = (e) => {
      e.preventDefault();
      pickDemo(editor, key);
    };
    a.innerText = demos[key].title;
    menu.appendChild(a);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pickDemo(editor: AceAjax.Editor, demoKey: string) {
  const demoInfo = demos[demoKey];

  const code = demoInfo.code;

  editor.setValue(code, 1);
}
