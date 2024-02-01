var express = require("express");
var router = express.Router();
let connection = require("../config/bd_connect");


router.get('/:idRec', function (req, res, next) {
  console.log("working");

  const idRec = req.params.idRec
  console.log("idRec", idRec);

  const query2 = `
  select * from Instruction where idRec = ${idRec};
 `;

//  select  recipe.nameRec,   recipe.imageRec, recipe.areaRec,   category.nameCat,   Instruction.step,   Instruction.nameInstru,   ingredient.nameIngre,
//  belongTo.quantity, belongTo.unit  FROM recipe INNER JOIN category  ON recipe.idCat = category.idCat INNER JOIN Instruction  ON recipe.idRec = Instruction.idRec INNER JOIN belongTo
// ON recipe.idRec = belongTo.idRec INNER JOIN ingredient  ON belongTo.idIngre = ingredient.idIngre WHERE recipe.idRec = ${idRec};
  connection.query(query2, (err, data) => {
    if (err) {
      next(err)
    } else {
      if ((data.length === 0)) {
        let error = new Error(`meal with that id not found`)
        error.status = 404;
        console.log(data);
        console.log(error);
        return res.status(404).send(error);
      } else {
        res.send(data)
      }   }
  })
});
router.get("/", function (req, res, next) {
  const getquery = `select  recipe.idRec,nameRec,areaRec,imageRec,category.nameCat, Instruction.nameInstru, Instruction.step from recipe  join category on
  recipe.idCat = category.idCat
  join Instruction on recipe.idRec= Instruction.idRec
  ;`
  connection.query(getquery, (err, data) => {
      if (data.length === 0) {
        let err = new Error(`Meal is not found`);
        err.status = 404;
        res.send(err);
        next(err);
      } else {
        res.send(data[0]);
      }
  });

})



// router.post("/", function (req, res, next) {
//   const recipeQuery = `INSERT INTO recipe (nameRec, imageRec, areaRec, idCat)
//   VALUES ('Gâteau a la banane', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'France', 1);`
//   const ingreQuery = `INSERT INTO ingredient (nameIngre)
//   VALUES ('Farine');`
//   const instruQuery = `INSERT INTO instruction (nameInstru, step, idRec)
//   VALUES ('Mélanger la farine, le chocolat et les autres ingrédients dans un bol.', 2, 1);`
//   const catQuery = `INSERT INTO category (nameCat)
//   VALUES ('Desserts');`
//   const belongToQuery = `INSERT INTO belongTo (idIngre, idRec, quantity, unit)
//   VALUES (2, 1, 6, 'tasse');`
//   connection.query(recipeQuery, ingreQuery[instruQuery], catQuery, belongToQuery, (err, data) => {
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
  const createQuery = `DELETE m FROM recipe m INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo 
  mi ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec = ${idRec};`;
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


module.exports = router;
