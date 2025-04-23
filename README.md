# Hapi Forbidden URLs

Hapi plugin to safely redirect requests to URLs commonly used in 'spray and pray' attacks.

## Installation

`npm i --save @trippnology/hapi-forbidden-urls`

## Usage

```js
const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // Your normal routes

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
	});

	// Register routes directly
	server.route(routes);

	// Register the forbidden URLs plugin
	await server.register({
		plugin: require('@trippnology/hapi-forbidden-urls'),
		// Optionally specify your own list of extensions, URLs, methods, and target host to redirect to
		options: {
			forbidden_extensions: ['php', 'rb'],
			forbidden_urls: ['/.env'],
			method: 'GET',
			redirect_to: 'https://www.google.com',
		},
	});

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
	console.log(`Visiting ${server.info.uri} should show hello world`);
	console.log(`Visiting ${server.info.uri}/.env should redirect`);
};

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

init();
```

### Options

| Option                 | Type            | Default            | Notes                                                                            |
| ---------------------- | --------------- | ------------------ | -------------------------------------------------------------------------------- |
| `forbidden_extensions` | Array           | See list below     | Do not include the dot, e.g. `php` not `.php`                                    |
| `forbidden_urls`       | Array           | See list below     | Must follow hapi's [path parameter rules](https://hapi.dev/api/#path-parameters) |
| `method`               | String or Array | `*`                | See [route options](https://hapi.dev/api/#-serverrouteroute) for details         |
| `redirect_to`          | String          | `http://127.0.0.1` | Must **not** end in a `/`                                                        |

#### Default Extensions

This is the list of extensions that are redirected if you do not supply your own:

```
'asp',
'aspx',
'php',
```

#### Default URLs

This is the list of URLs that are redirected if you do not supply your own:

```
'/.env',
'/.git/{p?}',
'/.git2/{p?}',
'/_profiler/{p?}',
'/backup/{p?}',
'/cgi-bin/{p?}',
'/cms/{p?}',
'/console/{p?}',
'/crm/{p?}',
'/demo/{p?}',
'/dns-query/{p?}',
'/lib/{p?}',
'/phpunit/{p?}',
'/vendor/{p?}',
```

Adding `/{p?}` to the end means that sub-paths are covered too.

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

MIT See: [LICENSE](./LICENSE)
