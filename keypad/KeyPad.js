// import AlignHelper from '../helper/AlignHelper.js';

export class KeyPad extends PIXI.Container {
    // ここで宣言しなくてもよくね？
    static number;
    static style;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor(padSize, number, eventHandler) {
        super();

        this.number = number;
        this.eventHandler = eventHandler;    
        this.container = new PIXI.Container();
        this.addChild(this.container);
        
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
        this.number = new PIXI.Text(this.number, this.style);
        this.number.anchor.set(0.5);
        this.number.x = padSize / 2;
        this.number.y = padSize / 2;
        this.number.alpha = 0.5;
        this.container.addChild(this.number);
        // ボタンイベント
        this.container.interactive = true;
        this.container.on('click', () => {
            console.log(number);
            eventHandler(number);
        });
        this.container.on('click', this.clickHandler.bind(this));
        this.container.on('touchstart', this.clickHandler.bind(this));
    }

    clickHandler(event){
        // this.container.interactive = false;
        this.style.fontWeight = 200;
        this.number.scale.x = 1.5;
        this.number.scale.y = 1.5;
        this.number.alpha = 1;
        gsap.to(this.number.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});

        this.backgroundContainer.alpha = 0.05;
        this.backgroundContainer.scale.x = 2;
        this.backgroundContainer.scale.y = 2;
        gsap.to(this.backgroundContainer.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});
        gsap.to(this.backgroundContainer, {alpha:0, duration:0.8})
        

        console.log("W");
    }

}