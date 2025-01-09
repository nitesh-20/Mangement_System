// const XLSX = require("xlsx");
// const fs = require("fs");

// // Function to generate product-wise report
// const generateProductReport = (filePath) => {
//   if (fs.existsSync(filePath)) {
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = "Form Data";
//     const worksheet = workbook.Sheets[sheetName];
//     let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
//     const productReport = {};

//     // Grouping data by product
//     data.forEach((row) => {
//       if (!productReport[row.product]) {
//         productReport[row.product] = [];
//       }
//       productReport[row.product].push(row);
//     });

//     return productReport;
//   } else {
//     throw new Error("Excel file not found.");
//   }
// };

// // Function to generate monthly report
// const generateMonthlyReport = (filePath) => {
//   if (fs.existsSync(filePath)) {
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = "Form Data";
//     const worksheet = workbook.Sheets[sheetName];
//     let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
//     const monthlyReport = {};

//     // Grouping data by month
//     data.forEach((row) => {
//       const month = new Date(row.date).toLocaleString("default", {
//         month: "long",
//         year: "numeric",
//       });
//       if (!monthlyReport[month]) {
//         monthlyReport[month] = [];
//       }
//       monthlyReport[month].push(row);
//     });

//     return monthlyReport;
//   } else {
//     throw new Error("Excel file not found.");
//   }
// };

// module.exports = { generateProductReport, generateMonthlyReport };
