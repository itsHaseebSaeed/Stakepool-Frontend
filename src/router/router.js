import { createRouter, createWebHistory } from "vue-router";
// import Pools from "../views/Pools.vue";
// import Accounts from "../views/Accounts.vue";
// import ScrtPool from "../views/scrt_pool_sidekick.vue";
// import SefiPool from "../views/sefi_pool_sidekick.vue";
// import DepositModal from "../modals/deposit_modal.vue";

const base = "/Stakepool-Frontend";
const routes = [
  {
    path: base + "/",
    name: "Pools",
    component: () => import("../views/Pools.vue"),
  },
  {
    path: base + "/accounts",
    name: "Accounts",
    component: () => import("../views/Accounts.vue"),
  },
  {
    path: base + "/scrtpool",
    name: "SCRTPOOL",
    component: () => import("../views/scrt_pool_sidekick.vue"),
  },
  {
    path: base + "/sefipool",
    name: "Sefi pool",
    component: () => import("../views/sefi_pool_sidekick.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
