# 🌟 Prueba Técnica Fullstack 🌟

Este proyecto permite calcular reajustes e intereses de boletas vencidas, con un frontend en **Vue.js** y un backend en **Node.js + Express.js**, utilizando **MySQL** para persistencia de datos.

## 🚀 Funcionalidades

- **Ingreso de datos**: Monto, fecha de vencimiento y fecha de pago.
- **Cálculos**: Calcula reajuste y multa por atraso.
- **Persistencia**: Almacena los datos y resultados en la base de datos.
- **Auditoría**: Vista `/audit` para consultar las consultas realizadas.

## 📋 Requisitos

- **Node.js** (v14+)
- **MySQL** (o cualquier base de datos SQL)
- **Vue.js**

## 🛠️ Instalación

### Backend

1. Clona el repositorio y ve al directorio `backend-prueba-tecnica`:

    ```bash
    git clone <url_del_repositorio>
    cd prueba-tecnica-one
    cd backend-prueba-tecnica
    ```

2. Instala dependencias:

    ```bash
    npm install
    ```

3. Crear archivo `.env` para manejar las variables de entorno

   - Configura las variables de entorno en `.env`:

    ```plaintext
    API_REAJUSTE_URL=http://167.99.237.168:9073/one/api_pc_one_test/public
    API_UTM_URL=https://mindicador.cl/api/utm/
    API_USERNAME=APIUSERNAME
    API_PASSWORD=APIPASSWORD
    PORT=3000

    DB_HOST=localhost
    DB_USER=USER
    DB_PASSWORD=PASSWORD
    DB_NAME=DBNOMBRE
    ```

    !! IMPORTANTE TENER PREVIAMENTE CREADA UNA BBDD CON UN USUARIO CON LOS PERMISOS CORRESPONDIENTES PARA REALIZAR LAS CONSULTAS !!

4. Una vez que insertaste las variables de entorno necesarias (credenciales BBDD) inicia el script `install.js` para crear las tablas correspondientes al programa:

    ```bash
    node install.js 
    ```

5. Luego sincroniza las tablas con los modelos del programa con:

    ```bash
    node syncModel.js
    ```

6. Inicia el backend:

    ```bash
    npm run dev
    ```

### Frontend

1. Ve al directorio `frontend-prueba-tecnica`:

    ```bash
    cd frontend-prueba-tecnica
    ```

2. Instala dependencias:

    ```bash
    npm install
    ```

3. Inicia el frontend:

    ```bash
    npm run dev
    ```

## 💻 Uso

- Ingresa monto, fecha de vencimiento y fecha de pago.
- Los cálculos de reajuste y multa se muestran automáticamente.

## 🌐 API Externa

- **Reajuste**: `/v1/reajuste/custom?anio_registro=X&mes_registro=X&anio_pago=X&mes_pago=X`
- **UTM**: `https://mindicador.cl/api/utm/{dd-mm-yyyy}`

## 📊 Monitoreo de API

- La data de la API está disponible en [`swagger-stats`] en la ruta `/api-metrics`. Aquí puedes ver estadísticas detalladas sobre el uso de la API.

## 📜 Endpoints

- **POST /api/reajustes/calcular**: Calcula el reajuste y multa de un monto.
- **POST /api/audit/auditoria**: Crea un nuevo registro de auditoría.
- **GET /api/audit/auditorias**: Recupera todos los registros de auditoría.
- **GET /api/audit/auditorias/fecha**: Recupera registros de auditoría dentro de un rango de fechas específico.


## 📦 Dependencias Importantes

### Frontend

- **Vue.js**: Framework progresivo para construir interfaces de usuario.
- **Pinia**: Sistema de gestión de estado para Vue.js.
- **Vue Router**: Enrutador oficial para Vue.js.
- **Axios**: Cliente HTTP basado en promesas para el navegador y Node.js.
- **TailwindCSS**: Framework de CSS utilitario para un diseño rápido y eficiente.

### Backend

- **Express.js**: Framework web rápido y minimalista para Node.js.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **Swagger-Stats**: Middleware para monitorear y analizar el rendimiento de la API.