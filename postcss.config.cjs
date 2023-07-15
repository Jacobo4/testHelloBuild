module.exports = {
    plugins: {
        'postcss-nested': { /* plugin options */},
        "postcss-preset-env": {
            "autoprefixer": {
                "flexbox": "no-2009",
                "grid": true
            },
            "stage": 2,
            "features": {
                "custom-properties": true,
                "custom-media-queries": true
            }
        }
    },
}
