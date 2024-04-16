

const msSQL = require("mssql");

const config = {
    user: "raskunet",
    password: "msserver123",
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
// connect.then(async query => {
//     let result = await query.query('SELECT * FROM Orders;')
//     console.log(result);
// })

module.exports = { msSQL, sqlCon };
