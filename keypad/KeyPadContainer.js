import { KeyPad } from './KeyPad.js';
import { dataProvider } from '../DataProvider.js';
// import AlignHelper from '../helper/AlignHelper.js';

export class KeyPadContainer extends PIXI.Container {
    static background;
    static keyPadList;
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
        background.beginFill(0xFF0000);
        background.drawRect(0, 0, 2, dataProvider.data.padSize*2 + 30);
        background.endFill();
        this.addChild(background);

        // KeyPad作成
        let padMargin = 8;
        let valueIndex = 0;
        for(let i=0; i<10; i++){
            
            let pad = new KeyPad(dataProvider.data.padSize, i==9?0:i+1);
            this.addChild(pad);
            // 配置調整
            
            pad.x = i*(dataProvider.data.padSize + padMargin);
            if(i>4){
                pad.y = dataProvider.data.padSize + padMargin;
                pad.x = (i-5)*(dataProvider.data.padSize + padMargin);
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
