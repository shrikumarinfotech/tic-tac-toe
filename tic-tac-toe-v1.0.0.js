/**
 * Name: Tic Tac Toe
 * Description: Play Tic Tac Toe game made in JavaScript
 * Version: 1.0.0
 * Author: Shrikumar Infotech
 * License: GPLv2.0 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

'use strict';

// Initiate Tic Tac Toe function
const ticTacToe = function(){
    /**
     * Blocks to click
     */
    // Define each blocks
    const block1 = document.getElementById('block-1');
    const block2 = document.getElementById('block-2');
    const block3 = document.getElementById('block-3');
    const block4 = document.getElementById('block-4');
    const block5 = document.getElementById('block-5');
    const block6 = document.getElementById('block-6');
    const block7 = document.getElementById('block-7');
    const block8 = document.getElementById('block-8');
    const block9 = document.getElementById('block-9');

    // Define ttt-block : all
    const tttBlocks = Array.from(document.getElementsByClassName('ttt-block'));
    // console.log(tttBlocks);

    /**
     * Sets
     */
    // Define possible sets
    const set1 = [1, 2, 3];
    const set2 = [1, 4, 7];
    const set3 = [1, 5, 9];
    const set4 = [2, 5, 8];
    const set5 = [3, 5, 7];
    const set6 = [3, 6, 9];
    const set7 = [4, 5, 6];
    const set8 = [7, 8, 9];
    const sets = [set1, set2, set3, set4, set5, set6, set7, set8];
    const setsName = ['set1', 'set2', 'set3', 'set4', 'set5', 'set6', 'set7', 'set8'];
    // console.log(sets);

    /**
     * Scores
     */
    // Define scores
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let resultMessage = '';
    let winningSet = '';
    // Define the HTML elements to display scores
    const displayP1 = document.getElementById('ttt-human').querySelector('.ttt-player-score');
    const displayP2 = document.getElementById('ttt-computer').querySelector('.ttt-player-score');
    const displayMessage = document.getElementById('ttt-message');
    const resetButton = document.getElementById('ttt-reset-button');

    /**
     * Cross Lines
    */
    const crossLineWrapper = document.querySelector('.ttt-crossline-wrapper');
    const lineSet1 = document.getElementById('cross-line-1');
    const lineSet2 = document.getElementById('cross-line-2');
    const lineSet3 = document.getElementById('cross-line-3');
    const lineSet4 = document.getElementById('cross-line-4');
    const lineSet5 = document.getElementById('cross-line-5');
    const lineSet6 = document.getElementById('cross-line-6');
    const lineSet7 = document.getElementById('cross-line-7');
    const lineSet8 = document.getElementById('cross-line-8');
    
    /**
     * Functions
     */
    // Define Click function for each block
    function clickBlock(){
        tttBlocks.forEach(element => {
            element.onclick = function(){
                if(element.getAttribute('marked') === 'false'){
                    // Set the available attribute to false
                    element.setAttribute('marked', 'crossed');

                    // Insert the X symbol
                    element.querySelector('.ttt-symbol').innerHTML = 'X';

                    // rest data
                    resetData();

                    // Call find matched sets funtion
                    findMatchedSets();

                    // console.log(element.getElementsByClassName('ttt-symbol'));
                }
            }
        });
    };
    clickBlock();

    // Define function for check matched sets
        // block clicked ? attribute available="false" i.e 1
        // check all sets with 1
        // save the sets
    // define the crossed array
    let allCrossedItems = [];
    // define the matched sets array
    let matchedSets = [];
    function findMatchedSets(){
        // Get all the blocks that has marked="crossed"
        // get all blocks in an array
        let allBlockItems = Array.from(document.getElementsByClassName('ttt-block'));
        // find the crossed blocks and get the id (starts with 0, so +1 to count from 1)
        allBlockItems.forEach(function(element, index){
            if(element.getAttribute('marked') === 'crossed'){
                allCrossedItems.push(index + 1);
            }
        });

        // find the matched sets and store them
        // let matchedSets = [];
        // loop through each sets
        for(let i = 0; i <= 7; i++){
            sets[i].forEach(element => {
                for(let j = 0; j < 3; j++){
                    if(allCrossedItems[j] === element){
                        matchedSets.push(setsName[i]);
                    }
                }
            });
        }

        // Sort unique values only for matchedSets
        removeDuplicationInMatchedSets(matchedSets);

        // Call the tttAi function
        tttAi(matchedSets, allCrossedItems);

        // Test log
        // console.log(allCrossedItems); // which block is crossed
        // console.log(matchedSets); // sets that has that box value

    };

    // Define function for possible O box to apply(closest, break the chain or random box)
        // get the sets from previous function
        // find if there is a match to occur
        // if no, then chose a random one
        // if yes, choose the block where you can break the chain
        // find if there is a match to occur
        // if no, then choose the one that can make a match(choose a set and use any available number block)
    // Define the result set
    let theResultSet = [];
    // Define the function to get the result set
    function tttAi(array, blocks){
        // get the matchedSets
        let theSetsArray = array;
        // get the crossed blocks
        let theCrossArray = blocks;

        // test logs
        // console.log(theSetsArray);
        console.log(theCrossArray);

        // define array for possible O block
        let potentialOBlocks = [];

        // define set/s that has 2 occupied blocks
        let aboutToCrossed = [];

        // define O block array
        let oBlockArray = [];
        // define O block:Optional
        let oBlock = 0;

        // find the potential O blocks
        tttBlocks.forEach(function(element, index) {
            if(element.getAttribute('marked') === 'false'){
                potentialOBlocks.push(index + 1);
                // test log
                // console.log(index +1);
            }
        });
        
        // Select oBox from potentialOBlocks
            // check for sets that have 2 occupied bloks(if any)
            // find the blank blocks from them
            // select a random one

            // else select a random one from all blank blocks
        function setsToBeCrossed(array){
            // define a index value
            let findIndex = 0;

            // iterate through each set
            array.forEach(function(element, index){
                // define a counter
                let countBlocks = 0;
                
                // console.log(element);
                // interate through each sub-set and find a match
                element.forEach(element2 => {
                    theCrossArray.forEach(element3 => {
                        if(element3 === element2){
                            countBlocks++;
                            // console.log(element3);
                        }
                    });
                });

                // check if count reached 2 for any set/s
                if(countBlocks === 2){
                    // save the index value
                    findIndex = index;
                    // save potential matches
                    aboutToCrossed.push(setsName[index]);
                    // console.log('Index is: ' + findIndex);
                }

                // reset counter
                countBlocks = 0;
            });

            // test log
            console.log(aboutToCrossed); // returns set name: "set1"
        }
        setsToBeCrossed(sets);

        // Define function to find the oblock
        function findOBlocks(setsArr, emptyBlockArr){
            // check if any block is available from sets
            setsArr.forEach(element => {
                // set1: 
                if(element === 'set1'){
                    set1.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                // console.log(element3);
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set2:
                if(element === 'set2'){
                    set2.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set3:
                if(element === 'set3'){
                    set3.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set4:
                if(element === 'set4'){
                    set4.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set5:
                if(element === 'set5'){
                    set5.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set6:
                if(element === 'set6'){
                    set6.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set7:
                if(element === 'set7'){
                    set7.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
                // set8:
                if(element === 'set8'){
                    set8.forEach(element2 => {
                        emptyBlockArr.forEach(element3 => {
                            if(element3 === element2){
                                oBlockArray.push(element3);
                            }
                        });
                    });
                }
            });
        }
        findOBlocks(aboutToCrossed, potentialOBlocks);

        // test log oblock array
        console.log(oBlockArray);

        // Define function to mark the O
        function markTheO(arr1, arr2){
            // Define the number of block to circled
            let theBlockToCircled = 0;
            // get the block number
            // console.log(arr1);
            // console.log(arr2);
            if(arr1.length != 0){
                theBlockToCircled = arr1[Math.floor(Math.random() * Math.floor(arr1.length))];
                // console.log(theBlockToCircled);
            }
            else{
                theBlockToCircled = arr2[Math.floor(Math.random() * Math.floor(arr2.length))];
                // console.log(Math.floor(Math.random() * Math.floor(arr2.length)));
                // console.log(theBlockToCircled);
            }

            // Check if result occurs then only run code below
                // else stop here: return
                checkResult(setsName);

            // Insert O into proper block
            tttBlocks.forEach(element => {

                // Check if user won, then only apply O
                // else display result
                if(resultMessage === ''){
                    // find the block with id
                    if(element.getAttribute('id') === `block-${theBlockToCircled}`){
                        if(element.getAttribute('marked') === 'false'){
                            // Set the available attribute to false
                            element.setAttribute('marked', 'circled');
                            // Insert the X symbol
                            element.querySelector('.ttt-symbol').innerHTML = 'O';
                        }
                    }
                }
            });
        }
        markTheO(oBlockArray, potentialOBlocks);

        console.log('potential O blocks: ' + potentialOBlocks);

    }


    // Define function for check for result and display cross-line
        // check if a match occurs
        // save the result
        // check if draw
        // save the result
    // Define function to check result: setsName, theCrossArray
    function checkResult(array){
        array.forEach(element => {
            // set1:
            if(element === 'set1'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set1
                set1.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });

                    
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set1';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set1';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set2:
            else if(element === 'set2'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set2
                set2.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });


                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set2';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set2';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set3:
            else if(element === 'set3'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set3
                set3.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });

                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set3';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set3';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set4:
            else if(element === 'set4'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set4
                set4.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set4';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set4';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set5:
            else if(element === 'set5'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set5
                set5.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set5';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set5';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set6:
            else if(element === 'set6'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set6
                set6.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set6';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set6';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set7:
            else if(element === 'set7'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set7
                set7.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set7';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set7';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }
            // set8:
            else if(element === 'set8'){
                let counterX = 0;
                let counterO = 0;
                // check for block "marked" state in set8
                set8.forEach(element2 => {
                    tttBlocks.forEach(block => {
                        if(block.getAttribute('id') === `block-${element2}`){
                            if(block.getAttribute('marked') === 'crossed'){
                                counterX++;
                            }
                            else if(block.getAttribute('marked') === 'circled'){
                                counterO++;
                            }
                        }
                    });
                });
                // check for result
                if(counterX === 3){
                    scorePlayer1++;
                    resultMessage = 'You Win';
                    winningSet = 'set8';
                    return;
                }
                else if(counterO === 3){
                    scorePlayer2++;
                    resultMessage = 'Computer Won';
                    winningSet = 'set8';
                    return;
                }

                // console.log(counterX);
                // console.log(counterO);
            }

        });

        // Run display results
        displayScores(scorePlayer1, scorePlayer2, resultMessage);

    }
    // checkResult(setsName); // TOBEDONE

    // Define function for display scores
        // get the scores from saved data
        // display on html element pre-defined
    function displayScores(scorePlayer1, scorePlayer2, resultMessage){
        // display scores
        displayP1.innerHTML = scorePlayer1;
        displayP2.innerHTML = scorePlayer2;

        console.log(winningSet);

        // display message
        displayMessage.innerHTML = resultMessage;

        // display only on result
        if(resultMessage !== ''){
            // display reset button
            resetButton.setAttribute('style', 'display: block;');

            // display lines
            crossLineWrapper.setAttribute('style', 'display: block;');
            // check for line to display according to set name
            if(winningSet === 'set1'){
                lineSet1.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set2'){
                lineSet2.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set3'){
                lineSet3.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set4'){
                lineSet4.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set5'){
                lineSet5.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set6'){
                lineSet6.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set7'){
                lineSet7.setAttribute('style', 'display: block;');
            }
            else if(winningSet === 'set8'){
                lineSet8.setAttribute('style', 'display: block;');
            }
        }
    }

    // Define function to remove duplication in matchedSets array
    function removeDuplicationInMatchedSets(array){
        let arrayBuffer = [];
        // let arrLength = array.length;
        array.forEach(function(element, index){
            if(element !== array[index + 1]){
                arrayBuffer.push(element);
            }
        });

        // copy data from arrayBuffer to matchedSets
        matchedSets = arrayBuffer;
        // reset arrayBuffer
        arrayBuffer = [];

        // return matchedSets; // optional for test
    }


    // Define function to reset the variables
    function resetData(){
        // reset all crossed items
        allCrossedItems = [];
        // rest all matched sets
        matchedSets = [];
    }

    // Define function to reset the board
    function resetBoard(){
        // rest the board
        
    }

};

ticTacToe();