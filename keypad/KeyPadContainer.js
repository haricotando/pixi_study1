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
        background.drawRect(0, 0, 2, this.padSize*2 + 30);
        background.endFill();
        this.addChild(background);

        // KeyPad作成
        let padMargin = 8;
        for(let i=0; i<10; i++){
            let pad = new KeyPad(this.padSize, i);
            this.addChild(pad);
            // 配置調整
            
            pad.x = i*(this.padSize + padMargin);
            if(i>4){
                pad.y = this.padSize + padMargin;
                pad.x = (i-5)*(this.padSize + padMargin);
            }
            this.keyPadList.push(pad);
        }
    }

    inactiveByLimit4(){
        for(let i=0; i<10; i++){
            this.keyPadList[i].mute();
        }
    }

    resetKeyPads(){
        for(let i=0; i<10; i++){
            this.keyPadList[i].revibe();
        }
    }
}
