<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Past Prizes</div>

      <div class="row g-0 mt-3" v-for="line in past_rewards" v-bind:key="line">
        <div class="row g-0">
          <div class="col-6 pool_stats_subheadings">{{ line[1] }}</div>
          <div class="col-6 d-flex justify-content-end">
            <div class="row">
              <div class="d-flex justify-content-end">
                <div class="me-3 pool_past_prizes">
                  <span>
                    (${{
                      coinConvert(
                        coinConvert(line[0], 6, "humans", 1) *
                          sefi_token_current_price,
                        6,
                        "human",
                        1
                      )
                    }})</span
                  >
                </div>

                <div class="me-3">
                  <span> {{ coinConvert(line[0], 6, "humans", 1) }}</span>
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
      </div>
    </div>
  </div>
</template>

<script>
import { useSefiContractStore, useSefiStakepoolStore } from "../../contracts";
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  created() {
    this.sefiStakepoolGetPublicPastRewards();
  },
  // data() {},
  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),

    ...mapState(useSefiStakepoolStore, ["past_rewards"]),
  },
  methods: {
    ...mapActions(useSefiStakepoolStore, ["sefiStakepoolGetPublicPastRewards"]),
    coinConvert,
  },
};
</script>
