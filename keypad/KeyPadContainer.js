import { KeyPad } from './KeyPad.js';
// import AlignHelper from '../helper/AlignHelper.js';

export class KeyPadContainer extends PIXI.Container {
    static background;
    static keyPadList;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor() {
        super();
        this.padSize = 180;
        this.init();
    }

    init(){
        this.keyPadList = [];
        // 背景・マージン作成
        let background = new PIXI.Graphics();
        background.beginFill(0xFF0000);
        background.drawRect(0, 0, 10, this.padSize*2 + 30);
        background.endFill();
        this.addChild(background);

        // KeyPad作成
        let padMargin = 8;
        for(let i=0; i<10; i++){
            let pad = new KeyPad(this.padSize, i+1, this.onButtonClick.bind(this));
            this.addChild(pad);
            pad.x = i*(this.padSize + padMargin);
            if(i>4){
                pad.y = this.padSize + padMargin;
                pad.x = (i-5)*(this.padSize + padMargin);
            }
            this.keyPadList.push(pad);
        }

        
    }

    onButtonClick(number) {
        this.parent.onKeyPad(number);
        // console.log(`Clicked number: ${number}`);
        // if(this.attempt<4){
        //     this.attempt ++;
        //     this.guess = new GuessNumber().attachNum(number);
        //     this.addChild(this.guess);
        //     this.guess.x = this.padSize * this.attempt;
        //     AlignHelper.bottom(parent, this);
        //     // this.guess.attachNum(number);
        // }else{

        // }

    }
}
