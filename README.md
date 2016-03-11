# cash-register
[![Build Status](https://travis-ci.org/namelos/cash-register.svg?branch=master)](https://travis-ci.org/namelos/cash-register)

#### A Cash Register Demo For Thoughtworks Test

[Here's a direct link on gh-pages](http://namelos.github.io/cash-register/)

#### How to run

```bash
npm install
npm run
# this is debug a mode with browser sync
# localhost:3000 would be avaiable in browser
# and localhost:3001 for debugging
# or you can just build as well
```

#### Building
```bash
npm run build
# then visit dist/index.html
```

 
#### Testing

```
npm test
```

This repository is mainly for thoughtworks test. 

It is a Cycle.js App which is mostly based on rxjs.

Used some immutable / lazy evaluation feature to keep the code simple.

Main logic stays in `src/model.js`, configurations and data are in `src/input.json` `src/config.json` 
