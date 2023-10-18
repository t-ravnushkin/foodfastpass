<script setup lang="ts">
defineProps<{
  collectionStatus: string;
  paymentDateTime: Date;
}>();
</script>

<template>
  <section class="collection">
    <p class="collection__heading">Collection details</p>

    <div class="collection__container">
      <div class="collection__section-item">
        <p>Order placed</p>
        <!-- paymentDateTime in format of 11 August at 15:00 -->
        <p>{{ new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(paymentDateTime) }}</p>
      </div>
      <div class="collection__section-item">
        <p>Collected</p>
        <p
          :class="[
            'collection__status',
            { collection__status_pending: collectionStatus === 'pending' },
          ]"
        >
          {{ collectionStatus ?? "Pending..." }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.collection {
  margin: 0 0.8rem;

  &__heading {
    margin: 0 0 0.8rem 0.8rem;
    color: var(--black-color);
    font: 500 normal 2rem/1.2 Inter, sans-serif;
  }

  &__container {
    padding: 0.8rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    border-radius: 0.8rem;
    background: var(--white-color);
    box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
      0 2px 4px -2px rgba(54, 54, 171, 0.06);

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__section-item {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
  }

  &__status {
    &_pending {
      color: var(--dark-gray-color);
    }
  }
}
</style>
