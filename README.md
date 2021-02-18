# Front-end Coding Challenge

## About The Project
* This task is to implement a small webapp that shows in a descending order the most starred repos on GitHub in the past 30 days from when you're running it.
* JSON data was fetched directely from GitHub API as shown below in Details

## Details:
- Repos are shown 10 rows per page and after page #10 you should press on ***Get 100 Repos*** button to get the next page in Github API.

- Due to API regulations, only 1000 results can be shown, if you press on ***Get 100 Repos*** button 10 times, you will be alerted with this error.

- The project is optimised to run on ***laptop/mobile*** screen (tested and modified on iPhone X )

- Styling can be handled differently but due to lack of time , I decided to modify the features and made sure that is working properly 

- Each row consists of:
   * [x] Repository name
   * [x] Repository description 
   * [x] Number of stars for the repo. 
   * [x] Number of issues for the repo.
   * [x] Username and avatar of the owner. 

- GitHub Api:
>`https://api.github.com/search/repositories?q=created:${todayDate}&sort=stars&order=desc&page=${pageNumber}`

- Where ***todayDate & pageNumber*** are 2 variables that change according to date and page number 

## Technologies used: 
   * React
   * HTML5
   * CSS3

### To start:
* clone the repo to your local PC
* run `npm install`
* then `npm start`