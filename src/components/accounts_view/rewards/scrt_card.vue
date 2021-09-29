<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Scrt Past Prizes</div>

      <div
        class="row g-0 align-items-center"
        v-for="line in user_past_records"
        v-bind:key="line"
      >
        <div class="row g-0 align-items-center">
          <div class="col-6 pool_stats_subheadings">{{ line[1] }}</div>
          <div class="col-6 d-flex justify-content-end">
            <span class="pool_past_prizes pe-2">
              (${{
                coinConvert(
                  coinConvert(line[0], 6, "humans", 1) *
                    scrt_token_current_price,
                  6,
                  "human",
                  1
                )
              }})
            </span>

            <span class="text-white">
              {{ coinConvert(line[0], 6, "humans", 1) }}
            </span>
            <span class="d-inline ms-2 d-flex align-items-center">
              <img
                src="../../../images/scrt_logo.png "
                alt="Logo"
                class="mini-logo-size"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useScrtStakepoolStore } from "../../../contracts";
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  created() {
    this.timer = setTimeout(this.scrtStakepoolGetUserPastRecords, 1000);
  },
  // data() {},
  computed: {
    ...mapState(useScrtStakepoolStore, [
      "user_past_records",
      "scrt_token_current_price",
    ]),
  },
  methods: {
    ...mapActions(useScrtStakepoolStore, ["scrtStakepoolGetUserPastRecords"]),
    coinConvert,
  },
};
</script>
