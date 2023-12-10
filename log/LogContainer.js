import AlignHelper from '../helper/AlignHelper.js';

export class LogContainer extends PIXI.Container {
    static attemptCount;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor() {
        super();
        this.attemptCount = 0;
        this.init();
    }

    init(){
        // 背景・マージン作成
        let background = new PIXI.Graphics();
        background.beginFill(0xFFAA00);
        background.drawRect(0, 0, 10, 10);
        background.endFill();
        this.addChild(background);

        this.pivot.set(this.width / 2, this.height / 2);
        this.x = window.innerWidth/2;
        let destY = window.innerHeight - this.height/2 - 30;
    }

    addAttemptLog(guess, result, isNoMatch){
        let txtStyleLog = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       80,
            fontWeight:     200,
            fill:           'black',
        });
        let txtLog = new PIXI.Text(guess + '->' + result, txtStyleLog);
        txtLog.anchor.set(0.5);
        this.addChild(txtLog);
        // container.addChild(this.numberText);

        this.attemptCount ++;

        txtLog.y = 1000;
        gsap.to(txtLog, {y: this.attemptCount * 100, duration: 0.3, ease: 'elastic.out(1,1)'});
        txtLog.scale.x = 0.1;
        txtLog.scale.y = 0.1;
        gsap.to(txtLog.scale, {x:1, y: 1, duration: 0.3, ease: 'elastic.out(1,1)'});

        if(isNoMatch){
            txtStyleLog.letterSpacing = 50;
            gsap.to(txtStyleLog, {letterSpacing:0, duration:0.4, ease:'back'})
            gsap.timeline()
                .to(txtStyleLog, {duration:0.1, fill:'yellow', ease:'steps(1)'})
                .to(txtStyleLog, {duration:0.1, fill:'purple', ease:'steps(1)'})
                .to(txtStyleLog, {duration:0.1, fill:'blue', ease:'steps(1)'})
                .to(txtStyleLog, {duration:0.2, fill:'cyan'})
                .to(txtStyleLog, {duration:0.2, fill:'black'})
        }










        // let container = new PIXI.Container();
        // // Guess
        // let guessStyle = new PIXI.TextStyle({
        //     fontFamily:     'Inter',
        //     fontSize:       80,
        //     fontWeight:     200,
        //     fill:           'black',
        // });
        // this.numberText = new PIXI.Text(guess + '->' + result, guessStyle);
        // this.numberText.anchor.set(0.5);
        // container.addChild(this.numberText);

        // this.addChild(container);
        // this.attemptCount ++;

        // container.y = 1000;
        // gsap.to(container, {y: this.attemptCount * 100, duration: 0.3, ease: 'elastic.out(1,1)'});
        // container.scale.x = 0.1;
        // container.scale.y = 0.1;
        // gsap.to(container.scale, {x:1, y: 1, duration: 0.3, ease: 'elastic.out(1,1)'});
    }    
}