var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();

function updateVariables(data) {
    // update the html elements
    document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    if (data.eventName === "Trainingsstart") {
        document.getElementById("startevent").innerHTML = data.eventData;
    }
    if (data.eventName === "Trainingsende") {
        document.getElementById("endevent").innerHTML = data.eventData;
    }

    if (data.eventName === "Pulls Kadenz") {
    document.getElementById("pullsevent").innerHTML = data.eventData;
}
}

async function setCounter() {
    // read the value from the input field
    var counter = document.getElementById("counterinput").value;

    // call the function
    var response = await axios.post(rootUrl + "/api/device/0/function/setCounter", { arg: counter });

    // Handle the response from the server
    alert("Response: " + response.data.result); // we could to something meaningful with the return value here ... 
}

async function getPulls() {
    // request the variable "counter"
    var response = await axios.get(rootUrl + "/api/device/0/variable/pulls");
    var pulls = response.data.result;

    // update the html element
    document.getElementById("pulls").innerHTML = pulls;
}
