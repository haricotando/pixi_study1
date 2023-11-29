import { KeyPad } from './KeyPad.js';

export class KeyPadContainer extends PIXI.Container {
    static background;
    static keyPadList;

    static uiContainer;
    static submitBtn;
    static deleteBtn;
    // logics
    static attempt;
    static currentGuess;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor() {
        super();
        this.init();
    }

    init(){
        this.keyPadList = [];
        // 背景・マージン作成
        let background = new PIXI.Graphics();
        background.beginFill(0xFFFFFF);
        background.drawRect(0, 0, 100, 400);
        background.endFill();
        this.addChild(background);

        // KeyPad作成
        let padSize = 180;
        let padMargin = 8;
        for(let i=0; i<10; i++){
            let pad = new KeyPad(padSize, i+1);
            this.addChild(pad);
            pad.x = i*(padSize + padMargin);
            if(i>4){
                pad.y = padSize + padMargin;
                pad.x = (i-5)*(padSize + padMargin);
            }
            this.keyPadList.push(pad);
        }

        this.uiContainer = new PIXI.Container();
        // Submit / Delete
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 180,
            fill: 'black',
        });
        let char = new PIXI.Text('arrow_upward', style);
        // this.addChild(char);
        

        this.submitBtn = new PIXI.Sprite();
        this.addChild(this.submitBtn);
        
        // this.number = new PIXI.Text(this.number, style);
    }

    resetTry(){
        this.attempt = 0;
        this.currentGuess = "";
    }
}
