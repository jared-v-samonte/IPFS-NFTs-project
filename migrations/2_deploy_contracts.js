const IpfsNft = artifacts.require("IpfsNft");

module.exports = function(deployer) {
  deployer.deploy(IpfsNft);
};