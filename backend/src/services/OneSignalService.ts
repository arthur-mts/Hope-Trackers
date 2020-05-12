import { Client } from 'onesignal-node';

const client = new Client(process.env.ONE_SIGNALL_ID!, process.env.ONE_SIGNAL_KEY!);

export async function sendNotification(playersId:[string], message: string, header: string){
  await client.createNotification({
    included_segments: [...playersId, '18fbfa97-eb80-4830-8602-ed4ad7fa2e6d'],
    contents: {
      english: message,
      "pt-br": message, 
    },
    headings: {
      english: header,
      "pt-br": header,
    },
  })
}
