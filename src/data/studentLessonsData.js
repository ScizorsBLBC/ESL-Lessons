/**
 * Student Lessons Data Registry
 * 
 * Central registry for all student-specific custom lesson files.
 * Each lesson object contains metadata about the lesson file.
 */

export const studentLessons = [
    {
        studentName: "Yusuke",
        date: "12-31-2025",
        type: "html",
        filename: "Yusuke.12.31.2025.html",
        title: "The Mobile Engineer's Communication Toolkit",
        description: "Communication strategies for mobile engineers - Trade-offs, clarity, and networking"
    },
    {
        studentName: "Yusuke",
        date: "1-7-2026",
        type: "react",
        route: "/student-lessons/yusuke/1-7-2026",
        title: "Strategic Communication for Mobile Engineers",
        description: "Advanced communication patterns: Trade-offs, negotiation, clarity, and career narrative"
    }
];

/**
 * Get unique list of student names, sorted alphabetically
 * @returns {string[]} Array of unique student names
 */
export const getStudentNames = () => {
    const names = [...new Set(studentLessons.map(lesson => lesson.studentName))];
    return names.sort();
};

/**
 * Parse date string in M-D-YYYY or MM-DD-YYYY format to Date object
 * @param {string} dateStr - Date string in M-D-YYYY or MM-DD-YYYY format
 * @returns {Date} Parsed date object
 */
const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
};

/**
 * Get all lessons for a specific student, sorted by date (newest first)
 * @param {string} studentName - The name of the student
 * @returns {Array} Array of lesson objects for the student
 */
export const getLessonsByStudent = (studentName) => {
    return studentLessons
        .filter(lesson => lesson.studentName === studentName)
        .sort((a, b) => {
            // Sort by date, newest first
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });
};

/**
 * Get a specific lesson by student name and date
 * @param {string} studentName - The name of the student
 * @param {string} date - The date of the lesson (format: MM-DD-YYYY)
 * @returns {Object|null} The lesson object or null if not found
 */
export const getLessonByStudentAndDate = (studentName, date) => {
    return studentLessons.find(
        lesson => lesson.studentName === studentName && lesson.date === date
    ) || null;
};

