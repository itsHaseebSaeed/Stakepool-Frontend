<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="withdrawSuccessModal"
    tabindex="-1"
    aria-labelledby="withdrawSuccessModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content deposit-modal-shape">
        <div class="container-fluid success-modal-bg deposit-modal-shape p-3">
          <div class="row mb-4">
            <div class="row g-0 d-flex justify-content-end">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref="closeBtn"
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
                  >Successfully Withdrawn!</span
                >
              </div>
            </div>
            <div class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="successfully_deposited_amount pe-2"
                  >{{ coinConvert(current_withdraw_amount, 6, "human", 2) }}
                </span>
                <span class="successfully_deposited_amount_font-size white">{{
                  denom
                }}</span>
              </div>
            </div>

            <div class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="pe-2 success_modal-local-font-size white"
                  >Your Current {{ denom }} Balance
                </span>
                <span
                  class="
                    success_modal-local-font-size
                    successfully_deposited_amount-bg
                  "
                  >{{ coinConvert(balance, 6, "human", 2) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coinConvert } from "@stakeordie/griptape.js";

export default {
  data() {
    return {};
  },
  props: ["current_withdraw_amount", "balance", "denom"],
  methods: {
    coinConvert,
  },
};
</script>
