<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Pool Stats</div>

      <div class="row g-0 align-items-center">
        <div class="col-6 pool_stats_subheadings">Total Deposits</div>
        <div class="col-6 d-flex justify-content-end">
          <div class="row">
            <div class="d-flex justify-content-end align-items-center">
              <div class="me-3">
                <span
                  class="pool_stats_scrt_to_dollar pool_past_prizes fst-italic"
                >
                  (${{
                    coinConvert(
                      coinConvert(scrt_total_deposits, 6, "human", 1) *
                        scrt_token_current_price,
                      0,
                      "human",
                      1
                    )
                  }})
                </span>
              </div>
              <div class="me-3">
                <span>{{
                  coinConvert(scrt_total_deposits, 6, "human", 1)
                }}</span>
              </div>
              <div class="">
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/scrt_logo.png"
                    alt="Logo"
                    class="mini-logo-size"
                  />
                </span>
              </div>
              <div class="d-flex justify-content-end">
                <span class="text-white">SCRT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 g-0 pool_stats_subheadings">Your deposits</div>
        <div v-if="vk" class="col-6">
          <div class="d-flex justify-content-end align-items-center">
            <div
              class="
                d-flex
                justify-content-end
                align-items-center
                account_winning_odds_value
                fst-italic
                me-3
              "
            >
              <span v-if="user_deposits > 9999">
                ({{
                  coinConvert(
                    (user_deposits / scrt_total_deposits) * 100,
                    0,
                    "human",
                    2
                  )
                }}%)
              </span>
              <span v-else> (0 %) </span>
            </div>

            <div class="me-3">
              <span v-if="user_deposits > 9999">{{
                coinConvert(user_deposits / 1000000, 0, "humans", 1)
              }}</span>
              <span v-else>0.0</span>
            </div>

            <div class="d-flex align-items-center">
              <span class="d-flex align-items-center">
                <img
                  src="../../images/scrt_logo.png"
                  alt="Logo"
                  class="mini-logo-size"
                />
              </span>
            </div>

            <div class="d-flex align-items-center">
              <span class="text-white">SCRT</span>
            </div>
          </div>
        </div>

        <div v-else class="col-6">
          <span
            class="
              deposit-modal-amount
              d-flex
              justify-content-end
              deposit-modal-amount
            "
          >
            <span style="font-size: 20px">&#128269;</span>
            <a
              @click="scrtStakepoolCreateViewingKey()"
              class="createViewingKey deposit-modal-dollars"
            >
              Create or Get Viewing Key
            </a>
          </span>
        </div>
      </div>

      <div class="row mt-3 g-0 line">
        <div class="col-12"></div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-5 pool_stats_subheadings">Yield Source</div>
        <div class="col-7">
          <div class="d-flex justify-content-end">
            <span class="d-inline d-flex align-items-center">
              <img
                src="../../images/scrt_logo.png"
                alt="Logo"
                class="mini-logo-size"
              />
            </span>
            <span
              class="
                text-white
                ms-md-2
                d-inline d-flex
                justify-content-end
                align-items-end
              "
              >SecretSwap</span
            >
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 g-0 pool_stats_subheadings">
          Expected Weekly Prize
        </div>
        <div class="col-6">
          <div class="row">
            <div class="d-flex justify-content-end align-items-center">
              <div class="me-3">
                <span>{{
                  coinConvert(scrt_total_rewards / 1000000, 0, "humans", 1)
                }}</span>
              </div>

              <div class="d-flex align-items-center">
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/scrt_logo.png"
                    alt="Logo"
                    class="mini-logo-size"
                  />
                </span>
              </div>

              <div class="d-flex align-items-center">
                <span class="text-white">SCRT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 pool_stats_subheadings">
          Effective ARP:<i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="col-6">
          <div class="col-12 d-inline d-flex justify-content-end">
            <span class="text-white d-inline">30.34%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";
import { useScrtStakepoolStore } from "../../contracts";

export default {
  computed: {
    ...mapState(useScrtStakepoolStore, [
      "vk",
      "scrt_total_deposits",
      "scrt_total_rewards",
      "scrt_token_current_price",
      "user_deposits",
    ]),
  },
  methods: {
    coinConvert,
    ...mapActions(useScrtStakepoolStore, ["scrtStakepoolCreateViewingKey"]),
  },
};
</script>
