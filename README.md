📑 Exam Cell Certificate Issue Register

A PHP & MySQL based web application developed for Anna University Exam Cell Office to create, manage, and print Certificate Issue Registers efficiently.

This system helps automate the process of registering certificate issuance, tracking student register numbers, and generating printable reports.

🚀 Features
📋 Smart Form with Auto Fill

Degree selection (UG, PG, US)

Branch code (101–108) automatically fills department name

Period and year selection (Apr/May, Nov/Dec)

Certificate type selection

Controller LR number dropdown

Regulation selection (2012, 2025)

Examination type (Regular / Arrear)

Semester selection (I–VIII)

Batch selection (2023–2027, 2024–2028, 2025–2029)

Mode selection (Full Time / Part Time)

🗄️ Database Integration

Automatically fetches student register numbers

Filters students based on department and batch

Handles missing register numbers automatically

Displays register numbers in 5-column layout

📊 Register Table

Register numbers with auto calculated subtotals

Receiver name and designation fields

Signature with date

HOD signature with seal

Remarks field

🧮 Automatic Calculations

Total registered students

Total certificates

Total received certificates

Balance calculation (Total – Received)

🖨️ Print & Save

Print optimized A4 layout

Clean printable format

Single page printing

Save records to database

📁 Project Structure
ExamCellCertificateRegister
ExamCellCertificateRegister
│
├── public
│   ├── index.php
│   ├── fetch_register.php
│   └── assets
│       ├── css
│       │   └── style.css
│       └── js
│           └── script.js
│
├── src
│   └── config.php
│
├── database
│   └── schema.sql
│
├── README.md
└── .htaccess
⚙️ Installation Guide
1️⃣ Create Database
Using phpMyAdmin

Open phpMyAdmin

Create database named:

exam_cell_db

Open SQL tab

Import or paste SQL from:

database/schema.sql
Using MySQL CLI
mysql -u root -p < database/schema.sql
2️⃣ Configure Database

Edit file:

src/config.php

Example configuration:

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'exam_cell_db');
3️⃣ Deploy Application
XAMPP (Windows)
C:\xampp\htdocs\ExamCellCertificateRegister
WAMP (Windows)
C:\wamp\www\ExamCellCertificateRegister
Linux Server
/var/www/html/ExamCellCertificateRegister
4️⃣ Run the Application

Open browser and visit:

http://localhost/ExamCellCertificateRegister/public/
🗄️ Database Tables
Students Table
Column	Description
id	Primary Key
reg_no	Student Register Number
student_name	Student Name
batch	Batch Year
department_code	Branch Code
semester	Semester
created_at	Timestamp
Certificate Registers Table
Column	Description
id	Primary Key
degree	Degree Type
branch_code	Branch Code
period	Examination Period
year	Year
certificate_type	Certificate Type
controller_lr_no	Controller Letter Number
date_issued	Issue Date
regulation	Regulation Year
examination_type	Exam Type
semester	Semester
batch	Batch
mode	Study Mode
total_registered	Total Students
total_certificates	Certificates Issued
total_received	Certificates Received
balance	Remaining Balance
receiver_name	Receiver Name
receiver_designation	Receiver Designation
signature_date	Signature Date
hod_name	HOD Name
hod_signature	HOD Signature
remarks	Remarks
🔌 API Endpoint
fetch_register.php

Fetch student register numbers dynamically.

Method
POST
Parameters
Parameter	Description
department_code	Branch Code
batch	Batch Year
Example Response
{
  "success": true,
  "total_count": 10,
  "data": [
    {
      "register_numbers": ["710023104001","710023104002"],
      "subtotal": 2
    }
  ]
}
🎨 UI Design

The application includes:

Print optimized CSS

Responsive layout

Clean register table

Proper signature spacing

Hidden dropdown arrows in print view

🔐 Security

Current protections include:

Input sanitization

mysqli_real_escape_string

strip_tags

trim

Recommended Production Security

Prepared statements

User authentication

CSRF protection

Access control

Input validation

🐞 Troubleshooting
Issue	Solution
Database connection failed	Check credentials in config.php
No students displayed	Verify students table has records
AJAX error	Check browser console
404 error	Verify folder structure
Print layout broken	Clear browser cache
🏫 Developed For

Anna University Regional Campus
Coimbatore – Exam Cell

👨‍💻 Developer

Kalanidhi Murugan
CSE Student | Web Developer

GitHub:
https://github.com/kala3013

📄 License

Confidential – For internal university use only.

Version: 1.0.0
Last Updated: February 2026

✅ This version will look clean and structured on GitHub.

