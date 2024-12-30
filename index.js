const pkg = require('./package.json');

const forbidden_urls = [
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
];

const forbiddenUrlsPlugin = {
	register: (server, options) => {
		forbidden_urls.forEach((url) => {
			server.route({
				method: ['GET', 'POST'],
				path: url,
				options: {
					auth: false,
				},
				handler: (request, h) => {
					// Redirect back to the attacker's own machine lol
					return h.redirect(`http://127.0.0.1${request.path}`);
				},
			});
		});
	},
	name: 'forbiddenURLs',
	version: pkg.version,
};

module.exports = forbiddenUrlsPlugin;
