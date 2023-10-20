import useFilters from "~/modules/user-side/filters/composables/useFilters";

export default async function (restaurantName: string) {
    console.log(restaurantName);
    const { chosenMealType } = useFilters();
    const { data, error } = await useCustomFetch("/order/TimeSlotInfo/", {
        method: "POST",
        body: {
            "restaurant": restaurantName,
            "time": chosenMealType.value.toLowerCase(),
        },
    });
    return data.value.timeSlots.split(';');
}
