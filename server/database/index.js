var {Pool} = require('pg');

//postgresql://postgres:huy723027@localhost:5432/shopnme
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgres://gulocojvdcqjca:a1bf72fef57a13a56f5b945d475b6541ecda121df91875d09fd7f41071216e54@ec2-54-247-178-166.eu-west-1.compute.amazonaws.com:5432/d54jvmvbu2ro9a';
const SSL = process.env.NODE_ENV === 'production';
class Database {
    constructor() {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            idleTimeoutMillis: 30000,
            max:10,
            ssl: true
        });

        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });

    }

    query(query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });

    }

    end() {
        this._pool.end();
    }
}

module.exports = new Database();