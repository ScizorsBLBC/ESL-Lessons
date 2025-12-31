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
        filename: "Yusuke.12.31.2025.html",
        title: "The Mobile Engineer's Communication Toolkit",
        description: "Communication strategies for mobile engineers - Trade-offs, clarity, and networking"
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
 * Get all lessons for a specific student, sorted by date (newest first)
 * @param {string} studentName - The name of the student
 * @returns {Array} Array of lesson objects for the student
 */
export const getLessonsByStudent = (studentName) => {
    return studentLessons
        .filter(lesson => lesson.studentName === studentName)
        .sort((a, b) => {
            // Sort by date, newest first
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
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

