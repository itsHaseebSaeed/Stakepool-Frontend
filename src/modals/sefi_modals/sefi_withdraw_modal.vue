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
                v-if="available_tokens_for_withdrawl"
                class="
                  col-6
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
              >
                <span class="deposit-modal-amount pe-2"
                  >{{
                    coinConvert(available_tokens_for_withdrawl, 6, "human", 2)
                  }}
                </span>
                <span class="d-flex align-items-center">
                  <img
                    src="../../images/sefi_logo.png"
                    alt="LOGO Image"
                    class="img-fluid mini-logo-size"
                  />
                </span>
                SEFI

                <span
                  v-if="available_tokens_for_withdrawl"
                  class="pool_past_prizes ps-2"
                >
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
                <span v-else class="pool_past_prizes ps-2"> ($0)</span>
              </div>

              <div
                class="
                  col-6
                  d-flex
                  justify-content-end
                  align-items-center
                  white
                "
                v-else
              >
                <span class="deposit-modal-amount">
                  <span class="col-2" style="font-size: 20px">&#128269;</span>
                  <span
                    @click="sefiStakepoolCreateViewingKey()"
                    class="createViewingKey"
                  >
                    Create or Get Viewing Key
                  </span>
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
import { useSefiStakepoolStore, useSefiContractStore } from "../../contracts";
import BigNumber from "bignumber.js";
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
    // this.timer = setTimeout(this.sefiStakepoolGetAvailableForWithdrawl, 1000);
  },

  computed: {
    ...mapState(useSefiContractStore, [
      "sefi_token_current_price",
      "sefi_token_balance",
    ]),
    ...mapState(useSefiStakepoolStore, ["available_tokens_for_withdrawl"]),
  },

  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolGetAvailableForWithdrawl",
      "sefiStakepoolWithdraw",
      "sefiStakepoolCreateViewingKey",
      "syncer_function_for_withdraw",
    ]),
    ...mapActions(useSefiContractStore, [
      "createOrGetViewingKey",
      "getSefiContractBalance",
    ]),
    async withdraw_check(withdraw_amount) {
      let bg_withdraw_amount = new BigNumber(withdraw_amount);
      bg_withdraw_amount = bg_withdraw_amount
        .multipliedBy(1000000)
        .decimalPlaces(0);
      let bg_available_tokens_for_withdrawl = new BigNumber(
        this.available_tokens_for_withdrawl
      );

      if (bg_withdraw_amount.isGreaterThan(bg_available_tokens_for_withdrawl)) {
        // console.log(bg_withdraw_amount);
        // console.log(bg_available_tokens_for_withdrawl);
        this.overflow_warning = true;
      } else if (
        bg_withdraw_amount.isLessThan(0) ||
        bg_withdraw_amount.isNaN()
      ) {
        this.underflow_warning = true;
      } else {
        this.on_going_transaction = true;
        this.overflow_warning = false;
        this.underflow_warning = false;

        let temp_array = await this.sefiStakepoolWithdraw(
          bg_withdraw_amount.toNumber()
        );
        await this.getSefiContractBalance();

        this.successful = temp_array[0];

        if (this.successful) {
          this.on_going_transaction = false;
          this.successful = false;
          this.$refs.closeBtn.click();
          this.clearFields();
          this.$emit("sucessfulWithdraw", {
            current_withdraw_amount: bg_withdraw_amount.toNumber(),
            denom: "SEFI",
            balance: this.sefi_token_balance,
          });
        } else {
          let timer = setTimeout(this.syncer_function_for_withdraw, 4000);
          let timer2 = setTimeout(this.getSefiContractBalance, 4000);

          console.log(this.available_tokens_for_withdrawl);

          this.clearFields();
          this.on_going_transaction = false;
          this.$refs.closeBtn.click();
          this.$emit("failedWithdraw", {
            error_message: temp_array[1],
          });
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
