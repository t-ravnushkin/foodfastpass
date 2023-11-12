import { Categories, Dish, FoodProperties, RawDish, CustomGroup, CustomItem } from '~/modules/user-side/menu/types';


const currencyMap: { [s: string]: string } = {
  'eur': '€',
};

export default function (rawDishes: RawDish[], restaurantName: string): Categories {
  const categories: Categories = {};

  for (const dish of rawDishes) {
    const category = dish.categories ?? 'Other dishes';

    if (!categories.hasOwnProperty(String(category)))
      categories[category] = [];


    const price = (currencyMap[dish.currency] ?? dish.currency)
      + Number(dish.price).toFixed(2);


    const images = [
      dish['photo1'],
      dish['photo2'],
      dish['photo3'],
    ].filter(photo => {
      return photo !== null;
    }) as string[];

    if (images.length === 0)
      images.push('/images/default-restaurant-card-image.png');


    const filters = dish.filters && Array.isArray(dish.filters)
      ? dish.filters
      : [];


    const description = dish.description?.replaceAll(
      /(\s*\n+)+/g, '\n',
    );


    const foodProperties: FoodProperties = {
      'Net weight': { value: dish.grams, unit: 'g', main: true },
      'Energy value': { value: dish.calories, unit: 'kcal', main: true },
      'Proteins': { value: dish.proteins, unit: 'g', main: false },
      'Fats': { value: dish.fats, unit: 'g', main: false },
      'Carbohydrates': { value: dish.carbohydrates, unit: 'g', main: false },
    };

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

    const parsedDish: Dish = {
      id: dish.id,
      name: dish.name,
      price,
      priceValue: Number(dish.price),
      currency: String(currencyMap[dish.currency]) ?? dish.currency,
      custom: custom.length > 0 ? custom : undefined,
      images,
      filters,
      inStock: dish.inStock,
      rating: Number(dish.ratings),
      description: description,
      foodProperties: foodProperties,
      restaurantName,
      mealTypes: dish.menuType,
    };

    categories[category].push(parsedDish);
  }

  return categories;
}
