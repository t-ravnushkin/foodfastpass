export default async function (orderId: number, onComplete: () => void) {

  const token = useAuthToken();

  if (token.length === 0) {
    navigateTo('/boh/auth');
    return;
  }

  const { data } = await useCustomFetch(
    '/boh/OrderCompleted/',
    {
      method: 'POST',
      body: {
        OrderPk: Number(orderId),
      },
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    },
  );

  onComplete();
}