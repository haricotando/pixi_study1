import AlignHelper from './AlignHelper.js';

export class KeyPad extends PIXI.Container {
    static container;
    static number;
    static padSize;
    static background;

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
        this.background.beginFill(0xFFFFFF);
        this.background.drawCircle(this.padSize/2, this.padSize/2, this.padSize/2);
        this.background.endFill();
        this.container.addChild(this.background);

        const style = new PIXI.TextStyle({
            fontFamily: 'Inter',
            fontSize: this.padSize * 0.7,
            fill: 'black',
        });

        this.number = new PIXI.Text(this.number, style);
        this.container.addChild(this.number);
        
        this.setEvent();
        AlignHelper.center(this.background, this.number);
    }

    setBackground(){

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
        this.background.alpha = 0.5;
        // let next = Math.floor(Math.random() * 100);
        // this.number.text = next;
        // AlignHelper.center(this.background,this.number);

    }

}