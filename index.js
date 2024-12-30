const pkg = require('./package.json');

const defaults = {
	forbidden_urls: [
		'/.env',
		'/.git/{p?}',
		'/.git2/{p?}',
		'/_profiler/{p?}',
		'/backup/{p?}',
		'/cgi-bin/{p?}',
		'/cms/{p?}',
		'/console/{p?}',
		'/crm/{p?}',
		'/default.asp/{p?}',
		'/default.php/{p?}',
		'/demo/{p?}',
		'/dns-query/{p?}',
		'/index.php/{p?}',
		'/lib/{p?}',
		'/phpunit/{p?}',
		'/vendor/{p?}',
	],
	method: ['GET', 'POST'],
	// Redirect back to the attacker's own machine lol
	redirect_to: 'http://127.0.0.1',
};

const forbiddenUrlsPlugin = {
	register: (server, options) => {
		// Merge user-provided options with default settings
		const config = { ...defaults, ...options };

		config.forbidden_urls.forEach((url) => {
			server.route({
				method: config.method,
				path: url,
				options: {
					auth: false,
				},
				handler: (request, h) => {
					return h.redirect(`${config.redirect_to}${request.path}`);
				},
			});
		});
	},
	name: 'forbiddenURLs',
	version: pkg.version,
};

module.exports = forbiddenUrlsPlugin;
