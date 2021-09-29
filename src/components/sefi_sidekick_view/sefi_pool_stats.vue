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
                <span class="pool_stats_scrt_to_dollar pool_past_prizes">
                  (${{
                    coinConvert(
                      coinConvert(sefi_total_deposits, 6, "human", 1) *
                        sefi_token_current_price,
                      0,
                      "human",
                      1
                    )
                  }})
                </span>
              </div>
              <div class="me-3">
                <span>{{
                  coinConvert(sefi_total_deposits, 6, "human", 1)
                }}</span>
              </div>
              <div class="">
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/sefi_logo.png"
                    alt="Logo"
                    class="mini-logo-size"
                  />
                </span>
              </div>
              <div class="d-flex justify-content-end">
                <span class="text-white">SEFI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 g-0 pool_stats_subheadings">Your deposits</div>
        <div v-if="balance >= 9999" class="col-6">
          <div class="row">
            <div class="d-flex justify-content-end align-items-center">
              <div class="me-3">
                <span>{{
                  coinConvert(balance / 1000000, 0, "humans", 1)
                }}</span>
              </div>

              <div class="d-flex align-items-center">
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/sefi_logo.png"
                    alt="Logo"
                    class="mini-logo-size"
                  />
                </span>
              </div>

              <div class="d-flex align-items-center">
                <span class="text-white">SEFI</span>
              </div>
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
              @click="sefiStakepoolCreateViewingKey()"
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
                src="../../images/sefi_logo.png"
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
                  coinConvert(sefi_total_rewards / 1000000, 0, "humans", 1)
                }}</span>
              </div>

              <div class="d-flex align-items-center">
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/sefi_logo.png"
                    alt="Logo"
                    class="mini-logo-size"
                  />
                </span>
              </div>

              <div class="d-flex align-items-center">
                <span class="text-white">SEFI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 pool_stats_subheadings">
          Effective ARP:

          <span class="">!&#x20DD;</span>
        </div>
        <div class="col-6">
          <div class="col-12 d-inline d-flex justify-content-end">
            <span class="text-white d-inline">49.34%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";
import { useSefiContractStore, useSefiStakepoolStore } from "../../contracts";

export default {
  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
    ...mapState(useSefiStakepoolStore, [
      "sefi_total_deposits",
      "sefi_total_rewards",
      "balance",
    ]),
  },
  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, ["sefiStakepoolCreateViewingKey"]),
  },
};
</script>
