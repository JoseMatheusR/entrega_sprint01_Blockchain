const { Blockchain } = require('./Blockchain');
const { Transaction } = require('./Transaction');
const { Node } = require('./Node');


const nodeA = new Node("NodeA");
const nodeB = new Node("NodeB");
const nodeC = new Node("NodeC");

nodeA.connectToNetwork([nodeB, nodeC]);
nodeB.connectToNetwork([nodeA, nodeC]);
nodeC.connectToNetwork([nodeA, nodeB]);


const addressA = nodeA.blockchain.createNewAddress();
const addressB = nodeB.blockchain.createNewAddress();
const addressC = nodeC.blockchain.createNewAddress();

console.log("Endereços criados:");
console.log(`Endereço A: ${addressA}`);
console.log(`Endereço B: ${addressB}`);
console.log(`Endereço C: ${addressC}`);


nodeA.broadcastTransaction(new Transaction(addressA, 100, "Bitcoin", addressB));
nodeA.broadcastTransaction(new Transaction(addressA, 50, "Bitcoin", addressC));


const block1 = nodeA.blockchain.minePendingTransactions(addressA);
console.log("\nBloco minerado por NodeA:");
console.log(block1);


nodeA.broadcastBlock(block1);


nodeB.broadcastTransaction(new Transaction(addressB, 30, "Bitcoin", addressC));
nodeB.broadcastTransaction(new Transaction(addressB, 20, "Bitcoin", addressA));

const block2 = nodeB.blockchain.minePendingTransactions(addressB);
console.log("\nBloco minerado por NodeB:");
console.log(block2);


nodeB.broadcastBlock(block2);


nodeC.resolveConflicts();


console.log("\nSaldos finais:");
console.log(`Saldo de A em NodeA: ${nodeA.getBalance(addressA)}`);
console.log(`Saldo de B em NodeB: ${nodeB.getBalance(addressB)}`);
console.log(`Saldo de C em NodeC: ${nodeC.getBalance(addressC)}`);


console.log("\nCadeias de blocos:");
console.log("NodeA:", JSON.stringify(nodeA.blockchain.chain, null, 2));
console.log("NodeB:", JSON.stringify(nodeB.blockchain.chain, null, 2));
console.log("NodeC:", JSON.stringify(nodeC.blockchain.chain, null, 2));
