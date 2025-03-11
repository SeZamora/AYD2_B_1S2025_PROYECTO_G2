import mysql from 'mysql2/promise';

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

export default new DBService();
