import { pedidos, productos } from "../../db/data";

export const sistemaDeRecomendaciones = () => {
  const construirPerfilRecomendacion = (idUsuario) => {
    /**
     *- Analiza historial del usuario:
        - Pedidos realizados (categorías, rangos de precio)
        - Productos visitados
        - Búsquedas realizadas (si hay historial)
      - Identifica categorías preferidas por frecuencia
      - Determina rango de precio habitual
      - Crea objeto de perfil con:
        - categoriasPreferidas (array ordenado por preferencia)
        - rangoPrecio (min, max, promedio)
        - productosComprados (Set para exclusiones)
        - productosVistos (Set para relevancia)
      - Guarda perfil en Map
      - Devuelve perfil construido
     */
    try {
      //Analizamos el historial del usuario

      const pedidosRealizados = pedidos.filter( pedido => pedido.idUsuario === idUsuario );
      const productosComprados= pedidosRealizados.map ( pedido => pedido.productos.map(prod => prod.idProducto));
      const categoriasPreferidas = pedidosRealizados
      .flatMap(pedido => pedido.productos.map(prod => prod.idProducto))
      .map(idProducto => productos.find(producto => producto.id === idProducto))
      .map(producto => producto.categoria);
      const RangoPrecios = pedidosRealizados.map(pedido => pedido.productos.map(prod => prod.precioUnitario)).flat();
      const maxPrecio = Math.max(...RangoPrecios);
      const minPrecio = Math.min(...RangoPrecios);
      const promedioPrecio = RangoPrecios.reduce((acumulador, precio) => acumulador + precio, 0) / RangoPrecios.length;

      //Cremamos un objeto perfil
      const perfilRecomendaciones ={
        idUsuario: idUsuario,
        categoriasPreferidas: categoriasPreferidas,
        rangoPrecio: { min: minPrecio, max: maxPrecio, promedio: promedioPrecio },
        productosComprados: new Set (...productosComprados)
      }

      //const perfilMap = new Map(Object.entries(perfilRecomendaciones));
      return perfilRecomendaciones;

    } catch (error) {
      throw new Error("Error al construir el perfil", error.message);
    }
  }

  const generarRecomendacionesBasadasPerfil = (idUsuario, cantidad = 5)  => {
    /* 
      Qué debe hacer:
        - Obtiene perfil del usuario
        - Filtra productos por:
          - Categorías preferidas del perfil
          - Rango de precio del perfil
          - Stock disponible > 0
          - Excluir productos ya comprados
        - Ordena productos resultantes por:
          1. Categoría preferida primero
          2. Mayor valoración
        - Aplica ordenación simple según los criterios anteriores
        - Limita a cantidad solicitada
        - Devuelve array de productos recomendados
     */


    try {
      const perfil = construirPerfilRecomendacion(idUsuario);

      // Filtrar los productos no comprados

      const productosNoComprados = productos.filter( producto => !perfil.productosComprados.has(producto.id) );
      const categoriasPreferidas = perfil.categoriasPreferidas;

      const recomendaciones = productosNoComprados
      .sort((a, b) => {
          const indexA = categoriasPreferidas.indexOf(a.categoria);
          const indexB = categoriasPreferidas.indexOf(b.categoria);
          
          // Si no están en las preferencias, van al final
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          
          return indexA - indexB;
        })
        .slice(0,cantidad)
        .sort((a, b) => b.valoracion - a.valoracion);

      return recomendaciones;
    } catch (error) {
      throw new Error("Error al generar recomendaciones", error.message);
    }

  }

  const generarInformeRecomendaciones = (idUsuario, recomendaciones) => {
    /*
     Qué debe hacer:
      - Analiza calidad de las recomendaciones generadas:
        - Diversidad de categorías representadas
        - Variedad de rangos de precio
        - Distribución de valoraciones
        - Exclusión de productos similares ya comprados
      - Calcula métricas de calidad:
        - Diversidad: número de categorías únicas / total recomendaciones
        - Relevancia precio: qué tan bien se ajustan al rango del usuario
        - Calidad promedio: valoración promedio de recomendaciones
      - Identifica posibles mejoras en el algoritmo
      - Devuelve objeto con análisis de calidad y sugerencias
    */

      try {
        const categoriasRecomendadas = recomendaciones.map(recomendaciones => recomendaciones.categoria);
        const rangoPrecios = recomendaciones.map(producto => producto.precio).flat();
        const promedioPrecio = rangoPrecios.reduce((acumulador, precio) => acumulador + precio, 0) / rangoPrecios.length;
        const calidadPromedio = recomendaciones.reduce((acumulador, producto) => acumulador + producto.valoracion, 0) / recomendaciones.length;

        //Creamos el informe
        const informe ={
        categoriasRecomendadas: categoriasRecomendadas,
        precioPromedio: promedioPrecio ,
        CalidadPromedio : calidadPromedio 
        }
        return informe;

      } catch (error) {
        throw new Error("Error al generar informe de recomendaciones", error.message);
      }
  }
  return { construirPerfilRecomendacion , generarRecomendacionesBasadasPerfil , generarInformeRecomendaciones };
};
  