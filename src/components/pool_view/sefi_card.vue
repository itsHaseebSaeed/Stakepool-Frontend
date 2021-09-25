<template>
  <div class="container-fluid p-0 m-0">
    <div class="row mt-3 p-3 pool_view_card align-items-center">
      <div
        class="col-lg-3 d-flex justify-content-lg-start justify-content-center"
      >
        <div
          class="d-inline ms-2 d-flex align-items-center justify-content-start"
        >
          <img
            src="../../images/sefi_logo.png"
            alt="Logo"
            class="mini-logo-size"
          />
        </div>
        <div class="pool_stats_scrt_to_dollar ms-2 text-white">SEFI</div>
      </div>
      <div class="col-lg-4 text-white m-auto mb-3">
        <div class="d-block clearfix">
          <div
            v-if="total_rewards"
            class="d-flex justify-content-center prize_amount"
          >
            ${{
              coinConvert(
                coinConvert(total_rewards / 1000000, 0, "human", 1) *
                  sefi_token_current_price,
                0,
                "human",
                1
              )
            }}
          </div>
          <div v-else class="d-flex justify-content-center prize_amount">
            $0
          </div>
        </div>

        <div class="d-block clearfix">
          <span class="d-flex justify-content-center">Prize</span>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-3"></div>
          <div class="col-md-9">
            <div class="row d-flex justify-content-between" id="datetimestamps">
              <div class="col-2">
                <div class="row">
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ days1 }}</span
                  >
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ days2 }}</span
                  >
                </div>
                <div class="row">
                  <span class="p-0 date_title d-flex justify-content-center"
                    >DAY</span
                  >
                </div>
              </div>
              <div class="col-1 text-white align-self-top">
                <h3 class="colon">:</h3>
              </div>

              <div class="col-2">
                <div class="row d-flex justify-content-around">
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ hours1 }}</span
                  >
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ hours2 }}</span
                  >
                </div>
                <div class="row">
                  <span class="p-0 date_title d-flex justify-content-center"
                    >HR</span
                  >
                </div>
              </div>
              <div class="col-1 text-white align-self-top">
                <h3 class="colon">:</h3>
              </div>
              <div class="col-2">
                <div class="row d-flex justify-content-around">
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ mins1 }}</span
                  >
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ mins2 }}</span
                  >
                </div>
                <div class="row">
                  <span class="p-0 date_title d-flex justify-content-center"
                    >MIN</span
                  >
                </div>
              </div>
              <div class="col-1 text-white align-self-top">
                <h3 class="colon">:</h3>
              </div>
              <div class="col-2">
                <div class="row d-flex justify-content-around">
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ secs1 }}</span
                  >
                  <span
                    class="col-5 date_digit d-flex justify-content-center"
                    >{{ secs2 }}</span
                  >
                </div>
                <div class="row">
                  <span class="p-0 date_title d-flex justify-content-center"
                    >SEC</span
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <router-link to="" class="g-0">
                <button
                  type="button"
                  class="btn deposit_button"
                  data-bs-toggle="modal"
                  data-bs-target="#sefiDepositModal"
                >
                  Deposit
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSefiContractStore, useSefiStakepoolStore } from "../../contracts";
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  name: "pool_view_sefi_card",
  created() {},
  mounted() {
    // this.timer = window.setInterval(this.sync_timer, 1000);
  },

  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
    ...mapState(useSefiStakepoolStore, [
      "days1",
      "hours1",
      "mins1",
      "secs1",
      "days2",
      "hours2",
      "mins2",
      "secs2",
      "total_rewards",
    ]),
  },
  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, ["sync_timer"]),
  },
};
</script>
