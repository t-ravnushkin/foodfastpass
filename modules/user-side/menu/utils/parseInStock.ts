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
            for (const group of dish.customizableList[0]) {
                const items: CustomItem[] = [];
                for (const item of group.text) {
                    items.push({
                        name: item[0],
                        available: item[1],
                        removed: false,
                    })
                }
                custom.push({
                    name: group.name,
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
