const express = require('express'); 
const app = express()

const mysql = require('mysql')

const database = 'PTF' ; 
const dbUser = 'root' ; 
const dbpswd = '' ;  



 const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: dbUser,
    password: dbpswd,
    database: database,

    port: 3306
 })
    






db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
})




app.get('/search', (req, res) => {

   let classe = req.query.classe
   let categorie = req.query.categorie 
    

    console.log(classe + ' ' +  categorie )
    

    if (categorie) {
        db.query(`SELECT * FROM fiche WHERE categorie='${categorie}'`, (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result) {
                let formedresult = JSON.stringify(result); 
                let reformedresult = JSON.parse(formedresult)
                res.send(reformedresult[0])
            }
        })
    } 

    if (classe) {
        db.query(`SELECT * FROME fiche WHERE class='${classe}'`, (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result) {
                let formedresult = JSON.stringify(result); 
                let reformedresult = JSON.parse(formedresult)
                res.send(reformedresult[0])

            }
        })
    }
    
})

app.listen('8081', () =>  {
    console.log('Listen on port 8081');
})