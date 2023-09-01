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

