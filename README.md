# Tweeter Project 🐦

Tweeter is a simple, single-page Twitter clone.

## Features

Users can create short posts of up to 140 characters and have them append to the main page. Posts are sequential, with the most recent posts appearing at the top of the page. Tweeter fetches a list of posts from a simplified 'server' and allows users to add posts to this list dynamically. All requests are made asynchronously using the jQuery library.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## App Views

![Desktop App Flow](https://github.com/x-saim/tweeter/blob/master/docs/Animation1_DesktopView.gif?raw=true)
![Error Flow](https://github.com/x-saim/tweeter/blob/master/docs/Animation2_Errors.gif?raw=true)
![Responsive Design](https://github.com/x-saim/tweeter/blob/master/docs/Animation3_Responsive.gif?raw=true)

## Dependencies

- Express
- Node.js 5.10.x or above
- timeago

## Contributing
1. Fork this repository.
2. Create a new branch with a descriptive name (git checkout -b new-feature).
3. Commit your changes (git commit -am 'Added some new feature').
4. Push to the branch (git push origin new-feature).
5. Create a new Pull Request.