var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,o=(t,n,s)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,l=(e,t)=>{for(var n in t||(t={}))i.call(t,n)&&o(e,n,t[n]);if(s)for(var n of s(t))a.call(t,n)&&o(e,n,t[n]);return e};import{i as c,l as d,m as r,o as p,c as m,e as f,t as u,n as g,p as _,v as h,j as b}from"./vendor.8dcb4a7d.js";import{a as w,b as v}from"./index.72671413.js";import{B as y}from"./bignumber.f9784317.js";import{_ as k}from"./sefi_logo.0b1ac7f5.js";const j={data:()=>({depositamount:void 0,overflow_warning:void 0,underflow_warning:void 0,on_going_transaction:void 0,successful:void 0,sefi_total_deposits:void 0,staked_total:void 0}),computed:l(l({},c(w,["sefi_token_balance","sefi_token_balance_in_usd"])),c(v,[])),methods:(x=l(l({coinConvert:d},r(v,["sefiStakepoolDeposit","syncer_function_for_deposit"])),r(w,["createOrGetViewingKey","getSefiContractBalance"])),C={async deposit_check(e){let t=new y(e);t=t.multipliedBy(1e6).decimalPlaces(0);let n=new y(this.sefi_token_balance);if(t.isGreaterThan(n))console.log(d(this.sefi_token_balance,6,"human",6)),console.log(e),this.overflow_warning=!0;else if(t.isLessThan(1e6)||t.isNaN())this.underflow_warning=!0;else{this.on_going_transaction=!0,this.overflow_warning=!1,this.underflow_warning=!1;let n=await this.sefiStakepoolDeposit(t.toNumber());this.successful=n[0],e=n[1],this.sefi_total_deposits=n[2],this.staked_total=n[3],console.log("THE TOTAL DEPOSITS",this.sefi_total_deposits),await this.getSefiContractBalance(),this.successful?(this.on_going_transaction=!1,this.successful=!1,this.$refs.closeBtn.click(),this.clearFields(),this.$emit("sucessfulDeposit",{current_deposits:t.toNumber(),denom:"SEFI",pool_share:this.staked_total/this.sefi_total_deposits*100,total_deposits:this.staked_total})):(await setTimeout(this.getSefiContractBalance,4e3),await setTimeout(this.syncer_function_for_deposit,4e3),this.clearFields(),this.on_going_transaction=!1,this.$refs.closeBtn.click(),this.$emit("failedDeposit",{error_message:n[4]}))}},async clearFields(){this.depositamount="",this.overflow_warning=!1,this.underflow_warning=!1},async removeWarning(){this.overflow_warning=!1,this.underflow_warning=!1},async Percentage(e){this.depositamount=d(d(this.sefi_token_balance,6,"human",6)*e,0,"human",6)}},t(x,n(C)))};var x,C;const O={class:"modal fade","data-bs-backdrop":"static",id:"sefiDepositModal",tabindex:"-1","aria-labelledby":"SefiModalLabel","aria-hidden":"true"},S={class:"modal-dialog modal-dialog-centered"},P={class:"modal-content deposit-modal-shape"},D={class:"container-fluid deposit-modal-bg deposit-modal-shape p-4"},B={class:"row m-0 p-0 deposit-modal-shape"},F={class:"row m-0 p-0 g-0"},T=f("div",{class:"col-6 d-flex justify-content-start align-items-center"},[f("span",{class:"deposit-modal-heading"},"Deposit")],-1),E={class:"\n                  col-6\n                  d-flex\n                  justify-content-end\n                  align-items-center\n                  white\n                "},I={class:"row m-0 p-0 mt-3 g-0"},G=f("div",{class:"col-4 d-flex justify-content-start align-items-center"},[f("span",{class:"deposit-modal-available"},"Available")],-1),L={key:0,class:"\n                  col-8\n                  d-flex\n                  justify-content-end\n                  align-items-center\n                  white\n                "},V={class:"pe-2"},$=f("span",{class:"d-flex align-items-center"},[f("img",{src:k,alt:"LOGO Image",class:"img-fluid mini-logo-size"})],-1),z=b(" SEFI "),A={class:"ps-1 pool_past_prizes"},K={key:1,class:"\n                  col-8\n                  d-flex\n                  justify-content-end\n                  align-items-center\n                  white\n                "},N={class:"deposit-modal-amount"},M=f("span",{class:"col-2",style:{"font-size":"20px"}},"🔍",-1),W={key:0,class:"row m-0 p-0 mt-3"},H=[f("span",{class:"text-danger"},"*You are trying to deposit more than Available ",-1)],U={key:1,class:"row m-0 p-0 mt-3"},Y=[f("span",{class:"text-danger"},"*Minimum deposit 1 SEFI ",-1)],q={class:"\n                row\n                m-0\n                p-0\n                mt-3\n                deposit-modal-deposit-field deposit-modal-deposit-field-shape\n              "},J={class:"col-9 d-flex justify-content-start align-items-center"},Q=f("div",{class:"\n                  col-3\n                  d-flex\n                  justify-content-end\n                  align-items-center\n                  white\n                "},[f("span",{class:"deposit-modal-deposit-field-tokens"},"SEFI")],-1),R={class:"row g-0 d-flex justify-content-between mt-2"},X={key:2,class:"row m-0 p-0 mt-3 deposit-modal-deposit-button"},Z={key:3,class:"\n                row\n                m-0\n                p-0\n                mt-3\n                deposit-modal-deposit-button\n                d-flex\n                justify-content-center\n                align-items-center\n              "},ee=[f("div",{class:"spinner-border text-light",role:"status"},[f("span",{class:"visually-hidden"},"Loading...")],-1)];j.render=function(e,t,n,s,i,a){return p(),m("div",O,[f("div",S,[f("div",P,[f("div",D,[f("div",B,[f("div",F,[T,f("div",E,[f("button",{type:"button",class:"btn-close white","data-bs-dismiss":"modal","aria-label":"Close",ref:"closeBtn",onClick:t[0]||(t[0]=e=>a.clearFields())},null,512)])]),f("div",I,[G,e.sefi_token_balance?(p(),m("div",L,[f("span",V,u(a.coinConvert(e.sefi_token_balance,6,"human",1)),1),$,z,f("span",A," ($"+u(a.coinConvert(e.sefi_token_balance_in_usd,6,"human",1))+")",1)])):(p(),m("div",K,[f("span",N,[M,f("span",{onClick:t[1]||(t[1]=t=>e.createOrGetViewingKey()),class:"createViewingKey"}," Create or Get Viewing Key ")])]))]),i.overflow_warning?(p(),m("div",W,H)):g("",!0),i.underflow_warning?(p(),m("div",U,Y)):g("",!0),f("div",q,[f("div",J,[f("span",null,[_(f("input",{class:"deposit-modal-deposit-field -none",type:"number",placeholder:"0.00","placeholder-default":"white",lazy:"",id:"input_field","onUpdate:modelValue":t[2]||(t[2]=e=>i.depositamount=e),min:"0",onClick:t[3]||(t[3]=e=>a.removeWarning())},null,512),[[h,i.depositamount]])])]),Q]),f("div",R,[f("button",{class:"\n                  col-2\n                  d-flex\n                  justify-content-center\n                  deposit-modal-amount-percentage\n                ",onClick:t[4]||(t[4]=e=>a.Percentage(.25))}," 25% "),f("button",{class:"\n                  col-2\n                  d-flex\n                  justify-content-center\n                  align-items-center\n                  deposit-modal-amount-percentage\n                ",onClick:t[5]||(t[5]=e=>a.Percentage(.5))}," 50% "),f("button",{class:"\n                  col-2\n                  d-flex\n                  justify-content-center\n                  align-items-center\n                  deposit-modal-amount-percentage\n                ",onClick:t[6]||(t[6]=e=>a.Percentage(.75))}," 75% "),f("button",{class:"\n                  col-2\n                  d-flex\n                  justify-content-center\n                  align-items-center\n                  deposit-modal-amount-percentage\n                ",onClick:t[7]||(t[7]=e=>a.Percentage(1))}," 100% ")]),i.on_going_transaction?(p(),m("div",Z,ee)):(p(),m("div",X,[f("button",{onClick:t[8]||(t[8]=e=>a.deposit_check(i.depositamount)),id:"depositAmount",class:"btn text-white",type:"submit",value:"Submit",min:"0",max:"sefi_token_balance"}," Deposit ")]))])])])])])};export{j as default};
