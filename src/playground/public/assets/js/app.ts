// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function printAskVersion(elemId: string, askScriptServerUrl: string) {
  const request = new Request(`${askScriptServerUrl}/version`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  });
  const response = await fetch(request);
  try {
    if (response.status == 200) {
      const json = await response.json();
      document.getElementById(elemId)!.innerText = `AskVM v. ${json.version}`;
    } else {
      // fail silently
      console.error(
        `Couldn't fetch AskVM version. response.status: ${response.status}`
      );
    }
  } catch (e) {
    console.error(`Couldn't fetch AskVM version. Error: ${e.toString()}`);
    // fail silently
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function registerAskScriptEditor(
  editorElementId: string,
  runElementId: string,
  askScriptServerUrl: string
) {
  const editor = ace.edit(editorElementId);
  editor.setTheme('ace/theme/twilight');
  editor.session.setMode('ace/mode/javascript');
  editor.session.setOption('useWorker', false);

  editor.commands.addCommand({
    name: 'alertalert',
    bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
    exec: () => {
      executeAskScriptFromEditor(editor, askScriptServerUrl);
    },
  });

  document.getElementById(runElementId)!.onclick = (ev) => {
    ev.preventDefault();
    executeAskScriptFromEditor(editor, askScriptServerUrl);
  };

  return editor;
}

async function executeAskScriptFromEditor(
  editor: AceAjax.Editor,
  askScriptServerUrl: string
) {
  const askScriptCode = editor.getValue();
  executeAskScript(askScriptCode, askScriptServerUrl);
}

async function executeAskScript(
  askScriptCode: string,
  askScriptServerUrl: string
) {
  const request = new Request(`${askScriptServerUrl}/askscript`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify({ code: askScriptCode }),
  });

  const response = await fetch(request);
  try {
    const json = await response.json();
    if (response.status == 200) {
      showSuccessfulResponse(json.result);
    } else {
      showErrorResponse(json.error);
    }
  } catch (e) {
    showErrorResponse('Got an error when parsing the response');
  }
}

function showSuccessfulResponse(result: any) {
  const resultElem = document.getElementById('result')!;
  resultElem.innerText = JSON.stringify(result, null, 2);
  resultElem.classList.remove('error');
}

function showErrorResponse(errorMessage: string) {
  const resultElem = document.getElementById('result')!;
  resultElem.innerText = errorMessage;
  resultElem.classList.add('error');
}
