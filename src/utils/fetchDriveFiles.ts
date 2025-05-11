const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_FOLDER_ID;

export interface Paper {
  id: string;
  courseCode: string;
  courseName: string;
  type: 'CAT-1' | 'CAT-2' | 'FAT';
  semester: string;
  slot: string;
  driveLink: string;
}

function parseFileName(name: string): Omit<Paper, 'id' | 'driveLink'> | null {
  // Format: COURSECODE_COURSENAME_TYPE_SEMESTER_SlotXXX.pdf
  const parts = name.replace('.pdf', '').split('_');
  if (parts.length !== 5) return null;

  const [courseCode, courseName, type, semester, slotPart] = parts;
  
  // Convert type format
  let examType: 'CAT-1' | 'CAT-2' | 'FAT';
  switch (type) {
    case 'CAT1':
      examType = 'CAT-1';
      break;
    case 'CAT2':
      examType = 'CAT-2';
      break;
    case 'FAT':
      examType = 'FAT';
      break;
    default:
      return null;
  }

  return {
    courseCode,
    courseName,
    type: examType,
    semester,
    slot: slotPart.replace('Slot', '')
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