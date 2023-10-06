export default async function (username: string, password: string) {

    const { data } = await useCustomFetch(
        '/auth/jwt/create/',
        {
            method: 'POST',
            body: {
                username,
                password,
            }
        },
    );

    // @ts-ignore
    const token: string = data.value?.access;

    localStorage.setItem('foodfastpass_user_token', token);
}
