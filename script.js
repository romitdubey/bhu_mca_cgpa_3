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
    const credits = [5, 4, 4, 2, 3,2];
    const avgMarks1 = (parseFloat(document.getElementById('marks1').value || 0) + parseFloat(document.getElementById('marks2').value || 0)) / 2;
    const avgMarks2 = (parseFloat(document.getElementById('marks3').value || 0) + parseFloat(document.getElementById('marks4').value || 0)) / 2;
    const avgMarks3 = (parseFloat(document.getElementById('marks5').value || 0) + parseFloat(document.getElementById('marks6').value || 0)) / 2;

    const marks = [
        avgMarks1,
        avgMarks2,
        avgMarks3,
        parseFloat(document.getElementById('marks7').value || 0),
        parseFloat(document.getElementById('marks8').value || 0),
        parseFloat(document.getElementById('marks9').value || 0)
    ];

    let totalGradePoints = 0;
    let totalCredits = 0;

    // Calculate grade points for first 5 subjects
    for (let i = 0; i < 6; i++) {
        const gradePoints = calculateGradePoints(marks[i]);
        document.getElementById(`gradePoints${i + 1}`).innerText = gradePoints;
        totalGradePoints += gradePoints * credits[i];
        totalCredits += credits[i];
    }

    const sgpa = totalGradePoints / totalCredits;
    const perc = (sgpa * 10) - 4.5;

    document.getElementById('sgpa').innerText = sgpa.toFixed(2);
    document.getElementById('cgpa').innerText = sgpa.toFixed(2);
    document.getElementById('per').innerText = perc.toFixed(2);
}