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

        segDiv.style.backgroundColor = "#fff";

        segDiv.style.transitionDuration = "0.3s";
        segDiv.style.transitionProperty = "background-color";

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

        const segmentsArr = []

        for(let i = 0; i < segments; i++){
            const newSeg = progressbarClass.generateSegment(height, borderRadius);
            segmentsArr.push(newSeg);
            container.appendChild(newSeg);
        }

        params.container.appendChild(container);

        return (value) => {
            const curSeg = Math.floor(value / (100 / segments));

            const minSegValue = Math.floor(curSeg * (100 / segments));
            const maxSegValue = Math.floor((curSeg + 1) * (100 / segments));

            const segPerc = (value - minSegValue) / (maxSegValue - minSegValue);

            const light = 100 - (50 * segPerc).toFixed(2);
            const lightStop = 100 - (70 * segPerc).toFixed(2);
            const lightStart = 100 - (20 * segPerc).toFixed(2);

            segmentsArr[curSeg].style.background = `linear-gradient(hsl(100deg, 50%, ${lightStart}%) 20%, hsl(100deg, 50%, ${light}%), hsl(100deg, 50%, ${lightStop}%)) 20%`;


            console.log(value, minSegValue, maxSegValue, curSeg, segPerc);
        }
    }
}

function createProgressBar(params) {
    const newTile = AddTile(params.title ?? "ProgressBar");
    const bBox = newTile.getBoundingClientRect();
    return progressbarClass.render({container: newTile, maxSize: bBox.width, ...params});
}

const updaters = [];

function createSegmentProgressBar(){
    const updater = createProgressBar({
        title: "2022-03-10",
        height: 25,
        borderRadius: 3,
        segments: "dynamic",
    });

    updaters.push(updater);
}

// createSegmentProgressBar();

let value = 0;
let direction = true;
setInterval(() => {
    if(direction) {
        value += 1;
        if(value > 100){
            direction = false;
            value = 100;
        }
    }
    else {
        value -= 1;
        if(value < 0){
            direction = true;
            value = 0;
        }
    }

    updaters.forEach(cb => cb(value));
}, 200);