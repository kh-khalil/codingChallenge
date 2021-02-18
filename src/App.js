import React, { useEffect, useState } from 'react'
import Axios from "axios"
import ReactPaginate from "react-paginate";
import './App.css';

function App() {
    const [dateFrom30DaysAgo, setDateFrom30DaysAgo] = useState("");
    const [Repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [apiPageNumber, setApiPageNumber] = useState(1);

    const setDate = () => {
        let today = new Date(),
            date = today.getFullYear()
                + '-'
                + (today.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }))
                + '-'
                + today.getDate()
            ;
        setDateFrom30DaysAgo(date);
    }

    useEffect(() => {
        setDate();
    }, []);

    const githubRepos = () => {
        setLoading(true);
        Axios
            .get(`https://api.github.com/search/repositories?q=created:${dateFrom30DaysAgo}&sort=stars&order=desc&page=${apiPageNumber}&per_page=100`)
            .then((res) => {
                setLoading(false);
                setRepos(res.data.items);
                console.log(dateFrom30DaysAgo);
            })
            .catch(() => {
                alert("Error 402: Only the first 1000 search results are available.")
            })
    };

    const loadMoreGitHubRepos = () => {
        setApiPageNumber(apiPageNumber + 1);
        githubRepos();
    }

    const renderRepo = (repo) => {
        const ownerAvatar = repo.owner.avatar_url;
        const ownerName = repo.owner.login;
        const stars = repo.stargazers_count;
        const issues = repo.open_issues_count;
        const createdAt = repo.created_at;
        return (
            <div className="row" key={repo.id}>
                <img src={ownerAvatar} alt="Owner's Avatar" width="150" height="150" />
                <div className="repo-name">
                    <h2>
                        Owner: {ownerName} <br></br>
                        Name: <a href={repo.html_url}>{repo.name}</a>
                    </h2>
                    <p>
                        {repo.description ? repo.description : "Sorry, No Description Availabe!"}
                    </p>
                    <p>
                        <span>Stars: {stars}</span>
                        <span>Issues: {issues}</span>
                    </p>
                    <p>
                        Created: {createdAt.split('T')[0]}
                    </p>
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


    const handleSubmit = (e) => {
        e.preventDefault();
        loadMoreGitHubRepos();
    };


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
                        {loading ? "Getting Repos..." : "Get 100 Repos"}
                    </button>
                    <div>
                    </div>
                    <div className="results-container">
                        {currentPageRepos}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
