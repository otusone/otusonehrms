const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateSalarySlip = async (slipData) => {
    const doc = new PDFDocument();
    const slipId = slipData._id.toString();
    const outputPath = path.join(__dirname, `../uploads/slips/${slipId}.pdf`);


    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);


    doc.fontSize(18).text("Salary Slip", { align: 'center' });
    doc.moveDown();

    doc.fontSize(12)
        .text(`Month: ${slipData.month}`)
        .text(`Employee Name: ${slipData.userName || 'John Doe'}`)
        .text(`Basic Salary: ₹${slipData.basicSalary}`)
        .text(`HRA: ₹${slipData.hra}`)
        .text(`Allowances: ₹${slipData.allowances}`)
        .text(`Deductions: ₹${slipData.deductions}`)
        .text(`Net Salary: ₹${slipData.netSalary}`);

    doc.end();

    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve(outputPath));
        writeStream.on('error', reject);
    });
};

module.exports = generateSalarySlip;
