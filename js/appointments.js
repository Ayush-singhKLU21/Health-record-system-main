const appointmentsKey = 'appointments';
function getAppointments() { return JSON.parse(localStorage.getItem(appointmentsKey)) || []; }
function saveAppointments(a) { localStorage.setItem(appointmentsKey, JSON.stringify(a)); }

function renderAppointments() {
    const table = document.getElementById('appointmentsTable'); if (!table) return;
    const list = getAppointments();
    table.innerHTML = list.length ? list.map(a => `<tr><td>${a.id}</td><td>${escapeHtml(a.patientName)}</td><td>${escapeHtml(a.doctor)}</td><td>${escapeHtml(a.date)}</td><td>${escapeHtml(a.time)}</td><td>${escapeHtml(a.reason)}</td><td><span class="status">${escapeHtml(a.status)}</span></td><td><button onclick="cancelAppointment(${a.id})" class="danger">Cancel</button></td></tr>`).join('') : '<tr><td colspan="8">No appointments found.</td></tr>';
}
function addAppointment(e) {
    e.preventDefault();
    const appointment = { id: Date.now(), patientName: document.getElementById('appointmentPatient').value.trim(), doctor: document.getElementById('appointmentDoctor').value.trim(), date: document.getElementById('appointmentDate').value, time: document.getElementById('appointmentTime').value, reason: document.getElementById('appointmentReason').value.trim(), status: 'Scheduled' };
    const list = getAppointments(); list.push(appointment); saveAppointments(list); e.target.reset(); renderAppointments(); alert('Appointment booked successfully.');
}
function cancelAppointment(id) { if (confirm('Cancel this appointment?')) { saveAppointments(getAppointments().map(a => a.id === id ? {...a, status:'Cancelled'} : a)); renderAppointments(); } }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

document.getElementById('appointmentForm')?.addEventListener('submit', addAppointment);
renderAppointments();
