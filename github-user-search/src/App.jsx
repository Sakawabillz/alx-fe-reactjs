import Search from './components/Search';

function App() {
  const handleSearch = (username) => {
    console.log("Searching for:", username);
    // Trigger API call or route change here
  };

  return (
    <div className="app">
      <h1>GitHub Profile Search</h1>
      <Search onSearch={handleSearch} />
    </div>
  );
}

export default App;