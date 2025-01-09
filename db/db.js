import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        keepAlive: true,
        ssl: false,
    }
)

pool.on("connect", (client) => {
    console.log("Client connected to the database");
});

pool.off("disconnect", () => {
    console.log("Client disconnected from the database");
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});


