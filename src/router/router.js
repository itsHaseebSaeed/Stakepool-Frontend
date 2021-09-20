import { createRouter, createWebHistory } from "vue-router";
import Pools from "../views/Pools.vue";
import Accounts from "../views/Accounts.vue";
import ScrtPool from "../views/scrt_pool_sidekick.vue";
import SefiPool from "../views/sefi_pool_sidekick.vue";
// import DepositModal from "../modals/deposit_modal.vue";
const routes = [
  {
    path: "/pools",
    name: "Pools",
    component: Pools,
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
  },
  {
    path: "/scrtpool",
    name: "SCRTPOOL",
    component: ScrtPool,
  },
  {
    path: "/sefipool",
    name: "Sefi pool",
    component: SefiPool,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
