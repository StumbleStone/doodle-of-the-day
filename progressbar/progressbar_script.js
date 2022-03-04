const progressbarClass = {
    segments: (segments, height, width, borderWidth) => {
        if(segments){
            if(segments === "dynamic"){
                return Math.floor(width / (height + borderWidth * 2));
            }

            return segments;
        }

        return height;
    },

    generateSegment: (size, borderRadius) => {
        const segDiv = document.createElement("div");

        segDiv.style.width = size + "px";
        segDiv.style.height = size + "px";
        segDiv.style.display = "inline-block";

        segDiv.style.borderRadius = borderRadius + "px";
        segDiv.style.border = "1px solid black";

        return segDiv;
    },

    generateContainer: () => {
        const containerDiv = document.createElement("div");

        containerDiv.style.width = "100%";
        containerDiv.style.whiteSpace = "nowrap";

        return containerDiv;
    },

    render: (params) => {
        const borderRadius = params.borderRadius ?? 10;
        const borderWidth = params.borderWidth ?? 1;
        const height = params.height ?? 50;
        const segments = progressbarClass.segments(params.segments, height, params.maxSize, borderWidth);

        const container = progressbarClass.generateContainer();

        for(let i = 0; i < segments; i++){
            container.appendChild(progressbarClass.generateSegment(height, borderRadius));
        }

        params.container.appendChild(container);
    }
}

function createProgressBar(params) {
    const newTile = AddTile(params.title ?? "ProgressBar");
    const bBox = newTile.getBoundingClientRect();
    progressbarClass.render({container: newTile, maxSize: bBox.width, ...params});
}

function createSegmentProgressBar(){
    createProgressBar({
        title: "2022-03-06",
        height: 25,
        borderRadius: 3,
        segments: "dynamic",
    });
}

// createSegmentProgressBar();
