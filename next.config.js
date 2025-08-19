const nextConfig = {
  turbopack: {
    resolveAlias: {
      '@components': './src/components',
      '@pages': './src/_pages-old',
      '@': './src',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
