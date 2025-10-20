# Ejercicios de JavaScript - Estructuras de Datos y Persistencia

## Desarrollo Web en Entorno Cliente - 2º DAW

---

## Instrucciones Generales

Esta relación de ejercicios está diseñada para practicar los conceptos fundamentales de JavaScript relacionados con **arrays, objetos, Map, Set y LocalStorage**. Los ejercicios tienen un nivel medio-alto y requieren aplicar varios conceptos de manera conjunta.

**Requisitos:**

- Las salidas se mostrarán por consola usando `console.log()`, `console.table()` y `console.group()`
- Para resolver estos ejercicios, utiliza los datos proporcionados en el archivo `src/db/data.js`
- Aplica buenas prácticas: arrow functions, destructuring, métodos funcionales de arrays
- Maneja errores con try/catch cuando sea necesario
- Documenta las funciones con comentarios claros

---

## Ejercicios de Arrays y Objetos

### Ejercicio 1: Filtrado Avanzado de Productos por Múltiples Criterios

**Objetivo:** Practicar el uso de métodos de arrays como `filter`, `map` y operadores lógicos.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa una función llamada `filtrarProductosAvanzado` que acepte un objeto con criterios de filtrado y devuelva los productos que cumplan **TODOS** los criterios especificados.

Los criterios posibles son:

- `categoría`: String con la categoría exacta
- `precioMin`: Precio mínimo (incluido)
- `precioMax`: Precio máximo (incluido)
- `stockMin`: Stock mínimo requerido
- `valoracionMin`: Valoración mínima requerida
- `destacado`: Boolean (true/false)
- `conDescuento`: Boolean (true si tiene descuento > 0)

**Ejemplo de uso:**

```javascript
const criterios = {
  categoría: "Electrónica",
  precioMin: 50,
  precioMax: 500,
  valoracionMin: 4.3,
  conDescuento: true,
};
const resultados = filtrarProductosAvanzado(criterios);
```

**Requisitos adicionales:**

1. Si un criterio no se especifica, no debe aplicarse ese filtro
2. La función debe devolver un array con los productos completos que cumplan los criterios
3. Incluye un contador que muestre cuántos productos cumplieron cada criterio individual
4. Ordena los resultados por valoración descendente

Muestra los resultados por consola de forma clara y organizada.

---

### Ejercicio 2: Análisis de Usuarios por Ciudad con Estadísticas

**Objetivo:** Practicar el uso de `reduce`, `map` y cálculos estadísticos con objetos.

**Datos necesarios:** Array `usuarios` del archivo `src/db/data.js`

**Enunciado:**

Implementa una función llamada `analizarUsuariosPorCiudad` que agrupe los usuarios por ciudad y calcule estadísticas detalladas para cada una.

La función debe devolver un objeto donde cada clave sea una ciudad y su valor sea un objeto con:

- `totalUsuarios`: Número total de usuarios en esa ciudad
- `edadMedia`: Edad media de los usuarios
- `usuariosActivos`: Número de usuarios activos
- `porcentajeActivos`: Porcentaje de usuarios activos sobre el total
- `puntosPromedio`: Promedio de puntos de los usuarios
- `nivelesDistribucion`: Objeto con el conteo de usuarios por nivel (básico, estándar, premium)
- `hobbiesMasComunes`: Array con los 3 hobbies más frecuentes en esa ciudad

**Requisitos adicionales:**

1. Crea una función auxiliar `obtenerCiudadMasActiva()` que devuelva la ciudad con más usuarios activos
2. Crea una función `compararCiudades(ciudad1, ciudad2)` que compare las estadísticas de dos ciudades
3. Identifica la ciudad con mayor edad media y la de menor edad media

Muestra los resultados usando `console.table()` y `console.group()` para mejor visualización.

---

### Ejercicio 3: Transformación y Enriquecimiento de Pedidos

**Objetivo:** Practicar el manejo de arrays anidados, transformación de datos y cálculos complejos.

**Datos necesarios:** Arrays `pedidos`, `usuarios` y `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa una función llamada `enriquecerPedidos` que tome el array de pedidos y devuelva un nuevo array con información detallada y enriquecida.

Cada pedido enriquecido debe incluir:

- Toda la información original del pedido
- `nombreUsuario`: Nombre completo del usuario que realizó el pedido
- `emailUsuario`: Email del usuario
- `productosDetalle`: Array con los detalles completos de cada producto (nombre, categoría, precio actual)
- `subtotal`: Suma de (cantidad × precioUnitario) de todos los productos
- `totalConEnvio`: Subtotal + coste de envío
- `comision`: Comisión aplicada según el método de pago (usar array `metodosPago` de data.js)
- `totalFinal`: Total con envío y comisión
- `numeroArticulos`: Cantidad total de artículos en el pedido
- `ahorro`: Si algún producto tiene descuento, calcular cuánto se ahorró

**Requisitos adicionales:**

1. Crea una función `obtenerPedidosPorEstado(estado)` que filtre pedidos por su estado
2. Crea una función `calcularEstadisticasVentas()` que devuelva:
   - Total de ingresos generados (solo pedidos entregados)
   - Ticket medio (promedio por pedido)
   - Método de pago más utilizado
   - Usuario con más pedidos realizados

Muestra ejemplos de uso con al menos 3 pedidos enriquecidos y las estadísticas generales.

---

## Ejercicios de Map

### Ejercicio 4: Sistema de Inventario Inteligente con Map

**Objetivo:** Practicar el uso de `Map` para gestión eficiente de inventario con operaciones avanzadas.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `inventarioInteligente` que gestione el inventario usando un `Map` donde la clave sea el `id` del producto.

El módulo debe incluir las siguientes funciones:

1. `inicializarInventario()`: Crea el Map a partir del array de productos
2. `actualizarStock(idProducto, cantidad, operacion)`:
   - `operacion` puede ser "suma" o "resta"
   - Actualiza el stock del producto
   - Valida que no quede stock negativo
3. `obtenerProductosPorCategoria(categoria)`: Devuelve array de productos de esa categoría
4. `aplicarDescuentoMasivo(categoria, porcentajeDescuento)`: Aplica un descuento a todos los productos de una categoría
5. `generarAlertasStock(umbral)`: Devuelve array de productos con stock por debajo del umbral especificado
6. `obtenerTop5Valorados()`: Devuelve los 5 productos mejor valorados
7. `calcularValorInventario()`: Calcula el valor total del inventario (precio × stock)

**Requisitos adicionales:**

- Cada modificación debe registrar la fecha y hora de cambio
- Implementa un sistema de historial que guarde las últimas 10 operaciones realizadas
- Crea una función `generarInformeInventario()` que muestre un resumen completo del estado actual

Demuestra el funcionamiento realizando varias operaciones y mostrando el estado del inventario.

---

### Ejercicio 5: Caché de Búsquedas con Map y Medición de Rendimiento

**Objetivo:** Practicar el uso de `Map` como sistema de caché para optimizar búsquedas repetidas.

**Datos necesarios:** Arrays `usuarios` y `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un sistema de caché llamado `sistemaBusquedaCache` que almacene resultados de búsquedas para evitar procesarlas múltiples veces.

El sistema debe incluir:

1. Un `Map` para caché de usuarios y otro para caché de productos
2. Función `buscarUsuarioPorEmail(email)`:
   - Primero busca en caché
   - Si no está, busca en el array y guarda en caché
   - Mide el tiempo de ejecución
3. Función `buscarProductosPorRango(precioMin, precioMax)`:
   - Genera una clave única para el rango (ej: "50-200")
   - Aplica el sistema de caché
   - Mide el tiempo de ejecución
4. Función `obtenerEstadisticasCache()`: Devuelve:
   - Total de búsquedas realizadas
   - Hits de caché (búsquedas servidas desde caché)
   - Miss de caché (búsquedas que requirieron procesamiento)
   - Tasa de acierto (hits / total)
   - Tiempo total ahorrado
5. Función `limpiarCacheAntigua(minutosVida)`: Elimina entradas de caché más antiguas que X minutos
6. Función `vaciarCache()`: Limpia toda la caché

**Requisitos adicionales:**

- Cada entrada de caché debe incluir: resultado, timestamp y número de veces que se ha usado
- Implementa un límite máximo de 50 entradas en cada caché
- Cuando se alcance el límite, elimina las entradas menos usadas
- Compara tiempos: primera búsqueda vs búsquedas desde caché

Demuestra el funcionamiento realizando la misma búsqueda varias veces y mostrando las estadísticas.

---

## Ejercicios de Set

### Ejercicio 6: Sistema de Etiquetas y Filtrado con Set

**Objetivo:** Practicar el uso de `Set` para gestionar etiquetas únicas y realizar filtrados complejos.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `gestorEtiquetas` que gestione las etiquetas de productos usando `Set`.

El módulo debe incluir:

1. `extraerTodasEtiquetas()`: Crea un `Set` con todas las etiquetas únicas de todos los productos
2. `obtenerProductosPorEtiqueta(etiqueta)`: Devuelve productos que contengan esa etiqueta
3. `obtenerProductosPorEtiquetasOR(arrayEtiquetas)`: Devuelve productos que tengan AL MENOS UNA de las etiquetas
4. `obtenerProductosPorEtiquetasAND(arrayEtiquetas)`: Devuelve productos que tengan TODAS las etiquetas
5. `agregarEtiquetaAProducto(idProducto, nuevaEtiqueta)`: Añade una etiqueta a un producto específico
6. `eliminarEtiquetaDeProducto(idProducto, etiqueta)`: Elimina una etiqueta de un producto
7. `obtenerEtiquetasMasPopulares(top)`: Devuelve las N etiquetas más utilizadas
8. `encontrarEtiquetasRelacionadas(etiqueta)`: Devuelve etiquetas que aparecen frecuentemente junto a la etiqueta dada

**Requisitos adicionales:**

- Crea una función `generarEstadisticasEtiquetas()` que muestre:
  - Total de etiquetas únicas
  - Número de productos por etiqueta
  - Etiquetas sin uso
  - Promedio de etiquetas por producto
- Implementa una función `sugerirEtiquetas(idProducto)` que sugiera etiquetas basándose en productos similares

Demuestra el funcionamiento con diferentes búsquedas y muestra las estadísticas.

---

### Ejercicio 7: Análisis de Hobbies de Usuarios con Set

**Objetivo:** Practicar operaciones de conjuntos (unión, intersección, diferencia) con `Set`.

**Datos necesarios:** Array `usuarios` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `analizadorHobbies` que analice los hobbies de los usuarios usando operaciones con `Set`.

El módulo debe incluir:

1. `obtenerTodosHobbies()`: Devuelve un `Set` con todos los hobbies únicos
2. `obtenerHobbiesComunes(ciudad1, ciudad2)`: Devuelve hobbies que existen en ambas ciudades (intersección)
3. `obtenerHobbiesExclusivos(ciudad)`: Devuelve hobbies que solo existen en esa ciudad (diferencia)
4. `obtenerUsuariosConHobby(hobby)`: Devuelve array de usuarios que tienen ese hobby
5. `encontrarUsuariosConHobbiesComunes(idUsuario)`: Encuentra usuarios que compartan al menos un hobby con el usuario dado
6. `calcularCompatibilidad(idUsuario1, idUsuario2)`: Calcula porcentaje de hobbies en común
7. `agruparUsuariosPorHobbies()`: Devuelve un `Map` donde cada clave es un hobby y el valor es un array de IDs de usuarios

**Requisitos adicionales:**

- Implementa `obtenerHobbiesPorNivel(nivel)`: Devuelve hobbies más comunes en cada nivel de usuario
- Crea `generarGruposAfines(maxIntegrantes)`: Agrupa usuarios por hobbies comunes
- Implementa `sugerirAmigos(idUsuario, limite)`: Sugiere usuarios basándose en hobbies compartidos

Demuestra el funcionamiento analizando varios usuarios y mostrando compatibilidades.

---

## Ejercicios de LocalStorage

### Ejercicio 8: Persistencia de Carrito de Compras con LocalStorage

**Objetivo:** Practicar el uso de LocalStorage para mantener un carrito de compras persistente.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `carritoCompras` que gestione un carrito de compras usando LocalStorage.

El módulo debe incluir las siguientes funciones:

1. `agregarAlCarrito(idProducto, cantidad)`:
   - Valida que el producto exista y tenga stock suficiente
   - Si el producto ya está en el carrito, suma las cantidades
   - Guarda en LocalStorage con la clave "carrito"
   - Cada item debe incluir: idProducto, nombre, precio, cantidad, subtotal, imagen, fechaAgregado

2. `eliminarDelCarrito(idProducto)`: Elimina un producto del carrito

3. `actualizarCantidad(idProducto, nuevaCantidad)`:
   - Valida que haya stock suficiente
   - Si la cantidad es 0, elimina el producto

4. `obtenerCarrito()`: Devuelve el carrito completo desde LocalStorage

5. `calcularTotales()`: Devuelve un objeto con:
   - subtotal: Suma de todos los productos
   - descuentoTotal: Suma de descuentos aplicados
   - numArticulos: Cantidad total de artículos
   - numProductosDiferentes: Cantidad de productos diferentes
   - gastosEnvio: 0 si el subtotal > 50€, sino 4.99€
   - totalFinal: Subtotal + gastos de envío

6. `vaciarCarrito()`: Elimina todos los productos del carrito

7. `aplicarCodigoDescuento(codigo)`:
   - "DESCUENTO10": 10% de descuento
   - "DESCUENTO20": 20% de descuento
   - "ENVIOGRATIS": Envío gratis
   - Guarda el código aplicado en LocalStorage

8. `verificarStockCarrito()`: Verifica que todos los productos del carrito tengan stock disponible

**Requisitos adicionales:**

- Implementa una función `guardarParaDespues(idProducto)` que guarde productos en una lista de deseos separada
- Crea `obtenerHistorialCarritos()` que guarde los últimos 5 carritos finalizados
- Valida que los precios no hayan cambiado desde que se agregó el producto

Demuestra el funcionamiento agregando productos, aplicando descuentos y mostrando totales.

---

### Ejercicio 9: Sistema de Preferencias de Usuario con LocalStorage

**Objetivo:** Practicar el uso de LocalStorage para guardar y gestionar preferencias de usuario.

**Datos necesarios:** No requiere datos específicos del archivo data.js

**Enunciado:**

Implementa un módulo llamado `preferenciasUsuario` que gestione las preferencias de la aplicación.

El módulo debe incluir:

1. `inicializarPreferencias()`: Carga preferencias por defecto si no existen:

   ```javascript
   {
     tema: "claro",
     idioma: "es",
     moneda: "EUR",
     notificaciones: true,
     productosPorPagina: 12,
     ordenPorDefecto: "relevancia",
     mostrarAgotados: false,
     vistaProductos: "grid", // grid o lista
     categoriasVisibles: ["Electrónica", "Muebles", "Hogar"]
   }
   ```

2. `obtenerPreferencia(clave)`: Obtiene una preferencia específica

3. `establecerPreferencia(clave, valor)`:
   - Valida que el valor sea correcto según la preferencia
   - Guarda en LocalStorage
   - Registra fecha de última modificación

4. `establecerVariasPreferencias(objetoPreferencias)`: Actualiza múltiples preferencias a la vez

5. `restablecerPreferencias()`: Restaura todas las preferencias a sus valores por defecto

6. `exportarPreferencias()`: Devuelve un string JSON con todas las preferencias

7. `importarPreferencias(jsonPreferencias)`: Importa preferencias desde un string JSON

8. `validarPreferencias()`: Valida que todas las preferencias tengan valores correctos

**Requisitos adicionales:**

- Implementa un sistema de perfiles: "trabajo", "personal", "nocturno"
- Cada perfil tiene su conjunto de preferencias
- Crea `cambiarPerfil(nombrePerfil)` que cargue las preferencias de ese perfil
- Implementa `sincronizarPreferencias()` que simule una sincronización con un servidor (por ahora solo muestra en consola)

Demuestra el funcionamiento cambiando preferencias, perfiles y exportando/importando configuraciones.

---

### Ejercicio 10: Historial de Navegación de Productos con LocalStorage

**Objetivo:** Practicar el uso de LocalStorage para mantener un historial de productos visitados.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `historialNavegacion` que registre y gestione el historial de productos visitados.

El módulo debe incluir:

1. `registrarVisita(idProducto)`:
   - Registra la visita a un producto
   - Cada entrada debe incluir: idProducto, nombreProducto, categoria, precio, timestamp, numeroVisitas
   - Si el producto ya existe en el historial, incrementa el contador y actualiza el timestamp
   - Limita el historial a 20 productos máximo

2. `obtenerHistorial()`: Devuelve el historial completo ordenado por fecha (más reciente primero)

3. `obtenerMasVisitados(limite)`: Devuelve los N productos más visitados

4. `eliminarDelHistorial(idProducto)`: Elimina un producto específico del historial

5. `limpiarHistorial()`: Elimina todo el historial

6. `obtenerHistorialPorCategoria(categoria)`: Filtra el historial por categoría

7. `obtenerRecomendacionesBasadasEnHistorial(limite)`:
   - Analiza las categorías más visitadas
   - Devuelve productos similares que no están en el historial
   - Prioriza productos de las mismas categorías visitadas

8. `obtenerEstadisticasHistorial()`: Devuelve:
   - Total de productos visitados
   - Categorías más visitadas
   - Producto más visitado
   - Promedio de visitas por producto
   - Rango de precios de productos visitados

**Requisitos adicionales:**

- Implementa `agruparPorFecha()` que agrupe visitas por día/semana/mes
- Crea `marcarComoFavorito(idProducto)` que marque productos desde el historial
- Implementa `compararConCarrito()` que muestre qué productos visitados están en el carrito

Demuestra el funcionamiento visitando varios productos y mostrando estadísticas y recomendaciones.

---

## Ejercicios Mixtos (Arrays, Objetos, Map, Set y LocalStorage)

### Ejercicio 11: Dashboard de Usuario con Persistencia

**Objetivo:** Integrar todas las estructuras de datos para crear un dashboard completo de usuario.

**Datos necesarios:** Arrays `usuarios`, `productos` y `pedidos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `dashboardUsuario` que cree un sistema completo de información del usuario usando todas las estructuras aprendidas.

El módulo debe incluir:

1. `inicializarDashboard(idUsuario)`:
   - Carga toda la información del usuario
   - Guarda el usuario activo en LocalStorage
   - Inicializa estructuras de datos (Map y Set) necesarias

2. `obtenerResumenUsuario()`: Devuelve un objeto con:
   - Información básica del usuario
   - Número de pedidos realizados
   - Total gastado
   - Productos favoritos (desde LocalStorage)
   - Última fecha de actividad
   - Nivel y puntos

3. `obtenerPedidosUsuario()`:
   - Usa un `Map` para indexar pedidos por estado
   - Devuelve estadísticas por estado
   - Calcula el ticket medio

4. `obtenerProductosRelacionados()`:
   - Basándose en pedidos previos, sugiere productos
   - Usa `Set` para evitar duplicados
   - Filtra por categorías compradas

5. `guardarActividadReciente(tipoActividad, detalles)`:
   - Registra actividades: "vista_producto", "pedido", "busqueda"
   - Guarda en LocalStorage
   - Limita a las últimas 50 actividades

6. `obtenerMetricasUsuario()`: Devuelve:
   - Categoría favorita (más comprada)
   - Rango de precios habitual
   - Día de la semana con más compras
   - Métodos de pago utilizados
   - Hobbies relacionados con compras

7. `compararConOtrosUsuarios()`:
   - Compara al usuario con el promedio general
   - Muestra si gasta más/menos
   - Compara nivel de actividad

8. `exportarDatosUsuario()`: Exporta toda la información a un objeto JSON y lo guarda en LocalStorage

**Requisitos adicionales:**

- Todo debe persistir en LocalStorage para que al recargar se mantenga la sesión
- Implementa `cerrarSesion()` que limpie el usuario activo pero mantenga historial
- Crea `obtenerNotificacionesUsuario()` que genere notificaciones basadas en actividad

Demuestra el funcionamiento con al menos 2 usuarios diferentes, mostrando sus dashboards completos.

---

### Ejercicio 12: Sistema de Comparación de Productos con Persistencia

**Objetivo:** Crear un sistema para comparar productos usando Map, Set y LocalStorage.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `comparadorProductos` que permita comparar productos y guardar las comparaciones.

El módulo debe incluir:

1. `agregarAComparador(idProducto)`:
   - Máximo 4 productos para comparar
   - Usa un `Set` para evitar duplicados
   - Guarda en LocalStorage
   - Valida que los productos sean de la misma categoría

2. `eliminarDeComparador(idProducto)`: Elimina un producto del comparador

3. `obtenerComparacion()`: Devuelve un objeto con:
   - Array de productos a comparar
   - Tabla comparativa de características:
     - Precio (incluyendo cuál es el más barato)
     - Stock disponible
     - Valoración
     - Descuento aplicado
     - Precio con descuento
   - Mejor opción por criterio (precio, valoración, etc.)

4. `generarMatrizComparacion()`: Crea una matriz que compara cada producto con los demás usando un `Map`:
   - Clave: par de IDs "101-102"
   - Valor: objeto con diferencias (precio, valoración, etc.)

5. `obtenerMejorOpcion(criterio)`:
   - criterios: "precio", "valoracion", "descuento", "stock"
   - Devuelve el producto que mejor cumple ese criterio

6. `calcularPuntuacion()`: Asigna puntuación a cada producto (0-100) basándose en:
   - Precio (30%)
   - Valoración (40%)
   - Descuento (15%)
   - Stock (15%)

7. `guardarComparacion(nombre)`:
   - Guarda la comparación actual con un nombre
   - Almacena en LocalStorage
   - Permite tener múltiples comparaciones guardadas

8. `obtenerComparacionesGuardadas()`: Lista todas las comparaciones guardadas

9. `cargarComparacion(nombre)`: Carga una comparación previamente guardada

**Requisitos adicionales:**

- Implementa `compararConHistorial()` que compare productos actuales con productos visitados
- Crea `generarInformeComparacion()` que muestre un resumen detallado formateado
- Implementa `compartirComparacion()` que genere un código para compartir (string codificado)

Demuestra el funcionamiento comparando productos de diferentes categorías y guardando comparaciones.

---

### Ejercicio 13: Sistema de Recomendaciones Basado en Colaboración

**Objetivo:** Crear un sistema de recomendaciones usando Map, Set y análisis de patrones.

**Datos necesarios:** Arrays `usuarios`, `productos` y `pedidos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `recomendaciones` que genere recomendaciones personalizadas.

El módulo debe incluir:

1. `construirMatrizCompras()`:
   - Crea un `Map` donde cada clave es un idUsuario
   - El valor es un `Set` con los IDs de productos comprados
   - Incluye información de pedidos

2. `calcularSimilitudUsuarios(idUsuario1, idUsuario2)`:
   - Calcula similitud basándose en:
     - Productos comprados en común (40%)
     - Categorías en común (30%)
     - Hobbies compartidos (20%)
     - Diferencia de edad (10%)
   - Devuelve un valor entre 0 y 100

3. `encontrarUsuariosSimilares(idUsuario, top)`:
   - Encuentra los N usuarios más similares
   - Usa el cálculo de similitud
   - Devuelve array ordenado por similitud descendente

4. `generarRecomendaciones(idUsuario, cantidad)`:
   - Encuentra usuarios similares
   - Identifica productos que ellos compraron pero el usuario no
   - Filtra por: stock disponible, buena valoración (>=4.0)
   - Devuelve array de productos recomendados con puntuación

5. `explicarRecomendacion(idUsuario, idProducto)`:
   - Explica por qué se recomienda el producto
   - Muestra usuarios similares que lo compraron
   - Indica categorías relacionadas

6. `obtenerTendencias()`:
   - Productos más comprados en el último mes
   - Categorías en tendencia
   - Productos con mejor relación calidad/precio

7. `guardarRecomendaciones(idUsuario)`:
   - Guarda las recomendaciones generadas en LocalStorage
   - Incluye fecha de generación
   - Marca como "vista" o "no vista"

8. `obtenerEstadisticasRecomendaciones()`:
   - Total de recomendaciones generadas
   - Tasa de productos en stock recomendados
   - Puntuación media de productos recomendados

**Requisitos adicionales:**

- Implementa `actualizarRecomendaciones(idUsuario)` que regenere recomendaciones cuando hay nuevos datos
- Crea `compararEfectividad()` que simule qué porcentaje podrían ser aceptadas
- Implementa un sistema de feedback: `marcarRecomendacionComoUtil(idProducto, util)`

Demuestra el funcionamiento generando recomendaciones para al menos 3 usuarios diferentes.

---

### Ejercicio 14: Buscador Avanzado con Caché y Persistencia

**Objetivo:** Crear un sistema de búsqueda completo con filtros, caché y historial persistente.

**Datos necesarios:** Arrays `usuarios` y `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `buscadorAvanzado` que implemente un sistema de búsqueda completo.

El módulo debe incluir:

1. `buscar(termino, tipo, filtros)`:
   - `tipo`: "productos" o "usuarios"
   - `termino`: texto a buscar en nombre, descripción, email, etc.
   - `filtros`: objeto con filtros adicionales
   - Busca usando coincidencia parcial (case insensitive)
   - Implementa caché con `Map` para búsquedas repetidas

2. `buscarProductos(termino, filtros)`:
   - Busca en: nombre, descripción, etiquetas, categoría
   - Filtros aplicables:
     - categoría
     - rangoPrecios [min, max]
     - valoracionMin
     - conDescuento
     - enStock
   - Ordena por relevancia (más coincidencias primero)

3. `buscarUsuarios(termino, filtros)`:
   - Busca en: nombre, apellidos, email, ciudad, hobbies
   - Filtros aplicables:
     - ciudad
     - activo
     - nivel
     - rangoEdad [min, max]
   - Ordena por relevancia

4. `aplicarFiltrosAvanzados(resultados, filtrosExtras)`:
   - Aplica filtros adicionales después de la búsqueda inicial
   - Permite combinaciones lógicas: AND, OR
   - Devuelve resultados filtrados

5. `guardarBusqueda(termino, tipo, filtros, resultados)`:
   - Guarda en historial de búsquedas (LocalStorage)
   - Cada entrada incluye: término, tipo, filtros, numResultados, timestamp, id único
   - Limita historial a 30 búsquedas

6. `obtenerHistorialBusquedas(limite)`:
   - Devuelve las últimas N búsquedas
   - Ordenadas por fecha (más reciente primero)

7. `buscarEnHistorial(termino)`:
   - Busca búsquedas previas que contengan el término
   - Útil para autocompletar

8. `obtenerBusquedasPopulares(top)`:
   - Devuelve los términos más buscados
   - Agrupa términos similares
   - Cuenta frecuencia de búsqueda

9. `eliminarBusquedaHistorial(id)`: Elimina una búsqueda específica

10. `limpiarHistorialBusquedas()`: Limpia todo el historial

11. `obtenerSugerencias(terminoParc)`:
    - Basándose en historial y datos existentes
    - Devuelve sugerencias de autocompletado
    - Máximo 5 sugerencias

12. `obtenerEstadisticasCache()`:
    - Hits y misses de caché
    - Tiempo ahorrado por caché
    - Términos más buscados desde caché

**Requisitos adicionales:**

- Implementa resaltado de términos coincidentes en resultados
- Crea `busquedaSimilares(termino)` que use distancia de Levenshtein simplificada para sugerir correcciones
- Implementa `exportarHistorial()` y `importarHistorial()` para gestión de datos
- Agrega soporte para búsqueda por múltiples términos con operador AND/OR

Demuestra el funcionamiento realizando varias búsquedas, mostrando historial y estadísticas de caché.

---

### Ejercicio 15: Sistema Completo de Gestión de Colecciones de Usuario

**Objetivo:** Crear un sistema integral que permita a los usuarios crear y gestionar colecciones personalizadas de productos.

**Datos necesarios:** Arrays `usuarios` y `productos` del archivo `src/db/data.js`

**Enunciado:**

Implementa un módulo llamado `coleccionesUsuario` que permita crear y gestionar colecciones personalizadas de productos, similar a listas de reproducción o tableros de Pinterest.

El módulo debe incluir:

1. `crearColeccion(nombreColeccion, descripcion, publico)`:
   - Crea una nueva colección con: id único, nombre, descripción, fechaCreacion, productos (Set de IDs), públic (boolean), numVisitas, etiquetas (Set)
   - Guarda en LocalStorage
   - Cada usuario puede tener múltiples colecciones

2. `agregarProductoAColeccion(idColeccion, idProducto)`:
   - Añade producto a una colección específica
   - Usa `Set` para evitar duplicados
   - Valida que el producto exista
   - Actualiza LocalStorage

3. `eliminarProductoDeColeccion(idColeccion, idProducto)`: Elimina un producto de la colección

4. `obtenerColeccion(idColeccion)`: Devuelve toda la información de una colección con detalles completos de productos

5. `listarTodasColecciones()`: Devuelve array con todas las colecciones del usuario

6. `eliminarColeccion(idColeccion)`: Elimina una colección completa

7. `duplicarColeccion(idColeccion, nuevoNombre)`: Crea una copia de una colección existente

8. `fusionarColecciones(idColeccion1, idColeccion2, nombreNueva)`:
   - Crea una nueva colección combinando dos existentes
   - Usa `Set` para evitar productos duplicados

9. `compararColecciones(idColeccion1, idColeccion2)`:
   - Productos en común (intersección)
   - Productos únicos de cada una (diferencia)
   - Porcentaje de similitud
   - Usa operaciones de `Set`

10. `obtenerEstadisticasColeccion(idColeccion)`:
    - Total de productos
    - Categorías representadas (usar `Set`)
    - Valor total de la colección
    - Precio medio
    - Valoración media
    - Productos con descuento

11. `buscarEnColecciones(termino)`:
    - Busca en nombres de colecciones
    - Busca en productos dentro de colecciones
    - Devuelve colecciones que coincidan

12. `agregarEtiquetasAColeccion(idColeccion, arrayEtiquetas)`:
    - Añade etiquetas a una colección (usar `Set`)
    - Útil para categorizar: "favoritos", "regalos", "trabajo", etc.

13. `obtenerColeccionesPorEtiqueta(etiqueta)`:
    - Filtra colecciones por etiqueta
    - Devuelve array de colecciones

14. `compartirColeccion(idColeccion)`:
    - Genera un código único para la colección
    - Guarda en "colecciones compartidas" en LocalStorage
    - Devuelve objeto con código y URL simulada

15. `importarColeccionCompartida(codigo)`:
    - Importa una colección desde un código
    - Crea una copia para el usuario actual

16. `obtenerRecomendacionesParaColeccion(idColeccion)`:
    - Analiza productos en la colección
    - Sugiere productos similares (mismas categorías, precio similar)
    - Usa `Map` para agrupar sugerencias por categoría

17. `ordenarProductosEnColeccion(idColeccion, criterio)`:
    - criterios: "precio", "valoracion", "nombre", "fechaAgregado"
    - Devuelve productos ordenados

18. `exportarColeccion(idColeccion, formato)`:
    - formatos: "json", "texto"
    - Devuelve string formateado
    - Para formato "texto", crea lista legible

19. `obtenerEstadisticasGenerales()`:
    - Total de colecciones creadas
    - Total de productos guardados (únicos)
    - Colección más grande
    - Colección más valiosa
    - Categorías más coleccionadas
    - Promedio de productos por colección

20. `limpiarColeccionesVacias()`:
    - Elimina colecciones sin productos
    - Devuelve número de colecciones eliminadas

**Requisitos adicionales:**

- Implementa un sistema de respaldo: `crearRespaldo()` y `restaurarRespaldo(fechaRespaldo)`
- Todas las operaciones deben actualizar LocalStorage inmediatamente
- Implementa validación de datos antes de guardar
- Crea `sincronizarColecciones()` que simule sincronización con servidor (por ahora solo log)
- Agrega un sistema de "colecciones recientes" que guarde las últimas 5 colecciones visitadas
- Implementa `buscarProductosDuplicadosEnColecciones()` que encuentre productos repetidos en múltiples colecciones

**Sistema de puntuación de colecciones:**
Implementa `calcularPuntuacionColeccion(idColeccion)` que asigne una puntuación (0-100) basada en:

- Número de productos (20%)
- Diversidad de categorías (25%)
- Valoración media de productos (30%)
- Valor total de la colección (15%)
- Productos con descuento (10%)

Demuestra el funcionamiento creando al menos 4 colecciones diferentes:

1. Una colección de "Productos para oficina"
2. Una colección de "Tecnología premium"
3. Una colección de "Regalos" (fusión de productos seleccionados)
4. Una colección "Wishlist"

Muestra operaciones como:

- Agregar/eliminar productos
- Comparar colecciones
- Obtener estadísticas
- Buscar en colecciones
- Exportar una colección
- Crear respaldo

Utiliza `console.group()`, `console.table()` y mensajes descriptivos para mostrar toda la información de forma clara y organizada.

---

## Notas Finales

**Recomendaciones para resolver los ejercicios:**

1. **Organización del código:**
   - Crea un archivo por ejercicio o agrupa ejercicios relacionados
   - Usa módulos ES6 (import/export)
   - Separa la lógica de negocio de la presentación

2. **Testing:**
   - Incluye ejemplos de uso para cada función
   - Prueba casos extremos (arrays vacíos, datos no válidos, etc.)
   - Usa console.assert() para validaciones

3. **Manejo de LocalStorage:**
   - Siempre valida que localStorage esté disponible
   - Maneja errores con try/catch al leer/escribir
   - Serializa correctamente objetos complejos (Map, Set, Date)

4. **Buenas prácticas:**
   - Nombres descriptivos para variables y funciones
   - Comenta código complejo
   - Usa const para valores que no cambian
   - Destructuring cuando sea apropiado
   - Arrow functions para callbacks
   - Template literals para strings complejos

5. **Visualización de datos:**
   - Usa console.table() para arrays y objetos
   - Usa console.group() para agrupar información relacionada
   - Incluye títulos descriptivos en cada salida
   - Formatea números de precio con 2 decimales
   - Formatea fechas de manera legible

**¡Mucha suerte con los ejercicios!**
