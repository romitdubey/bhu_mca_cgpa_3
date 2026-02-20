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

    // Helper to get the value from the appropriate input when duplicate IDs exist
    // Prefer inputs inside the current layout container (desktop table vs mobile cards)
    function getFieldValue(id) {
        // Determine whether layout is desktop (md and up) or mobile
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        // Tailwind keeps the responsive classes literal in the class attribute
        // Desktop table container has class "md:block" and mobile has "md:hidden"
        const desktopContainer = document.querySelector('.md\\:block');
        const mobileContainer = document.querySelector('.md\\:hidden');

        // Try to find the input inside the currently active container first
        if (isDesktop && desktopContainer) {
            const el = desktopContainer.querySelector('#' + id);
            if (el) return parseFloat(el.value || 0);
        }
        if (!isDesktop && mobileContainer) {
            const el = mobileContainer.querySelector('#' + id);
            if (el) return parseFloat(el.value || 0);
        }

        // Fallback: find any matching element and return first visible value
        const elems = document.querySelectorAll('#' + id);
        if (!elems || elems.length === 0) return 0;
        for (const el of elems) {
            const style = window.getComputedStyle(el);
            const visible = style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
            if (visible) return parseFloat(el.value || 0);
        }
        // final fallback to first element's value
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