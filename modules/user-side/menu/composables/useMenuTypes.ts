const mealTypes = ref([]);

export default function (restaurantName?: string) {
    if (restaurantName) {
        onMounted(() => {
            nextTick(async () => {
                const response = await getRestaurants();
                const restaurant = response.find(restaurant => restaurant.name === restaurantName);
                mealTypes.value = Array.from(new Set(restaurant.allMenuTypes));
                const { chosenMealType } = useFilters();
                const { currentMealType } = useCartStore();
                chosenMealType.value = (currentMealType.value === "" ? (restaurant.mealTypeNow ?? mealTypes.value[0]) : currentMealType.value);
            })
        })
    }
    return mealTypes;
}
