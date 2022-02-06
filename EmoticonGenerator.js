/**************************************************************/
//                  File-specific terms:
// L2R = Emoticon only makes sense when read from left to right.
// R2L = Emoticon only makes sense when read from right to left.
// Reversible = Possesses the properties of both L2R and R2L
//              For an Eastern emoticon, it means the character.
//              can be used as both a left and right eye.
// Standard emoticon = :], ;P, O:, V=, etc.
// Eastern emoticon = 0.0, [-_-], dojob, X!^, etc.
//
//                  Emoticon component structure:
// Each JSON object has its own list of possible characters in a
// given category.
// When empty, there are no characters known to fit that category
// of emoticon component.
// When it contains "", the emoticon component is optional.
//
// Eastern emoticons have sides which are exclusive to them
// and have their own syntax rules, specifically the concept of "pairing"
// where depending on the character used on one side of the emoticon,
// a particular reciprocal character must be used to match it.
// A similar rule applies to the eyes of an Eastern emoticon.
/**************************************************************/

// Gets a certain component of a standard emoticon
function getStandardEmoticonObject(type){
    let componentType = type.toLowerCase().trim();
    switch(componentType) {
        case "brows": 
            return {
                Reversible: [
                    "|",
                    "",
                ],
                L2R: [
                    ">",
                    "}",
                ],
                R2L: [
                    "<",
                    "{",
                ],
            };
        case "nose":
            return {
                Reversible: [
                    "-",
                    "^",
                    "v",
                    "*",
                    " ",
                    "",
                ],
                L2R: [
                ],
                R2L: [
                ],
            };
        case "mouth":
            return {
                Reversible: [
                    "O",
                    "0",
                    "o",
                    "D",
                    "C",
                    "c",
                    "T",
                    "K",
                    "S",
                    "s",
                    "I",
                    "v",
                    "V",
                    "L",
                    "<",
                    "(",
                    ">",
                    ")",
                    "{",
                    "}",
                    "]",
                    "[",
                    "/",
                    "\\",
                    "|",
                    "*",
                ],
                L2R: [
                    "P",
                    "p",
                    "F",
                    "J",
                    "B",
                    "b",
                    "3",
                ],
                R2L: [
                    "d",
                    "q",
                ],
            };
        case "eyes":
            return {
                Reversible: [
                    ":",
                    "=",
                    "X",
                    "8",
                ],
                L2R: [
                    ";",
                    "B",
                ],
                R2L: [
                ],
            };
        default: return {};
    }
}

// Gets a certain component of an Eastern emoticon
function getEasternEmoticonObject(type){
    let componentType = type.toLowerCase().trim();
    switch(componentType) {
        case "sides": 
            // Sides require a particular set of characters and cannot be mixed with each other
            return {
                Reversible: [],
                Left: [],
                Right: [],
                Paired: [
                    {
                        Left: "(",
                        Right: ")"
                    },
                    {
                        Left: "[",
                        Right: "]"
                    },
                    {
                        Left: "{",
                        Right: "}"
                    },
                    {
                        Left: "d",
                        Right: "b"
                    },
                    {
                        Left: "",
                        Right: ""
                    },
                ]
            };
        case "eyes": 
            return {
                Reversible: [
                    "+",
                    "-",
                    "^",
                    "'",
                    "T",
                    "O",
                    "o",
                    "0",
                    ".",
                    "X",
                    "*",
                    "@",
                    "~",
                    ";",
                    "=",
                    "u",
                    "q",
                    "p",
                ],
                Left: [
                    ">",
                ],
                Right: [
                    "<",
                ],
                // These eyes must be exclusively paired together
                Paired: [
                    {
                        Left: ">",
                        Right: ">",
                    },
                    {
                        Left: "<",
                        Right: "<",
                    },
                ],
            };
        case "mouth":
            // Mouths are always reversible, as there is no L2R or R2L orientation with these emoticons
            return {
                Reversible: [
                    "_",
                    "-",
                    ".",
                    "!",
                    "n",
                    "0",
                    "O",
                    "o",
                    "J",
                    "~",
                    "w",
                    "3",
                ],
            };
        default: return {};
    }
}

// These emoticons do not follow the usual structure, but are still valid.
function getEmoticonExceptions() {
    return ["<3"];
}

/*****************************************************************************************************************************/

// Given a standard emoticon object, this function returns a list of characters
// from its properties that are reversible and a set of its one-way characters.
function getStandardComponents(obj, isL2R) {
    if (isL2R) {
        return obj.Reversible.concat(obj.L2R); 
    } else {
        return obj.Reversible.concat(obj.R2L); 
    }
}

// Generates all possible standard emoticons using specifically formatted JSON objects for each emoticon component.
// isL2R constructs the emoticon in a particular orientation.
function generateStandardEmoticons(browsObj, eyesObj, noseObj, mouthObj, isL2R) {
    let generatedEmoticons = [];
    
    let brows = getStandardComponents(browsObj, isL2R);
    let eyes = getStandardComponents(eyesObj, isL2R);
    let nose = getStandardComponents(noseObj, isL2R);
    let mouth = getStandardComponents(mouthObj, isL2R);
    for (let b = 0; b < brows.length; b++) {
        for (let e = 0; e < eyes.length; e++) {
            for (let n = 0; n < nose.length; n++) {
                for (let m = 0; m < mouth.length; m++) {
                    // V is the only directional mouth, and pairing it with the v nose is invalid
                    // The eyes and mouth can be the same character IF AND ONLY IF they are separated by a nose character
                    if (nose[n] == mouth[m] || (eyes[e] == mouth[m] && nose[n].length <= 0) || (nose[n] == "v" && mouth[m] == "V")) {
                        continue;
                    }
                    if (isL2R) {
                        generatedEmoticons.push(brows[b] + eyes[e] + nose[n] + mouth[m]);
                    } else {
                        generatedEmoticons.push(mouth[m] + nose[n] + eyes[e] + brows[b]);
                    }
                }
            }
        }
    }
    
    return generatedEmoticons;
}

// Generates all possible Eastern emoticons using specifically formatted JSON objects for each emoticon component.
function generateEasternEmoticons(sidesObj, eyesObj, mouthObj) {
    let generatedEmoticons = [];
    
    let easternEyesL = eyesObj.Reversible.concat(eyesObj.Left);
    let easternEyesR = eyesObj.Reversible.concat(eyesObj.Right);
    let easternSidesLAll = sidesObj.Reversible.concat(sidesObj.Left);
    let easternSidesRAll = sidesObj.Reversible.concat(sidesObj.Right);
    let easternSidesPaired = sidesObj.Paired;
    
    // A rather naive approach to collating all side characters, banking on the fact that most are paired anyway.
    // Manually calculate all possible side pairs that can be made using the reversible and side-exclusive characters.
    for (let l = 0; l < easternSidesLAll.length; l++) {
        for (let r = 0; r < easternSidesRAll.length; r++) {
            easternSidesPaired.Paired.push({
                Left: easternSidesLAll[l],
                Right: easternSidesRAll[r],
            });
        }
    }
    
    for (let s = 0; s < easternSidesPaired.length; s++) {
        for (let eLeft = 0; eLeft < easternEyesL.length; eLeft++) {
            for (let eRight = 0; eRight < easternEyesR.length; eRight++) {
                for (let m = 0; m < mouthObj.Reversible.length; m++) {
                    // Prevent cases where the mouth and an eye are the same character, which invalidates the emoticon
                    if (easternEyesL[eLeft] !== mouthObj.Reversible[m] && easternEyesL[eRight] !== mouthObj.Reversible[m]) {
                        // Create Eastern emoticons
                        generatedEmoticons.push(easternSidesPaired[s].Left + easternEyesL[eLeft] + mouthObj.Reversible[m] + easternEyesR[eRight] + easternSidesPaired[s].Right);
                    }
                }
            }
        }
        // Create Eastern emoticons using the paired eyes
        for (let ePair = 0; ePair < eyesObj.Paired.length; ePair++) {
            for (let m = 0; m < mouthObj.Reversible.length; m++) {
                // Prevent cases where the mouth and an eye are the same character, which invalidates the emoticon
                if (eyesObj.Paired[ePair].Left !== mouthObj.Reversible[m] && eyesObj.Paired[ePair].Right !== mouthObj.Reversible[m]) {
                    generatedEmoticons.push(easternSidesPaired[s].Left + eyesObj.Paired[ePair].Left + mouthObj.Reversible[m] + eyesObj.Paired[ePair].Right + easternSidesPaired[s].Right);
                }
            }
        }
    }
    
    return generatedEmoticons;
}

// Gets an array of all characters used to construct a specific component of a standard emoticon
function getAllLettersFromStandardEmoticonObject(standardObj) {
    let letters = standardObj.Reversible.concat(standardObj.L2R).concat(standardObj.R2L).filter(
        // Remove empty characters
        function(letter){
            return letter.length > 0;
        }
    );
    
    // Spread syntax + List-Set-List conversion is used to geta all distinct values
    return [...new Set( letters )];
}

// Gets an array of all characters used to construct a specific component of a Eastern emoticon
function getAllLettersFromEasternEmoticonObject(easternObj) {
    let letterList = easternObj.Reversible.concat(easternObj.Left).concat(easternObj.Right);
    
    // Add all the paired components, if there are any
    for (let p = 0; p < easternObj.Paired.length; p++) {
        letterList.push(easternObj.Paired[p].Left);
        letterList.push(easternObj.Paired[p].Right);
    }
    
    let uniqueLetterList = letterList.filter(
        // Remove empty characters
        function(letter){
            return letter.length > 0;
        }
    );
    
    // Spread syntax + List-Set-List conversion is used to get all distinct values
    return [...new Set(uniqueLetterList)];
}

// Returns an array of strings containing all valid emoticons
function generateAllEmoticons() {
    // Default list contains any emoticons considered as exceptions
    return getEmoticonExceptions()
        .concat(generateStandardEmoticons(getStandardEmoticonObject("brows"), getStandardEmoticonObject("eyes"), getStandardEmoticonObject("nose"), getStandardEmoticonObject("mouth"), true))
        .concat(generateStandardEmoticons(getStandardEmoticonObject("brows"), getStandardEmoticonObject("eyes"), getStandardEmoticonObject("nose"), getStandardEmoticonObject("mouth"), false))
        .concat(generateEasternEmoticons(getEasternEmoticonObject("sides"), getEasternEmoticonObject("eyes"), getEasternEmoticonObject("mouth")))
        .sort();
}

/*****************************************************************************************************************************/

// Generates all emoticons and prints them to a HTML page element
function displayAllEmoticons() {
    let allEmoticons = generateAllEmoticons();
    let allString = "";
    for (let i= 0; i < allEmoticons.length; i++) {
        allString += allEmoticons[i] + "\n";
    }
    
    document.getElementById("allEmoticons").value = allString;
}

// Generates all emoticons and other supporting information for Scrabble, and sends them to HTML page elements to be displayed
function getScrabbleLetterDistributions() {

    let tileString = "";
    let scoreString = "";
    let tileChars = [];
    // Letters are split into tiers which represent their abundance and score (higher tier = lower abundance, higher score)
    let tiers = [
        getAllLettersFromStandardEmoticonObject(getStandardEmoticonObject("eyes")),
        getAllLettersFromStandardEmoticonObject(getStandardEmoticonObject("mouth")),
        getAllLettersFromStandardEmoticonObject(getStandardEmoticonObject("nose")).concat(getAllLettersFromStandardEmoticonObject(getStandardEmoticonObject("brows"))),
        getAllLettersFromEasternEmoticonObject(getEasternEmoticonObject("eyes")).concat(getEasternEmoticonObject("mouth").Reversible),
        getAllLettersFromEasternEmoticonObject(getEasternEmoticonObject("sides"))
    ];
    
    // Construct the Scrabble tile and score distribution
    for (let i = 0; i < tiers.length; i++) {
        for (let l = 0; l < tiers[i].length; l++) {
            if (tileChars.indexOf(tiers[i][l]) >= 0) {
                continue;
            }
            
            // Escape special characters in C#. Remove leading \ when copying the character string.
            if (tiers[i][l] == "'" || tiers[i][l] == "\\") {
                tiers[i][l] = `\\${tiers[i][l]}`;
            }
            
            switch(i) {
                case 0:
                    tileString  += `{ '${tiers[i][l]}' , 5 } ,\n`
                    scoreString += `{ '${tiers[i][l]}' , 1 } ,\n`
                    break;
                case 1:
                    tileString  += `{ '${tiers[i][l]}' , 2 } ,\n`
                    scoreString += `{ '${tiers[i][l]}' , 2 } ,\n`
                    break;
                case 1:
                    tileString  += `{ '${tiers[i][l]}' , 4 } ,\n`
                    scoreString += `{ '${tiers[i][l]}' , 3 } ,\n`
                    break;
                case 2:
                    tileString  += `{ '${tiers[i][l]}' , 3 } ,\n`
                    scoreString += `{ '${tiers[i][l]}' , 6 } ,\n`
                    break;
                case 3:
                    tileString  += `{ '${tiers[i][l]}' , 2 } ,\n`
                    scoreString += `{ '${tiers[i][l]}' , 9 } ,\n`
                    break;
                default:
                    continue;
            }
            
            // Unescape characters that start with a backslash
            if (tiers[i][l].startsWith("\\")) {
                tiers[i][l] = tiers[i][l].replace("\\", "");
            }
            tileChars.push(tiers[i][l]);
        }
    }
    
    document.getElementById("distributedTiles").value = tileString;
    document.getElementById("distributedScores").value = scoreString;
    document.getElementById("allChars").value = tileChars.sort().join("");
    
    return 0;
}