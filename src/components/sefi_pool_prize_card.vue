<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="row stakepool_info_card d-flex justify-content-center m-0 p-3"
      >
        <div class="col-md-3 text-white">
          <div
            class="
              row
              w6
              d-flex
              justify-content-lg-start justify-content-center
            "
          >
            Prize
          </div>
          <div
            class="
              row
              fs-1
              w6
              d-flex
              justify-content-lg-start justify-content-center
            "
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
        </div>

        <div class="col-xlg-5 col-lg-4"></div>

        <div class="col-xlg-4 col-lg-5 col-md-7 col-sm-9 col-xs-9 col-12">
          <div
            class="
              row
              text-white
              w6
              justify-content-lg-start justify-content-center
            "
          >
            Will be awarded
          </div>
          <div class="row d-flex justify-content-between pt-3">
            <div class="col-2">
              <div class="row">
                <span
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
                  >{{ days1 }}</span
                >
                <span
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
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
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
                  >{{ hours1 }}</span
                >
                <span
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
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
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
                  >{{ mins1 }}</span
                >
                <span
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
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
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
                  >{{ secs1 }}</span
                >
                <span
                  class="
                    col-5
                    date_digit_inside_stats
                    d-flex
                    justify-content-center
                  "
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
  name: "pool_view_sefi_card",

  computed: {
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
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
  },
  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, ["sync_timer", "getLotteryInfo"]),
  },
};
</script>
