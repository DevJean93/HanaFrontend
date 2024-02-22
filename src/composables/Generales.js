

export const  crearObjetoDropdown = (listado, propiedades,valorValue)=> {
  return listado.map((item) => {
    const label = propiedades.map((propiedad) => item[propiedad]).join(" - ");
    const value = item[valorValue]; 
    return { label, value };
  });
}


export const ValueSelectedDropdown = (objeto, propiedades, valorValue) => {

    const label = propiedades.map((propiedad) => objeto[propiedad]).join(" - ");
    const value = objeto[valorValue];
    return { label, value };
};


export const GenerarFecha = (FechaSelect)=>{
  const fecha = new Date(FechaSelect);
  const fechaFormateada =
    fecha.getFullYear() +
    "-" +
    ("0" + (fecha.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + fecha.getDate()).slice(-2);

  return fechaFormateada
}

export const ObtenerFechaActual = ()=>{
  // Obtener la fecha actual
  var fechaActual = new Date();

  // Obtener el día, mes y año por separado
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0 (enero es 0)
  var año = fechaActual.getFullYear();

  // Formatear la fecha como string (opcional)
  var fechaFormateada = dia + "-" + mes + "-" + año;

  // Mostrar la fecha
 return fechaFormateada
}


