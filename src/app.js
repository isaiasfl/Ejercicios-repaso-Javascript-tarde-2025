/**
 * Lógica principal de la aplicación
 * Este archivo puede contener la inicialización y configuración global
 */

import { sistemaDeRecomendaciones } from "./helpers/Ejercicio-15-Marco-SG/index.js";

// Función de inicialización
export function initializeApp() {
  console.log('Inicializando aplicación...');
  ;
  // Aquí puedes configurar el estado inicial de tu aplicación
  // Por ejemplo: variables globales, configuraciones, etc.
  const perfil = sistemaDeRecomendaciones().construirPerfilRecomendacion(1);
  console.log("Perfil construido para usuario 1:");
  console.log("Categorías preferidas:", perfil.categoriasPreferidas);
  console.log("Rango de precio:", perfil.rangoPrecio);
  console.log("Productos comprados:", perfil.productosComprados.size);
  console.log('');

  console.log("Recomendaciones para usuario 1:");
  const recomendaciones = sistemaDeRecomendaciones().generarRecomendacionesBasadasPerfil(1, 5);
  console.log("Recomendaciones generadas:", recomendaciones.length);
  recomendaciones.forEach(rec => {
  console.log(`${rec.nombre} - ${rec.categoria} - ${rec.precio}$ - ${rec.valoracion}⭐`);
  });
  console.log('')

  console.log("Informe de recomendaciones para usuario 1:");
  //const recomendaciones = sistemaDeRecomendaciones().generarRecomendacionesBasadasPerfil(1, 5);
  const informe = sistemaDeRecomendaciones().generarInformeRecomendaciones(1, recomendaciones);
  console.log("Categorías recomendadas:", informe.categoriasRecomendadas);
  console.log("Precio promedio:", informe.precioPromedio + "€");
  console.log("Valoración promedio:", informe.CalidadPromedio);
}