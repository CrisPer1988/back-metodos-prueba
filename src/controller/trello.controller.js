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

exports.getBoardId = async (req, res) => {
  const { boardName } = req.body; // Nombre del tablero desde el cuerpo de la solicitud

  try {
      const response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`);
      
      if (response.status === 200) {
          const boards = response.data;
          const board = boards.find(b => b.name === boardName);

          if (board) {
              return res.status(200).json({
                  message: 'ID del tablero encontrado',
                  boardId: board.id,
              });
          } else {
              return res.status(404).json({
                  message: 'Tablero no encontrado',
              });
          }
      } 
  } catch (error) {
      return res.status(500).json({
          message: 'Error interno del servidor al obtener el tablero',
          error: error.message,
      });
  }
};

exports.createList = async (req, res) => {
  const { listName, boardId } = req.body; // Nombre de la lista y ID del tablero desde el cuerpo de la solicitud

  try {
      const listData = {
          name: listName,
          idBoard: boardId
      };

      const response = await axios.post(`https://api.trello.com/1/lists?key=${API_KEY}&token=${TOKEN}`, listData);

      if (response.status === 200) {
          return res.status(200).json({
              message: 'Lista creada exitosamente',
              listId: response.data.id,
          });
      } else {
          console.error('Error al crear la lista:', response.data);
          return res.status(response.status).json({
              message: 'Error al crear la lista',
              error: response.data,
          });
      }
  } catch (error) {
      return res.status(500).json({
          message: 'Error interno del servidor al crear la lista',
          error: error.message,
      });
  }
};

exports.getListId = async (req, res) => {
  const { listName, boardId } = req.body; // Nombre de la lista y ID del tablero desde el cuerpo de la solicitud

  try {
      const listsResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`);

      if (listsResponse.status === 200) {
          const lists = listsResponse.data;
          const targetList = lists.find(list => list.name === listName);

          if (targetList) {
              return res.status(200).json({
                  message: 'ID de la lista encontrado',
                  listId: targetList.id,
              });
          } else {
              return res.status(404).json({
                  message: `Lista "${listName}" no encontrada en el tablero`,
              });
          }
      } 
  } catch (error) {
      return res.status(500).json({
          message: 'Error interno del servidor al obtener el ID de la lista',
          error: error.message,
      });
  }
};

exports.createCard = async (req, res) => {
  const { cardName, listName, boardId } = req.body; // Nombre de la tarjeta, nombre de la lista y ID del tablero desde el cuerpo de la solicitud

  try {
      const listsResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`);

      if (listsResponse.status === 200) {
          const lists = listsResponse.data;
          const targetList = lists.find(list => list.name === listName);

          if (targetList) {
              // Si se encuentra la lista, ahora puedes crear la tarjeta en esa lista
              const cardData = {
                  name: cardName,
                  idList: targetList.id
              };

              const cardResponse = await axios.post(`https://api.trello.com/1/cards?key=${API_KEY}&token=${TOKEN}`, cardData);

              if (cardResponse.status === 200) {
                  return res.status(200).json({
                      message: 'Tarjeta creada exitosamente',
                      cardId: cardResponse.data.id,
                  });
              } else {
                  console.error('Error al crear la tarjeta:', cardResponse.data);
                  return res.status(cardResponse.status).json({
                      message: 'Error al crear la tarjeta',
                      error: cardResponse.data,
                  });
              }
          }
      }
  } catch (error) {
      return res.status(500).json({
          message: 'Error interno del servidor al crear la tarjeta',
          error: error.message,
      });
  }
};


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

exports.inviteUserToTrelloBoard = async (req, res) => {
  const boardId = "64f23d0fc723ade046e65845";
  const email = "norberto.cp@hotmail.com"
      const response = await axios.post(`http://api.trello.com/1/search/members?query=${email}&type=members&key=${API_KEY}&token=${TOKEN}`, {
        email,
        type: 'normal', 
        boardId: boardId
      });

      return res.status(200).json({message: "ok", boardId})
}