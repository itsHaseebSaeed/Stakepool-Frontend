<template>
  <div class="vh-100">
    <Heading />
    <PageContent class="overflow-auto" />
    <Footing />

    <ScrtDepositModal
      @scrtsucessfulDeposit="depositSuccessModal"
      @scrtfailedDeposit="failureModal"
    />
    <SefiDepositModal
      @sucessfulDeposit="depositSuccessModal"
      @failedDeposit="failureModal"
    />
    <DepositSuccessModal
      :current_deposits="current_deposits"
      :denom="denom"
      :pool_share="pool_share"
      :total_deposits="total_deposits"
    />
    <ReduceStakedSuccessModal
      @openWithdrawModal="withdrawModal"
      :available_tokens_for_withdrawl="available_tokens_for_withdrawl"
      :denom="denom"
      :current_reduce_stakes_amount="current_reduce_stakes_amount"
    />

    <WithdrawSuccessModal
      :current_withdraw_amount="current_withdraw_amount"
      :denom="denom"
      :balance="balance"
    />

    <ScrtWithdrawModal
      @failedWithdraw="failureModal"
      @sucessfulWithdraw="withdrawSuccessModal"
    />

    <SefiWithdrawModal
      @failedWithdraw="failureModal"
      @sucessfulWithdraw="withdrawSuccessModal"
    />
    <ScrtReduceStakeModal
      @sucessfulReduceStakes="reduceStakesSuccessModal"
      @failedReduceStake="failureModal"
    />
    <SefiReduceStakeModal
      @sucessfulReduceStakes="reduceStakesSuccessModal"
      @failedReduceStake="failureModal"
    />

    <FailedModal :error_message="error_message" />

    <div
      data-bs-toggle="modal"
      data-bs-target="#sefiWithdrawModal"
      ref="sefiWithdrawModalBtn"
    ></div>

    <div
      data-bs-toggle="modal"
      data-bs-target="#ReduceStakesSuccessModal"
      ref="ReduceStakesSuccessModalBtn"
    ></div>

    <div
      data-bs-toggle="modal"
      data-bs-target="#sefiSuccessModal"
      ref="DepositSuccessModalBtn"
    ></div>

    <div
      data-bs-toggle="modal"
      data-bs-target="#withdrawSuccessModal"
      ref="WithdrawSuccessModalBtn"
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
import { useSefiStakepoolStore } from "../src/contracts";
import { useSefiContractStore } from "../src/contracts";
import { useScrtStakepoolStore } from "../src/contracts";

import { mapState, mapActions } from "pinia";
import { defineAsyncComponent } from "vue";

export default {
  data() {
    return {
      clickOpen: true,
      current_deposits: undefined,
      pool_share: undefined,
      total_deposits: undefined,
      denom: undefined,
      error_message: undefined,
      current_reduce_stakes_amount: undefined,
      available_tokens_for_withdrawl: undefined,
      current_withdraw_amount: undefined,
      balance: undefined,
    };
  },
  components: {
    Heading: defineAsyncComponent(() =>
      import("./components/main_view/heading.vue")
    ),
    PageContent: defineAsyncComponent(() =>
      import("./components/main_view/page_content.vue")
    ),
    Footing: defineAsyncComponent(() =>
      import("./components/main_view/footing.vue")
    ),
    ScrtDepositModal: defineAsyncComponent(() =>
      import("./modals/scrt_modals/scrt_deposit_modal.vue")
    ),
    SefiDepositModal: defineAsyncComponent(() =>
      import("./modals/sefi_modals/sefi_deposit_modal.vue")
    ),

    SefiWithdrawModal: defineAsyncComponent(() =>
      import("./modals/sefi_modals/sefi_withdraw_modal.vue")
    ),
    ScrtReduceStakeModal: defineAsyncComponent(() =>
      import("./modals/scrt_modals/scrt_reducestake_modal.vue")
    ),
    ScrtWithdrawModal: defineAsyncComponent(() =>
      import("./modals/scrt_modals/scrt_withdraw_modal.vue")
    ),
    SefiReduceStakeModal: defineAsyncComponent(() =>
      import("./modals/sefi_modals/sefi_reducestake_modal.vue")
    ),
    FailedModal: defineAsyncComponent(() =>
      import("./modals/failture_modal.vue")
    ),
    DepositSuccessModal: defineAsyncComponent(() =>
      import("./modals/success_modals/success_deposit_modal.vue")
    ),
    ReduceStakedSuccessModal: defineAsyncComponent(() =>
      import("./modals/success_modals/success_reduce_stakes_modal.vue")
    ),
    WithdrawSuccessModal: defineAsyncComponent(() =>
      import("./modals/success_modals/success_withdraw_modal.vue")
    ),
  },
  created() {},
  mounted() {
    this.sefiStakepoolPoolViewEntryPoint();
    this.scrtStakepoolPoolViewEntryPoint();
    this.timer0 = window.setTimeout(this.getSefiContractBalance, 1000);

    this.timer1 = window.setTimeout(
      this.sefiStakepoolAccountViewEntryPoint,
      1000
    );
    this.timer2 = window.setTimeout(
      this.scrtStakepoolAccountViewEntryPoint,
      1000
    );
    this.timer3 = window.setInterval(this.scrtStakepoolSyncTimer, 1000);

    this.timer4 = window.setInterval(this.sefiStakepoolSyncTimer, 1000);
  },

  methods: {
    ...mapActions(useScrtStakepoolStore, [
      "scrtStakepoolSyncTimer",

      "scrtStakepoolPoolViewEntryPoint",
      "scrtStakepoolAccountViewEntryPoint",
    ]),
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolSyncTimer",
      "sefiStakepoolPoolViewEntryPoint",
      "sefiStakepoolAccountViewEntryPoint",
    ]),
    ...mapActions(useSefiContractStore, ["getSefiContractBalance"]),
    async depositSuccessModal({
      current_deposits,
      denom,
      pool_share,
      total_deposits,
    }) {
      this.current_deposits = current_deposits;
      this.pool_share = pool_share;
      this.total_deposits = total_deposits;
      this.denom = denom;
      this.$refs.DepositSuccessModalBtn.click();
    },
    async reduceStakesSuccessModal({
      current_reduce_stakes_amount,
      denom,
      available_tokens_for_withdrawl,
    }) {
      this.current_reduce_stakes_amount = current_reduce_stakes_amount;
      this.available_tokens_for_withdrawl = available_tokens_for_withdrawl;
      this.denom = denom;
      this.$refs.ReduceStakesSuccessModalBtn.click();
    },
    async withdrawSuccessModal({ current_withdraw_amount, denom, balance }) {
      this.current_withdraw_amount = current_withdraw_amount;
      this.denom = denom;
      this.balance = balance;
      this.$refs.WithdrawSuccessModalBtn.click();
    },

    async failureModal({ error_message }) {
      this.error_message = error_message;
      this.$refs.failtureModalBtn.click();
    },
    async withdrawModal() {
      this.$refs.sefiWithdrawModalBtn.click();
    },
  },
};
</script>

<style></style>
