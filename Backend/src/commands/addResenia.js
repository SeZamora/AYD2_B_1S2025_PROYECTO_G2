class AddReseniaCommand {
    constructor(service, reviewData) {
        this.service = service;
        this.reviewData = reviewData;
    }

    async execute() {
        return await this.service.addResenia(this.reviewData);
    }
}

module.exports = { AddReseniaCommand };
