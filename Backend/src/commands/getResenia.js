class GetReseniaCommand {
    constructor(service) {
        this.service = service;
    }

    async execute() {
        return await this.service.getAllResenias();
    }
}

module.exports = { GetReseniaCommand };
