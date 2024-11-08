const { format } = require('date-fns');
const { Block } = require('./Block');
const {Transaction} = require("./Transaction.js");
const EC = require ('elliptic').ec
const ec = new EC('secp256k1')

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.reward = 10;
        this.addressPattern = /^zezo.{46}$/
    }

    createGenesis() {
        return new Block(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'), [], "0"); 
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(rewardAddress) {
        const rewardTransaction = new Transaction(null, this.reward, "Bitcoin", rewardAddress);
        console.log("Mining Block...");
        this.pendingTransactions.push(rewardTransaction);

        let block = new Block(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'), this.pendingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined');
  
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    createTransaction(transaction) {
        if (!transaction.destination || transaction.quantity <= 0) {
            throw new Error('Invalid transaction');
        } 
        console.log("validating address...")
        if(!this.addressPattern.test(transaction.origin) || !this.addressPattern.test(transaction.destination)){
            throw new Error('Invalid Address');     
        }
        this.pendingTransactions.push(transaction);
        console.log("Transaction successfully created")
    }

    createNewAddress(){
        const key = ec.genKeyPair();
        return 'zezo' + key.getPublic('hex').slice(0, 46);
    }

    getUserTransactions(userAddress) {
        const transactions = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.origin === userAddress || tx.destination === userAddress) {
                    transactions.push(tx);
                }
            }
        }

        return transactions;
    }

    isAddressValid(address){
        return this.addressPattern.test(address);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;  
            }
            if (currentBlock.hash !== currentBlock.hashfunction()) {
                return false;
            }
        }
        return true;
    }
}

module.exports.Blockchain = Blockchain