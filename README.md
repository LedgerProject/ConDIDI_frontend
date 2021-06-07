# condidi_frontend

The application uses yarn as a package manager. NPM can be used as well, but yarn tends to be much faster.

The application utilized a service worker.
The configuration file can be found unter ./workbox-config.js

If you change the config, you will have to rebuild the service worker.

```
yarn add global workbox-cli
workbox generateSW workbox-config.js
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
