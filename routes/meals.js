var express = require('express')
var router = express.Router()
let connection = require("../config/bd_connect");
const createError = require('http-errors');



router.get('/:idRec', function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.params.id)
  console.log(res.statusCode)
  const query = `select * from recipe where idRec=${idRec}`;


  connection.query(query, (err, data) => {
    if (err) {
      if (err.message === "not found")
        next();
      else next(err);
    } else {
      if ((data.length === 0)) {
        let err = new Error(`Meal with id ${idRec} not found`);
        err.status = 404;
        res.send(err);
        next(err)
      } else {
        res.send(data[0])
      }
      res.send(data[0])
    }
  })
});

router.post('/', function (req, res, next) {
  const { nameRec, instruction, mesurement,imageRec } = req.body;
  console.log(req.body);
  const createQuery = `insert into recipe (nameRec, instruction,mesurement,imageRec,idCat) values ("${nameRec}","${instruction}","${mesurement}","${imageRec}",${idCat})`
  connection.query(createQuery, (err, data) => {
    if (err) next(err)
    else res.status(201).send({ id: data.insertId})
  })
})

router.post('/:idRec/update', function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.body);
  const createQuery = `update recipe set mesurement = "2kg, 10p, 2verres" where idRec=${idRec}`;
  connection.query(createQuery, (err, data) => {
    if (err) next(err)
    else res.status(201).send(data)
  })
})


router.put('/:id', function (req, next) {
  const createQuery = `alter table recipe add column (areaRec varchar(20))`;
  connection.query(createQuery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next();
      else {
        next()
      }
    }
    else res.send(data)
  })
})



router.delete('/:idRec', function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.body);
  const createQuery = `delete  from ingredient where idRec =${idRec};`
  connection.query(createQuery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    }
    else res.send(data)
  })
})





module.exports = router;