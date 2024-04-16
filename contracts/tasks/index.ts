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
      // let contract = await Contract.deploy(taskArgs.args && taskArgs.args);
      let contract = await Contract.deploy(
        "0x01302696757447c7d771a29b04509e3fe33fb55e",
        "0x9d0cf5672a4fffaa6ba58db070ae1da8d0f130af",
      );

      await contract.deployed();

      console.log(`[${hre.network.name}] adress: ${contract.address}`);
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

task(
  "setDuration",
  "sets the duration of the reward",
  async (taskArgs: { contract: string; duration: number }, hre) => {
    let Contract = await hre.ethers.getContractAt(
      taskArgs.contract,
      ADDRESSES[taskArgs.contract],
    );

    try {
      console.log(
        `Setting the duration ${taskArgs.duration} for ${taskArgs.contract}`,
      );

      let tx = await Contract.setRewardsDuration(taskArgs.duration);

      console.log(tx);
      console.log(`[${hre.network.name}] address: ${tx.address}`);
    } catch (e) {
      console.log(e);
    }
  },
)
  .addParam("contract", "Name of the contract")
  .addParam("duration", "Duration of the rewards");

task(
  "notifyRewardAmount",
  "Update the reward amount we want to distribute over ",
  async (taskArgs: { contract: string; amount: string }, hre) => {
    let Contract = await hre.ethers.getContractAt(
      taskArgs.contract,
      ADDRESSES[taskArgs.contract],
    );

    try {
      console.log(
        `Setting the Reward amount ${taskArgs.amount} for ${taskArgs.contract}`,
      );

      const amount = hre.ethers.utils.parseEther(taskArgs.amount);

      let tx = await Contract.notifyRewardAmount(amount);

      console.log(tx);
      console.log(`[${hre.network.name}] address: ${tx.address}`);
    } catch (e) {
      console.log(e);
    }
  },
)
  .addParam("contract", "Name of the contract")
  .addParam("amount", "Amount of the awards to be disbursed");
