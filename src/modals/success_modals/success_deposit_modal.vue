<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="sefiSuccessModal"
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
                  >Successfully deposited!</span
                >
              </div>
            </div>
            <div class="row g-0 mt-3 mb-4">
              <div class="d-flex justify-content-center">
                <span class="successfully_deposited_amount pe-3">{{
                  coinConvert(current_deposits, 6, "human", 2)
                }}</span>
                <span class="d-flex justify-content-center align-items-center">
                  <img
                    :src="ImageUrl()"
                    alt="denom"
                    class="img-fluid logo-size-successModal"
                  />
                </span>
                <span class="successfully_deposited_amount_font-size white">{{
                  denom
                }}</span>
              </div>
            </div>

            <div v-if="pool_share" class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="pe-2 success_modal-local-font-size white"
                  >Your share of the pool is
                </span>
                <span
                  class="
                    success_modal-local-font-size
                    successfully_deposited_amount-bg
                  "
                  >{{ coinConvert(pool_share, 0, "human", 2) }}%</span
                >
              </div>
            </div>

            <div v-if="total_deposits" class="row g-0 mt-3">
              <div class="d-flex justify-content-center">
                <span class="pe-2 success_modal-local-font-size white">
                  <span>You now have </span>
                  <span class="successfully_deposited_amount-bg">{{
                    coinConvert(total_deposits, 6, "human", 2)
                  }}</span>
                  <span>&#160;</span>
                  <span>{{ denom }} in the Stake Pool!</span>
                </span>
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
  computed: {},
  props: ["current_deposits", "pool_share", "total_deposits", "denom"],
  methods: {
    coinConvert,
    async LowerCase(denom) {
      console.log(typeof denom);
      return denom.toLowerCase();
    },
    ImageUrl() {
      if (!this.denom) {
        return new URL("../../images/scrt_logo.png", import.meta.url); // the module request
      }

      const fileName = this.denom.toLowerCase();
      return new URL("../../images/" + fileName + "_logo.png", import.meta.url); // the module request
    },
  },
};
</script>
