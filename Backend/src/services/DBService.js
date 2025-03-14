import mysql from 'mysql2/promise';

// Implementación de Singleton para la conexión con la base de datos
class DBService {
    static instance;

    constructor() {
        if (DBService.instance) {
            return DBService.instance;
        }

        this.initDB();
        DBService.instance = this;
    }

    async initDB() {
        const hosts = ['localhost', 'database'];
        for (const host of hosts) {
            try {
                this.pool = mysql.createPool({
                    host,
                    user: 'root',
                    password: 'root',
                    database: 'ayd2_proyecto',
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                });

                // Test the connection
                await this.pool.getConnection().then(conn => conn.release());

                console.log(`Connected to MySQL on host: ${host}`);
                return;
            } catch (error) {
                console.error(`Failed to connect to MySQL on host: ${host}`);
            }
        }

        throw new Error('Could not connect to any MySQL host');
    }

    async query(sql, params) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }

    async close() {
        await this.pool.end();
    }
}

// Proxy para interceptar las llamadas y garantizar el acceso único a la instancia
class DBServiceProxy {
    constructor() {
        if (!DBServiceProxy.instance) {
            DBServiceProxy.instance = new DBService();
        }

        return DBServiceProxy.instance;
    }

    async query(sql, params) {
        console.log('Proxy: Ejecutando consulta');
        return await DBServiceProxy.instance.query(sql, params);
    }

    async close() {
        console.log('Proxy: Cerrando conexión');
        return await DBServiceProxy.instance.close();
    }
}

export default new DBServiceProxy();
