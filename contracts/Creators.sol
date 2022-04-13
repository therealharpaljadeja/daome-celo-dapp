// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "./Creator.sol";

contract Creators {
    address public marketplaceAddress;

    mapping(string => address) usernameToCreatorMapping;
    mapping(address => address) addressToCreatorMapping;
    mapping(string => address) usernameToAddressMapping;

    event UserRegistered(address indexed userAddress, string indexed username);

    constructor() {}

    /// @notice Register a new user by instantiating a creator contract and renouncing its ownership back to the sender.
    /// @param username username of the creator
    /// @param name name of the creator
    /// @param bio bio of the creator
    /// @param profilePicUrl profile picture url (preferrably ipfs) of the creator
    /// @param nftCollectionName name of the nft collection that will be created for the creator.
    /// @param nftCollectionSymbol symbol of the nft collection that will be created for the creator.
    /// @return address address of the creator contract.
    function registerUser(
        string memory username,
        string memory name,
        string memory bio,
        string memory profilePicUrl,
        string memory nftCollectionName,
        string memory nftCollectionSymbol
    ) external returns (address) {
        address temp = usernameToAddressMapping[username];
        require(temp == address(0), "Username already exists");

        Creator creator = new Creator(
            username,
            name,
            bio,
            profilePicUrl,
            nftCollectionName,
            nftCollectionSymbol
        );

        creator.transferOwnership(msg.sender);
        usernameToCreatorMapping[username] = address(creator);
        addressToCreatorMapping[msg.sender] = address(creator);
        emit UserRegistered(msg.sender, username);
        return address(creator);
    }

    /// @notice get creator contract address using the username.
    /// @param username username of the creator for which the contract address is required.
    /// @return address address of the creator contract.
    function getCreatorAddressByUsername(string memory username)
        external
        view
        returns (address)
    {
        return usernameToCreatorMapping[username];
    }

    /// @notice get creator address by using msg.sender
    /// @return address address of the creator contract.
    function getCreatorAddressBySender() external view returns (address) {
        return addressToCreatorMapping[msg.sender];
    }

    /// @notice get creator address using the EOA address
    /// @param _address EOA address which created the creator contract.
    /// @return address address of the creator contract.
    function getCreatorAddressByAddress(address _address)
        external
        view
        returns (address)
    {
        return addressToCreatorMapping[_address];
    }

    /// @notice check if the address is registered.
    /// @param user address of the EOA for which the check is required.
    /// @return bool true or false based on user is registered or not.
    function isUserRegistered(address user) external view returns (bool) {
        return addressToCreatorMapping[user] != address(0);
    }
}
