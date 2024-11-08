const {Transaction} = require("./Transaction.js");
const {Block} = require("./Block.js");
const {Blockchain} = require("./Blockchain.js");

let testezada = new Blockchain();

let userAddresses = [];
for(i = 0; i < 10; i++){
    userAddresses.push(testezada.createNewAddress());
}

new Transaction();
testezada.createTransaction(new Transaction(userAddresses[0], 15, "bitcoin", userAddresses[1]));
testezada.createTransaction(new Transaction(userAddresses[0], 20, "bitcoin", userAddresses[2]));
testezada.createTransaction(new Transaction(userAddresses[5], 2, "bitcoin", userAddresses[6]));
testezada.createTransaction(new Transaction(userAddresses[3], 13, "bitcoin", userAddresses[0]));
testezada.minePendingTransactions(userAddresses[9]);
testezada.createTransaction(new Transaction(userAddresses[2], 16, "bitcoin", userAddresses[0]));
testezada.createTransaction(new Transaction(userAddresses[7], 27, "bitcoin", userAddresses[0]));
testezada.minePendingTransactions(userAddresses[9]);
testezada.createTransaction(new Transaction(userAddresses[6], 20, "bitcoin", userAddresses[7]));
testezada.minePendingTransactions(userAddresses[9]);

testezada.chain.forEach((block, index) => {
    console.log(`\nBlock ${index} \n[Timestamp: ${block.timestamp} \nNounce: ${block.nounce}\nHash: ${block.hash} \nPrevious Hash: ${block.previousHash}]`);
    block.transactions.forEach((tx, txIndex) => {
        console.log(  `Transaction: ${txIndex + 1}: ${tx.origin || 'Mining Reward'} -> ${tx.destination} | ${tx.quantity} ${tx.currency}`);
    });
});
console.log("\n\ntransações do úsuario 0:\n")
console.log(testezada.getUserTransactions(userAddresses[0]));



