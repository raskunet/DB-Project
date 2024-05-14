

const msSQL = require("mssql");

const config = {
    user: "sa",
    password: "12345678a",
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
    database: "webData",
    trustServerCertificate: true,
};


async function pool() {
    let pool;
    try {
        pool = await msSQL.connect(config);
        return pool;
    } catch (err) {
        console.log(err);
    }
}

let sqlCon = pool();
// sqlCon.then(async query => {
//     let result = await query.query('SELECT * From Users;')
//     console.log(result);
// })

module.exports = { msSQL, sqlCon };
