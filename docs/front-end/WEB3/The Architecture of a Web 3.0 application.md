## A simple blogging site
**As a web 2.0 application:**

+ a place to store essential data (users, posts, tags, comments, likes, and so on), a constantly updated database
+ backend code define business logic (what happens when a new user signs up, publishes a new blog, or comments on someone else's blog)
+ frontend code define UI logic

![](/images/1661435737047-91f94d8b-5319-4c5a-a9a8-3d07b922aaa6.png)

## What makes Web 3.0 different
No Centralized database that stores the application state, and no centralized web server where the backend logic resides. Leverage blockchain to build apps on a decentralized state machine that's maintained by anonymous nodes on the internet.



**state machine**: a machine that maintains some given program state and future states allowed on that machine. Blockchains are state machines that are instantiated with some genesis state and have very strict rules (i.e., consensus) that define how that state can transition.

> No single entity controls this decentralized state machine — it is collectively maintained by everyone in the network.
>



**backend server**: can write smart contracts that define the logic of your applications and deploy them onto the decentralized state machine. Every person who wants to build a blockchain application deploys their code on this shared state machine.

![](/images/1661436900545-f75d5a97-6f78-4492-8ba3-e5b146c33f77.png)

## **A Closer Look**
### Blockchain
State changes on state machine are governed by the rules of consensus that the peers in the network follow.  it's designed to be a state machine that anyone in the world can access and write to. 

> data can only be written to the Ethereum blockchain — you can never update existing data.
>

### Smart contracts
A program that runs on the Ethereum blockchain and defines the logic behind the state changes happening on the blockchain.

![](/images/1661437405850-eaf7e2b7-8865-409f-87ea-fa6f90c91471.png)

### Ethereum Virtual Machine (EVM)
Executes the logic defined in the smart contracts and processes the state changes that happen on this globally accessible state machine. 

> EVM only understand  bytecode.
>

### Front-end
The frontend also communicates with the application logic defined in smart contracts.

## **The Frontend Code Communicate with Smart Contracts on Ethereum**
Every node in the Ethereum network keeps a copy of all states on the Ethereum state machine, including the code and data associated with every smart contract.



When we want to interact with the data and code on a blockchain, we need to interact with one of these nodes. This is because any node can broadcast a request for a transaction to be executed on the EVM. A miner will then execute the transaction and propagate the resulting state change to the rest of the network.

1. **Set up your own node which runs the Ethereum blockchain software**
2. **Use nodes provided by third-party services like **[Infura](https://infura.io/)**, **[Alchemy](https://www.alchemy.com/)**, and **[Quicknode](https://www.quicknode.com/)

![](/images/1661517039825-1609a3f2-48ee-446c-84e2-14ec642f8d75.png)

Provider implements a JSON-RPC specification,  it's a stateless, lightweight remote procedure call (RPC) protocol that defines several data structures and the rules for their processing.  It uses JSON (RFC 4627) as a data format.



Sign the transaction using your private key: submit the transaction to the blockchain.

![](/images/1661517424216-5263176e-9f72-4c66-bf65-82c1e41535a1.png)

Metamask is a tool that makes it easy for applications to handle key management and transaction signing. Metamask stores a user's private keys in the browser, and whenever the frontend needs the user to sign a transaction, it calls on Metamask.

## **Storage on the Blockchain**
Storing everything on the blockchain gets really expensive, really fast.  The user pays every time they add new data to the blockchain. That's because adding a state to the decentralized state machine increases the costs for nodes that are maintaining that state machine.



Use a decentralized off-chain storage solution, like [IPFS](https://ipfs.io/) or [Swarm](https://www.ethswarm.org/). IPFS is a distributed file system for storing and accessing data. IPFS system distributes and stores the data in a peer-to-peer network. This makes it easy for you to retrieve it when you need to.

![](/images/1661518207136-9baff93f-3168-4a84-b250-c0273334df4e.png)

We could host this code on AWS, if you want to build a truly decentralized app, you might choose to host your frontend on a decentralized storage solution, like IPFS or Swarm.

![](/images/1661518372898-6b16291c-1010-4567-a160-91533898c7ed.png)

## **Querying the Blockchain**
### Smart Contract Events
Use the Web3.js library to query and listen for smart contract events. You can listen to specific events and specify a callback every time the event is fired.

+ have to redeploy a new smart contract with new event and data
+  using callbacks to handle various UI logic gets very complex very quickly

### The Graph
[The Graph](https://thegraph.com/) is an off-chain indexing solution that makes it easier to query data on the Ethereum blockchain. 



The Graph allows you to define which smart contracts to index, which events and function calls to listen to, and how to transform incoming events into entities that your frontend logic (or whatever is using the API) can consume.

![](/images/1661519102478-730520d5-635a-42c7-89cd-a24df3e35a1b.png)

## **Scaling Your DApp**
[Polygon](https://polygon.technology/) is an L2 scaling solution. Instead of executing transactions on the main blockchain, Polygon has sidechains that process and execute transactions. A sidechain is a secondary blockchain that interfaces with the main chain. Every so often, the sidechain submits an aggregation of its recent blocks back to the primary chain.

![](/images/1661519463056-c7e80f80-7669-4a3c-bdd6-82f5dcf4e8cf.png)

![](/images/1661519554580-24d8a7e4-c2bb-4ee2-8292-0b3c9a09c413.png)

## **Cobbling It All Together**
[Hardhat](https://hardhat.org/) is a developer framework that makes it easier for Ethereum developers to build, deploy, and test their smart contracts.

+ Hardhat Network: developers can use to deploy their smart contracts onto a local network — without having to deal with live environments.
+ [plugin ecosystem](https://hardhat.org/plugins/): makes developers' lives much easier
+ console.log() functionality: similar to javascript, for debugging purposes



> quote: [https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application)
>

