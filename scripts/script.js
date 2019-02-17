var showAnswer = false;
var relationships = [];
var showRelationships = false;
function addRelationship(relationshipId) {
    if (relationships.length == 3) relationships.shift();
    relationships.push(relationshipId);
    console.log(relationships);
}

function containsElement(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == obj) {
            return true;
        }
    }
    return false;
}

function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

function loadAnswer(answer, index) {
    var info = ["who", "what", "when", "where", "why", "details", "source"];
    for (var i = 0; i < info.length; i++) {
        var specifier = info[i];
        var element = document.getElementById(specifier + index);
        element.innerHTML = fillNullData(answer[specifier.charAt(0).toUpperCase() + specifier.slice(1)]);
    }
}

var delegate = {
    toggleAnswer: function() {
        showAnswer = !showAnswer;
        console.log("Show Relationships");
        var answersToShow = (showRelationships == true) ? 3 : 1;
        for (var index = 1; index < answersToShow + 1; index++) {
            var answerElement = document.getElementById("answer" + index);
            answerElement.style.display = (showAnswer == true) ? "block" : "none";
        }

        var answerToggle = document.getElementById("toggleanswer");
        answerToggle.innerHTML = (showAnswer == true) ? "Hide Answer" : "Show Answer";
    },
    loadNewAnswer: function() {
        var id = document.getElementById("id-id");
        var textarea = document.getElementById("id-answer-textarea");
        textarea.placeholder = "Enter the who, what, when, where and why the terms matter";
        textarea.focus();

        var histEvent = randomProperty(histData);
        while(containsElement(histEvent['Id'], relationships) == true) {
            histEvent = randomProperty(histData);
            console.log(histEvent['Id'], relationships);
        }
        addRelationship(histEvent['Id']);
        loadAnswer(histEvent, 1);
        id.innerHTML = histEvent['Id'];
    },
    loadPastAnswers: function() {
        console.log("Loading Past Answers");
        var id = document.getElementById("id-id");
        var histEvent = relationships[0];
        var idContent = histEvent;

        loadAnswer(histData[histEvent], 1);
        for (var i = 1; i < relationships.length; i++) {
            histEvent = relationships[i];
            idContent += ", " + histEvent;
            console.log(i + 1);
            loadAnswer(histData[histEvent], i + 1);
        }
        id.innerHTML = idContent;

        var textarea = document.getElementById("id-answer-textarea");
        textarea.placeholder = "Enter the relationships between the items";
        showRelationships = true;
    }
};

function fillNullData(value) {
    if (!value) return "Unknown";
    else return value;
}

function callAction(id, flag) {
    delegate[id]();
}

// Initiate first id
callAction("loadNewAnswer", false);
