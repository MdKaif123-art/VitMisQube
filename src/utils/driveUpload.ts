const API_KEY = 'AIzaSyBotKlJNtRQGi3j0oqPwjfxt2SmVS5gm5w';
const FOLDER_ID = '1DMIbW82L2X69BxmcQgYUTwxoEMIpPbUg';

export async function uploadToDrive(file: File): Promise<string> {
  const metadata = {
    name: file.name,
    mimeType: 'application/pdf',
    parents: [FOLDER_ID]
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&key=${API_KEY}`,
    {
      method: 'POST',
      body: form
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload file to Drive');
  }

  const data = await response.json();
  return data.id;
} 