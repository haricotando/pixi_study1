import { KeyPad } from './KeyPad.js';
import { dataProvider } from '../DataProvider.js';
import AlignHelper from '../helper/AlignHelper.js';

export class KeyPadContainer extends PIXI.Container {
    static background;
    static keyPadList;
    static baseY;
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
        // let background = new PIXI.Graphics();
        // background.beginFill(0xFFFF00);
        // background.drawRect(0, 0, dataProvider.data.padSize*5, dataProvider.data.padSize*2 + 30);
        // background.endFill();
        // this.addChild(background);

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
        this.pivot.set(this.width / 2, this.height / 2);
        this.x = window.innerWidth/2;
        this.visible = false;
        // this.start();
    }

    start(){
        this.visible = true;
        let destY = window.innerHeight - this.height/2 - 30;
        this.y = window.innerHeight + 500;
        this.scale.x = 3;
        this.scale.y = 3;
        gsap.timeline().to(this.scale, {x:1, y:1, duration:1, ease:'power1.out'})
        gsap.timeline().to(this, {y: destY, duration:0.8, ease:'power3.out'}, '+=0.3')
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
