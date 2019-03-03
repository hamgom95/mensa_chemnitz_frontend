// use config file based on mode (none | production | development)
module.exports = (env, argv) => require(`./webpack.${argv.mode}`)(env, argv);
