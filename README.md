# Mr. Filtch 2000

### Description:
  Similar to Roomba, Mr. Filtch 2000 cleans dirt as it shows up in an imaginary room.

### Usage:
* Clone repo: `git@github.com:aharshbe/mr_filtch_2000.git`
* Type: `cd mr_filtch_2000`
* Type: `open index.html` or go to the GitHub page online [here](https://aharshbe.github.io/mr_filtch_2000/).
* Once you have the .html file open, click the `Choose File` button. Then, select a local file with instructions for Mr. Filtch 2000. Below is an example -- there is also an example in the [project repo](https://github.com/aharshbe/mr_filtch_2000/blob/master/input.txt)
***
### The `input.txt` file:

* The `input.txt` file is the file uploaded when you first open Mr. Filtch 2000's place on the internet ([link](https://aharshbe.github.io/mr_filtch_2000/))

* Example  `input.txt` file:
```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

* Line 1 should contain the size of the imaginary room, in this case 5 5 is a room of size 5 x 5 or 25 plots of space. **Important: please don't make a room larger than 9 x 9** double digit numbers mess up the game logic
* Line 2 should contain the initial hoover position for Mr. Filtch (where he'll start his cleaning from)
* Any proceeding lines up until `n - 1` should contain plots in the room where dirt/mess should be placed for Mr. Filtch to clean -- add as many as you like
* The last line should contain instructions for Mr. Filtch to clean the dirt plots you placed. **Important, these instructions should be in the form of cardinal directions, e.g., N, S, E, W**, you can add as many instructions as you want
* Please note: You can only make as many moves as instructions are passed on the last line of the `input.txt` file or the game is over and you'll need to restart
* Use the directional pad that appears when the map appears to move. To make it easier to follow the instructions you placed in the `input.txt` file, there's a guide above the directional pad which cycles through the instructions on the last line of the `input.txt` file
* If at any point you run into trouble, there is an `Instructions` button available under the directional pad, you can also check back here for reference
***


### Completing the game:
* Once Mr. Filtch 2000 is done, e.g., all your directions have completed, or you've ignored them but moved as many times as directions you placed, the final hoover position as well as the number of dirt plots cleared will be displayed, to restart the game, refresh your browser page and choose another `input.txt` or the same if you want to try again

### Requirements:
* A modern web browser, e.g., Chrome, Safari, Internet Explorer, etc
* **You must upload a `input.txt` file that follows the proper format in the exmaple above in order for the program to work**


### Bugs/To be fixed:
* Filtch currently goes past the walls of the room, oops
* Current hoover position output is not 100% accurate, need to fix the math
* The room should not be larger than 9 x 9 because of how I did the math, double digit numbers mess it up -- I need to add a rule in the software for this, but haven't done it yet
* The logic that makes dirt plots on single axis (x or y) as 1 plot is wonky at best and needs improvement, but it works for the base case provided above
* General UI/UX improvements would be nice to have
* A better initial starting screen with instructions on how to upload a file, etc
* More verbose comments on code structure and my thought process

***

#### Contact:
* Email `aharshbe@live.com` if you have any questions!

#### Author:
* Austin Harshberger

***
*P.S. This is based on an interview challenge, details outlined [here](https://gist.github.com/alirussell/2d200d21f117f8d570667daa7acdbae5#https://gist.github.com/alirussell/2d200d21f117f8d570667daa7acdbae5).*
