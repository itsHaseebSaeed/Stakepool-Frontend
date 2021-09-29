<template>
<div  id="heading">
  <div class="container h-100 " >
    <div class="row h-100 align-items-center">
      <div class="col-md-4 g-0" >
        <router-link class="title " to=/Stakepool-Frontend/>
        <h3 class=" m-auto d-flex justify-content-start title ">
          StakePool
          </h3>
  
          </router-link>
      </div>

      <div class="col-md-4 d-flex justify-content-center  ">
        <router-link class="router-links mx-3 " active-class="router-link-active" to=/Stakepool-Frontend/ >Rewards Pool</router-link>
        <router-link class="router-links mx-3" exact-active-class="router-link-active" to=/Stakepool-Frontend/accounts >My Page</router-link>
      </div>

      <div class="col-md-4 d-flex justify-content-end">
        <wallet-info class="float-end wallet p-md-2   d-none d-md-block "></wallet-info>




      </div>
    </div>
  </div>
</div>
</template>

<script>
import {useSefiContractStore } from "../../contracts";
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
