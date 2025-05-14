const API_KEY = 'AIzaSyBotKlJNtRQGi3j0oqPwjfxt2SmVS5gm5w';
const FOLDER_ID = '1DMIbW82L2X69BxmcQgYUTwxoEMIpPbUg';

export interface Paper {
  id: string;
  courseCode: string;
  courseName: string;
  type: string;
  semester: string;
  slot: string;
  driveLink: string;
  uploadDate: string;
}

function parseFileName(name: string): Omit<Paper, 'id' | 'driveLink' | 'uploadDate'> {
  const parts = name.replace('.pdf', '').split('_');
  return {
    courseCode: parts[0] || '',
    courseName: (parts[1] || '').replace(/([A-Z])/g, ' $1').trim(),
    type: parts[2] || '',
    semester: parts[3] || '',
    slot: (parts[4]?.replace(/^Slot/i, '') || '').trim()
  };
}

export async function fetchDrivePapers(): Promise<Paper[]> {
  try {
    let allFiles: any[] = [];
    let nextPageToken: string | null = null;

    do {
      const pageQuery: string = nextPageToken ? `&pageToken=${nextPageToken}` : '';
      const response: Response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id,name,webViewLink,modifiedTime),nextPageToken${pageQuery}`,
        {
          method: 'GET',
          credentials: 'omit',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch files from Drive');
      }

      const data: { files?: any[], nextPageToken?: string } = await response.json();
      allFiles = allFiles.concat(data.files || []);
      nextPageToken = data.nextPageToken || null;
    } while (nextPageToken);

    return allFiles.map((file: any) => {
      const parsed = parseFileName(file.name);
      return {
        id: file.id,
        ...parsed,
        driveLink: file.webViewLink,
        uploadDate: file.modifiedTime
      };
    });
  } catch (error) {
    console.error('Error fetching papers:', error);
    return [];
  }
}