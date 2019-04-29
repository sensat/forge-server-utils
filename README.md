# forge-nodejs-utils [![Build Status](https://travis-ci.org/petrbroz/forge-nodejs-utils.svg?branch=master)](https://travis-ci.org/petrbroz/forge-nodejs-utils) [![npm version](https://badge.fury.io/js/forge-nodejs-utils.svg)](https://badge.fury.io/js/forge-nodejs-utils)

Unofficial tools for accessing [Autodesk Forge](https://developer.autodesk.com/) APIs
from Node.js applications, using modern language features like
[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
or [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

## Usage

### Authentication

```js
const { AuthenticationClient } = require('forge-nodejs-utils');
const auth = new AuthenticationClient(); // If no params, gets credentials from env. vars FORGE_CLIENT_ID and FORGE_CLIENT_SECRET
const authentication = await auth.authenticate(['bucket:read', 'data:read']);
console.log('2-legged Token', authentication.access_token);
```

### Data Management

```js
const { DataManagementClient, AuthenticationClient } = require('forge-nodejs-utils');
const data = new DataManagementClient(new AuthenticationClient());

const buckets = await data.listBuckets();
console.log('Buckets', buckets.map(bucket => bucket.bucketKey).join(','));

const objects = await data.listObjects('foo-bucket');
console.log('Objects', objects.map(object => object.objectId).join(','));
```

### Model Derivatives

```js
const { ModelDerivativeClient, AuthenticationClient } = require('forge-nodejs-utils');
const derivatives = new ModelDerivativeClient(new AuthenticationClient());
const job = await derivatives.submitJob('<your-document-urn>', [{ type: 'svf', views: ['2d', '3d'] }]);
console.log('Job', job);
```

### Design Automation

```js
const { DesignAutomationClient, AuthenticationClient } = require('forge-nodejs-utils');
const client = new DesignAutomationClient(new AuthenticationClient());
const bundles = await client.listAppBundles();
console.log('App bundles', bundles);
```

## Testing

```bash
export FORGE_CLIENT_ID=<your-client-id>
export FORGE_CLIENT_SECRET=<your-client-secret>
export FORGE_BUCKET=<your-test-bucket>
export FORGE_MODEL_URN=<testing-model-urn>
npm test
```
