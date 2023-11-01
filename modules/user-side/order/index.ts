import {
  addComponentsDir,
  addImportsDir,
  defineNuxtModule, extendPages,
} from '@nuxt/kit';
import { resolve } from 'pathe';


export default defineNuxtModule({
  meta: {
    name: 'orders',
  },
  setup() {

    addImportsDir([
      resolve(__dirname, './composables'),
    ]);

    addComponentsDir({
      path: resolve(__dirname, './components'),
      pathPrefix: false,
    }).then();

    extendPages((pages) => {
      pages.push(
        {
          name: 'SomeRandomRoute',
          path: '/order/:orderId',
          file: resolve(__dirname, './pages/order/[orderId]'),
        },
        {
          name: 'Orders',
          path: '/orders',
          file: resolve(__dirname, './pages/UserOrders'),
        },
      );
    });

  },
});
