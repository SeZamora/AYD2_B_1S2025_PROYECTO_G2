class Command {
    async executeCommand(command) {
        return await command.execute();
    }
}

module.exports = { Command };
