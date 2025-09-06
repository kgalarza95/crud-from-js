const form = document.getElementById('formUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const mensaje = document.getElementById('mensaje');
const btnLimpiar = document.getElementById('btnLimpiar');

let usuarios = [];
let editIndex = null;

// Mostrar mensaje
function mostrarMensaje(texto, tipo = "info") {
    mensaje.innerText = texto;
    mensaje.style.display = "block";
    mensaje.style.background = tipo === "error" ? "#e74c3c" : "#2ecc71";
    setTimeout(() => mensaje.style.display = "none", 3000);
}

// Agregar o editar usuario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nombre || !edad || !email) {
        mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }

    if (editIndex === null) {
        usuarios.push({ nombre, edad, email });
        mostrarMensaje("Usuario agregado correctamente");
    } else {
        usuarios[editIndex] = { nombre, edad, email };
        mostrarMensaje("Usuario editado correctamente");
        editIndex = null;
    }

    form.reset();
    mostrarUsuarios();
});

// Limpiar formulario
btnLimpiar.addEventListener('click', () => {
    form.reset();
    editIndex = null;
});

// Mostrar usuarios en tabla
function mostrarUsuarios() {
    tablaUsuarios.innerHTML = "";
    usuarios.forEach((user, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.edad}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editarUsuario(${index})">Editar</button>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;
        tablaUsuarios.appendChild(fila);
    });
}

// Editar usuario
window.editarUsuario = (index) => {
    const user = usuarios[index];
    document.getElementById('nombre').value = user.nombre;
    document.getElementById('edad').value = user.edad;
    document.getElementById('email').value = user.email;
    editIndex = index;
};

// Eliminar usuario
window.eliminarUsuario = (index) => {
    usuarios.splice(index, 1);
    mostrarUsuarios();
    mostrarMensaje("Usuario eliminado correctamente");
};
