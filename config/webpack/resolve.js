const path = require("path");

const absolutePath = basePath =>
  path.resolve(__dirname, "..", "..", `app/javascript/${basePath}`);

const imagesPath = path.resolve(__dirname, "..", "..", "app/assets/images");

module.exports = {
  alias: {
    apis: absolutePath("src/apis"),
    common: absolutePath("src/common"),
    components: absolutePath("src/components"),
    constants: absolutePath("src/constants"),
    contexts: absolutePath("src/contexts"),
    hooks: absolutePath("src/hooks"),
    reducers: absolutePath("src/reducers"),
    neetoui: "@bigbinary/neetoui",
    neetoicons: "@bigbinary/neeto-icons",
    neetomolecules: "@bigbinary/neeto-molecules",
    neetoeditor: "@bigbinary/neeto-editor",
    utils: absolutePath("src/utils"),
    lib: absolutePath("src/lib"),
    channels: absolutePath("src/channels"),
    neetocommonsfrontend: "@bigbinary/neeto-commons-frontend",
    images: imagesPath,
  },
  extensions: [
    ".ts",
    ".mjs",
    ".js",
    ".sass",
    ".scss",
    ".css",
    ".module.sass",
    ".module.scss",
    ".module.css",
    ".png",
    ".svg",
    ".gif",
    ".jpeg",
    ".jpg",
  ],
  fallback: {
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    fs: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    tty: require.resolve("tty-browserify"),
    util: require.resolve("util/"),
    url: require.resolve("url/"),
    zlib: require.resolve("browserify-zlib"),
  },
};
