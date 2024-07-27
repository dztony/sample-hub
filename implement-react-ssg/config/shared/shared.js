import webpack from 'webpack';

const isProd = process.env.NODE_ENV === 'production';

export default {
  module: {
    rules: [
      {
        // 资源类处理与路径
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: '[name].[hash:8][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        }
      },
      {
        test: /\.m?js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // {
      //   test: /\.(sass|scss|css)$/i,
      //   use: [
      //     // 'style-loader',
      //     PluginMiniCssExtract.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           mode: 'local',
      //           auto: true,
      //           localIdentName: '[local]_[contenthash:8]',
      //         },
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sassOptions: {
      //
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.mode': JSON.stringify(isProd ? 'production' : 'development'),
    }),
  ],
  stats: 'errors-only',
};
