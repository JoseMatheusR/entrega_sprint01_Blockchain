class Transaction {
    constructor(origin, quantity, currency, destination) {
        this.origin = origin;
        this.quantity = quantity;
        this.currency = currency;
        this.destination = destination;
    }
}

module.exports.Transaction = Transaction


