import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output-cart.json'; // Путь к выходному файлу JSON
const endpointsFiles = ['../routes/cartRouter.js']; // Путь к файлам с маршрутами

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    import('../src/app.js');
});
