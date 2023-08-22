import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

export default function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div>
    </div>
  );
}