<template>
  <div class="container-fluid p-0 m-0 mt-xl-3 mt-lg-4 mt-5">
    <div class="row">
      <div class="col-lg-3 pe-lg-4 mb-lg-0 mb-2">
        <div class="row p-4 account_deposit_card h-100">
          <div
            class="
              row
              ps-3
              account_deposit_title
              d-flex
              justify-content-lg-start justify-content-center
            "
          >
            Deposits
          </div>
          <div
            v-if="balance"
            class="
              row
              ps-3
              account_deposit_amount
              d-flex
              justify-content-lg-start justify-content-center
            "
          >
            <div v-if="balance >= 9999">
              ${{
                coinConvert(
                  coinConvert(balance, 6, "human", 2) *
                    sefi_token_current_price,
                  0,
                  "human",
                  2
                )
              }}
            </div>

            <div v-else>$0</div>
          </div>

          <div
            class="row d-flex justify-content-center align-items-center white"
            v-else
          >
            <span
              class="
                deposit-modal-amount
                d-flex
                justify-content-start
                deposit-modal-amount
              "
            >
              <span class="col-2" style="font-size: 20px">&#128269;</span>
              <a
                @click="sefiStakepoolCreateViewingKey()"
                class="createViewingKey deposit-modal-dollars"
              >
                Create or Get Viewing Key
              </a>
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-9 pe-3">
        <div class="row p-4 account_deposit_card_part_two h-100">
          <div class="col-lg-2 align-self-center">
            <div class="row p-0">
              <span class="col-6 align-self-center d-flex justify-content-end">
                <img
                  src="../images/sefi_logo.png"
                  alt="LOGO Image"
                  class="img-fluid logo-size"
                />
              </span>

              <span
                class="col-6 align-self-center d-flex justify-content-start"
              >
                <div class="account_token_title">SEFI</div>
              </span>
            </div>
          </div>

          <div class="col-lg-3 mt-lg-0 mt-md-3 align-self-center">
            <div
              v-if="balance"
              class="row account_token_amount d-flex justify-content-center"
            >
              {{ coinConvert(balance, 6, "human", 2) }}
            </div>
            <div
              v-else
              class="row account_token_amount d-flex justify-content-center"
            >
              0
            </div>
            <div class="row account_winning_odds d-flex justify-content-center">
              Winning odds
            </div>
            <div
              v-if="balance != 0"
              class="
                row
                account_winning_odds_value
                d-flex
                justify-content-center
              "
            >
              {{
                coinConvert((balance / total_deposits) * 100, 0, "human", 2)
              }}%
            </div>
            <div
              v-else
              class="
                row
                account_winning_odds_value
                d-flex
                justify-content-center
              "
            >
              0
            </div>
          </div>

          <div class="col-lg-7 mt-lg-0 mt-md-3">
            <div class="row align-self-center">
              <span
                class="
                  col-lg-12
                  align-items-center
                  d-flex
                  justify-content-lg-end justify-content-center
                  account_prize_svg
                "
              >
                <img
                  src="../images/gift.png"
                  alt="LOGO Image"
                  class="img-fluid logo-size"
                />
                <div class="account_time_font">
                  in {{ days1 }}{{ days2 }}d ,{{ hours2 }}{{ hours1 }}h ,{{
                    mins1
                  }}{{ mins2 }}m
                </div>
              </span>
            </div>
            <div class="row d-flex mt-2 justify-content-around">
              <div class="col-lg-4 align-self-center">
                <div class="row p-2 h-100">
                  <button
                    type="button"
                    class="btn account_reduce_stakes_withdraw_button"
                    data-bs-toggle="modal"
                    data-bs-target="#sefiReduceStakeModal"
                  >
                    Reduce Stakes
                  </button>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="row p-2 h-100">
                  <button
                    type="button"
                    class="btn account_reduce_stakes_withdraw_button"
                    data-bs-toggle="modal"
                    data-bs-target="#sefiWithdrawModal"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="row p-2 h-100">
                  <button
                    type="button"
                    class="btn account_deposit_button"
                    data-bs-toggle="modal"
                    data-bs-target="#sefiDepositModal"
                  >
                    Deposit
                  </button>
                </div>
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
import { useSefiStakepoolStore, useSefiContractStore } from "../contracts";
import gift from "../images/gift.png";
export default {
  data() {
    return {
      img_src: gift,
    };
  },
  mounted() {
    this.timer = setTimeout(this.sefiStakepoolGetBalance, 1000);
  },
  computed: {
    ...mapState(useSefiStakepoolStore, [
      "balance",
      "total_deposits",
      "days1",
      "hours1",
      "mins1",
      "secs1",
      "days2",
      "hours2",
      "mins2",
      "secs2",
    ]),
    ...mapState(useSefiContractStore, ["sefi_token_current_price"]),
  },
  methods: {
    ...mapActions(useSefiStakepoolStore, [
      "sefiStakepoolCreateViewingKey",
      "sefiStakepoolGetBalance",
    ]),
    coinConvert,
  },
};
</script>
