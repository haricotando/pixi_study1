import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { dataProvider } from './dataProvider.js';

export class EndScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor(isMatch) {
        super();
        if(isMatch){
            this.match();
        }else{
            this.gameover();
        }
    }

    /* ------------------------------------------------------------
        正解時の演出スタート
    ------------------------------------------------------------ */
    match(){
        this.initBG();        
        // ===== Circle FX =====
        this.circleFX(0xFFFF00, 0.3, 0.3, 'back.out(3)', 1);
        this.circleFX(0xFF00FF, 0.3, 0.32, 'back.out(2)', 1);
        this.circleFX(0x00FFFF, 0.3, 0.24, 'back.out(1)', 1);
        this.circleBG = this.circleFX(0xFFFFFF, 0.4, 0.4, 'expo', 1);
        this.circleBG = this.circleFX(0x000000, 0.16, 0.6, 'expo', 0);

        // ===== Guess =====
        this.guessStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 1.5,
            fontWeight:     200,
            fill:           'white',
        });
        
        this.guessText = new PIXI.Text(dataProvider.data.lastGuess, this.guessStyle);
        this.guessText.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.guessText);
        this.guessText.y = window.innerHeight/2;
        this.addChild(this.guessText);
        
        this.guessText.scale.set(0.1);
        this.guessText.alpha = 0;
        gsap.timeline().to(this.guessText, {alpha:1, duration:0.5}, '+=0.5');
        gsap.timeline().to(this.guessText.scale, {x:1, y:1, duration:0.6, ease:'back'}, '+=0.5');
        this.guessStyle.letterSpacing = 200;
        gsap.timeline().to(this.guessStyle, {letterSpacing:0, duration:0.6, ease:'expo'}, '+=0.55');
        
        // ===== Text =====
        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 0.7,
            fontWeight:     600,
            fill:           'white',
        });

        this.titleText = new PIXI.Text('Match!', this.titleStyle);
        this.titleText.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.titleText);
        this.titleText.y = window.innerHeight/2;
        this.titleText.alpha = 0;
        this.titleText.scale.set(0.1);
        this.addChild(this.titleText);
        gsap.timeline().to(this.titleText, {alpha:1, duration:0.5}, '+=0.5');
        gsap.timeline().to(this.titleText.scale, {x:1, y:1, duration:0.5, ease:'expo'}, '+=0.6');
        gsap.timeline().to(this.titleText, {y:window.innerHeight/2-250, duration:0.5, ease:'back'}, '+=0.3');

        // ===== Retry =====
        this.btnStyle = new PIXI.TextStyle({
            fontFamily:     'Material Icons',
            fontSize:       dataProvider.data.padSize * 1,
            fontWeight:     200,
            fill:           'white',
        });
        
        this.retryBtn = new PIXI.Text('\ue042', this.btnStyle);
        this.addChild(this.retryBtn);
        this.retryBtn.interactive = true;
        this.retryBtn.anchor.set(0.5);
        this.retryBtn.x = window.innerWidth / 2;
        this.retryBtn.y = window.innerHeight / 2;
        this.retryBtn.scale.set(0.1);
        this.retryBtn.alpha = 0;
        gsap.timeline().to(this.retryBtn, {alpha:1, duration:0.3}, '+=0.5');
        gsap.timeline().to(this.retryBtn, {y:window.innerHeight / 2+300, duration:0.5, ease:'back'}, '+=0.5');
        gsap.timeline().to(this.retryBtn.scale, {x:1, y:1, duration:0.5, ease:'back.out(3)'}, '+=0.7');

        // ===== Retry touch event =====
        this.retryBtn.on('touchstart', (event) => {
            this.retryBtn.interactive = false;
            this.retryBtn.visible =false;
            this.readyToDie(true);
        });

    }

    /* ------------------------------------------------------------
        汎用エフェクト
    ------------------------------------------------------------ */
    circleFX(color, time, delay, ease, deleteAfterFX){
        let circle = GraphicsHelper.exDrawCircle(0, 0, window.innerWidth/2 * 0.9, color);
        AlignHelper.centerWindow(circle);
        circle.y = window.innerHeight/2;
        circle.scale.set(0.1);
        circle.alpha = 0;
        this.addChild(circle);

        gsap.timeline().to(circle, {alpha:1, duration:time}, '+=' + delay);
        gsap.timeline().to(circle.scale, {x:1, y:1, duration:time*1.4, ease:ease}, '+=' + delay)
            .call(() => {
                if(deleteAfterFX){
                    this.removeChild(circle);
                }
            });
        return circle;
    }

    /* ------------------------------------------------------------
        汎用背景
    ------------------------------------------------------------ */
    initBG(){
        this.bg = GraphicsHelper.exDrawRect(0,0,100, 100, 0x000000);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.bg.alpha = 0;
        this.addChild(this.bg);
        this.bg.interactive = true;
    
    
        gsap.timeline().to(this.bg, {alpha:0.5, duration:0.3}, '+=0.3');
    }

    /* ------------------------------------------------------------
        Gameover
    ------------------------------------------------------------ */
    gameover(){
        this.initBG();

        this.box = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, 0x000000f);
        this.box.pivot.set(this.box.width/2, this.box.height/2);
        AlignHelper.xCenterWindow(this.box);
        this.box.y = 0 - this.box.height/2;
        gsap.timeline().to(this.box, {y:window.innerHeight/2, duration:0.5, ease:'expo'}, '+=0.3');
        this.addChild(this.box)

        // ===== Text =====
        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 0.7,
            fontWeight:     600,
            fill:           'white',
        });

        this.titleText = new PIXI.Text('GAMEOVER!', this.titleStyle);
        this.titleText.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.titleText);
        this.titleText.y = 0
        this.titleText.alpha = 0;
        this.addChild(this.titleText);
        gsap.timeline().to(this.titleText, {alpha:1, duration:0.5}, '+=0.5');
        gsap.timeline().to(this.titleText, {y:window.innerHeight/2, duration:0.5, ease:'back'}, '+=0.3');

        // ===== Retry =====
        this.btnStyle = new PIXI.TextStyle({
            fontFamily:     'Material Icons',
            fontSize:       dataProvider.data.padSize * 1,
            fontWeight:     200,
            fill:           'white',
        });
        
        this.retryBtn = new PIXI.Text('\ue042', this.btnStyle);
        this.addChild(this.retryBtn);
        this.retryBtn.anchor.set(0.5);
        AlignHelper.centerWindow(this.retryBtn);
        this.retryBtn.y += window.innerHeight * 0.15;
        this.retryBtn.alpha = 0;
        gsap.timeline().to(this.retryBtn, {alpha:1, duration:0.3}, '+=1')
            .call(() =>{
                this.retryBtn.interactive = true;
            })

        // ===== Retry touch event =====
        this.retryBtn.on('touchstart', (event) => {
            this.retryBtn.interactive = false;
            this.readyToDie();
        });
        
    }



    
    /* ------------------------------------------------------------
        readyToDie
    ------------------------------------------------------------ */
    readyToDie(isMatch){
        if(isMatch){
            gsap.to(this.titleText, {alpha:0, duration:0.4});
            gsap.timeline().to(this.bg, {alpha:0, duration:0.3});
            gsap.timeline().to(this.guessText.scale, {x:0.5, y:0.5, duration:0.3, ease:'back.in(1)'});
            gsap.timeline().to(this.guessText, {alpha:0, duration:0.3}, '+=0.1');
            gsap.timeline().to(this.circleBG.scale, {x:5, y:5, duration:0.3, ease:'power1.in'})
            .call(() => {
                this.parent.resetGame();
            });
            gsap.timeline().to(this.circleBG, {y:-2500, duration:0.6, ease:'power1.in'});
        }else{
            // かなり適当な処理をしたのでいつか直す
            this.parent.removeChild(this.parent.attemptContainer);

            this.bg.alpha = 0;
            gsap.to(this.titleText, {alpha:0, duration:0.4});
            gsap.timeline().to(this.box, {y:0-this.box.height/2, duration:0.5, ease:'expo'}, '+=0.3')
            .call(() =>{
                    this.parent.resetGame();
                });
        }
    }
}