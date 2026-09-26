# 📑 Exam Cell Certificate Issue Register

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</p>

<p align="center">
  <strong>A smart digital certificate issue register designed for university examination cell operations.</strong>
</p>

<p align="center">
  Automate certificate registration • Fetch student records dynamically • Track issuance • Calculate balances • Generate print-ready registers
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-system-workflow">Workflow</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api-documentation">API</a> •
  <a href="#-future-enhancements">Roadmap</a>
</p>

---

## ✨ Overview

The **Exam Cell Certificate Issue Register** is a PHP & MySQL based web application developed to modernize the process of maintaining certificate issue records in a university examination cell.

Traditional certificate registers often require manual writing, repeated data entry, manual calculations, and physical record maintenance.

This application provides a centralized digital workflow where examination staff can:

* Select examination and certificate details
* Automatically retrieve eligible student register numbers
* Organize students based on department and batch
* Record certificate distribution
* Automatically calculate totals and balances
* Capture receiver and HOD details
* Save records into MySQL
* Generate a clean A4 printable register

> 🎯 **Goal:** Reduce manual work, minimize calculation errors, and create a structured digital record of certificate distribution.

---

# 🖥️ Application Preview

> 📸 Add your project screenshots inside a `screenshots/` folder and update the paths below.

### 🏠 Certificate Register Form

<p align="center">
  <img src="screenshots/dashboard.png" width="90%" alt="Certificate Register Dashboard"/>
</p>

### 📋 Student Register Number Selection

<p align="center">
  <img src="screenshots/register-numbers.png" width="90%" alt="Student Register Numbers"/>
</p>

### 🖨️ Print-Optimized Register

<p align="center">
  <img src="screenshots/print-preview.png" width="90%" alt="Print Preview"/>
</p>

---

# 🚀 Key Features

<table>
<tr>
<td width="50%">

### 📋 Smart Registration Form

* UG / PG / US degree selection
* Branch code selection
* Automatic department mapping
* Examination period selection
* Certificate type selection
* Regulation selection
* Regular / Arrear examination
* Semester selection
* Batch selection
* Full Time / Part Time mode

</td>

<td width="50%">

### ⚡ Intelligent Auto Fill

* Automatic department identification
* Dynamic student lookup
* Batch-based filtering
* Semester-based filtering
* Automatic register number retrieval
* Missing student handling
* Five-column register layout

</td>
</tr>

<tr>
<td>

### 🗄️ Database Management

* MySQL database integration
* Student record management
* Certificate register storage
* Structured relational data
* Dynamic database queries
* Record persistence

</td>

<td>

### 🧮 Automatic Calculations

* Total registered students
* Total certificates
* Total received certificates
* Remaining certificate balance
* Automatic subtotals
* Reduced manual calculation

</td>
</tr>

<tr>
<td>

### 🖨️ Professional Printing

* A4 optimized layout
* Print-specific CSS
* Single-page register design
* Signature spacing
* HOD seal section
* Hidden UI controls during printing

</td>

<td>

### 🔐 Security Foundation

* Input sanitization
* `trim()`
* `strip_tags()`
* `mysqli_real_escape_string()`
* Server-side validation foundation

</td>
</tr>
</table>

---

# 🧠 System Workflow

```text
                    ┌──────────────────────┐
                    │   Examination Cell   │
                    │        Staff         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Select Register       │
                    │ Parameters            │
                    └──────────┬───────────┘
                               │
                               ▼
                 ┌─────────────────────────────┐
                 │ Department + Batch +        │
                 │ Semester + Examination      │
                 └─────────────┬───────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ AJAX Request         │
                    │ fetch_register.php   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MySQL           │
                    │ Student Records      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Register Numbers     │
                    │ Dynamically Loaded   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Certificate Register │
                    │ Generation           │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌──────────────────┐        ┌──────────────────┐
        │ Save to Database │        │ Print A4 Register│
        └──────────────────┘        └──────────────────┘
```

---

# 🧩 Core Modules

## 1. Smart Certificate Form

The system provides a structured form for entering examination certificate information.

### Supported Parameters

| Parameter   | Options                           |
| ----------- | --------------------------------- |
| Degree      | UG / PG / US                      |
| Branch      | 101 – 108                         |
| Period      | Apr/May / Nov/Dec                 |
| Certificate | Multiple certificate types        |
| Regulation  | 2012 / 2025                       |
| Examination | Regular / Arrear                  |
| Semester    | I – VIII                          |
| Batch       | 2023–2027 / 2024–2028 / 2025–2029 |
| Mode        | Full Time / Part Time             |

---

## 2. 🔄 Dynamic Student Retrieval

When the department and batch are selected, the frontend communicates with the backend using AJAX.

```text
User Selection
      ↓
Department Code
      +
Batch
      ↓
JavaScript AJAX Request
      ↓
fetch_register.php
      ↓
MySQL Query
      ↓
Matching Students
      ↓
Register Numbers
      ↓
Dynamic UI Update
```

This eliminates the need to manually enter every student register number.

---

# 📊 Register Management

The register interface organizes student register numbers into a structured layout.

### Register Information

* Student register numbers
* Subtotals
* Receiver name
* Receiver designation
* Signature date
* HOD details
* HOD signature
* Seal area
* Remarks

### Automatic Calculation

```text
Total Registered
       ↓
Certificates Issued
       ↓
Certificates Received
       ↓
Remaining Balance
```

### Balance Formula

```text
Balance = Total Certificates - Received Certificates
```

---

# 🗃️ Database Architecture

## Students Table

| Column            | Description               |
| ----------------- | ------------------------- |
| `id`              | Primary key               |
| `reg_no`          | Student register number   |
| `student_name`    | Student name              |
| `batch`           | Academic batch            |
| `department_code` | Branch code               |
| `semester`        | Semester                  |
| `created_at`      | Record creation timestamp |

---

## Certificate Registers Table

| Column                 | Description            |
| ---------------------- | ---------------------- |
| `id`                   | Primary key            |
| `degree`               | Degree type            |
| `branch_code`          | Branch code            |
| `period`               | Examination period     |
| `year`                 | Examination year       |
| `certificate_type`     | Certificate type       |
| `controller_lr_no`     | Controller LR number   |
| `date_issued`          | Issue date             |
| `regulation`           | Regulation year        |
| `examination_type`     | Regular / Arrear       |
| `semester`             | Semester               |
| `batch`                | Academic batch         |
| `mode`                 | Study mode             |
| `total_registered`     | Total students         |
| `total_certificates`   | Certificates issued    |
| `total_received`       | Certificates received  |
| `balance`              | Remaining certificates |
| `receiver_name`        | Receiver name          |
| `receiver_designation` | Receiver designation   |
| `signature_date`       | Signature date         |
| `hod_name`             | HOD name               |
| `hod_signature`        | HOD signature          |
| `remarks`              | Additional remarks     |

---

# 🏗️ Project Architecture

```text
ExamCellCertificateRegister/
│
├── 📁 public/
│   ├── index.php
│   ├── fetch_register.php
│   │
│   └── 📁 assets/
│       ├── 📁 css/
│       │   └── style.css
│       │
│       └── 📁 js/
│           └── script.js
│
├── 📁 src/
│   └── config.php
│
├── 📁 database/
│   └── schema.sql
│
├── 📄 .htaccess
├── 📄 README.md
└── 📄 LICENSE
```

---

# 🛠️ Technology Stack

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| 🐘 PHP              | Backend application logic      |
| 🗄️ MySQL           | Relational database            |
| ⚡ JavaScript        | Dynamic frontend interactions  |
| 🎨 CSS3             | UI & responsive styling        |
| 🌐 HTML5            | Application structure          |
| 🔄 AJAX             | Asynchronous student retrieval |
| 🖨️ CSS Print Media | A4 register printing           |
| 🚀 Apache           | Local/server deployment        |
| 🧰 XAMPP            | Local development environment  |

---

# 🔌 API Documentation

## `fetch_register.php`

Retrieves student register numbers dynamically based on department and batch.

### Method

```http
POST
```

### Endpoint

```text
/public/fetch_register.php
```

### Request Parameters

| Parameter         | Type   | Description    |
| ----------------- | ------ | -------------- |
| `department_code` | String | Branch code    |
| `batch`           | String | Academic batch |

### Example Request

```text
department_code=101
batch=2023-2027
```

### Example Response

```json
{
  "success": true,
  "total_count": 10,
  "data": [
    {
      "register_numbers": [
        "710023104001",
        "710023104002"
      ],
      "subtotal": 2
    }
  ]
}
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/kala3013/ExamCellCertificateRegister.git
```

```bash
cd ExamCellCertificateRegister
```

---

## 2️⃣ Create Database

### Using phpMyAdmin

1. Open **phpMyAdmin**
2. Create a database:

```text
exam_cell_db
```

3. Open the **SQL** tab
4. Import:

```text
database/schema.sql
```

### Using MySQL CLI

```bash
mysql -u root -p < database/schema.sql
```

---

## 3️⃣ Configure Database

Open:

```text
src/config.php
```

Configure:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'exam_cell_db');
```

---

# 💻 Local Deployment

## XAMPP

Copy the project into:

```text
C:\xampp\htdocs\ExamCellCertificateRegister
```

Start:

```text
Apache
MySQL
```

Then open:

```text
http://localhost/ExamCellCertificateRegister/public/
```

---

## WAMP

```text
C:\wamp\www\ExamCellCertificateRegister
```

---

## Linux / Apache

```text
/var/www/html/ExamCellCertificateRegister
```

---

# 🎨 UI & Frontend Highlights

The application focuses on a clean administrative interface rather than a generic CRUD dashboard.

### Frontend capabilities

* Responsive form layout
* Structured data sections
* Interactive dropdowns
* Automatic field population
* Dynamic register rendering
* Five-column student layout
* Print-specific UI
* A4 document optimization
* Signature-ready spacing
* Hidden dropdown controls during printing
* Clean typography
* Mobile-friendly foundation

### Print Architecture

```css
@media print {
    /* Hide unnecessary UI */
    /* Optimize A4 dimensions */
    /* Remove dropdown arrows */
    /* Preserve table borders */
    /* Maintain signature spacing */
}
```

---

# 🔐 Security

### Current Implementation

The application currently includes:

* Input sanitization
* `trim()`
* `strip_tags()`
* `mysqli_real_escape_string()`

### Recommended Production Improvements

For production deployment, the following should be implemented:

* [ ] PDO / MySQLi prepared statements
* [ ] Authentication system
* [ ] Role-based access control
* [ ] CSRF protection
* [ ] Server-side validation
* [ ] Session security
* [ ] Audit logging
* [ ] Rate limiting
* [ ] Database backup strategy
* [ ] HTTPS deployment

---

# 📈 Future Enhancements

The project can be extended into a complete **Examination Cell Management System**.

### 🔐 Authentication

* Admin login
* Exam cell staff accounts
* Role-based permissions
* Session management

### 📊 Dashboard

* Total certificates issued
* Pending certificates
* Department-wise statistics
* Batch-wise statistics
* Monthly reports

### 📄 Advanced Reports

* PDF generation
* Excel export
* Department reports
* Batch reports
* Examination-period reports

### 🔎 Search & Filtering

* Search by register number
* Search by student name
* Search by batch
* Search by department
* Search by certificate type

### 📝 Audit System

* Created by
* Modified by
* Created date
* Updated date
* Activity history

### ☁️ Deployment

Potential production deployment:

```text
Frontend
   ↓
Apache / Nginx
   ↓
PHP Application
   ↓
MySQL
   ↓
Automated Backup
```

---

# 🐞 Troubleshooting

| Problem                    | Solution                                |
| -------------------------- | --------------------------------------- |
| Database connection failed | Verify `config.php` credentials         |
| Students not displayed     | Check `students` table                  |
| AJAX request fails         | Inspect browser DevTools console        |
| 404 error                  | Verify project directory                |
| Print layout broken        | Clear browser cache and check print CSS |
| MySQL connection refused   | Start MySQL service                     |
| PHP errors                 | Check Apache/PHP error logs             |

---

# 🧪 Development Environment

Recommended setup:

```text
OS          → Windows / Linux
Server      → Apache
PHP         → 8.x
Database    → MySQL 8.x
Editor      → Visual Studio Code
Browser     → Chrome / Edge / Firefox
Local Stack → XAMPP
```

---

# 📌 Project Highlights

```text
⚡ Dynamic Student Retrieval
🗄️ MySQL Database Integration
📋 Smart Certificate Register
🧮 Automatic Calculations
🖨️ A4 Print Optimization
📱 Responsive Interface
🔄 AJAX Communication
🔐 Security Foundation
🏫 University Administration Use Case
```

---

# 🎯 Real-World Impact

This project demonstrates how a manual administrative workflow can be converted into a structured digital system.

### Before

```text
Manual Register
      ↓
Manual Student Entry
      ↓
Manual Counting
      ↓
Manual Balance Calculation
      ↓
Physical Record
```

### After

```text
Digital Form
      ↓
Automatic Student Retrieval
      ↓
Dynamic Register
      ↓
Automatic Calculation
      ↓
Database Storage
      ↓
Print-Ready Register
```

---

# 🎓 Developed For

**Anna University Regional Campus, Coimbatore**

**Examination Cell Office**

The application was designed around an examination-cell certificate distribution workflow to demonstrate practical web application development, database integration, automation, and print-oriented UI design.

---

# 👨‍💻 Developer

### Kalanidhi Murugan

**CSE Student | Full Stack Web Developer**

<p>
  <a href="https://github.com/kala3013">
    <img src="https://img.shields.io/badge/GitHub-kala3013-181717?style=for-the-badge&logo=github" />
  </a>
</p>

### Core Interests

```text
Software Development
Full Stack Development
Backend Engineering
Cloud & DevOps
AI-Powered Applications
Database Systems
```

---

# 📚 What This Project Demonstrates

This project showcases practical experience in:

* Full-stack web development
* PHP backend development
* MySQL database design
* REST-style API concepts
* AJAX communication
* JavaScript DOM manipulation
* Responsive UI development
* Data filtering
* CRUD-oriented application design
* Automated calculations
* Print stylesheet engineering
* Real-world administrative workflow digitization

---

# 📊 Project Status

<p align="center">

<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" />
<img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Maintained-Yes-success?style=for-the-badge" />

</p>

---

# 📄 License

**Confidential — For internal university use only.**

This project is intended for educational and institutional use.

---

<p align="center">

### ⭐ If this project helped you understand practical web application development, consider starring the repository.

**Built with PHP • MySQL • JavaScript • HTML • CSS**

</p>
