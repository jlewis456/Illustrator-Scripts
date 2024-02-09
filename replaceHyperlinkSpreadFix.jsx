// Check if a text frame is selected
if (app.selection.length === 1 && app.selection[0] instanceof TextFrame) {
    var textFrame = app.selection[0];

    // Get the hyperlinks in the document
    var hyperlinks = app.activeDocument.hyperlinks;

    // Get the spreads in the document
    var spreads = app.activeDocument.spreads;

    // Loop through each hyperlink
    for (var j = 0; j < hyperlinks.length; j++) {
        var hyperlink = hyperlinks[j];

        // Check if the hyperlink source is a text source
        if (hyperlink.source instanceof HyperlinkTextSource) {
            var sourceText = hyperlink.source.sourceText;

            // Check if the source text is within the selected text frame
            if (sourceText.parentTextFrames[0] === textFrame) {

                // Check if the hyperlink destination is a page destination
                if (hyperlink.destination instanceof HyperlinkPageDestination) {
                    var destinationPage = hyperlink.destination.destinationPage;

                    // Calculate the spread number
                    var spreadNumber = Math.ceil((destinationPage.documentOffset + 1) / 2);

                    // Get the existing text and remove any numbers after the last tab
                    var existingText = sourceText.contents;
                    var lastTabPos = existingText.lastIndexOf("\t");
                    if (lastTabPos !== -1) {
                        existingText = existingText.substring(0, lastTabPos + 1).replace(/\d+$/, "");
                    }

                    // Append the spread number to the existing text
                    sourceText.contents = existingText + spreadNumber.toString();
                }
            }
        }
    }
} else {
    alert("Please select a single text frame and try again.");
}
