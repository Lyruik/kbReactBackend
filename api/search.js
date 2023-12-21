const express = require("express");
const { getDocsBySearchTerm } = require("../db/documents");
const searchRouter = express.Router();

searchRouter.get("/", async (req, res, next) => {
  try {
    /* 
    I want to take the query string and then manipulate it into an array of 2 strings. 

    I want 2 strings so one string can be ONLY alphanumeric characters. Example: someone searching for educam-360-c the first string would be educam360c ALWAYS.

    The second string I want to take any sort of hyphen or special character and create an underscore ' _ '. This underscore when it is used in SQL 
    counts as a single character wildcard, as opposed to the % modulus character that is ANY wildcard of ANY amount of characters between. 
    
    Let's start with defining the search query string and making an empty array
    */
    let str = req.query.name.toLowerCase();
    let arr = [];
    /* 
    Going to put it as lower case to start to try and avoid any complications it could make, the SQL query will match any case using iLIKE operator(?) 

    Now I want to transform this string to give me an array of two strings that look like this first string will be '%<string>%' and second string should look
    like '%<split of string>_<split of string>%' I specifically want the second one to be split once it encounters a hyphen OR transitions from alphabet to numeric
    so MS300 would be '%MS_300%' and then PTZ-C would be '%PTZ_C%'  ---- bonus points if I can get m-360-c to be '%m_360_c%'.

    We'll start on the first. We will want to try and split it based on numbers and hyphens/characters
    */
    let splitty = str.split(/([-_\s])/);
    console.log(splitty, str);
    /* 
    I can get it to split any hyphens or underscores, but this doesn't split off numbers. I still want to be able to take ms300 and get ms_300. I am starting
    to think there is a much better way to get this, but struggling to find answers. I do have an idea of what would WORK, and for now we'll have to make due with it
    */
    for (let key in splitty) {
      // let's remove all indexes that have a hyphen or underscore
      if (splitty[key] == "-" || splitty[key] == "_" || splitty[key] == " ") {
        splitty.splice(key, 1);
      }
      // now let's split all numbers from alphabet characters
      if (splitty[key].split(/(\d+)/).length > 1) {
        let subSplitty = splitty[key].split(/(\d+)/);
        // splitting leaves some indexes that are empty strings, so let's remove those
        for (let subKey in subSplitty) {
          if (subSplitty[subKey] == "") {
            subSplitty.splice(subKey, 1);
          }
        }
        // now we will add our index(es) back in
        splitty.splice(key, 1, ...subSplitty);
      }
    }
    // we'll push two elements to the arr array one that equals '%<string>%' and one that is '%<string>_<second part of string>%'
    // there is room for improvement, mostly niche cases of something like PTZ-B vs PTZB where there is no number to split the second one
    arr.push(`%${splitty.join("")}%`);
    arr.push(`%${splitty.join("_")}%`);
    const response = await getDocsBySearchTerm(arr);
    res.send(response);
  } catch (error) {}
});

module.exports = searchRouter;
