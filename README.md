# viaplay-trailers

Tech assignment for the recruitment process at NENT (Viaplay)

This app is built with ExpressJS and exposes a single GET endpoint under /trailer that requires a query param movieURI pointing to a movie resource at the Viaplay content api.
The response will contain the requested URI as well as a trailer object containing a link to a youtube hosted movie trailer if found.

The app contains a suite of unit tests displaying a couple of techniques useful when testing different types of middlewares or plain functions, as well as an example of integration tests of the whole app with mocked external dependencies using a separate node app.

To illustrate some more advanced options with regards to scaling the app also contains a simple in-memory cache using the NodeCache package. In a real world application the cache should be performed outside of the app however. The same is true for the included rate limiter implementation.

The project is built under linux and should work on all other platforms, WSL might be required on Windows (untested).

# Getting started

- npm i
- npm test
- npm start

## debugging

- npm start:debug
- then attach debugger (i.e. chrome node debugger)

# Scope limitations and future work

Current architecture groups files and modules on a per sub-api level. Once more endpoints are added or separate resource API's are needed the service layer modules should be refactored and/or moved.

Error handling and logging is kept at a minimum in this version and any unhandled error will fallback to ExpressJS default error handling middleware. An early next step would be to introduce desired logging framework and overriding the default error handling with your own.

Security: there's no steps to secure this API apart from a simple rate limiter on the single resource. A production ready verison of this app would improve the restriction on the hosts passed in the movieURI parameter, set proper response headers as well as hosting the app in a suitable environment with loadbalancer for proper rate limiting and TSL termination.

Performance: this app uses an example in-memory cache using the path (with query params) as key, this cache should be replaced with a proper caching strategy in the hosting environment. A simple improvement on the existing cache is to replace the cache key strategy to only cache relevantly queried URIs instead of all possible responses the API serves. The services integrating with the two external API's also need to properly handle errors from the respective provider.

Suggested additions to the API itself would be to decide if the API should be fully HATEOAS compliant and what implementation to use. Extending the feature set of the single endpoint is also an option, returning all trailers found for a movie, allowing further parameters to request specific resolutions or even supporting different hosting sources.
