import { state } from "./state";

(function main() {
  const contenedor = document.querySelector(".root");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="buscando-productos">
      <input type="text" class="id" placeholder="id">
      <button class="buscar-producto">Buscar un producto</button>
  
      <div class="linea-negra"></div>
      <button class="find-all">Obtener todos los productos actuales</button>
    </div>



    <div class="linea-negra"></div>

    <div class="creando-productos buscando-producto">
        <input type="text" class="title" placeholder="Ingrese titulo">
        <input type="text" class="price" placeholder="Ingrese precio">
        <input type="text" class="stock" placeholder="Ingrese el stock">
        <button class="crear">Crear producto en la base de datos</button>
    </div>
    <div class="product"></div>
    <div class="todos-products"></div>

    <style>
        .creando-productos, .buscando-productos{
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
        }
        .linea-negra{
          width: 100%; 
          background-color:black;
          height: 2px;
          margin:10px 0;
        }
    </style>
  `;
  //
  contenedor.appendChild(div);
  buscarProducto();
  crearProducto();
  findAll();
})();

function buscarProducto() {
  const contenedor = document.querySelector(".root");
  const buscarProducto = document.querySelector(".buscar-producto");
  buscarProducto.addEventListener("click", (e) => {
    e.preventDefault();
    const currentState = state.getState();
    const idProduct = document.querySelector(".id") as HTMLInputElement;
    const valorId = idProduct.value;
    currentState.idProduct = valorId;
    state.setState(currentState);
    state.getProduct(() => {
      const currentState = state.getState();
      const product = document.querySelector(".product") as HTMLDivElement;
      const productoEncontrado = currentState.product;
      product.textContent = `Title:${productoEncontrado.title}, Precio: ${productoEncontrado.price}, Stock: ${productoEncontrado.stock}`;
      contenedor.appendChild(product);
    });
  });
}

function crearProducto() {
  const contenedor = document.querySelector(".root");
  const buttonCrear = document.querySelector(".crear");
  buttonCrear.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector(".title") as HTMLInputElement;
    const price = document.querySelector(".price") as HTMLInputElement;
    const stock = document.querySelector(".stock") as HTMLInputElement;
    const currentState = state.getState();
    currentState.title = title.value;
    currentState.price = price.value;
    currentState.stock = stock.value;
    state.setState(currentState);
    state.createProduct();
    const product = document.querySelector(".product") as HTMLDivElement;
    product.textContent = "Creado con exito en la base de datos";
    contenedor.appendChild(product);
  });
}

function findAll() {
  const contenedor = document.querySelector(".root");
  const contenedorProductos = document.querySelector(".todos-products");
  const buttonAllProducts = document.querySelector(".find-all");
  buttonAllProducts.addEventListener("click", (e) => {
    e.preventDefault();
    state.getProducts(() => {
      const currentState = state.getState();
      const products = currentState.allProducts;
      products.forEach((item) => {
        const itemDeLista = document.createElement("li");
        itemDeLista.innerHTML = `
        Titulo:${item.title} 
        Precio:${item.price}
        Stock:${item.stock}
        <br>
        <br>
      `;
        contenedorProductos.appendChild(itemDeLista);
      });
      contenedor.appendChild(contenedorProductos);
    });
  });
}
