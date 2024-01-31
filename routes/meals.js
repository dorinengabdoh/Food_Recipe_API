var express = require("express");
var router = express.Router();
let connection = require("../config/bd_connect");
const createError = require("http-errors");

router.get("/:idRec", function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.params.id);
  console.log(res.statusCode);
  const getquery = `
     SELECT    m.nameRec,   m.imageRec, m.areaRec,   c.nameCat AS category,   i.step,   i.nameInstru AS Instruction,   ing.nameIngre AS ingredient,
       mi.quantity, mi.unit  FROM recipe m INNER JOIN category c ON m.idCat = c.idCat INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo mi
       ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec=${idRec};
  `;
  connection.query(getquery, (err, data) => {
    console.log(data);
    if (err) {
      if (err.message === "not found") next();
      else next(err);
    } else {
      if (data.length === 0) {
        let err = new Error(`Meal with id ${idRec} not found`);
        err.status = 404;
        res.send(err);
        next(err);
      } else {
        res.send(data[0]);
      }
      res.send(data[0]);
    }
  });
});

// SELECT    m.nameRec,   m.imageRec, m.areaRec,   c.nameCat AS category,   i.step,   i.nameInstru AS Instruction,   ing.nameIngre AS ingredient,
//   mi.quantity, mi.unit  FROM recipe m INNER JOIN category c ON m.idCat = c.idCat INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo mi
//   ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec = ${idRec};

// router.post("/", function (req, res, next) {
//   const createQuery = `INSERT INTO recipe (
//     nameRec,
//     imageRec,
//     areaRec,
//     idCat,
//     ingredient_ids
//   )
//   VALUES (
//     'Nom de la recette',
//     'Description de la recette',
//     30,
//     60,
//     4,
//     (
//       SELECT id
//       FROM category
//       WHERE name = 'Catégorie de la recette'
//     ),
//     (
//       SELECT
//         ingredient.id
//       FROM ingredient
//       JOIN category
//       ON ingredient.category_id = category.id
//       WHERE category.name = 'Catégorie de la recette'
//     )
//   );`;
//   connection.query(createQuery, (err, data) => {
//     if (err) next(err);
//     else res.status(201).send({ id: data.insertId });
//   });
// });

router.put("/:idRec", function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.body);
  const createQuery = `update recipe set nameRec = "gateau simpe" where idRec=${idRec}`;
  connection.query(createQuery, (err, data) => {
    if (err) next(err);
    else res.status(201).send(data);
  });
});



router.delete("/:idRec", function (req, res, next) {
  const idRec = req.params.idRec;
  console.log(req.body);
  const createQuery = `DELETE m FROM recipe m INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo mi ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec = ${idRec};`;
  connection.query(createQuery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next();
      else {
        next();
      }
    } else res.send(data);
  });
});

// // DELETE m FROM recipe m INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo mi ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec = 1;

module.exports = router;
