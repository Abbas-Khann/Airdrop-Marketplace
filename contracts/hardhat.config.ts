import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/index.ts";

const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    "morphL2-testnet": {
      url: "https://rpc-testnet.morphl2.io",
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
