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

const restName = useSessionStorage<string>('restName', '');

const restaurantCarts = useSessionStorage<Map<string, Cart>>('restaurantCarts', new Map());
const restaurantCustomItems = useSessionStorage<Map<string, Dish[]>>('restaurantCustomItems', new Map());
const restaurantCurrentMealTypes = useSessionStorage<Map<string, string>>('restaurantCurrentMealTypes', new Map());

function changeRestaurant(newRestaurant: string) {
  if (restName.value) {
    restaurantCarts.value.set(restName.value, cart.value);
    restaurantCustomItems.value.set(restName.value, customItems.value);
    restaurantCurrentMealTypes.value.set(restName.value, currentMealType.value);
  }
  restName.value = newRestaurant;
  cart.value = restaurantCarts.value.get(newRestaurant) ?? {};
  customItems.value = restaurantCustomItems.value.get(newRestaurant) ?? [];
  currentMealType.value = restaurantCurrentMealTypes.value.get(newRestaurant) ?? "";
}

const currentMealType = useSessionStorage<string>('currentMealType', '');
const suspendedDish = ref<Dish | null>(null);

function clear() {
  cart.value = {};
  customItems.value = [];
  currentMealType.value = "";
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
  const { chosenMealType } = useFilters();
  if (currentMealType.value === "")
    currentMealType.value = chosenMealType.value;
  if (dish.mealTypes.includes(currentMealType.value)) {
    currentMealType.value = chosenMealType.value;
  }
  if (currentMealType.value !== chosenMealType.value) {
    suspendedDish.value = dish;
    return;
  }
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
    if (isEmpty()) {
      console.log("clearing cart");
      clear();
    }
    return;
  }
  if (cart.value.hasOwnProperty(dish.id)
    && cart.value[dish.id].quantity > 0)
    cart.value[dish.id].quantity--;

  if (cart.value[dish.id].quantity === 0)
    delete cart.value[dish.id];
  if (isEmpty()) {
    console.log("clearing cart");
    clear();
  }
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

function usedMenuTypes(): string[] {
  let res: string[] = [];
  if (customItems.value.length > 0)
    res = customItems.value[0].mealTypes;
  else if (Object.keys(cart.value).length > 0)
    res = Object.values(cart.value)[0].dish?.mealTypes;
  else
    return [];
  for (const item of customItems.value) {
    let updatedRes: string[] = [];
    for (const mealType of res)
      if (item.mealTypes.includes(mealType))
        updatedRes.push(mealType);
    res = updatedRes;
  }
  for (const item of Object.values(cart.value)) {
    let updatedRes: string[] = [];
    for (const mealType of res)
      if (item.dish?.mealTypes.includes(mealType))
        updatedRes.push(mealType);
    res = updatedRes;
  }
  return res;
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

  const areMealTypesApproved = usedMenuTypes().length > 0;

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
  return restName.value;
  // if (customItems.value.length > 0)
  //   return customItems.value[0].restaurantName;
  // if (Object.keys(cart.value).length > 0)
  //   return Object.values(cart.value)[0].dish?.restaurantName;
  // return '';
}

function emptyDish(dishId: number) {
  delete cart.value[dishId];
  if (isEmpty()) {
    console.log("clearing cart");
    clear();
  }
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
    getRestaurantName,
    changeRestaurant,
    currentMealType,
    suspendedDish,
    usedMenuTypes
  };
}
