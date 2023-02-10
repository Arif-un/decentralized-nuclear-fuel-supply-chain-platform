const Users = artifacts.require('Users')
const Orders = artifacts.require('Orders')

module.exports = function (deployer) {
  deployer.deploy(Users)
  deployer.deploy(Orders)
}
