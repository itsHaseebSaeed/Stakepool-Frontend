<template>
  <div class="container-fluid p-0 m-0">
    <Title />
    <ScrtCard />
    <SefiCard />
  </div>
</template>

<script>
import Title from "./title.vue";
import ScrtCard from "./scrt_card.vue";
import SefiCard from "./sefi_card.vue";
import ScrtDepositModal from "../../../modals/scrt_modals/scrt_deposit_modal.vue";
import SefiDepositModal from "../../../modals/sefi_modals/sefi_deposit_modal.vue";

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
