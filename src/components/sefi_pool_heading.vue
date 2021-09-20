<template>
  <div class="container-fluid">

    <div class="row p-0 mt-3" id="breadcrumbs">
      <nav aria-label="breadcrumb" class="p-0">
        <ol class="breadcrumb">
          <router-link class="breadcrumb-item txt-decoration " to=/pools>POOL</router-link>
          <span class="breadcrumb-item" >SEFI</span>
        </ol>
      </nav>
    </div>

    <div class="row p-0" id="logo-heading-depositbtn ">

      <div class="col-md-1 col-2 align-self-center">
        <img
          src="src/images/sefi_logo.png"
          alt="LOGO Image"
          class="img-fluid logo-size"
        />
      </div>

      <div class="col-5 text-white font-weight-bold">
        <div class="fs-1">SEFI POOL</div>
      </div>

      <div class="col-md-3 col-1"></div>

      <div class="col-md-3 col-4 align-self-center">
            <div class="row">
              <router-link to="" class="g-0">
                <button
                  type="button"
                  class="btn deposit_button"
                  data-bs-toggle="modal"
                  data-bs-target="#sefiDepositModal">
                  Deposit
                </button>
              </router-link>
            </div>
      </div>


    </div>
  </div>
</template>
