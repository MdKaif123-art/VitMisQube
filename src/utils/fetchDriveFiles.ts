const API_KEY = 'AIzaSyBotKlJNtRQGi3j0oqPwjfxt2SmVS5gm5w';
const FOLDER_ID = '1DMIbW82L2X69BxmcQgYUTwxoEMIpPbUg';

export interface Paper {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  type: 'CAT1' | 'CAT2' | 'FAT';
  uploadDate: string;
  slot: string;
  driveLink: string;
}

function parseFileName(name: string): Omit<Paper, 'id' | 'driveLink'> | null {
  // Example: CSE1001_IntroToProgramming_CAT1_2023-10-25_SlotA.pdf or SlotB1.pdf or SlotA2.pdf.pdf
  const match = name.match(/^([A-Z]+\d+)_([A-Za-z]+)_((CAT1|CAT2|FAT))_(\d{4}-\d{2}-\d{2})_Slot([A-Za-z0-9]+)\.pdf(?:\.pdf)?$/);
  if (!match) return null;
  return {
    courseCode: match[1],
    courseName: match[2].replace(/([A-Z])/g, ' $1').trim(),
    type: match[3] as 'CAT1' | 'CAT2' | 'FAT',
    uploadDate: match[5],
    slot: match[6],
    title: `${match[1]} - ${match[2].replace(/([A-Z])/g, ' $1').trim()}`,
  };
}

export async function fetchDrivePapers(): Promise<Paper[]> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id,name,webViewLink)`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.files) return [];
  return data.files
    .map((file: any) => {
      const parsed = parseFileName(file.name);
      if (!parsed) return null;
      return {
        id: file.id,
        ...parsed,
        driveLink: file.webViewLink,
      };
    })
    .filter(Boolean);
} 