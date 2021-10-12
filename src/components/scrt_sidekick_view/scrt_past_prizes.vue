<template>
  <div class="container-fluid text-white">
    <div class="row mt-3 p-3 pool_view_card">
      <div class="row w4 fs-2 w5">Past Prizes</div>

      <div class="row g-0 mt-3" v-for="line in columns" v-bind:key="line">
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
                          scrt_token_current_price,
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
      </div>
      <div class="mt-5 row d-flex justify-content-end g-0">
        <div class="col-sm-9 col-7"></div>
        <div class="col-sm-3">
          <button
            class="btn deposit_button"
            @click="visible = visible + 5"
            :disabled="visible >= max"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useScrtStakepoolStore } from "../../contracts";
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  data() {
    return {
      visible: 5,
      max: 100,
    };
  },
  created() {
    this.scrtStakepoolGetPublicPastRewards();
  },
  computed: {
    ...mapState(useScrtStakepoolStore, [
      "past_records",
      "scrt_token_current_price",
    ]),
    columns() {
      let columns = [];
      if (this.past_records) {
        this.max = this.past_records.length;

        for (let i = 0; i < this.visible; i++) {
          if (i + 1 <= this.past_records.length) {
            columns.push(this.past_records[i]);
          }
        }
      }
      return columns;
    },
  },
  methods: {
    ...mapActions(useScrtStakepoolStore, ["scrtStakepoolGetPublicPastRewards"]),
    coinConvert,
  },
};
</script>
