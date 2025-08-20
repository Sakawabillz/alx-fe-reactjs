import { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Form submitted:", { username, email, password });
    // mock API call could go here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}  // ✅ required
          onChange={(e) => setUsername(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}  // ✅ required
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}  // ✅ required
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
