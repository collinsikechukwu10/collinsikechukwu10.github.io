loadSpinner(fillSections);


/*  ======================= SETUP ======================= */
let WORD_CLOUD_CONFIG = {
    trace: true,
    spiralResolution: 1, //Lower = better resolution
    spiralLimit: 360 * 5,
    lineHeight: 0.8,
    xWordPadding: 0,
    yWordPadding: 3,
    font: "sans-serif"
}

function loadSpinner(callback) {
    // run a spinner while a callback is executed and rendered
    callback();
}



function fillSections() {
    fetch("data.json")
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            fillSkillsSection(data);
            fillProjectSection(data);
        })
}
function fillProjectSection(data) {
    let obj = $("#project-cols");
    data.projects.forEach((element,idx,array) => {
        // let text = $("div").addClass("pt-5 mt-5 mb-4 display-6 lh-1 fw-bold").text(element.name)
        // let card = $("div").addClass("card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg").css("background-image",element.image_url);
        // let textHolder = $("div").addClass("d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1");
        // textHolder.appendChild(text);

        console.log(element)
        
        obj.appendChild($("div").addClass("col"))
        // .append("div")
        // .addClass("card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg")
        // .css("background-image",element.image_url)
        // .append("div")
        // .addClass("d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1")
        // .append("h2")
        // .addClass("pt-5 mt-5 mb-4 display-6 lh-1 fw-bold")
        // .text(element.name)
    }); 
}


function fillSkillsSection(data) {
}



function sendMessage() {
    $("form")
}

let WORDS = ["words", "are", "cool", "and", "so", "are", "you", "inconstituent", "funhouse!", "apart", "from", "Steve", "sdvwsd", "sdvds", "asvgwr", "webrwe", "bwrb", "rber", "rebre", "fish"]
// wordCloud(document.getElementById("skill-section-libraries"), WORDS)
function wordCloud(wordCloudDivElement, wordsToUse) {
    let words = wordsToUse.map(function (word) {
        return {
            word: word,
            freq: Math.floor(Math.random() * 50) + 10
        }
    })
    words.sort((a, b) => -1 * (a.freq - b.freq));

    wordCloudDivElement.style.position = "relative";
    wordCloudDivElement.style.fontFamily = WORD_CLOUD_CONFIG.font;

    var traceCanvas = document.createElement("canvas");
    traceCanvas.width = wordCloudDivElement.offsetWidth;
    traceCanvas.height = wordCloudDivElement.offsetHeight;
    var traceCanvasCtx = traceCanvas.getContext("2d");
    wordCloudDivElement.appendChild(traceCanvas);
    var startPoint = {
        x: wordCloudDivElement.offsetWidth / 2,
        y: wordCloudDivElement.offsetHeight / 2
    };

    var wordsDown = [];
    // END SETUP



    /* =======================  PLACEMENT FUNCTIONS =======================  */
    function createWordObject(word, freq) {
        var wordContainer = document.createElement("div");
        wordContainer.style.position = "absolute";
        wordContainer.style.fontSize = freq + "px";
        wordContainer.style.lineHeight = WORD_CLOUD_CONFIG.lineHeight;
        wordContainer.appendChild(document.createTextNode(word));
        return wordContainer;
    }

    function placeWord(word, x, y) {
        wordCloudDivElement.appendChild(word);
        word.style.left = x - word.offsetWidth / 2 + "px";
        word.style.top = y - word.offsetHeight / 2 + "px";
        wordsDown.push(word.getBoundingClientRect());
    }

    function trace(x, y) {
        traceCanvasCtx.fillRect(x, y, 1, 1);
    }

    function spiral(i, callback) {
        angle = WORD_CLOUD_CONFIG.spiralResolution * i;
        x = (1 + angle) * Math.cos(angle);
        y = (1 + angle) * Math.sin(angle);
        return callback ? callback() : null;
    }

    function intersect(word, x, y) {
        wordCloudDivElement.appendChild(word);

        word.style.left = x - word.offsetWidth / 2 + "px";
        word.style.top = y - word.offsetHeight / 2 + "px";

        var currentWord = word.getBoundingClientRect();

        wordCloudDivElement.removeChild(word);

        for (var i = 0; i < wordsDown.length; i += 1) {
            var comparisonWord = wordsDown[i];

            if (!(currentWord.right + WORD_CLOUD_CONFIG.xWordPadding < comparisonWord.left - WORD_CLOUD_CONFIG.xWordPadding ||
                currentWord.left - WORD_CLOUD_CONFIG.xWordPadding > comparisonWord.right + WORD_CLOUD_CONFIG.wXordPadding ||
                currentWord.bottom + WORD_CLOUD_CONFIG.yWordPadding < comparisonWord.top - WORD_CLOUD_CONFIG.yWordPadding ||
                currentWord.top - WORD_CLOUD_CONFIG.yWordPadding > comparisonWord.bottom + WORD_CLOUD_CONFIG.yWordPadding)) {

                return true;
            }
        }

        return false;
    }
    /* =======================  END PLACEMENT FUNCTIONS =======================  */





    /* =======================  LETS GO! =======================  */
    (function placeWords() {
        for (var i = 0; i < words.length; i += 1) {

            var word = createWordObject(words[i].word, words[i].freq);

            for (var j = 0; j < WORD_CLOUD_CONFIG.spiralLimit; j++) {
                //If the spiral function returns true, we've placed the word down and can break from the j loop
                if (spiral(j, function () {
                    if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                        placeWord(word, startPoint.x + x, startPoint.y + y);
                        return true;
                    }
                })) {
                    break;
                }
            }
        }
    })();
    // Draw the placement spiral if trace lines is on 
    (function traceSpiral() {

        traceCanvasCtx.beginPath();

        if (WORD_CLOUD_CONFIG.trace) {
            var frame = 1;

            function animate() {
                spiral(frame, function () {
                    trace(startPoint.x + x, startPoint.y + y);
                });

                frame += 1;

                if (frame < WORD_CLOUD_CONFIG.spiralLimit) {
                    window.requestAnimationFrame(animate);
                }
            }

            animate();
        }
    })();

}



