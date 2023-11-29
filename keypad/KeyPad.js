import AlignHelper from '../helper/AlignHelper.js';

export class KeyPad extends PIXI.Container {
    static container;
    static background;
    // static numContainer;
    static number;

    static padSize;

    /* ============================================================
        Constructor
    ============================================================ */
    constructor(_padSize, _number) {
        super();
        this.padSize = _padSize;
        this.number = _number;
        this.init();
    }

    init(){
        this.container = new PIXI.Container();
        this.addChild(this.container);
        

        // 背景作成
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, this.padSize, this.padSize);
        
        this.background.endFill();
        this.background.alpha = 0;
        this.container.addChild(this.background);

        // 数字
        const style = new PIXI.TextStyle({
            fontFamily: 'Inter',
            fontSize: this.padSize * 0.8,
            fill: 'black',
        });
        this.number = new PIXI.Text(this.number, style);
        this.number.anchor.set(0.5);
        this.number.x = this.padSize / 2;
        this.number.y = this.padSize / 2;
        this.container.addChild(this.number);
    
        this.setEvent();
    }

/* ------------------------------------------------------------
    イベント諸々
------------------------------------------------------------ */
    setEvent(){
        this.container.interactive = true;
        this.container.on('click', this.clickHandler.bind(this));
        this.container.on('touchend', this.clickHandler.bind(this));
    }

    clickHandler(event){
        this.background.alpha = 0.05;
        this.container.interactive = false;
        // this.background.scale.x = 1.1;
        // this.background.scale.y = 1.1;
        this.number.scale.x = 0.8
        this.number.scale.y = 0.8
        gsap.to(this.number.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});
        console.log("W");
    }

}