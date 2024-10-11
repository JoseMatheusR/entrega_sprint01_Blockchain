const { format } = require('date-fns');
const { Block } = require('./Block');
const {Transaction} = require("./Transaction.js");

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.reward = 10;
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

        let block = new Block(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'), this.pendingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined');
        this.chain.push(block);
        this.pendingTransactions = [];
        this.pendingTransactions.push(rewardTransaction);

    }

    createTransaction(transaction) {
        if (!transaction.destination || transaction.quantity <= 0) {
            throw new Error('Invalid transaction');
        }
        this.pendingTransactions.push(transaction);
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