import GraphicsHelper from './helper/GraphicsHelper.js';
import { dataProvider } from './dataProvider.js';

export class KeyPad extends PIXI.Container {
    /* ============================================================
        Constructor
    ============================================================ */
    constructor(number) {
        super();

        this.number = number;
        let padSize = dataProvider.data.padSize;
        this.bg = GraphicsHelper.exDrawRect(0, 0, padSize, padSize, 0x000000);
        this.bg.pivot.set(this.bg.width/2, this.bg.height/2);
        this.bg.x = this.bg.width/2;
        this.bg.y = this.bg.height/2;
        this.bg.alpha = 0;
        this.addChild(this.bg);

        // Pad
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.pad = new PIXI.Text(number, this.style);
        this.pad.anchor.set(0.5);
        this.pad.x = dataProvider.data.padSize / 2;
        this.pad.y = dataProvider.data.padSize / 2;
        this.addChild(this.pad);

        this.interactive = true;
        this.on('touchstart', (event) => {
            this.clickHandler(event);
        });
    }

    /* ------------------------------------------------------------
        KeyPadContainer / KeyPads
    ------------------------------------------------------------ */
    clickHandler(event){
        this.parent.parent.onGuessHandler(this.number);
        this.interactive = false;
        this.style.fontWeight = 200;
        this.pad.scale.x = 1.5;
        this.pad.scale.y = 1.5;
        this.pad.alpha = 1;
        gsap.to(this.pad.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});

        this.bg.alpha = 0.05;
        this.bg.scale.x = 2;
        this.bg.scale.y = 2;
        gsap.to(this.bg.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});
        gsap.to(this.bg, {alpha:0.05, duration:0.8})
    }



    mute(){
        this.interactive = false;
        gsap.killTweensOf(this.pad);
        gsap.killTweensOf(this.bg);
    }

    
    revibe(){
        this.interactive = true;
        this.style.fontWeight = 100;
        gsap.killTweensOf(this.pad);
        gsap.killTweensOf(this.bg);
        this.pad.scale.x = 1;
        this.pad.scale.y = 1;
        this.bg.alpha = 0;
        this.bg.scale.x = 1;
        this.bg.scale.y = 1;

    }

}








/*

export class KeyPad extends PIXI.Container {
    constructor(padSize, number) {
        super();
        this.number = number
        
        // 背景作成
        this.backgroundContainer = new PIXI.Sprite();
        this.addChild(this.backgroundContainer);
        let background = new PIXI.Graphics();
        background.beginFill(0x000000);
        background.drawRect(0, 0, padSize, padSize);
        background.endFill();
        background.x = 0 - padSize/2;
        background.y = 0 - padSize/2;
        this.backgroundContainer.alpha = 0;
        this.backgroundContainer.x = padSize/2;
        this.backgroundContainer.y = padSize/2;
        this.backgroundContainer.addChild(background);
    
        // 数字
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.numberText = new PIXI.Text(this.number, this.style);
        this.numberText.anchor.set(0.5);
        this.numberText.x = padSize / 2;
        this.numberText.y = padSize / 2;
        // this.numberText.alpha = 0.5;
        this.addChild(this.numberText);
        // ボタンイベント
        this.interactive = true;
        this.on('touchstart', (event) => {
            this.clickHandler(event);
        });
    }

    clickHandler(event){
        // this.parent.parent.onGuessHandler(this.number);
        // this.interactive = false;
        this.style.fontWeight = 200;
        this.numberText.scale.x = 1.5;
        this.numberText.scale.y = 1.5;
        // this.numberText.alpha = 1;
        gsap.to(this.numberText.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});

        this.backgroundContainer.alpha = 0.05;
        this.backgroundContainer.scale.x = 2;
        this.backgroundContainer.scale.y = 2;
        gsap.to(this.backgroundContainer.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});
        gsap.to(this.backgroundContainer, {alpha:0.05, duration:0.8})
    }

    // mute(){
    //     this.interactive = false;
    //     gsap.killTweensOf(this.numberText);
    //     gsap.killTweensOf(this.backgroundContainer);
    // }

    
    // revibe(){
    //     this.interactive = true;
    //     this.style.fontWeight = 100;
    //     gsap.killTweensOf(this.numberText);
    //     gsap.killTweensOf(this.backgroundContainer);
    //     this.numberText.scale.x = 1;
    //     this.numberText.scale.y = 1;
    //     this.backgroundContainer.alpha = 0;
    //     this.backgroundContainer.scale.x = 1;
    //     this.backgroundContainer.scale.y = 1;

    // }

}*/