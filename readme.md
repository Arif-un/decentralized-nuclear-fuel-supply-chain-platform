# 🔬 Decentralized Nuclear Fuel Supply Chain Platform

A decentralized application (dApp) built on Ethereum blockchain for managing nuclear fuel supply chain operations with transparency, security, and immutable transaction records.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Useful Links](#useful-links)

## 🎯 Overview

This platform provides a secure, transparent, and traceable system for managing nuclear fuel supply chain operations. The system leverages blockchain technology to ensure data immutability, secure multi-party approval processes, and complete audit trails for nuclear material transactions.

### Key Benefits
- **Transparency**: All transactions are recorded on the blockchain
- **Security**: Multi-signature approval processes and secure smart contracts
- **Traceability**: Complete audit trail from suppliers to end users
- **Compliance**: Built-in regulatory compliance mechanisms
- **Decentralization**: No single point of failure or control

## 🚀 Features

### Core Functionality
- **User Management**: Role-based access control (Admin, Provider, Supplier, Importer, Security)
- **Order Management**: Create, update, and track nuclear fuel orders
- **Multi-Party Approval**: Requires approval from multiple stakeholders
- **Supply Chain Tracking**: Real-time location and status tracking
- **Payment Integration**: Decentralized payment processing
- **Security Validation**: Multi-level security checks and validations

### User Interface
- **Dashboard**: Comprehensive overview of operations
- **Order Management**: Create and manage orders with detailed tracking
- **User Administration**: Manage system users and permissions
- **Real-time Updates**: Live status updates via blockchain events
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Leaflet** - Interactive maps

### Blockchain
- **Solidity ^0.8.13** - Smart contract development
- **Truffle** - Development framework
- **Web3.js** - Ethereum JavaScript API
- **MetaMask** - Wallet integration
- **Ganache** - Local blockchain for development

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Vitest** - Testing framework
- **Commitlint** - Conventional commits

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Smart          │    │   Ethereum      │
│   (Frontend)    │◄──►│   Contracts      │◄──►│   Network       │
│                 │    │   (Backend)      │    │   (Blockchain)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

The application follows a decentralized architecture where:
- **Frontend** handles user interactions and displays data
- **Smart Contracts** manage business logic and data storage
- **Blockchain** provides immutable storage and consensus

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (^16.x) - [Download here](https://nodejs.org/)
- **pnpm** (^7.x) - [Installation guide](https://pnpm.io/installation)
- **Git** - [Download here](https://git-scm.com/)
- **MetaMask** browser extension - [Install here](https://metamask.io/)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd decentralized-nuclear-fuel-supply-chain-platform
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Install Truffle Globally
```bash
npm install -g truffle
```

### 4. Set Up Local Blockchain

#### Option A: Using Ganache GUI
1. Download and install [Ganache](https://trufflesuite.com/ganache/)
2. Start Ganache and create a new workspace
3. Note the RPC server URL (usually `http://127.0.0.1:7545`)
4. Note the network ID (usually `5777`)

#### Option B: Using Ganache CLI
```bash
npm install -g ganache-cli
ganache-cli -p 7545 -i 5777
```

### 5. Configure Network
The `truffle-config.js` is already configured for local development:
```javascript
networks: {
  development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*"
  }
}
```

### 6. Compile and Deploy Smart Contracts
```bash
# Compile contracts
truffle compile

# Deploy to local network
truffle migrate --reset
```

### 7. Configure MetaMask
1. Install MetaMask browser extension
2. Create or import an account
3. Add local network:
   - Network Name: `Localhost 7545`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337` or `5777`
   - Currency Symbol: `ETH`
4. Import test accounts from Ganache using private keys

## 🎮 Usage

### Start Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm format       # Format code
```

### Default User Accounts
The system comes with pre-configured test accounts:
- **Admin**: Management and oversight
- **Provider**: Nuclear fuel providers
- **Supplier**: Material suppliers
- **Importer**: Import/export operations
- **Security**: Security validations

## 📜 Smart Contracts

### Users Contract
Manages user registration and role-based access control.

**Key Functions:**
- `createUser()` - Register new users
- `getUserByAccountHash()` - Retrieve user by address
- `updateUser()` - Update user information

### Orders Contract
Handles nuclear fuel order lifecycle management.

**Key Functions:**
- `createOrder()` - Create new orders
- `updateOrder()` - Update order status
- `deleteOrder()` - Remove orders

**Order States:**
- Order Status: Provider, Importer, Supplier, Security approvals
- Payment Status: Multi-party payment tracking
- Security Status: Security validation milestones
- Delivery Status: Location and ETA tracking

## 📁 Project Structure

```
├── contracts/           # Solidity smart contracts
│   ├── Users.sol       # User management
│   ├── Orders.sol      # Order management
│   ├── Products.sol    # Product definitions
│   └── Categories.sol  # Material categories
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   ├── global-states/ # Redux store and slices
│   ├── data/          # Contract interaction logic
│   └── utils/         # Utility functions
├── migrations/        # Truffle deployment scripts
├── build/            # Compiled contract artifacts
└── public/           # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Follow conventional commit messages
- Ensure all lints pass

## 🔒 Security

### Smart Contract Security
- All contracts use Solidity ^0.8.13 with built-in overflow protection
- Role-based access control implemented
- Input validation and error handling
- Event logging for audit trails

### Frontend Security
- MetaMask integration for secure wallet connections
- Input sanitization and validation
- Secure API communication with blockchain

### Best Practices
- Never share private keys
- Use hardware wallets for production
- Regular security audits
- Keep dependencies updated

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

### Documentation
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Truffle Documentation](https://trufflesuite.com/docs/truffle/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Tools & Frameworks
- [MetaMask](https://metamask.io/) - Ethereum wallet
- [Ganache](https://trufflesuite.com/ganache/) - Personal blockchain
- [Remix IDE](https://remix.ethereum.org/) - Online Solidity IDE
- [Etherscan](https://etherscan.io/) - Blockchain explorer
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract library

### Learning Resources
- [Ethereum.org](https://ethereum.org/developers/) - Ethereum developer resources
- [CryptoZombies](https://cryptozombies.io/) - Learn Solidity
- [Buildspace](https://buildspace.so/) - Web3 development courses
- [Web3 University](https://www.web3.university/) - Comprehensive Web3 guide

### Community
- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- [r/ethereum](https://reddit.com/r/ethereum)
- [Ethereum Developer Discord](https://discord.gg/ethereum-org)

---

**⚡ Built with ❤️ for a secure and transparent nuclear fuel supply chain**