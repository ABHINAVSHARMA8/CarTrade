const CarTrade = artifacts.require("CarTrade");




module.exports = async function(deployer) {
  
  
 
  await  deployer.deploy(CarTrade,"car","abc",1,1,1);
  const carTrade = await CarTrade.deployed();

  

 
};