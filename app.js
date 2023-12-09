let inputNombre = document.getElementById("nombre");
let inputPuesto = document.getElementById("puesto");
let btnAgregar = document.getElementById("btnAgregar");
let formulario = document.getElementById("formulario");
let tbody = document.getElementById("tbody");

let listaEmpleados = [];

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarEmpleado(e);
});

function agregarEmpleado() {
    listaEmpleados.push({
        id: Date.now().toString(),
        nombre: inputNombre.value,
        puesto: inputPuesto.value,
    });
    renderizarTabla();
    inputNombre.value = "";
    inputPuesto.value = "";
}

inputNombre.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
    };
})
inputPuesto.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
    };
})

function renderizarTabla() {
    limpiarTabla();
    listaEmpleados.forEach((el) => {
        let fila = document.createElement("tr");
        let celdaID = document.createElement("td");
        let celdaNombre = document.createElement("td");
        let celdaPuesto = document.createElement("td");
        let celdaBotones = document.createElement("td");
        let btnEditar = document.createElement("button");
        let btnEliminar = document.createElement("button");

        tbody.appendChild(fila);
        fila.appendChild(celdaID);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuesto);
        fila.appendChild(celdaBotones);
        celdaBotones.appendChild(btnEditar);
        celdaBotones.appendChild(btnEliminar);

        btnEditar.classList.add("btn", "btn-warning", "m-2");
        btnEliminar.classList.add("btn", "btn-danger", "m-2");
        btnEditar.addEventListener("click", editarEmpleado);
        btnEliminar.addEventListener("click", eliminarEmpleado);

        celdaID.innerText = el.id;
        celdaNombre.innerText = el.nombre;
        celdaPuesto.innerText = el.puesto;
        btnEditar.innerText = "Editar";
        btnEliminar.innerText = "Eliminar";
    });
}

function limpiarTabla() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function editarEmpleado(e) {
    //movemos al inicio de la página
    window.scrollTo(0, 0);
    //acá obtenemos el ID
    let idTarget = e.target.parentNode.parentNode.firstChild.textContent;
    inputNombre.value = e.target.parentNode.parentNode.childNodes[1].textContent;
    inputPuesto.value = e.target.parentNode.parentNode.childNodes[2].textContent;
    
    let btnGuardar = document.createElement('button');
    btnGuardar.classList.add('btn', 'btn-success');
    btnGuardar.innerText = 'Guardar';
    btnAgregar.classList.add('disabled');
    formulario.appendChild(btnGuardar);
    btnGuardar.addEventListener('click', () => {
        listaEmpleados.forEach((el) => {
            if(el.id === idTarget){
                el.nombre = inputNombre.value;
                el.puesto = inputPuesto.value;
            }
        })
        inputNombre.value = '';
        inputPuesto.value = '';
        btnAgregar.classList.remove('disabled');
        formulario.removeChild(btnGuardar);
        renderizarTabla();
    });
}

function eliminarEmpleado(e) {
    //acá obtenemos el ID
    let idTarget = e.target.parentNode.parentNode.firstChild.textContent;
    listaEmpleados = listaEmpleados.filter((el) => el.id !== idTarget);
    renderizarTabla();
}
