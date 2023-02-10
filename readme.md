# Decentralized Nuclear supply chain (Demo)

# Installation
1. First, make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official website if you don't have them already.

2. Next, clone or download the existing React-TypeScript project from its GitHub repository.

3. Open a terminal and navigate to the root directory of the project. Run the command npm install to install all the necessary packages for the project.

4. Install Truffle globally by running the command npm install -g truffle.

5. Install Ganache by visiting their website and downloading the appropriate version for your operating system.

6. Start Ganache and make a note of the network ID and port number.

7. In the project root directory, create a new file named truffle-config.js and paste the following code, replacing the network ID and port number with the ones from your Ganache setup:
8.
```
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        }
    }
};
```

9. Open the terminal and navigate to the project root directory and run the command truffle compile to compile the smart contracts.

10. Run the command truffle migrate to deploy the contracts to the Ganache network.

11. Install Metamask browser extension and create an account or import an existing account.

12. Connect Metamask to the Ganache network by following these steps:

- Click on the Metamask icon in the browser and select the "Localhost 8545" network.
- Click on the three dots in the top right corner of the Metamask window and select "Import Account".
- In Ganache, click on the key icon in the top right corner to reveal the private key of an account.
- Copy the private key and paste it into the "Private Key" field in Metamask and click "Import".

13. Now, you can run the command npm start to start the development server and run the project.

14. Interact with the smart contract using Metamask and the web3 library in the React app.
# License

MIT
