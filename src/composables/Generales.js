

function crearObjetoDropdown(listado, propiedades,valorValue) {
  return listado.map((item) => {
    const label = propiedades.map((propiedad) => item[propiedad]).join(" - ");
    const value = item[valorValue]; 
    return { label, value };
  });
}

export default crearObjetoDropdown