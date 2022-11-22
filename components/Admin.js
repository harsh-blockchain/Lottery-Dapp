import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../config";
import { useState, useEffect } from "react";

const Admin = ({ commission }) => {
  const restartDraw = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const restart = await contract.restartdraw();
    } catch (error) {}
  };

  const drawWinner = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const restart = await contract.DrawWinnerTicket();
    } catch (error) {}
  };

  const refundAll = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const restart = await contract.refundAll();
    } catch (error) {}
  };

  const withdrawCommission = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const restart = await contract.withdrawWinnings();
    } catch (error) {}
  };
  return (
    <div className="text-white px-5 py-3 m-5 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold text-center">Admin Controls</h2>
      <p className="mb-5 text-center">
        Total commission to be withdrawn:{" "}
        {commission && ethers.utils.formatEther(commission?.toString())} Matic
      </p>
      <div className="flex space-y-2 space-x-3">
        <button onClick={drawWinner} className="admin-button ">
          <StarIcon className="h-6 mx-auto mb-2 " />
          Draw Winner
        </button>
        <button onClick={withdrawCommission} className="admin-button py-8">
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commision
        </button>
        <button onClick={restartDraw} className="admin-button">
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </button>
        <button onClick={refundAll} className="admin-button">
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
};

export default Admin;
