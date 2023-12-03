// import AlignHelper from '../helper/AlignHelper.js';

export class KeyPad extends PIXI.Container {
    // ここで宣言しなくてもよくね？
    static number;
    static style;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor(padSize, number) {
        super();
        this.number = number
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
        this.numberText = new PIXI.Text(this.number, this.style);
        this.numberText.anchor.set(0.5);
        this.numberText.x = padSize / 2;
        this.numberText.y = padSize / 2;
        this.numberText.alpha = 0.5;
        this.container.addChild(this.numberText);
        // ボタンイベント
        this.container.interactive = true;
        this.container.on('touchstart', (event) => {
            this.clickHandler(event);
        });
        // this.container.on('click', this.clickHandler.bind(this));
        // this.container.on('touchstart', this.clickHandler.bind(this));
    }

    clickHandler(event){
        this.parent.parent.onGuessHandler(this.number)
        console.log('------------------------------------------------\nKeyPad>clickHander: ');
        this.style.fontWeight = 200;
        this.numberText.scale.x = 1.5;
        this.numberText.scale.y = 1.5;
        this.numberText.alpha = 1;
        gsap.to(this.numberText.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});

        this.backgroundContainer.alpha = 0.05;
        this.backgroundContainer.scale.x = 2;
        this.backgroundContainer.scale.y = 2;
        gsap.to(this.backgroundContainer.scale, {x: 1, y: 1, duration: 0.25, ease: 'back'});
        gsap.to(this.backgroundContainer, {alpha:0.05, duration:0.8})
    }

}