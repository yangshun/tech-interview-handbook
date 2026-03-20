# Website

This website is built using Docusaurus 2, a modern static website generator. It is part of the repository's Vite+ monorepo setup.

### Installation

Vite+ manages installs through the repository's declared package manager. At the root of the repository, run `vp install` to install the monorepo dependencies.

```sh
$ vp install
```

### Local Development

Also at the root of the repository, run:

```sh
$ vp run dev
```

This command starts a local development server and opens up a browser window. Most changes made to JavaScript and Markdown files will be reflected instantly without having to restart the server.

### Build

From the repository root, run:

```sh
$ vp run --filter @tih/website build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ cd apps/website
$ GIT_USER=<Your GitHub username> USE_SSH=1 vp run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
