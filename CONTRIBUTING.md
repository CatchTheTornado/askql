# Contributing

We love contributions from everyone.
By participating in this project,
you agree to abide by the [code of conduct] adopted by xFAANG.

[code of conduct]: https://github.com/xFAANG/askql/blob/master/CODE_OF_CONDUCT.md

We expect everyone to follow the code of conduct
anywhere in xFAANG's project codebases, issue trackers, pull request comments,
chatrooms, and mailing lists.

## Contributing Code

1.  Fork the repo.

        git clone git@github.com:xFAANG/askql.git

1.  Turn _off_ autocrlf in your Git.  
    This is advised because some of the test files have Windows line endings on purpose and we would like to keep them there.

        git config core.autocrlf false

1.  Install dependencies:

        npm i

1.  Make sure the tests pass:

        npm test

1.  Make your change, with new passing tests. Check out `prettierrc.js`

1.  Mention how your changes affect the project to other developers and users in the
    [`NEWS.md`][news] file.

1.  Push to your fork. Write a [good commit message][commit]. Submit a pull request.

1.  Others will give constructive feedback.
    This is a time for discussion and improvements,
    and making the necessary changes will be required before we can
    merge the contribution.

The versioning scheme we use is [SemVer](http://semver.org/).

[news]: https://github.com/xFAANG/askql/blob/master/NEWS.md
[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

## License

Any contributions you make will be under the MIT Software License.
In short, when you submit code changes, your submissions are understood to be under the same MIT License that covers the project. Feel free to contact the maintainers if that's a concern.

## Getting Help

You are always welcome to open an issue on [AskQL Github issues](https://github.com/xFAANG/askql/issues).

## References

This document was based on Thoughtbot templates
https://github.com/thoughtbot/templates
