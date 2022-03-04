pragma solidity >=0.7.0 <0.9.0;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 
/*
@Description: Property Validator token is given property validators that stack
              their coin to valut that a building project is real
*/
contract DaoRealToken is ERC20 {
 
    constructor() public ERC20("PVToken", "PVT") {
        //_mint(msg.sender, _initialSupply);
    }
 
    function mint(address _validator, uint _unit) external {
       _mint(_validator, _unit);
    }
 
}
