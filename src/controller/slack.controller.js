const WebClient = require('@slack/web-api').WebClient;

// var slack = new WebClient('xoxb-5836473505844-5819589606151-Ydap5jNyKzzadqS0rhrLGz7L');
// const slackToken = 'xoxp-5834083025858-5857782466688-5846955373009-67991aa1af18634cc5288f285de05ba2';

exports.sendMessage = async (req, res) => {
    const {channel, text, token} = req.body
    const slack = new WebClient(token);
    try {
              const result = await slack.chat.postMessage({
                channel,
                text
              });
              return res.status(200).json({
                message: text,
                result
              })
            } catch (error) {
              console.error('Error al enviar el mensaje:', error);
            }

}

exports.createChannel = async (req, res) => {
  const {channel, token} = req.body
  const slack = new WebClient(token)

  try {
    const response = await slack.conversations.create({
      name:channel
    });

    if (response.ok) {
      return res.status(200).json({
      message: 'Channel Created'
    })
    } else {
        return res.status(500).json({
          message: 'Failed to create'
        })
      } 
    } catch (error) {
        console.error(error)
        return res.status(500).json ({
          message:'Error'
        })
      }
}

exports.addMemberToChannel = async (req, res) => {
  const { channelId, userId } = req.body;
  const slack = new WebClient("xoxb-5836473505844-5819589606151-Xlt8wSI3lHztFypBBFmU2J0R");

  try {
    const response = await slack.conversations.invite({
      channel: channelId,
      users: userId,
    });

    if (response.ok) {
      return res.status(200).json({
        message: 'Member added to the channel successfully.',
        
      });
    } else {
      return res.status(500).json({
        message: 'Failed to add member to the channel.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error',
    });
  }
};

/////////////////////////userID
exports.getUserId = async (req, res) => {
  const slack = new WebClient("xoxb-5836473505844-5819589606151-Xlt8wSI3lHztFypBBFmU2J0R");

  try {
    const response = await slack.users.lookupByEmail({
      email: "patoymano21@gmail.com", // Puedes usar el nombre de usuario en lugar del correo electrónico si lo prefieres
    });

    if (response.ok) {
      console.log('User ID:', response.user.id);
    } else {
      console.error('Error al buscar el usuario:', response.error);
    }
    res.status(200).json({
      response
    })
  } catch (error) {
    console.error('Error:', error);
  }
}
// async function getUserIdByUsername(token, username) {
//   const slack = new WebClient(token);

//   try {
//     const response = await slack.users.lookupByEmail({
//       email: username, // Puedes usar el nombre de usuario en lugar del correo electrónico si lo prefieres
//     });

//     if (response.ok) {
//       console.log('User ID:', response.user.id);
//     } else {
//       console.error('Error al buscar el usuario:', response.error);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

/////////////////////////lista de canales

exports.listChannel = async (req, res) => {
  const slack = new WebClient("xoxb-5836473505844-5819589606151-Xlt8wSI3lHztFypBBFmU2J0R");
  try {
    const response = await slack.conversations.list();
    if (response.ok) {
      console.log('Lista de canales:', response.channels);
    } else {
      console.error('Error al listar canales:', response.error);
    }

    res.status(200).json({
      response
    })
  } catch (error) {
    console.error('Error:', error);
  }
}


