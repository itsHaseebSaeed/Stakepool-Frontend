<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="sefiReduceStakeModal"
    tabindex="-1"
    aria-labelledby="ScrtModalLabel"
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
                <span class="deposit-modal-heading">Reduce Staked</span>
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

            <div class="row m-0 p-0 mt-3 g-0">
              <div
                class="col-4 d-flex justify-content-start align-items-center"
              >
                <span class="deposit-modal-available">Deposited</span>
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
                  >{{ coinConvert(balance, 6, "human", 2) }} SEFI
                  <span class="deposit-modal-dollars">
                    (${{
                      coinConvert(
                        coinConvert(balance, 6, "human", 2) *
                          sefi_token_current_price,
                        0,
                        "human",
                        2
                      )
                    }})</span
                  >
                </span>
              </div>
            </div>

            <!-- <div class="row m-0 p-0 mt-3 g-0">
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
                  >200 SEFI
                  <span class="deposit-modal-dollars"> ($100)</span>
                </span>
              </div>
            </div> -->

            <div class="row m-0 p-0 mt-3" v-if="overflow_warning">
              <span class="text-danger"
                >*You are trying to Withdraw more than Deposited
              </span>
            </div>

            <div class="row m-0 p-0 mt-3" v-if="underflow_warning">
              <span class="text-danger">*Invalid number </span>
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
                    v-model="reduceStakesAmount"
                    overflow_warning="false"
                    @click="removeWarning()"
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
                @click="reduce_stakes_check(reduceStakesAmount)"
                id="depositAmount"
                class="btn text-white"
                type="submit"
                value="Submit"
                min="0"
                max="sefi_token_balance"
              >
                Reduce Stakes
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
      reduceStakesAmount: undefined,
      overflow_warning: false,
      underflow_warning: false,
      on_going_transaction: undefined,
      successful: undefined,
      total_deposits: undefined,
      staked_total: undefined,
    };
  },

  computed: {
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
    ...mapState(useSefiStakepoolStore, ["balance"]),
  },

  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, ["sefiStakepoolTriggerWithdraw"]),
    ...mapActions(useSefiContractStore, [
      "createOrGetViewingKey",
      "getSefiContractBalance",
    ]),
    async reduce_stakes_check(reduceStakesAmount) {
      console.log(this.balance);
      console.log(reduceStakesAmount * 1000000);

      if (reduceStakesAmount * 1000000 > this.balance) {
        this.overflow_warning = true;
      } else if (reduceStakesAmount <= 0 || reduceStakesAmount == undefined) {
        this.underflow_warning = true;
      } else {
        this.on_going_transaction = true;
        this.overflow_warning = false;
        this.underflow_warning = false;
        let temp_array = await this.sefiStakepoolTriggerWithdraw(
          reduceStakesAmount
        );
        // let temp_array = [true, "worked"];

        this.successful = temp_array[0];

        if (this.successful) {
          this.on_going_transaction = false;
          this.successful = false;
          this.$refs.closeBtn.click();
          this.clearFields();
        } else {
          this.clearFields();
          this.on_going_transaction = false;
          this.$refs.closeBtn.click();
          //call fail modal and psas this error
          console.log(temp_array[2]);
        }
      }
    },
    async clearFields() {
      this.reduceStakesAmount = "";
      this.overflow_warning = false;
      this.underflow_warning = false;
    },
    async removeWarning() {
      this.overflow_warning = false;
      this.underflow_warning = false;
    },
    async Percentage(percentage) {
      this.reduceStakesAmount = coinConvert(
        coinConvert(this.balance, 6, "human", 6) * percentage,
        0,
        "human",
        6
      );
    },
  },
};
</script>
