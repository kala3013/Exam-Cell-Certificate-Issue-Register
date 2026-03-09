// =============================================
// GLOBAL STATE FOR TRACKING ENTRIES
// =============================================

// Store for missing register numbers per range for each type
let missingRegisterNumbers = {
    regular: {},
    lateral: {},
    transfer: {}
};

// Track which entry types are generated
let generatedTypes = {
    regular: false,
    lateral: false,
    transfer: false
};

// Branch mapping
const branchMapping = {
    '104': 'Computer Science Engineering',
    '105': 'Electrical and Electronics Engineering',
    '106': 'Electronics and Communication Engineering',
    '114': 'Mechanical Engineering',
    '243': 'Artificial Intelligence and Data Science',
    '109': 'VLSI'
};

const branchAbbreviation = {
    '104': 'CSE',
    '105': 'EEE',
    '106': 'ECE',
    '114': 'MECH',
    '243': 'AI&DS',
    '109': 'VLSI'
};

// Event listeners
if (document.getElementById('degree')) {
    document.getElementById('degree').addEventListener('change', updateDegreeAndBranch);
}
if (document.getElementById('branch_code')) {
    document.getElementById('branch_code').addEventListener('change', updateDegreeAndBranch);
}
if (document.getElementById('mode')) {
    document.getElementById('mode').addEventListener('change', updateProgrammeMode);
}
if (document.getElementById('certificate_type')) {
    document.getElementById('certificate_type').addEventListener('change', function() {
        updateCertificateTypeHeader();
        updateOverallSummary();
    });
}

// =============================================
// HELPER FUNCTIONS FOR TABLE GENERATION
// =============================================

function addRegisterRanges(startRegNo, numEntries, seriesCode) {
    if (numEntries <= 0) {
        return [];
    }

    const regNoLength = startRegNo.length;
    let ranges = [];

    // For regular entries, use the start number directly
    // For lateral/transfer, replace the last 3 digits with series code
    let baseNum;
    if (seriesCode === '01') {
        baseNum = startRegNo;
    } else if (seriesCode === '300') {
        // Lateral entries start from 301
        baseNum = startRegNo.substring(0, regNoLength - 3) + '301';
    } else if (seriesCode === '700') {
        // Transfer entries start from 701
        baseNum = startRegNo.substring(0, regNoLength - 3) + '701';
    } else {
        baseNum = startRegNo.substring(0, regNoLength - 3) + seriesCode;
    }

    const rows = Math.ceil(numEntries / 10);
    
    for (let i = 0; i < rows; i++) {
        const startNum = BigInt(baseNum) + BigInt(i * 10);
        const endNum = startNum + BigInt(9);
        
        const range = `${startNum.toString().padStart(regNoLength, '0')} - ${endNum.toString().padStart(regNoLength, '0')}`;
        ranges.push({
            range: range,
            startNum: startNum.toString(),
            endNum: endNum.toString()
        });
    }

    return ranges;
}

function generateAllCombined() {
    const startRegNo = document.getElementById('start_reg_no').value;
    const numRegular = parseInt(document.getElementById('num_regular').value) || 0;
    const numLateral = parseInt(document.getElementById('num_lateral').value) || 0;
    const numTransfer = parseInt(document.getElementById('num_transfer').value) || 0;
    
    if (!startRegNo) {
        alert('Please enter the starting register number.');
        return;
    }
    
    if (!startRegNo.match(/^\d+$/)) {
        alert('Register number must contain only digits.');
        return;
    }

    const regNoLength = startRegNo.length;
    const seriesPrefix = startRegNo.substring(0, regNoLength - 3);
    
    // Create sequential list of all entries
    let allEntries = [];
    
    // Add regular entries
    for (let i = 0; i < numRegular; i++) {
        allEntries.push(BigInt(startRegNo) + BigInt(i));
    }
    
    // Add lateral entries (starting from 301)
    if (numLateral > 0) {
        let lateralStartNum = BigInt(seriesPrefix + '301');
        for (let i = 0; i < numLateral; i++) {
            allEntries.push(lateralStartNum + BigInt(i));
        }
    }
    
    // Add transfer entries (starting from where lateral ends, or from 701 if no lateral)
    if (numTransfer > 0) {
        let transferStartNum;
        if (numLateral > 0) {
            // Start from after lateral entries
            transferStartNum = BigInt(seriesPrefix + '301') + BigInt(numLateral);
        } else {
            // Start from 701
            transferStartNum = BigInt(seriesPrefix + '701');
        }
        
        for (let i = 0; i < numTransfer; i++) {
            allEntries.push(transferStartNum + BigInt(i));
        }
    }
    
    // Group entries into rows of 10
    let ranges = [];
    for (let i = 0; i < allEntries.length; i += 10) {
        const rowStart = allEntries[i];
        const rowEnd = (i + 10 <= allEntries.length) ? allEntries[i + 9] : allEntries[allEntries.length - 1];
        
        const range = `${rowStart.toString().padStart(regNoLength, '0')} - ${rowEnd.toString().padStart(regNoLength, '0')}`;
        const actualCount = Math.min(10, allEntries.length - i);
        
        ranges.push({
            range: range,
            entries: allEntries.slice(i, i + actualCount),
            actualCount: actualCount
        });
    }
    
    // Clear all previous tables
    missingRegisterNumbers = {
        regular: {},
        lateral: {},
        transfer: {}
    };
    generatedTypes = {
        regular: false,
        lateral: false,
        transfer: false
    };
    
    // Display in combined table
    document.getElementById('register_section_regular').style.display = 'none';
    document.getElementById('register_section_lateral').style.display = 'none';
    document.getElementById('register_section_transfer').style.display = 'none';
    
    renderCombinedRows(ranges);
}

function renderTableRows(rangesArray, entryType) {
    const sectionId = `register_section_${entryType}`;
    const tbodyId = `register_tbody_${entryType}`;
    
    document.getElementById(sectionId).style.display = 'block';
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = '';
    
    // Initialize missing numbers storage for this type
    missingRegisterNumbers[entryType] = {};
    
    rangesArray.forEach(rangeObj => {
        const tr = document.createElement('tr');
        tr.dataset.range = rangeObj.range;
        tr.dataset.startNum = rangeObj.startNum;
        tr.dataset.endNum = rangeObj.endNum;
        
        // Initialize missing numbers for this range
        missingRegisterNumbers[entryType][rangeObj.range] = [];
        
        tr.innerHTML = `
            <td class="reg-no-range">${rangeObj.range}</td>
            <td class="subtotal">10</td>
            <td class="remarks remarks-empty">None</td>
        `;
        
        // Add click event to edit remarks
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', function() {
            openModal(rangeObj.range, entryType);
        });
        
        tbody.appendChild(tr);
    });
    
    calculateTotals(entryType);
    updateOverallSummary();
}

// =============================================
// GENERATE FUNCTIONS FOR EACH ENTRY TYPE
// =============================================

function generateRegularEntries() {
    generateAllCombined();
}

function generateLateralEntries() {
    generateAllCombined();
}

function generateTransferEntries() {
    generateAllCombined();
}

function generateAllCombined() {
    const startRegNo = document.getElementById('start_reg_no').value;
    const numRegular = parseInt(document.getElementById('num_regular').value) || 0;
    const numLateral = parseInt(document.getElementById('num_lateral').value) || 0;
    const numTransfer = parseInt(document.getElementById('num_transfer').value) || 0;
    
    if (!startRegNo) {
        alert('Please enter the starting register number.');
        return;
    }
    
    if (!startRegNo.match(/^\d+$/)) {
        alert('Register number must contain only digits.');
        return;
    }
    
    const totalEntries = numRegular + numLateral + numTransfer;
    if (totalEntries < 1) {
        alert('Please enter at least one entry in any category.');
        return;
    }

    const regNoLength = startRegNo.length;
    const seriesPrefix = startRegNo.substring(0, regNoLength - 3);
    
    // Create separate arrays for each entry type
    let regularEntries = [];
    let lateralEntries = [];
    let transferEntries = [];
    
    // Add regular entries
    for (let i = 0; i < numRegular; i++) {
        regularEntries.push({
            num: BigInt(startRegNo) + BigInt(i),
            type: 'regular'
        });
    }
    
    // Add lateral entries (starting from 301)
    if (numLateral > 0) {
        let lateralStartNum = BigInt(seriesPrefix + '301');
        for (let i = 0; i < numLateral; i++) {
            lateralEntries.push({
                num: lateralStartNum + BigInt(i),
                type: 'lateral'
            });
        }
    }
    
    // Add transfer entries (starting from 701)
    if (numTransfer > 0) {
        let transferStartNum = BigInt(seriesPrefix + '701');
        for (let i = 0; i < numTransfer; i++) {
            transferEntries.push({
                num: transferStartNum + BigInt(i),
                type: 'transfer'
            });
        }
    }
    
    // Combine all entries in sequence
    let allEntries = [...regularEntries, ...lateralEntries, ...transferEntries];
    
    // Group entries into rows of 10
    let ranges = [];
    for (let i = 0; i < allEntries.length; i += 10) {
        const rowEntries = allEntries.slice(i, i + 10);
        const rowStart = rowEntries[0].num;
        const rowEnd = rowEntries[rowEntries.length - 1].num;
        
        const range = `${rowStart.toString().padStart(regNoLength, '0')} - ${rowEnd.toString().padStart(regNoLength, '0')}`;
        const actualCount = rowEntries.length;
        
        // Extract just the numbers for the entries
        const entryNumbers = rowEntries.map(e => e.num);
        
        ranges.push({
            range: range,
            entries: entryNumbers,
            actualCount: actualCount
        });
    }
    
    // Clear all previous tracking data
    missingRegisterNumbers = {
        regular: {},
        lateral: {},
        transfer: {}
    };
    
    // Render combined rows
    renderCombinedRows(ranges);
    
    // Mark all as generated
    generatedTypes.regular = numRegular > 0;
    generatedTypes.lateral = numLateral > 0;
    generatedTypes.transfer = numTransfer > 0;
}

// =============================================
// RENDER COMBINED ROWS
// =============================================

function renderCombinedRows(ranges) {
    const regularTbody = document.getElementById('register_tbody_regular');
    const lateralTbody = document.getElementById('register_tbody_lateral');
    const transferTbody = document.getElementById('register_tbody_transfer');
    const combinedTbody = document.getElementById('combined_print_tbody');
    
    // Clear all tbody
    regularTbody.innerHTML = '';
    lateralTbody.innerHTML = '';
    transferTbody.innerHTML = '';
    combinedTbody.innerHTML = '';
    
    // Initialize missing numbers storage
    missingRegisterNumbers = {
        regular: {},
        lateral: {},
        transfer: {}
    };
    
    // Generate rows for all tables
    ranges.forEach(rangeData => {
        // Initialize missing numbers for this range
        missingRegisterNumbers.regular[rangeData.range] = [];
        
        // Create row
        const row = document.createElement('tr');
        row.dataset.range = rangeData.range;
        row.dataset.startNum = rangeData.entries[0].toString();
        row.dataset.endNum = rangeData.entries[rangeData.actualCount - 1].toString();
        
        // Range column
        const rangeCell = document.createElement('td');
        rangeCell.className = 'reg-no-range';
        rangeCell.textContent = rangeData.range;
        row.appendChild(rangeCell);
        
        // Subtotal column
        const subtotalCell = document.createElement('td');
        subtotalCell.className = 'subtotal';
        subtotalCell.textContent = rangeData.actualCount;
        row.appendChild(subtotalCell);
        
        // Remarks column
        const remarksCell = document.createElement('td');
        remarksCell.className = 'remarks remarks-empty';
        remarksCell.textContent = 'None';
        row.appendChild(remarksCell);
        
        // Add click event to edit remarks
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            openModal(rangeData.range, 'regular', rangeData.entries, rangeData.actualCount);
        });
        
        // Append to all tables
        const rowClone1 = row.cloneNode(true);
        rowClone1.addEventListener('click', function() {
            openModal(rangeData.range, 'regular', rangeData.entries, rangeData.actualCount);
        });
        regularTbody.appendChild(rowClone1);
        
        const rowClone2 = row.cloneNode(true);
        rowClone2.addEventListener('click', function() {
            openModal(rangeData.range, 'regular', rangeData.entries, rangeData.actualCount);
        });
        combinedTbody.appendChild(rowClone2);
    });
    
    // Hide lateral and transfer tables, show only regular
    document.getElementById('register_section_regular').style.display = 'block';
    document.getElementById('register_section_lateral').style.display = 'none';
    document.getElementById('register_section_transfer').style.display = 'none';
    document.getElementById('overall_summary_section').style.display = 'block';
    
    // Calculate totals
    calculateTotals('regular');
}

// Legacy function for backwards compatibility
function generateRegisterTable() {
    generateRegularEntries();
}

// =============================================
// DEGREE AND BRANCH FUNCTIONS
// =============================================

function updateDegreeAndBranch() {
    const branchCode = document.getElementById('branch_code').value;
    const degree = document.getElementById('degree').value;
    
    // Auto-populate programme based on degree selection
    const programmeSelect = document.getElementById('programme');
    if (degree) {
        programmeSelect.value = degree;
        programmeSelect.disabled = false;
    } else {
        programmeSelect.value = '';
        programmeSelect.disabled = true;
    }
    
    // Update department name
    if (branchCode && branchMapping[branchCode]) {
        document.getElementById('dept_name').textContent = branchMapping[branchCode];
    } else {
        document.getElementById('dept_name').textContent = '';
    }
    
    // Update branch abbreviation
    if (branchCode && branchAbbreviation[branchCode]) {
        document.getElementById('branch_abbr').textContent = branchAbbreviation[branchCode];
    } else {
        document.getElementById('branch_abbr').textContent = '';
    }
}

function updateProgrammeMode() {
    const mode = document.getElementById('mode').value;
    const programmeModeSpan = document.getElementById('programme_mode');
    programmeModeSpan.textContent = mode;
}

function updateCertificateTypeHeader() {
    const certificateType = document.getElementById('certificate_type').value;
    const headerElement = document.getElementById('cert_type_header');
    const balanceHeader = document.getElementById('balance_header');
    
    if (certificateType) {
        headerElement.textContent = certificateType;
        balanceHeader.textContent = `Reg No not Registered for ${certificateType}`;
    } else {
        headerElement.textContent = 'Certificate Name';
        balanceHeader.textContent = 'Reg No not Registered for the Certificate';
    }
}

// =============================================
// REGISTER TABLE GENERATION
// =============================================

function generateRegisterTable() {
    const startRegNo = document.getElementById('start_reg_no').value;
    const numRegular = parseInt(document.getElementById('num_regular').value) || 0;
    const numLateral = parseInt(document.getElementById('num_lateral').value) || 0;
    const numTransfer = parseInt(document.getElementById('num_transfer').value) || 0;
    
    if (!startRegNo) {
        alert('Please enter the starting register number.');
        return;
    }
    
    if (!startRegNo.match(/^\d+$/)) {
        alert('Register number must contain only digits.');
        return;
    }
    
    if (numRegular < 1) {
        alert('Regular entries must be at least 1.');
        return;
    }

    // Reset missing register numbers
    missingRegisterNumbers = {};

    document.getElementById('register_section').style.display = 'block';
    const tbody = document.getElementById('register_tbody');
    tbody.innerHTML = '';

    // Extract base components from start register number
    // Example: 710023104001 -> 710023104 (base) and 001 (start sequence)
    const regNoLength = startRegNo.length;
    const baseRegNo = startRegNo.substring(0, regNoLength - 2); // Remove last 2 digits for series
    const seriesPrefix = startRegNo.substring(0, regNoLength - 3); // For constructing lateral/transfer

    let allRanges = [];

    // Generate REGULAR student ranges (01-99 series)
    const regularRows = Math.ceil(numRegular / 10);
    for (let i = 0; i < regularRows; i++) {
        const startNum = BigInt(startRegNo) + BigInt(i * 10);
        const endNum = startNum + BigInt(9);
        
        const range = `${startNum.toString().padStart(regNoLength, '0')} - ${endNum.toString().padStart(regNoLength, '0')}`;
        allRanges.push({
            range: range,
            startNum: startNum.toString(),
            endNum: endNum.toString(),
            type: 'REGULAR'
        });
    }

    // Generate LATERAL ENTRY ranges (300 series)
    if (numLateral > 0) {
        const lateralStart = seriesPrefix + '300';
        const lateralRows = Math.ceil(numLateral / 10);
        for (let i = 0; i < lateralRows; i++) {
            const startNum = BigInt(lateralStart) + BigInt(i * 10);
            const endNum = startNum + BigInt(9);
            
            const range = `${startNum.toString().padStart(regNoLength, '0')} - ${endNum.toString().padStart(regNoLength, '0')}`;
            allRanges.push({
                range: range,
                startNum: startNum.toString(),
                endNum: endNum.toString(),
                type: 'LATERAL'
            });
        }
    }

    // Generate TRANSFER ENTRY ranges (700 series)
    if (numTransfer > 0) {
        const transferStart = seriesPrefix + '700';
        const transferRows = Math.ceil(numTransfer / 10);
        for (let i = 0; i < transferRows; i++) {
            const startNum = BigInt(transferStart) + BigInt(i * 10);
            const endNum = startNum + BigInt(9);
            
            const range = `${startNum.toString().padStart(regNoLength, '0')} - ${endNum.toString().padStart(regNoLength, '0')}`;
            allRanges.push({
                range: range,
                startNum: startNum.toString(),
                endNum: endNum.toString(),
                type: 'TRANSFER'
            });
        }
    }

    // Create table rows
    allRanges.forEach(rangeObj => {
        const tr = document.createElement('tr');
        tr.dataset.range = rangeObj.range;
        tr.dataset.startNum = rangeObj.startNum;
        tr.dataset.endNum = rangeObj.endNum;
        tr.dataset.type = rangeObj.type;
        
        // Initialize missing numbers for this range
        missingRegisterNumbers[rangeObj.range] = [];
        
        // Determine type label
        let typeLabel = '';
        if (rangeObj.type === 'LATERAL') {
            typeLabel = ' [L]';
        } else if (rangeObj.type === 'TRANSFER') {
            typeLabel = ' [T]';
        }
        
        tr.innerHTML = `
            <td class="reg-no-range">${rangeObj.range}${typeLabel}</td>
            <td class="subtotal">10</td>
            <td class="remarks remarks-empty">None</td>
        `;
        
        // Add click event to edit remarks
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', function() {
            openModal(rangeObj.range);
        });
        
        tbody.appendChild(tr);
    });
    
    calculateTotals();
}

// =============================================
// MODAL FUNCTIONS FOR MISSING REGISTER NUMBERS
// =============================================

function openModal(range, entryType, entries, actualCount) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal_body');

    modalBody.innerHTML = '';

    // Use provided entries or parse from range
    let regNosToShow = entries || [];
    if (regNosToShow.length === 0 && range) {
        const [startStr, endStr] = range.split(' - ');
        const start = BigInt(startStr.trim());
        const end = BigInt(endStr.trim());
        for (let i = start; i <= end; i++) {
            regNosToShow.push(i);
        }
    }
    
    regNosToShow.forEach(regNo => {
        const regNoStr = regNo.toString ? regNo.toString() : regNo.toString();
        const isMissing = missingRegisterNumbers[entryType][range] && missingRegisterNumbers[entryType][range].includes(regNoStr);
        
        const checkboxContainer = document.createElement('label');
        checkboxContainer.style.display = 'flex';
        checkboxContainer.style.alignItems = 'center';
        checkboxContainer.style.width = '100%';
        checkboxContainer.style.padding = '5px';
        checkboxContainer.style.borderRadius = '3px';
        checkboxContainer.style.cursor = 'pointer';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'reg_' + regNoStr;
        checkbox.value = regNoStr;
        checkbox.checked = !isMissing; // Checked = Received, Unchecked = Missing
        checkbox.style.marginRight = '6px';
        checkbox.style.width = '16px';
        checkbox.style.height = '16px';
        checkbox.style.cursor = 'pointer';

        const label = document.createElement('span');
        label.textContent = regNoStr;
        label.style.fontSize = '12px';

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        modalBody.appendChild(checkboxContainer);
    });

    document.getElementById('modal').dataset.range = range;
    document.getElementById('modal').dataset.entryType = entryType;
    modal.style.display = 'block';
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function updateRemarks() {
    const range = document.getElementById('modal').dataset.range;
    const entryType = document.getElementById('modal').dataset.entryType;
    const modalBody = document.getElementById('modal_body');
    const checkboxes = modalBody.querySelectorAll('input[type="checkbox"]');
    const missingNumbers = [];
    let receivedCount = 0;

    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            // Unchecked = Missing
            missingNumbers.push(checkbox.value);
        } else {
            // Checked = Received
            receivedCount++;
        }
    });

    // Store missing numbers for this range and type
    missingRegisterNumbers[entryType][range] = missingNumbers;

    // Update the table row for this entry type
    const tbodyId = `register_tbody_${entryType}`;
    const tbody = document.getElementById(tbodyId);
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        if (row.dataset.range === range) {
            row.querySelector('.subtotal').textContent = receivedCount;
            
            // Update remarks
            const remarksCell = row.querySelector('.remarks');
            if (missingNumbers.length === 0) {
                remarksCell.textContent = 'None';
                remarksCell.classList.add('remarks-empty');
            } else {
                remarksCell.textContent = missingNumbers.join(', ');
                remarksCell.classList.remove('remarks-empty');
            }
        }
    });
    
    // Also update combined print table
    const combinedTbody = document.getElementById('combined_print_tbody');
    if (combinedTbody) {
        const combinedRows = combinedTbody.querySelectorAll('tr');
        combinedRows.forEach(row => {
            if (row.dataset.range === range) {
                row.querySelector('.subtotal').textContent = receivedCount;
                const remarksCell = row.querySelector('.remarks');
                if (missingNumbers.length === 0) {
                    remarksCell.textContent = 'None';
                    remarksCell.classList.add('remarks-empty');
                } else {
                    remarksCell.textContent = missingNumbers.join(', ');
                    remarksCell.classList.remove('remarks-empty');
                }
            }
        });
    }

    calculateTotals(entryType);
    closeModal();
}

// =============================================
// CALCULATION FUNCTIONS
// =============================================

function calculateTotals(entryType) {
    const tbodyId = `register_tbody_${entryType}`;
    const tbody = document.getElementById(tbodyId);
    const rows = tbody.querySelectorAll('tr');
    let totalRegistered = 0;
    let received = 0;

    rows.forEach(row => {
        const subtotal = parseInt(row.querySelector('.subtotal').textContent) || 0;
        received += subtotal;
        // Total is the subtotal (actual count for this row)
        const actualCount = parseInt(row.dataset.count) || subtotal || 10;
        totalRegistered += actualCount;
    });

    // Update totals for this entry type
    document.getElementById(`total_${entryType}`).value = totalRegistered;
    document.getElementById(`received_${entryType}`).value = received;
    document.getElementById(`balance_${entryType}`).value = totalRegistered - received;
    
    // Update overall summary
    updateOverallSummary();
}

function updateOverallSummary() {
    // Only show overall summary if at least one type is generated
    if (generatedTypes.regular || generatedTypes.lateral || generatedTypes.transfer) {
        document.getElementById('overall_summary_section').style.display = 'block';
    }
    
    let grandTotal = 0;
    let grandReceived = 0;
    let missingCount = 0;

    if (generatedTypes.regular) {
        grandTotal += parseInt(document.getElementById('total_regular').value || 0);
        grandReceived += parseInt(document.getElementById('received_regular').value || 0);
    }

    if (generatedTypes.lateral) {
        grandTotal += parseInt(document.getElementById('total_lateral').value || 0);
        grandReceived += parseInt(document.getElementById('received_lateral').value || 0);
    }

    if (generatedTypes.transfer) {
        grandTotal += parseInt(document.getElementById('total_transfer').value || 0);
        grandReceived += parseInt(document.getElementById('received_transfer').value || 0);
    }

    // Count all missing entries from remarks across all visible tables
    const regularTbody = document.getElementById('register_tbody_regular');
    const lateralTbody = document.getElementById('register_tbody_lateral');
    const transferTbody = document.getElementById('register_tbody_transfer');

    [regularTbody, lateralTbody, transferTbody].forEach(tbody => {
        if (tbody && tbody.children.length > 0) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
                const remarksCell = row.querySelector('.remarks');
                if (remarksCell) {
                    const remarksText = remarksCell.textContent;
                    // Count missing entries if remarks is not "None"
                    if (remarksText && remarksText !== 'None') {
                        // Count the number of entries in the remarks (comma separated numbers)
                        const missingEntries = remarksText.split(',').filter(s => s.trim().length > 0);
                        missingCount += missingEntries.length;
                    }
                }
            });
        }
    });

    document.getElementById('total_registered').value = grandTotal;
    
    // Get certificate type from the certificate_type select
    const certificateType = document.getElementById('certificate_type').value;
    document.getElementById('received').value = certificateType || '';
    
    // Set balance to the count of missing/not registered
    document.getElementById('balance').value = missingCount;
    
    // Update combined print table
    updateCombinedPrintTable();
}

function updateCombinedPrintTable() {
    const combinedTbody = document.getElementById('combined_print_tbody');
    combinedTbody.innerHTML = '';

    // Add rows from regular entries
    const regularTbody = document.getElementById('register_tbody_regular');
    if (regularTbody && regularTbody.children.length > 0) {
        const regularRows = regularTbody.querySelectorAll('tr');
        regularRows.forEach(row => {
            const clonedRow = row.cloneNode(true);
            combinedTbody.appendChild(clonedRow);
        });
    }

    // Add rows from lateral entries
    const lateralTbody = document.getElementById('register_tbody_lateral');
    if (lateralTbody && lateralTbody.children.length > 0) {
        const lateralRows = lateralTbody.querySelectorAll('tr');
        lateralRows.forEach(row => {
            const clonedRow = row.cloneNode(true);
            combinedTbody.appendChild(clonedRow);
        });
    }

    // Add rows from transfer entries
    const transferTbody = document.getElementById('register_tbody_transfer');
    if (transferTbody && transferTbody.children.length > 0) {
        const transferRows = transferTbody.querySelectorAll('tr');
        transferRows.forEach(row => {
            const clonedRow = row.cloneNode(true);
            combinedTbody.appendChild(clonedRow);
        });
    }
}

// =============================================
// WINDOW UNLOAD - CLOSE MODAL ON ESC
// =============================================

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});


