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
  while (nombreUsuario.trim() === "" || nombreUsuario === null) {
    nombreUsuario = prompt("Ingresa un nombre válido: ");
  }

  return nombreUsuario;
}

let tareas = [];

let nombreUsuario = capturarUsuario();
let opcion = mostrarMenu(nombreUsuario);

while (true) {
  switch (opcion) {
    case 1:
      // Consultar tareas
      if (tareas.length === 0) {
        alert("No hay tareas registradas");
      } else {
        let tareasRegistradas = "Tareas registradas: \n";
        for (let i = 0; i < tareas.length; i++) {
          tareasRegistradas += (i + 1).toString() + ". " + tareas[i] + "\n";
        }
        alert(tareasRegistradas);
      }
      break;
    case 2:
      // Agregar tarea
      let nuevaTarea = prompt("Ingresa la tarea: ");
      while (nuevaTarea.trim() === "") {
        nuevaTarea = prompt("Ingresa la tarea: ");
      }
      tareas.push(nuevaTarea);
      alert("Tarea registrada con éxito");
      break;
    case 3:
      // Borrar tarea
      if (tareas.length === 0) {
        alert("No hay tareas registradas");
      } else {
        let tareasRegistradas = "Tareas registradas: \n";
        for (let i = 0; i < tareas.length; i++) {
          tareasRegistradas += (i + 1).toString() + ". " + tareas[i] + "\n";
        }
        let tareaABorrar = Number(
          prompt(tareasRegistradas + "Ingresa el número de la tarea a borrar: ")
        );
        while (
          isNaN(tareaABorrar) ||
          tareaABorrar < 1 ||
          tareaABorrar > tareas.length
        ) {
          tareaABorrar = Number(
            prompt(
              tareasRegistradas +
                "Ingresa un número válido de la tarea a borrar: "
            )
          );
        }
        let arrSinTareaBorrada = [];
        for (let i = 0; i < tareas.length; i++) {
          if (i !== tareaABorrar - 1) {
            arrSinTareaBorrada.push(tareas[i]);
          }
        }
        console.log(arrSinTareaBorrada);
        tareas = Array.from(arrSinTareaBorrada);
        alert("Tarea borrada con éxito");
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
