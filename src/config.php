<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');               // XAMPP default: empty password
define('DB_NAME', 'exam_cell_db');
// Create connection
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset to UTF-8
mysqli_set_charset($conn, "utf8");

// Function to sanitize input
function sanitize_input($input) {
    global $conn;
    return mysqli_real_escape_string($conn, strip_tags(trim($input)));
}

// Function to get branch name from code
function get_branch_name($code) {
    $branches = array(
        
        '104' => 'Computer Science and Engineering',
        '105' => 'Electrical and Electronics Engineering',
        '106' => 'Electronics and Communication Engineering',
        '114' => 'Mechanical Engineering',
        '243' => 'Artificial Intelligence and Data Science',
        '109' => 'VLSI'
    );
    return isset($branches[$code]) ? $branches[$code] : '';
}

// Function to get branch abbreviation
function get_branch_abbr($code) {
    $abbreviations = array(
        '104' => 'CSE',
        '105' => 'EEE',
        '106' => 'ECE',
        '114' => 'MECH',
        '243' => 'AI&DS',
        '109' => 'VLSI'
    );
    return isset($abbreviations[$code]) ? $abbreviations[$code] : '';
}
?>
