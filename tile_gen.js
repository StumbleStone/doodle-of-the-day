const contentDiv = document.getElementById("Content");
const generatorClasses = [];

const dev = localStorage.getItem("dev") === "true";

function AddTitleHeading(heading){
    const headingDiv = document.createElement("div");
    const headingText = document.createElement("h2");
    headingText.textContent = heading;
    headingDiv.appendChild(headingText);

    const borderDiv = document.createElement("div");
    borderDiv.classList.add("TileTitleBorderDiv");
    headingDiv.appendChild(borderDiv);

    return headingDiv;
}

function AddTile(date, idSuffix){
    const newTile = document.createElement("div");
    newTile.classList.add("Tile");

    newTile.appendChild(AddTitleHeading(date));
    newTile.id = `${date}_${idSuffix}`;
    sortAppendTile(newTile, date);

    const newTileContent = document.createElement("div");
    newTileContent.classList.add("TileContent")
    newTile.appendChild(newTileContent);

    return newTileContent;
}

async function scriptLoader(src){
    return new Promise(resolve => {
       const newScript = document.createElement("script");
       newScript.onload = () => {
           //TODO do I want to wait for something?
           resolve(true);
       }
       newScript.src = src;
       document.head.appendChild(newScript);
    });
}

//If the date is present or past, call the renderCb.
//If the date is future, don't call the renderCb => future doodles remain unloaded
function dateChecker(dateString){
    const renderTime = new Date(dateString).getTime();
    if(renderTime > Date.now() && !dev){
        console.log("Not yet rendering", dateString);
        return false;
    }

    console.log("Rendering", dateString);
    return true;
}

function sortAppendTile(newTile, date){
    const curDate = new Date(date);

    if(contentDiv.children.length === 0){
        contentDiv.appendChild(newTile);
        return;
    }

    for(let i = contentDiv.children.length - 1; i >= 0; i--){
        const childEl = contentDiv.children[i];
        const childDate = new Date(childEl.id.split("_")[0]);
        if(curDate > childDate){
            if(childEl.nextSibling) {
                contentDiv.insertBefore(newTile, childEl.nextSibling);
            }
            else {
                contentDiv.appendChild(newTile);
            }
            return;
        }
    }

    contentDiv.appendChild(newTile);
}

function renderDoodle(date, renderCb){
    if(dateChecker(date)){
        renderCb(date);
    }
}

function addGeneratorClass(classCreator){
    const newClass = new classCreator();
    generatorClasses.push(newClass);

    if(!newClass.render){
        if(newClass.close) newClass.close();
        //TODO make extended classes with TS so that this is not required
        console.error("Class does not contain a getRenderFunctions", classCreator.name);
        return;
    }

    newClass.render();
}

async function loadScripts(){
    const scripts = [
        "spinners/spinner_script.js",
        "progressbar/progressbar_script.js"
    ]

    for(let script of scripts){
        console.log("Loading script:", script);
        await scriptLoader(script);
    }
}

loadScripts().then();