# VidNote
A video annotation cross-platform application. Annotations can be audio, text, or even video annotations. Work in progress.

## Usage Instructions

Since the project is still a work in progress, it hasn't been packaged for easy installation. Trying out the unfinished project requires building it yourself from the source files. 

#### Installing node and npm
First make sure you have node and npm (node package manager) installed. You can check this by trying to run `node -v` and `npm -v` in your cli.

If they're not installed follow the instructions on the nodejs website http://nodejs.org .

#### Cloning the repo
Then clone the VidNote repo using git-cli to your working directory:
```
git clone https://github.com/RamiAwar/VidNote
```

#### Installing release and development node packages
After that you are ready to build the project. Navigate to the project directory (VidNote/) and run `npm install` to install all the release and development node packages. This should take a couple of minutes. 

Install electron globally to make the command available globally and allow the npm start script to run.
```
npm install --global electron
```

To generate the documentation, I've used gulp to create a watcher task as well as a documentation generation task to make things as simple as possible for other developers.
To use gulp it needs to be installed globally.
```
npm install --global gulp
```
And then the documentation generator can be run using `gulp doc`.

#### Documentation
Documentation can be generated using `gulp doc`. Compiled using jsdoc3.

#### Running the app
After installing all the required npm packages, the app can be run using `npm start` from the home directory (VidNote/). If you encounter any errors that you couldn't solve yourself, contact me at rami.awar.ra@gmail.com. I most probably encountered the same errors at some point and might be able to help since I've tested the project and the installation process on multiple windows, linux, and osx machines.



