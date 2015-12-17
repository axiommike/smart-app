# Smart-app

Smart App is a client-facing, interactive mortgage application.  Applicants can submit their personal, qualifying information to mortgage brokers (axiom agents).  Data is stored **offline**, on the client's browser via 
localStorage.  The application can be resumed at any time, and applicants can complete the application in any order 
they choose.  Once the application is submitted, it is saved under the agent's account, whereupon the agent can 
follow up with the applicant.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

## Styles

This project uses [stylus](http://stylus-lang.com/) CSS preprocessor for styles.  Styles are automatically compiled with ``ember-cli-stylus``; in addition, this project uses [kouto swiss](http://kouto-swiss.io/) for automated browser support.

## Browser Support

Currently, the project only supports IE9 and above; however, if IE8 support is needed, a polyfill can be added.  Since this project is not Ember 2.0 or higher, IE8 support is still available.

### Running Tests

Testing is limited for this project, but some unit tests can be found.  Fully tested components include:

* ``phone-number``

To run tests:

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment=production` (production)

### Deploying

We currently have a *staging* and *production* environments:

| Development               	| Production 	|
|---------------------------	|------------	|
| [http://next-smart-app.myaxiom.ca](http://next-smart-app.myaxiom.ca) 	| [https://secure-mortgage-online.ca](https://secure-mortgage-online-ca]|

> Note that only production environments use ``https://``, and are secured.

Files may be deployed to our production server via FTP at myaxiom.ca (host) to the path 
``/var/www/environments/production/intranet/apps/smartapp`` and development ``/var/www/environments/nextapp``.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
