import { useViewingKeyStore as useVKs } from "@stakeordie/griptape-vue.js";
import { useWalletStore as usewallet } from "@stakeordie/griptape-vue.js";
import axios from "axios";
export const SefiTokenDefinition = {
  state: {
    sefi_token_balance: undefined,
    sefi_token_keys: undefined,
    sefi_token_current_price: undefined,
    sefi_token_balance_in_usd: undefined,
    sefi_token_wallet_adress: undefined,
  },
  queries: {
    async getSefiContractKey() {
      const wallet = usewallet();
      const vks = useVKs();
      const vkey = vks.getViewingKey(this.contractAddress);
      if (!vkey) {
        console.log("Key not found");
      }
      const address = wallet.address;
      this.sefi_token_wallet_adress = address;

      this.sefi_token_key = vkey;
    },

    async getSefiContractBalance() {
      await this.getSefiContractKey();
      await this.getCurrentSefiPrice();

      const msg = {
        balance: {
          address: this.sefi_token_wallet_adress,
          key: this.sefi_token_key,
        },
      };
      const res = await this.scrtClient.queryContract(
        this.contractAddress,
        msg
      );
      this.sefi_token_balance = res.balance.amount;
      // console.log("SEFI balance: " + this.sefi_token_balance);
      this.sefi_token_balance_in_usd =
        (this.sefi_token_balance / 1000000) * this.sefi_token_current_price;
      // console.log(this.sefi_token_balance);
    },

    async getCurrentSefiPrice() {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=secret-finance&vs_currencies=usd"
        )
        .then(
          (response) =>
            (this.sefi_token_current_price =
              response.data["secret-finance"].usd)
        );
      // console.log(this.sefi_token_current_price);
    },
  },

  messages: {
    async createOrGetViewingKey() {
      const vks = useVKs();
      const vkey = await vks.getViewingKey(this.contractAddress);

      if (!vkey) {
        const vkey = await vks.createViewingKey(this.contractAddress);
        console.log("Inside set or get viewing #sefi_token_def");
        this.sefi_token_key = vkey;
        console.log(this.sefi_token_key);
      } else {
        this.sefi_token_key = vkey;
      }
      await this.getSefiContractBalance();
    },

    async createViewingKey() {
      const vkey = await vks.createViewingKey(this.contractAddress);
      console.log("Inside set or get viewing #sefi_token_def");
      this.sefi_token_key = vkey;
      console.log(this.sefi_token_key);
    },
  },
};
