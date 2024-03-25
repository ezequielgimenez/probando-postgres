import * as express from "express";
import * as cors from "cors";
import { Product } from "../db/product";
import { sequelize } from "../db";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

app.use(cors());

app.listen(port, () => {
  console.log("Escuchando en el puerto:", port);
});

app.post("/products", (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const stock = req.body.stock;
  if (sequelize.isDefined("product")) {
    sequelize.sync({ alter: true });
    const productCreate = Product.create({
      title,
      price,
      stock,
    });
    res.json("Salio todo bien, ok creado");
  } else {
    res.json("No esta definido el modelo");
  }
});

app.get("/products", (req, res) => {
  Product.findAll().then((allItems) => {
    if (allItems) {
      res.json(allItems);
    } else {
      res.json("No se encontro productos o no esta definido el modelo");
    }
  });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  Product.findOne({
    where: {
      id: productId,
    },
  }).then((item) => {
    if (item) {
      res.json(item);
    } else {
      res.json("No se encontro el producto");
    }
  });
});

app.patch("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: {
      id: id,
    },
  }).then((item) => {
    if (item) {
      res.json({ "Producto actualizado numero de filas cambiadas": item });
    } else {
      res.json(
        "No se pudo actualizar el producto o no se encontro dicho producto"
      );
    }
  });
});

app.delete("/products/:idProduct", (req, res) => {
  const idProduct = req.params.idProduct;
  Product.destroy({
    where: {
      id: idProduct,
    },
  }).then((deleted) => {
    if (deleted > 0) {
      res.json("Se ha eliminado el producto");
    } else {
      res.status(404).json("No se encontro el producto");
    }
  });
});
