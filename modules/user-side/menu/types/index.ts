interface Categories {
  [category: string]: Dish[];
}

interface Dish {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  currency: string;
  images: string[];
  filters: string[];
  rating: number;
  description?: string;
  foodProperties?: FoodProperties;
  restaurantName: string;
  inStock: boolean;
  custom?: CustomGroup[];
  mealTypes: string[];
}

interface FoodProperties {
  [propertyName: string]: {
    value: number | null
    unit: string
    main: boolean
  };
}

interface CustomGroup {
  name: string;
  items: CustomItem[];
}

interface CustomItem {
  name: string;
  available: boolean;
  removed: boolean;
}

interface RawDish {
  id: number;
  name: string;
  category: string;
  price: string;
  currency: string;
  inStock: boolean;
  categories: any;
  customizableList: any;
  description: string | null;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  filters: string[];
  ratings: string;
  grams: number | null;
  calories: number | null;
  proteins: number | null;
  fats: number | null;
  carbohydrates: number | null;
  menuType: string[];
}

interface CustomInStock {
    [groupName: string]: {
        [itemName: string]: boolean
    }
};

interface InStockInfo {
    [id: number]: {
        inStock: boolean,
        custom: CustomInStock
    }
};

export type { Categories, Dish, RawDish, FoodProperties, CustomGroup, CustomItem, InStockInfo , CustomInStock};
