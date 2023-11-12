// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract BuyMeACoffee{
   
   //Event when a memo is created
  
   event NewMemo(
    address indexed from,
    uint256 timestamp,
    string name,
    string message
   );
   
   
   //memo struct 
  
   struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
   }
   //list of all memos sent from people
   Memo[] memos;

   // address of contract deployer
   address payable owner;

   //deploy logic for verfication 
   constructor(){
    owner = payable(msg.sender);
   }
   /**
    * @dev buy a coffee for contrant owner
    * @param _name name of the coffee buyer
    * @param _message a nice message from the coffee buyer
    */
   function buyCoffee(string memory _name, string memory _message) public payable{
       //making sure the sender sends more than 0
       require(msg.value > 0, "can't buy coffee with 0 eth");   
       
       //add memo to storage
       memos.push(Memo(
        msg.sender,
        block.timestamp,
        _name,
        _message

       ));
    //emit a log event when a new memo is added to storage 
       emit NewMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message
    );

   }
 /**
    * @dev send entire balnce stored to contract owner
    */
function withdrawTips() public {
    require(owner.send(address(this).balance));

}


 /**
    * @dev send all memos recieved and stored on blockchain 
    */
function getMemos() public view returns(Memo[] memory) {
   //function above saves gas for user and owner
    return memos; 



}




}
    