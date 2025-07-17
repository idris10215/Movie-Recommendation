import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [searchTerm, setsearchTerm] = useState("")

  return (
    
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> That You'll Enjoy Without The Hastle</h1>
        </header>

        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
      </div>
    </main>
  );
}

export default App;
