var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    "host":"buwhivz519kpkjyfmtxe-mysql.services.clever-cloud.com",
    "user":"ukmmiwq2vzqa5snz",
    "password":"yNG3AVxfY5fVZDZhox4n",
    "database":"buwhivz519kpkjyfmtxe"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
