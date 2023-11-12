interface OrderItem {
  dishId: number,
  quantity: number,
  name: string,
  price: string,
  custom: {
    [groupName: string]: { name: string, taken: boolean }[]
  }
};

export function parseCart(): OrderItem[] {
  let res: OrderItem[] = [];
  const { cart, customItems } = useCartStore();
  for (const dishId in cart.value)
    res.push({ dishId: parseInt(dishId), name: cart.value[dishId].dish.name, quantity: cart.value[dishId].quantity, price: cart.value[dishId].dish.price, custom: {} })
  for (const item of customItems.value) {
    let it: OrderItem = { dishId: item.id, name: item.name, quantity: 1, price: item.price, custom: {} };
    for (const group of item.custom ?? []) {
      it.custom[group.name] = [];
      for (const ingredient of group.items) {
        it.custom[group.name].push({ name: ingredient.name, taken: !ingredient.removed });
      }
    }
    res.push(it);
  }
  console.log(res);
  return res;
}

export default async function (coupon: string, timeSlot: string, takeaway?: boolean): Promise<any> {

  const token = useAuthToken();

  if (token.length === 0) {
    navigateTo('/account');
    return;
  }

  const { cart, customItems, getRestaurantName } = useCartStore();

  const parsedCart: { [dishId: number]: { quantity: number } } = {};

  for (const dishId in cart.value)
    parsedCart[dishId] = {
      quantity: cart.value[dishId].quantity
    };
  for (const item of customItems.value) {
    if (parsedCart[item.id] === undefined)
      parsedCart[item.id] = { quantity: 0 };
    parsedCart[item.id].quantity += 1;
  }

  const restaurantName = getRestaurantName();

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
        customizableOrder: parseCart(),
        "Takeaway": takeaway
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
