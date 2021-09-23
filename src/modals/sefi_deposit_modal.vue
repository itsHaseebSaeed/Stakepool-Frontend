<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="sefiDepositModal"
    tabindex="-1"
    aria-labelledby="SefiModalLabel"
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
                <span class="deposit-modal-heading">Deposit</span>
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
                v-if="sefi_token_balance"
              >
                <span class="pe-2">
                  {{ coinConvert(sefi_token_balance, 6, "human", 1) }}
                </span>
                <span class="d-flex align-items-center">
                  <img
                    src="../images/sefi_logo.png"
                    alt="LOGO Image"
                    class="img-fluid mini-logo-size"
                  />
                </span>
                SEFI
                <span class="ps-1 pool_past_prizes">
                  (${{
                    coinConvert(sefi_token_balance_in_usd, 6, "human", 1)
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
                  <span
                    @click="createOrGetViewingKey()"
                    class="createViewingKey"
                  >
                    Create or Get Viewing Key
                  </span>
                </span>
              </div>
            </div>

            <div class="row m-0 p-0 mt-3" v-if="overflow_warning">
              <span class="text-danger"
                >*You are trying to deposit more than Available
              </span>
            </div>

            <div class="row m-0 p-0 mt-3" v-if="underflow_warning">
              <span class="text-danger">*Minimum deposit 1 SEFI </span>
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
                    lazy
                    id="input_field"
                    v-model="depositamount"
                    min="0"
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
                @click="deposit_check(depositamount)"
                id="depositAmount"
                class="btn text-white"
                type="submit"
                value="Submit"
                min="0"
                max="sefi_token_balance"
              >
                Deposit
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
import { coinConvert } from "@stakeordie/griptape.js";
import {
  useSefiStakepoolStore,
  useSefiContractStore,
} from "../../src/contracts";
import BigNumber from "bignumber.js";
export default {
  data() {
    return {
      depositamount: undefined,
      overflow_warning: undefined,
      underflow_warning: undefined,

      on_going_transaction: undefined,
      successful: undefined,
      total_deposits: undefined,
      staked_total: undefined,
    };
  },

  computed: {
    ...mapState(useSefiContractStore, [
      "sefi_token_balance",
      "sefi_token_balance_in_usd",
    ]),
    ...mapState(useSefiStakepoolStore, []),
  },

  methods: {
    coinConvert,
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolDeposit",
      "syncer_function_for_deposit",
    ]),
    ...mapActions(useSefiContractStore, [
      "createOrGetViewingKey",
      "getSefiContractBalance",
    ]),
    async deposit_check(depositamount) {
      let bg_depositamount = new BigNumber(depositamount);
      bg_depositamount = bg_depositamount
        .multipliedBy(1000000)
        .decimalPlaces(0);
      // console.log(bg_depositamount);

      let bg_sefi_total_balance = new BigNumber(this.sefi_token_balance);
      // console.log(bg_sefi_total_balance);

      if (bg_depositamount.isGreaterThan(bg_sefi_total_balance)) {
        console.log(coinConvert(this.sefi_token_balance, 6, "human", 6));
        console.log(depositamount);

        this.overflow_warning = true;
      } else if (bg_depositamount.isLessThan(1) || bg_depositamount.isNaN()) {
        this.underflow_warning = true;
      } else {
        this.on_going_transaction = true;
        this.overflow_warning = false;
        this.underflow_warning = false;
        let temp_array = await this.sefiStakepoolDeposit(
          bg_depositamount.toNumber()
        );

        this.successful = temp_array[0];
        depositamount = temp_array[1];
        this.total_deposits = temp_array[2];
        this.staked_total = temp_array[3];
        console.log("THE TOTAL DEPOSITS", this.total_deposits);
        await this.getSefiContractBalance();

        if (this.successful) {
          this.on_going_transaction = false;
          this.successful = false;
          this.$refs.closeBtn.click();
          this.clearFields();
          this.$emit("sucessfulDeposit", {
            current_deposits: bg_depositamount.toNumber(),
            denom: "SEFI",
            pool_share: (this.staked_total / this.total_deposits) * 100,
            total_deposits: this.staked_total,
          });
        } else {
          let res = setTimeout(this.getSefiContractBalance, 4000);
          let res2 = setTimeout(this.syncer_function_for_deposit, 4000);
          this.clearFields();
          this.on_going_transaction = false;
          this.$refs.closeBtn.click();
          //call fail modal and psas this error
          this.$emit("failedDeposit", {
            error_message: temp_array[4],
          });
        }
      }
    },
    async clearFields() {
      this.depositamount = "";
      this.overflow_warning = false;
      this.underflow_warning = false;
    },
    async removeWarning() {
      this.overflow_warning = false;
      this.underflow_warning = false;
    },

    async Percentage(percentage) {
      // console.log(coinConvert(this.sefi_token_balance, 6, "human", 6));
      // console.log(
      //   coinConvert(this.sefi_token_balance, 6, "human", 6) * percentage
      // );

      this.depositamount = coinConvert(
        coinConvert(this.sefi_token_balance, 6, "human", 6) * percentage,
        0,
        "human",
        6
      );

      // console.log(this.depositamount);
    },
  },
};
</script>
