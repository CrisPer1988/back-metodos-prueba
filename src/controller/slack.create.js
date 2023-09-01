const axios = require('axios');

const slackToken = 'xoxp-5834083025858-5857782466688-5846955373009-67991aa1af18634cc5288f285de05ba2';
const channelName = 'rpa2';

async function createSlackChannel() {
  try {
    const response = await axios.post(
      'https://slack.com/api/conversations.create',
      {
        name: channelName,
      },
      {
        headers: {
          Authorization: `Bearer ${slackToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      console.log(`Canal "${channelName}" creado con éxito.`);
      console.log('ID del Canal:', response.data.channel.id);
    } else {
      console.error('Error al crear el canal:', response.data.error);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

createSlackChannel();
