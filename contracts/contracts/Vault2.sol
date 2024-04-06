// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Vault2 is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor(
        address initialOwner
    )
        ERC20("Staked Morph", "stMPH")
        Ownable(initialOwner)
        ERC20Permit("MyToken")
    {}

    function deposit(uint256 _amount) external payable {
        require(msg.value > 0, "Staking Value can't be 0");
        uint _amount = msg.value;
        uint256 shares;
        shares = _amount;
        _mint(msg.sender, shares);
    }

    function withdraw(uint256 _shares) external {
        uint256 amount = (_shares * address(this).balance) / totalSupply();
        _burn(msg.sender, _shares);
        (bool sent, bytes memory data) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
