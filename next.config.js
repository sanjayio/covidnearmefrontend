module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  env: {
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  }
};
