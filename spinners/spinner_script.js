const spinnerClass = {
    duration: (circleCnt, i, type, base) => {
        switch (type){
            case "sync":{
                return `${base}s`
            }
            case "async":
            default: {
                return `${base-((circleCnt - i)/circleCnt) / 3}s`
            }
        }
    },

    direction: (direction, i) => {
        switch (direction){
            case "mixed": {
                return i % 2 === 0? "reverse" : "normal";
            }
            case "anticlockwise": {
                return "reverse";
            }
            case "clockwise":
            default: {
                return "normal";
            }
        }
    },

    render: (params) =>{
        const borderSize = params.borderSize ?? 5;
        const borderRadius = params.borderRadius ?? 50;

        const resetEls = document.getElementsByName("spinner");
        while(resetEls.length > 0) resetEls[0].remove();

        const circleCnt = params.circleCount ?? 5;

        const colArr = [];
        for(let i = 0; i < circleCnt; i ++){
            colArr.push((360 / circleCnt) * i);
        }

        for(let i = 0; i < 10; i++){
            colArr.sort(() => Math.random() - 0.5);
        }

        for(let i = 1; i < circleCnt; i++){
            const newSpinner = document.createElement("div");
            newSpinner.classList.add("spinner");
            const size = params.minSize + ((params.maxSize - params.minSize) / circleCnt) * i;
            const offset = (params.maxSize - size) / 2;

            newSpinner.style.width = size + "px";
            newSpinner.style.height = (size - (params.circle !== "flat" ? borderSize : 0)) + "px";

            newSpinner.style.top = offset + "px";
            newSpinner.style.left = offset + "px";

            const delay = Math.round((i / circleCnt) * 100);

            const delayStr = `${0}.${( '0' + delay).slice(-2)}s`;

            newSpinner.style.animationDelay = delayStr;
            newSpinner.style.animationDuration = spinnerClass.duration(circleCnt, i, params.duration, params.durationBase ?? 2);
            // newSpinner.style.animationDuration = `1s`;
            //

            newSpinner.style.animationDirection = spinnerClass.direction(params.direction, i);

            if(params.circle === "flat"){
                newSpinner.style.border = `${borderSize}px solid transparent`;
            }

            newSpinner.style.borderRadius = `${borderRadius}%`;
            newSpinner.style.borderBottom = `${borderSize}px solid`;

            const hue = params.color === "reverse" ? (360 / circleCnt) * (circleCnt - i) : (360 / circleCnt) * (i - 1)

            const col = `hsl(${hue}deg 100% 35%)`;
            // const col = `hsl(${colArr.pop()}deg 100% 35%)`;
            newSpinner.style.borderBottomColor = col;

            // const col2 = `hsl(${(360 / circleCnt) * i}deg 100% 35% / 0.50)`;
            // const col = `hsl(${colArr.pop()}deg 100% 35%)`;
            // newSpinner.style.borderBottomColor = col2;

            params.container.appendChild(newSpinner);
        }
    },
}

function createSpinner(params){
    const newTile = AddTile(params.title ?? "Spinner");
    const bBox = newTile.getBoundingClientRect();
    spinnerClass.render({container: newTile, maxSize: bBox.width, minSize: bBox.width * 0.1, ...params});
}

function createRainbowAsyncSpinner() {
    createSpinner({
        title: "2022-03-01",
        duration: "async",
        durationBase: 1,
        circleCount: 8,
    });
}

function createRainbowSyncSpinner() {
    createSpinner({
        title: "2022-03-02",
        color: "reverse",
        circleCount: 10,
        durationBase: 2,
        duration: "sync",
    });
}

function createRainbowSyncMixedSpinner() {
    createSpinner({
        title: "2022-03-03",
        color: "reverse",
        circleCount: 20,
        borderSize: 2,
        durationBase: 2,
        duration: "sync",
        circle: "flat",
        direction: "mixed",
    });
}

function createRainbowAsyncMixedSpinner() {
    createSpinner({
        title: "2022-03-04",
        color: "reverse",
        circleCount: 6,
        borderSize: 5,
        durationBase: 2,
        duration: "async",
        circle: "flat",
        direction: "mixed",
    });
}

function createRainbowAsyncMixedSpinnerBlocky() {
    createSpinner({
        title: "2022-03-05",
        color: "reverse",
        circleCount: 20,
        borderSize: 6,
        borderRadius: 20,
        durationBase: 3,
        duration: "async",
        direction: "mixed",
    });
}

createRainbowAsyncSpinner();
createRainbowSyncSpinner();
createRainbowSyncMixedSpinner();
createRainbowAsyncMixedSpinner();
createRainbowAsyncMixedSpinnerBlocky();
