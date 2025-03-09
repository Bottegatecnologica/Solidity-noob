// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SchrodingerCatNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("CAT NFT", "SCAT") {
        _nextTokenId = 1;
    }

    function mint(address to) external returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}