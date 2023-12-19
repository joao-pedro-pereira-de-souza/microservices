module.exports = {
	presets: [
		'@babel/preset-typescript',
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		]
	],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@controllers': './src/controllers',
					'@functions': './src/functions',
					'@utils': './src/utils',
					'@middlewares': './src/middlewares',
					'@routes': './src/routes',
					'@root': './'
				}
			}
		]
	],

	ignore: ['**/*.test.ts']
};
