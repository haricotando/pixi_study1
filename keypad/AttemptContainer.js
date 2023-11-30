export class AttempContainer extends PIXI.Container {

    constructor(){
        super();
        this.padSize = 180;
         // 背景・マージン作成
         let background = new PIXI.Graphics();
         background.beginFill(0xFF0000);
         background.drawRect(0, 0, 100, 100);
         background.endFill();
         this.addChild(background);

         this.attachNum(2);
         this.addChild(this.number)
         
    }

    attachNum(num){
        // 数字
        this.style = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       this.padSize * 0.8,
            fontWeight:     100,
            fill:           'black',
        });
        this.number = new PIXI.Text(num, this.style);
        this.number.anchor.set(0.5);
        // this.number.x = this.padSize / 2;
        // this.number.y = this.padSize / 2;
        
        // this.number.alpha = 0.5;
        // this.addChild(this.number);

    }
}