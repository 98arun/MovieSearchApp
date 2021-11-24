import { useState } from "react";
import { GetRequest } from "../../Utilites/Network";
import MovieCard from "./Views/MovieCard";
import Pagination from "./Views/Pagination";

function MoviesSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [totalResults, setTotalResults] = useState("");
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState(true);

  const _handleOnInputChange = (data: any) => {
    setSearchInput(data.target.value);
  };

  const _handleSearchProfile = async () => {
    if (!searchInput || searchInput.length == 0) {
      alert("Enter Something");
    }
    const profileResponse = await GetRequest(
      `https://www.omdbapi.com/?s=${searchInput}&apikey=92c6a658`
    );
    console.log(profileResponse);
    if (!profileResponse) {
      alert("You Entered Wrong Input");
      setSearchInput("");
      setMovieList([]);
      setTotalResults("");

      return;
    }
    const { Search, totalResults, Response } = profileResponse;

    setMovieList(Search);
    setTotalResults(totalResults);
    setResponse(Response);
  };

  const _renderMovieList = () => {
    if (!movieList || movieList.length === 0) {
      return null;
    }
    return movieList.map((data: any) => {
      let { Title, Poster, imdbID } = data;
      if (Poster === "N/A") {
        Poster =
          "https://www.dccomics.com/sites/default/files/field/image/BatmanSupermanAnimated_blog_60a477f64d7f53.55428911.jpg";
        return;
      }

      return <MovieCard key={imdbID} uname={Title} image={Poster} />;
    });
  };

  const _handelPaginationClick = async (pageNumber: any) => {
    setCurrentPage(pageNumber);

    const profileResponsePerPage = await GetRequest(
      `https://www.omdbapi.com/?s=${searchInput}&apikey=92c6a658&page=${pageNumber}`
    );
    setMovieList(profileResponsePerPage.Search);
  };

  return (
    <>
      <h1 className="container-title">Movies List </h1>
      <div className="input-wrap">
        <input
          className="input-text"
          type="text"
          style={{ width: "500px", border: "2px solid black" }}
          placeholder="Enter Movie Name"
          value={searchInput}
          onChange={_handleOnInputChange}
        />
        <button
          className="input-btn"
          type="button"
          disabled={!searchInput || searchInput.length == 0}
          onClick={_handleSearchProfile}
        >
          Search
        </button>
      </div>
      <div className="cards">{_renderMovieList()}</div>
      <Pagination
        postPerPage={postsPerPage}
        totalPosts={totalResults}
        paginate={_handelPaginationClick}
        currentPage={currentPage}
      />
    </>
  );
}

export default MoviesSearch;
