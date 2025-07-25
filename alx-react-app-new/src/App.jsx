import UserProfile from './components/UserProfile';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import Counter from './components/Counter';



function App() {
  return (
    <div>
      <WelcomeMessage />
      <hr />
      <Counter />
      <hr />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <hr />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
