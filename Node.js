const { Blockchain } = require('./Blockchain');
const { Transaction } = require('./Transaction');

class Node {

    constructor(name) {
        this.name = name;
        this.blockchain = new Blockchain();
        this.network = []; 
        this.balances = {}; 
    }

    connectToNetwork(nodes) {
        this.network = nodes;
    }

    broadcastTransaction(transaction) {
        console.log(`[${this.name}] Broadcasting transaction...`);
        for (const node of this.network) {
            if (node !== this) {
                node.receiveTransaction(transaction);
            }
        }
    }

    broadcastBlock(block) {
        console.log(`[${this.name}] Broadcasting block...`);
        for (const node of this.network) {
            if (node !== this) {
                node.receiveBlock(block);
            }
        }
    }

    receiveTransaction(transaction) {
        console.log(`[${this.name}] Received transaction`);
        try {
            this.blockchain.createTransaction(transaction); 
        } catch (error) {
            console.error(`[${this.name}] Transaction invalid: ${error.message}`);
        }
    }

    receiveBlock(block) {
        console.log(`[${this.name}] Received block`);
        try {
            this.blockchain.validateAndAddBlock(block); 
            this.updateBalances(block); 
        } catch (error) {
            console.error(`[${this.name}] Block invalid: ${error.message}`);
        }
    }

    updateBalances(block) {
        for (const transaction of block.transactions) {
            const { origin, destination, quantity } = transaction;

            if (origin) {
                this.balances[origin] = (this.balances[origin] || 0) - quantity;
            }

            this.balances[destination] = (this.balances[destination] || 0) + quantity;
        }
    }

    getBalance(address) {
        return this.balances[address] || 0;
    }

    resolveConflicts() {
        let longestChain = this.blockchain.chain;
        let isReplaced = false;

        for (const node of this.network) {
            const otherChain = node.blockchain.chain;

            if (otherChain.length > longestChain.length && this.blockchain.isChainValid(otherChain)) {
                longestChain = otherChain;
                isReplaced = true;
            }
        }

        if (isReplaced) {
            console.log(`[${this.name}] Chain was replaced with a longer valid chain`);
            this.blockchain.chain = longestChain;
            this.recalculateBalances(); 
        } else {
            console.log(`[${this.name}] Chain is already the longest valid chain`);
        }
    }

    recalculateBalances() {
        this.balances = {}; // Reset balances

        for (const block of this.blockchain.chain) {
            this.updateBalances(block); 
        }
    }
}

module.exports.Node = Node;