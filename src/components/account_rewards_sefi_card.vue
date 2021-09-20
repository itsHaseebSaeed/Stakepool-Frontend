<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Sefi Past Prizes</div>

      <div
        class="row g-0 align-items-center"
        v-for="line in user_past_records"
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
            <span class="pool_past_prizes">
              {{ coinConvert(line[0], 6, "humans", 1) }}
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
    this.timer = setTimeout(this.sefiStakepoolGetUserPastRecords, 1000);
  },
  // data() {},
  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),

    ...mapState(useSefiStakepoolStore, ["user_past_records"]),
  },
  methods: {
    ...mapActions(useSefiStakepoolStore, ["sefiStakepoolGetUserPastRecords"]),
    coinConvert,
  },
};
</script>
