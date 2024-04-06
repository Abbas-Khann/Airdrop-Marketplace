import { task } from "hardhat/config";
import { ADDRESSES } from "../constants";

task(
  "deploy",
  "deploys a Contract",
  async (taskArgs: { contract: string; args?: any }, hre) => {
    console.log(taskArgs.contract);
    console.log(taskArgs.args);
    let Contract = await hre.ethers.getContractFactory(taskArgs.contract);

    try {
      let contract = await Contract.deploy(taskArgs.args && taskArgs.args);

      await contract.deployed();

      console.log(`[${hre.network.name}] address: ${contract.address}`);
      console.log(` tx: ${contract.deployTransaction.hash}`);
    } catch (e) {
      console.log(e);
    }
  },
)
  .addParam("contract", "Name of the contract")
  .addOptionalParam("args", "Constructor Arguements");

task(
  "mint",
  "mints Token for the given token contract",
  async (taskArgs: { contract: string; to: string; value: string }, hre) => {
    let Contract = await hre.ethers.getContractAt(
      taskArgs.contract,
      ADDRESSES[taskArgs.contract],
    );

    try {
      const amount = hre.ethers.utils.parseEther(taskArgs.value);

      console.log(
        `Minting ${taskArgs.value} tokens form ${taskArgs.contract} to ${taskArgs.to}`,
      );
      let tx = await Contract.mint(taskArgs.to, amount);

      console.log(tx);
      console.log(`[${hre.network.name}] address: ${tx.address}`);
    } catch (e) {
      console.log(e);
    }
  },
)
  .addParam("contract", "Name of the contract")
  .addParam("value", "Amount of token to mint , not converted")
  .addParam("to", "Address to mint the tokens for ");
