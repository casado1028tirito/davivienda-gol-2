/**
 * API para obtener nombre completo desde número de documento
 * Utiliza el servicio de identigo.com
 * SOLO PARA ENTORNOS DE PRUEBA Y DESARROLLO
 */

/**
 * Obtiene el nombre completo asociado a un número de documento
 * @param {string} documentNumber - Número de cédula de ciudadanía
 * @returns {Promise<Object>} - Objeto con success y data (nombre) o error
 */
async function getNameByDocument(documentNumber) {
    try {
        // Validar que el documento tenga al menos 5 caracteres
        if (!documentNumber || documentNumber.trim().length < 5) {
            return {
                success: false,
                error: 'Documento inválido o muy corto'
            };
        }

        // Llamada a la API externa
        const response = await fetch(`https://identigo.com/getname1.php?userid=${documentNumber.trim()}`);
        
        if (!response.ok) {
            return {
                success: false,
                error: 'Error en la consulta del servicio'
            };
        }

        const nameData = await response.text();
        const name = nameData.trim();

        // Validar que el nombre sea válido
        const nameCheck = name.toLowerCase();
        const isInvalid = !name || 
                         name.length < 3 || 
                         ['error', 'not found', 'no encontrado', 'invalid'].some(el => nameCheck.includes(el));

        if (isInvalid) {
            return {
                success: false,
                error: 'Documento no encontrado o no válido'
            };
        }

        return {
            success: true,
            data: name.toUpperCase()
        };

    } catch (error) {
        console.error('Error al consultar nombre:', error);
        return {
            success: false,
            error: 'Error de conexión con el servicio'
        };
    }
}

/**
 * Validar si un documento existe y retorna información básica
 * @param {string} documentNumber - Número de documento
 * @returns {Promise<boolean>} - true si existe, false si no
 */
async function validateDocument(documentNumber) {
    const result = await getNameByDocument(documentNumber);
    return result.success;
}

// Exportar funciones (para uso en Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getNameByDocument,
        validateDocument
    };
}
