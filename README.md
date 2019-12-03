# tapsearch
TapChief assignment. Deployed here: https://tapsearch22.herokuapp.com

TapSearch is a simple webapp which creates a word-paragraph index and then allows users to search paragraphs containing a specific word.

The landing page has 2 links to pages called **Index**, **Search** and a **Clear** button.

The 2 pages are designed to consume the 3 API endpoints which were asked to be implemented in the assignment and are avalable at
(/api/index/, /api/search/)

The Clear button accesses the /api/clear/ endpoint.

The Index Page allows users to input text and add the paragraphs to the index.

The Search Page allows users to input a word and search top 10 paragraphs containing the word.

The Clear button allows users to clear the whole index (including all words and paragraphs)
