<template>
  <div class="vh-100">
    <Heading />
    <PageContent class="overflow-auto" />
    <Footing />

    <ScrtDepositModal />
    <SefiDepositModal
      @sucessfulDeposit="successModal"
      @failedDeposit="failureModal"
    />
    <SuccessModal
      :current_deposits="current_deposits"
      :denom="denom"
      :pool_share="pool_share"
      :total_deposits="total_deposits"
    />
    <ScrtWithdrawModal />
    <SefiWithdrawModal />
    <ScrtReduceStakeModal />
    <SefiReduceStakeModal />

    <FailedModal :error_message="error_message" />

    <div
      data-bs-toggle="modal"
      data-bs-target="#sefiSuccessModal"
      ref="successModalBtn"
    ></div>

    <div
      data-bs-toggle="modal"
      data-bs-target="#FailtureModal"
      ref="failtureModalBtn"
    ></div>
  </div>
</template>
<script>
import "/src/assets/css/style.css";
import Footing from "./components/footing.vue";
import Heading from "./components/heading.vue";
import PageContent from "./components/page_content.vue";
import ScrtDepositModal from "./modals/scrt_deposit_modal.vue";
import SefiDepositModal from "./modals/sefi_deposit_modal.vue";
import SuccessModal from "./modals/sefi_success_modal.vue";
import SefiWithdrawModal from "./modals/sefi_withdraw_modal.vue";
import FailedModal from "./modals/failture_modal.vue";

import ScrtWithdrawModal from "./modals/scrt_withdraw_modal.vue";
import ScrtReduceStakeModal from "./modals/scrt_reducestake_modal.vue";
import SefiReduceStakeModal from "./modals/sefi_reducestake_modal.vue";

import { useSefiStakepoolStore } from "../src/contracts";
import { useSefiContractStore } from "../src/contracts";

import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  data() {
    return {
      clickOpen: true,
      current_deposits: undefined,
      pool_share: undefined,
      total_deposits: undefined,
      denom: undefined,
      error_message: undefined,
    };
  },
  components: {
    Heading,
    PageContent,
    Footing,
    ScrtDepositModal,
    SefiDepositModal,
    SuccessModal,
    SefiWithdrawModal,
    ScrtReduceStakeModal,
    ScrtWithdrawModal,
    SefiReduceStakeModal,
    FailedModal,
  },
  created() {
    this.sefiStakepoolPoolViewEntryPoint();
    this.sefiStakepoolAccountViewEntryPoint();
  },
  mounted() {
    this.timer = window.setInterval(this.sefiStakepoolSyncTimer, 1000);
    this.timer2 = window.setTimeout(this.getSefiContractBalance, 1000);
  },

  methods: {
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolSyncTimer",
      "sefiStakepoolPoolViewEntryPoint",
      "sefiStakepoolAccountViewEntryPoint",
    ]),
    ...mapActions(useSefiContractStore, ["getSefiContractBalance"]),
    async successModal({
      current_deposits,
      denom,
      pool_share,
      total_deposits,
    }) {
      this.current_deposits = current_deposits;
      this.pool_share = pool_share;
      this.total_deposits = total_deposits;
      this.denom = denom;
      this.$refs.successModalBtn.click();
    },
    async failureModal({ error_message }) {
      this.error_message = error_message;
      this.$refs.failtureModalBtn.click();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
</style>
