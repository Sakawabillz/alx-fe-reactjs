import React, { useState } from 'react';

export default function RegistrationForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (!form.username || !form.email || !form.password) {
      setMsg('Please fill in all fields.');
      return;
    }
    try {
      // mock API call (JSONPlaceholder)
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg('Mock registered — id: ' + (data.id ?? 'n/a'));
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setMsg('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <h2>Controlled Registration Form</h2>
      <div>
        <label>Username</label><br />
        <input name="username" value={form.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label><br />
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password</label><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
      <div style={{ marginTop: 10, color: 'green' }}>{msg}</div>
    </form>
  );
}
