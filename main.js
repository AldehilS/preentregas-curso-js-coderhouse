function mostrarMenu(nombreUsuario) {
  // Mostrar el menú de opciones y validar que el usuario elija una opción válida
  const menu =
    "\n 1. Consultar tareas \n 2. Agregar tarea \n 3. Borrar tarea \n 4. Salir \n";

  let opcionUsuario = Number(
    prompt(nombreUsuario + "\nElige una opción: " + menu)
  );

  while (isNaN(opcionUsuario) || opcionUsuario < 1 || opcionUsuario > 4) {
    opcionUsuario = Number(
      prompt(nombreUsuario + "\nElige una opción válida: " + menu)
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
    tareasRegistradas += (i + 1).toString() + ". " + tareas[i] + "\n";
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
        tareas.push(nuevaTarea.trim());
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
    case 4:
      // Salir
      alert("Hasta luego " + nombreUsuario + "!!!");
      nombreUsuario = "";
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
