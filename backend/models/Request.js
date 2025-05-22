const { EntitySchema } = require(' typeorm ' );

module.exports = new EntitySchema({
    name: 'Request',
    tableName: 'requests',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        accessType: {
            type: 'varchar',
        },

        reason: {
            type: 'text',
        },

        status: {
            type: 'varchar',
            default: 'pending',
        }
    },

    relations: {
        user: {
            target: 'User',
            type: 'many-to-one',
            joinColumn: true
        },
        software: {
            target: 'Software',
            type: 'many-to-one',
            joinColumn: true
        }
    }
});