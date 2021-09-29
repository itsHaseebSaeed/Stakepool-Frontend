<template>
  <div class="container-fluid p-0 m-0">
    <div class="row mt-3 p-3 stakepool_info_card align-items-center">
      <div class="col-4">
        <img
          src="../../images/mountains.png"
          alt="Mountains Image"
          class="img-fluid"
        />
      </div>

      <div class="col-8">
        <div class="row d-flex justify-content-end">
          <div class="col-lg-6">
            <div class="row">
              <h1
                v-if="
                  sefi_total_deposits &&
                  sefi_token_current_price &&
                  scrt_total_deposits &&
                  scrt_token_current_price
                "
                class="d-flex justify-content-end text-white m-0"
              >
                $
                {{
                  coinConvert(
                    coinConvert(sefi_total_deposits / 1000000, 0, "human", 1) *
                      sefi_token_current_price +
                      coinConvert(
                        scrt_total_deposits / 1000000,
                        0,
                        "human",
                        1
                      ) *
                        scrt_token_current_price,
                    0,
                    "human",
                    1
                  )
                }}
              </h1>

              <h1 v-else class="d-flex justify-content-end text-white m-0">
                $ 0
              </h1>
            </div>
            <div class="row">
              <div class="d-flex justify-content-end secondary_heading">
                Total Deposits
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <h1
                v-if="
                  sefi_total_rewards &&
                  sefi_token_current_price &&
                  scrt_total_rewards &&
                  scrt_token_current_price
                "
                class="d-flex justify-content-end text-white m-0"
              >
                ${{
                  coinConvert(
                    coinConvert(sefi_total_rewards / 1000000, 0, "human", 1) *
                      sefi_token_current_price +
                      coinConvert(scrt_total_rewards / 1000000, 0, "human", 1) *
                        scrt_token_current_price,
                    0,
                    "human",
                    1
                  )
                }}
              </h1>

              <h1 v-else class="d-flex justify-content-end text-white m-0">
                $ 0
              </h1>
            </div>
            <div class="row">
              <div class="d-flex justify-content-end secondary_heading">
                Weekly Prize
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  useScrtStakepoolStore,
  useSefiStakepoolStore,
  useSefiContractStore,
} from "../../contracts";
import { mapState, mapActions } from "pinia";
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    // this.timer = window.setInterval(this.sync_timer, 1000);
  },

  computed: {
    ...mapState(useScrtStakepoolStore, [
      "scrt_total_rewards",
      "scrt_token_current_price",
      "user_deposits",
      "scrt_total_deposits",
    ]),
    ...mapState(useSefiStakepoolStore, [
      "sefi_total_deposits",
      "sefi_total_rewards",
      "balance",
    ]),
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
  },
  methods: {
    coinConvert,
  },
};
</script>
