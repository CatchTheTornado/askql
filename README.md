<p align="center">
  <a href="https://askql.org">
    <img src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/askql-logo-OW-cut.png" title="AskQL Logo" width="200">
  </a>
</p>

# [AskQL](https://askql.org/)

**AskQL is the next step after GraphQL and Serverless**. 

With AskQL developers can attach scripts to queries that are executed serverside. The AskQL parser accepts the GraphQL query format so there's **no learning curve**. Because the scripts are executed serverside and the results [can be cached](#584) it's great for Web Vitals and app performance.

Read a great articly on [AskQL as a GraphQL alternative](https://yonatankra.com/on-covid-19-graphql-and-askql/)

**Deploy your dynamic JAMStack, Mobile, CMS apps with no backend development required.**

By doing so frontend developers needing additional API endpoints are no longer bound by the backend development release cycles. They can send the middleware/endpoint code along with the query. No deployments, no custom resolvers, lambdas required.

<div style="text-align:center;">
[![](http://img.youtube.com/vi/DZg9Ux2gzsA/0.jpg)](http://www.youtube.com/watch?v=DZg9Ux2gzsA "")
</div>

**It's safe**

AskQL uses the isolated Virtual Machine to execute the scripts and the resources concept that let you fully controll what integrations, collections and other data sources are accessible to the scripts.

By the way, it's a Turning-complete query and programming language :-)

## Getting started

AskQL comes with whole variety of default resources (resource is equivalent of GraphQL resolver). You should definitely read the **[Introduction to AskQL](https://yonatankra.com/introduction-to-askql/)** by @YonatanKra and **[AskQL Quickstart](https://yonatankra.com/askql-nodejs-quickstart/)**

## Why and what for?

<img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/REST_API_approach.png" 
    align="center"
    title="Rest"
    height=50%
    width=50%><img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/AskQL_approach-update-july2020.jpg" 
    align="center"
    title="AskQL"
    height=50%
    width=50%>

Benefits for development process:

- Next milestone after GraphQL and REST API
- New safe query language extedning the GraphQL syntax
- Send code to servers without the need to deploy
- Send executable code instead of JSONs
- Give the frontend developers more freedom, simplifying the dev process to single layer

Benefits for programmers:

- Asynchronous by default, no more `await` keyword - cleaner code
- Processes only immutable data - fewer errors
- Compiled to a clean functional code - clear logic

### Prerequisites

`node >=12.14`


## Quick Start

### Installation

In your Node project run:

```
npm install askql
```

### Usage

You can use AskQL interpreter for variety of use cases:

- **Ultimate endpoint** accpeting the extended GraphQL queries

Sample server. [Checkout full demo](https://github.com/YonatanKra/askql-demo) from @YonatanKra repo.

```js
import askql from "askql";
import express from 'express';
import bodyParser from 'body-parser';

const { askExpressMiddleware } = middlewareFactory;
const { resources } = askql; // resources available to AskQL Scripts
const values = { }; // values available to AskQL scripts

export const askMiddleware = askExpressMiddleware(
    { resources, values },
    { callNext: true, passError: true }
);

const port = 8080;
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/ask', [askMiddleware]);

app.listen(port, () => {
    console.log(`AskQL listening at http://localhost:${port}`);
});
```

- **CLI appps** acting a query language

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


## Examples

AskQL comes with whole variety of default resources (resource is equivalent of GraphQL resolver). You should definitely read the [Introduction to AskQL](https://yonatankra.com/introduction-to-askql/) by @YonatanKra and [AskQL Quickstart](https://yonatankra.com/askql-nodejs-quickstart/)

Query the Star Wars characters with AskQL and the [`fetch` builtin resource](https://github.com/CatchTheTornado/askql/blob/master/src/askvm/resources/node/fetch.ts):

```js
ask {
	fetch('https://swapi.dev/api/people'):at('results'):map(fun(swCharacter) {
    {
      Name: swCharacter.name,
      Gender: swCharacter.gender,
      'Hair Color': swCharacter.hair_color
    }
  })
}
```

## Development & Contributing

Please find all important information here:

[Contributing guidelines](https://github.com/xFAANG/askql/blob/master/CONTRIBUTING.md)

## Installation from source

1. Clone the repository

   `git clone git@github.com:xFAANG/askql.git`

2. For Linux it is advised to install autoreconf as it is used by one of the Node packages used by AskScript Playground.

   For Ubuntu/Debian run: `sudo apt-get install autoconf`

3. Install dependencies:
   `npm i`

4. Build the project:
   `npm run build`

5. Link the project to askql command:
   `npm link`

6. Now you should be able to launch the interpreter (we use REPL for that):
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

### CLI (AskScript interpreter)

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

#### Usage

1. Write a hello world and test it out with the CLI interpreter! If you'd like to use the GraphQL like endpoint [read this article](https://yonatankra.com/on-covid-19-graphql-and-askql/).

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

3. Let's say we've got more sophisticated example using the REST api and the `fetch` resource to get the current India's COVID19 stats:

```
ask {
  fetch('https://api.covid19india.org/data.json')['cases_time_series']
  :map(fun(dataSet) {
                         return {
                            data: dataSet['date'],
                            dailyconfirmed: dataSet['dailyconfirmed'],
                            dailydeceased: dataSet['dailydeceased'],
                            dailyrecovered: dataSet['dailyrecovered']
                          }
                        })
}
```

4. Exit the console!

`ctrl + d`

5. You finished the AskScript tutorial, congratulations! 🎉

### Playground

Here is the link to our [AskQL playground](http://cli.askql.org/)!

#### Developer info - how to run Playground frontend

1. Copy .env.example to .env and set `PLAYGROUND_PORT` and `PLAYGROUND_ASK_SERVER_URL` appropriately. You can also set the optional `GTM` variable to your Google Tag Manager code.

   or

   You can also specify the variables in command line when running the Playground.

2. Compile Playground:

   ```
   npm run playground:build
   ```

   or

   ```
   npm run build
   ```

3. Run it:

   ```
   npm run playground:start
   ```


    You can specify port and server URL in command line:

    ```
    PLAYGROUND_PORT=8080 PLAYGROUND_ASK_SERVER_URL="http://localhost:1234" npm run playground:start
    ```

#### Additional notes

Some files in the Playground come or are inspired by https://github.com/microsoft/TypeScript-Node-Starter (MIT) and https://github.com/Coffeekraken/code-playground (MIT).

#### Developer info - how to run Playground backend

1. Run:

   ```
   npm run build
   ```

2. Run:

   ```
   node dist/playground-backend/express/demoAskScriptServer.js
   ```

   If you want to specify custom port, run:

   ```
   PORT=1234 node dist/playground-backend/express/demoAskScriptServer.js
   ```

   instead.

## FAQ

### What's the difference between `ask { <askscript> }` and `eval( <javascript> )`?

JavaScript's `eval( <javascript> )` is terrible at ensuring security. One can execute there _any_ code on _any_ resources available in Javascript. Moreover there is no control over time of execution or stack size limit.

On contrary, Ask's `ask { <askscript> }` runs by default on a secure, sandboxed AskVM, which has a separate execution context. We have built in control mechanisms that only allow using external resources you configured. Ask programs are also run with the limits on execution time and stack size restrictions you define.

## Troubleshooting

If you didn't find answers to your questions here, write on our [Discord community](https://discord.gg/pYdzypH). We will both help you with the first steps and discuss more advanced topics.

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
