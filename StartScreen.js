export class StartScreen extends PIXI.Container {
    static background;
    /* ============================================================
        Constructor
    ============================================================ */
    constructor() {
        super();

        this.background = new PIXI.Graphics();
        

        this.background.lineStyle(2, 0xFF0000);
        this.background.beginFill(0x00FF00);
        this.background.drawRect(50, 50, 200, 100);
        this.background.endFill();
        
        this.addChild(this.background);
    }
}