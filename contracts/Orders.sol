// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract Orders {
  uint256 public orderId = 0;

  mapping(uint256 => Order) public orders;

  struct Order {
    uint256 id;
    uint256 userId;
    string orderDetails;
    string orderStatus;
    string paymentStatus;
    string securityStatus;
    string deliveryStatus;
  }

  event onOrderUpdate(
    uint256 id,
    uint256 userId,
    string orderDetails,
    string orderStatus,
    string paymentStatus,
    string securityStatus,
    string deliveryStatus
  );

  // constructor(){
  //   createOrder(
  //     1,
  //      "{\"providerIds\":[\"3\"],\"importerIds\":[\"2\"],\"supplierIds\":[\"4\"],\"securityIds\":[\"5\"],\"products\":[{\"material\":\"uranium\",\"quantity\":1}],\"unitPrice\":0,\"date\":\"2022-12-28T14:25:24.316Z\"}",
  //      "{\"providerApproval\":\"pending\",\"importerApproval\":\"pending\",\"supplierApproval\":\"pending\",\"securityApproval\":\"pending\",\"orderStatus\":\"pending\"}",
  //      "{\"providerPayment\":\"pending\",\"importerPayment\":\"pending\",\"supplierPayment\":\"pending\",\"securityPayment\":\"pending\"}",
  //      "{\"state\":true,\"milestones\":\"1/1\",\"validation\":\"pending\"}",
  //      "{\"location\":\"\",\"eta\":\"\"}"
  //     );
  // }

  function createOrder(
    uint256 userId,
    string memory orderDetails,
    string memory orderStatus,
    string memory paymentStatus,
    string memory securityStatus,
    string memory deliveryStatus
  ) public {
    orderId++;
    orders[orderId] = Order(
      orderId,
      userId,
      orderDetails,
      orderStatus,
      paymentStatus,
      securityStatus,
      deliveryStatus
    );
  }

  function updateOrder(
    uint256 id,
    uint256 userId,
    string memory orderDetails,
    string memory orderStatus,
    string memory paymentStatus,
    string memory securityStatus,
    string memory deliveryStatus
  ) public {
    orders[id] = Order(
      id,
      userId,
      orderDetails,
      orderStatus,
      paymentStatus,
      securityStatus,
      deliveryStatus
    );

    emit onOrderUpdate(
      id,
      userId,
      orderDetails,
      orderStatus,
      paymentStatus,
      securityStatus,
      deliveryStatus
    );
  }

  function deleteOrder(uint256 id) public {
    delete orders[id];
    orderId--;
  }
}
