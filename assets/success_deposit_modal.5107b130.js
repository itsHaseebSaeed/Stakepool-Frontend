const s={};import{l as e,o,c as t,e as a,t as n}from"./vendor.8a209fa5.js";const l={data:()=>({}),computed:{},props:["current_deposits","pool_share","total_deposits","denom"],methods:{coinConvert:e,LowerCase:async s=>(console.log(typeof s),s.toLowerCase()),ImageUrl(){if(!this.denom)return new URL("/Stakepool-Frontend/assets/scrt_logo.c3ddd06d.png",window.location);const e=this.denom.toLowerCase();return new URL("../../images/"+e+"_logo.png",s.url)}}},c={class:"modal fade","data-bs-backdrop":"static",id:"sefiSuccessModal",tabindex:"-1","aria-labelledby":"ScrtModalLabel","aria-hidden":"true"},d={class:"modal-dialog modal-dialog-centered"},i={class:"modal-content deposit-modal-shape"},r={class:"container-fluid success-modal-bg deposit-modal-shape p-3"},u={class:"row"},m={class:"row g-0 d-flex justify-content-end"},p={type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",ref:"closeBtn"},f=a("div",{class:"row g-0 mt-3"},[a("div",{class:"d-flex justify-content-center"},[a("span",{class:"\n                    d-flex\n                    justify-content-center\n                    successfully_deposited_amount\n                  "},"Successfully deposited!")])],-1),g={class:"row g-0 mt-3"},v={class:"d-flex justify-content-center"},_={class:"successfully_deposited_amount pe-3"},h={class:"d-flex justify-content-center align-items-center"},w=["src"],y={class:"successfully_deposited_amount_font-size white"},b={class:"row g-0 mt-3"},x={class:"d-flex justify-content-center"},j=a("span",{class:"pe-2 success_modal-local-font-size white"},"Your share of the pool is ",-1),C={class:"\n                    success_modal-local-font-size\n                    successfully_deposited_amount-bg\n                  "},L={class:"row g-0 mt-3"},z={class:"d-flex justify-content-center"},S={class:"pe-2 success_modal-local-font-size white"};l.render=function(s,e,l,U,k,M){return o(),t("div",c,[a("div",d,[a("div",i,[a("div",r,[a("div",u,[a("div",m,[a("button",p,null,512)]),f,a("div",g,[a("div",v,[a("span",_,n(M.coinConvert(l.current_deposits,6,"human",2)),1),a("span",h,[a("img",{src:M.ImageUrl(),alt:"denom",class:"img-fluid logo-size-successModal"},null,8,w)]),a("span",y,n(l.denom),1)])]),a("div",b,[a("div",x,[j,a("span",C,n(M.coinConvert(l.pool_share,0,"human",2))+"%",1)])]),a("div",L,[a("div",z,[a("span",S,"You now have "+n(M.coinConvert(l.total_deposits,6,"human",2))+" "+n(l.denom)+" in the Stake Pool! ",1)])])])])])])])};export{l as default};
