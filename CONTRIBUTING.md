# Contributing

We love contributions from everyone.
By participating in this project,
you agree to abide by the [code of conduct] adopted by xFAANG.

[code of conduct]: https://github.com/xFAANG/askql/blob/master/CODE_OF_CONDUCT.md

We expect everyone to follow the code of conduct
anywhere in xFAANG's project codebases, issue trackers, pull request comments,
chatrooms, and mailing lists.

## Contributing Code - Quick Start

1.  Choose a good issue to work on.

1.  For bigger issues, discuss your solution with the community.

1.  Fork the repo.

1.  Make your change, write tests.

    1.  Please write tests for your changes in behaviour in AskQL modules.
    2.  Format code with Prettier.
    3.  For commit message use [Conventional Commits](https://www.conventionalcommits.org/) format with more commit types (see [this Gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)).

1.  Push and create a PR
    1.  For the PR message also use [Conventional Commits](https://www.conventionalcommits.org/) format with more commit types (see [this Gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)).
    2.  Mention which issue the PR is closing or fixing, e.g. 'Closes #10' (more info [here](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue))

Technical note: We squash-merge PRs.

## Contributing Code - Details

### Choose a good issue to work on

You can find all the issues here:

https://github.com/xFAANG/askql/issues

If you have noticed a new bug or have your own idea on an enhancement, feel free to submit it there.

#### New contributors

If you are a new contributor:

1. Filter issues by a label ['good first issue'](https://github.com/xFAANG/askql/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

   This way you will see tasks that others thought are a good start. Don't be surprised that some of them relate to the parts of code you don't understand or wouldn't like to touch at all. This is completely normal. Just find a single issue you would like to work on and commit to it.

2. **If you know** how to tackle your chosen issue, that's great, work on it and create a commit and a PR with your change.

3. **If you don't know** how to start, it most probably means we should have written more pointers :) In such case, **we** need **your** help - your feedback!

4. Remember good practices with global gitignore file configuration. If you don't know how to configure global gitignore see [this Gist](https://gist.github.com/subfuzion/db7f57fff2fb6998a16c). We recommend to exclude your local configuration files for your system and code editor.

   So be brave and reach out to us, either by tagging one of the [Core Developers](README.md#core-developers) by their username in your chosen issue or by writing on the [Discord community](https://discord.gg/pYdzypH).

   We will be very very happy to help you start, and your feedback will improve the pointers for the future new contributors and make _their_ start smoother.

## If needed, discuss your solution with the community

For small issues you can just start your contribution straightaway.

The bigger the issue is, the more discussion might be needed. Please write on the page with your issue or, if more real-time conversation is needed, write on our [Discord community](https://discord.gg/pYdzypH) and write just the summary on the issue page.

## Fork the repo.

1.  Fork the repo.

2.  Clone the repo:

         git clone https://{yourGithubUsername}@github.com/{yourGithubUsername}/askql.git

    **_Don't forget to replace {yourGithubUsername} with your github username._**

3.  Install dependencies:

        npm i

4.  Build the project:

        npm run build

5.  Make sure the tests pass (and if they didn't, please submit an issue on Github :) )

        npm test

## Make your change, write tests

This is one of the most time-consuming tasks in the process :)

1.  Make sure your code works well and looks well too. Code is written once but read multiple times.

1.  If your change alters the behavior of AskQL components, please please create tests for your change in one of the `__tests__` directories. Choose the directory or directories which reflect the best the nature of the change.

    In case of any doubts on tests, write on the Github page with your issue or on our [Discord community](https://discord.gg/pYdzypH).

1.  Make sure all tests pass:

        npm test

1.  Make sure code conforms to the Prettier plugin settings in the project. Best, use a Prettier extension to your IDE to auto-format the code (e.g. for VS Code use [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)).

1.  Write a good commit message. We use [Conventional Commits](https://www.conventionalcommits.org/) format with more commit types (see [this Gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)).

### New contributor - Before you commit

There are a few things to check before you commit:

1. <p>Did you format your code correctly?</p><p>We are using Prettier to check code style. When you commit, git will validate whether your changes keep the style. Please reformat the code using Prettier before committing (when using VS Code we suggest installing Prettier - Code formatter extension and turning on autoformatting before save).</p>

1. <p>Did you write tests for your change?</p>  <p>We advise to try to write tests for every change of behavior in AskQL components.</p>

1. <p>Did you run <b>all</b> the tests?</p>  <p>Run <code>npm test</code> to check if all tests pass. Note that while your own tests may pass, your change might be breaking existing tests.</p>

## Push and create a PR

1.  Push to your fork.

2.  Submit a pull request.

    When naming your pull request, please use the same format as for the commits: [Conventional Commits](https://www.conventionalcommits.org/) with more commit types (see [this Gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)).

    Mention which issue the PR is closing or fixing, e.g. 'Closes #10' (more info [here](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)).

3.  Others will give constructive feedback.

    This is a time for discussion and improvements. At this point you might need to make some necessary changes before your contribution gets approved. Generally, the better discussion you make _before_ working on a (big) issue, the shorter this step should take.

4.  After your pull request is approved, either it will be merged by the approver or you will merge it.

    A technical note: Currently all commits in PR are squashed on merge (no action needed here).

## Other notes

The versioning scheme we use is [SemVer](http://semver.org/).

## License

Any contributions you make will be under the MIT Software License.
In short, when you submit code changes, your submissions are understood to be under the same MIT License that covers the project. Feel free to contact the maintainers if that's a concern.

## New bugs and enhancements

You are always welcome to open an issue on [AskQL Github issues](https://github.com/xFAANG/askql/issues).

## Getting Help

If you need anything, write on our [Discord community](https://discord.gg/pYdzypH).

## References

This document was based on Thoughtbot templates
https://github.com/thoughtbot/templates
