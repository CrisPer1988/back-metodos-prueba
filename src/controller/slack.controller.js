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
  const {channelName, token} = req.body
  const slack = new WebClient(token)

  try {
    const response = await slack.conversations.create({
      name:channelName
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

exports.getTimestamp = async (req, res) => {
  const {channelId, token} = req.body
  const slack = new WebClient('xoxp-5834083025858-5857782466688-5822903092167-efbdf6e40198ef6c162f7abaa8601add')

  try {
    const response = await slack.conversations.history({
      channel: channelId,
      limit: 1
    })

    if (response.ok && response.messages.length > 0) {
      const firstMessage = response.messages[0].ts
      return res.status(200).json({
        message: 'Timestamp del primer mensaje en el canal:', firstMessage
      })
      
    } else {
      return res.status(500).json({
        message: 'No se pudo obtener el timestamp del mensaje.'
      })
    }
  } catch (error) {
      console.error('Error:', error)
      return res.status(500).json ({
        message: 'Error'
      })
  }
}

exports.createThread = async (req, res) => {
  const {channelId, messageTimestamp, threadText, token} = req.body
  const slack = new WebClient('xoxp-5834083025858-5857782466688-5822903092167-efbdf6e40198ef6c162f7abaa8601add')

  try {
    const response = await slack.chat.postMessage({
      channel: channelId,
      text: threadText,
      thread_ts: messageTimestamp
    })

    if (response.ok) {
      return res.status(200).json({
        message: 'Hilo creado con exito'
      })
    } else {
      return res.status(500).json({
        message: 'No se pudo crear el hilo'
      })
    }
  } catch (error) {
    return res.status(500).json ({
      message: 'Error:', error 
    })
  }
}

exports.addMemberToChannel = async (req, res) => {
  const { channelId, userId } = req.body;
  const slack = new WebClient("xoxp-5836473505844-5827388761782-5819589589447-8bdf092993de821101a65452393d00a2");

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
      email: "patoymano21@gmail.com", 
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


