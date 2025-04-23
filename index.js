const pkg = require('./package.json');

const defaults = {
	forbidden_extensions: ['asp', 'aspx', 'php'],
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
		'/demo/{p?}',
		'/dns-query/{p?}',
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

		if (config.forbidden_extensions.length) {
			server.ext('onRequest', (request, h) => {
				// Get the path
				const path = request.path;

				// Check if the path ends with any of the forbidden extensions
				for (const ext of config.forbidden_extensions) {
					if (path.endsWith(`.${ext}`)) {
						return h
							.redirect(`${config.redirect_to}${request.path}`)
							.takeover();
					}
				}

				// Continue processing the request if no forbidden extensions were matched
				return h.continue;
			});
		}

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
