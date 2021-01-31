$(function () {
    colorAzcli()
    formatPreCodeBlocks();
})

function formatPreCodeBlocks() {
    let codeBlocks = $('[class*=language-]');
    codeBlocks.each((i, curBlock) => {
        if (!$(curBlock).hasClass("language-plaintext")) {
            if ($(curBlock).is("div")) {
                // $(curBlock).addClass('ml-md-4 mt-md-3');
                $(curBlock).prop('contentEditable', true);
            } else {
                $(curBlock).parent().prop('contentEditable', true);
                // $(curBlock).parent().addClass('ml-md-4 mb-md-3 editor');
            }
        }
    });
}

function colorAzcli() {
    let commandBlocks = $('.language-azcli, .language-azurecli')

    commandBlocks.each((i, curBlock) => {
        let blockText = $(curBlock).text();
        // let formattedText = formatCommandBlock(i, blockText);
        let formattedText = formatNewCommandBlock(i, blockText);
        $(curBlock).addClass('code-text').html(formattedText.trim());
        $(curBlock).parent().css('background-color', '#2e2e2e');
    });
}

function formatNewCommandBlock(blockIndex, blockText) {
    // console.log(`Current Block: ${blockIndex}, BlockText: \n${blockText}`);

    let blockLines = blockText.split('\n');
    let resultLines = [];

    for (let blockLineIndex = 0; blockLineIndex < blockLines.length; blockLineIndex++) {
        let curLine = blockLines[blockLineIndex];
        let lineSplit = curLine.split(' ');

        // If Don't have arguments just trim and push
        if (!hasArgs(lineSplit) && !isEmpty(lineSplit)) {
            // console.log(`No args: Current Line: ${blockLineIndex}, LineText: \n${curLine}`);
            resultLines.push(writeKeyword(curLine));

            continue;
        }

        // Handle and Split Arguments
        let nonArgs = [];
        // console.log(`Current Line: ${blockLineIndex}, LineText: \n${curLine}`);
        for (let splitIndex = 0; splitIndex < lineSplit.length; splitIndex++) {
            let curSplitText = lineSplit[splitIndex];

            // Skip Blanks (do not filter)
            if (isEmptyOrEndLine(curSplitText))
                continue;

            if (!isArgs(curSplitText) && !isEmpty(curSplitText)) {
                // console.log(`Pushing: Current Line: ${blockLineIndex}, CurrentText: ${curSplitText}`);
                nonArgs.push(curSplitText);
                continue;
            }

            // Args Found

            // Push Non args first
            if (!isEmpty(nonArgs)) {
                // console.log(`Pushing: Current Line: ${blockLineIndex}, CurrentText: ${curSplitText}`);
                resultLines.push(writeKeyword(nonArgs.join(" ")));
                nonArgs = [];
            }

            // capture Args now
            const defSpace = "     ";
            let arg = writeArgument(curSplitText, defSpace);
            // console.log(`Found Arg: Current Line: ${blockLineIndex}, ArgValue: ${arg}`);

            // capture arg value until next argument or end of line
            let argIndex = ++splitIndex;
            for (; argIndex < lineSplit.length; argIndex++) {
                if (lineSplit[argIndex].includes("$(")) {
                    // Handle Expression syntax
                    argIndex = readExpression(lineSplit, argIndex);
                    break;
                } else if (isArgs(lineSplit[argIndex])) {
                    // Next arg found
                    // console.log(`Next Arg Found: Current Line: ${blockLineIndex}, ArgValue: ${lineSplit[argIndex]}`);
                    --argIndex;
                    break;
                }
            }

            let extractedArgValue = splitIndex == argIndex ? lineSplit[splitIndex] : lineSplit.slice(splitIndex, argIndex).join(" ");
            // console.log(`Pushing: Current Line: ${blockLineIndex}, ArgValue: ${extractedArgValue}, ArgIndex: ${argIndex}, SplitIndex: ${splitIndex}`);

            splitIndex = argIndex;
            let argValue = writeArgumentValue(extractedArgValue);

            resultLines.push(arg + argValue);
        }
    }

    // console.log("Result Lines: ", resultLines.join('\n'));

    resultLines[resultLines.length - 1] = resultLines[resultLines.length - 1].replace(" \\", "");
    return resultLines.join('\n');
}

function isArgs(curVal) {
    return curVal.startsWith("-") || curVal.startsWith("--");
}

function hasArgs(lineSplit) {
    return lineSplit.filter(x => isArgs(x)).length > 0;
}

function isEmptyOrEndLine(curText) {
    return curText === "" || curText === " " || curText === "\\";
}

function isEmpty(arrItems) {
    if (!arrItems)
        return true;

    for (let i = 0; i < arrItems.length; i++) {
        if (arrItems[i] !== '' && arrItems[i] !== " ")
            return false;
    }

    return true;
}


function writeKeyword(keyword) {
    if (!keyword)
        return "";

    keyword = keyword.trim().replace("\\", "").replace("`", "");
    return `<span class="code-keyword">${keyword.trim()} \\</span>`;
}

function writeArgument(arg, defSpace) {
    return `<span class="code-alias">${defSpace}${arg.trim()}</span>`;
}

function writeArgumentValue(argValue) {
    if (!argValue || isEmpty(argValue))
        return "";

    argValue = argValue.replace("\\", "").replace("`", "");
    ;
    return `<span class="code-value"> ${argValue.trim()} \\</span>`;
}

function readExpression(lineSplit, startIndex) {
    let i = startIndex;
    for (; i < lineSplit.length; i++) {
        if (lineSplit[i].endsWith(")\"")) {
            // console.log("Expression end found: ", lineSplit.slice(startIndex,i+1).join(" "));
            return i + 1;
        }
    }

    return i;
}

