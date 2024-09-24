//PRODUCTOS
const productos = [

    //CHAQUETAS
    {
        id: "chaqueta-01",
        titulo: "Chaqueta de moto aventura",
        imagen: "./img/chaquetas/01.jpg",
        categoria: {
            nombre: "Chaquetas",
            id: "chaquetas"
        },
        precio: 1000
    },

    {
        id: "chaqueta-02",
        titulo: "Chaqueta de moto Trail",
        imagen: "./img/chaquetas/02.jpg",
        categoria: {
            nombre: "Chaquetas",
            id: "chaquetas"
        },
        precio: 1000
    },

    {
        id: "chaqueta-03",
        titulo: "Chaqueta de moto Touring",
        imagen: "./img/chaquetas/03.jpg",
        categoria: {
            nombre: "Chaquetas",
            id: "chaquetas"
        },
        precio: 1000
    },

    {
        id: "chaqueta-04",
        titulo: "Chaqueta de moto de cuero",
        imagen: "./img/chaquetas/04.jpg",
        categoria: {
            nombre: "Chaquetas",
            id: "chaquetas"
        },
        precio: 1000
    },

   
    //PANTALONES
    {
        id:"pantalon-01",
        titulo:"Pantalon Moto Trail",
        imagen:"./img/pantalones/01.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1000
    },

    {
        id:"pantalon-02",
        titulo:"Pantalon Moto aventura",
        imagen:"./img/pantalones/02.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1000
    },

    {
        id:"pantalon-03",
        titulo:"Pantalon invierno Touring",
        imagen:"./img/pantalones/03.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1000
    },

    {
        id:"pantalon-04",
        titulo:"Pantalon Moto verano",
        imagen:"./img/pantalones/04.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1000
    },

    

    //GUANTES
    {
        id: "guangte-01",
        titulo: "Guante Invierno Cuero",
        imagen: "./img/guantes/01.jpg",
        categoria: {
            nombre: "Guantes",
            id: "guantes"
        },
        precio: 1000
    },

    {
        id: "guante-02",
        titulo: "Guante Moto Verano",
        imagen: "./img/guantes/02.jpg",
        categoria: {
            nombre: "Guantes",
            id: "guantes"
        },
        precio: 1000
    },
    
    {
        id: "guante-03",
        titulo: "Guante Moto Verano ",
        imagen: "./img/guantes/03.jpg",
        categoria: {
            nombre: "Guantes",
            id: "guantes"
        },
        precio: 1000
    },
    
    {
        id: "guante-04",
        titulo: "Guante Moto Cuero",
        imagen: "./img/guantes/04.jpg",
        categoria: {
            nombre: "Guantes",
            id: "guantes"
        },
        precio: 1000
    },
    
];  


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

       contenedorProductos.innerHTML = "";

       productosElegidos.forEach(producto => {

       const div = document.createElement("div");
       div.classList.add("producto");
       div.innerHTML = `
           <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
           <div class="producto-detalles">
               <h3 class="producto-titulo">${producto.titulo}</h3>
               <p class="producto-precio">EUR ${producto.precio}</p>
               <button class="producto-agregar" id="${producto.id}">Agregar</button>
           </div>
       `;

       contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los articulos";
            cargarProductos(productos);  
        }
        
    
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();  
}else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}








