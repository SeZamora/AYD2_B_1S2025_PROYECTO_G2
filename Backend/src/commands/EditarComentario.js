class EditarComentarioCommand {
    constructor(service, id_resenia, reviewData) {
        this.service = service;
        this.id_resenia = id_resenia;
        this.reviewData = reviewData;
    }

    async execute() {
        return await this.service.updateResenia(this.id_resenia, this.reviewData);
    }
}

module.exports = { EditarComentarioCommand };
