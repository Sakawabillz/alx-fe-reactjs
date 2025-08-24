import { NavLink, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails.jsx";
import ProfileSettings from "./ProfileSettings.jsx";

const active = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "none",
  fontWeight: isActive ? 700 : 400
});

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <nav style={{ display: "flex", gap: 12 }}>
        <NavLink to="details" style={active}>Details</NavLink>
        <NavLink to="settings" style={active}>Settings</NavLink>
      </nav>
      <hr />
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
