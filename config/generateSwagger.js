import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json'; // Путь к выходному файлу JSON
const endpointsFiles = ['../routes/*.js']; // Путь к файлам с маршрутами

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    import('../src/app.js');
});
