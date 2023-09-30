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
