const axios = require('axios');
const nodemailer = require('nodemailer');

API_KEY = '90edc6b8bb989b2ba9bf107d1f258d7f'
TOKEN = 'ATTAbfa6b0277043de7b26ffaf45f65380c5585fea3528c2a74b9d67075cd71e0a0c3AD35190'
///////////////////mi apikey
KEY="fde71547d676e6388f6e0189ca93e7a7"
MI_TOKEN="ATTA4afd422fc5b333cf8a9d8c2827d49b33f22d01b21bc360cea9a2907d5547e81354AC3536"
SECRETO="4b424b8bd4ce981940db66fe5505e50022e5d35dfabcdb940b4a50909d7e5f73"


exports.addUserBoard = async (req, res) => {
    const {emailDestino, asunto, mensaje, emailUser, service } = req.body
    //emailUser = {user, pass}

    const transporter = nodemailer.createTransport({
      service,
      auth: emailUser
    });
    
    // Configura el correo electrónico
    const mailOptions = {
      from: 'norberto.cp@hotmail.com', // Cambia esto
      to: emailDestino,
      subject: asunto,
      text: mensaje
    };
    
    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });

    return res.status(200).json({
        message: "email send"
    })
    
}

exports.getWorkspaceId = async (req, res) => {
    // const { organizationName } = req.body; // Nombre de la organización desde el cuerpo de la solicitud

    try {
        const response = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${KEY}&token=${MI_TOKEN}`);
        console.log(response.data);
        return res.send("hola")
        // if (response.status === 200) {
        //     const organizations = response.data;
        //     const organization = organizations.find(org => org.displayName === organizationName);

        //     if (organization) {
        //         return res.status(200).json({
        //             message: 'ID del espacio de trabajo encontrado',
        //             workspaceId: organization.id,
        //         });
        //     } else {
        //         return res.status(404).json({
        //             message: 'Espacio de trabajo no encontrado',
        //         });
        //     }
        // } else {
        //     console.error('Error al obtener los espacios de trabajo:', response.data);
        //     return res.status(response.status).json({
        //         message: 'Error al obtener los espacios de trabajo',
        //         error: response.data,
        //     });
       // }

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener el espacio de trabajo',
            error: error.message,
        });
    }
};

exports.createBoard = async (req, res) => {
    const {name, nameWorkspace, desc, prefs_permissionLevel } = req.body
    
    try {

        const resp = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${KEY}&token=${MI_TOKEN}`);
        const worksSpaces = resp.data;
        const workSpace = worksSpaces.find(org => org.displayName === nameWorkspace);
        const params = {name, desc, prefs_permissionLevel, idOrganization: workSpace.id, key: KEY, token: MI_TOKEN}

        const response = await axios.post(`https://api.trello.com/1/boards/`, null, {
            params

        })
        console.log(response.data);
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
      const response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${KEY}&token=${MI_TOKEN}`);
      console.log(response.data);
      
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
  const { listName, boardName } = req.body; // Nombre de la lista y ID del tablero desde el cuerpo de la solicitud

  try {
    const resp = await axios.get(`https://api.trello.com/1/members/me/boards?key=${KEY}&token=${MI_TOKEN}`);
    const boards = resp.data;
    const board = boards.find(b => b.name === boardName);

      const listData = {
          name: listName,
          idBoard: board.id
      };

      const response = await axios.post(`https://api.trello.com/1/lists?key=${KEY}&token=${MI_TOKEN}`, listData);

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


