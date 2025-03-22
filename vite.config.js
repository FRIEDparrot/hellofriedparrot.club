import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const env = loadEnv(process.cwd(), process.env.NODE_ENV);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd()); // load environment variables
    // const env = loadEnv(process.env.NODE_ENV, process.cwd());
    const vite_port = `${env.VITE_PORT ?? 3500}`;
    const vite_host = `${env.VITE_HOST ?? '127.0.0.1'}`;
    const API_URL = `${env.VITE_API_URL ?? 'http://localhost:5000'}`;

    const resolvePath = (dir) => path.resolve(__dirname, dir);
    // this gives the alias "@" to the different directory  for convience of importing
    return {
        root: '',
        server: {
            host: vite_host, // use 127.0.0.1  for server host
            port: parseInt(vite_port, 10), // config server port
            strictPort: true, //
        },
        resolve: {
            alias: {
                '@': resolvePath('src'),
                '@assets': resolvePath('src/assets'),
                '@anims': resolvePath('src/assets/anims'),
                '@backup': resolvePath('backup'),
                '@api': resolvePath('src/api'),
                '@config': resolvePath('src/config'),
                '@components': resolvePath('src/components'), // components directory
                '@fonts': resolvePath('src/assets/fonts'), // fonts directory
                '@functions': resolvePath('src/utils/functions'), // functions directory
                '@interface': resolvePath('src/components/interface'), // interface directory
                '@imgs': resolvePath('src/assets/imgs'), // images directory
                '@locales': resolvePath('src/locales'), // locales directory
                '@lang': resolvePath('src/locales/lang'), // language directory
                '@layout': resolvePath('src/layout'),
                '@middlewares': resolvePath('src/middlewares'), // middlewares directory
                '@pages': resolvePath('src/pages'),
                '@views': resolvePath('src/views'),
                '@router': resolvePath('./src/router'),
                '@store': resolvePath('src/store'),
                '@shared': resolvePath('src/shared'),
                '@styles': resolvePath('src/styles'),
                '@utils': resolvePath('src/utils'),
                '@hooks': resolvePath('src/hooks'),
                '@types': resolvePath('src/types'),
                '@themes': resolvePath('src/themes'),
            },
        },
        plugins: [vue()],
    };
});
