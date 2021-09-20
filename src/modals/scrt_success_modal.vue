<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="scrtSuccessModal"
    tabindex="-1"
    aria-labelledby="ScrtModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content deposit-modal-shape">
        <div class="container-fluid success-modal-bg deposit-modal-shape p-3">
          <div class="row">
            <div class="row g-0 d-flex justify-content-end">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span
                  class="
                    d-flex
                    justify-content-center
                    successfully_deposited_amount
                  "
                  >Succesfully deposited!</span
                >
              </div>
            </div>
            <div class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="successfully_deposited_amount pe-2">50</span>
                <span class="successfully_deposited_amount_font-size white"
                  >SCRT</span
                >
              </div>
            </div>

            <div class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="pe-2 success_modal-local-font-size white"
                  >Your share of the pool is
                </span>
                <span
                  class="
                    success_modal-local-font-size
                    successfully_deposited_amount-bg
                  "
                  >16%</span
                >
              </div>
            </div>

            <div class="row g-0 mt-3 mb-5">
              <div class="d-flex justify-content-center">
                <span class="pe-2 success_modal-local-font-size white"
                  >You now have 4.00 in the Stake Pool!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
