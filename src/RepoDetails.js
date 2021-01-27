import React from 'react'

export const RepoDetails = ({details, loading}) => {
   loading ?
   <h1 className="loader">Loading...</h1>
   :
   <div className="repo-details-container">
      <div className="details-row">
         <label className="label">Name:</label>
         <span className="value">{details.name}</span>
      </div>
      <div className="details-row">
         <label className="label">Forks Count:</label>
         <span className="value">{details.forks}</span>
      </div>
      <div className="details-row">
         <label className="label">Language:</label>
         <span className="value">{details.language}</span>
      </div>
      <div className="details-row">
         <label className="label">Stars:</label>
         <span className="value">{details.stargazers_count}</span>
      </div>
   </div>
}

