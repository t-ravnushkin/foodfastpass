import type { Dish } from '~/modules/user-side/menu/types';


interface Cart {
  [i: number]: {
    quantity: number
    dish: Dish
  };
}

const cart = useSessionStorage<Cart>('cart', {});
const discount = ref(0);

function add(dish: Dish) {
  cart.value.hasOwnProperty(dish.id) ?
    cart.value[dish.id].quantity++ :
    cart.value[dish.id] = { quantity: 1, dish };
}

function remove(dish: Dish) {
  if (cart.value.hasOwnProperty(dish.id)
    && cart.value[dish.id].quantity > 0)
    cart.value[dish.id].quantity--;

  if (cart.value[dish.id].quantity === 0)
    delete cart.value[dish.id];
}

function refresh() {
  for (const dishId in cart.value)
    delete cart.value[dishId]
}

function calcPriceSum(): number {
  if (Object.keys(cart.value).length == 0)
    return 0;
  let sum = 0;
  for (const position in cart.value)
    sum += cart.value[position].quantity * cart.value[position].dish?.priceValue;
  return sum;
}

function priceSum(): string {
  if (Object.keys(cart.value).length == 0)
    return '0';

  let sum = calcPriceSum();

  let currency = cart.value[
    Number(Object.keys(cart.value)[0])
  ].dish.currency;

  return currency + String(Number(sum).toFixed(2));
}

function discountedPriceSum(): string {
  if (Object.keys(cart.value).length == 0)
    return '0';
  let sum = calcPriceSum() * (1 - discount.value / 100);
  let currency = cart.value[
    Number(Object.keys(cart.value)[0])
  ].dish.currency;
  return currency + String(Number(sum).toFixed(2));
}

function isCheckoutReady(): boolean {

  const restaurantNames = new Set();

  const mealTypes = new Set();

  let dishesAmount = 0;

  for (const position in cart.value) {

    console.log(cart.value[position])

    if (cart.value[position].quantity === 0)
      continue;

    const name = cart.value[position].dish?.restaurantName;
    restaurantNames.add(name);

    const dishMealTypes = cart.value[position].dish?.mealTypes;
    dishMealTypes?.forEach(mealType => mealTypes.add(mealType));

    dishesAmount += cart.value[position].quantity;
  }

  mealTypes.delete('ETC');


  const areRestaurantsApproved = restaurantNames.size === 1;

  const areMealTypesApproved = mealTypes.size <= 1;

  const isAmountApproved = dishesAmount > 0;

  console.log(
    areRestaurantsApproved,
    areMealTypesApproved,
    isAmountApproved
  )


  return areRestaurantsApproved
    && areMealTypesApproved
    && isAmountApproved;
}


export default function () {
  return {
    cart,
    discount,
    add,
    remove,
    priceSum,
    isCheckoutReady,
    discountedPriceSum,
    refresh
  };
}
