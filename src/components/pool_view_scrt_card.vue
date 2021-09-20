<template>
  <div class="container-fluid p-0 m-0">
    <div class="row mt-3 p-3 pool_view_card align-items-center">
      <div
        class="col-lg-3 d-flex justify-content-lg-start justify-content-center"
      >
        <span class="d-inline ms-2 d-flex align-items-center">
          <img src="../images/logo.png" alt="Logo" height="20px" />
        </span>
        <span class="pool_stats_scrt_to_dollar ms-2 text-white">SCRT</span>
      </div>

      <div class="col-lg-4 text-white m-auto mb-4">
        <div class="d-block clearfix d-flex justify-content-center">
          <div class="prize_amount">$46,000</div>
        </div>
        <div class="d-block clearfix d-flex justify-content-center">
          <span class="">Prize</span>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-3"></div>
          <div class="col-md-9">
            <div class="row d-flex justify-content-between" id="datetimestamps">
              <div class="col-2">
                <div class="row">
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >1</span
                  >
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >2</span
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
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >1</span
                  >
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >4</span
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
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >1</span
                  >
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >2</span
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
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >1</span
                  >
                  <span class="col-5 date_digit d-flex justify-content-center"
                    >2</span
                  >
                </div>
                <div class="row">
                  <span class="p-0 date_title d-flex justify-content-center"
                    >SEC</span
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <router-link to="" class="g-0">
                <button
                  type="button"
                  class="btn deposit_button"
                  data-bs-toggle="modal"
                  data-bs-target="#FailtureModal"
                >
                  Deposit
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
