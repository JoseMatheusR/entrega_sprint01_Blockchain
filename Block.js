const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.nounce = 0;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.hashfunction();
    }

    hashfunction() {
        return SHA256(this.nounce + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(difficulty) {
        while (!this.isHashValid(difficulty)) {
            this.nounce += 1;
            this.hash = this.hashfunction();
        }
    }

    isHashValid(dificuldade) {
        if (!this.hash) return false; 
        for (let i = 0; i < dificuldade; i++) {
            if (this.hash[i] !== "0") {  
                return false;
            }
        }
        return true;
    }

}

module.exports.Block = Block