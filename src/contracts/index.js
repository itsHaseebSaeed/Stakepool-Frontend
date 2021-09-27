import {
  createContract,
  createSnip20Contract,
} from "@stakeordie/griptape-vue.js";

import { ScrtStakepoolDefinition } from "./scrt_stakepool_def.js";
import { SefiStakepoolDefinition } from "./sefi_stakepool_def.js";
import { SefiTokenDefinition } from "./sefi_token_def.js";

const ScrtStakepoolContractAddress =
  "secret15wp0p3mlmdr8hy7elc4zuqrm5qmynwwlcqmeax";

const SefiStakepoolContractAddress =
  "secret1xj3v5q0q0p5khvark9hmcjrdxrjgh9zqsq7lhg";

const SefiTokenContractAddress =
  "secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm";

export const useScrtStakepoolStore = createContract(
  "ScrtStakepool",
  ScrtStakepoolContractAddress,
  ScrtStakepoolDefinition
);

export const useSefiStakepoolStore = createContract(
  "SefiStakepool",
  SefiStakepoolContractAddress,
  SefiStakepoolDefinition
);

// export const useSefiContractStore = createContract('SefiContract', SefiTokenContractAddress, SefiTokeDefinition)

export const useSefiContractStore = createSnip20Contract(
  "SefiContract",
  SefiTokenContractAddress,
  SefiTokenDefinition
);

export { SefiTokenContractAddress };
