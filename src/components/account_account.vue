<template>
  <div class="container-fluid p-0 m-0">
    <Title />
    <ScrtCard />
    <SefiCard />
  </div>
</template>

<script>
import Title from "../components/account_account_title.vue";
import ScrtCard from "../components/account_account_scrt_card.vue";
import SefiCard from "../components/account_account_sefi_card.vue";
import ScrtDepositModal from "../modals/scrt_deposit_modal.vue";
import SefiDepositModal from "../modals/sefi_deposit_modal.vue";

export default {
  components: {
    Title,
    ScrtCard,
    SefiCard,
    ScrtDepositModal,
    SefiDepositModal,
  },
};
</script>
