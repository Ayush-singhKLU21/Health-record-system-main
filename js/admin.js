const adminUser = JSON.parse(localStorage.getItem('currentUser'));
if (!adminUser || adminUser.role !== 'admin') { alert('Admin access required.'); window.location.href = 'login.html'; }

function loadAdminDashboard() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    document.getElementById('adminName')?.replaceChildren(document.createTextNode(adminUser?.name || 'Admin'));
    document.getElementById('userCount')?.replaceChildren(document.createTextNode(users.length));
    document.getElementById('patientCount')?.replaceChildren(document.createTextNode(patients.length));
    document.getElementById('recordCount')?.replaceChildren(document.createTextNode(records.length));
    document.getElementById('appointmentCount')?.replaceChildren(document.createTextNode(appointments.length));
}
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; }
loadAdminDashboard();
