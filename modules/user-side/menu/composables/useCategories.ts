import type { Categories } from '..//types';


const categories = reactive<Categories>({});


export default function (restaurantName?: string): Categories {

  if (restaurantName)
    onMounted(() => {
      nextTick(async () => {
        const response = await getDishes(restaurantName);

        const menu = parseDishes(response, restaurantName);
        for (const category in categories) delete categories[category];
        Object.assign(categories, menu);

      });
    });

  return categories;
}
