import AlignHelper from './helper/AlignHelper.js';
import { dataProvider } from './DataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class AttemptContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.attemptCount = 0;
        // gsap.timeline().to(this, {alpha:1, duration:1})
        // .call(() =>{ this.addAttempt('1234', 'Match!', 2);})
        // .to(this, {alpha:1, duration:1})
        // .call(() =>{ this.addAttempt('4234', '1H / 2B', 0);})
    }

    /* ------------------------------------------------------------
        Attempt
    ------------------------------------------------------------ */
    addAttempt(guess, result, flag){
        // flag 0 = default
        // flag 1 = no match
        // flag 2 = match!

        this.attemptCount ++;
        if(flag==2){
            return false;
        }
        // ===== Container =====
        let guessContainer = new PIXI.Sprite();
        AlignHelper.xCenterWindow(guessContainer);
        guessContainer.y = window.innerHeight/2;
        this.addChild(guessContainer);
        
        // ===== Guess =====
        let guessStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       80,
            fontWeight:     200,
            fill:           'black',
        });

        let attemptText = new PIXI.Text(guess, guessStyle);
        attemptText.anchor.set(0.5);
        guessContainer.addChild(attemptText);

        gsap.to(guessContainer, {y: this.attemptCount * 100, duration: 0.3, ease: 'elastic.out(1,1)'});
        gsap.timeline().to(guessStyle, {letterSpacing:-5, duration:0.2})
            .call(() => {
                guessStyle.letterSpacing = 0;
                attemptText.text = guess + '->' + result;
                guessContainer.scale.x = 1.5;
                guessContainer.scale.y = 1;
            })
            .to(guessContainer.scale, {x:1, y:1, duration:flag==0 ? 0.4 : 1.5, ease:'expo'})

        if(flag == 0){
            gsap.timeline()
                .to(guessStyle, {duration:0.1, fill:'yellow', ease:'steps(1)'}, '+=0.2')
                .to(guessStyle, {duration:0.1, fill:'purple', ease:'steps(1)'})
                .to(guessStyle, {duration:0.1, fill:'black'})
        }else{
            gsap.timeline()
            .to(guessStyle, {duration:0.1, fill:'yellow', ease:'steps(1)'}, '+=0.2')
            .to(guessStyle, {duration:0.1, fill:'purple', ease:'steps(1)'})
            .to(guessStyle, {duration:0.1, fill:'magenta', ease:'steps(1)'})
            .to(guessStyle, {duration:0.1, fill:'cyan', ease:'steps(1)'})
            .to(guessStyle, {duration:0.3, fill:'black'});
        }

        // ===== Match! =====
        if(flag == 2){
            let circle = GraphicsHelper.exDrawCircle(0, 0, 1000, 0x000000);
            AlignHelper.centerWindow(circle);
            // circle.y = this.attemptCount * 100;
            circle.scale.set(0.1);
            circle.alpha = 0;
            this.addChild(circle);
            // gsap.timeline().to(circle, {alpha:1, duration:0.3}, '+=0.4');
            // gsap.timeline().to(circle.scale, {x:1, y:1, duration:0.4, ease:'back.out(1)'}, '+=0.4')

        }
    }

    reset(){
        this.attemptCount = 0;
    }

}