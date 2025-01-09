// config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coffee Shop API',
            version: '1.0.0',
            description: 'API documentation for the Coffee Shop application',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };



// import swaggerAutogen from 'swagger-autogen';
//
// const outputFile = './swagger-output.json'; // Путь к выходному файлу JSON
// const endpointsFiles = ['../routes/*.js']; // Путь к файлам с маршрутами
//
// // Генерация документации
// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//     import('./app.js'); // Запуск приложения после генерации документации
// });
