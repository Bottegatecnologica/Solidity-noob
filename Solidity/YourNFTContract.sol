// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YourNFTContract is ERC721, ERC1155, Ownable {
    IERC20 public erc20Token;

    constructor(address _erc20Address) ERC721("YourNFT", "YNFT") ERC1155("") {
        erc20Token = IERC20(_erc20Address);
    }

    // ... Altre funzioni e logica specifica per ERC-721, ERC-1155 ed ERC-20

    function mintNFT(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function mintERC1155(address to, uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(to, tokenId, amount, "");
    }

    function transferNFT(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You're not the owner of this NFT");
        _transfer(msg.sender, to, tokenId);
    }

    function transferERC1155(address to, uint256 tokenId, uint256 amount) public {
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");
        _safeTransferFrom(msg.sender, to, tokenId, amount, "");
    }

    function transferERC20(address to, uint256 amount) public {
        erc20Token.transferFrom(msg.sender, to, amount);
    }
}
