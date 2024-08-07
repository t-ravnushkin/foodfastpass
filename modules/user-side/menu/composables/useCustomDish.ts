import type { Dish } from '~/modules/menu/types';


const currentDish = ref<Dish | null>(null);


export default function (dish?: Dish): Ref<Dish | null> {

    if (dish) {
        currentDish.value = dish;
    }

    return currentDish;
}
