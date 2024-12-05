//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaACursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito =[];


AgregarEventListener();
function AgregarEventListener(){
    //cuando agregas un curso presionando "agregar"
    listaACursos.addEventListener('click', agregarcurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarDatos);

    //vaciar carrito

    vaciarCarritoBtn.addEventListener('click', ()=>{

        articulosCarrito = [];
        limpiarHTML();
    })
};

//funciones

function agregarcurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const CursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatos(CursoSeleccionado);
    }
};

//elimina dato

function eliminarDatos(e){

    if(e.target.classList.contains('borrar-curso')){

        const cursoid= e.target.getAttribute('data-id');

        //elimina del arreglo por id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoid);
        console.log(articulosCarrito);
        carritoHTML();//iterar sobre el carrito
    }
}

//leer y extraer html

function LeerDatos(curso){
    console.log(curso);

    //crear un objeto con el contenido

    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        
    }
console.log(infoCurso);
//revisar elemetos duplicados en el carrito

const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if(existe){

    //actulizamos cantidad
    const cursos = articulosCarrito.map( curso =>{

        if(curso.id === infoCurso.id){

            curso.cantidad++;
            return curso;//retorna objeto actualizado
        }
        else{
            return curso;//retorna no duplicados

        }
    });
    articulosCarrito = [...cursos]
    
}
else{
    //agregar al arreglo del carrito

articulosCarrito = [...articulosCarrito, infoCurso];
}


console.log(articulosCarrito);

carritoHTML();
}

//muestra el carrito en el html

function carritoHTML(){

    //limpiar HTML
    limpiarHTML();

    //recorre y genera HTML
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo};</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
                    <a href="#" class="borrar-curso" data-id="${id}" >X</a>
            </td>
        `;




        //agrega el html en el tbody

        contenedorCarrito.appendChild(row);

    });
};


//Elimina los cursos de tbody

function limpiarHTML(){

    while(contenedorCarrito.firstChild){

        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        
    }
   

}