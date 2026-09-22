const API_URL = '/api/users';

// DOM Elements
const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const userList = document.getElementById('user-list');
const userCount = document.getElementById('user-count');
const emptyState = document.getElementById('empty-state');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

// ===== Toast Notification =====
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ===== Set Loading State =====
function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.hidden = loading;
  btnLoader.hidden = !loading;
}

// ===== Fetch All Users =====
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    renderUsers(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    showToast('Failed to load users', 'error');
  }
}

// ===== Render Users =====
function renderUsers(users) {
  userList.innerHTML = '';
  userCount.textContent = users.length;

  if (users.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  users.forEach((user) => {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.id = `user-${user.id}`;

    const initial = user.username.charAt(0).toUpperCase();

    li.innerHTML = `
      <div class="user-left">
        <div class="user-avatar">${initial}</div>
        <div class="user-info">
          <span class="user-name">${escapeHtml(user.username)}</span>
          <span class="user-details">${escapeHtml(user.email)} · ${escapeHtml(user.phone)}</span>
        </div>
      </div>
      <button class="btn btn-danger" id="delete-btn-${user.id}" onclick="deleteUser(${user.id})">Delete</button>
    `;

    userList.appendChild(li);
  });
}

// ===== Add User (POST) =====
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading(true);

  const data = {
    username: usernameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to add user');
    }

    showToast('User added successfully!', 'success');
    form.reset();
    usernameInput.focus();
    await fetchUsers();
  } catch (err) {
    console.error('Error adding user:', err);
    showToast(err.message, 'error');
  } finally {
    setLoading(false);
  }
});

// ===== Delete User (DELETE) =====
async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to delete user');
    }

    showToast('User deleted', 'success');
    await fetchUsers();
  } catch (err) {
    console.error('Error deleting user:', err);
    showToast(err.message, 'error');
  }
}

// ===== Escape HTML to prevent XSS =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== Load users on page load =====
document.addEventListener('DOMContentLoaded', fetchUsers);
