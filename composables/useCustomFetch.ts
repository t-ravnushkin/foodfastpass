import { UseFetchOptions } from '#app';
import { defu } from 'defu';


export default function <T>(
  url: string,
  options: UseFetchOptions<T> = {},
) {

  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,
    // cache request
    key: url,

    // onResponse(_ctx) {
    //   // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    // },

    // onResponseError(_ctx) {
    //   // throw new myBusinessError()
    //   console.error(_ctx);
    // },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
