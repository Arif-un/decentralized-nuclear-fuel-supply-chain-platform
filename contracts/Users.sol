// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Users {
    uint256 public userId = 0;

    mapping(string => bool) isRegistered;
    mapping(uint256 => User) public users;

    struct User {
        uint256 id;
        string name;
        string accountHash;
        string role;
    }

    constructor() {
        createUser("name-1", "0xcc1e6791532974d488f84489614ea5a31bd28879", "Admin");
        // createUser("name-2", "email2@m.com", "123");
        // createUser("name-3", "email3@m.com", "123");
    }


    function createUser(
        string memory name,
        string memory accountHash,
        string memory role
    ) public {
      // TODO: admin check
        require(!isRegistered[accountHash], "This account  is already registered");
        isRegistered[accountHash] = true;
        userId++;
        users[userId] = User(userId, name, accountHash, role);
    }

    function getUser(uint256 id) public view returns (User memory) {
        return users[id];
    }

    function getUserByAccountHash(string memory accountHash)
        public
        view
        returns (User memory)
    {
        for (uint256 i = 1; i <= userId; i++) {
            if (
                keccak256(abi.encodePacked(users[i].accountHash)) ==
                keccak256(abi.encodePacked(accountHash))
            ) {
                return users[i];
            }
        }
        return users[0];
    }

    function updateUser(
        uint256 id,
        string memory name,
        string memory accountHash,
        string memory role
    ) public {
        // TODO: admin check
        // require(
        //     keccak256(abi.encodePacked(users[id].accountHash)) ==
        //         keccak256(abi.encodePacked(accountHash)),
        //     "You can only update your own account"
        // );
        users[id] = User(id, name, accountHash, role);
    }

    function deleteUser(uint256 id, string memory accountHash) public {
        require(
            keccak256(abi.encodePacked(users[id].accountHash)) ==
                keccak256(abi.encodePacked(accountHash)),
            "You can only delete your own account"
        );
        delete users[id];
        delete isRegistered[accountHash];
        userId--;
    }
}
