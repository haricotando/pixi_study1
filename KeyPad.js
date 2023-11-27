import AlignHelper from './AlignHelper.js';

export class KeyPad extends PIXI.Container {
    static container;
    static background;
    static numContainer;
    static number;

    static padSize;

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
        this.background.drawRect(0-this.padSize/2, 0-this.padSize/2, this.padSize, this.padSize);
        this.background.x = this.padSize/2;
        this.background.y = this.padSize/2;
        // this.background.drawCircle(this.padSize/2, this.padSize/2, this.padSize/2);
        this.background.endFill();
        this.background.alpha = 0;
        this.container.addChild(this.background);

        // 数字
        this.numContainer = new PIXI.Container();
        this.container.addChild(this.numContainer);
        let g = new PIXI.Graphics();
        g.beginFill(0xFF0000);
        g.drawRect(0-this.padSize/2, 0-this.padSize/2, this.padSize, this.padSize);
        g.endFill();
        g.x = this.padSize/2;
        g.y = this.padSize/2;
        this.numContainer.addChild(g);

        


        const style = new PIXI.TextStyle({
            fontFamily: 'Inter',
            fontSize: this.padSize * 0.7,
            fill: 'black',
        });

        this.number = new PIXI.Text(this.number, style);
        this.numContainer.addChild(this.number);

        AlignHelper.center(this.numContainer, this.number);
        
        this.setEvent();
        AlignHelper.center(this.background, this.numContainer);
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
        this.background.alpha = 0.1;
        this.container.interactive = false;
        this.background.scale.x = 1.1;
        this.background.scale.y = 1.1;
        gsap.to(this.background.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});

        gsap.to(this.numContainer.scale, {x: 0.8, y: 0.8, duration: 0.25, ease: 'back'});

        this.number.alpha = 0.5;
        console.log("W");
    }

}