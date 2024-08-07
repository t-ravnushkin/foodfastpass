export default async function (uid: string, token: string, new_password: string) {

  const { data, error } = useCustomFetch(
    '/auth/users/reset_password_confirm/',
    {
      method: 'POST',
      body: {
        new_password,
        re_new_password: new_password,
        uid,
        token,
      },
    },
  );

  return { result: data.value, error };
}
