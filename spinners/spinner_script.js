class SpinnerGenerator {
    renders = [];

    constructor() {

    }

    duration(circleCnt, i, type, base) {
        switch (type){
            case "sync":{
                return `${base}s`
            }
            case "async":
            default: {
                return `${base-((circleCnt - i)/circleCnt) / 3}s`
            }
        }
    }

    direction(direction, i){
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
    }

    delay(circleCnt, i, offset, multiplier){
        const delay = (offset ?? 0) * i +(multiplier ?? 1) * ((circleCnt - i) / circleCnt);

        return `-${delay.toFixed(2)}s`;
    }

    renderSpinner(params){
        const maxSize = (params.maxSize ?? 200) / Math.sqrt(2);
        const minSize = (params.minSize ?? 20) / Math.sqrt(2);

        const borderSize = params.borderSize ?? 5;
        const borderRadius = params.borderRadius ?? 50;

        const resetEls = document.getElementsByName("spinner");
        while(resetEls.length > 0) resetEls[0].remove();

        const circleCnt = params.circleCount ?? 5;

        // const colArr = [];
        // for(let i = 0; i < circleCnt; i ++){
        //     colArr.push((360 / circleCnt) * i);
        // }
        //
        // for(let i = 0; i < 10; i++){
        //     colArr.sort(() => Math.random() - 0.5);
        // }

        for(let i = 1; i < circleCnt; i++){
            const newSpinner = document.createElement("div");
            newSpinner.classList.add("spinner");
            const size = minSize + ((maxSize - minSize) / circleCnt) * i;

            newSpinner.style.width = size + "px";
            newSpinner.style.height = (size - (params.circle !== "flat" ? borderSize : 0)) + "px";

            newSpinner.style.animationDelay = this.delay(circleCnt, i, params.delayOffset, params.delayMultiplier);
            newSpinner.style.animationDuration = this.duration(circleCnt, i, params.duration, params.durationBase ?? 2);

            newSpinner.style.animationDirection = this.direction(params.direction, i);

            if(params.circle === "flat"){
                newSpinner.style.border = `${borderSize}px solid transparent`;
            }

            newSpinner.style.borderRadius = `${borderRadius}%`;
            newSpinner.style.borderBottom = `${borderSize}px solid`;

            const hue = params.color === "reverse" ? (360 / circleCnt) * (circleCnt - i) : (360 / circleCnt) * (i - 1)

            const col = `hsl(${hue}deg 100% 35%)`;

            newSpinner.style.borderBottomColor = col;

            if(params.mirror){
                newSpinner.style.borderTop = `${borderSize}px solid`;
                newSpinner.style.borderTopColor = col;
            }

            params.container.appendChild(newSpinner);
        }
    }

    createSpinner(params, date){
        const newTile = AddTile(date, "Spinner");
        const bBox = newTile.getBoundingClientRect();
        this.renderSpinner({container: newTile, maxSize: bBox.width, minSize: bBox.width * 0.1, ...params});
        this.renders.push(newTile);
    }

    createRainbowAsyncSpinner(date) {
        this.createSpinner({
            title:date,
            duration: "async",
            durationBase: 1,
            circleCount: 8,
        }, date);
    }

    createRainbowSyncSpinner(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 10,
            durationBase: 2,
            duration: "sync",
        }, date);
    }

    createRainbowAsyncMirrorSpinner(date) {
        this.createSpinner({
            title:date,
            duration: "async",
            mirror: true,
            durationBase: 1,
            circleCount: 8,
        }, date);
    }

    createRainbowSyncMirrorSpinner(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            mirror: true,
            circleCount: 20,
            borderSize: 2,
            delayOffset: 1.2,
            circle: "flat",
            durationBase: 2,
            duration: "sync",
        }, date);
    }

    createRainbowSyncMirrorSpinner2(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            mirror: true,
            circleCount: 20,
            borderSize: 2,
            delayOffset: 1.5,
            circle: "flat",
            durationBase: 2,
            duration: "sync",
        }, date);
    }

    createRainbowSyncMirrorSpinner3(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            mirror: true,
            circleCount: 20,
            borderSize: 2,
            delayOffset: 1.7,
            circle: "flat",
            durationBase: 2,
            duration: "sync",
        }, date);
    }

    createRainbowSyncMixedSpinner(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 2,
            durationBase: 2,
            duration: "sync",
            circle: "flat",
            direction: "mixed",
        }, date);
    }

    createRainbowSyncMixedMirrorDelaySpinner(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 3,
            durationBase: 2,
            mirror: true,
            duration: "sync",
            circle: "flat",
            direction: "mixed",
        }, date);
    }

    createRainbowSyncMixedMirrorSpinner(date) {
        this.createSpinner({
            title:date,
            circleCount: 8,
            borderSize: 8,
            delayOffset: 0,
            delayMultiplier: 0,
            durationBase: 2,
            duration: "sync",
            circle: "flat",
            mirror: true,
            direction: "mixed",
        }, date);
    }

    createRainbowAsyncMixedSpinner(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 12,
            borderSize: 5,
            durationBase: 2,
            delayMultiplier: 0.5,
            delayOffset: 1.5,
            duration: "sync",
            circle: "flat",
            direction: "mixed",
        }, date);
    }

    createRainbowAsyncMixedSpinnerHalfBlocky(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 6,
            borderRadius: 35,
            durationBase: 3,
            duration: "sync",
            direction: "mixed",
        }, date);
    }

    createRainbowAsyncSpinnerBlocky(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 40,
            borderSize: 3,
            borderRadius: 1,
            delayMultiplier: 3,
            durationBase: 2,
            delayOffset: 0,
            duration: "sync",
            direction: "clockwise",
        }, date);
    }

    createRainbowAsyncSpinnerBlocky2(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 40,
            borderSize: 3,
            borderRadius: 5,
            delayMultiplier: 2.5,
            durationBase: 2,
            mirror:true,
            delayOffset: 0,
            duration: "sync",
            direction: "clockwise",
        }, date);
    }

    createRainbowAsyncSpinnerBlocky3(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 40,
            borderSize: 3,
            borderRadius: 5,
            delayMultiplier: 2.5,
            durationBase: 2,
            mirror:true,
            delayOffset: 0.3,
            duration: "sync",
            direction: "clockwise",
        }, date);
    }

    createRainbowAsyncSpinnerMixedBlocky(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 6,
            borderRadius: 0,
            durationBase: 2,
            delayOffset: 0,
            duration: "sync",
            direction: "mixed",
        }, date);
    }

    createRainbowWhirpoolSpinner(date) {
        this.createSpinner({
            title:date,
            duration: "sync",
            delayMultiplier: 3,
            delayOffset: 0,
            durationBase: 1.5,
            circleCount: 15,
            borderSize: 10,
        }, date);
    }

    createRainbowAsyncSpinnerMixedBlockyMirror(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 6,
            borderRadius: 0,
            durationBase: 4,
            delayOffset: 0.1,
            mirror: true,
            duration: "sync",
            direction: "mixed",
        }, date);
    }

    createRainbowWhirpoolSpinnerMirror(date) {
        this.createSpinner({
            title:date,
            duration: "sync",
            delayMultiplier: 3,
            delayOffset: 0,
            durationBase: 1.5,
            circleCount: 20,
            mirror: true,
            borderSize: 8,
        }, date);
    }

    createRainbowAsyncSpinnerMixedBlockySlowly(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 6,
            borderRadius: 0,
            delayMultiplier: 8,
            durationBase: 2,
            delayOffset: 0,
            duration: "sync",
            direction: "anticlockwise",
        }, date);
    }

    createRainbowAsyncSpinnerMixedSquare(date) {
        this.createSpinner({
            title:date,
            color: "reverse",
            circleCount: 20,
            borderSize: 10,
            borderRadius: 20,
            delayMultiplier: 0,
            durationBase: 2,
            delayOffset: 0.5,
            duration: "sync",
            direction: "clockwise",
        }, date);
    }

    render() {
        renderDoodle("2022-03-01", (date) => this.createRainbowAsyncSpinner(date));
        renderDoodle("2022-03-02", (date) => this.createRainbowSyncSpinner(date));
        renderDoodle("2022-03-03", (date) => this.createRainbowSyncMixedSpinner(date));
        renderDoodle("2022-03-04", (date) => this.createRainbowAsyncMixedSpinner(date));
        renderDoodle("2022-03-05", (date) => this.createRainbowAsyncMixedSpinnerHalfBlocky(date));
        renderDoodle("2022-03-06", (date) => this.createRainbowAsyncSpinnerBlocky(date));
        renderDoodle("2022-03-07", (date) => this.createRainbowAsyncSpinnerMixedBlocky(date));
        renderDoodle("2022-03-08", (date) => this.createRainbowWhirpoolSpinner(date));
        renderDoodle("2022-03-09", (date) => this.createRainbowAsyncSpinnerMixedBlockySlowly(date));
        renderDoodle("2022-03-10", (date) => this.createRainbowAsyncSpinnerMixedSquare(date));

        renderDoodle("2022-03-13", (date) => this.createRainbowSyncMixedMirrorSpinner(date));
        renderDoodle("2022-03-14", (date) => this.createRainbowSyncMixedMirrorDelaySpinner(date));
        renderDoodle("2022-03-15", (date) => this.createRainbowAsyncMirrorSpinner(date));
        renderDoodle("2022-03-16", (date) => this.createRainbowSyncMirrorSpinner(date));
        renderDoodle("2022-03-17", (date) => this.createRainbowAsyncSpinnerMixedBlockyMirror(date));
        renderDoodle("2022-03-18", (date) => this.createRainbowWhirpoolSpinnerMirror(date));
        renderDoodle("2022-03-19", (date) => this.createRainbowSyncMirrorSpinner2(date));
        renderDoodle("2022-03-20", (date) => this.createRainbowSyncMirrorSpinner3(date));
        renderDoodle("2022-03-21", (date) => this.createRainbowAsyncSpinnerBlocky2(date));
        renderDoodle("2022-03-22", (date) => this.createRainbowAsyncSpinnerBlocky3(date));

    }

    close(){
        for(let curRender of this.renders){
            console.log("SpinnerGenerator", "Removing render Tile:", curRender.id);
            curRender.remove();
        }
    }
}

addGeneratorClass(SpinnerGenerator)
