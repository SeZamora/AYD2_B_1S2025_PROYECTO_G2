const logService = require('../services/logsService');


const getAllEmployeeLogs = async (req, res) => {
    try {
        const result = await logService.getAllEmployeeLogs();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
};


const getAllSupervisorLogs = async (req, res) => {
    try {
        const result = await logService.getAllSupervisorLogs();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }

  }


module.exports = { getAllEmployeeLogs , getAllSupervisorLogs};