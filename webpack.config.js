module.exports = env => {
	console.log('========Starting webpack server ======' + env);
    return env === 'development'
        ? require('./config/webpack.config.dev')
        : require('./config/webpack.config.prod');
};