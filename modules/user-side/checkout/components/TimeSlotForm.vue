<script setup lang="ts">
const props = defineProps<{
  timeSlot: { start: string; end: string };
  restaurantName: string;
  isExpanded: boolean;
}>();
const emits = defineEmits(["update:isExpanded", "update:timeSlot"]);

const timeslotsByHour = ref(new Map<string, string[]>());
const timeslots = await getTimeslots(props.restaurantName).then((data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") continue;
    let hours = data[i].split(":")[0];
    timeslotsByHour.value.set(hours, [
      ...(timeslotsByHour.value.get(hours) || []),
      data[i],
    ]);
  }
  return data;
});
emits("update:timeSlot", { start: timeslots[0], end: timeslots[0] });

function toggleTimeSlots() {
  emits("update:isExpanded", !props.isExpanded);
}

const selectedHour = ref(timeslots[0].split(":")[0]);
</script>

<template>
  <div class="timeslots">
    <p class="timeslots__text">What time do you want to collect it?</p>
    <div v-if="!isExpanded" class="timeslots__timeslot_active">
      {{ timeSlot.start }}
    </div>
    <p v-if="!isExpanded" class="timeslots__edit_text" @click="toggleTimeSlots">
      Edit
    </p>
    <div class="selector" v-else>
      <div class="selector__hours">
        <p
          v-for="(hour, index) in timeslotsByHour.keys()"
          :key="index"
          class="selector__hour_slot"
          :class="{
            selector__hour_slot_selected: hour === selectedHour,
          }"
          @click="selectedHour = hour"
        >
          {{ hour }}:00
        </p>
      </div>
      <div class="selector__slots">
        <button
          v-for="slot in timeslotsByHour.get(selectedHour)"
          class="selector__slots_slot"
          :class="{ selector__slots_slot_selected: slot === timeSlot.end }"
          @click="
            emits('update:timeSlot', { start: slot, end: slot });
            toggleTimeSlots();
          "
        >
          {{ slot }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selector {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 26px;

  &__hours {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 20px;
  }

  &__hour_slot {
    flex-shrink: 0;
    width: 67px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #99999999;
    &_selected {
      background-color: #d6d6d6;
      color: black;
    }
  }

  &__slots {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: calc(100vh - 143px - 364px);
    width: 100%;
    gap: 7px;

    &_slot {
      border: none;
      background-color: #f1f1f1;
      min-height: 40px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      border-radius: 8px;

      &_selected {
        background-color: var(--dark-color);
        color: white;
      }
    }
  }
}

.timeslots {
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 100%;
  padding: 8px;

  gap: 8px;

  &__text {
    padding: 2px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    height: 44px;
    display: flex;
    align-items: center;
  }

  &__timeslot_active {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    background-color: var(--dark-color);
    color: white;
    line-height: 150%;
  }

  &__edit_text {
    align-self: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #3636ab;
  }
}
</style>
