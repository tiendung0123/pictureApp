// import mysql from 'mysql2'

// const connect = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     port: "3307",
//     database: "pinta"
// })

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize("pinta", "root", "1234", {
    host: "localhost",
    port: "3307",
    dialect: "mysql"
})

// Test connect
try {
    await sequelize.authenticate();
    console.log("connect success !!!")

} catch (err) {
    console.log(err)

}

export default sequelize

// yarn sequelize-auto -h localhost -d pinta -u root -x 1234 -p 3307 --dialect mysql -o models -l esm