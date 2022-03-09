class progressbarGenerator {
    updaters = [];
    updaterInterval = null;

    progressBarValue = 0;
    progressBarDirection = true;

    renders = [];

    constructor() {
        this.updaterInterval = setInterval(() => this.progressBarValueChange(), 200);
    }

    progressBarValueChange() {
        if(this.progressBarDirection) {
            this.progressBarValue += 1;
            if(this.progressBarValue > 100){
                this.progressBarDirection = false;
                this.progressBarValue = 100;
            }
        }
        else {
            this.progressBarValue -= 1;
            if(this.progressBarValue < 0){
                this.progressBarDirection = true;
                this.progressBarValue = 0;
            }
        }

        this.updaters.forEach(cb => cb(this.progressBarValue));
    }

    segments(segments, height, width, borderWidth){
        if(segments){
            if(segments === "dynamic"){
                return Math.floor(width / (height + borderWidth * 2));
            }

            return segments;
        }

        return height;
    }

    generateSegment(size, borderRadius){
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
    }

    generateContainer(){
        const containerDiv = document.createElement("div");

        containerDiv.style.width = "100%";
        containerDiv.style.whiteSpace = "nowrap";

        return containerDiv;
    }

    renderProgressBar (params){
        const borderRadius = params.borderRadius ?? 10;
        const borderWidth = params.borderWidth ?? 1;
        const height = params.height ?? 50;
        const segments = this.segments(params.segments, height, params.maxSize, borderWidth);

        const container = this.generateContainer();

        const segmentsArr = []

        for(let i = 0; i < segments; i++){
            const newSeg = this.generateSegment(height, borderRadius);
            segmentsArr.push(newSeg);
            container.appendChild(newSeg);
        }

        params.container.appendChild(container);

        return (value) => {
            const curSeg = Math.floor(value / (100 / segments));

            const minSegValue = Math.floor(curSeg * (100 / segments));
            const maxSegValue = Math.floor((curSeg + 1) * (100 / segments));

            const segPercentage = (value - minSegValue) / (maxSegValue - minSegValue);

            const light = 100 - (50 * segPercentage).toFixed(2);
            const lightStop = 100 - (70 * segPercentage).toFixed(2);
            const lightStart = 100 - (20 * segPercentage).toFixed(2);

            segmentsArr[curSeg].style.background = `linear-gradient(hsl(100deg, 50%, ${lightStart}%) 20%, hsl(100deg, 50%, ${light}%), hsl(100deg, 50%, ${lightStop}%)) 20%`;
            // console.log(value, minSegValue, maxSegValue, curSeg, segPercentage);
        }
    }

    oldSchoolSandbox(params){
        const newTile = AddTile(params.title ?? "ProgressBar");
        const bBox = newTile.getBoundingClientRect();

        const container = this.generateContainer();

        const segments = 5;

        const segmentWidth = bBox.width / segments;

        const segArr = [];

        for(let seg = 0; seg < segments; seg ++){
            const segDiv = document.createElement("div");

            segDiv.style.width = segmentWidth + "px";
            segDiv.style.height = segmentWidth + "px";

            segDiv.style.display = "inline-block";

            // segDiv.style.border = "1px solid black";

            container.appendChild(segDiv);
            segArr.push(segDiv);
        }

        const drawBars = (segmentItem, perc) => {
            const bars = Math.ceil(perc * segments);
            if(segmentItem.children.length === bars){
                return;
            }

            if(segmentItem.children.length > bars){
                while(segmentItem.children.length > bars){
                    const lastBarChild = [...segmentItem.children].pop();
                    lastBarChild.remove();
                }
                return;
            }

            const generateBar = (pos) => {
                const bar = document.createElement("div");
                bar.style.width = "20%";
                bar.style.display = "inline-block";
                bar.style.height = "100%";
                bar.style.background = `linear-gradient(hsl(200deg, 50%, ${60}%) 20%, hsl(200deg, 50%, ${40}%), hsl(200deg, 50%, ${30}%)) 20%`;
                return bar;
            }

            while(segmentItem.children.length < bars){
                segmentItem.appendChild(generateBar(segmentItem.children.length));
            }
        }

        const updater = (value) => {
            const curSeg = Math.floor(value / (100 / segments));

            const minSegValue = Math.floor(curSeg * (100 / segments));
            const maxSegValue = Math.floor((curSeg + 1) * (100 / segments));

            const segPercentage = (value - minSegValue) / (maxSegValue - minSegValue);

            // console.log(value, minSegValue, maxSegValue, curSeg, segPercentage);
            drawBars(segArr[curSeg], segPercentage);
        }

        container.style.borderRadius = "10px";
        container.style.overflow = "hidden";
        container.style.backgroundColor = "#ffffff";
        container.style.textAlign = "left";

        newTile.appendChild(container);

        newTile.id = "ProgressBar_" + (params.title ?? "Unknown");
        this.renders.push(newTile);

        return updater;
    }

    createProgressBar(params) {
        const newTile = AddTile(params.title ?? "ProgressBar");
        const bBox = newTile.getBoundingClientRect();

        const updater = this.renderProgressBar({container: newTile, maxSize: bBox.width, ...params});

        newTile.id = "ProgressBar_" + (params.title ?? "Unknown");
        this.renders.push(newTile);

        return updater;
    }

    createSegmentProgressBar(date){
        const updater = this.createProgressBar({
            title: date,
            height: 25,
            borderRadius: 3,
            segments: "dynamic",
        });

        this.updaters.push(updater);
    }

    createOldSchoolProgressBar(date){
        const updater = this.oldSchoolSandbox({
            title: date,
        })
        this.updaters.push(updater);
    }

    render() {
        dateChecker("2022-03-11", (date) => this.createSegmentProgressBar(date));
        dateChecker("2022-03-12", (date) => this.createOldSchoolProgressBar(date));
    }

    close(){
        clearInterval(this.updaterInterval)
        for(let curRender of this.renders){
            console.log("ProgressBarGenerator", "Removing render Tile:", curRender.id);
            curRender.remove();
        }
    }
}

addGeneratorClass(progressbarGenerator);