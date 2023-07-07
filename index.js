// Importar los módulos necesarios
const http = require('http');

// Crear una matriz para almacenar los datos de los vehículos
let vehiculos = [];

// Función para generar un ID automático
function generateId() {
  return Date.now().toString();
}

// Buscar un vehículo por ID
function findVehiculoById(id) {
  return vehiculos.find((vehiculo) => vehiculo.id === id);
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  if (req.url === '/vehiculos' && req.method === 'POST') {
    // Manejar la solicitud de agregar un vehículo
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const vehiculo = JSON.parse(body);
      const id = generateId();
      vehiculo.id = id;
      vehiculos.push(vehiculo);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Vehículo agregado exitosamente', id: id }));
    });
  } else if (req.url.startsWith('/vehiculos/') && req.method === 'PUT') {
    // Manejar la solicitud de editar un vehículo
    const urlParts = req.url.split('/');
    const id = urlParts[2];
    const vehiculo = findVehiculoById(id);

    if (vehiculo) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const updatedVehiculo = JSON.parse(body);
        vehiculo.nombre = updatedVehiculo.nombre;
        vehiculo.descripcion = updatedVehiculo.descripcion;
        vehiculo.placa = updatedVehiculo.placa;
        vehiculo.color = updatedVehiculo.color;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Vehículo actualizado exitosamente' }));
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Vehículo no encontrado' }));
    }
  } else if (req.url.startsWith('/vehiculos/') && req.method === 'DELETE') {
    // Manejar la solicitud de eliminar un vehículo
    const urlParts = req.url.split('/');
    const id = urlParts[2];
    const index = vehiculos.findIndex((vehiculo) => vehiculo.id === id);

    if (index !== -1) {
      vehiculos.splice(index, 1);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Vehículo eliminado exitosamente' }));
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Vehículo no encontrado' }));
    }
  } else if (req.url === '/vehiculos' && req.method === 'GET') {
    // Manejar la solicitud de obtener todos los vehículos
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(vehiculos));
  } else {
    // Manejar rutas no encontradas
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
  }
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});


