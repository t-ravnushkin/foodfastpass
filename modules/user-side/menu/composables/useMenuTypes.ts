const mealTypes = ref([]);

export default function (restaurantName?: string) {
    if (restaurantName) {
        onMounted(() => {
            nextTick(async () => {
                const response = await getRestaurants();
                const restaurant = response.find(restaurant => restaurant.name === restaurantName);
                mealTypes.value = Array.from(new Set(restaurant.allMenuTypes));
            })
        })
    }
    return mealTypes;
}
