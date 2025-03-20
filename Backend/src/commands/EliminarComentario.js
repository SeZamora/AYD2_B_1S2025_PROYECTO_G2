class EliminarComentarioCommand {
    constructor(service, id_resenia) {
        this.service = service;
        this.id_resenia = id_resenia;
    }

    async execute() {
        return await this.service.deleteResenia(this.id_resenia);
    }
}

module.exports = { EliminarComentarioCommand };
