<p align="center">
  <a href="https://askql.org">
    <img src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/askql-logo-OW-cut.png" title="AskQL Logo" width="200">
  </a>
</p>

# [AskQL](https://askql.org/)

AskQL is a new query and programming language that can express any data request.
<br>Send executable code instead of JSONs.

- Asynchronous by default
- Processes only immutable data
- Based entirely on the functional programming paradigm

## Why and what for?

<img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/REST_API_approach.png" 
    align="center"
    title="Rest"
    height=50%
    width=50%><img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/AskQL_approach.png" 
    align="center"
    title="AskQL"
    height=50%
    width=50%>

- Next milestone after GraphQL and REST API
- Send code to servers without the need to deploy
- New safe query language
- Compiled to clean functional code

### Prerequisites

`node >=12.14`

## Quick Start

### Installation

In your Node project run:

```
npm install askql
```

### Usage

Sample index.js file:

```js
const askql = require("askql");

(async () => {
  const result = await askql.runUntyped(
    { resources: askql.askvm.resources },
    askql.parse("ask { 'hello world!' }")
  );

  console.log(JSON.stringify(result, null, 2));
})();
```

[👉 More examples](https://github.com/xFAANG/askql/tree/master/src/askscript/__tests__)

## Development & Contributing

Please find all important information here:

[Contributing guidelines](https://github.com/xFAANG/askql/blob/master/CONTRIBUTING.md)

## Installation from source

1. Clone the repository

`git clone git@github.com:xFAANG/askql.git`

2. Install dependencies:
   `npm i`

3. Build the project:
   `npm run build`

4. Link the project to askql command:
   `npm link`

5. Now you should be able to launch the interpreter (we use REPL for that):
   `askql`

## Code examples

You can find all the examples in `__tests__` folders (e.g. [👉 AskScript tests](https://github.com/xFAANG/askql/tree/master/src/askscript/__tests__)) or in the Usage section below.

## Documentation

Find AskQL documentation [here](https://www.notion.so/AskQL-Documentation-cd065c579d0c44d381ddddc4682f5736).<br>

The Documentation is divided into 4 parts:<br>

- [AskQL Overview](https://www.notion.so/AskQL-Overview-c95f3370be104466bfb3e3bca3ce7db4)
- [AskQL Quick Guide](https://www.notion.so/AskQL-Quick-Guide-0c5f8659957d47978d63f6afb85170ab)
- [AskScript - Human Friendly Language for AskScript](https://www.notion.so/AskScript-Human-Friendly-Language-for-AskQL-7c5e382df87a4015b44985391861f6a2)
- [AskVM - Runtime Environment for AskQL](https://www.notion.so/AskVM-Runtime-Environment-for-AskQL-cf4c34bfc7df4e0c8d35ae6213e6f344)

### Try It Yourself

Do not hesitate to try it out yourself! You can also find fellow AskQL devs in our [Discord community](https://discord.gg/pYdzypH).
<br>

## Tools

#### CLI (AskScript interpreter)

Similar to `python` or `node`, AskScript CLI allows the user to type AskScript programs and get immediate result.

In order to run CLI:

1.  Build the code:

        npm run build

1.  Run:

        node dist/cli.js

Every input is treated as an AskScript program. For convenience, CLI expects just the body of your program, without `ask{` `}`.

The editor has 2 modes - a default single-line mode and a multiline mode.

In order to enter the multiline mode, please type `.editor`.

At the end of your multiline input please press Ctrl+D.

        $ node dist/cli.js
        🦄 .editor
        // Entering editor mode (^D to finish, ^C to cancel)
        const a = 'Hello'
        a:concat(' world')

        (Ctrl+D pressed)

Result:

        string ask(let('a','Hello'),call(get('concat'),get('a'),' world'))
        'Hello world'

As the output CLI always prints AskCode (which would be sent to an AskVM machine if the code was executed over the network) and the result of the AskScript program.

### Usage

1. Write a hello world!

In AskQL we only use single quotes:

```
🦄 'Hello world'
string ask('Hello world')
'Hello world'
```

In the response you get a compiled version of the program that is sent asynchronously to the AskVM.

2. There are two number types

```
🦄 4
int ask(4)
4
```

```
🦄 4.2
float ask(4.2)
4.2
```

3. Let's say we have a table of philosophers and their contribution to computer science as a score:

```
🦄 scorePerPhilosopher
any ask(get('scorePerPhilosopher'))
{
  Aristotle: 385,
  Kant: 42,
  Plato: 1,
  Russel: 7331,
  Turing: 65536,
  Wittgenstein: 420
}
```

Now let's find out the max score with a simple query:

```
🦄 max(scorePerPhilosopher)
int ask(call(get('max'),get('scorePerPhilosopher')))
65536
```

Nice!

4. Write a first query, it can be a multi-liner. First step:

`.editor`

second step, we write the query:

```
query {
  philosophers
}
```

and here we have the answer:

```
any ask(query(node('philosophers',f(get('philosophers')))))
{
  philosophers: [ 'Aristotle', 'Kant', 'Plato', 'Russel', 'Turing', 'Wittgenstein' ]
}
```

5. You want to know now which philosopher had the greatest contribuition to IT, here's a one liner:

```
🦄 find(philosophers, fun(name) { scorePerPhilosopher:at(name):is(max(scorePerPhilosopher)) })

string ask(call(get('find'),get('philosophers'),fun(let('name',get('$0')),call(get('is'),call(get('at'),get('scorePerPhilosopher'),get('name')),call(get('max'),get('scorePerPhilosopher'))))))

'Turing'
```

6. Exit the console!

`ctrl + d`

7. You finished the AskScript tutorial, congratulations! 🎉

### Playground

Here is the link to our [AskQL playground](http://cli.askql.org:3000/)!

## FAQ

### What's the difference between `ask { <askcode> }` and `eval( <javascript> )`?

JavaScript's `eval( <javascript> )` is terrible at ensuring security. One can execute there _any_ code on _any_ resources available in Javascript. Moreover there is no control over time of execution or stack size limit.

On contrary, Ask's `ask { <askscript> }` runs by default on a secure, sandboxed AskVM, which has a separate execution context. We have built in control mechanisms that only allow using external resources you configured. Ask programs are also run with the limits on execution time and stack size restrictions you define.

## Troubleshooting

If you didn't find answers to your questions here, write on ourour [Discord community](https://discord.gg/pYdzypH). We will both help you with the first steps and discuss more advanced topics.

## License

The code in this project is licensed under MIT license.

## Core Developers

- [Marcin Hagmajer](https://github.com/mhagmajer/) (ex-Facebook)
- [Łukasz Czerwiński](https://github.com/czerwinskilukasz1/) (ex-Google)

<a href="https://xfaang.com" align="left">
  <img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/logo.png" 
    align="left"
    title="xFAANG Logo" 
    width="236">
</a>
