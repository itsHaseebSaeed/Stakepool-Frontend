<template>
<div class="footing  ">
  <div class="container h-100 ">
    <div class="row h-50 align-items-end">

      <div class="col-6 " >
        <router-link to=/pools class="router-links">
        <h3 class=" title p-0 ">
          StakePool
          </h3>
          </router-link>
      </div>

      <div class="col-6 float-end">
        <router-link class="router-links float-end  px-3" exact-active-class="router-link-active" to=/accounts >Accounts</router-link>
        <router-link class="router-links float-end px-3" active-class="router-link-active" to=/pools >Pools</router-link>
      </div>

    </div>
  </div>
</div>



</template>

