import useFilters from "~/modules/user-side/filters/composables/useFilters";

export default async function (restaurantName: string) {
    console.log(restaurantName);
    const { chosenMealType } = useFilters();
    const { data: timeSlotData, error } = await useCustomFetch("/order/TimeSlotInfo/", {
        method: "POST",
        body: {
            "restaurant": restaurantName,
            "time": chosenMealType.value.toLowerCase(),
        },
    });
    return timeSlotData.value.timeSlots.split(';');
}
