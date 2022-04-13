// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Creator.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) _tokenURIs;
    mapping(uint256 => uint256) public _royalties;
    mapping(uint256 => address) public _royaltyReceiver;

    constructor(string memory collectionName, string memory collectionSymbol)
        ERC721(collectionName, collectionSymbol)
    {}

    /// @notice create nft
    /// @param _tokenURI a uri where the metadata of the token is hosted. (preferrably ipfs)
    /// @param royaltyPercentage percentage of royalty expected.
    /// @return uint256 the tokenId of the newly minted nft.
    function createToken(string memory _tokenURI, uint256 royaltyPercentage)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _tokenURIs[newItemId] = _tokenURI;
        _royalties[newItemId] = royaltyPercentage;
        _royaltyReceiver[newItemId] = msg.sender;
        return newItemId;
    }

    /// @notice get tokenURI of the nft using its tokenId.
    /// @param tokenId tokenId of the nft for which tokenURI is required.
    /// @return string tokenURI of the nft.
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    /// @notice check if the spender(marketplace in my case) is allowed to spend the tokenId
    /// @param spender in this case it will usually be marketplace however can be checked for any address.
    /// @param tokenId tokenId for which the allowance needs to be checked.
    /// @return bool true or false based on whether the token is allowed to the spender or not.
    function isApprovedToMarketplace(address spender, uint256 tokenId)
        public
        view
        returns (bool)
    {
        return _isApprovedOrOwner(spender, tokenId);
    }

    /// @notice withdraw royalty amount accumulated in this contract.
    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /// @notice get royalty percentage set on the specified tokenId.
    /// @param tokenId tokenId for which the royalty percentage is expected.
    /// @return uint256 royalty percentage.
    function getRoyaltyPercentage(uint256 tokenId)
        external
        view
        returns (uint256)
    {
        return _royalties[tokenId];
    }

    /// @notice get the address who receives the royalty for the specified token id.
    /// @param tokenId token id of the nft.
    /// @return address address that receives the royalty for the given token id.
    function getRoyaltyReceiver(uint256 tokenId)
        external
        view
        returns (address)
    {
        return _royaltyReceiver[tokenId];
    }

    receive() external payable {}
}
