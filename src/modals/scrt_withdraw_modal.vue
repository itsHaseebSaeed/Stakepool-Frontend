<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="scrtWithdrawModal"
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
              >
                <span class="deposit-modal-amount"
                  >20000 SCRT
                  <span class="deposit-modal-dollars"> ($10000)</span>
                </span>
              </div>
            </div>

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
                  >200 SCRT
                  <span class="deposit-modal-dollars"> ($100)</span>
                </span>
              </div>
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
                    range="120"
                    min-value="0"
                    max-value="120"
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

            <div class="row m-0 p-0 mt-3 deposit-modal-deposit-button">
              <button class="btn text-white">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
