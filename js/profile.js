const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) { window.location.href = 'login.html'; }

function fillProfile() {
    if (!user) return;
    ['name','email','mobile'].forEach(key => { const el = document.getElementById('profile' + key[0].toUpperCase() + key.slice(1)); if (el) el.value = user[key] || ''; });
}
function updateProfile(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.id === user.id);
    if (index < 0) return alert('User not found.');
    users[index].name = document.getElementById('profileName').value.trim();
    users[index].mobile = document.getElementById('profileMobile').value.trim();
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[index]));
    alert('Profile updated successfully.');
}
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; }
document.getElementById('profileForm')?.addEventListener('submit', updateProfile);
fillProfile();
