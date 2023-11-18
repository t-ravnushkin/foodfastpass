import useFilters from "~/modules/user-side/filters/composables/useFilters";

export default async function (restaurantName: string) {
    console.log(restaurantName);
    const { usedMenuTypes } = useCartStore();
    const menuTypes = usedMenuTypes();
    const res: string[] = [];
    for (const type of menuTypes) {
        const { data: timeSlotData, error } = await useCustomFetch("/order/TimeSlotInfo/", {
            method: "POST",
            body: {
                "restaurant": restaurantName,
                "time": type.toLowerCase(),
            },
        });
        for (const timeSlot of timeSlotData.value.timeSlots.split(';')) {
            res.push(timeSlot);
        }
    }
    return res;
}
