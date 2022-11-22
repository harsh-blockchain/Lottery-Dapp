import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Marquee from "react-fast-marquee";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../config";
import Countdowns from "./Countdowns";
import Footer from "../components/Footer";
import Admin from "../components/Admin.js";

const Main = ({ account }) => {
  const [totalPool, setTotalPool] = useState("");
  const [remainingTickets, setRemainingTickets] = useState("");
  const [expiration, setExpiration] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [ticketCommission, setTicketCommission] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(1);
  const [tickets, setTickets] = useState(1);
  const [operator, setOperator] = useState();
  const [Winner, setWinner] = useState("");
  const [winnerAmount, setWinnerAmount] = useState(1);
  const [totalCommission, setTotalCommission] = useState(1);

  const getPool = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const pool = await contract.currentWinningReward();
      setTotalPool(pool);
    } catch (error) {
      console.log(error);
    }
  };

  const getRemainingTickets = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const remainingTicket = await contract.remainingTickets();

    setRemainingTickets(remainingTicket);
  };

  const buyTicket = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const val = quantity * 0.01;

      await contract.butTicket({
        value: ethers.utils.parseEther(val.toString()),
      });
    } catch (error) {}
  };

  const expirations = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const date = await contract.expiration();
      setExpiration(new Date(date * 1000));
    } catch (error) {
      console.log(error);
    }
  };

  const getValues = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const commission = await contract.ticketCommission();
      setTicketCommission(commission);

      const price = await contract.ticketPrice();
      setTicketPrice(price);

      const operators = await contract.lotteryOpearator();
      setOperator(operators);

      const winners = await contract.lastWinner();
      const amount = await contract.lastWinningAmount();
      setWinner(winners);
      setWinnerAmount(amount);

      const comm = await contract.opeartorCommision();
      setTotalCommission(comm);
    } catch (error) {}
  };

  const withdrawWinnings = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await contract.withdrawWinnings();
    } catch (error) {}
  };

  useEffect(() => {
    getPool();
    getRemainingTickets();
    expirations();
    getValues();
  });
  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Decentralized Lottery</title>
      </Head>

      <div className="flex-1">
        <Header account={account} buy={buyTicket} />
        <Marquee
          gradient={false}
          speed={150}
          className="p-6 mb-6 bg-[#0A1F1C] text-white font-semibold text-lg"
        >
          Last Winner : {Winner} {"  "} Winning Amount:{" "}
          {ethers.utils.formatEther(winnerAmount)} MATIC
        </Marquee>

        {operator === account && (
          <div className="flex justify-center">
            <Admin commission={totalCommission} />
          </div>
        )}

        {account === Winner && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={withdrawWinnings}
              className="p-5 bg-gradient-to-br
              from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full "
            >
              <p className="font-bold">Winner Winner Chicken Dinner!</p>
              <p>
                Total winnings:{" "}
                {ethers.utils.formatEther(winnerAmount.toString())}{" "}
              </p>
              <br />
              <p>Click here to withdraw 💸</p>
            </button>
          </div>
        )}

        {/*  */}

        <div className="space-y-5 md:space-y-0 m-5 md:flex items-start justify-center md:space-x-5">
          <div className="stats-container">
            <div className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </div>
            <div className="flex justify-between p-2 space-x-3">
              <div className="stats ">
                <div className="text-md">Total Pool</div>
                <div className="text-md">
                  {totalPool && ethers.utils.formatEther(totalPool.toString())}
                </div>
              </div>
              <div className="stats">
                <div>Tickets Remaining</div>
                <div>{parseInt(remainingTickets)} </div>
              </div>
            </div>
            {/* timer */}
            <div className="mt-5 mb-4">
              <Countdowns expiration={expiration} />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2 className="text-sm">Price per ticket</h2>
                <p>0.01 Matic</p>
              </div>
              <div className="flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4">
                <p>Tickets</p>
                <input
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  value={quantity}
                  placeholder="select quantity"
                  className="flex w-full bg-transparent text-right outline-none"
                  min={1}
                  type="number"
                />
              </div>

              <div className="space-y-2 mt-5">
                <div className="flex items-center font-extrabold justify-between text-emerald-300 text-sm italic">
                  <p>Total cost of tickets</p>
                  <p>
                    {ticketPrice &&
                      Number(ethers.utils.formatEther(ticketPrice.toString())) *
                        quantity}{" "}
                    Matic
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service fees</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(ticketCommission.toString()) *
                        quantity}{" "}
                    Matic
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network fees</p>
                  <p>TBD</p>
                </div>
              </div>

              <button
                onClick={buyTicket}
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                className="mt-4 w-full bg-gradient-to-br
              from-orange-500 to-emerald-600 px-10 py-5 rounded-md
              text-white shadow-xl disabled:from-gray-600
              disabled:text-gray-100 disabled:to-gray-600 
               disabled:cursor-not-allowed font-semibold"
              >
                Buy {quantity} tickets for{" "}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                    quantity}{" "}
                Matic
              </button>
            </div>

            {tickets.length > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  You have {tickets.length} tickets in this draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(tickets)
                    .fill("")
                    .map((_, index) => (
                      <p
                        key={index}
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                      >
                        {index + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  */}
      </div>

      <Footer />
    </div>
  );
};
export default Main;
