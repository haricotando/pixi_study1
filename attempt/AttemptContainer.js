export class AttemptContainer extends PIXI.Container {
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
        background.drawRect(0, 0, 20, 20);
        background.endFill();
        this.addChild(background);
    }

    addAttemptLog(guess, result){
        let container = new PIXI.Container();
        // Guess
        let guessStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       80,
            fontWeight:     100,
            fill:           'black',
        });
        this.numberText = new PIXI.Text(guess + '->' + result, guessStyle);
        this.numberText.anchor.set(0.5);
        // this.numberText.x = padSize / 2;
        // this.numberText.y = padSize / 2;
        // this.numberText.alpha = 0.5;
        container.addChild(this.numberText);

        this.addChild(container);
        this.attemptCount ++;

        container.y = 1000;
        gsap.to(container, {y: this.attemptCount * 100, duration: 0.3, ease: 'elastic.out(1,1)'});
        container.scale.x = 0.1;
        container.scale.y = 0.1;
        gsap.to(container.scale, {x:1, y: 1, duration: 0.3, ease: 'elastic.out(1,1)'});
        // container.y = this.attemptCount * 100;
    }    
}