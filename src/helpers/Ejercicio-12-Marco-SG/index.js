import { productos } from "../../db/data";

//Crear un modilo que exporte una serie de funciones
export const comparadorProductos = () => {
  const agregarAComparador  = (idProducto) => {
    /**
     * 1. `agregarAComparador(idProducto)`:
      - Máximo 4 productos para comparar
      - Usa un `Set` para evitar duplicados
      - Guarda en LocalStorage en una clave llamada "comparador"
      - Valida que los productos sean de la misma categoría
     */
    console.log('Insertando productos al comparador...')
   try {
    
    localStorage.hasOwnProperty('comparador') || localStorage.setItem('comparador', JSON.stringify([]));
    const productosComparador = JSON.parse(localStorage.getItem('comparador'));

    if(productosComparador.length >= 4){
      throw new Error("No se puede agregar más de 4 productos al comparador")
    }

    //buscamos si el idProducto ya existe en el array
    const existeProducto = productosComparador.find( producto => producto.id === idProducto );
    // existeProducto devuelve el objeto si lo encuentra o undefined si no lo encuentra
    if(existeProducto) {
      throw new Error("El producto ya está en el comparador")
    }

    //si llego aquí es que no existe el producto entonces lo agrego
    //Pero primero lo busco en mi data.js
    const productoBuscado =productos.find (producto => producto.id === idProducto);

    if(!productoBuscado){
      throw new Error("El producto no existe")
    }
    
    //valido que la categoría sea la misma siempre que haya al menos un producto en el array
    if(productosComparador.length > 0){
      const categoria = productosComparador[0]?.categoría;
      if(productoBuscado.categoria !== categoria){
        throw new Error("Los productos deben ser de la misma categoría")
      }
    }
    
    productosComparador.push(productoBuscado);

    // añadimos al localStorage
    localStorage.setItem('comparador',JSON.stringify(productosComparador));

    } catch (error) {
      console.log("Error: ",error.message);
    }
  } 
  return {agregarAComparador};
}