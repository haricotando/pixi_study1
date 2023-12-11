import { dataProvider } from '../DataProvider.js';
// import AlignHelper from '../helper/AlignHelper.js';

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
    /* ------------------------------------------------------------
        正解時の演出
    ------------------------------------------------------------ */
    guessMatch(answer){

        this.addAttemptLog(answer, 'match');

        this.circle1 = new PIXI.Graphics();
        this.addChild(this.circle1);
        this.circle1.beginFill(0x00FFFF);
        this.circle1.drawCircle(0, 0, 200);
        this.circle1.y = 500;
        this.circle1.scale.x = 0.1;
        this.circle1.scale.y = 0.1;
        gsap.timeline().to(this.circle1.scale, {x:1.5, y:1.5, duration:0.35, ease:'back'});

        this.circle = new PIXI.Graphics();
        this.addChild(this.circle);
        this.circle.beginFill(0x000000);
        this.circle.drawCircle(0, 0, 200);
        this.circle.y = 500;
        this.circle.scale.x = 0.1;
        this.circle.scale.y = 0.1;
        gsap.timeline().to(this.circle.scale, {x:1.5, y:1.5, duration:0.4, ease:'back'});

        // result
        this.styleMatch = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize,
            fontWeight:     200,
            fill:           'white',
        });

        this.txtAnswer = new PIXI.Text('Match!', this.styleMatch);
        this.txtAnswer.anchor.set(0.5);
        this.txtAnswer.y = 500;
        this.txtAnswer.scale.x = 0.1;
        this.txtAnswer.scale.y = 0.1;
        gsap.timeline().to(this.txtAnswer.scale, {x:1, y:1, duration:0.3, ease:'back'}, '+=0.1');
        this.addChild(this.txtAnswer);

        gsap.timeline()
            .to(this.styleMatch, {duration:0.1, fill:'yellow', ease:'steps(1)'}, '+=0.1')
            .to(this.styleMatch, {duration:0.1, fill:'purple', ease:'steps(1)'})
            .to(this.styleMatch, {duration:0.1, fill:'blue', ease:'steps(1)'})
            .to(this.styleMatch, {duration:0.2, fill:'cyan'})
            .to(this.styleMatch, {duration:0.2, fill:'white'})
    }

    /* ------------------------------------------------------------
    addlog
    ------------------------------------------------------------ */
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
    }    
}