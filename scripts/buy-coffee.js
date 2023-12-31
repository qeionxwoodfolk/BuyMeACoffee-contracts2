const hre = require("hardhat");

//retrun ethere balance
async function getBalance(address){
 const balanceBigint = await hre.waffle.provider.getBalance(address);
 return hre.ethers.utils.formatEther(balanceBigInt);
}

//Logs the Ether balances for a list of addresses
async function printBalances(addresses) {
  let idx = 0;
  for(const address of addresses){
    console.log(`Address ${idx} balance:` ,await getBalance(address));
    idx++;
  }
}

//logs memos stored on-chain from coffee purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name; 
    const tipperAddress = memo.from; 
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}


async function main(){
//Get example accounts
cont[owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

//Get the contract to deploy
const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
const buyMeACoffee = await BuyMeACoffee.deploy();
await buyMeACoffee.deployed();
console.log("BuyMeACoffee deployed to", buyMeACoffee.address);




//Check Balances before the coffee purchase
const addresses = [owner.address, tipper.address, buyMeACoffee.address];
console.log("== start ==");
await printBalances(addresses);

//Buy the owner a few coffees 
const tip = {value: hre.ethers.utils.parseEther("1")};
await buyMeACoffee.connect(tipper).buyCoffee("Nick","Sir, You Are Amazing :)",tip);
await buyMeACoffee.connect(tipper2).buyCoffee("Jet","Thank you, I Bet on Giannis <3 ",tip);
await buyMeACoffee.connect(tipper3).buyCoffee("Geralbido","Thank You so so much xoxo", tip);
//check balances after coffee purchase.

console.log("== bought coffee ==");
await printBalances(addresses);


//withdraw funds
await buyMeACoffee.connect(owner).withdrawTips();



//check balance after withdraw

console.log("== withdrawTips ==");
await printBalances(addresses);



//read all memos left for owner
console.log("== memos ==");
const memos = await buyMeACoffee.getMemos();
printMemos(memos);
} 
 
  

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
