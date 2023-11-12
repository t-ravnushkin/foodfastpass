import type { Dish } from '~/modules/user-side/menu/types';


interface Cart {
  [i: number]: {
    quantity: number
    dish: Dish
  };
}

const cart = useSessionStorage<Cart>('cart', {});
const customItems = useSessionStorage<Dish[]>('customItems', []);
const discount = ref(0);

function clear() {
  cart.value = {};
  customItems.value = [];
}

function toRawDeep<T>(observed: T): T {
  const val = toRaw(observed);

  if (Array.isArray(val)) {
    return val.map(toRawDeep) as T;
  }

  if (val === null) return null as T;

  if (typeof val === 'object') {
    const entries = Object.entries(val).map(([key, val]) => [key, toRawDeep(val)]);

    return Object.fromEntries(entries);
  }

  return val;
}

function add(dish: Dish) {
  if (dish.custom) {
    const clone = structuredClone(toRawDeep(dish));
    customItems.value.push(clone);
    return;
  }
  cart.value.hasOwnProperty(dish.id) ?
    cart.value[dish.id].quantity++ :
    cart.value[dish.id] = { quantity: 1, dish };
}

function remove(dish: Dish) {
  if (dish.custom) {
    const index = customItems.value.indexOf(dish);
    if (index > -1) {
      customItems.value.splice(index, 1);
    }
    return;
  }
  if (cart.value.hasOwnProperty(dish.id)
    && cart.value[dish.id].quantity > 0)
    cart.value[dish.id].quantity--;

  if (cart.value[dish.id].quantity === 0)
    delete cart.value[dish.id];
}

function refresh() {
  for (const dishId in cart.value)
    delete cart.value[dishId]
  customItems.value = [];
}

function calcPriceSum(): number {
  let sum = 0;
  if (Object.keys(cart.value).length > 0)
    for (const position in cart.value)
      sum += cart.value[position].quantity * cart.value[position].dish?.priceValue;
  if (customItems.value.length > 0)
    for (const item of customItems.value) {
      sum += item.priceValue;
    }
  return sum;
}

function priceSum(): string {
  if (customItems.value.length === 0 && Object.keys(cart.value).length === 0)
    return '0';

  let sum = calcPriceSum();

  let currency = (customItems.value.length > 0 ? customItems.value[0].currency : Object.values(cart.value)[0].dish.currency);

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

  let areAllInStock = true;

  for (const position in cart.value) {

    console.log(cart.value[position])

    if (cart.value[position].quantity === 0)
      continue;

    areAllInStock = (areAllInStock && cart.value[position].dish?.inStock);

    const name = cart.value[position].dish?.restaurantName;
    restaurantNames.add(name);

    const dishMealTypes = cart.value[position].dish?.mealTypes;
    dishMealTypes?.forEach(mealType => mealTypes.add(mealType));

    dishesAmount += cart.value[position].quantity;
  }

  let hasCustomErrors = false;

  for (const position in customItems.value) {
    const name = customItems.value[position].restaurantName;
    restaurantNames.add(name);
    const dishMealTypes = customItems.value[position].mealTypes;
    dishMealTypes?.forEach(mealType => mealTypes.add(mealType));
    dishesAmount++;

    areAllInStock = (areAllInStock && customItems.value[position].inStock);
    hasCustomErrors = (hasCustomErrors || getDishErrors(customItems.value[position]).length > 0);
  }

  mealTypes.delete('ETC');


  const areRestaurantsApproved = restaurantNames.size === 1;

  const areMealTypesApproved = mealTypes.size <= 1;

  const isAmountApproved = dishesAmount > 0;

  console.log(
    areRestaurantsApproved,
    areMealTypesApproved,
    isAmountApproved,
    areAllInStock,
    !hasCustomErrors
  )


  return areRestaurantsApproved
    && areMealTypesApproved
    && isAmountApproved && areAllInStock && !hasCustomErrors;
}

function getRestaurantName(): string {
  if (customItems.value.length > 0)
    return customItems.value[0].restaurantName;
  if (Object.keys(cart.value).length > 0)
    return Object.values(cart.value)[0].dish?.restaurantName;
  return '';
}

function emptyDish(dishId: number) {
  delete cart.value[dishId];
}

function isEmpty(): boolean {
  return Object.keys(cart.value).length === 0 && customItems.value.length === 0;
}

export default function () {
  return {
    cart,
    customItems,
    discount,
    add,
    remove,
    priceSum,
    isCheckoutReady,
    discountedPriceSum,
    refresh,
    clear,
    emptyDish,
    isEmpty,
    getRestaurantName
  };
}
