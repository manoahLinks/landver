# Getting Started with LandVer: Your Comprehensive Guide

Welcome to LandVer, a decentralized land registration and verification protocol on Starknet. This guide helps you set up and use LandVer, tailored for developers and end-users.

## Table of Contents

1. **Prerequisites**
2. **Installation & Setup**
    * **Developers:** Clone, Dependencies, Run (Client/Landing, Contracts)
    * **End-Users:** Wallet, Demo Site
3. **Basic Usage**
    * **End-Users:** Connect, Register, Verify
    * **Developers:** Smart Contracts
4. **Project Flow Diagram**
5. **Environment Variables (Developers)**
6. **Troubleshooting**
7. **Contributing (Developers)**

## 1. Prerequisites

* **Developers:** scarb, snfoundry, npm, Rust, Git
* **End-Users:** Starknet wallet (Argent X, Braavos)

## 2. Installation & Setup

### Developers

1. **Clone:** `git clone https://github.com/NoshonNetworks/landver.git && cd landver`
2. **Dependencies:** `cd app/client && pnpm install` or `landing_page && npm install`, `cd ../land_registry && scarb build`
3. **Run:** `cd app/client && pnpm run dev` or `landing_page && npm run dev`, `cd land_registry && scarb test`

### End-Users

1. Install a Starknet wallet.
2. Go to [demo.landver.net](demo.landver.net).

## 3. Basic Usage

### End-Users

1. **Connect:** Go to [demo.landver.net](demo.landver.net), click "Connect Wallet," select and approve.
2. **Register:** Land Owner dashboard, fill details, submit, confirm, get NFT.
3. **Verify:** Land Inspector dashboard, use tools to verify.

### Developers

* **Contracts:** Use `scarb`, `snfoundry` in `land_registry/`.

## 4. Project Flow Diagram

![LandVer Flowchart](about:sanitized)

## 5. Environment Variables (Developers)

Use `.env.local` or `.env` in `app/client` or `landing_page` for config.

## 6. Troubleshooting

* **Wallet:** Check install and connection.
* **Compile:** Verify scarb, snfoundry.
* **Frontend:** Inspect browser console.

## 7. Contributing (Developers)

See `CONTRIBUTING.md` for guidelines.