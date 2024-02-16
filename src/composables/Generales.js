

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



