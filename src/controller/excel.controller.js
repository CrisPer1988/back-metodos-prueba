const XLSX = require('xlsx')

exports.createTable = async (req, res) => {
    try {

        const {filePath} = req.body

        if (!filePath) {
            return res.status(400).json({ error: 'La ubicación del archivo es obligatoria en el cuerpo de la solicitud' });
        }

        const workbook= XLSX.utils.book_new()
        const worksheet = XLSX.utils.aoa_to_sheet([[]]) // Hoja vacia

        // Agregar la hoja de trabajo al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1')

        // Guardar el archivo en tu sistema de archivos local
        //const filePath = 'C:/Users/Calle30/Desktop/archivo_vacio.xlsx'; // Nombre y ubicación del archivo
        XLSX.writeFile(workbook, filePath);    

        return res.download(filePath, (err) => {
            if (err) {
              console.error('Error al enviar el archivo:', err);
              res.status(500).json({ error: 'Error al enviar el archivo' });
            } else {
              console.log('Archivo de Excel vacío creado y enviado.');
              // Elimina el archivo después de enviarlo
              //fs.unlinkSync(filePath);
            }
          });
        } catch (error) {
          console.error('Error al crear el archivo de Excel vacío:', error);
          res.status(500).json({ error: 'Error al crear el archivo de Excel vacío' });
        }
}

exports.editTable = (req, res) => {
  try {
    // Obtener los valores del cuerpo de la solicitud
    const { fila, columna, valor, archivoPath } = req.body;

    // Cargar el archivo de Excel existente
    const workbook = XLSX.readFile(archivoPath);
    // Obtener la hoja de trabajo que deseas modificar
    const sheetName = 'Hoja1'; // Nombre de la hoja de trabajo que deseas modificar
    const worksheet = workbook.Sheets[sheetName];

    // Construir la referencia de celda (por ejemplo, 'A1')
    const cellRef = `${columna}${fila}`;

    // Modificar la celda con el valor proporcionado
    worksheet[cellRef] = valor;

    // Guardar el archivo de Excel modificado
    XLSX.writeFile(workbook, archivoPath);

    console.log('Celda de Excel modificada y archivo guardado.');
    return res.status(200).json({ message: 'Celda de Excel modificada y archivo guardado.' });
  } catch (error) {
    console.error('Error al editar la celda de Excel:', error);
    return res.status(500).json({ error: 'Error al editar la celda de Excel' });
  }
};