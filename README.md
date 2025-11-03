
## Content management platform
  - Create, edit, and schedule articles for publishing
  - Articles are versioned and can be restored to any previous version
  - Supports URL redirection, and scheduled updates
  - Also handles basic analytics


## Local Development Setup

First clone this repo.

Then install the [Node.js](https://nodejs.org) version `v18.12` which we have specified inside the `.node-version` file of this repo., using the following command:

```bash
nvm install
```

Make sure that [yarn](https://yarnpkg.com) is installed with it as well in your
system.

After `yarn` is installed, install the Node.js and Rails dependencies and also
seed the database, by running:

```bash
./bin/setup
```

Start the server by executing following command.

```bash
bundle exec rails server -p 3000
```
