import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white text-3xl font-bold">
      <div>
        Tailwind CSS is working! 🎉
        <UserProfile />
      </div>
    </div>
  );
}

