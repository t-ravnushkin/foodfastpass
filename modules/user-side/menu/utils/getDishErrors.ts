import { Dish } from '~/modules/user-side/menu/types';

export default function (dish: Dish): string[] {
    if (!dish.custom) return [];
    let res: string[] = [];
    for (const group of dish.custom) {
        for (const item of group.items) {
            if (!item.available && !item.removed)
                res.push(item.name);
        }
    }
    return res;
}
