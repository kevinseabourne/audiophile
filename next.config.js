module.exports = {
  experimental: {
    styledComponents: true,
  },
  // add more font or image formats if importing them to here.
  images: {
    domains: ["chpistel.sirv.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|woff|woff2|otf|ttf|svg)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            name: "static/media/[name].[hash:8].[ext]",
            limit: 100000,
          },
        },
      ],
    });

    return config;
  },
};
