export class GuessContainer extends PIXI.Container {
    static background;
    static guessText;
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();
        this.padSize = 180;
        this.init();
    }

    init(){
        console.log('guessCCCC');
        this.keyPadList = [];
        // 背景・マージン作成
        let background = new PIXI.Graphics();
        background.beginFill(0xFFFF00);
        background.drawRect(0, 0, 10, this.padSize + 30);
        background.endFill();
        this.addChild(background);
        
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       this.padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.number = new PIXI.Text('****', this.style);
        // this.number.anchor.set(0.5);
        this.addChild(this.number);

    }

    // guess(attempt, number){
    //     let num = new GuessNumber(number);
    //     this.addChild(num);
    //     num.x = this.padSize * attempt;
    //     // console.log(num.x)
    //     // AlignHelper.bottom(parent, this);
    //     // this.guess.attachNum(number);
    // }
    work(){
        console.log('wok');
    }
}