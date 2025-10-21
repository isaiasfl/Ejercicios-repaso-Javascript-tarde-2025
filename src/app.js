/**
 * Lógica principal de la aplicación
 * Este archivo puede contener la inicialización y configuración global
 */

import { ejercicio11 } from "./helpers/Ejercicio-11-Marco-SG/Index";
import { comparadorProductos } from "./helpers/Ejercicio-12-Marco-SG";

// Función de inicialización
export function initializeApp() {
  console.log('Inicializando aplicación...');
  
  // Aquí puedes configurar el estado inicial de tu aplicación
  // Por ejemplo: variables globales, configuraciones, etc.
  
  comparadorProductos();
}

