# Hapi Forbidden URLs

Safely redirects URLs commonly used in 'spray and pray' attacks.

## Installation

`npm i --save @trippnology/hapi-forbidden-urls`

## Usage

```js
const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // Your normal routes
const forbiddenUrlsPlugin = require('');

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
	});

	// Register routes directly
	server.route(routes);

	// Register the forbidden URLs plugin
	await server.register(forbiddenUrlsPlugin);

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

init();
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature develop`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

Copyright Rikki Tripp - Trippnology

## License

MIT
