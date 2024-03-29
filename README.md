## Document Immutability Blueprint

This repository contains an basic implementation of the Document Immutability Blueprint. 
A live version can accessed via this [link](https://iota-poex.dag.sh/).
For more information, check the (currently slightly outdated) [Blueprint Overview](https://legacy.docs.iota.works/docs/blueprints/0.1/doc-immutability/overview).


 # Dev & Environment

This blueprint is based on our PoEx-library [@iota/poex-tool](https://www.npmjs.com/package/@iota/poex-tool), which provides the functionality for publishing, fetching and verifying file fingerprints via the IOTA Tangle.


## Pre-requisites

```shell
  npm install
```

 # Start project

 This will run the Webapp at http://localhost:3000.

```shell
  npm start
```


 # Deployment

```shell
  npm run build
  npm run deploy
```