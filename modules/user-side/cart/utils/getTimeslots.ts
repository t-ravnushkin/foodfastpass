import useFilters from "~/modules/user-side/filters/composables/useFilters";

export default async function (restaurantName: string) {
    console.log(restaurantName);
    const { usedMenuTypes } = useCartStore();
    const menuTypes = usedMenuTypes().map(type => type.toLowerCase());
    const { data: timeSlotData, error } = await useCustomFetch("/order/TimeSlotInfo/", {
        method: "POST",
        body: {
            "restaurant": restaurantName,
            "time": JSON.stringify(menuTypes),
        },
    });
    return timeSlotData.value.timeSlots.split(";");
}
