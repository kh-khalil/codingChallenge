# Front-end Coding Challenge

## About The Project
* This task is to implement a small webapp that shows in a descending order the most starred repos on GitHub in the past 30 days from when you're running it.
* JSON data was fetched directely from GitHub API as shown below in Details

## Details:
* Repos are shown 10 rows per page and after page #10 you should press on *** Get 100 Repos *** button to get the next page in Github API.

* Each row consists of:
   * Repository name
   * Repository description 
   * Number of stars for the repo. 
   * Number of issues for the repo.
   * Username and avatar of the owner. 

* GitHub Api:
   `https://api.github.com/search/repositories?q=created:${todayDate}&sort=stars&order=desc&page=${pageNumber}`
* Where *** todayDate & pageNumber *** are 2 variables that change according to date and page number 

## Technologies used: 
   * React
   * HTML5
   * CSS3

### To start:
* clone the repo to your local PC
* run `npm install`
* then `npm start`