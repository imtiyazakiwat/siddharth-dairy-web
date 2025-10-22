let rowCount = 0;

// Add initial row on load
document.addEventListener('DOMContentLoaded', () => {
    addRow();
});

// Add row button event
document.getElementById('addRowBtn').addEventListener('click', addRow);

function addRow() {
    rowCount++;
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    row.id = `row-${rowCount}`;
    
    row.innerHTML = `
        <td><input type="number" class="ltr-input" step="0.01" placeholder="0.00" data-row="${rowCount}"></td>
        <td><input type="number" class="rate-input" step="0.01" placeholder="0.00" data-row="${rowCount}"></td>
        <td><span class="total-cell" id="total-${rowCount}">0.00</span></td>
        <td><button class="delete-btn" onclick="deleteRow(${rowCount})">×</button></td>
    `;
    
    tableBody.appendChild(row);
    
    // Add event listeners to inputs
    const ltrInput = row.querySelector('.ltr-input');
    const rateInput = row.querySelector('.rate-input');
    
    ltrInput.addEventListener('input', () => calculateRow(rowCount));
    rateInput.addEventListener('input', () => calculateRow(rowCount));
    
    calculateTotals();
}

function calculateRow(rowId) {
    const row = document.getElementById(`row-${rowId}`);
    if (!row) return;
    
    const ltr = parseFloat(row.querySelector('.ltr-input').value) || 0;
    const rate = parseFloat(row.querySelector('.rate-input').value) || 0;
    const total = ltr * rate;
    
    document.getElementById(`total-${rowId}`).textContent = total.toFixed(2);
    calculateTotals();
}

function deleteRow(rowId) {
    const row = document.getElementById(`row-${rowId}`);
    if (row) {
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            calculateTotals();
        }, 300);
    }
}

function calculateTotals() {
    let totalLtr = 0;
    let totalRate = 0;
    let totalAmount = 0;
    
    const ltrInputs = document.querySelectorAll('.ltr-input');
    const rateInputs = document.querySelectorAll('.rate-input');
    
    ltrInputs.forEach(input => {
        totalLtr += parseFloat(input.value) || 0;
    });
    
    rateInputs.forEach(input => {
        totalRate += parseFloat(input.value) || 0;
    });
    
    document.querySelectorAll('.total-cell').forEach(cell => {
        if (cell.id.startsWith('total-')) {
            totalAmount += parseFloat(cell.textContent) || 0;
        }
    });
    
    document.getElementById('totalLtr').textContent = totalLtr.toFixed(2);
    document.getElementById('totalRate').textContent = totalRate.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);
