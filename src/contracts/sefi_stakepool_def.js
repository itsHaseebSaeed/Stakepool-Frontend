import axios from "axios";
import { SefiTokenContractAddress } from "../contracts/index";
import { useViewingKeyStore as useVKs } from "@stakeordie/griptape-vue.js";
import { useWalletStore as useWallet } from "@stakeordie/griptape-vue.js";
const fees = {
  gas: "910000",
};
export const SefiStakepoolDefinition = {
  state: {
    start_time: undefined,
    end_time: undefined,
    current_time: undefined,
    balance: 0,
    available_tokens_for_withdrawl: 0,
    sefi_total_rewards: 0,
    sefi_total_deposits: 0,
    vk: undefined,
    wallet_address: undefined,
    past_rewards: undefined,
    user_past_records: undefined,
    time_left: 0,
    days1: 0,
    days2: 0,
    hours1: 0,
    hours2: 0,
    mins1: 0,
    mins2: 0,
    secs1: 0,
    secs2: 0,
  },
  queries: {
    async sefiStakepoolPoolViewEntryPoint() {
      await this.sefiStakepoolGetLotteryInfo();
      await this.sefiStakepoolGetTotalSefiRewards();
    },

    async sefiStakepoolAccountViewEntryPoint() {
      this.get_viewing_key_helper();
      this.syncer_function_for_vk();
    },

    //Sets Time and set Timer
    async sefiStakepoolGetLotteryInfo() {
      const msg = { lottery_info: {} };
      let res;
      try {
        res = await this.scrtClient.queryContract(this.contractAddress, msg);
      } catch (e) {
        console.log(e);
      }
      this.start_time = res.lottery_info.start_height;
      this.end_time = res.lottery_info.end_height;

      await this.sefiStakepoolGetLotteryInfoHelper();
    },

    async sefiStakepoolGetTotalSefiDeposits() {
      const msg = { total_deposits: {} };
      let res;
      try {
        res = await this.scrtClient.queryContract(this.contractAddress, msg);
      } catch (err) {
        console.log(err);
      }
      this.sefi_total_deposits = res.total_deposits.deposits;
      // console.log(this.sefi_total_deposits);
    },

    async sefiStakepoolGetPublicPastRewards() {
      const msg = { past_all_results: {} };
      let res;
      try {
        res = await this.scrtClient.queryContract(this.contractAddress, msg);
      } catch (err) {
        console.log(err);
      }
      let temp_array = [];

      temp_array = res.past_results.past_rewards;
      // console.log(temp_array);
      this.past_rewards = temp_array;

      for (var i = 0; i < temp_array.length; i++) {
        // console.log("working");

        this.past_rewards[i][0] = temp_array[i][0];
        var date = new Date(temp_array[i][1] * 1000);
        var options = {
          month: "long", //to display the full name of the month
          day: "numeric",
        };
        var sDate = date.toLocaleDateString("en-US", options);
        temp_array[i][1] = sDate;
        // this.past_rewards = sDate;
      }

      this.past_rewards = temp_array;

      // console.log(this.past_rewards);
    },

    async sefiStakepoolGetTotalSefiRewards() {
      await this.sefiStakepoolGetTotalSefiDeposits();
      // console.log("Total Sefi staked", typeof this.sefi_total_deposits);
      if (this.sefi_total_deposits > 0) {
        this.sefi_total_rewards = ((this.sefi_total_deposits * 0.48) / 365) * 7;
        this.sefi_total_rewards = this.sefi_total_rewards.toString();
        // console.log("TOTAL rewards", typeof this.sefi_total_rewards);
      }
    },

    async sefiStakepoolGetBalance() {
      const wallet = useWallet();
      const address = wallet.address;
      this.wallet_address = address;

      if (!this.vk) {
        await this.get_viewing_key_helper();
      }

      const msg = {
        balance: {
          address: this.wallet_address,
          key: this.vk,
        },
      };
      const res = await this.scrtClient.queryContract(
        this.contractAddress,
        msg
      );
      this.balance = res.balance.amount;
      // console.log("balance" + this.balance);
    },

    async sefiStakepoolGetAvailableForWithdrawl() {
      const wallet = useWallet();
      const address = wallet.address;
      this.wallet_address = address;
      if (!this.vk) {
        await this.get_viewing_key_helper();
      }
      const msg = {
        available_tokens_for_withdrawl: {
          address: this.wallet_address,
          key: this.vk,
        },
      };
      let res;
      try {
        res = await this.scrtClient.queryContract(this.contractAddress, msg);
        this.available_tokens_for_withdrawl =
          res.available_tokens_for_withdrawl.amount;
        // console.log(
        //   "Amount available for withdrawl: " +
        //     this.available_tokens_for_withdrawl
        // );
      } catch (e) {
        console.log(e);
      }
    },

    async sefiStakepoolGetUserPastRecords() {
      const wallet = useWallet();
      const address = wallet.address;
      this.wallet_address = address;
      if (!this.vk) {
        await this.get_viewing_key_helper();
      }

      // console.log(this.wallet_address);
      // console.log(this.vk);

      const msg = {
        user_past_records: {
          address: this.wallet_address,
          key: this.vk,
        },
      };
      let res;
      try {
        res = await this.scrtClient.queryContract(this.contractAddress, msg);
      } catch (err) {
        console.log(err);
      }
      // console.log(res);
      let temp_array = [];

      temp_array = res.user_past_records.winning_history;
      // console.log(temp_array);
      this.user_past_records = temp_array;

      for (var i = 0; i < temp_array.length; i++) {
        // console.log("working");

        this.user_past_records[i][0] = temp_array[i][0];
        var date = new Date(temp_array[i][1] * 1000);
        var options = {
          month: "long", //to display the full name of the month
          day: "numeric",
        };
        var sDate = date.toLocaleDateString("en-US", options);
        temp_array[i][1] = sDate;
      }

      this.user_past_records = temp_array;

      // console.log(this.user_past_records);
      // console.log(temp_array);
    },

    //HELPER FUNCTIONS
    async sefiStakepoolGetLotteryInfoHelper() {
      const now = new Date();
      now.toUTCString();
      now.toISOString();
      this.current_time = Math.floor(now / 1000);

      this.time_left = this.end_time - this.current_time;
      if (this.time_left < 0) {
        this.time_left = 0;
      }
    },

    async sefiStakepoolSyncTimer() {
      this.current_time += 1;
      this.time_left -= 1;
      let temp_timer = this.time_left;

      //   console.log(this.time_left);
      if (this.time_left < 0) {
        temp_timer = 0;
        if (this.time_left < -20) {
          this.sefiStakepoolGetLotteryInfo();
          this.time_left = 0;
        }
      }

      this.days1 = Math.floor(temp_timer / (3600 * 24) / 10);
      this.days2 = Math.floor((temp_timer / (3600 * 24)) % 10);

      this.hours1 = Math.floor((temp_timer % (3600 * 24)) / 3600 / 10);
      this.hours2 = Math.floor(((temp_timer % (3600 * 24)) / 3600) % 10);

      this.mins1 = Math.floor((temp_timer % 3600) / 60 / 10);
      this.mins2 = Math.floor(((temp_timer % 3600) / 60) % 10);

      this.secs1 = Math.floor((temp_timer % 60) / 10);
      this.secs2 = Math.floor((temp_timer % 60) % 10);
    },

    async get_viewing_key_helper() {
      const vks = useVKs();
      let vkey = await vks.getViewingKey(this.contractAddress);
      this.vk = vkey;
    },

    async syncer_function_for_vk() {
      await this.sefiStakepoolGetBalance();
      await this.sefiStakepoolGetUserPastRecords();
      await this.sefiStakepoolGetAvailableForWithdrawl();
    },

    async syncer_function_for_deposit() {
      console.log("deposit syncer Working");
      await this.sefiStakepoolGetBalance();
      await this.sefiStakepoolGetTotalSefiRewards();
    },
    async syncer_function_for_trigger_withdraw_and_redelegate() {
      console.log("trigger syncer Working");

      await this.sefiStakepoolGetTotalSefiRewards();
      await this.sefiStakepoolGetBalance();
      await this.sefiStakepoolGetAvailableForWithdrawl();
    },
    async syncer_function_for_withdraw() {
      console.log("withdraw syncer Working");

      await this.sefiStakepoolGetAvailableForWithdrawl();
    },
  },
  messages: {
    async sefiStakepoolCreateViewingKey() {
      this.get_viewing_key_helper();

      if (!this.vk) {
        try {
          const vks = useVKs();
          let vkey = await vks.createViewingKey(this.contractAddress);
          // console.log("Inside set or get viewing #sefi_token_def");
          this.vk = vkey;
          console.log(this.vk);
        } catch (err) {
          console.log(err);
        }
      } else {
        // console.log(this.vk);
      }
      this.syncer_function_for_vk();
    },
    async sefiStakepoolDeposit(depositAmount) {
      let final_deposit_amount_in_uSefi = depositAmount.toString();
      const Handlemsg = { deposit: {} };
      let res;
      // const fees = {
      //   amount: [{ amount: "0", denom: "uscrt" }],
      //   gas: "900000",
      // };
      const msg = {
        send: {
          recipient: this.contractAddress,
          amount: final_deposit_amount_in_uSefi,
          msg: btoa(JSON.stringify(Handlemsg)),
        },
      };
      try {
        res = await this.scrtClient.executeContract(
          SefiTokenContractAddress,
          msg,
          undefined,
          undefined,
          fees
        );
        await this.syncer_function_for_deposit();
        return [
          true,
          final_deposit_amount_in_uSefi,
          this.sefi_total_deposits,
          this.balance,
          "success",
        ];
      } catch (e) {
        await this.syncer_function_for_deposit();
        console.log(e);
        return [false, 0, 0, 0, e];
      }
    },

    async sefiStakepoolWithdraw(amount) {
      let final_withdraw_amount_in_uSefi = amount.toString();
      const msg = { withdraw: {} };
      if (final_withdraw_amount_in_uSefi > 0) {
        const msg = { withdraw: { amount: final_withdraw_amount_in_uSefi } };
        try {
          const res = await this.scrtClient.executeContract(
            this.contractAddress,
            msg,
            undefined,
            undefined,
            fees
          );
          await this.syncer_function_for_withdraw();

          return [true, "success"];
        } catch (e) {
          console.log(e);
          await this.syncer_function_for_withdraw();
          return [false, e];
        }
      }
    },

    async sefiStakepoolTriggerWithdraw(amount) {
      let final_trigger_amount_in_uSefi = amount.toString();
      const msg = {
        trigger_withdraw: { amount: final_trigger_amount_in_uSefi },
      };
      try {
        const res = await this.scrtClient.executeContract(
          this.contractAddress,
          msg,
          undefined,
          undefined,
          fees
        );
        // console.log(res);
        await this.syncer_function_for_trigger_withdraw_and_redelegate();
        return [true, this.available_tokens_for_withdrawl];
      } catch (e) {
        // await this.syncer_function_for_trigger_withdraw_and_redelegate();
        console.log(e);
        return [false, e];
      }
    },
    async sefiStakepoolredelegate(amount) {
      let final_deposit_amount_in_uSefi = amount.toString();
      let msg = { redelegate: {} };
      if (amount > 0) {
        msg = { redelegate: { amount: final_deposit_amount_in_uSefi } };
      }
      try {
        const res = await this.scrtClient.executeContract(
          this.contractAddress,
          msg,
          undefined,
          undefined,
          fees
        );
        // console.log(res);
      } catch (e) {}
    },
  },

  methods: {},
};
