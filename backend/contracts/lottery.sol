// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract lottery {
 
 uint256 public constant ticketPrice = 0.01 ether;
  uint256 public constant maxTickets = 100;
  uint256 public constant ticketCommission = 0.001 ether;
  uint256 public constant duration = 30 minutes;

  uint256 public expiration;
  address public lotteryOpearator;
  uint256 public opeartorCommision;
  address public lastWinner;
  uint256 public lastWinningAmount;

  mapping(address => uint256) public winnings;
  address[] public tickets;


  constructor() {
    lotteryOpearator = msg.sender;
    expiration = block.timestamp + duration;
  }


  // modifiers

  modifier onlyOperator() {
    require(msg.sender == lotteryOpearator, "Only operator can call this function");
    _;
  }

  modifier isWinner(){
    require(IsWinner(), "Only winner can call this function");
    _;
  }

  function getTickets() public view returns(address[] memory){
    return tickets;
  }

  function IsWinner() public view returns(bool){
    return winnings[msg.sender] > 0;
  }

  function getWinningsForAddress(address _address) public view returns(uint256){
    return winnings[_address];
  }

  function butTicket()public payable{
    require(msg.value % ticketPrice == 0, "Value should be in multiple of ticket price");

    uint256 numOfTickets = msg.value / ticketPrice;

    require(numOfTickets <= remainingTickets(), "Not enough tickets left");

    for(uint256 i = 0; i < numOfTickets; i++){
      tickets.push(msg.sender);
    }
  }

  function remainingTickets() public view returns(uint256){
    return maxTickets - tickets.length;
  }

  function currentWinningReward() public view returns(uint256){
    return tickets.length * ticketPrice;
  }


  function restartdraw() public onlyOperator{
    require(tickets.length == 0, 'Cannot restart draw with tickets');

    delete tickets;
    expiration = block.timestamp + duration;
  }

  function DrawWinnerTicket() public onlyOperator{
    require(tickets.length > 0, 'Cannot draw winner with no tickets');

    bytes32 blockHash = blockhash(block.number - tickets.length);
    uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp,blockHash)));

    uint256 winningTicket = randomNumber % tickets.length;

    address winner = tickets[winningTicket];
    lastWinner = winner;

    winnings[winner] += tickets.length*(ticketPrice - ticketCommission);

    delete tickets;
    expiration = block.timestamp + duration;
  }

  function checkWinningsAmount() public view returns(uint256){
    address payable winner = payable(msg.sender);

    uint winningsAmount = winnings[winner];

    return winningsAmount;
  }

  function withdrawWinnings() public isWinner{
    address payable winner = payable(msg.sender);

    uint winningsAmount = winnings[winner];

    winnings[winner] = 0;

    winner.transfer(winningsAmount);
  }

  function refundAll() public {
    require(block.timestamp > expiration, "Cannot refund before expiration");

    for(uint256 i = 0; i < tickets.length; i++){
      address payable ticketOwner = payable(tickets[i]);
      ticketOwner.transfer(ticketPrice);
    }

    delete tickets;
  }

  function withdrawCommission() public onlyOperator{
    address payable operator = payable(msg.sender);
    uint256 opeartorTotalCommision = opeartorCommision;

    operator.transfer(opeartorTotalCommision);

    opeartorTotalCommision = 0;
  }
}
