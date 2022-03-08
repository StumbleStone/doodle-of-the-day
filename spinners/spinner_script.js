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

    delay: (circleCnt, i, offset, multiplier) => {
        const delay = (offset ?? 0) * i +(multiplier ?? 1) * (i / circleCnt);

        return `${delay.toFixed(2)}s`;
    },

    render: (params) =>{
        const maxSize = (params.maxSize ?? 200) / Math.sqrt(2);
        const minSize = (params.minSize ?? 20) / Math.sqrt(2);

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
            const size = minSize + ((maxSize - minSize) / circleCnt) * i;

            newSpinner.style.width = size + "px";
            newSpinner.style.height = (size - (params.circle !== "flat" ? borderSize : 0)) + "px";

            newSpinner.style.animationDelay = spinnerClass.delay(circleCnt, i, params.delayOffset, params.delayMultiplier);
            newSpinner.style.animationDuration = spinnerClass.duration(circleCnt, i, params.duration, params.durationBase ?? 2);

            newSpinner.style.animationDirection = spinnerClass.direction(params.direction, i);

            if(params.circle === "flat"){
                newSpinner.style.border = `${borderSize}px solid transparent`;
            }

            newSpinner.style.borderRadius = `${borderRadius}%`;
            newSpinner.style.borderBottom = `${borderSize}px solid`;

            const hue = params.color === "reverse" ? (360 / circleCnt) * (circleCnt - i) : (360 / circleCnt) * (i - 1)

            const col = `hsl(${hue}deg 100% 35%)`;
            newSpinner.style.borderBottomColor = col;

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
        circleCount: 12,
        borderSize: 5,
        durationBase: 2,
        delayMultiplier: 0.5,
        delayOffset: 0.333,
        duration: "sync",
        circle: "flat",
        direction: "mixed",
    });
}

function createRainbowAsyncMixedSpinnerHalfBlocky() {
    createSpinner({
        title: "2022-03-05",
        color: "reverse",
        circleCount: 20,
        borderSize: 6,
        borderRadius: 35,
        durationBase: 3,
        duration: "sync",
        direction: "mixed",
    });
}

function createRainbowAsyncSpinnerBlocky() {
    createSpinner({
        title: "2022-03-06",
        color: "reverse",
        circleCount: 40,
        borderSize: 3,
        borderRadius: 1,
        delayMultiplier: 3,
        durationBase: 2,
        delayOffset: 0,
        duration: "sync",
        direction: "clockwise",
    });
}

function createRainbowAsyncSpinnerMixedBlocky() {
    createSpinner({
        title: "2022-03-07",
        color: "reverse",
        circleCount: 20,
        borderSize: 6,
        borderRadius: 0,
        durationBase: 2,
        delayOffset: 0,
        duration: "sync",
        direction: "mixed",
    });
}

function createRainbowWhirpoolSpinner() {
    createSpinner({
        title: "2022-03-08",
        duration: "sync",
        delayMultiplier: 1,
        delayOffset: 0.25,
        durationBase: 1.5,
        circleCount: 15,
        borderSize: 10,
    });
}

function createRainbowAsyncSpinnerMixedBlockySlowly() {
    createSpinner({
        title: "2022-03-09",
        color: "reverse",
        circleCount: 20,
        borderSize: 6,
        borderRadius: 0,
        delayMultiplier: 4,
        durationBase: 2,
        delayOffset: 0,
        duration: "sync",
        direction: "anticlockwise",
    });
}

createRainbowAsyncSpinner();
createRainbowSyncSpinner();
createRainbowSyncMixedSpinner();
createRainbowAsyncMixedSpinner();
createRainbowAsyncMixedSpinnerHalfBlocky();
createRainbowAsyncSpinnerBlocky();
createRainbowAsyncSpinnerMixedBlocky();
createRainbowWhirpoolSpinner();
// createRainbowAsyncSpinnerMixedBlockySlowly();
