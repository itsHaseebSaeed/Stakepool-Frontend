<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="scrtReduceStakeModal"
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
            <div class="row m-0 p-0 mt-3 g-0 text-white fw-lighter">
              <span class="">
                This will remove your SCRT tokens from the rewards contract. You
                will have to withdraw your SCRT to see it in your wallet
              </span>
            </div>

            <div class="row m-0 p-0 g-0 rounded-3 p-4 border mt-4">
              <div class="col-2 d-flex justify-content-start align-items-start">
                <span class="deposit-modal-heading fs-1">&#9888;</span>
              </div>
              <div
                class="
                  col-10
                  d-flex
                  justify-content-start
                  align-items-center
                  white
                "
              >
                <div class="ul">
                  Once the unbonding period begins you will:
                  <div class="li">- not be able to cancel the unbonding</div>
                  <div class="li">
                    - need to wait 21 days for the amount to be liquid
                  </div>
                </div>
              </div>
            </div>

            <div class="row m-0 p-0 mt-3 g-0">
              <div
                class="col-4 d-flex justify-content-start align-items-center"
              >
                <span class="deposit-modal-available">Deposited</span>
              </div>
              <div
                v-if="user_deposits"
                class="
                  col-8
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <span class="deposit-modal-amount pe-1"
                  >{{ coinConvert(user_deposits, 6, "human", 2) }}
                </span>
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/scrt_logo.png"
                    alt="LOGO Image"
                    class="img-fluid mini-logo-size"
                  />
                </span>
                SCRT
                <span class="pool_past_prizes ps-2">
                  (${{
                    coinConvert(
                      coinConvert(user_deposits, 6, "human", 2) *
                        scrt_token_current_price,
                      0,
                      "human",
                      2
                    )
                  }})</span
                >
              </div>

              <div
                class="
                  col-8
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
                v-else
              >
                <span class="deposit-modal-amount">
                  <span class="col-2" style="font-size: 20px">&#128269;</span>
                  <a
                    @click="scrtStakepoolCreateViewingKey()"
                    class="createViewingKey"
                  >
                    Create or Get Viewing Key
                  </a>
                </span>
              </div>
            </div>

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
                <span class="deposit-modal-deposit-field-tokens">SCRT</span>
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
import { useScrtStakepoolStore } from "../../contracts";
import BigNumber from "bignumber.js";

export default {
  data() {
    return {
      reduceStakesAmount: undefined,
      overflow_warning: false,
      underflow_warning: false,
      on_going_transaction: undefined,
      successful: undefined,
      current_reduce_stakes_amount: undefined,
    };
  },

  computed: {
    ...mapState(useScrtStakepoolStore, [
      "user_deposits",
      "available_tokens_for_withdrawl",
      "scrt_token_current_price",
    ]),
  },

  methods: {
    coinConvert,
    ...mapActions(useScrtStakepoolStore, [
      "scrtStakepoolTriggerWithdraw",
      "scrtStakepoolCreateViewingKey",
      "syncer_function_for_trigger_withdraw_and_redelegate",
    ]),
    async reduce_stakes_check(reduceStakesAmount) {
      let bg_reduceStakesAmount = new BigNumber(reduceStakesAmount);
      bg_reduceStakesAmount = bg_reduceStakesAmount
        .multipliedBy(1000000)
        .decimalPlaces(0);
      let bg_balance = new BigNumber(this.user_deposits);

      if (bg_reduceStakesAmount.isGreaterThan(bg_balance)) {
        this.overflow_warning = true;
      } else if (
        bg_reduceStakesAmount.isLessThanOrEqualTo(0) ||
        bg_reduceStakesAmount.isNaN()
      ) {
        this.underflow_warning = true;
      } else {
        this.on_going_transaction = true;
        this.overflow_warning = false;
        this.underflow_warning = false;
        let temp_array = await this.scrtStakepoolTriggerWithdraw(
          bg_reduceStakesAmount
        );
        // // let temp_array = [true, "worked"];

        this.successful = temp_array[0];

        if (this.successful) {
          this.on_going_transaction = false;
          this.successful = false;
          this.$refs.closeBtn.click();
          this.clearFields();
          this.$emit("sucessfulReduceStakes", {
            available_tokens_for_withdrawl: this.available_tokens_for_withdrawl,
            denom: "SCRT",
            current_reduce_stakes_amount: bg_reduceStakesAmount.toNumber(),
          });
        } else {
          let res = await setTimeout(
            this.syncer_function_for_trigger_withdraw_and_redelegate,
            5000
          );

          this.clearFields();
          this.on_going_transaction = false;
          this.$refs.closeBtn.click();
          this.$emit("failedReduceStake", {
            error_message: temp_array[1],
          });
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
        coinConvert(this.user_deposits, 6, "human", 6) * percentage,
        0,
        "human",
        6
      );
    },
  },
};
</script>
