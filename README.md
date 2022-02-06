# Emoticon Generator
Constructs all possible emoticons by abstracting them into individual components and assembling them in certain ways.

# Preface
This was a mini project slapped together as part of [https://github.com/daniel-tran/emoticon-scrabble](https://github.com/daniel-tran/emoticon-scrabble), after which it was mostly forgotten once Emoticon Scrabble had effectively been completed. After having these files sit around on my computer for a couple of years, I finally got around to publishing them onto GitHub.

The code itself is somewhat atrocious (and doesn't have unit tests), so I would expect anyone stumbling across this is coming in with a "tourist mindset" and not with the intent on using this in an actual project. Having said that, people get ideas, inspiration and even motivation from the strangest places on the Internet, so this project at least has some residual value in that regard.

# How to generate emoticons
Simply open `EmoticonGenerator.html` in an Internet browser (preferably Google Chrome, Mozilla Firefox or Microsoft Edge - all other browsers have not been tested) and emoticons are displayed in the first text area.

# Q. What are the Tile and Score distributions?
As hinted at in the preface, this project was initially created as part of [https://github.com/daniel-tran/emoticon-scrabble](https://github.com/daniel-tran/emoticon-scrabble) to help automate various parts of generating and generalising emoticons.
In particular, the C# project which this was adapted from contains various dictionary mappings to represent the tile quantities and score allocations for each letter, so instead of having to manually edit those areas by hand, a JavaScript function handles the generating of that information.

# Q. How do I generate my own custom emoticons?
To introduce your own characters, simply add them to the correct emoticon definition function in `EmoticonGenerator.js`. These would be:

- `getStandardEmoticonObject()`
- `getEasternEmoticonObject()`
- `getEmoticonExceptions()`
 
 Please read the initial blurb in the JavaScript file to understand the internal structure of these functions, and where best to place your custom characters or emoticons.