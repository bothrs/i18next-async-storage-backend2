# Introduction

This is a i18next cache layer to be used in the browser. It will load and cache resources from AsyncStorage and can be used in combination with the [chained backend](https://github.com/i18next/i18next-chained-backend).

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-async-storage-cache) or [downloaded](https://github.com/timbrandin/i18next-async-storage-cache/blob/master/i18nextAsyncStorageCache.min.js) from this repo.

```
# npm package
$ npm install i18next-async-storage-backend
```

Wiring up with the chained backend:

```js
import i18next from 'i18next';
import Backend from 'i18next-chained-backend';
import AsyncStorageBackend from 'i18next-async-storage-backend'; // primary use cache
import XHR from 'i18next-xhr-backend'; // fallback xhr load

i18next
  .use(Backend)
  .init({
    backend: {
      backends: [
        AsyncStorageBackend,  // primary
        XHR                   // fallback
      ],
      backendOptions: [{
        /* below options */
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json' // xhr load path for my own fallback
      }]
    }
  });
```

## Cache Backend Options


```js
{
  // prefix for stored languages
  prefix: 'i18next_res_',

  // expiration
  expirationTime: 7*24*60*60*1000,

  // language versions
  versions: {}
};
```

- Contrary to cookies behavior, the cache will respect updates to `expirationTime`. If you set 7 days and later update to 10 days, the cache will persist for 10 days

- Passing in a `versions` object (ex.: `versions: { en: 'v1.2', fr: 'v1.1' }`) will give you control over the cache based on translations version. This setting works along `expirationTime`, so a cached translation will still expire even though the version did not change. You can still set `expirationTime` far into the future to avoid this

Wiring up a service backend with the chained backend:

```js
import i18next from 'i18next';
import Backend from 'i18next-chained-backend';
import AsyncStorageBackend from 'i18next-async-storage-backend'; // primary use cache
import ServiceBackend from 'i18next-service-backend'; // fallback service backend

const TRANSLATION_BACKEND = 'https://api.spacetranslate.com';
const TRANSLATION_BACKEND_PROJECTID = '[projectId]'; // i.e. [projectId].spacetranslate.com

i18next
  .use(Backend)
  .init({
    backend: {
      backends: [
        AsyncStorageBackend,  // primary
        ServiceBackend                   // fallback
      ],
      backendOptions: [{
        // prefix for stored languages
        prefix: 'i18next_res_',

        // expiration
        expirationTime: 7*24*60*60*1000,

        // language versions
        versions: {}
      }, {
        service: TRANSLATION_BACKEND,
        projectId: TRANSLATION_BACKEND_PROJECTID,
        referenceLng: 'en',
        version: 'latest'
      }]
    }
  });
```
