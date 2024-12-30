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
		plugin: require('../index.js'), // Use require('@trippnology/hapi-forbidden-urls') in your app
		options: {},
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
