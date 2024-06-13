// Clase Tarea que representa una tarea con una descripción y un estado de completada
class Tarea {
  constructor(descripcion) {
    this.descripcion = descripcion;
    this.completada = false;
  }

  completar() {
    this.completada = true;
  }

  toString() {
    return this.descripcion + (this.completada ? " (completada)" : " (pendiente)");
  }
}

// Mostrar el menú de opciones y validar que el usuario elija una opción válida
function mostrarMenu(nombreUsuario) {
  // Objeto que contiene las opciones del menú de la aplicación
  // Permite la escalabilidad de la aplicación al poder agregar más opciones
  // de manera ordenada.
  const menu = {
    0: "Salir",
    1: "Consultar tareas",
    2: "Agregar tarea",
    3: "Borrar tarea",
  };

  const menuString = Object.keys(menu)
  .map((key) => `${key}. ${menu[key]}`)
  .join('\n');

  // Mostramos el prompt con el menú formateado
  let opcionUsuario = Number(
    prompt(nombreUsuario + "\nElige una opción:\n" + menuString)
  );

  while (isNaN(opcionUsuario) || opcionUsuario < 0 || opcionUsuario > menu.length - 1) {
    opcionUsuario = Number(
      prompt(nombreUsuario + "\nElige una opción válida:\n" + menuString)
    );
  }

  return opcionUsuario;
}

function capturarUsuario() {
  // Obtener el nombre del usuario evaluando que no sea un string vacío o null
  let nombreUsuario = prompt("Ingresa tu nombre: ");
  while (nombreUsuario === null || nombreUsuario.trim() === "") {
    nombreUsuario = prompt("Ingresa un nombre válido: ");
  }

  return nombreUsuario.trim();
}

function mostrarTareas(tareas) {
  // Regresa un string para poder representar las tareas registradas en forma de lista
  let tareasRegistradas = "Tareas registradas: \n";
  for (let i = 0; i < tareas.length; i++) {
    tareasRegistradas += (i + 1).toString() + ". " + tareas[i].toString() + "\n";
  }

  return tareasRegistradas;
}

let tareas = [];

let nombreUsuario = capturarUsuario();
let opcion = mostrarMenu(nombreUsuario);

// Se usó un while true ya que las indicaciones del profesor indican
// que el usuario no necesita dar recargar para continuar con la
// ejecución del programa
while (true) {
  switch (opcion) {
    case 0:
      // Salir
      alert("Hasta luego " + nombreUsuario + "!!!");
      nombreUsuario = "";
      break;
    case 1:
      // Consultar tareas
      if (tareas.length === 0) {
        alert("No hay tareas registradas");
      } else {
        let tareasRegistradas = mostrarTareas(tareas);
        alert(tareasRegistradas);
      }
      break;
    case 2:
      // Agregar tarea
      let nuevaTarea = prompt("Ingresa la tarea: ");
      while (nuevaTarea !== null && nuevaTarea.trim() === "") {
        nuevaTarea = prompt("Ingresa la tarea: ");
      }
      if (nuevaTarea !== null) {
        const tarea = new Tarea(nuevaTarea.trim());
        tareas.push(tarea);
        alert("Tarea registrada con éxito");
      }
      break;
    case 3:
      // Borrar tarea
      if (tareas.length === 0) {
        alert("No hay tareas registradas");
      } else {
        let tareasRegistradas = mostrarTareas(tareas) + "0. Cancelar\n";
        let tareaABorrar = Number(
          prompt(tareasRegistradas + "Ingresa el número de la tarea a borrar: ")
        );
        while (
          isNaN(tareaABorrar) ||
          tareaABorrar < 0 ||
          tareaABorrar > tareas.length
        ) {
          tareaABorrar = Number(
            prompt(
              tareasRegistradas +
                "Ingresa un número válido de la tarea a borrar: "
            )
          );
        }

        if (tareaABorrar !== 0) {
          tareas.splice(tareaABorrar - 1, 1);
          alert("Tarea borrada con éxito");
        }
      }
      break;
    default:
      alert("Opción no válida!!!");
      break;
  }

  if (nombreUsuario === "") {
    nombreUsuario = capturarUsuario();
  }

  opcion = mostrarMenu(nombreUsuario);
}
