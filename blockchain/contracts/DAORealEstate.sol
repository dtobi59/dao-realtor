pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PriceConsumerV3.sol";
import "./DaoRealToken.sol";

contract DAORealEstate is Ownable {
   DaoRealToken private dao_real_token;
   PriceConsumerV3 private matic_oracle;
 
   struct Property{
        uint id;
        uint price; //to excute project
        address developer;
        string name;
        string description;
        string longitude;
        string latitude;
        string image_hash;
   }

   struct User{
        string kyc_hash;        
        string account_type;
        bool is_created;
   }

   struct Investment{
      uint property_id;
      address investor;
      uint amount;
   }

   uint developer_fees;
   uint validator_fees;

   mapping (address => User) public users;
   mapping (uint => uint) public totalProperyInvestment;


   event NewProperty(address indexed from, uint256 timestamp, Property property);
 
 
   Property[] public properties;
   Investment[] public investments;
 
   constructor (uint _developer_fees, uint _validator_fees) {
       developer_fees = _developer_fees; //WEI
       validator_fees = _validator_fees; //WEI

       matic_oracle = PriceConsumerV3(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
   }


   function gemmi() public returns  ( int ) { 
      return matic_oracle.getLatestPrice();

   }


   function getDeveloperCreationFees() public returns ( uint ){
      
      return developer_fees;
   }

   function getValidatorCreationFees() public returns ( uint ){
      return validator_fees;
   }
 
   //The developer that want to emback on the project
   function createProperty(        
      uint _price,
      string memory _name,
      string memory _description,
      string memory _longitude,
      string memory _latitude,
      string memory _image_hash) external returns (bool) { 
   

     uint id = properties.length + 1;
     Property memory newProperty =  Property(
      id,
      _price,
      msg.sender,
      _name,
      _description,
      _longitude,
      _latitude,
      _image_hash
     );
     
     properties.push(newProperty);     

      // emit the property event 
      emit NewProperty(msg.sender, block.timestamp, newProperty);

      return true;

      
   }

   function getAllProperty() public view returns (Property[] memory){
      return properties;
   }


   function createInvestor(
      string memory _kyc_hash     
   )  external newAddress{
      users[msg.sender] = User({
         account_type: "investor",
         kyc_hash: _kyc_hash,
         is_created: true
      });

   }


   function createDeveloper(
      string memory _kyc_hash
   ) payable external creationFee(getDeveloperCreationFees()) newAddress{
      
      users[msg.sender] =  User({
         account_type: "developer",
         kyc_hash: _kyc_hash,
         is_created: true
      });
   }


   function createValidator(
      string memory _kyc_hash
   ) payable external creationFee(getValidatorCreationFees()) newAddress{
      
        users[msg.sender] = User({
         account_type: "validator",
         kyc_hash: _kyc_hash,
         is_created: true
      });
   }

   function invest(
      uint _property_id, 
      uint _amount
   ) public payable avaiableForInvestment(_property_id)
   returns (uint){
      
      require(msg.value > _amount,"The amount you want to invest is less than the msg.value amount");
      
      uint newPropertyInvestment = totalProperyInvestment[_property_id] +_amount;
      uint investmentAmount = _amount;
      if(newPropertyInvestment > properties[_property_id].price){
        investmentAmount = properties[_property_id].price - totalProperyInvestment[_property_id];
      }
      //add to the total propery investment
      totalProperyInvestment[_property_id] += investmentAmount;

      //add investor to the propery investment
      investments.push(Investment(_property_id,msg.sender, _amount));

      return investmentAmount;

   }


   modifier onlyDeveloper {
      string storage account_type = users[msg.sender].account_type;
      require(keccak256(abi.encodePacked(account_type)) == "developer","You're required to be a developer to perform this operation");
      _;
   }

   modifier onlyValidator {
      string memory account_type = users[msg.sender].account_type;
      require(keccak256(abi.encodePacked(account_type)) == "validator");
      _;
   }

   modifier onlyInvestor {
      string memory account_type = users[msg.sender].account_type;
      require(keccak256(abi.encodePacked(account_type)) == "investor");
      _;
   }

   modifier newAddress(){
      require(users[msg.sender].is_created == false,"Account already created!");
      _;
   }

   modifier creationFee(uint fees){
      require(msg.value >= fees,"You're required to pay a fees");
      _;
   }

   modifier avaiableForInvestment(uint _property_id){
     require(properties[_property_id].price > totalProperyInvestment[_property_id] ,"Investment cycle completed");
     _;
   }


 
   // //the property validator vouch for the project
   // function vouchForProperty(uint256 _property_id, uint _amount)  payable external returns(uint256) {
   //  require(_amount == msg.value, "incorrect AVAX amount");
   //  //return uint256(msg.value);
 
   //  Property storage property = properties[_property_id];
   //  property_validators.push(ProperyValidator(_property_id,msg.sender,_amount));
   //  uint id =  property_validators.length - 1;
 
   //  //mint PVToken of equivalent
   //  uint unit = 4000; //TODO: Get price equivalent
   //  //rewardPropertyValidator(msg.sender, unit);
   // }
 
}
