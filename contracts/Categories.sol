// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Categories {
    uint256 public categoryId = 0;

    mapping(uint256 => Category) public categories;

    struct Category {
        uint256 id;
        string name;
        string description;
    }

    constructor() {
        createCategory("name-1", "description-1");
        createCategory("name-2", "description-2");
        createCategory("name-3", "description-3");
    }

    function createCategory(string memory name, string memory description) public
    {
        categoryId++;
        categories[categoryId] = Category(categoryId, name, description);
    }
}
