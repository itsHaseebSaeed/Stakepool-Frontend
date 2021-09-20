<template>
  <div class="container-fluid p-0 m-0 mb-5">
    <Title />

    <div class="row">
      <div class="col-6"><ScrtCard /></div>
      <div class="col-6"><SefiCard /></div>
    </div>
  </div>
</template>

<script>
import Title from "../components/account_rewards_title.vue";
import ScrtCard from "../components/account_rewards_scrt_card.vue";
import SefiCard from "../components/account_rewards_sefi_card.vue";

export default {
  components: {
    Title,
    ScrtCard,
    SefiCard,
  },
};
</script>
