DROP DATABASE IF EXISTS Meals;

CREATE DATABASE Meals;

CREATE TABLE recipe (
  idRec INT NOT NULL AUTO_INCREMENT,
  nameRec VARCHAR(255) NOT NULL,
  imageRec VARCHAR(255) NOT NULL,
  areaRec VARCHAR(20),
  idCat INT,
  PRIMARY KEY (idRec),
  FOREIGN KEY (idCat) REFERENCES category (idCat) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ingredient (
  idIngre INT NOT NULL AUTO_INCREMENT,
  nameIngre VARCHAR(255) NOT NULL,
  PRIMARY KEY (idIngre),
);

CREATE TABLE Instruction (
  idInstru INT NOT NULL AUTO_INCREMENT,
  nameInstru VARCHAR(255),
  step INT,
  idRec INT,
  PRIMARY KEY (idInstru),
  FOREIGN KEY (idRec) REFERENCES recipe (idRec) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE category (
  idCat INT NOT NULL AUTO_INCREMENT,
  nameCat VARCHAR(255),
  PRIMARY KEY (idCat)
);

CREATE TABLE belongTo (
  idRec INT,
  idIngre INT,
  quantity INT,
  unit VARCHAR(255),
  PRIMARY KEY (idRec, idIngre),
  FOREIGN KEY (idRec) REFERENCES recipe (idRec) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idIngre) REFERENCES ingredient (idIngre) ON DELETE CASCADE ON UPDATE CASCADE
);

-- initialisation

INSERT INTO category (nameCat)
VALUES
  ('Plat principal'),
  ('Dessert'),
  ('Entrée'),
  ('Boisson');
INSERT INTO ingredient (nameIngre, idCat)
VALUES
  ('Poulet', 1),
  ('Riz', 1),
  ('Légumes', 1),
  ('Fruits', 2),
  ('Chocolat', 2),
  ('Farine', 3),
  ('Oeufs', 3),
  ('Lait', 4),
  ('Jus de fruit', 4);
INSERT INTO recipe (nameRec, imageRec, areaRec,idCat)
VALUES
  ('Poulet au riz', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'cameroun',  1),
  ('Gâteau au chocolat', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'senegal', 2),
  ('Crêpes', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'maroc', 3),
  ('Smoothie aux fruits', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'cote Ivoire', 4);   
INSERT INTO Instruction (step, nameInstru, idRec)
VALUES
  (1, 'Couper le poulet en morceaux.', 1),
  (2, 'Faire cuire le riz.', 1),
  (3, 'Faire revenir les légumes.', 1),
  (4, 'Mélanger le poulet, le riz et les légumes.', 1),
  (5, 'Faire fondre le chocolat.', 2),
  (6, 'Fouetter les oeufs et le sucre.'),
  (7, 'Mélanger le chocolat fondu aux oeufs et au sucre.', 2),
  (8, 'Verser la pâte dans un moule à gâteau.', 2),
  (9, 'Cuire au four.', 2),
  (10, 'Mélanger la farine, les oeufs et le lait.', 3),
  (11, 'Faire chauffer une poêle à feu moyen.', 3),
  (12, 'Verser une louche de pâte dans la poêle.', 3),
  (13, 'Cuire la crêpe des deux côtés.', 3),  