<template>
  <div class="container">
    <accountAccountCard />
    <accountRewardsCard />
  </div>
</template>

<script>
import accountAccountCard from "../components/accounts_view/account/main.vue";

import accountRewardsCard from "../components/accounts_view/rewards/main.vue";

export default {
  components: {
    accountAccountCard,
    accountRewardsCard,
  },
};
</script>
