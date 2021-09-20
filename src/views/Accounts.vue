<template>
  <div class="container">
    <accountAccountCard />
    <accountRewardsCard />
  </div>
</template>

<script>
import accountAccountCard from "../components/account_account.vue";

import accountRewardsCard from "../components/account_rewards.vue";

export default {
  components: {
    accountAccountCard,
    accountRewardsCard,
  },
};
</script>
