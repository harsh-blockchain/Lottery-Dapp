import React, { useEffect, useState } from "react";
import ethers from "ethers";
import Head from "next/head";
import Image from "next/image";
import logo from "./logo.png";
import Login from "../components/Login";
import Main from "../components/Main";

const Home = () => {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      const chainId = await ethereum.request({ method: "eth_chainId" });

      const maticChainId = "0x13881";
      if (chainId !== maticChainId) {
        setNetwork(false);
        return;
      } else {
        setNetwork(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();

    ethereum.on("accountsChanged", async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    });

    ethereum.on("chainChanged", async () => {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const maticChainId = "0x13881";
      if (chainId !== maticChainId) {
        setNetwork(false);
        return;
      } else {
        setNetwork(true);
      }
    });
  });

  return (
    <div>
      {!account && network ? (
        <Login connectWallet={connectWallet} />
      ) : (
        <Main account={account} />
      )}
    </div>
  );
};

export default Home;
