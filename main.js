const {Transaction} = require("./Transaction.js");
const {Block} = require("./Block.js");
const {Blockchain} = require("./Blockchain.js");

let testezada = new Blockchain();
new Transaction();
testezada.createTransaction(new Transaction("Matheus", 15, "bitcoin", "Sávio"));
testezada.createTransaction(new Transaction("Bea", 20, "bitcoin", "Thulio"));
testezada.createTransaction(new Transaction("Thulio", 2, "bitcoin", "Bea"));
testezada.createTransaction(new Transaction("Samuel", 13, "bitcoin", "Tigrão"));
testezada.minePendingTransactions("Steve");
testezada.createTransaction(new Transaction("Wandreus", 16, "bitcoin", "Bruno"));
testezada.createTransaction(new Transaction("Samuel", 27, "bitcoin", "Tigrão"));
testezada.minePendingTransactions("Caronte");
testezada.createTransaction(new Transaction("Isac", 20, "bitcoin", "Wandreus"));
testezada.minePendingTransactions("Chico Buarque");

testezada.chain.forEach((block, index) => {
    console.log(`\nBlock ${index} \n[Timestamp: ${block.timestamp} \nNounce: ${block.nounce}\nHash: ${block.hash} \nPrevious Hash: ${block.previousHash}]`);
    block.transactions.forEach((tx, txIndex) => {
        console.log(  `Transaction: ${txIndex + 1}: ${tx.origin || 'Mining Reward'} -> ${tx.destination} | ${tx.quantity} ${tx.currency}`);
    });
});