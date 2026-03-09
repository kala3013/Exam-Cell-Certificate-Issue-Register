<?php
header('Content-Type: application/json');
require_once '../src/config.php';

$response = array('success' => false, 'data' => array());

if (isset($_POST['department_code']) && isset($_POST['batch'])) {
    $dept_code = sanitize_input($_POST['department_code']);
    $batch = sanitize_input($_POST['batch']);
    
    // Query to get all student reg nos for this dept and batch
    $query = "SELECT reg_no FROM students WHERE department_code = '$dept_code' AND batch = '$batch' ORDER BY reg_no ASC";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $reg_numbers = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $reg_numbers[] = $row['reg_no'];
        }
        
        // Organize into rows of 5 register numbers
        $organized_rows = array();
        for ($i = 0; $i < count($reg_numbers); $i += 5) {
            $chunk = array_slice($reg_numbers, $i, 5);
            $organized_rows[] = array(
                'register_numbers' => $chunk,
                'subtotal' => count($chunk)
            );
        }
        
        $response['success'] = true;
        $response['data'] = $organized_rows;
        $response['total_count'] = count($reg_numbers);
    } else {
        $response['success'] = false;
        $response['message'] = 'No students found for this department and batch';
    }
} else {
    $response['message'] = 'Missing parameters';
}

echo json_encode($response);
mysqli_close($conn);
?>
