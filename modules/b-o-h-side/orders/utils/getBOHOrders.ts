export default async function () {

  const token = useAuthToken();

  if (token.length === 0) {
    navigateTo('/boh/auth');
    return;
  }

  const { data, refresh } = await useCustomFetch(
    '/boh/GetAllOrder/',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    },
  );

  await refresh();

  return data.value;
}
