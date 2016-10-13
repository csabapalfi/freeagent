# Freeagent CLI

Simple command line interface for FreeAgent.

# usage

`freeagent-cli <API path>`

e.g. `freeagent-cli /accounting/profit_and_loss/summary`

See available API paths here: https://dev.freeagent.com/docs

Hint: pipe results to `jq .` to get nicely formatted JSON

# install

`npm install -g freeagent-cli`

# first time setup
1. register an app on https://dev.freeagent.com/apps
1. create a `~/.freeagent-cli.json` file:
```json
{
  "clientId": "OAuth identifier here",
  "clientSecret": "OAuth secret here"
}
```
