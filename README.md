# Packreg :package:

[![bitHound Overall Score](https://www.bithound.io/github/packreg/packreg-registry/badges/score.svg)](https://www.bithound.io/github/packreg/packreg-registry)   

Package-registry — packreg for short — is a list of packages, collected from different package managers like Bower and other sources. The metadata of every package is kept up to date by observers that scrape every package in detail. Packreg exposes an „immutable“ API that returns a JSONGraph for every package, which makes it easy for clients to interact with packreg.

The app itself is divided into different parts: 
- CLI
- Queue
- Collectors
- Analyzers
- API

The main database is RethinkDB, which automatically replicates everything to elasticsearch. In general write actions go through Rethink, while every read action goes directly to elastic. Routing requests is handled by [Netflix’ Falcor](https://github.com/Netflix/falcor).

### Architecture
[Here's](https://github.com/packreg/packreg-registry/blob/master/docs/architecture.md) a small overview of the project's architecture.

### Installation 
[Here's](https://github.com/packreg/packreg-registry/blob/master/docs/installation.md) how to run your own package-resgitry.
