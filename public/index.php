<?php
require_once '../src/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Issue Register - Anna University</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
        <img src="assets/images/anna_university_logo_freelogovectors.net_.png" width="60" height="60">
            <div class="title-section">
                <h1>ANNA UNIVERSITY REGIONAL CAMPUS COIMBATORE</h1>
                <p>COIMBATORE - 641 046</p>
                <h2>CERTIFICATE ISSUE REGISTER</h2>
            </div>
            <div class="degree-branch">
                <div class="form-field">
                    <label>DEGREE</label>
                    <select name="degree" id="degree">
                        <option value="">Select</option>
                        <option value="UG">UG</option>
                        <option value="PG">PG</option>
                    </select>
                </div>
                <div class="form-field">
                    <label>CODE</label>
                    <select name="branch_code" id="branch_code">
                        <option value="">Select</option>
                        <option value="104">104</option>
                        <option value="105">105</option>
                        <option value="106">106</option>
                        <option value="114">114</option>
                        <option value="243">243</option>
                        <option value="109">109</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Form Section -->
        <form id="certificateForm" method="POST">
            <!-- Period and Certificate -->
            <div class="form-section">
                <div class="form-row">
                    <div class="form-field">
                        <label>PERIOD OF EXAMINATION :</label>
                        <select name="period" id="period">
                            <option value="APR/MAY">Apr/May</option>
                            <option value="NOV/DEC">Nov/Dec</option>
                        </select>
                        <select name="year" id="year">
                            <option value="">Year</option>
                            <option value="2025">2025</option>

                            <?php
                            $current_year = date('Y');
                            for ($i = 0; $i < 5; $i++) {
                                $year = $current_year + $i;
                                echo "<option value='$year'>$year</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-field">
                        <label>CERTIFICATE:</label>
                        <select name="certificate_type" id="certificate_type">
                            <option value="">Select</option>
                            <option value="Provisional Certificate">Provisional Certificate</option>
                            <option value="Degree Certificate">Degree Certificate</option>
                            <option value="Provisional Grade Sheet">Provisional Grade Sheet</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-field">
                        <label>Controller of Examinations, Anna University, Chennai Lr. No :</label>
                        <select name="controller_lr_no" id="controller_lr_no">
                            <option value="">Select</option>
                            <option value="LR No 1">LR No 1</option>
                            <option value="LR No 2">LR No 2</option>
                            <option value="LR No 3">LR No 3</option>
                            <option value="LR No 4">LR No 4</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label>Date</label>
                        <input type="date" name="date_issued" id="date_issued">
                    </div>
                </div>
            </div>

            <!-- Department Info Table -->
            <table class="info-table">
                <tbody>
                    <tr>
                        <td class="label">NAME OF THE DEPARTMENT</td>
                        <td class="value" colspan="3">
                            <strong>BE -</strong> <span id="dept_name"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">PROGRAMME</td>
                        <td class="value">
                            <select name="programme" id="programme" disabled>
                                <option value="">Select Degree First</option>
                                <option value="UG">UG</option>
                                <option value="PG">PG</option>
                            </select>
                        </td>
                        <td class="label">REGULATIONS</td>
                        <td class="value">
                            <select name="regulation" id="regulation">
                                <option value="">Reg</option>
                                <option value="2021">2021</option>
                                <option value="2025">2025</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">SEMESTER</td>
                        <td class="value">
                            <select name="semester" id="semester">
                                <option value="">Select Semester</option>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                <option value="V">V</option>
                                <option value="VI">VI</option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                            </select>
                        </td>
                        <td class="label">BRANCH</td>
                        <td class="value"><span id="branch_abbr"></span></td>
                    </tr>
                    <tr>
                        <td class="label">EXAMINATION</td>
                        <td class="value">
                            <select name="examination" id="examination">
                                <option value="">Type</option>
                                <option value="REGULAR">REGULAR</option>
                                <option value="ARREAR">ARREAR</option>
                            </select>
                        </td>
                        <td class="label">BATCH</td>
                        <td class="value">
                            <select name="batch" id="batch" onchange="loadRegisterNumbers()">
                                <option value="">Select Batch</option>
                                <option value="2023-2027">2023 - 2027</option>
                                <option value="2024-2028">2024 - 2028</option>
                               <?php
$current_year = date('Y');

for ($i = 0; $i < 5; $i++) {
    $start_year = $current_year + $i;
    $end_year = $start_year + 4;
    echo "<option value='$start_year-$end_year'>
            $start_year - $end_year
          </option>";
}
?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="mode-row">
                            <strong>PROGRAMME : <span id="programme_mode">FULL TIME</span></strong>
                            <select name="mode" id="mode" style="display: none;">
                                <option value="FULL TIME" selected>Full Time</option>
                                <option value="PART TIME">Part Time</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Register Numbers Input Section -->
            <div class="register-input-section">
                <h3>CERTIFICATE DISTRIBUTION REGISTER</h3>
                <div class="form-row">
                    <div class="form-field">
                        <label>Starting Register Number:</label>
                        <input type="text" name="start_reg_no" id="start_reg_no" placeholder="e.g., 710023104001">
                    </div>
                </div>
            </div>

            <!-- REGULAR ENTRIES SECTION -->
            <div class="entry-category-section">
                <h3>REGULAR ENTRIES (01-99 Series)</h3>
                <div class="entry-section">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Number of Regular Entries:</label>
                            <input type="number" name="num_regular" id="num_regular" value="0" min="0">
                        </div>
                        <div class="form-field">
                            <button type="button" class="btn btn-generate" onclick="generateRegularEntries()">Generate Regular</button>
                        </div>
                    </div>
                </div>
                
                <div id="register_section_regular" style="display: none;">
                    <div class="register-table-wrapper">
                        <table class="register-table">
                            <thead>
                                <tr>
                                    <th style="width: 35%;">Reg No Range</th>
                                    <th style="width: 15%;">Subtotal</th>
                                    <th style="width: 50%;">Remarks</th>
                                </tr>
                            </thead>
                            <tbody id="register_tbody_regular">
                                <!-- Populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div class="totals-section">
                        <h4>Regular Summary</h4>
                        <table class="totals-table">
                            <tr>
                                <td class="total-label">Total Regular Candidates:</td>
                                <td class="total-value"><input type="number" id="total_regular" readonly></td>
                                <td class="total-label">Received:</td>
                                <td class="total-value"><input type="number" id="received_regular" readonly></td>
                                <td class="total-label">Balance:</td>
                                <td class="total-value"><input type="number" id="balance_regular" readonly></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <!-- LATERAL ENTRY SECTION -->
            <div class="entry-category-section">
                <h3>LATERAL ENTRY (300 Series)</h3>
                <div class="entry-section">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Number of Lateral Entries:</label>
                            <input type="number" name="num_lateral" id="num_lateral" value="0" min="0">
                        </div>
                        <div class="form-field">
                            <button type="button" class="btn btn-generate" onclick="generateLateralEntries()">Generate Lateral</button>
                        </div>
                    </div>
                </div>
                
                <div id="register_section_lateral" style="display: none;">
                    <div class="register-table-wrapper">
                        <table class="register-table">
                            <thead>
                                <tr>
                                    <th style="width: 35%;">Reg No Range</th>
                                    <th style="width: 15%;">Subtotal</th>
                                    <th style="width: 50%;">Remarks</th>
                                </tr>
                            </thead>
                            <tbody id="register_tbody_lateral">
                                <!-- Populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div class="totals-section">
                        <h4>Lateral Summary</h4>
                        <table class="totals-table">
                            <tr>
                                <td class="total-label">Total Lateral Candidates:</td>
                                <td class="total-value"><input type="number" id="total_lateral" readonly></td>
                                <td class="total-label">Received:</td>
                                <td class="total-value"><input type="number" id="received_lateral" readonly></td>
                                <td class="total-label">Balance:</td>
                                <td class="total-value"><input type="number" id="balance_lateral" readonly></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TRANSFER ENTRY SECTION -->
            <div class="entry-category-section">
                <h3>TRANSFER ENTRY (700 Series)</h3>
                <div class="entry-section">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Number of Transfer Entries:</label>
                            <input type="number" name="num_transfer" id="num_transfer" value="0" min="0">
                        </div>
                        <div class="form-field">
                            <button type="button" class="btn btn-generate" onclick="generateTransferEntries()">Generate Transfer</button>
                        </div>
                    </div>
                </div>
                
                <div id="register_section_transfer" style="display: none;">
                    <div class="register-table-wrapper">
                        <table class="register-table">
                            <thead>
                                <tr>
                                    <th style="width: 35%;">Reg No Range</th>
                                    <th style="width: 15%;">Subtotal</th>
                                    <th style="width: 50%;">Remarks</th>
                                </tr>
                            </thead>
                            <tbody id="register_tbody_transfer">
                                <!-- Populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div class="totals-section">
                        <h4>Transfer Summary</h4>
                        <table class="totals-table">
                            <tr>
                                <td class="total-label">Total Transfer Candidates:</td>
                                <td class="total-value"><input type="number" id="total_transfer" readonly></td>
                                <td class="total-label">Received:</td>
                                <td class="total-value"><input type="number" id="received_transfer" readonly></td>
                                <td class="total-label">Balance:</td>
                                <td class="total-value"><input type="number" id="balance_transfer" readonly></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <!-- COMBINED PRINT TABLE (For Print Only) -->
            <div id="combined_print_section" style="display: none;">
                <div class="register-table-wrapper">
                    <table class="register-table combined-print-table">
                        <thead>
                            <tr>
                                <th style="width: 35%;">Reg No Range</th>
                                <th style="width: 15%;">Subtotal</th>
                                <th style="width: 50%;">Remarks</th>
                            </tr>
                        </thead>
                        <tbody id="combined_print_tbody">
                            <!-- Populated by JavaScript during print -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- OVERALL SUMMARY SECTION -->
            <div id="overall_summary_section" style="display: none;">
                <div class="totals-section summary-grand">
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Total No of Registered Candidates</th>
                                <th id="cert_type_header">Certificate Name</th>
                                <th id="balance_header">Reg No not Registered for the Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="summary-value"><input type="number" id="total_registered" readonly></td>
                                <td class="summary-value"><input type="text" id="received" readonly></td>
                                <td class="summary-value"><input type="number" id="balance" readonly></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Signature Section -->
                <table class="signature-table">
                    <thead>
                        <tr>
                            <th>Receiver</th>
                            <th>hod</th>
                            <th>Seal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td></td>
                        <td></td><td>
                        </td></tr>
                    </tbody>
                </table>

                <!-- Footer Section -->
                <div class="footer">
                    <div class="footer-item">
                        <p>Executive Assistant</p>
                        <div class="signature-line"></div>
                    </div>
                    <div class="footer-item">
                        <p>Exam Cell Coordinator</p>
                        <div class="signature-line"></div>
                    </div>
                </div>

                <!-- Print and Submit Buttons -->
                <div class="button-group">
                    <button type="button" class="btn btn-print" onclick="window.print()">Print</button>
                    <button type="submit" class="btn btn-submit">Save Register</button>
                </div>
            </div>
        </form>
    </div>
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <h2 id="modal_title">Select Missing Register Numbers</h2>
            <div class="modal-instructions">
                <p>Uncheck the register numbers that are <strong>missing or not received</strong>.</p>
                <p>Checked = Received | Unchecked = Missing</p>
            </div>
            <div id="modal_body" class="modal-body"></div>
            <div class="modal-buttons">
                <button type="button" class="btn-update" onclick="updateRemarks()">Update</button>
                <button type="button" class="btn-cancel" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    </div>
    <script src="assets/js/script.js"></script>
</body>
</html>
