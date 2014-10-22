// Say hello to let you know things are running
console.log('Started SlimerJS');

var page = require('webpage').create();
var startTime;

// Set viewport size for screenshot
page.viewportSize = { width: 1024, height: 768 };

// Record start time when page begins to load
page.onLoadStarted = function () {
    startTime = new Date()
};

// After page has finished loading
// Print some basic information
// Take Screenshot
// Print DOM to stdout
page.onLoadFinished = function (status) {
    if (status == 'success') {
        var endTime = new Date()
        console.log('The title of the page is: ' + page.title);
        console.log('The page is loaded in ' + ((endTime - startTime) / 1000) + ' seconds');

        // Wait for Famo.us to render (500ms-1000ms seems about right)
        slimer.wait(500);

        takeScreenshot();
        printDomToStdout();
    } else {
        console.log('The loading has failed.');
    }

    page.close();
    phantom.exit();
};

// Saves a screenshot to screenshot.png
function takeScreenshot() {
    page.render('screenshot.png');
    console.log('Saved screenshot to screenshot.png');
}

// Prints the current DOM to the stdout
function printDomToStdout() {
    var js = page.evaluate(function () {
        return document;
    });
    console.log(js.all[0].outerHTML);
}

// GO:START:BEGIN:COMMENCE
page.open('/data/famous_example/rotating-box.html');
