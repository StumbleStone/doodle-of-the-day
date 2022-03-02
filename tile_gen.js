const contentDiv = document.getElementById("Content");
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

function AddTile(tileHeading){
    const newTile = document.createElement("div");
    newTile.classList.add("Tile");

    newTile.appendChild(AddTitleHeading(tileHeading));
    contentDiv.appendChild(newTile);

    const newTileContent = document.createElement("div");
    newTileContent.classList.add("TileContent")
    newTile.appendChild(newTileContent);

    return newTileContent;
}