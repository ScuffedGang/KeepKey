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


### Developer Guide
This section provides information of interest to Meteor developers wishing to use this code base as a basis for their own development tasks.

#### Installation

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

#### Application Design

KeepKey is based upon [meteor-application-template-react](https://ics-software-engineering.github.io/meteor-application-template-react/) and [meteor-example-form-react](https://ics-software-engineering.github.io/meteor-example-form-react/). Please use the videos and documentation at those sites to better acquaint yourself with the basic application design and form processing in KeepKey.

### Initialization

The [config](https://github.com/ScuffedGang/KeepKey/tree/main/config) directory is intended to hold settings files.  The repository contains one file: [config/settings.development.json](https://github.com/ScuffedGang/KeepKey/blob/main/config/settings.development.json).

This file contains default definitions for Profiles.

### Quality Assurance

#### ESLint
KeepKey includes a [.eslintrc](https://github.com/ScuffedGang/KeepKey/blob/master/app/.eslintrc) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
meteor npm run lint
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as IntelliJ).

### Closing Thoughts
Challenges we faced during the development were UI design (none of us are really strong in that) and making sure our code was designed in a way where it could not be attacked. For most of us, it was our first time having to strongly think about how our code is in terms of security. We all strongly considered the prevention of an injection attack since our application is going to be dealing with a lot of personal information. We are proud to say that after our testing, it is strong against preventing most of those attacks. For all of us, we have learned a lot through this software development lifecycle (SDL). Although this is just a small scale team working on a small application, it has taught us a lot that goes behind the scenes of making the application and being sure all developers are adhering to the standards set. Overall, we are proud of our application, however, we still have a lot we would like to improve on. Starting off, we were unable to resolve an HTTP header issue that was discovered during our dynamic analysis check due to the time constraint. This is a medium risk issue defined by OWASP Zap and for any future development, we wish to resolve it to ensure better security on our application. Another thing we wish to redo is our design choice for the UI. Currently, it feels really simple and is not the most attractive key manager out there. If we had more time, and the resources to hire a design expert, we would like to redo it so that it is more attractive and users are more willing to use it. 

### Releases
* [v1.0.0 Initial Production Ready Release](https://github.com/ScuffedGang/KeepKey/releases/tag/v1.0.0)
