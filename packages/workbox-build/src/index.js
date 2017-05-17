// This will be the logic that powers both module and CLI
const generateSW = require('./lib/generate-sw');
const getFileManifestEntries = require('./lib/get-file-manifest-entries');
const generateFileManifest = require('./lib/generate-file-manifest');
const injectManifest = require('./lib/inject-manifest');

/**
 * # workbox-build
 *
 * A module that integrates into your build process, helping you generate a
 * manifest of local files that [`workbox-sw`](../workbox-sw) should precache.
 * It can also scaffold a full service worker implementation for you.
 *
 * While you can use this module directly, there are both
 * [command-line](/how_tos/sw-cli) and
 * [Webpack](https://www.npmjs.com/package/workbox-webpack-plugin)
 * wrappers.
 *
 * **Install:** `npm install --save-dev workbox-build`
 *
 * This module will use glob patterns to find assets in a given directory
 * and use the resulting URL and hash data for one of the follow uses:
 *
 * 1. Generate a complete service worker with precaching and some basic
 * configurable options. See
 * [generateSW()]{@link module:workbox-build.generateSW}.
 * 1. Inject a manifest into an existing service worker. This allows you
 * to control your own service worker while still taking advantage of
 * [workboxSW.precache()]{@link module:workbox-sw.WorkboxSW#precache} logic.
 * See [injectManifest()]{@link module:workbox-build.injectManifest}.
 * 1. Generate a manifest file. This is useful if you want to read in the
 * urls and revision details via an import script or ES2015 module import.
 * See [generateFileManifest()]{@link
 *  module:workbox-build.generateFileManifest}.
 * 1. Get a JS object of the manifest details. Can be used in a build process
 * if you want to inject the manifest into a file or template yourself.
 * See [getFileManifestEntries()]{@link
 *  module:workbox-build.getFileManifestEntries}.
 *
 * @example <caption>Generate a complete service worker that will precache
 * the discovered assets.</caption>
 * const swBuild = require('workbox-build');
 *
 * swBuild.generateSW({
 *   globDirectory: './build/',
 *   staticFileGlobs: ['**\/*.{html,js,css}'],
 *   globIgnores: ['service-worker.js','admin.html'],
 *   swDest: './build/sw.js',
 *   templatedUrls: {
 *     '/shell': ['shell.hbs', 'main.css', 'shell.css'],
 *   },
 * })
 * .then(() => {
 *   console.log('Service worker generated.');
 * });
 *
 * @example <caption>Generate a file containing the assets to precache.
 * </caption>
 * const swBuild = require('workbox-build');
 *
 * swBuild.generateFileManifest({
 *   globDirectory: './build/',
 *   staticFileGlobs: ['**\/*.{html,js,css}'],
 *   globIgnores: ['service-worker.js','admin.html'],
 *   mainfestDest: './build/scripts/manifest.js',
 *   templatedUrls: {
 *     '/shell': ['shell.hbs', 'main.css', 'shell.css'],
 *   },
 * })
 * .then(() => {
 *   console.log('Build file has been created.');
 * });
 *
 * @example <caption>Get an Array of files with revision details.</caption>
 * const swBuild = require('workbox-build');
 *
 * swBuild.getFileManifestEntries({
 *   globDirectory: './build/',
 *   staticFileGlobs: ['**\/*.{html,js,css}'],
 *   globIgnores: ['service-worker.js','admin.html'],
 *   templatedUrls: {
 *     '/shell': ['shell.hbs', 'main.css', 'shell.css'],
 *   },
 * })
 * .then((fileDetails) => {
 *   // An array of file details include a `url` and `revision` parameter.
 * });
 *
 * @module workbox-build
 */

module.exports = {
  generateSW,
  generateFileManifest,
  getFileManifestEntries,
  injectManifest,
};