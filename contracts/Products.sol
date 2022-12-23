// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Products {
    uint256 public productId = 0;

    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 categoryId;
    }

    constructor() {
        createProduct("name-1", "description-1", 100, 1);
        createProduct("name-2", "description-2", 200, 2);
        createProduct("name-3", "description-3", 300, 3);
    }

    function createProduct(
        string memory name,
        string memory description,
        uint256 price,
        uint256 categoryId
    ) public {
        productId++;
        products[productId] = Product(
            productId,
            name,
            description,
            price,
            categoryId
        );
    }
}
