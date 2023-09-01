const axios = require('axios');

API_KEY = '90edc6b8bb989b2ba9bf107d1f258d7f'
TOKEN = 'ATTAbfa6b0277043de7b26ffaf45f65380c5585fea3528c2a74b9d67075cd71e0a0c3AD35190'

exports.createBoard = async (req, res) => {
    const {name, idWorkspace} = req.body

    try {
        const response = await axios.post(`https://api.trello.com/1/boards/?name=${name}&key=${API_KEY}&token=${TOKEN}&idOrganization=${idWorkspace}`, {
        })
        if (response.status === 200) {
            return res.status(200).json({
                message: 'Tablero creado'
            })
        } else {
            return res.status(500).json({
                message: 'Error al crear el tablero'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al crear el tablero',
            error: error.message
        })
    }
}

exports.getWorkspaceId = async (req, res) => {
    const { organizationName } = req.body; // Nombre de la organización desde el cuerpo de la solicitud

    try {
        const response = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${API_KEY}&token=${TOKEN}`);
        
        if (response.status === 200) {
            const organizations = response.data;
            const organization = organizations.find(org => org.displayName === organizationName);

            if (organization) {
                return res.status(200).json({
                    message: 'ID del espacio de trabajo encontrado',
                    workspaceId: organization.id,
                });
            } else {
                return res.status(404).json({
                    message: 'Espacio de trabajo no encontrado',
                });
            }
        } else {
            console.error('Error al obtener los espacios de trabajo:', response.data);
            return res.status(response.status).json({
                message: 'Error al obtener los espacios de trabajo',
                error: response.data,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener el espacio de trabajo',
            error: error.message,
        });
    }
};


exports.addMembersToBoard = async () => {
      // Reemplaza con tu clave de API y token de acceso de Trello
      const API_KEY = '90edc6b8bb989b2ba9bf107d1f258d7f';
      const TOKEN = 'c661478a9e8b2bff11d2587e8f2bf8d5f54abfaf0aaa0d2bd1eac17994883f39';
    
      try {
        // Aquí puedes construir la URL o realizar cualquier preparación necesaria antes de la solicitud POST
        // Por ejemplo, puedes construir la URL de la API de Trello con los datos proporcionados
    
        // Luego, realiza la solicitud POST a la API de Trello con los datos preparados
        const response = await axios.post('URL_DE_LA_API', {
          key: API_KEY,
          token: TOKEN,
          boardId: boardId,
          memberIds: memberIds,
        });
    
        if (response.status === 200) {
          return { success: true, message: 'Miembros agregados con éxito al tablero.' };
        } else {
          return { success: false, message: 'Error al agregar miembros al tablero: ' + response.statusText };
        }
      } catch (error) {
        return { success: false, message: 'Error: ' + error.message };
      }

}

/////////////////////////////////////////////
// const boardName = 'prueba';

// // URL de la API de Trello para buscar tableros por nombre
// const searchBoardsUrl = `https://api.trello.com/1/search?query=${encodeURIComponent(boardName)}&key=${API_KEY}&token=${TOKEN}`;

// // Realiza la solicitud GET para buscar tableros por nombre
// axios.get(searchBoardsUrl)
//   .then((response) => {
//     if (response.status === 200) {
//       // Obtén el ID del primer tablero encontrado (puedes ajustar este código para manejar múltiples resultados)
//       const firstBoard = response.data.boards[0];
//       if (firstBoard) {
//         const boardId = firstBoard.id;
//         console.log('ID del tablero encontrado:', boardId);

//         // Ahora que tienes el ID del tablero, puedes obtener información adicional
//         const getBoardInfoUrl = `https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
//         return axios.get(getBoardInfoUrl);
//       } else {
//         console.error('No se encontraron tableros con ese nombre.');
//       }
//     } else {
//       console.error('Error al buscar tableros:', response.statusText);
//     }
//   })
//   .then((infoResponse) => {
//     if (infoResponse && infoResponse.status === 200) {
//       console.log('Información del tablero:', infoResponse.data);
//     } else {
//       console.error('Error al obtener información del tablero:', infoResponse.statusText);
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });

  