# Website

This website is built using Docusaurus 2, a modern static website generator. It is part of a [Turborepo](https://turborepo.org/) monorepo setup.

### Installation

We use Yarn 1 as the package manager. At the root of the repository, run `yarn` to install the monorepo dependencies.

```sh
$ yarn
```

### Local Development

Also at the root of the repository, run:

```sh
$ yarn dev:website
```

This command starts a local development server and opens up a browser window. Most changes made to JavaScript and Markdown files will be reflected instantly without having to restart the server.

### Build

Navigate to the `apps/website` directory.

```sh
cd apps/website
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=1 yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
