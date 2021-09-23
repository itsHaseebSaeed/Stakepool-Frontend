<template>
  <div class="pool_view h-100">
    <div class="container h-100">
      <TitleCard />
      <TotalDepositsCard />

     <router-link to=/Stakepool-Frontend/scrtpool class="txt-decoration"> <ScrtCard /> </router-link>
     <router-link to=/Stakepool-Frontend/sefipool class="txt-decoration">  <SefiCard /> </router-link>
     


    </div>
  </div>
</template>

<script>
import TotalDepositsCard from "../components/pool_view_total_deposits.vue";
import TitleCard from "../components/pool_view_title_card.vue";
import ScrtCard from "../components/pool_view_scrt_card.vue";
import SefiCard from "../components/pool_view_sefi_card.vue";
import DepositModal from "../modals/scrt_deposit_modal.vue";

export default {
  components: { TotalDepositsCard, TitleCard, ScrtCard, SefiCard,DepositModal },
};
</script>
