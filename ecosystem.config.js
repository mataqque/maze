module.exports = {
	apps: [
		{
			name: 'strapi-app', // Nombre de tu aplicación
			script: 'yarn', // El comando para iniciar la aplicación
			args: 'run strapi-start', // El script definido en package.json
			cwd: '/ruta/a/tu/proyecto', // Ruta absoluta a tu proyecto
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
