<template>
  <div class="container pt-3 pb-3">
    <ScrtPoolHeading />
    <ScrtPoolPrize />
    <ScrtPoolStats />
    <ScrtPoolPastPrizes />
  </div>
</template>

<script>
import ScrtPoolHeading from "../components/scrt_pool_heading.vue";
import ScrtPoolPrize from "../components/scrt_pool_prize_card.vue";
import ScrtPoolStats from "../components/scrt_pool_stats.vue";
import ScrtPoolPastPrizes from "../components/scrt_past_prizes.vue";

export default {
  components: {
    ScrtPoolHeading,
    ScrtPoolPrize,
    ScrtPoolStats,
    ScrtPoolPastPrizes,
  },
};
</script>
