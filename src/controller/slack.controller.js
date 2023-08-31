const WebClient = require('@slack/web-api').WebClient;

// Reemplaza 'YOUR_TOKEN' con tu token de acceso de Slack
// var slack = new WebClient('xoxb-5836473505844-5819589606151-Ydap5jNyKzzadqS0rhrLGz7L');

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


