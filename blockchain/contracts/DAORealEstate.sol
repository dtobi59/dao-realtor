pragma solidity >=0.7.0 <0.9.0;
 
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PriceConsumerV3.sol";
import "./DaoRealToken.sol";
 


contract DAORealEstate is Ownable {
   DaoRealToken private dao_real_token;
   //PriceConsumerV3 private avax_oracle;
 
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
        string home_address;
        string government_id;
        string name;
        string account_type;
        bool is_created;
   }

   uint developer_fees;
   uint validator_fees;

   mapping (address => User) public users;
 
 
   Property[] public properties;
 
   constructor (uint _developer_fees, uint _validator_fees) {
       developer_fees = _developer_fees; //WEI
       validator_fees = _validator_fees; //WEI
   }


   function getDeveloperCreationFees() public returns ( uint d ){
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
      string memory _image_hash) external onlyDeveloper { 
   

     uint id = properties.length - 1;
     properties.push(Property(
      id,
      _price,
      msg.sender,
      _name,
      _description,
      _longitude,
      _latitude,
      _image_hash));
   }

   function createInvestor(
      string memory _name,
      string memory _government_id,
      string memory _home_address
    
   )  external newAddress{
      users[msg.sender] = User({
         account_type: "developer",
         government_id: _government_id,
         name: _name,
         home_address: _home_address,
         is_created: true
      });

   }

   function createDeveloper(
      string memory _government_id,
      string memory _name,
      string memory _home_address
   ) payable external creationFee(getDeveloperCreationFees()) newAddress{
      
      users[msg.sender] =  User({
         account_type: "developer",
         government_id: _government_id,
         name: _name,
         home_address: _home_address,
         is_created: true
      });
   }

   function createValidator(
      string memory _home_address,
      string memory _government_id,
      string memory _name
   ) payable external creationFee(getValidatorCreationFees()) newAddress{
      
        users[msg.sender] = User({
         account_type: "validator",
         government_id: _government_id,
         name: _name,
         home_address: _home_address,
         is_created: true
      });
   }



   modifier onlyDeveloper {
      string memory account_type = users[msg.sender].account_type;
      require(keccak256(abi.encodePacked(account_type)) == "developer");
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
