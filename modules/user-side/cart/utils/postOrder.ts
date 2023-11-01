export default async function (coupon: string, timeSlot: string, takeaway?: boolean): Promise<any> {

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

  const { chosenMealType } = useFilters();

  const { data, error } = await useCustomFetch(
    '/order/CreateOrder/',
    {
      method: 'POST',
      body: {
        promocode: coupon,
        timeSlot,
        restaurantName,
        menuType: chosenMealType,
        cart: parsedCart,
        "takeaway": takeaway
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(data.value);

  // @ts-ignore
  const response: string = (data.value == "-1" ? "-1" : (data.value.client_secret ?? ''));
  const requestError = error.value;

  return { response, requestError };
}
