import { Client } from 'onesignal-node';

const client = new Client('18fbfa97-eb80-4830-8602-ed4ad7fa2e6d', 'MzQ2NGY4OTItNDI4ZC00Nzk1LWI5ZjgtMDJhMjljNWNlZjQ5');

export async function sendNotification(playersId: [string], message: string, header: string) {
  console.log(client);
  try{
    client.createNotification({
      include_player_ids: [...playersId, '6b1507ce-965e-4dcb-859e-0070ffce3464','030d6a65-8b85-4a9e-ad1a-319f434fcbdd'],
      contents: {
        en: message,
        'pt-br': message,
      },
      headings: {
        en: header,
        'pt-br': header,
      },
    });
  }
  catch (err) {
    console.log(err);
  }
}
