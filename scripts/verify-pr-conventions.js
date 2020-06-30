const core = require('@actions/core');
const github = require('@actions/github');
const load = require('@commitlint/load').default;
const lint = require('@commitlint/lint').default;

const CONFIG = {
  extends: ['@commitlint/config-conventional'],
};

function buildLintError(lintErrors) {
  return lintErrors.map((error) => error.message);
}

function getTitle() {
  return github.context.payload.pull_request.title;
}

async function testTitle(title) {
  const lintOptions = await load(CONFIG);
  const lintResult = await lint(
    title,
    lintOptions.rules,
    lintOptions.parserPreset ? lintOptions.parserPreset : {}
  );
  if (!lintResult.valid) {
    throw new Error(buildLintError(lintResult.errors));
  }
}

async function run() {
  await testTitle(getTitle());
}

run().catch((e) => {
  core.setFailed(e);
});
