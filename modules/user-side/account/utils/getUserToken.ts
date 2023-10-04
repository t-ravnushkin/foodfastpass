export default async function (username: string, password: string) {

  const { data, error } = await useCustomFetch(
    '/auth/jwt/create/',
    {
      method: 'POST',
      body: {
        username,
        password,
      },
      headers: {
        'Host': "foodfastpass.ie",
        'Origin': "foodfastpass.ie",
      },
      onResponse: ({ request, response, options }) => {
        if (!response.ok)
          return;
        const token: string = response._data.access;
        localStorage.setItem('foodfastpass_user_token', token);
      },
      onResponseError: ({ request, response, options }) => {
        throw response._data;
      }
    },
  );

  // @ts-ignore
  const token: string = data.value?.access;

  localStorage.setItem('foodfastpass_user_token', token);

  if (error.value !== undefined) {
    throw error.value;
  }
}
