<template>
<div  id="heading">
  <div class="container-fluid h-100 " >
    <div class="row h-100 align-items-center">
      <div class="col-md-4 " >
        <router-link class="title" to=/pools>
        <h3 class=" m-auto d-flex justify-content-center title ">
          StakePool
          </h3>
  
          </router-link>
      </div>

      <div class="col-md-4 d-flex justify-content-center  ">
        <router-link class="router-links p-md-2 px-2" active-class="router-link-active" to=/pools >Pools</router-link>
        <router-link class="router-links p-md-2 px-2" exact-active-class="router-link-active" to=/accounts >Accounts</router-link>
      </div>

      <div class="col-md-4 d-flex justify-content-center">
        <wallet-info class="float-end wallet p-md-2   d-none d-md-block "></wallet-info>




      </div>
    </div>
  </div>
</div>
</template>

<script>
import {useSefiContractStore } from "../../src/contracts";
import { useViewingKeyStore as vk } from '@stakeordie/griptape-vue.js'
import { mapState } from 'pinia'
export default {
  computed: {
    ...mapState(vk, [
      'viewingKeys'
    ])
  }
}
</script>
