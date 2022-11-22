var Lottery = artifacts.require("lottery");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Lottery);
};
