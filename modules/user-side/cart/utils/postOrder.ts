export default async function (coupon: string, timeSlot: string): Promise<any>  {

  const token = useAuthToken();

  if (token.length === 0) {
    navigateTo('/account');
    return;
  }

  const { cart } = useCartStore();

  const parsedCart: { [dishId: number]: { quantity: number } } = {};

  for (const dishId in cart.value)
    parsedCart[dishId] = {
      quantity: cart.value[dishId].quantity
    };

  const restaurantName = Object.values(cart.value)[0].dish.restaurantName;


  const { data, error } = await useCustomFetch(
    '/order/CreateOrder/',
    {
      method: 'POST',
      body: {
        promocode: coupon.toUpperCase(),
        timeSlot,
        restaurantName,
        cart: parsedCart,
      },
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    },
  );

  // @ts-ignore
  const clientSecret: string = data.value['client_secret'] ?? '';

  return {clientSecret, error};
}
