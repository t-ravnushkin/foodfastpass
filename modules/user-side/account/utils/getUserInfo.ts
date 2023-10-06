export default async function () {

  const token = useAuthToken();

  if (token.length === 0){
    navigateTo('/account');
    return;
  }

  const { data} = await useCustomFetch(
    '/auth/users/me/',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    }
  );


  return data.value
}
