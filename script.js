function calculateGradePoints(marks) {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 5;
    if (marks >= 30) return 4;
    return 0;
}

function calculateCGPA() {
    // Credits for: ML, IOT, IR, Technical Writing, Minor Project, NPTEL
    const credits = [5, 4, 4, 2, 3, 2];

    // Helper to get the value from the visible input when there are duplicate IDs
    function getFieldValue(id) {
        const elems = document.querySelectorAll('#' + id);
        if (!elems || elems.length === 0) return 0;
        for (const el of elems) {
            const style = window.getComputedStyle(el);
            const visible = style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
            if (visible) return parseFloat(el.value || 0);
        }
        // fallback to first element's value
        return parseFloat(elems[0].value || 0);
    }

    const avgMarks1 = (getFieldValue('marks1') + getFieldValue('marks2')) / 2;
    const avgMarks2 = (getFieldValue('marks3') + getFieldValue('marks4')) / 2;
    const avgMarks3 = (getFieldValue('marks5') + getFieldValue('marks6')) / 2;

    const marks = [
        avgMarks1,
        avgMarks2,
        avgMarks3,
        getFieldValue('marks7'),
        getFieldValue('marks8'),
        getFieldValue('marks9')
    ];

    let totalGradePoints = 0;
    let totalCredits = 0;

    // Calculate grade points for each subject and update all matching display elements
    for (let i = 0; i < marks.length; i++) {
        const gradePoints = calculateGradePoints(marks[i]);
        const gpElems = document.querySelectorAll(`#gradePoints${i + 1}`);
        gpElems.forEach(e => e.innerText = gradePoints);
        totalGradePoints += gradePoints * credits[i];
        totalCredits += credits[i];
    }

    const sgpa = totalGradePoints / totalCredits;
    const perc = (sgpa * 10) - 4.5;

    document.getElementById('sgpa').innerText = sgpa.toFixed(2);
    document.getElementById('cgpa').innerText = sgpa.toFixed(2);
    document.getElementById('per').innerText = perc.toFixed(2);
}