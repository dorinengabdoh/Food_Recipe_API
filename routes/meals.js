var express = require('express')
var router = express.Router()
// var model = require('../model');
let connection = require("../config/bd_connect");
const createError = require('http-errors');



router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(req.params.id)
  console.log(res.statusCode)
  const query = `select * from recipe where id=${id}`;
  connection.query(query, (err, data) => {
    if (err) {
      if (err.message === "not found")
        next();
      else next(err);
    } else {
      if ((data.length === 0)) {
        let err = new Error(`Meal with id ${id} not found`);
        err.status = 404;
        res.send(err);
        next(err)
      } else {
        res.send(data[0])
      }
      res.send(data[0])
      // connection.destroy()
    }
  })
});

// router.post('/', function (req, res, next) {
//   const { brand, color } = req.body;
//   console.log(req.body);
//   const createQuery = `insert into bicycles (brand, color) value("${brand}","${color}")`
//   connection.query(createQuery, (err, data) => {
//     if (err) next(err)
//     else res.status(201).send({ id: data.insertId })
//   })
// })

// router.post('/:id/update', function (req, res, next) {
//   const id = req.params.id;
//   console.log(req.body);
//   const createQuery = `update bicycles set immatriculation = "000000pt" where id =${id}`
//   connection.query(createQuery, (err, data) => {
//     if (err) next(err)
//     else res.status(201).send(data)
//   })
// })


// router.put('/:id', function (req, res, next) {
//   const createQuery = `alter table bicycles add column (immatriculation varchar(20), weight int)`;
//   connection.query(createQuery, (err, data) => {
//     if (err) {
//       console.log(err);
//       if (err.message === "not found") next()
//       else {
//         next()
//       }
//     }
//     else res.send(data)
//   })
// })



// router.delete('/:id', function (req, res, next) {
//   const id = req.params.id;
//   console.log(req.body);
//   const createQuery = `delete  from bicycles where id =${id};`
//   connection.query(createQuery, (err, data) => {
//     if (err) {
//       console.log(err);
//       if (err.message === "not found") next()
//       else {
//         next()
//       }
//     }
//     else res.send(data)
//   })
// })





module.exports = router;