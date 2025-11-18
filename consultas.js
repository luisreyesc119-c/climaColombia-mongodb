// Base: climaColombia, colección: estaciones

// =======================
// 1. Consultas básicas (CRUD)
// =======================

// Inserción de un documento
db.estaciones.insertOne({
  FECHA: "2025 Nov 14 10:00:00 AM",
  "NOMBRE ESTACION": "Estación Demo",
  "PARAMETRO(TIPO)": "PRECIPITACIÓN",
  VALOR: 12.3,
  "UNIDAD DE MEDIDA": "mm"
});

// Inserción de varios documentos
db.estaciones.insertMany([
  {
    FECHA: "2025 Nov 14 11:00:00 AM",
    "NOMBRE ESTACION": "Estación Demo",
    "PARAMETRO(TIPO)": "PRECIPITACIÓN",
    VALOR: 8.1,
    "UNIDAD DE MEDIDA": "mm"
  },
  {
    FECHA: "2025 Nov 14 12:00:00 AM",
    "NOMBRE ESTACION": "Estación Demo",
    "PARAMETRO(TIPO)": "PRECIPITACIÓN",
    VALOR: 0.0,
    "UNIDAD DE MEDIDA": "mm"
  }
]);

// Selección de documentos
db.estaciones.find({ "NOMBRE ESTACION": "LA BALSA" });

// Actualización de un documento
db.estaciones.updateOne(
  { "NOMBRE ESTACION": "Estación Demo" },
  { $set: { VALOR: 15.0 } }
);

// Eliminación de un documento
db.estaciones.deleteOne({ "NOMBRE ESTACION": "Estación Demo" });


// =======================
// 2. Consultas con filtros y operadores
// =======================

// Precipitación mayor a 50 mm
db.estaciones.find({ "PARAMETRO(TIPO)": "PRECIPITACIÓN", VALOR: { $gt: 50 } });


});


// =======================
// 3. Consultas de agregación (estadísticas)
// =======================

// Conteo de registros por estación
db.estaciones.aggregate([
  { $group: { _id: "$NOMBRE ESTACION", totalRegistros: { $count: {} } } },
  { $sort: { totalRegistros: -1 } }
]);

// Suma de precipitación por estación
db.estaciones.aggregate([
  { $match: { "PARAMETRO(TIPO)": "PRECIPITACIÓN" } },
  { $group: { _id: "$NOMBRE ESTACION", sumaPrecipitacion: { $sum: "$VALOR" } } },
  { $sort: { sumaPrecipitacion: -1 } }
]);

// Promedio de caudal por estación
db.estaciones.aggregate([
  { $match: { "PARAMETRO(TIPO)": "CAUDAL" } },
  { $group: { _id: "$NOMBRE ESTACION", promedioCaudal: { $avg: "$VALOR" } } },
  { $sort: { promedioCaudal: -1 } }
]);

// Máximos y mínimos de precipitación por estación

// Promedio de precipitación por fecha
db.estaciones.aggregate([
  { $match: { "PARAMETRO(TIPO)": "PRECIPITACIÓN" } },
  { $group: { _id: "$FECHA", promedioDiario: { $avg: "$VALOR" } } },
  { $sort: { _id: 1 } }
]);

