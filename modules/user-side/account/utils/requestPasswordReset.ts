export default async function (email: string) {


  const { data, error } = useCustomFetch(
    '/auth/users/reset_password/',
    {
      method: 'POST',
      body: {
        email,
        username: email,
      },
    },
  );

  return { result: data.value, error };

}
