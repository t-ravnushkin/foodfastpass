import { RawDish, CustomGroup, CustomItem, InStockInfo, CustomInStock } from '~/modules/user-side/menu/types';


const currencyMap: { [s: string]: string } = {
    'eur': '€',
};

export default function (rawDishes: RawDish[]): InStockInfo {
    let res: InStockInfo = {};
    for (const dish of rawDishes) {
        const custom: CustomGroup[] = [];
        if (dish.customizableList.length > 0) {
            console.log(dish.customizableList);
            for (const group of dish.customizableList) {
                const name = Object.keys(group)[0];
                const items: CustomItem[] = [];
                for (const item of group[name]) {
                    items.push({
                        name: Object.keys(item)[0],
                        available: !!Object.values(item)[0],
                        removed: !Object.values(item)[0],
                    })
                }
                custom.push({
                    name,
                    items: items
                })
            }
            console.log(custom)
        }
        const transCustom: CustomInStock = {};
        for (const group of custom) {
            transCustom[group.name] = {};
            for (const item of group.items) {
                transCustom[group.name][item.name] = item.available;
            }
        }

        res[dish.id] = { inStock: dish.inStock, custom: transCustom };
    }
    return res;
}
