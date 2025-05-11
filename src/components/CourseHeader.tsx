import React from 'react';
import { CourseInfo } from '../lib/types';

interface CourseHeaderProps {
    courseInfo: CourseInfo;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseInfo }) => {
    const { courseCode, courseName, examType, semester, slot } = courseInfo;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{courseCode}</h2>
                        <p className="text-xl text-gray-600">{courseName}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            <span className="font-semibold">Semester:</span> {semester}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Slot:</span> {slot}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end items-start">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                        {examType}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader; 