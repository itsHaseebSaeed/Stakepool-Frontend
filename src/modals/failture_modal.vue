<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="FailtureModal"
    tabindex="-1"
    aria-labelledby="ScrtModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content deposit-modal-shape">
        <div class="h-100 success-modal-bg deposit-modal-shape p-4">
          <div class="row m-0 p-0 deposit-modal-shape">
            <div class="row m-0 p-0 g-0"></div>
            <div
              class="
                row
                m-0
                p-0
                g-0
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

            <div
              class="
                row
                m-0
                p-0
                g-0
                d-flex
                justify-content-around
                align-items-center
              "
            >
              <span
                class="
                  col-9
                  fs-1
                  d-flex
                  justify-content-end
                  text-white
                  failture-modal-heading
                "
                >Transaction Failed</span
              >
              <span class="col-2" style="font-size: 40px">&#10060;</span>
            </div>

            <div class="row">
              <div class="col-8"></div>
              <div class="col-4 d-flex justify-content-end">
                <button
                  v-if="!see_more_activated"
                  @click="ToggleSeeMore()"
                  class="btn deposit_button white"
                >
                  See More
                </button>
                <button
                  v-else
                  @click="ToggleSeeMore()"
                  class="btn deposit_button white"
                >
                  See Less
                </button>
              </div>
            </div>

            <div class="row white">
              <div class="col-12">
                <div v-if="see_more_activated">{{ error_message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      see_more_activated: false,
    };
  },
  props: ["error_message"],

  methods: {
    async ToggleSeeMore() {
      this.see_more_activated = !this.see_more_activated;
    },
  },
};
</script>
