// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Users {
    uint32 public userId = 0;

    mapping(string => bool) isRegistered;
    mapping(uint32 => User) public users;

    struct User {
        uint32 id;
        string name;
        string accountHash;
        string role;
    }

    constructor() {
        createUser("Admin", "0xcc1e6791532974d488f84489614ea5a31bd28879", "Admin");
        createUser("Importer", "0xf96ebab353f51f0d96da7ebfa07742de02e50c33", "Importer");
        createUser("Provider", "0xe47c51f5471c4f511dc35ecbcbbcbfa423eccd9e", "Provider");
        createUser("Supplier", "0xa232f4746d93f504eeb018460b51ba776da52dd8", "Supplier");
        createUser("Security", "0xaeB4863f8Cb326963Bb37ec4f9C29e90d83c574c", "Security");
        userId = 5;
    }

    function createUser(
        string memory name,
        string memory accountHash,
        string memory role
    ) public {
        require(!isRegistered[accountHash], "This account  is already registered");
        isRegistered[accountHash] = true;
        userId++;
        users[userId] = User(userId, name, accountHash, role);
    }

    function getUser(uint32 id) public view returns (User memory) {
        return users[id];
    }

    function getUserByAccountHash(string memory accountHash)
        public
        view
        returns (User memory)
    {
      User memory user;
      for (uint32 i = 1; i <= userId; i++) {
        if ( keccak256(abi.encodePacked(users[i].accountHash))==keccak256(abi.encodePacked(accountHash)) ) {
          return users[i];
        }
      }
      return user;
    }

    function updateUser(
        uint32 id,
        string memory name,
        string memory accountHash,
        string memory role
    ) public {
        users[id] = User(id, name, accountHash, role);
    }

    function deleteUser(uint32 id, string memory accountHash) public {
        // require(
        //     keccak256(abi.encodePacked(users[id].accountHash)) ==
        //         keccak256(abi.encodePacked(accountHash)),
        //     "You can only delete your own account"
        // );
        delete users[id];
        delete isRegistered[accountHash];
        userId--;
    }
}
