<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Past Prizes</div>

      <div
        class="row g-0 align-items-center"
        v-for="line in past_rewards"
        v-bind:key="line"
      >
        <div class="row g-0 align-items-center">
          <div class="col-6 pool_stats_subheadings">{{ line[1] }}</div>
          <div class="col-6 d-flex justify-content-end">
            <span class="pool_past_prizes">
              ${{
                coinConvert(
                  coinConvert(line[0], 6, "humans", 1) *
                    sefi_token_current_price,
                  6,
                  "human",
                  1
                )
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSefiContractStore, useSefiStakepoolStore } from "../contracts";
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
