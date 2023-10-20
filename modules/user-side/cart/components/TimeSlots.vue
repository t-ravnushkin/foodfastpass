<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { Collapse } from "vue-collapsed";

const props = defineProps<{
  timeSlot: { start: string; end: string };
  restaurantName: string;
}>();

const emits = defineEmits<{
  "update:timeSlot": [timeslot: { start: string; end: string }];
}>();

const timeslots = await getTimeslots(props.restaurantName);
emits("update:timeSlot", { start: timeslots[0], end: timeslots[0] });
// const timeslots = [
//   {
//     start: '13:55',
//     end: '14:00',
//     availability: 'available',
//   },
//   {
//     start: '14:00',
//     end: '14:05',
//     availability: 'unavailable',
//   },
//   {
//     start: '14:05',
//     end: '14:10',
//     availability: 'available',
//   },
//   {
//     start: '14:10',
//     end: '14:15',
//     availability: 'available',
//   },
//   {
//     start: '14:15',
//     end: '14:20',
//     availability: 'inconvenient',
//   },
//   {
//     start: '14:20',
//     end: '14:25',
//     availability: 'inconvenient',
//   },
//   {
//     start: '14:25',
//     end: '14:30',
//     availability: 'inconvenient',
//   },
// ];

const isExpanded = ref(false);

function toggleTimeSlots() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="timeslot">
    <p class="timeslot__label">Timeslot</p>

    <div
      class="timeslot__select"
      @click="toggleTimeSlots"
      v-on-click-outside="
        () => {
          if (isExpanded) toggleTimeSlots();
        }
      "
    >
      <div class="timeslot__current-timeslot">
        <span>{{ timeSlot.start }}</span>
      </div>

      <collapse
        :when="isExpanded"
        :style="{ transition: 'all .2s ease', paddingTop: '0.1rem' }"
      >
        <div class="timeslot__available-timeslots">
          <span
            v-for="timeslot in timeslots"
            :key="timeslot"
            :class="[
              'timeslot__option',
              {
                // 'timeslot__option_unavailable': timeslot.availability === 'unavailable',
                // 'timeslot__option_inconvenient': timeslot.availability === 'inconvenient',
              },
            ]"
            @click="
              emits('update:timeSlot', { start: timeslot, end: timeslot })
            "
            >{{ timeslot }}</span
          >
        </div>
      </collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeslot {
  width: 100%;
  height: 2.7rem;

  display: grid;
  grid: min-content min-content / max-content min-content;
  place-content: space-between;

  &__label {
    color: var(--black-color);
    font: 400 normal 1.8rem/1.5 Inter, sans-serif;
  }

  &__select {
    min-width: 9.6rem;

    color: var(--black-color);
    font: 400 normal 1.2rem/1.5 Inter, sans-serif;
    background: var(--white-color);

    overscroll-behavior: contain;
    z-index: 1000;
  }

  &__current-timeslot {
    padding: 0.2rem 0.8rem;

    display: grid;
    place-items: center;

    border-radius: 0.4rem;
    border: 1px solid var(--light-color);
  }

  &__available-timeslots {
    max-height: 16.8rem;

    display: flex;
    padding: 0 0.8rem;
    flex-direction: column;
    align-items: center;

    border-radius: 0.4rem;
    border: 1px solid var(--light-color);

    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__option {
    padding: 0.4rem 0;

    &:not(:last-child) {
      border-bottom: 0.5px solid var(--light-color);
    }

    &_unavailable {
      color: var(--light-gray-color);
    }

    &_inconvenient {
      color: var(--red-color);
    }
  }
}
</style>
