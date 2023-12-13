import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { dataProvider } from './DataProvider.js';

export class EndScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.init();
    }

    /* ------------------------------------------------------------
        init
    ------------------------------------------------------------ */
    init(){
    }
    
    start(guess){
        // ===== Background ====-
        this.bg = GraphicsHelper.exDrawRect(0,0,100, 100, 0x000000);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.bg.alpha = 0;
        this.addChild(this.bg);

        gsap.to(this.bg, {alpha:0.3, duration:0.3});

        
        // ===== Circle FX =====
        this.circleFX(0xFFFF00, 0.3, 0.2, 1);
        this.circleFX(0xFF00FF, 0.3, 0.22, 1);
        this.circleFX(0x00FFFF, 0.3, 0.24, 1);
        this.circleBG = this.circleFX(0x000000, 0.4, 0.26, 0);

        // ===== Guess =====
        this.guessStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 1.5,
            fontWeight:     200,
            fill:           'white',
        });
        
        this.guessText = new PIXI.Text(guess, this.guessStyle);
        this.guessText.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.guessText);
        this.guessText.y = window.innerHeight/2;
        this.addChild(this.guessText);
        
        this.guessText.scale.set(0.1);
        this.guessText.alpha = 0;
        gsap.timeline().to(this.guessText, {alpha:1, duration:0.5}, '+=0.25');
        gsap.timeline().to(this.guessText.scale, {x:1, y:1, duration:0.6, ease:'back'}, '+=0.25');
        this.guessStyle.letterSpacing = 200;
        gsap.timeline().to(this.guessStyle, {letterSpacing:0, duration:0.6, ease:'expo'}, '+=0.3');
        
        // ===== Text =====
        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 0.7,
            fontWeight:     600,
            fill:           'white',
        });

        this.titleStyle = new PIXI.Text('Match!', this.titleStyle);
        this.titleStyle.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.titleStyle);
        this.titleStyle.y = window.innerHeight/2;
        this.titleStyle.scale.set(0.1);
        this.addChild(this.titleStyle);
        gsap.timeline().to(this.titleStyle.scale, {x:1, y:1, duration:0.5, ease:'back.out(3)'}, '+=0.1');
        gsap.timeline().to(this.titleStyle, {y:window.innerHeight/2-250, duration:0.5, ease:'back'}, '+=0.2');

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
        gsap.timeline().to(this.retryBtn, {alpha:1, duration:0.3}, '+=0.3');
        gsap.timeline().to(this.retryBtn, {y:window.innerHeight / 2+300, duration:0.5, ease:'back'}, '+=0.3');
        gsap.timeline().to(this.retryBtn.scale, {x:1, y:1, duration:0.5, ease:'back.out(3)'}, '+=0.5');

        // ===== Submit touch event =====
        this.retryBtn.on('touchstart', (event) => {
            this.retryBtn.interactive = false;
            this.retryBtn.visible =false;
            this.readyToDie();
            // gsap.to(this.deleteBtn, {alpha:0, duration:0.1});
            // gsap.to(this.submitBtn.scale, {x:0.8, y:0.8, duration:0.2, ease:'back.in(3)'})
            // gsap.timeline().to(this.submitBtn, {alpha:0, duration:0.2})
            // .call(() =>{
            //     this.submitBtn.visible = false;
            //     this.deleteBtn.visible = false;
            // });
            // this.submitAndReset();
            // this.validGuess();
            // this.parent.attemptContainer.addAttempt('1234', 'ss',9)
            // this.parent.guessSubmitHandler();
        });

    }

    circleFX(color, time, delay, deleteAfterFX){
        let circle = GraphicsHelper.exDrawCircle(0, 0, window.innerWidth/2 * 0.9, color);
        AlignHelper.centerWindow(circle);
        circle.y = window.innerHeight/2;
        circle.scale.set(0.1);
        circle.alpha = 0;
        this.addChild(circle);

        gsap.timeline().to(circle, {alpha:1, duration:time}, '+=' + delay);
        gsap.timeline().to(circle.scale, {x:1, y:1, duration:time*1.4, ease:'back.out(1)'}, '+=' + delay)
            .call(() => {
                if(deleteAfterFX){
                    this.removeChild(circle);
                }
            });
        return circle;
    }
    /* ------------------------------------------------------------
        readyToDie
    ------------------------------------------------------------ */
    readyToDie(){
        gsap.timeline().to(this.bg, {alpha:0, duration:0.3});
        gsap.timeline().to(this.guessText.scale, {x:2, y:2, duration:0.3, ease:'back.in(1)'});
        gsap.timeline().to(this.guessText, {alpha:0, duration:0.3}, '+=0.1');
        gsap.timeline().to(this.circleBG.scale, {x:5, y:5, duration:0.3, ease:'power1.in'})
            .call(() => {
                this.parent.resetGame();
            });
        gsap.timeline().to(this.circleBG, {y:-2500, duration:0.6, ease:'power1.in'});
    }
}