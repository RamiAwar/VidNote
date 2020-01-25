# VidNote
A video annotation cross-platform application. Annotations can be audio, text, or even video annotations. Work in progress.

![Welcome Window](https://github.com/RamiAwar/VidNote/blob/master/docs/screenshots/vidnote0.5-01.JPG)

![Annotation Window](https://github.com/RamiAwar/VidNote/blob/master/docs/screenshots/vidnote0.5-02.jpg)


## How it works
First, you import a video by choosing a file. After confirming the video choice, a new window appears, enclosing a video player with volume and seeking features, and basic controls. On the right, you have the annotations list. To add a new annotation at a specific frame of the video, press the add annotation button when the video is at that specific moment. You can do that while the video is playing or paused for more accuracy. When a new annotation is added, a `.anot` file gets created in the same directory as the video that was imported, allowing for importing these annotations again in the future. A thumbnail of the frame is also saved in the `.anot` file, along with other needed metadata. To view the annotations at a later time, simply load the video back into the application and the `.anot` file will automatically be imported if it exists in the same directory. 

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
After installing all the required npm packages using `npm install`, the app can be run using `npm start` from the home directory (VidNote/). If you encounter any errors that you couldn't solve yourself, contact me at rami.awar.ra@gmail.com. I most probably encountered the same errors at some point and might be able to help since I've tested the project and the installation process on multiple windows, linux, and osx machines.



