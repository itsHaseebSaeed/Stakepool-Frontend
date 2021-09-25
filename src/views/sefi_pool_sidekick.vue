<template>
  <div class="container pt-3 pb-3">
    <SefiPoolHeading />
    <SefiPoolPrize />
    <SefiPoolStats />
    <SefiPoolPastPrizes />
  </div>
</template>

<script>
import SefiPoolHeading from "../components/sefi_sidekick_view/sefi_pool_heading.vue";
import SefiPoolPrize from "../components/sefi_sidekick_view/sefi_pool_prize_card.vue";
import SefiPoolStats from "../components/sefi_sidekick_view/sefi_pool_stats.vue";
import SefiPoolPastPrizes from "../components/sefi_sidekick_view/sefi_past_prizes.vue";

export default {
  components: {
    SefiPoolHeading,
    SefiPoolPrize,
    SefiPoolStats,
    SefiPoolPastPrizes,
  },
};
</script>
