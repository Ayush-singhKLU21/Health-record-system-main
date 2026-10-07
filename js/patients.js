const patientsKey = 'patients';

function getPatients() { return JSON.parse(localStorage.getItem(patientsKey)) || []; }
function savePatients(patients) { localStorage.setItem(patientsKey, JSON.stringify(patients)); }

function renderPatients() {
    const table = document.getElementById('patientsTable');
    if (!table) return;
    const patients = getPatients();
    table.innerHTML = patients.length ? patients.map(p => `
        <tr><td>${p.id}</td><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.email)}</td><td>${escapeHtml(p.mobile)}</td><td>${escapeHtml(p.gender || '-')}</td><td><button onclick="deletePatient(${p.id})" class="danger">Delete</button></td></tr>
    `).join('') : '<tr><td colspan="6">No patients found.</td></tr>';
}

function addPatient(e) {
    e.preventDefault();
    const patient = {
        id: Date.now(),
        name: document.getElementById('patientName').value.trim(),
        email: document.getElementById('patientEmail').value.trim().toLowerCase(),
        mobile: document.getElementById('patientMobile').value.trim(),
        gender: document.getElementById('patientGender').value,
        dob: document.getElementById('patientDob').value,
        bloodGroup: document.getElementById('patientBloodGroup').value,
        address: document.getElementById('patientAddress').value.trim()
    };
    const patients = getPatients();
    patients.push(patient);
    savePatients(patients);
    e.target.reset();
    renderPatients();
    alert('Patient added successfully.');
}

function deletePatient(id) {
    if (!confirm('Delete this patient?')) return;
    savePatients(getPatients().filter(p => p.id !== id));
    renderPatients();
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.getElementById('patientForm')?.addEventListener('submit', addPatient);
renderPatients();
