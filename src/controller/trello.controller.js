const axios = require('axios');

API_KEY = '90edc6b8bb989b2ba9bf107d1f258d7f'
TOKEN = 'ATTAbfa6b0277043de7b26ffaf45f65380c5585fea3528c2a74b9d67075cd71e0a0c3AD35190'

// exports.addMembersToBoard = async () => {
//       // Reemplaza con tu clave de API y token de acceso de Trello
//       const API_KEY = '90edc6b8bb989b2ba9bf107d1f258d7f';
//       const TOKEN = 'c661478a9e8b2bff11d2587e8f2bf8d5f54abfaf0aaa0d2bd1eac17994883f39';
    
//       try {
//         // Aquí puedes construir la URL o realizar cualquier preparación necesaria antes de la solicitud POST
//         // Por ejemplo, puedes construir la URL de la API de Trello con los datos proporcionados
    
//         // Luego, realiza la solicitud POST a la API de Trello con los datos preparados
//         const response = await axios.post('URL_DE_LA_API', {
//           key: API_KEY,
//           token: TOKEN,
//           boardId: boardId,
//           memberIds: memberIds,
//         });
    
//         if (response.status === 200) {
//           return { success: true, message: 'Miembros agregados con éxito al tablero.' };
//         } else {
//           return { success: false, message: 'Error al agregar miembros al tablero: ' + response.statusText };
//         }
//       } catch (error) {
//         return { success: false, message: 'Error: ' + error.message };
//       }

// }

/////////////////////////////////////////////
const boardName = 'prueba';

// URL de la API de Trello para buscar tableros por nombre
const searchBoardsUrl = `https://api.trello.com/1/search?query=${encodeURIComponent(boardName)}&key=${API_KEY}&token=${TOKEN}`;

// Realiza la solicitud GET para buscar tableros por nombre
axios.get(searchBoardsUrl)
  .then((response) => {
    if (response.status === 200) {
      // Obtén el ID del primer tablero encontrado (puedes ajustar este código para manejar múltiples resultados)
      const firstBoard = response.data.boards[0];
      if (firstBoard) {
        const boardId = firstBoard.id;
        console.log('ID del tablero encontrado:', boardId);

        // Ahora que tienes el ID del tablero, puedes obtener información adicional
        const getBoardInfoUrl = `https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
        return axios.get(getBoardInfoUrl);
      } else {
        console.error('No se encontraron tableros con ese nombre.');
      }
    } else {
      console.error('Error al buscar tableros:', response.statusText);
    }
  })
  .then((infoResponse) => {
    if (infoResponse && infoResponse.status === 200) {
      console.log('Información del tablero:', infoResponse.data);
    } else {
      console.error('Error al obtener información del tablero:', infoResponse.statusText);
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

  