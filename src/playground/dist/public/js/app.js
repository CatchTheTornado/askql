function registerAskScriptEditor(
  editorElementId,
  runElementId,
  askScriptServerUrl
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

  document.getElementById(runElementId).onclick = (ev) => {
    ev.preventDefault();
    executeAskScriptFromEditor(editor, askScriptServerUrl);
  };

  return editor;
}

async function executeAskScriptFromEditor(editor, askScriptServerUrl) {
  const askScriptCode = editor.getValue();
  executeAskScript(askScriptCode, askScriptServerUrl);
}

async function executeAskScript(askScriptCode, askScriptServerUrl) {
  const request = new Request(askScriptServerUrl, {
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

function showSuccessfulResponse(result) {
  const resultElem = document.getElementById('result');
  resultElem.innerText = JSON.stringify(result, null, 2);
  resultElem.classList.remove('error');
}

function showErrorResponse(errorMessage) {
  const resultElem = document.getElementById('result');
  resultElem.innerText = errorMessage;
  resultElem.classList.add('error');
}
