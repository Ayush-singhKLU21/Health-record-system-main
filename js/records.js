const recordsKey = 'medicalRecords';
function getRecords() { return JSON.parse(localStorage.getItem(recordsKey)) || []; }
function saveRecords(records) { localStorage.setItem(recordsKey, JSON.stringify(records)); }

function renderRecords() {
    const table = document.getElementById('recordsTable');
    if (!table) return;
    const records = getRecords();
    table.innerHTML = records.length ? records.map(r => `
      <tr><td>${r.id}</td><td>${escapeHtml(r.patientName)}</td><td>${escapeHtml(r.doctor)}</td><td>${escapeHtml(r.diagnosis)}</td><td>${escapeHtml(r.medicines)}</td><td>${escapeHtml(r.date)}</td><td><button class="danger" onclick="deleteRecord(${r.id})">Delete</button></td></tr>
    `).join('') : '<tr><td colspan="7">No medical records found.</td></tr>';
}

function addRecord(e) {
    e.preventDefault();
    const record = {
        id: Date.now(), patientName: document.getElementById('recordPatient').value.trim(),
        doctor: document.getElementById('recordDoctor').value.trim(), diagnosis: document.getElementById('recordDiagnosis').value.trim(),
        medicines: document.getElementById('recordMedicines').value.trim(), notes: document.getElementById('recordNotes').value.trim(),
        date: document.getElementById('recordDate').value || new Date().toISOString().slice(0,10)
    };
    const records = getRecords(); records.push(record); saveRecords(records); e.target.reset(); renderRecords(); alert('Medical record added.');
}
function deleteRecord(id) { if (confirm('Delete this medical record?')) { saveRecords(getRecords().filter(r => r.id !== id)); renderRecords(); } }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

document.getElementById('recordForm')?.addEventListener('submit', addRecord);
renderRecords();
