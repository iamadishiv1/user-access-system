require('dotenv').config(); 

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Loser980@',
    database: process.env.DB_NAME || 'user_access_system',
    synchronize: true,
    logging: false,
    entities: [
        'models/*.js'
    ],
    migrations: [
        'migrations/*.js'
    ],
    subscribers: [],
    cli: {
        entitiesDir: 'models',
        migrationsDir: 'migrations',
    },
};