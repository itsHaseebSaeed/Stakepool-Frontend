<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="sefiWithdrawModal"
    tabindex="-1"
    aria-labelledby="sefiWithdrawModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content deposit-modal-shape">
        <div class="container-fluid deposit-modal-bg deposit-modal-shape p-4">
          <div class="row m-0 p-0 deposit-modal-shape">
            <div class="row m-0 p-0 g-0">
              <div
                class="col-6 d-flex justify-content-start align-items-center"
              >
                <span class="deposit-modal-heading">Withdraw</span>
              </div>
              <div
                class="
                  col-6
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <button
                  type="button"
                  class="btn-close white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref="closeBtn"
                  @click="clearFields()"
                ></button>
              </div>
            </div>

            <!-- <div class="row m-0 p-0 mt-3 g-0">
              <div
                class="col-4 d-flex justify-content-start align-items-center"
              >
                <span class="deposit-modal-available">Available</span>
              </div>
              <div
                class="
                  col-8
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <span class="deposit-modal-amount"
                  >20000 SEFI
                  <span class="deposit-modal-dollars"> ($10000)</span>
                </span>
              </div>
            </div> -->

            <div class="row m-0 p-0 mt-3 g-0">
              <div
                class="col-6 d-flex justify-content-start align-items-center"
              >
                <span class="deposit-modal-available"
                  >Available for withdraw</span
                >
              </div>
              <div
                class="
                  col-6
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <span class="deposit-modal-amount"
                  >{{
                    coinConvert(available_tokens_for_withdrawl, 6, "human", 2)
                  }}
                  SEFI
                  <span class="deposit-modal-dollars">
                    (${{
                      coinConvert(
                        coinConvert(
                          available_tokens_for_withdrawl,
                          6,
                          "human",
                          2
                        ) * sefi_token_current_price,
                        0,
                        "human",
                        2
                      )
                    }})</span
                  >
                </span>
              </div>
            </div>

            <div class="row mt-2 p-0 mt-3">
              <span class="text-danger" v-if="overflow_warning"
                >*You are trying to Withdraw more than Available
              </span>
            </div>

            <div class="row m-0 p-0">
              <span v-if="underflow_warning" class="text-danger"
                >*Invalid number
              </span>
            </div>

            <div
              class="
                row
                m-0
                p-0
                mt-3
                deposit-modal-deposit-field deposit-modal-deposit-field-shape
              "
            >
              <div
                class="col-9 d-flex justify-content-start align-items-center"
              >
                <span>
                  <input
                    class="deposit-modal-deposit-field -none"
                    type="number"
                    placeholder="0.00"
                    placeholder-default="white"
                    v-model="withdraw_amount"
                    @click="removeoverflow_Warning()"
                  />
                </span>
              </div>
              <div
                class="
                  col-3
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <span class="deposit-modal-deposit-field-tokens">SEFI</span>
              </div>
            </div>

            <div class="row g-0 d-flex justify-content-between mt-2">
              <button
                class="
                  col-2
                  d-flex
                  justify-content-center
                  deposit-modal-amount-percentage
                "
                @click="Percentage(0.25)"
              >
                25%
              </button>
              <button
                class="
                  col-2
                  d-flex
                  justify-content-center
                  align-items-center
                  deposit-modal-amount-percentage
                "
                @click="Percentage(0.5)"
              >
                50%
              </button>
              <button
                class="
                  col-2
                  d-flex
                  justify-content-center
                  align-items-center
                  deposit-modal-amount-percentage
                "
                @click="Percentage(0.75)"
              >
                75%
              </button>
              <button
                class="
                  col-2
                  d-flex
                  justify-content-center
                  align-items-center
                  deposit-modal-amount-percentage
                "
                @click="Percentage(1)"
              >
                100%
              </button>
            </div>

            <div
              v-if="!on_going_transaction"
              class="row m-0 p-0 mt-3 deposit-modal-deposit-button"
            >
              <button
                @click="withdraw_check(withdraw_amount)"
                id="withdrawAmount"
                class="btn text-white"
              >
                Withdraw
              </button>
            </div>

            <div
              v-else
              class="
                row
                m-0
                p-0
                mt-3
                deposit-modal-deposit-button
                d-flex
                justify-content-center
                align-items-center
              "
            >
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useWalletStore } from "@stakeordie/griptape-vue.js";
import { coinConvert } from "@stakeordie/griptape.js";
import {
  useSefiStakepoolStore,
  useSefiContractStore,
} from "../../src/contracts";

export default {
  data() {
    return {
      withdraw_amount: undefined,
      overflow_warning: undefined,
      underflow_warning: undefined,

      on_going_transaction: undefined,
      successful: undefined,
      total_deposits: undefined,
      staked_total: undefined,
    };
  },

  mounted() {
    this.timer = setTimeout(this.sefiStakepoolGetAvailableForWithdrawl, 1000);
  },

  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
    ...mapState(useSefiStakepoolStore, ["available_tokens_for_withdrawl"]),
  },

  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolGetAvailableForWithdrawl",
      "sefiStakepoolWithdraw",
    ]),
    ...mapActions(useSefiContractStore, [
      "createOrGetViewingKey",
      "getSefiContractBalance",
    ]),
    async withdraw_check(withdraw_amount) {
      if (withdraw_amount * 1000000 > this.available_tokens_for_withdrawl) {
        this.overflow_warning = true;
      } else if (withdraw_amount <= 0 || withdraw_amount == undefined) {
        this.underflow_warning = true;
      } else {
        this.on_going_transaction = true;
        this.overflow_warning = false;
        this.underflow_warning = false;

        let temp_array = await this.sefiStakepoolWithdraw(withdraw_amount);
        // let temp_array = [true, "sucess"];

        this.successful = temp_array[0];

        if (this.successful) {
          this.on_going_transaction = false;
          this.successful = false;

          this.$refs.closeBtn.click();

          this.clearFields();
        }
      }
    },
    async clearFields() {
      this.withdraw_amount = "";
      this.overflow_warning = false;
      this.underflow_warning = false;
    },
    async removeoverflow_Warning() {
      this.overflow_warning = false;
      this.underflow_warning = false;
    },
    async Percentage(percentage) {
      this.withdraw_amount = coinConvert(
        coinConvert(this.available_tokens_for_withdrawl, 6, "human", 6) *
          percentage,
        0,
        "human",
        6
      );
    },
  },
};
</script>
