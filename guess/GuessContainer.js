import { dataProvider } from '../DataProvider.js';
import AlignHelper from '../helper/AlignHelper.js';

export class GuessContainer extends PIXI.Container {
    static background;
    static guessText;
    static btnBackspace;
    static stateBackspace;
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();
        this.init();
    }

    init(){
        // 背景・マージン作成
        // let background = new PIXI.Graphics();
        // background.beginFill(0xFFFF00);
        // background.drawRect(0, 0, 10, dataProvider.data.padSize + 30);
        // background.endFill();
        // this.addChild(background);
        
        // GuessContainer
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.number = new PIXI.Text('****', this.style);
        this.number.anchor.set(0, 0)
        this.addChild(this.number);

        // BackSpace
        this.btnBackspace = new PIXI.Sprite();
        this.addChild(this.btnBackspace);
        this.btnBackspace.interactive = true;
        this.btnBackspace.visible = false;
        this.stateBackspace = false;
        
        let btnLabel = new PIXI.Text('X', this.style);
        this.btnBackspace.addChild(btnLabel);
        this.btnBackspace.x = -150;
        
        this.btnBackspace.on('touchstart', (event) => {
            this.parent.guessResetHandler();
        });
        
        // Submit
        this.btnSubmit = new PIXI.Sprite();
        this.addChild(this.btnSubmit);
        this.btnSubmit.interactive = true;
        this.btnSubmit.visible = false;

        let btnLabelSubmit = new PIXI.Text('↑', this.style);
        this.btnSubmit.addChild(btnLabelSubmit);
        this.btnSubmit.x = 400;
        
        this.btnSubmit.on('touchstart', (event) => {
            this.parent.guessSubmitHandler();
        });


        this.pivot.set(this.width / 2, this.height / 2);
        this.x = window.innerWidth/2;
        let destY = window.innerHeight - this.height/2 - 30;
        this.y = window.innerHeight - 500;
    }

    onInput(){
        this.number.y = 100;
        gsap.to(this.number, {y: 0, duration: 0.25, ease: 'elastic.out(1,0.3)'});
    }

    switchBackspace(bool){
        this.btnBackspace.visible = bool;
        this.btnBackspace.stateBackspace = bool;
    }

    switchSubmit(bool){
        this.btnSubmit.visible = bool;
    }
}