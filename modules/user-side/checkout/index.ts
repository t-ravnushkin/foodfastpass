import {
    addComponentsDir,
    addImportsDir,
    defineNuxtModule,
    extendPages,
} from '@nuxt/kit';
import { resolve } from 'pathe';


export default defineNuxtModule({
    meta: {
        name: 'checkout',
    },
    setup() {

        addImportsDir([
            resolve(__dirname, './composables'),
            resolve(__dirname, './utils'),
        ]);

        addComponentsDir({
            path: resolve(__dirname, './components'),
            pathPrefix: false,
        }).then();

        extendPages((pages) => {
            pages.push({
                name: 'Checkout',
                path: '/checkout',
                file: resolve(__dirname, './pages/checkout.vue'),
            });
        });

    },
});
