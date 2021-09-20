<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Pool Stats</div>

      <div class="row g-0 align-items-center">
        <div class="col-6 pool_stats_subheadings">Total Deposits</div>
        <div class="col-6 d-flex justify-content-end">
          <div class="row d-flex justify-content-end">
            <div class="col-sm-4 d-flex justify-content-end">
              <span class="pool_stats_scrt_to_dollar">
                ${{
                  coinConvert(
                    coinConvert(total_deposits, 6, "human", 1) *
                      sefi_token_current_price,
                    0,
                    "human",
                    1
                  )
                }}
              </span>
            </div>
            <div class="col-sm-4 d-flex justify-content-end">
              <span>{{ coinConvert(total_deposits, 6, "human", 1) }}</span>
            </div>
            <div class="col-sm-3">
              <div class="d-flex justify-content-end">
                <span class="d-flex align-items-center">
                  <img src="../images/sefi_logo.png" alt="Logo" height="20px" />
                </span>
                <span class="text-white">SEFI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-5 pool_stats_subheadings">Yield Source</div>
        <div class="col-7">
          <div class="d-flex justify-content-end">
            <span class="d-inline d-flex align-items-center">
              <img src="../images/sefi_logo.png" alt="Logo" height="20px" />
            </span>
            <span
              class="
                text-white
                ms-md-2
                d-inline d-flex
                justify-content-end
                align-items-end
              "
              >Compound finance</span
            >
          </div>
        </div>
      </div>

      <div class="row mt-3 g-0">
        <div class="col-12"></div>
      </div>

      <div class="row g-0 mt-3 align-items-center">
        <div class="col-6 pool_stats_subheadings">Expected Weekly Prize</div>
        <div class="col-6">
          <div class="row d-flex justify-content-end">
            <div class="col-sm-2 d-flex justify-content-end">
              <span>{{
                coinConvert(total_rewards / 1000000, 0, "humans", 1)
              }}</span>
            </div>
            <div class="col-lg-2 col-sm-2">
              <div class="d-flex justify-content-end">
                <span class="d-flex align-items-center">
                  <img src="../images/sefi_logo.png" alt="Logo" height="20px" />
                </span>
                <span class="text-white">SEFI</span>
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
            <span class="text-white me-2 d-inline">49.34%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";
import { useSefiContractStore, useSefiStakepoolStore } from "../contracts";

export default {
  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
    ...mapState(useSefiStakepoolStore, ["total_deposits", "total_rewards"]),
  },
  methods: {
    coinConvert,
  },
};
</script>
