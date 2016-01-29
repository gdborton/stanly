# Stanly

Stanly is a cross platform sprite editing desktop application.  Currently being designed to suit my needs for a mobile game that I'm developing.

![example](/lib/example.png)

## Usage

App isn't in a usable state outside of the development environment.  That being said, `npm install -g electron-prebuilt`, `npm install`, then `electron .` will bring up the editor.  Any image files that are in the root directory at the time will be added to the file menu.

Each file can be moved independently in x/y coordinates and up and down layers.  Multiple animations can be added, and multiple frames can be added to each animation.  This allows for different animations for the same set of files.  The example wolf for instance could have a `dance` and `idle` animation.

## Testing

Running the tests can be done with `npm test`
