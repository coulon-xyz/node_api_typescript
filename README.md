# node_api_typescript

## Summary
This API seek a collection of pictures on Unsplash API, and then filter them on "present assets on the picture" by using Google Vision API

As this is a beta version, the number of pictures fetched from unsplash is hardcoded (10), and pagination is not implemented.

Example: Search a list of pictures with the theme City, and only get the ones that contains a car with a certitude of 80%.

## Installation

node_api_typescript requires node.js to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/julienjcoulon/node_api_typescript.git
$ cd node_api_typescript
$ npm install
```
Now, you need to create a .env file at the root of the project to specify your 'api keys' for Unsplash and Google Vision.

```sh
$ touch .env
```

Open the file with your favorite editor (or vi), fill it with your keys and save it. Here is the nomenclature you should use (the keys in the example below are fake, of course):
```sh
UNSPLASH_API_KEY=c9923370c21dc55cb9dd11a54c64d9a33e12cf594f0c8430bc09836b4fe46e26
GOOGLE_VISION_API_KEY=AIzaSyCzd5_h3rA-5zjwt4JFOU3vpoG9Zfp-QMd
```

and now, compile and start your server:

```sh
$ gulp scripts
$ npm start

```

You can test the installation with a regular browser:

```sh
localhost:3000/collection/seek?theme=sahara&filter=dune,sand
```