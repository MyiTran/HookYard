# Rails boilerplate - From Golden Owl Solutions

This is a Rails boilerplate use rails 7.2

## Prerequisites

This project requires:

- Ruby (see [.ruby-version](./.ruby-version)), preferably managed using [rbenv](https://github.com/rbenv/rbenv) or [asdf](https://asdf-vm.com/)
- Node 20.9.0
- Yarn 1.x (classic)
- PostgreSQL must be installed and accepting connections

On macOS, these [Homebrew](http://brew.sh) packages are recommended:

```sh
  brew install rbenv
  brew install node 20.9.0
  brew install yarn
  brew install postgresql@16
  brew install redis
```

## Getting started

## Install - setup app

To setup a development environment (MacOS):

**Clone the repo**:

```sh
  git clone git@github.com:GoldenOwlAsia/rails-view-template.git
```

**Install Ruby**:

This project currently uses [Ruby 3.3.0](blob/staging/.ruby-version), which is most easily managed through a version manager like [asdf](https://asdf-vm.com/), [rbenv](https://github.com/rbenv/rbenv)

**Install Nodejs**:

This project user [Node 20.9.0](https://nodejs.org/en/blog/release/v20.9.0), which is most easily managed through a version manager like [asdf](https://github.com/asdf-vm/asdf-nodejs), [rvm](https://github.com/nvm-sh/nvm)

**Install Ruby gems**:

- install bundle version 2.5.4 (or similar if you are using an older version on your development)

  ```sh
  gem install bundler -v 2.5.4
  ```

- bundle

  ```sh
  bundle install
  ```

**Install Yarn**.

```sh
  npm install -g yarn
```

**Install Javascript Packages**:
Install packages:

```sh
  yarn
```

**Set the RACK_ENV (optional)**:
Later steps expect a `RACK_ENV` environment variable, so define one (usually 'development'.) This can be done by exporting a value in your shell config (by adding something like `export RACK_ENV=development` to your shell configuration file - `.bashrc`, etc)

**Personalise the app settings**:

- Copy `config/database.yml.sample` to `config/database.yml` and customise the values as needed.
- Copy `.env.sample` to `.env` and customise the values as needed.

**Run server**:

- rails server:

```sh
  rails s
```

- sidekiq

```sh
  bundle exec sidekiq
```

- Vite

```sh
  vite dev
```

## Development

### ERD

- Using gem: `rails-mermaid_erd` - Its auto generate when run `rails db:migrate`
- Can see ERD at `http://localhost:3000/erd`

### FE references

- DaisyUI: <https://daisyui.com/components/>
- For icons: lucide icon packages: <https://lucide.dev/icons/>

### Rspec

- Run test by:

  ```sh
    bundle exec rspec
  ```

- Check test coverage at `coverage/index.html`

### ESLint

- ESLint check:

  ```sh
    yarn lint
  ```

- ESLint check & auto fix:

  ```sh
    yarn lint:fix
  ```

### Config Git hooks manager

- Use lefthook gem: <https://github.com/evilmartians/lefthook>

  ```sh
    bundle exec lefthook install
  ```

### For create tag & release - github

- Use git-cliff: install with brew

  ```sh
    brew install git-cliff
  ```

  or

  ```sh
    git cliff --bump
  ```

- create version with git-cliff:

  ```sh
    git cliff --tag 1.0.0 --output CHANGELOG.md
  ```

- example:

  ```sh
    git tag -a 1.0.0 -m "Release version 1.0.0"
  ```

  - Can use github CLI to generate in local or create new release in github and copy changes logs from file `CHANGELOG.md`

## Project Directory Structure

- To generate the directory structure in YAML format, run the following command:

  ```bash
  rake docs:generate_yaml
  ```

- If you have not installed the tree command, you can install it by running:

  ```bash
  brew install tree
  ```

```yaml
---
|
  .
  ├── CHANGELOG.md
  ├── DEPLOYMENT.md
  ├── Dockerfile
  ├── Gemfile
  ├── Gemfile.lock
  ├── Procfile
  ├── README.md
  ├── Rakefile
  ├── app
  │   ├── channels
  │   ├── controllers
  │   ├── frontend
  │   ├── helpers
  │   ├── models
  │   ├── policies
  │   ├── queries
  │   ├── services
  │   ├── structure.txt
  │   └── views
  ├── bin
  │   ├── brakeman
  │   ├── bundle
  │   ├── bundle-audit
  │   ├── bundler-audit
  │   ├── dev
  │   ├── docker-entrypoint
  │   ├── rails
  │   ├── rake
  │   ├── rspec
  │   ├── rubocop
  │   ├── setup
  │   └── vite
  ├── cliff.toml
  ├── commitlint.config.js
  ├── config
  │   ├── application.rb
  │   ├── boot.rb
  │   ├── cable.yml
  │   ├── credentials.yml.enc
  │   ├── database.yml
  │   ├── database.yml.sample
  │   ├── environment.rb
  │   ├── environments
  │   ├── i18n-tasks.yml
  │   ├── initializers
  │   ├── locales
  │   ├── master.key
  │   ├── mermaid_erd.yml
  │   ├── puma.rb
  │   ├── routes.rb
  │   ├── sidekiq.yml
  │   ├── storage.rb
  │   ├── storage.yml
  │   └── vite.json
  ├── config.ru
  ├── coverage
  │   ├── assets
  │   └── index.html
  ├── db
  │   ├── migrate
  │   ├── schema.rb
  │   ├── seeds
  │   └── seeds.rb
  ├── docs
  │   └── erd.html
  ├── eslint.config.js
  ├── lefthook.yml
  ├── lib
  │   ├── assets
  │   ├── tasks
  │   └── templates
  ├── package.json
  ├── postcss.config.cjs
  ├── spec
  │   ├── cassettes
  │   ├── factories
  │   ├── fixtures
  │   ├── helpers
  │   ├── i18n_spec.rb
  │   ├── mailers
  │   ├── models
  │   ├── queries
  │   ├── rails_helper.rb
  │   ├── spec_helper.rb
  │   ├── supports
  │   └── views
  ├── tailwind.config.js
  ├── vite.config.ts
  └── yarn.lock
```
