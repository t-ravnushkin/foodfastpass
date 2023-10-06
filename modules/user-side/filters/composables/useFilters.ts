import type { Dish } from '~/modules/user-side/menu/types';


const diets = ['Vegan', 'Vegetarian', 'Pescetarian'];

const allergens = ['Dairy', 'Gluten/Wheat', 'Shellfish',
  'Eggs', 'Soya', 'Peanuts', 'Nuts', 'Celery', 'Mustard', 'Lupin',
  'Sulphites', 'Molluscs', 'Fish', 'Sesame'];

const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];


const chosenDiets = reactive<string[]>([]);

const chosenAllergens = reactive<string[]>([]);

const chosenRating = ref<number>(0);

const chosenMealType = ref<string>('Lunch');


const filtersChange = createEventHook();


watchDeep(
  () => ([chosenDiets, chosenAllergens, chosenRating, chosenMealType]),
  () => filtersChange.trigger(null),
);


function areFiltersApproved(dish: Dish): boolean {

  const passDiets =
    chosenDiets.every(diet => {
      return dish.filters.includes(diet);
    });

  const passAllergens =
    chosenAllergens.every(allergen => {
      return !dish.filters.includes(allergen);
    });

  const passRating = dish.rating >= chosenRating.value;

  const lowerMealTypes = dish.mealTypes.map(w => w.toLowerCase());

  const passMealType = lowerMealTypes.includes('etc')
    || lowerMealTypes.includes(chosenMealType.value.toLowerCase());

  return passDiets
    && passAllergens
    && passRating
    && passMealType;
}

function reset() {
  chosenDiets.splice(0);
  chosenAllergens.splice(0);
  chosenRating.value = 0;
}

const filtersAmount = computed(() => {
  return chosenDiets.length
    + chosenAllergens.length
    + Number(chosenRating.value > 0);
});

export default function () {
  return {
    diets,
    allergens,
    chosenDiets,
    chosenAllergens,
    chosenRating,
    chosenMealType,
    areFiltersApproved,
    reset,
    filtersAmount,
    onFiltersChange: filtersChange.on,
  };
}
