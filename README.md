# KeepKey
Password management application created for ICS 427 [ScuffedGang/KeeyKey](https://github.com/ScuffedGang/KeepKey)

### Project Board
[KeepKey's Project Board](https://github.com/ScuffedGang/KeepKey/projects/1)

#### What is Keep Key?
See [wiki](https://github.com/ScuffedGang/KeepKey/wiki)

### Developers
Bailey Borengasser (baileykb)

Michael Johnson (mj66)

Kevin Nguyen (nk279)

Nathan Zenger (nzenger)

#### Closing Thoughts


#### Developer Guide
This section provides information of interest to Meteor developers wishing to use this code base as a basis for their own development tasks.

##### Installation

First, [install Meteor](https://www.meteor.com/install).

Second, visit the [KeepKey Application Repo](https://github.com/ScuffedGang/KeepKey), and fork the repo or download the ZIP file.

Third, cd into the KeepKey/app directory and install libraries with:

```
meteor npm install
```

Fourth, run the system with:

```
meteor npm run start
```

If all goes well, the application will appear at [http://localhost:3000](http://localhost:3000).

##### Application Design

KeepKey is based upon [meteor-application-template-react](https://ics-software-engineering.github.io/meteor-application-template-react/) and [meteor-example-form-react](https://ics-software-engineering.github.io/meteor-example-form-react/). Please use the videos and documentation at those sites to better acquaint yourself with the basic application design and form processing in KeepKey.

#### Initialization

The [config](https://github.com/ScuffedGang/KeepKey/tree/main/config) directory is intended to hold settings files.  The repository contains one file: [config/settings.development.json](https://github.com/ScuffedGang/KeepKey/blob/main/config/settings.development.json).

This file contains default definitions for Profiles.

#### Quality Assurance

##### ESLint
KeepKey includes a [.eslintrc](https://github.com/ScuffedGang/KeepKey/blob/master/app/.eslintrc) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
meteor npm run lint
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as IntelliJ).
