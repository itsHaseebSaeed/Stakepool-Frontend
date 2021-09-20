<template>
  <div class="container-fluid p-0 m-0 mt-md-3 mt-5">
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
            class="
              row
              ps-3
              account_deposit_amount
              d-flex
              justify-content-lg-start justify-content-center
            "
          >
            $12100.11
          </div>
        </div>
      </div>
      <div class="col-lg-9 pe-3">
        <div class="row p-4 account_deposit_card_part_two h-100">
          <div class="col-lg-2 align-self-center">
            <div class="row p-0">
              <span class="col-6 align-self-center d-flex justify-content-end">
                <img
                  src="src/images/logo.png"
                  alt="LOGO Image"
                  class="img-fluid logo-size"
                />
              </span>

              <span
                class="col-6 align-self-center d-flex justify-content-start"
              >
                <div class="account_token_title">SCRT</div>
              </span>
            </div>
          </div>

          <div class="col-lg-2 mt-lg-0 mt-md-3 align-self-center">
            <div class="row account_token_amount d-flex justify-content-center">
              4.00
            </div>
            <div class="row account_winning_odds d-flex justify-content-center">
              Winning odds
            </div>
            <div
              class="
                row
                account_winning_odds_value
                d-flex
                justify-content-center
              "
            >
              1 in 6.12
            </div>
          </div>

          <div class="col-lg-8 mt-lg-0 mt-md-3">
            <div class="row d-flex">
              <div class="col-lg-6"></div>
              <div class="col-lg-2">
                <span
                  class="
                    d-flex
                    justify-content-lg-end justify-content-center
                    align-self-center
                    account_prize_svg
                  "
                  >$1</span
                >
              </div>
              <div class="col-lg-4 align-self-center">
                <span
                  class="
                    d-flex
                    justify-content-lg-start justify-content-center
                    align-self-center
                    account_time_font
                  "
                  >in 21h, 13m, 07s
                </span>
              </div>
            </div>
            <div class="row d-flex mt-2 justify-content-around">
              <div class="col-lg-4 align-self-center">
                <div class="row p-2 h-100">
                  <button
                    type="button"
                    class="btn account_reduce_stakes_withdraw_button"
                    data-bs-toggle="modal"
                    data-bs-target="#scrtReducedStakeModal"
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
                    data-bs-target="#scrtWithdrawModal"
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
                    data-bs-target="#scrtDepositModal"
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
