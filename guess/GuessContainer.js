export class GuessContainer extends PIXI.Container {
    static background;
    static guessText;
    static btnBackspace;
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();
        this.padSize = 180;
        this.init();
    }

    init(){
        // 背景・マージン作成
        let background = new PIXI.Graphics();
        background.beginFill(0xFFFF00);
        background.drawRect(0, 0, 10, this.padSize + 30);
        background.endFill();
        this.addChild(background);
        
        // GuessContainer
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       this.padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.number = new PIXI.Text('****', this.style);
        this.addChild(this.number);

        // BackSpace
        this.btnBackspace = new PIXI.Sprite();
        this.addChild(this.btnBackspace);
        this.btnBackspace.interactive = true;

        let btnLabel = new PIXI.Text('X', this.style);
        this.btnBackspace.addChild(btnLabel);
        this.btnBackspace.y = 140;

        this.btnBackspace.on('touchstart', (event) => {
            this.parent.guessResetHandler();
        });

        // Submit
        this.btnSubmit = new PIXI.Sprite();
        this.addChild(this.btnSubmit);
        this.btnSubmit.interactive = true;

        let btnLabelSubmit = new PIXI.Text('↑', this.style);
        this.btnSubmit.addChild(btnLabelSubmit);
        this.btnSubmit.x = 400;
        
        this.btnSubmit.on('touchstart', (event) => {
            this.parent.guessSubmitHandler();
        });



    }

}