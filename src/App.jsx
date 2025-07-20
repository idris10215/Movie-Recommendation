import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY ;

const API_OPTIONS = {
  method:"GET",
  headers:{
    Accept:"appplication.json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async (params) => {

    setisLoading(true);
    seterrorMessage("");

    try {

      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  
      const respone = await fetch(endpoint, API_OPTIONS);

      if(!respone.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await respone.json();
      console.log(data);

      if (data.Response === "False") {
        seterrorMessage(data.Error || "Failed to fetch movies");
        setmovieList([]);
        return;
      }

      setmovieList(data.results || [])

    } catch (error) {
      console.error(`Error fetching movies! ${error}`)
      seterrorMessage("Error fetching MOvies. Please try again later");
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  },[])

  return (
    
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> That You'll Enjoy Without The Hastle</h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        <section  className="all-movies">
          <h1 className="mt-[2rem]"> All Movies</h1>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-400">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

          
        </section>

        
      </div>
    </main>
  );
}

export default App;
