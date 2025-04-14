
# Cosmic Nexus Blockchain Project

## Overview

Cosmic Nexus is a professional-grade blockchain project that combines features from Solana (Proof of History) and Binance Smart Chain (Proof of Stake), with an innovative integration of Docker-based Virtual Machine for IA (VMIA) for distributed computing.

## Key Technologies

- **Hybrid Consensus Mechanism**: POHPOS (Proof of History + Proof of Stake)
- **VMIA Docker Integration**: Allows users to contribute computing power and earn rewards
- **DEX Platform**: Decentralized Exchange for trading Cosmic Nexus tokens
- **Admin Dashboard**: Complete oversight of blockchain operations, nodes, and performance

## Project Components

1. **Core Blockchain** (Rust implementation, in progress)
   - Consensus Engine (POHPOS)
   - Transaction Processing
   - Smart Contract Execution

2. **VMIA Docker System**
   - Containerized computing nodes
   - AI workload distribution
   - Reward mechanisms

3. **Admin Dashboard**
   - Blockchain statistics and monitoring
   - Node management
   - DEX prototype
   - CLI access

4. **Client Application**
   - Wallet connection (Solflare)
   - VMIA Docker management
   - Transaction history
   - Reward tracking

## Getting Started

### Prerequisites

- Node.js and npm
- Docker Desktop
- Solflare wallet browser extension

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cosmic-nexus.git
   cd cosmic-nexus
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the application at:
   ```
   http://localhost:5173
   ```

### Using the VMIA Docker Client

1. Install Docker on your machine
2. Navigate to the Client page in the application
3. Connect your Solflare wallet
4. Click "Download Latest Image" to get the Docker image
5. Start your Docker VMIA container
6. Monitor your contributions and rewards

## Current Status

This project is currently in prototype/development phase. The UI components are functional, but the backend blockchain implementation is still in progress.

- [x] Admin Dashboard UI
- [x] DEX Prototype UI
- [x] Client App UI
- [x] Wallet Integration
- [ ] Rust Blockchain Core
- [ ] VMIA Docker Image
- [ ] Smart Contract Platform
- [ ] Production Deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please open an issue on this repository.
