import React, { useState } from 'react'
import Axios from "axios"
import ReactPaginate from "react-paginate";
import './App.css';

function App() {
  const [todayDate, setTodayDate] = useState("");
  const [Repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    githubRepos();
  };

  const setDate = () => {
    let today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setTodayDate(date);
  }


  const githubRepos = () => {
    setDate();
    setLoading(true);
    Axios
      .get(`https://api.github.com/search/repositories?q=created:${todayDate}&sort=stars&order=desc&page=1`)
      .then((res) => {
        setLoading(false);
        setRepos(res.data.items);
      })
  };

  const renderRepo = (repo) => {
    const ownerAvatar = repo.owner.avatar_url;
    const stars = repo.stargazers_count;
    const issues = repo.open_issues_count;
    const lastUpdate = repo.updated_at;
    return (
      <div className="row" key={repo.id}>

        <img src={ownerAvatar} alt="Owner's Avatar" width="150" height="150" />
        <div className="repo-name">
          <h2>
            <a href={repo.html_url}>{repo.name}</a>
          </h2>
          <p>{repo.description}</p>
          <p><span>Stars: {stars}</span> <span>Issues: {issues}</span> Last Updated: {lastUpdate}</p>
        </div>
      </div>
    );
  };


  // Pagination
  const PER_PAGE = 10; //no. of items/page
  const offset = currentPage * PER_PAGE;
  const currentPageRepos = Repos
    .slice(offset, offset + PER_PAGE)
    .map(renderRepo);
  const pageCount = Math.ceil(Repos.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  //end of pagination



  return (
    <div className="page">
      <div className="landing-page-container">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        <div>
          <button onClick={handleSubmit}>
            {loading ? "Getting Repos..." : "Get Repos"}
          </button>
          <div className="results-container">
            {currentPageRepos}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
