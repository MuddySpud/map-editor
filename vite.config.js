import { defineConfig } from 'vite'
import fs from 'fs'


module.exports = {

    root: './root',

    build: {
        sourcemap: true,
    },

    server: {

        port: '1237',
        strictPort: true,

        https: {
            key: fs.readFileSync('localhost-key.pem'),
            cert: fs.readFileSync('localhost.pem'),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                charset: false,
            },
        },
    },
}