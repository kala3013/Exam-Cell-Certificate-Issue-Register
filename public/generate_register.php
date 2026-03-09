<?php
header('Content-Type: application/json');
require_once '../src/config.php';

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $degree = sanitize_input($data['degree']);
    $branch_code = sanitize_input($data['branch_code']);
    $period = sanitize_input($data['period']);
    $year = (int)$data['year'];
    $certificate_type = sanitize_input($data['certificate_type']);
    $controller_lr_no = sanitize_input($data['controller_lr_no']);
    $date_issued = sanitize_input($data['date_issued']);
    $programme = sanitize_input($data['programme']);
    $regulation = sanitize_input($data['regulation']);
    $semester = sanitize_input($data['semester']);
    $examination = sanitize_input($data['examination']);
    $batch = sanitize_input($data['batch']);
    $mode = sanitize_input($data['mode']);
    $total_registered = (int)$data['total_registered'];
    $received = (int)$data['received'];
    $balance = (int)$data['balance'];

    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare("INSERT INTO registers (degree, branch_code, period, year, certificate_type, controller_lr_no, date_issued, programme, regulation, semester, examination, batch, mode, total_registered, received, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssisssssssssiii", $degree, $branch_code, $period, $year, $certificate_type, $controller_lr_no, $date_issued, $programme, $regulation, $semester, $examination, $batch, $mode, $total_registered, $received, $balance);
        $stmt->execute();
        $register_id = $stmt->insert_id;
        $stmt->close();

        $stmt = $conn->prepare("INSERT INTO register_rows (register_id, reg_no_range, subtotal, remarks) VALUES (?, ?, ?, ?)");
        foreach ($data['rows'] as $row) {
            $reg_no_range = sanitize_input($row['reg_no_range']);
            $subtotal = (int)$row['subtotal'];
            $remarks = sanitize_input($row['remarks']);
            $stmt->bind_param("isis", $register_id, $reg_no_range, $subtotal, $remarks);
            $stmt->execute();
            $row_id = $stmt->insert_id;

            if (!empty($row['missing_numbers'])) {
                $missing_stmt = $conn->prepare("INSERT INTO missing_numbers (row_id, reg_no) VALUES (?, ?)");
                foreach ($row['missing_numbers'] as $missing_no) {
                    $missing_reg_no = sanitize_input($missing_no);
                    $missing_stmt->bind_param("is", $row_id, $missing_reg_no);
                    $missing_stmt->execute();
                }
                $missing_stmt->close();
            }
        }
        $stmt->close();

        $conn->commit();
        $response['success'] = true;
    } catch (Exception $e) {
        $conn->rollback();
        $response['message'] = 'Error saving register: ' . $e->getMessage();
    }
}

echo json_encode($response);
mysqli_close($conn);
?>
