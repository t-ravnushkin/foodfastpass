import { Dish } from "../types";

const dishes = reactive<Dish[]>([]);

export default function (restaurantName?: string): Dish[] {

    if (restaurantName)
        onMounted(() => {
            nextTick(async () => {
                const response = await getDishes(restaurantName);

                const categories = parseDishes(response, restaurantName);
                while (dishes.length)
                    dishes.pop();
                for (const category in categories) {
                    dishes.push(...categories[category]);
                }
                console.log(dishes);
            });
        });

    return dishes;
}
