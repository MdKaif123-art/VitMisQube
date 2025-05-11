export type ExamType = 'CAT1' | 'CAT2' | 'FAT';

export type Semester = 'Winter Semester' | 'Summer Semester';

export interface CourseInfo {
    courseCode: string;
    courseName: string;
    examType: ExamType;
    semester: Semester;
    slot: string;
}

export const parseFileName = (fileName: string): CourseInfo => {
    const parts = fileName.replace('.pdf', '').split('_');
    return {
        courseCode: parts[0],
        courseName: parts[1],
        examType: parts[2] as ExamType,
        semester: parts[3] as Semester,
        slot: parts[4].replace('Slot', '')
    };
}; 