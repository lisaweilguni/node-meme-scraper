import axios from 'axios';
import * as cheerio from 'cheerio';
import { load } from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

// Store URL in a variable
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// Connect to URL and print it to console
const { data } = await axios.get(url);
const $ = cheerio.load(data);

// Declare empty array to store the URLs in
const imageUrlArray = [];

// Fetch the URLs and store them in the array
$('img').each(function (index, value) {
  imageUrlArray.push($(value).attr('src'));
});
// console.log(imageUrlArray);

// Get the first 10 items of the array
const firstTenImages = imageUrlArray.slice(0, 10);

// Get image data with fetch
const imgData = [];

for (let i = 0; i < firstTenImages.length; i++) {
  // Fetch image data (string) from the image URL
  const imageUrlData = await fetch(firstTenImages[i]);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer);
  imgData.push(stringifiedBuffer);

  // Create 10 files and write image data to them
  fs.writeFile(`./memes/0${i + 1}.jpg`, imgData[i], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}
