# Ejercicios de JavaScript - Versión Examen (Enunciados Detallados)

## Desarrollo Web en Entorno Cliente - 2º DAW

---

## Instrucciones Generales

Esta relación de ejercicios está diseñada como simulación de examen práctico con una duración estimada de 2-3 horas por ejercicio. Cada ejercicio te permitirá aplicar de forma integrada los conceptos de arrays, objetos, Map, Set y LocalStorage.

Los enunciados son detallados para que sepas exactamente qué se espera de ti. Cada función tiene un propósito claro, requisitos específicos y ejemplos que te mostrarán las entradas y salidas esperadas.

**Requisitos técnicos:**
- Cada ejercicio en su carpeta: `src/helpers/ejercicioXX/index.js`
- Exporta funciones: `export default { funcion1, funcion2, funcion3 }`
- Importa en app.js: `import ejercicioXX from './helpers/ejercicioXX/index.js'`
- Usa datos de `src/db/data.js` cuando se indique
- Muestra resultados con `console.log()`, `console.table()`, `console.group()`

---

## Ejercicio 1: Sistema de Gestión de Inventario

**Objetivo:** Crear un sistema de gestión de inventario que controle existencias, genere alertas de stock bajo y mantenga persistencia de datos.

**Contexto:** Trabajas en una tienda online y necesitas controlar el inventario de productos, avisar cuando el stock es bajo y poder recuperar los datos si el usuario cierra el navegador.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de inventario - Estructura esperada:**
```javascript
Map {
  101 => {
    id: 101,
    nombre: "Laptop Gaming Pro",
    categoria: "Electrónica",
    stockActual: 25,
    stockMinimo: 10,
    precio: 899.99,
    alertas: []
  }
}
```

### Funciones que debes implementar:

#### 1. `crearInventario()`

**Qué debes hacer:**
- Lee el array `productos` de `src/db/data.js`
- Crea un Map donde clave = idProducto, valor = objeto con todos los datos del producto
- Calcula `stockMinimo` como 10% del stock actual
- Inicializa `alertas` como array vacío
- Guarda el Map en LocalStorage con clave "inventario"
- Devuelve el Map creado

**Ejemplo de llamada:**
```javascript
const inventario = crearInventario();
console.log("Inventario creado con", inventario.size, "productos");
```

**Salida esperada:**
```
Inventario creado con 50 productos
```

#### 2. `gestionarStock(idProducto, operacion, cantidad)`

**Qué debes hacer:**
- Valida que el producto exista (si no, lanza error)
- Valida que operación sea "entrada" o "salida" (si no, lanza error)
- Si es "entrada": suma cantidad al stockActual
- Si es "salida": verifica que stockActual - cantidad >= 0 (si no, lanza error)
- Si stockActual < stockMinimo: añade alerta "Stock bajo - Quedan X unidades"
- Actualiza LocalStorage y devuelve el producto actualizado

**Ejemplos de llamada:**
```javascript
const resultado1 = gestionarStock(101, "entrada", 10);
console.log("Nuevo stock:", resultado1.stockActual); // 35

try {
  gestionarStock(101, "salida", 1000);
} catch (error) {
  console.log("Error:", error.message); // Stock insuficiente
}
```

#### 3. `generarInformeInventario()`

**Qué debes hacer:**
- Recorre el Map de inventario
- Calcula:
  - `valorTotal`: sumatoria de (stockActual × precio)
  - `productosPorCategoria`: objeto con contador por categoría
  - `productosBajoStock`: cantidad con stockActual < stockMinimo
  - `stockPromedio`: promedio de stockActual
- Devuelve objeto con todas las estadísticas

**Ejemplo de llamada:**
```javascript
const informe = generarInformeInventario();
console.log("Valor total:", informe.valorTotal);
console.log("Productos bajo stock:", informe.productosBajoStock);
console.table(informe.productosPorCategoria);
```

**Salida esperada:**
```javascript
{
  valorTotal: 125890.75,
  productosPorCategoria: { "Electrónica": 15, "Muebles": 12 },
  productosBajoStock: 5,
  stockPromedio: 45.2
}
```

---

## Ejercicio 2: Catálogo de Productos con Búsqueda y Favoritos

**Objetivo:** Crear un catálogo dinámico con búsqueda inteligente y sistema de favoritos.

**Contexto:** Necesitas implementar un buscador eficiente para productos y un sistema donde los usuarios puedan guardar sus productos favoritos de forma persistente.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de índice de búsqueda:**
```javascript
Map {
  "laptop" => Set {101, 102, 103},
  "silla" => Set {205, 206, 207}
}
```

**Set de favoritos:**
```javascript
Set {101, 205, 308}
```

### Funciones que debes implementar:

#### 1. `construirIndiceBusqueda()`

**Qué debes hacer:**
- Recorre el array de productos
- Extrae palabras clave de: nombre, descripción, categoría, etiquetas
- Crea un Map donde clave = término (minúsculas), valor = Set con IDs de productos
- Guarda este Map en LocalStorage con clave "indiceBusqueda"
- Devuelve el Map creado

**Ejemplo de llamada:**
```javascript
const indice = construirIndiceBusqueda();
console.log("Índice construido con", indice.size, "términos");
console.log("Término 'laptop' encontrado en", indice.get("laptop").size, "productos");
```

**Salida esperada:**
```
Índice construido con 245 términos
Término 'laptop' encontrado en 12 productos
```

#### 2. `buscarProductos(termino, filtros = {})`

**Qué debes hacer:**
- Busca el término en el Map de índice
- Obtén el Set de IDs de productos
- Convierte IDs a objetos de productos completos
- Aplica filtros si se proporcionan:
  - categoria: filtrar por categoría exacta
  - rangoPrecio: [min, max] para filtrar por precio
  - valoracionMin: valoración mínima
- Ordena resultados por valoración descendente
- Devuelve array de productos filtrados

**Ejemplos de llamada:**
```javascript
const resultados1 = buscarProductos("laptop");
console.log("Resultados para 'laptop':", resultados1.length);

const resultados2 = buscarProductos("laptop", {
  categoria: "Electrónica",
  valoracionMin: 4.0
});
console.log("Resultados filtrados:", resultados2.length);
```

**Salida esperada:**
```
Resultados para 'laptop': 12
Resultados filtrados: 8
```

#### 3. `gestionarFavoritos()`

**Qué debes hacer:**
- Devuelve un objeto con métodos:
  - agregar(idProducto): añadir ID al Set de favoritos
  - eliminar(idProducto): eliminar ID del Set
  - obtenerTodos(): devolver array de IDs del Set
  - esFavorito(idProducto): boolean
- Persiste cambios en LocalStorage con clave "favoritos"
- Valida que los IDs existan en el catálogo

**Ejemplos de llamada:**
```javascript
const favs = gestionarFavoritos();
favs.agregar(101);
favs.agregar(205);
console.log("Total favoritos:", favs.obtenerTodos().length);
console.log("¿101 es favorito?", favs.esFavorito(101));

fvs.eliminar(101);
console.log("¿101 sigue siendo favorito?", favs.esFavorito(101));
```

**Salida esperada:**
```
Total favoritos: 2
¿101 es favorito? true
¿101 sigue siendo favorito? false
```

---

## Ejercicio 3: Sistema de Usuarios con Análisis de Comportamiento

**Objetivo:** Crear un sistema que analice el comportamiento de los usuarios para generar perfiles y recomendaciones personalizadas.

**Contexto:** Quieres entender mejor a tus usuarios para poder ofrecerles productos más relevantes basados en sus patrones de compra y características demográficas.

**Datos necesarios:** Arrays `usuarios` y `pedidos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de perfiles de usuario:**
```javascript
Map {
  1 => {
    id: 1,
    nombre: "Ana García",
    ciudad: "Madrid",
    stats: {
      totalCompras: 15,
      totalGastado: 2500.50,
      categoriaFavorita: "Electrónica"
    }
  }
}
```

### Funciones que debes implementar:

#### 1. `crearPerfilUsuario(idUsuario)`

**Qué debes hacer:**
- Busca el usuario en el array por ID
- Crea objeto de perfil con: id, nombre, ciudad, email, edad, hobbies del array
- Analiza sus pedidos para calcular:
  - totalCompras: número de pedidos
  - totalGastado: suma de totales de pedidos
  - categoriaFavorita: categoría con más compras
  - ticketMedio: totalGastado / totalCompras
- Guarda perfil en Map con clave = idUsuario
- Guarda en LocalStorage con clave "perfiles_usuarios"
- Devuelve el perfil creado

**Ejemplo de llamada:**
```javascript
const perfil = crearPerfilUsuario(1);
console.log("Perfil creado para:", perfil.nombre);
console.log("Total compras:", perfil.stats.totalCompras);
console.log("Categoría favorita:", perfil.stats.categoriaFavorita);
```

**Salida esperada:**
```
Perfil creado para: Ana García
Total compras: 15
Categoría favorita: Electrónica
```

#### 2. `encontrarUsuariosSimilares(idUsuario, limite = 3)`

**Qué debes hacer:**
- Obtén el perfil del usuario objetivo
- Compara con todos los demás usuarios usando criterios:
  - Ciudad idéntica (20 puntos)
  - Diferencia de edad ≤ 5 años (15 puntos)
  - Hobbies en común (10 puntos por hobby)
  - Nivel idéntico (10 puntos)
  - Rango de gasto similar ±20% (15 puntos)
- Calcula puntuación máxima de 100
- Ordena por puntuación descendente y limita al número solicitado
- Devuelve array de usuarios similares con puntuación

**Ejemplo de llamada:**
```javascript
const similares = encontrarUsuariosSimilares(1, 3);
console.log("Usuarios similares encontrados:", similares.length);
similares.forEach(sim => {
  console.log(`${sim.nombre} - Similitud: ${sim.puntuacion}%`);
});
```

**Salida esperada:**
```
Usuarios similares encontrados: 3
Carlos Ruiz - Similitud: 85%
Laura Martínez - Similitud: 72%
María López - Similitud: 68%
```

#### 3. `generarRecomendaciones(idUsuario, cantidad = 5)`

**Qué debes hacer:**
- Obtén usuarios similares del paso anterior
- Identifica productos comprados por usuarios similares que el usuario objetivo no tiene
- Filtra productos disponibles (stock > 0)
- Prioriza productos de la categoría favorita del usuario
- Calcula puntuación de recomendación:
  - Popularidad entre usuarios similares (50%)
  - Categoría preferida del usuario (30%)
  - Valoración del producto (20%)
- Devuelve array de productos recomendados con puntuación

**Ejemplo de llamada:**
```javascript
const recomendaciones = generarRecomendaciones(1, 3);
console.log("Recomendaciones generadas:", recomendaciones.length);
recomendaciones.forEach(rec => {
  console.log(`${rec.nombre} - Puntuación: ${rec.puntuacion}`);
});
```

**Salida esperada:**
```
Recomendaciones generadas: 3
Monitor Curvo 27" - Puntuación: 92
Teclado Mecánico RGB - Puntuación: 87
Webcam HD - Puntuación: 78
```

---

## Ejercicio 4: Gestor de Etiquetas y Categorías

**Objetivo:** Crear un sistema inteligente de gestión de etiquetas que analice relaciones y sugiera etiquetas relevantes.

**Contexto:** Necesitas organizar mejor tu catálogo de productos mediante etiquetas y encontrar relaciones entre ellas para mejorar la navegación y descubrimiento de productos.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de taxonomía:**
```javascript
Map {
  "Electrónica" => {
    etiquetas: Set {"tecnología", "gaming", "portátil"},
    productos: Set {101, 102, 103},
    popularidad: 85
  }
}
```

### Funciones que debes implementar:

#### 1. `construirTaxonomia()`

**Qué debes hacer:**
- Extrae todas las etiquetas únicas del array de productos usando Set
- Agrupa etiquetas por categoría principal en un Map
- Para cada categoría:
  - Crea Set con etiquetas únicas de esa categoría
  - Cuenta productos por etiqueta
  - Calcula popularidad basada en frecuencia total de uso
- Guarda taxonomía en LocalStorage
- Devuelve Map con estructura jerárquica

**Ejemplo de llamada:**
```javascript
const taxonomia = construirTaxonomia();
console.log("Taxonomía construida con", taxonomia.size, "categorías");
const electronica = taxonomia.get("Electrónica");
console.log("Etiquetas en Electrónica:", electronica.etiquetas.size);
```

**Salida esperada:**
```
Taxonomía construida con 8 categorías
Etiquetas en Electrónica: 15
```

#### 2. `sugerirEtiquetas(idProducto)`

**Qué debes hacer:**
- Obtén el producto específico
- Analiza sus etiquetas actuales y categoría
- Busca en la taxonomía qué etiquetas aparecen frecuentemente con las etiquetas actuales
- Identifica etiquetas populares en la misma categoría que el producto no tiene
- Calcula puntuación de sugerencia para cada etiqueta:
  - Relación con etiquetas existentes (60%)
  - Popularidad en categoría (40%)
- Devuelve array de etiquetas sugeridas con puntuación

**Ejemplo de llamada:**
```javascript
const sugerencias = sugerirEtiquetas(101);
console.log("Sugerencias para producto 101:", sugerencias.length);
sugerencias.forEach(sug => {
  console.log(`${sug.etiqueta} - Puntuación: ${sug.puntuacion}`);
});
```

**Salida esperada:**
```
Sugerencias para producto 101: 3
profesional - Puntuación: 85
productividad - Puntuación: 78
oficina - Puntuación: 72
```

#### 3. `analizarRelacionesEtiquetas()`

**Qué debes hacer:**
- Para cada producto, analiza co-ocurrencia de etiquetas
- Crea objeto de relaciones donde clave = "etiqueta1-etiqueta2"
- Calcula fuerza de relación basada en número de productos que comparten ambas etiquetas
- Identifica relaciones fuertes (fuerza ≥ 3) y débiles (fuerza = 1)
- Devuelve objeto con relaciones fuertes, débiles y relación más fuerte

**Ejemplo de llamada:**
```javascript
const relaciones = analizarRelacionesEtiquetas();
console.log("Relaciones fuertes:", relaciones.fuertes.length);
console.log("Relación más fuerte:", relaciones.masFuerte);
console.table(relaciones.topRelaciones);
```

**Salida esperada:**
```javascript
{
  fuertes: [
    { etiqueta1: "tecnología", etiqueta2: "gaming", fuerza: 8 }
  ],
  debiles: [
    { etiqueta1: "hogar", etiqueta2: "deportivo", fuerza: 1 }
  ],
  masFuerte: {
    etiqueta1: "tecnología",
    etiqueta2: "gaming",
    fuerza: 8
  }
}
```

---

## Ejercicio 5: Sistema de Carrito de Compras

**Objetivo:** Implementar un carrito de compras inteligente con persistencia y cálculo automático de totales.

**Contexto:** Necesitas crear una experiencia de compra completa donde los usuarios puedan agregar productos, ver totales en tiempo real y mantener su carrito incluso si cierran el navegador.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de carrito:**
```javascript
Map {
  101 => {
    idProducto: 101,
    cantidad: 2,
    precioUnitario: 899.99,
    subtotal: 1799.98
  }
}
```

### Funciones que debes implementar:

#### 1. `crearCarrito(idUsuario)`

**Qué debes hacer:**
- Crea Map vacío para carrito
- Crea objeto de configuración inicial:
  - idUsuario, fechaCreacion, moneda: "EUR"
  - gastosEnvio: 4.99, envioGratis: 50
- Guarda en LocalStorage con clave `carrito_${idUsuario}`
- Devuelve objeto carrito con métodos disponibles

**Ejemplo de llamada:**
```javascript
const carrito = crearCarrito(1);
console.log("Carrito creado para usuario 1");
console.log("Gastos de envío:", carrito.configuracion.gastosEnvio);
```

**Salida esperada:**
```
Carrito creado para usuario 1
Gastos de envío: 4.99
```

#### 2. `gestionarCarrito()`

**Qué debes hacer:**
- Devuelve objeto con métodos:

**agregar(idProducto, cantidad = 1):**
- Valida producto existente y stock disponible
- Si ya existe en carrito, suma cantidad
- Si es nuevo, crea entrada en Map
- Calcula automáticamente subtotal
- Persiste cambios en LocalStorage

**eliminar(idProducto):**
- Elimina producto del Map
- Persiste cambios

**calcularTotal():**
- Suma todos los subtotales
- Agrega gastos de envío si subtotal < 50
- Devuelve objeto con {subtotal, gastosEnvio, total}

**Ejemplos de llamada:**
```javascript
const carrito = crearCarrito(1);
const gestion = carrito.gestionarCarrito();

gestion.agregar(101, 2);
gestion.agregar(205, 1);
console.log("Productos en carrito:", gestion.contar());

const total = gestion.calcularTotal();
console.log("Total:", total.total);
console.log("Gastos envío:", total.gastosEnvio);
```

**Salida esperada:**
```
Productos en carrito: 2
Total: 2099.97
Gastos envío: 0
```

#### 3. `aplicarDescuento(codigo)`

**Qué debes hacer:**
- Valida códigos de descuento:
  - "DESCUENTO10": 10% de descuento
  - "DESCUENTO20": 20% de descuento
  - "ENVIOGRATIS": gastos de envío gratis
- Calcula descuento aplicado al total del carrito
- Actualiza total con descuento
- Guarda código aplicado en LocalStorage
- Devuelve objeto con {codigoValido, descuentoAplicado, totalFinal}

**Ejemplos de llamada:**
```javascript
const resultado1 = aplicarDescuento("DESCUENTO10");
console.log("Descuento 10%:", resultado1.descuentoAplicado);
console.log("Total final:", resultado1.totalFinal);

const resultado2 = aplicarDescuento("CODIGOINVALIDO");
console.log("Código válido:", resultado2.codigoValido);
```

**Salida esperada:**
```
Descuento 10%: 209.997
Total final: 1889.973
Código válido: false
```

---

## Ejercicio 6: Buscador Avanzado con Caché

**Objetivo:** Crear un motor de búsqueda con sistema de caché para optimizar búsquedas repetidas.

**Contexto:** Tu catálogo tiene muchos productos y las búsquedas pueden ser lentas. Necesitas implementar un sistema de caché que acelere las búsquedas repetidas y mejore la experiencia del usuario.

**Datos necesarios:** Arrays `productos` y `usuarios` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de índice invertido:**
```javascript
Map {
  "laptop" => {
    productos: Set {101, 102, 103},
    relevancia: 15
  }
}
```

**Map de caché:**
```javascript
Map {
  "laptop_electronica" => {
    resultados: [101, 102],
    timestamp: 1642248000000
  }
}
```

### Funciones que debes implementar:

#### 1. `construirIndiceInvertido()`

**Qué debes hacer:**
- Procesa todos los productos y usuarios
- Para cada término en nombres, descripciones, categorías:
  - Crea entrada en Map si no existe
  - Agrega IDs de productos a Set
  - Calcula relevancia basada en frecuencia
- Elimina palabras comunes (de, la, el, en, con)
- Guarda índice en LocalStorage
- Devuelve Map construido

**Ejemplo de llamada:**
```javascript
const indice = construirIndiceInvertido();
console.log("Índice construido con", indice.size, "términos");
console.log("Término 'laptop':", indice.get("laptop"));
```

**Salida esperada:**
```
Índice construido con 1250 términos
Término 'laptop': { productos: Set {101, 102, 103}, relevancia: 15 }
```

#### 2. `buscarConCache(termino, tipo = "productos")`

**Qué debes hacer:**
- Genera clave de caché: `${termino}_${tipo}`
- Primero busca en Map de caché:
  - Si existe y no ha expirado (24h), devolver desde caché
- Si no está en caché:
  - Busca en índice invertido
  - Convierte IDs a objetos completos
  - Guarda en caché con timestamp actual
- Devuelve array de resultados y metadata

**Ejemplos de llamada:**
```javascript
const resultados1 = buscarConCache("laptop");
console.log("Resultados (desde índice):", resultados1.resultados.length);

const resultados2 = buscarConCache("laptop");
console.log("Resultados (desde caché):", resultados2.desdeCache);
```

**Salida esperada:**
```
Resultados (desde índice): 8
Resultados (desde caché): true
```

#### 3. `autocompletar(parcial)`

**Qué debes hacer:**
- Busca términos en índice que comiencen con el texto parcial
- Ordena sugerencias por relevancia y frecuencia
- Limita a máximo 5 sugerencias
- Para cada sugerencia, incluye número estimado de resultados
- Devuelve array de sugerencias

**Ejemplo de llamada:**
```javascript
const sugerencias1 = autocompletar("lap");
sugerencias1.forEach(sug => {
  console.log(`${sug.termino} (${sug.resultados} resultados)`);
});

const sugerencias2 = autocompletar("s");
console.log("Sugerencias para 's':", sugerencias2.length);
```

**Salida esperada:**
```
laptop (12 resultados)
laptop gaming (5 resultados)
Sugerencias para 's': 3
```

---

## Ejercicio 7: Sistema de Notificaciones

**Objetivo:** Implementar un sistema de notificaciones inteligente con gestión de preferencias.

**Contexto:** Quieres enviar notificaciones a los usuarios sobre eventos importantes (stock bajo, nuevos productos, ofertas) pero respetando sus preferencias y horarios.

**Datos necesarios:** Arrays `usuarios` y `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de cola de notificaciones:**
```javascript
Map {
  1 => {
    id: "notif_1642248000000_1",
    tipo: "stock_bajo",
    titulo: "Stock bajo en Laptop Gaming",
    mensaje: "Quedan solo 3 unidades",
    destinatario: 1,
    leida: false
  }
}
```

### Funciones que debes implementar:

#### 1. `crearSistemaNotificaciones(idUsuario)`

**Qué debes hacer:**
- Carga preferencias desde LocalStorage o crea por defecto
- Inicializa Map vacío para cola de notificaciones
- Crea configuración inicial:
  - maxDiarias: 10, tiposHabilitados: Set
  - horarioActivo: { inicio: "08:00", fin: "22:00" }
- Guarda estado en LocalStorage
- Devuelve objeto con funcionalidades

**Ejemplo de llamada:**
```javascript
const sistema = crearSistemaNotificaciones(1);
console.log("Sistema creado para usuario 1");
console.log "Máximo diario:", sistema.configuracion.maxDiarias);
```

**Salida esperada:**
```
Sistema creado para usuario 1
Máximo diario: 10
```

#### 2. `generarNotificaciones()`

**Qué debes hacer:**
- Analiza cambios en productos favoritos (stock bajo, nuevos productos, ofertas)
- Para cada evento, verifica preferencias del usuario
- Crea objeto de notificación con:
  - ID único, tipo, título, mensaje, destinatario
  - prioridad basada en importancia
- Agrega al Map de cola
- Devuelve array de notificaciones generadas

**Ejemplo de llamada:**
```javascript
const notificaciones = generarNotificaciones();
console.log("Notificaciones generadas:", notificaciones.length);
notificaciones.slice(0, 2).forEach(not => {
  console.log(`${not.tipo}: ${not.titulo}`);
});
```

**Salida esperada:**
```
Notificaciones generadas: 3
stock_bajo: Stock bajo en Laptop Gaming Pro
nuevo_producto: Nuevo producto en Electrónica
```

#### 3. `procesarNotificaciones()`

**Qué debes hacer:**
- Recorre el Map de notificaciones no leídas
- Agrupa notificaciones similares para evitar spam
- Marca como leídas según preferencias
- Genera resumen:
  - Total procesadas, agrupadas, enviadas
  - Estadísticas por tipo
- Actualiza LocalStorage
- Devuelve objeto con resultados del procesamiento

**Ejemplo de llamada:**
```javascript
const procesamiento = procesarNotificaciones();
console.log("Notificaciones procesadas:", procesamiento.totalProcesadas);
console.log("Enviadas:", procesamiento.totalEnviadas);
console.table(procesamiento.resumenPorTipo);
```

**Salida esperada:**
```javascript
{
  totalProcesadas: 5,
  totalAgrupadas: 2,
  totalEnviadas: 4,
  resumenPorTipo: {
    "stock_bajo": { procesadas: 2, enviadas: 2 },
    "nuevo_producto": { procesadas: 3, enviadas: 2 }
  }
}
```

---

## Ejercicio 8: Gestor de Colecciones de Usuario

**Objetivo:** Crear un sistema de colecciones personalizadas donde los usuarios puedan organizar productos.

**Contexto:** Similar a Pinterest o tableros de intereses, los usuarios quieren poder crear colecciones temáticas de productos (ej: "Regalos para Navidad", "Equipamiento para home office").

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de colecciones:**
```javascript
Map {
  "tecnologia_oficina_1642248000000" => {
    id: "tecnologia_oficina_1642248000000",
    nombre: "Tecnología Oficina",
    productos: Set {101, 102, 205},
    propietario: 1,
    fechaCreacion: "2024-01-15T10:00:00Z",
    publico: true
  }
}
```

### Funciones que debes implementar:

#### 1. `crearColeccion(nombre, descripcion, esPublica = false)`

**Qué debes hacer:**
- Genera ID único basado en nombre + timestamp
- Valida que no exista colección con mismo nombre
- Crea objeto colección con estructura completa
- Agrega al Map principal
- Guarda en LocalStorage
- Devuelve true si se creó correctamente

**Ejemplos de llamada:**
```javascript
const resultado1 = crearColeccion("Tecnología Oficina", "Equipamiento para trabajo", true);
console.log("Colección pública creada:", resultado1);

const resultado2 = crearColeccion("Tecnología Oficina", "Duplicado");
console.log("Colección duplicada:", resultado2);
```

**Salida esperada:**
```
Colección pública creada: true
Colección duplicada: false
```

#### 2. `gestionarProductosColeccion(idColeccion)`

**Qué debes hacer:**
- Valida que la colección exista
- Devuelve objeto con métodos:

**agregar(idProducto):**
- Valida producto existente
- Agrega ID al Set de productos
- Actualiza estadísticas (totalProductos, valorTotal)
- Persiste cambios

**eliminar(idProducto):**
- Elimina ID del Set
- Recalcula estadísticas
- Persiste cambios

**obtenerTodos():**
- Convierte Set a array de productos completos
- Devuelve array ordenado

**Ejemplos de llamada:**
```javascript
const gestion = gestionarProductosColeccion("tecnologia_oficina_1642248000000");
gestion.agregar(101);
gestion.agregar(205);
console.log("Productos en colección:", gestion.obtenerTodos().length);

gestion.eliminar(205);
console.log("Productos después de eliminar:", gestion.obtenerTodos().length);
```

**Salida esperada:**
```
Productos en colección: 2
Productos después de eliminar: 1
```

#### 3. `analizarColeccion(idColeccion)`

**Qué debes hacer:**
- Obtiene todos los productos de la colección
- Calcula estadísticas básicas:
  - Categorías representadas (con Set)
  - Rango de precios (min, max, promedio)
  - Valoración promedio
  - Valor total de la colección
- Identifica categorías dominantes
- Devuelve objeto con análisis completo

**Ejemplo de llamada:**
```javascript
const analisis = analizarColeccion("tecnologia_oficina_1642248000000");
console.log("Categorías:", analisis.categorias);
console.log("Valor total:", analisis.valorTotal);
console.log("Valoración promedio:", analisis.valoracionPromedio);
```

**Salida esperada:**
```javascript
{
  categorias: ["Electrónica", "Muebles"],
  valorTotal: 2845.95,
  valoracionPromedio: 4.4,
  rangoPrecios: { min: 49.99, max: 1299.99 },
  totalProductos: 3
}
```

---

## Ejercicio 9: Comparador de Productos

**Objetivo:** Implementar un comparador de productos con análisis detallado de diferencias.

**Contexto:** Los usuarios quieren poder comparar productos lado a lado para tomar mejores decisiones de compra, viendo las diferencias clave y recomendaciones automáticas.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Set de productos en comparación:**
```javascript
Set {101, 102, 205}
```

**Map de diferencias:**
```javascript
Map {
  "101-102" => {
    precio: { valor1: 899.99, valor2: 1299.99, diferencia: 400 },
    valoracion: { valor1: 4.5, valor2: 4.8, diferencia: 0.3 }
  }
}
```

### Funciones que debes implementar:

#### 1. `crearComparador(maxProductos = 4)`

**Qué debes hacer:**
- Inicializa Set vacío para productos en comparación
- Establece límite máximo de productos
- Crea Map vacío para diferencias
- Guarda estado inicial en LocalStorage
- Devuelve objeto con métodos del comparador

**Ejemplo de llamada:**
```javascript
const comparador = crearComparador(3);
console.log("Comparador creado");
console.log("Máximo productos:", comparador.configuracion.maxProductos);
console.log("Productos actuales:", comparador.obtenerCount());
```

**Salida esperada:**
```
Comparador creado
Máximo productos: 3
Productos actuales: 0
```

#### 2. `agregarProductoComparacion(idProducto)`

**Qué debes hacer:**
- Valida producto existente y límite no alcanzado
- Si hay productos, valida misma categoría
- Agrega ID al Set
- Para cada producto existente, calcula diferencias:
  - Precio (absoluto y porcentual)
  - Valoración
  - Stock
- Guarda en Map de diferencias
- Persiste cambios
- Devuelve true si se agregó correctamente

**Ejemplos de llamada:**
```javascript
const resultado1 = agregarProductoComparacion(101);
console.log("Producto 101 agregado:", resultado1);

const resultado2 = agregarProductoComparacion(102);
console.log("Producto 102 agregado:", resultado2);

const resultado3 = agregarProductoComparacion(301); // Distinta categoría
console.log("Producto 301:", resultado3);
```

**Salida esperada:**
```
Producto 101 agregado: true
Producto 102 agregado: true
Producto 301: false
```

#### 3. `generarTablaComparativa()`

**Qué debes hacer:**
- Crea tabla con productos en comparación
- Incluye filas para: nombre, precio, valoración, stock
- Para cada fila, identifica el mejor valor
- Calcula puntuación general para cada producto
- Identifica producto recomendado
- Devuelve objeto con tabla y recomendación

**Ejemplo de llamada:**
```javascript
const tabla = generarTablaComparativa();
console.log("Recomendación:", tabla.recomendacion.nombre);
console.log("Puntuación:", tabla.recomendacion.puntuacion);

tabla.filas.forEach(fila => {
  console.log(`${fila.caracteristica}: ${fila.valores.join(" | ")}`);
});
```

**Salida esperada:**
```
Recomendación: Laptop Ultra
Puntuación: 92
Nombre: Laptop Gaming Pro | Laptop Ultra | Silla Ergonómica
Precio: 899.99€ ⭐ | 1299.99€ | 299.99€ ⭐⭐
Valoración: 4.5 | 4.8 ⭐ | 4.2
```

---

## Ejercicio 10: Analizador de Rendimiento de Productos

**Objetivo:** Crear un sistema de análisis de rendimiento de productos con métricas detalladas.

**Contexto:** Necesitas entender qué productos funcionan mejor, cuáles son más rentables y cuáles necesitan atención para poder optimizar tu inventario y estrategia de precios.

**Datos necesarios:** Arrays `productos` y `pedidos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de métricas:**
```javascript
Map {
  101 => {
    id: 101,
    ventasTotales: 150,
    ingresosTotales: 134998.50,
    margenPorcentual: 40.0,
    valoracionMedia: 4.5
  }
}
```

### Funciones que debes implementar:

#### 1. `calcularMetricasProductos()`

**Qué debes hacer:**
- Para cada producto, analiza sus pedidos
- Calcula métricas básicas:
  - Total unidades vendidas
  - Ingresos totales (suma de precios × cantidad)
  - Margen porcentual (simulado 40% del precio)
  - Valoración promedio
- Guarda todas las métricas en Map
- Persiste en LocalStorage

**Ejemplo de llamada:**
```javascript
const metricas = calcularMetricasProductos();
console.log("Métricas calculadas para", metricas.size, "productos");

const laptopMetrics = metricas.get(101);
console.log("Ventas laptop:", laptopMetrics.ventasTotales);
console.log("Ingresos:", laptopMetrics.ingresosTotales);
```

**Salida esperada:**
```
Métricas calculadas para 50 productos
Ventas laptop: 150
Ingresos: 134998.50
```

#### 2. `analizarRentabilidad(idProducto)`

**Qué debes hacer:**
- Obtiene métricas del producto
- Calcula costes estimados:
  - Coste producto: 60% del precio
  - Coste envío: 10% si < 100€, gratis si > 100€
  - Costes procesamiento: 3% fijo
- Calcula margen neto (ingresos - costes)
- Identifica factores que afectan rentabilidad
- Devuelve objeto con análisis completo

**Ejemplo de llamada:**
```javascript
const rentabilidad = analizarRentabilidad(101);
console.log("Margen neto:", rentabilidad.margenNeto.porcentual + "%");
console.log("Costes totales:", rentabilidad.costesTotales);
console.log("Ingresos netos:", rentabilidad.ingresosNetos);
```

**Salida esperada:**
```javascript
{
  margenNeto: { valor: 287.99, porcentual: 32.0 },
  costesTotales: 612.00,
  ingresosNetos: 287.99,
  factoresRentabilidad: ["Alto volumen de ventas", "Buen precio unitario"]
}
```

#### 3. `generarAlertasRendimiento()`

**Qué debes hacer:**
- Analiza todas las métricas para identificar alertas
- Tipos de alertas:
  - "baja_rentabilidad": margen < 20%
  - "bajas_ventas": < 10 unidades vendidas
  - "baja_valoracion": valoración < 3.0
- Para cada alerta, incluye urgencia y acción recomendada
- Devuelve array de alertas ordenadas por urgencia

**Ejemplo de llamada:**
```javascript
const alertas = generarAlertasRendimiento();
console.log("Alertas generadas:", alertas.length);
console.log("Alertas críticas:", alertas.filter(a => a.urgencia === "alta").length);

alertas.slice(0, 3).forEach(alerta => {
  console.log(`${alerta.tipo}: ${alerta.producto.nombre} - ${alerta.accion}`);
});
```

**Salida esperada:**
```
Alertas generadas: 8
Alertas críticas: 3
baja_rentabilidad: Mouse Básico - Revisar costes o aumentar precio
bajas_ventas: Webcam Básica - Mejorar marketing o eliminar producto
baja_valoracion: Teclado Simple - Investigar problemas de calidad
```

---

## Ejercicio 11: Sistema de Preferencias de Usuario

**Objetivo:** Crear un sistema de gestión de preferencias personalizadas con persistencia.

**Contexto:** Cada usuario tiene preferencias diferentes (tema visual, idioma, moneda, categorías favoritas) y quieres que estas se guarden y se apliquen automáticamente en cada visita.

**Datos necesarios:** Array `usuarios` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de preferencias:**
```javascript
Map {
  1 => {
    tema: "oscuro",
    idioma: "es",
    moneda: "EUR",
    categoriasFavoritas: Set {"Electrónica", "Muebles"},
    notificaciones: true
  }
}
```

### Funciones que debes implementar:

#### 1. `inicializarPreferencias(idUsuario)`

**Qué debes hacer:**
- Carga preferencias desde LocalStorage o crea por defecto
- Estructura por defecto:
  - tema: "claro", idioma: "es", moneda: "EUR"
  - categoriasFavoritas: Set vacío
  - notificaciones: true, productosPorPagina: 12
- Valida que el usuario exista
- Guarda en Map con clave = idUsuario
- Devuelve preferencias cargadas

**Ejemplo de llamada:**
```javascript
const prefs = inicializarPreferencias(1);
console.log("Preferencias inicializadas para usuario 1");
console.log("Tema:", prefs.tema);
console.log("Categorías favoritas:", [...prefs.categoriasFavoritas]);
```

**Salida esperada:**
```
Preferencias inicializadas para usuario 1
Tema: claro
Categorías favoritas: []
```

#### 2. `actualizarPreferencia(idUsuario, clave, valor)`

**Qué debes hacer:**
- Valida que el usuario tenga preferencias
- Valida que la clave exista y el valor sea correcto según tipo
- Actualiza preferencia específica
- Actualiza timestamp de última modificación
- Persiste cambios en LocalStorage
- Devuelve true si actualización exitosa

**Ejemplos de llamada:**
```javascript
const resultado1 = actualizarPreferencia(1, "tema", "oscuro");
console.log("Tema actualizado:", resultado1);

const resultado2 = actualizarPreferencia(1, "idioma", "en");
console.log("Idioma actualizado:", resultado2);

const resultado3 = actualizarPreferencia(1, "moneda", "USD");
console.log("Moneda actualizada:", resultado3);
```

**Salida esperada:**
```
Tema actualizado: true
Idioma actualizado: true
Moneda actualizada: true
```

#### 3. `obtenerRecomendacionesPersonalizadas(idUsuario)`

**Qué debe hacer:**
- Obtiene preferencias del usuario
- Basado en categorías favoritas, sugiere productos
- Considera moneda preferida para mostrar precios
- Aplica tema para formato de presentación
- Limita a 5 recomendaciones
- Devuelve array de productos personalizados

**Ejemplo de llamada:**
```javascript
// Primero agregar algunas categorías favoritas
actualizarPreferencia(1, "categoriasFavoritas", new Set(["Electrónica", "Muebles"]));

const recomendaciones = obtenerRecomendacionesPersonalizadas(1);
console.log("Recomendaciones personalizadas:", recomendaciones.length);
recomendaciones.forEach(rec => {
  console.log(`${rec.nombre} - ${rec.precio} ${rec.moneda}`);
});
```

**Salida esperada:**
```
Recomendaciones personalizadas: 5
Laptop Gaming Pro - 899.99 EUR
Silla Ergonómica - 299.99 EUR
Monitor Curvo - 449.99 EUR
Teclado Mecánico - 89.99 EUR
Mouse Gaming - 49.99 EUR
```

---

## Ejercicio 12: Historial de Navegación de Productos

**Objetivo:** Implementar un sistema de historial de productos visitados con análisis de comportamiento.

**Contexto:** Quieres registrar qué productos mira cada usuario para poder entender sus intereses y ofrecer recomendaciones basadas en su historial de navegación.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de historial:**
```javascript
Map {
  1 => {
    idUsuario: 1,
    visitas: [
      { idProducto: 101, timestamp: 1642248000000, duracion: 45 },
      { idProducto: 205, timestamp: 1642248100000, duracion: 120 }
    ],
    productosVisitados: Set {101, 205}
  }
}
```

### Funciones que debes implementar:

#### 1. `registrarVisita(idUsuario, idProducto, duracion = 0)`

**Qué debes hacer:**
- Valida que el producto exista
- Obtiene historial del usuario o crea nuevo
- Agrega visita con:
  - idProducto, timestamp actual, duración en segundos
- Agrega producto a Set de productos visitados
- Limita historial a últimas 50 visitas
- Persiste en LocalStorage
- Devuelve true si registro exitoso

**Ejemplos de llamada:**
```javascript
const resultado1 = registrarVisita(1, 101, 45);
console.log("Visita registrada:", resultado1);

const resultado2 = registrarVisita(1, 205, 120);
console.log("Visita registrada:", resultado2);

const resultado3 = registrarVisita(1, 101, 30); // Segunda visita al mismo producto
console.log("Visita repetida registrada:", resultado3);
```

**Salida esperada:**
```
Visita registrada: true
Visita registrada: true
Visita repetida registrada: true
```

#### 2. `obtenerHistorial(idUsuario, limite = 10)`

**Qué debes hacer:**
- Obtiene historial del usuario
- Ordena visitas por timestamp descendente (más recientes primero)
- Limita al número solicitado
- Enriquece con información completa de productos
- Calcula estadísticas adicionales:
  - Tiempo total de navegación
  - Producto más visitado
  - Categorías más vistas
- Devuelve objeto con historial y estadísticas

**Ejemplo de llamada:**
```javascript
const historial = obtenerHistorial(1, 5);
console.log("Últimas 5 visitas:");
historial.visitas.forEach(visita => {
  console.log(`${visita.producto.nombre} - ${visita.duracion} segundos`);
});

console.log("Producto más visitado:", historial.productoMasVisitado.nombre);
console.log("Categorías más vistas:", historial.categoriasMasVistas);
```

**Salida esperada:**
```
Últimas 5 visitas:
Silla Ergonómica - 120 segundos
Laptop Gaming Pro - 30 segundos
Laptop Gaming Pro - 45 segundos
Producto más visitado: Laptop Gaming Pro
Categorías más vistas: ["Electrónica", "Muebles"]
```

#### 3. `generarRecomendacionesBasadasEnHistorial(idUsuario)`

**Qué debe hacer:**
- Analiza historial de visitas del usuario
- Identifica categorías más visitadas
- Encuentra productos similares a los visitados frecuentemente
- Excluye productos ya visitados
- Prioriza productos de categorías favoritas
- Considera tiempo promedio de visita como indicador de interés
- Devuelve array de productos recomendados

**Ejemplo de llamada:**
```javascript
const recomendaciones = generarRecomendacionesBasadasEnHistorial(1);
console.log("Recomendaciones basadas en historial:", recomendaciones.length);
recomendaciones.forEach(rec => {
  console.log(`${rec.nombre} - ${rec.justificacion}`);
});
```

**Salida esperada:**
```
Recomendaciones basadas en historial: 4
Monitor Curvo 27" - Similar a productos de Electrónica que has visitado
Teclado Mecánico RGB - Complemento ideal para laptops gaming
Webcam HD - Popular entre usuarios que visitan productos de oficina
Altavoz Bluetooth - Categoría Electrónica con buena valoración
```

---

## Ejercicio 13: Gestor de Descuentos y Promociones

**Objetivo:** Implementar un sistema de gestión de descuentos inteligente con validaciones.

**Contexto:** Quieres ofrecer descuentos y promociones a tus clientes, pero con reglas claras, límites de uso y validaciones para evitar abusos y asegurar rentabilidad.

**Datos necesarios:** Array `productos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de promociones:**
```javascript
Map {
  "VERANO20" => {
    codigo: "VERANO20",
    tipo: "porcentaje",
    valor: 20,
    categoriaAplicable: "Electrónica",
    usosRestantes: 100,
    fechaExpiracion: "2024-08-31"
  }
}
```

### Funciones que debes implementar:

#### 1. `crearPromocion(codigo, tipo, valor, restricciones = {})`

**Qué debe hacer:**
- Valida parámetros:
  - tipo: "porcentaje" o "fijo"
  - valor: positivo y límites lógicos (porcentaje ≤ 100)
- Crea objeto promoción con:
  - código, tipo, valor
  - restricciones: categoriaAplicable, minimoCompra, productosExcluidos
  - usosRestantes, fechaExpiracion
  - fechaCreacion
- Agrega al Map de promociones
- Guarda en LocalStorage
- Devuelve true si creación exitosa

**Ejemplos de llamada:**
```javascript
const resultado1 = crearPromocion("VERANO20", "porcentaje", 20, {
  categoriaAplicable: "Electrónica",
  minimoCompra: 100
});
console.log("Promoción creada:", resultado1);

const resultado2 = crearPromocion("FIJO50", "fijo", 50, {
  productosExcluidos: [101, 102]
});
console.log("Promoción fija creada:", resultado2);
```

**Salida esperada:**
```
Promoción creada: true
Promoción fija creada: true
```

#### 2. `aplicarDescuento(codigo, productos)`

**Qué debe hacer:**
- Valida que el código exista
- Verifica que la promoción esté vigente:
  - No ha expirado
  - Tiene usos restantes
- Calcula descuento aplicable:
  - Porcentaje: (total × porcentaje/100)
  - Fijo: valor fijo (sin superar el total)
- Aplica restricciones:
  - Si tiene categoría aplicable, solo afecta a productos de esa categoría
  - Si tiene mínimo compra, valida total antes de descuento
- Actualiza usos restantes
- Devuelve objeto con descuento aplicado y total final

**Ejemplos de llamada:**
```javascript
const productos = [
  { id: 101, categoria: "Electrónica", precio: 899.99 },
  { id: 205, categoria: "Muebles", precio: 299.99 }
];

const resultado1 = aplicarDescuento("VERANO20", productos);
console.log("Descuento aplicado:", resultado1.descuentoAplicado);
console.log("Total final:", resultado1.totalFinal);

const resultado2 = aplicarDescuento("CODIGOINVALIDO", productos);
console.log("Código válido:", resultado2.codigoValido);
```

**Salida esperada:**
```
Descuento aplicado: 180.00
Total final: 1019.98
Código válido: false
```

#### 3. `obtenerPromocionesDisponibles(totalCarrito, productos)`

**Qué debe hacer:**
- Filtra promociones vigentes (no expiradas, con usos)
- Para cada promoción, verifica si aplica:
  - Cumple mínimo de compra
  - Hay productos de categoría aplicable
  - No todos los productos están excluidos
- Calcula beneficio estimado para cada promoción aplicable
- Ordena por beneficio descendente
- Devuelve array de promociones aplicables con beneficio estimado

**Ejemplo de llamada:**
```javascript
const productos = [
  { id: 101, categoria: "Electrónica", precio: 899.99 },
  { id: 205, categoria: "Muebles", precio: 299.99 }
];

const disponibles = obtenerPromocionesDisponibles(1199.98, productos);
console.log("Promociones disponibles:", disponibles.length);
disponibles.forEach(promo => {
  console.log(`${promo.codigo} - Ahorro estimado: ${promo.beneficioEstimado}€`);
});
```

**Salida esperada:**
```
Promociones disponibles: 2
VERANO20 - Ahorro estimado: 180.00€
FIJO50 - Ahorro estimado: 50.00€
```

---

## Ejercicio 14: Gestor de Valoraciones y Reseñas

**Objetivo:** Crear un sistema de gestión de valoraciones y reseñas de productos.

**Contexto:** Las valoraciones y reseñas son cruciales para la confianza de los clientes. Necesitas un sistema que permita valorar productos, mostrar reseñas útiles y mantener la calidad del contenido.

**Datos necesarios:** Arrays `productos` y `usuarios` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de valoraciones:**
```javascript
Map {
  "101_1" => {
    idProducto: 101,
    idUsuario: 1,
    valoracion: 5,
    reseña: "Excelente producto, muy rápido",
    fecha: "2024-01-15T10:00:00Z",
    util: 12
  }
}
```

### Funciones que debes implementar:

#### 1. `agregarValoracion(idProducto, idUsuario, valoracion, reseña = "")`

**Qué debe hacer:**
- Valida que producto y usuario existan
- Valida que valoración esté entre 1 y 5
- Verifica que el usuario no haya valorado antes el producto
- Crea objeto valoración con:
  - idProducto, idUsuario, valoracion, reseña
  - fecha actual, util: 0
- Genera ID único: `${idProducto}_${idUsuario}`
- Agrega al Map de valoraciones
- Actualiza valoración promedio del producto
- Persiste en LocalStorage
- Devuelve true si agregado exitosamente

**Ejemplos de llamada:**
```javascript
const resultado1 = agregarValoracion(101, 1, 5, "Excelente laptop para gaming");
console.log("Valoración agregada:", resultado1);

const resultado2 = agregarValoracion(101, 1, 4, "Segunda valoración"); // Duplicado
console.log("Valoración duplicada:", resultado2);

const resultado3 = agregarValoracion(101, 2, 4, "Buena relación calidad-precio");
console.log("Valoración usuario 2:", resultado3);
```

**Salida esperada:**
```
Valoración agregada: true
Valoración duplicada: false
Valoración usuario 2: true
```

#### 2. `obtenerValoracionesProducto(idProducto, limite = 10)`

**Qué debe hacer:**
- Filtra valoraciones por idProducto
- Ordena por fecha descendente (más recientes primero)
- Enriquece con información de usuarios (nombre)
- Limita al número solicitado
- Calcula estadísticas adicionales:
  - Distribución por valoración (1-5 estrellas)
  - Promedio de "útil" por reseña
  - Reseña más útil
- Devuelve objeto con valoraciones y estadísticas

**Ejemplo de llamada:**
```javascript
const valoraciones = obtenerValoracionesProducto(101, 5);
console.log("Valoraciones del producto 101:");
valoraciones.reseñas.forEach(res => {
  console.log(`${res.usuario.nombre} - ${res.valoracion}⭐ - ${res.reseña}`);
});

console.log("Promedio valoración:", valoraciones.promedioValoracion);
console.log("Total valoraciones:", valoraciones.totalValoraciones);
console.log("Distribución:", valoraciones.distribucion);
```

**Salida esperada:**
```
Valoraciones del producto 101:
Ana García - 5⭐ - Excelente laptop para gaming
Carlos Ruiz - 4⭐ - Buena relación calidad-precio
Promedio valoración: 4.5
Total valoraciones: 2
Distribución: { "5": 1, "4": 1, "3": 0, "2": 0, "1": 0 }
```

#### 3. `marcarReseñaUtil(idProducto, idUsuario)`

**Qué debe hacer:**
- Encuentra valoración específica por producto y usuario
- Incrementa contador de "útil"
- Actualiza timestamp de última modificación
- Guarda cambios en LocalStorage
- Devuelve nuevo total de "útil"

**Ejemplos de llamada:**
```javascript
const resultado1 = marcarReseñaUtil(101, 1);
console.log("Reseña marcada como útil, total:", resultado1);

const resultado2 = marcarReseñaUtil(101, 1);
console.log("Segunda marca, total:", resultado2);

const resultado3 = marcarReseñaUtil(101, 999); // No existe
console.log("Reseña no encontrada:", resultado3);
```

**Salida esperada:**
```
Reseña marcada como útil, total: 1
Segunda marca, total: 2
Reseña no encontrada: null
```

---

## Ejercicio 15: Sistema de Recomendaciones Simple

**Objetivo:** Crear un sistema básico de recomendaciones de productos basado en perfiles de usuario.

**Contexto:** Para mejorar las ventas y la experiencia del usuario, quieres recomendar productos personalizados basados en el comportamiento histórico y preferencias de cada cliente.

**Datos necesarios:** Arrays `usuarios`, `productos` y `pedidos` del archivo `src/db/data.js`

### Estructura de datos que debes utilizar:

**Map de perfiles de recomendación:**
```javascript
Map {
  1 => {
    idUsuario: 1,
    categoriasPreferidas: ["Electrónica", "Muebles"],
    rangoPrecio: { min: 100, max: 1000 },
    productosComprados: Set {101, 205},
    productosVistos: Set {102, 308}
  }
}
```

### Funciones que debes implementar:

#### 1. `construirPerfilRecomendacion(idUsuario)`

**Qué debe hacer:**
- Analiza historial del usuario:
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

**Ejemplo de llamada:**
```javascript
const perfil = construirPerfilRecomendacion(1);
console.log("Perfil construido para usuario 1");
console.log("Categorías preferidas:", perfil.categoriasPreferidas);
console.log("Rango de precio:", perfil.rangoPrecio);
console.log("Productos comprados:", perfil.productosComprados.size);
```

**Salida esperada:**
```
Perfil construido para usuario 1
Categorías preferidas: ["Electrónica", "Muebles"]
Rango de precio: { min: 100, max: 1000, promedio: 550 }
Productos comprados: 5
```

#### 2. `generarRecomendacionesBasadasPerfil(idUsuario, cantidad = 5)`

**Qué debe hacer:**
- Obtiene perfil del usuario
- Filtra productos por:
  - Categorías preferidas del perfil
  - Rango de precio del perfil
  - Stock disponible > 0
  - Excluir productos ya comprados
- Calcula puntuación de recomendación:
  - Coincidencia con categorías preferidas (40%)
  - Ajuste a rango de precio (30%)
  - Valoración del producto (20%)
  - Popularidad (ventas) (10%)
- Ordena por puntuación descendente
- Limita a cantidad solicitada
- Devuelve array de productos recomendados

**Ejemplo de llamada:**
```javascript
const recomendaciones = generarRecomendacionesBasadasPerfil(1, 3);
console.log("Recomendaciones generadas:", recomendaciones.length);
recomendaciones.forEach(rec => {
  console.log(`${rec.nombre} - Puntuación: ${rec.puntuacion} - ${rec.justificacion}`);
});
```

**Salida esperada:**
```
Recomendaciones generadas: 3
Laptop Ultra - Puntuación: 92 - Coincide con categoría Electrónica y rango de precio
Monitor Curvo - Puntuación: 85 - Alta valoración y ajuste perfecto a rango de precio
Silla Ejecutiva - Puntuación: 78 - Segunda categoría preferida con excelente relación calidad-precio
```

#### 3. `evaluarCalidadRecomendaciones(idUsuario, recomendaciones)`

**Qué debe hacer:**
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

**Ejemplo de llamada:**
```javascript
const recomendaciones = generarRecomendacionesBasadasPerfil(1, 5);
const calidad = evaluarCalidadRecomendaciones(1, recomendaciones);
console.log("Diversidad de categorías:", calidad.diversidad);
console.log("Relevancia precio:", calidad.relevanciaPrecio);
console.log("Calidad promedio:", calidad.calidadPromedio);
console.log("Sugerencias de mejora:", calidad.sugerencias);
```

**Salida esperada:**
```javascript
{
  diversidad: 0.8,
  relevanciaPrecio: 0.9,
  calidadPromedio: 4.3,
  sugerencias: [
    "Incluir más productos de categoría Muebles",
    "Considerar productos ligeramente por encima del rango de precio",
    "Diversificar más en rangos de valoración"
  ]
}
```

---

## Notas Finales

**Criterios de evaluación:**

- **Funcionalidad Correcta (40%):** El código funciona como esperado
- **Uso Adecuado de Estructuras (30%):** Elección correcta de arrays, objetos, Map, Set, LocalStorage
- **Calidad del Código (20%):** Buenas prácticas, modularidad, manejo de errores
- **Persistencia y Estado (10%):** Uso correcto de LocalStorage y gestión de estado

**Consejos para los alumnos:**

1. **Planificación:** Lee todo el enunciado antes de empezar a programar
2. **Pruebas:** Prueba cada función individualmente antes de integrar
3. **Validación:** Siempre valida los datos de entrada
4. **Persistencia:** Acuérdate de guardar cambios en LocalStorage
5. **Documentación:** Comenta las partes más complejas del código

**Tiempo límite:** 2-3 horas por ejercicio

¡Mucha suerte en el examen!