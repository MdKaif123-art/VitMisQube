import React from 'react';
import { Paper } from '../utils/fetchDriveFiles';

interface PaperHeaderProps {
    paper: Paper;
}

const PaperHeader: React.FC<PaperHeaderProps> = ({ paper }) => {
    return (
        <div className="bg-black border border-[#00FFFF] rounded-xl p-6">
            <div className="relative">
                {/* Semester in top right */}
                <div className="absolute top-0 right-0">
                    <span className="bg-[#008080] text-white px-4 py-2 rounded-lg font-medium">
                        {paper.semester}
                    </span>
                </div>

                {/* Course Info */}
                <div className="space-y-3">
                    {/* Course Code */}
                    <h1 className="text-[#00FFFF] text-3xl font-bold">
                        {paper.courseCode}
                    </h1>

                    {/* Course Name */}
                    <h2 className="text-[#00BFFF] text-xl font-medium">
                        {paper.courseName}
                    </h2>

                    {/* Exam Type */}
                    <div className="text-[#00FFFF] text-lg font-medium">
                        {paper.type}
                    </div>

                    {/* Slot */}
                    <div className="text-[#008080]">
                        Slot: {paper.slot}
                    </div>
                </div>

                {/* View Paper Button */}
                <div className="mt-6">
                    <a
                        href={paper.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-transparent border border-[#00FFFF] text-[#00FFFF] px-6 py-3 rounded-lg hover:bg-[#00FFFF]/10 transition-colors font-medium"
                    >
                        View Paper
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaperHeader; 
export default PaperHeader; 