import { json } from "sequelize";

const myUrl = "http://localhost:3000/";

const state = {
  data: {
    title: "",
    price: "",
    stock: "",
    product: "",
    updateProduct: {},
    idProduct: "",
    allProducts: "",
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    console.log("El state ha cambiado", this.data);
  },

  createProduct() {
    const currentState = this.getState();
    fetch(myUrl + "products", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: currentState.title,
        price: currentState.price,
        stock: currentState.stock,
      }),
    });
    try {
      console.log("producto creado");
    } catch (error) {
      console.log("Ocurrio un problema", error);
    }
  },

  getProducts(callback) {
    const currentState = this.getState();
    fetch(myUrl + "products")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (callback) {
          currentState.allProducts = data;
          console.log(data);
          callback();
        }
      });
  },

  getProduct(callback) {
    const currentState = this.getState();
    const idProduct = currentState.idProduct;
    fetch(myUrl + "products/" + idProduct)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (callback) {
          console.log(data);
          currentState.product = data;
          callback();
        }
      });
  },
  updateProduct() {
    const currentState = this.getState();
    fetch(myUrl + "products/" + currentState.idProduct, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentState.updateProduct),
    });
    try {
      console.log("Actualizado con exito");
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  },

  deleteProduct() {
    const currentState = this.getState();
    fetch(myUrl + "products/" + currentState.idProduct)
      .then((resp) => resp.json())
      .then(() => {
        console.log("Eliminado con exito");
      });
  },
};

export { state };
