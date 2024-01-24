let mysql = require('mysql2')
 
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) return console.log(err.message);
  console.log(`Connected to MySQL server with dbname: ${process.env.DB_NAME} succesfull`);
})



module.exports = connection;