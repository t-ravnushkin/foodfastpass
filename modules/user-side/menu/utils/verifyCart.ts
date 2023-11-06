const { cart, customItems, getRestaurantName, isCheckoutReady } = useCartStore();

export default async function (): Promise<boolean> {
    const restaurantName = getRestaurantName();
    const response = await getDishes(restaurantName);
    console.log(response);
    const inStockInfo = parseInStock(response);
    for (const dishId of Object.keys(cart.value)) {
        cart.value[parseInt(dishId)].dish.inStock = inStockInfo[parseInt(dishId)].inStock;
    }
    for (const item of customItems.value) {
        item.inStock = inStockInfo[item.id].inStock;
        for (const group of item.custom ?? []) {
            for (const ingredient of group.items) {
                ingredient.available = inStockInfo[item.id].custom[group.name][ingredient.name];
            }
        }
    }
    return isCheckoutReady();
}
