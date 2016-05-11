// Conexión a la base de datos
exports.connectionString = "postgres://calificador:calificador@tallercloud-bbdd.cloudapp.net:5432/calificaciones";

// Manejador de errores
exports.error = function(err, res, mensaje) {
	console.log(err);
	res.status(500);
	res.render("error", {
		mensaje: mensaje
	});
};
