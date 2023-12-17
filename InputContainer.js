import AlignHelper from './helper/AlignHelper.js';
import { dataProvider } from './xdataProvider.js';
import { KeyPad } from './KeyPad.js';

export class InputContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.init();
        this.initKeyPads();
        this.initGuess();
    }

    init(){
        this.currentGuess = '';
        this.keyPadList = [];
        this.padMargin = 8;
    }

    /* ------------------------------------------------------------
        
        KeyPadContainer / KeyPads

    ------------------------------------------------------------ */
    initKeyPads(){
        this.keyPadContainer = new PIXI.Container();
        this.addChild(this.keyPadContainer);
        this.keyPadContainer.visible = false;
        // ===== KeyPadの生成と配置 =====
        let valueIndex = 0;
        for(let i=0; i<10; i++){
            let keyPad = new KeyPad(i==9?0:i+1);
            this.keyPadContainer.addChild(keyPad);
            keyPad.x = i*(dataProvider.data.padSize + this.padMargin);
            if(i>4){
                keyPad.y = dataProvider.data.padSize + this.padMargin;
                keyPad.x = (i-5)*(dataProvider.data.padSize + this.padMargin);
            }
            this.keyPadList.push(keyPad);
        }

        this.keyPadContainer.pivot.set(
            this.keyPadContainer.width/2, 
            this.keyPadContainer.height/2);
        AlignHelper.xCenterWindow(this.keyPadContainer);
        this.keyPadContainerBasePosY = window.innerHeight - this.keyPadContainer.height/2 - this.padMargin*4;
        this.keyPadContainer.y = this.keyPadContainerBasePosY;
    }

    /* ------------------------------------------------------------
        onKeyPad input
    ------------------------------------------------------------ */
    onGuessHandler(number){
        if(this.currentGuess.length < 4){
            this.currentGuess += number;
            if(this.currentGuess.length == 4){
                for(let i=0; i<10; i++){
                    this.keyPadList[i].mute();
                }
                gsap.to(this.keyPadContainer, {alpha:0, y:this.keyPadContainerBasePosY+100, duration:0.2});
                gsap.to(this.keyPadContainer.scale, {x:0.9, y:0.9, duration:0.2});
                this.activateSubDelBtn(this.deleteBtn, -300, false);
                this.activateSubDelBtn(this.submitBtn, 300, true);
            }
        }
        let output = '';
        for(let i=0; i<4; i++){
            output += this.currentGuess[i] === undefined ? '*' : this.currentGuess[i];
        }

        this.guessText.text = output;
        gsap.killTweensOf(this.guessText);
        this.guessText.alpha = 1;
        this.guessText.x = window.innerWidth / 2;
        this.guessText.y = this.guessBasePosY + 50;
        gsap.to(this.guessText, {y: this.guessBasePosY, duration: 1, ease: 'elastic.out(1,0.3)'});
        this.guessStyle.letterSpacing = -50;
        gsap.to(this.guessStyle, { letterSpacing: 0, duration:0.4, ease: 'back.out(4)'})
    }

    /* ------------------------------------------------------------

        Guess / Submit / Delete

    ------------------------------------------------------------ */
    initGuess(){
        // ===== Guess =====
        this.guessStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 1,
            fontWeight:     200,
            fill:           'black',
        });

        this.guessText = new PIXI.Text('****', this.guessStyle);
        this.guessText.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.guessText);
        this.guessBasePosY = window.innerHeight - this.keyPadContainer.height - window.innerHeight * 0.1;
        this.guessText.y = this.guessBasePosY;
        this.addChild(this.guessText);
        this.guessText.visible = false;

        // ===== Submit =====
        this.btnStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 1,
            fontWeight:     200,
            fill:           'black',
        });
        
        this.submitBtn = new PIXI.Text('↑', this.btnStyle);
        this.addChild(this.submitBtn);
        this.submitBtn.interactive = true;
        this.submitBtn.anchor.set(0.5);
        this.submitBtn.x = window.innerWidth / 2 + 200;
        this.submitBtn.y = this.keyPadContainerBasePosY;
        this.submitBtn.visible = false;
        
        // ===== Submit touch event =====
        this.submitBtn.on('touchstart', (event) => {
            this.submitBtn.interactive = false;
            dataProvider.data.currentAttempt ++;
            this.subDelHander(true);
        });
        
        // ===== Delete =====
        this.deleteBtn = new PIXI.Text('X', this.btnStyle);
        this.addChild(this.deleteBtn);
        this.deleteBtn.interactive = true;
        this.deleteBtn.anchor.set(0.5);
        this.deleteBtn.x = window.innerWidth / 2 - 200;
        this.deleteBtn.y = this.keyPadContainerBasePosY;
        this.deleteBtn.visible = false;
        
        // ===== Delete touch event =====
        this.deleteBtn.on('touchstart', (event) => {
            this.deleteBtn.interactive = false;
            this.subDelHander(false);
        });   
    }



    /* ------------------------------------------------------------
        Show Submit / Delete
    ------------------------------------------------------------ */
    activateSubDelBtn(target, xOffset, delay){
        target.interactive = false;
        target.scale.x = 0.1;
        target.scale.y = 0.1;
        target.alpha = 1;
        target.visible = true;
        let delayParam = delay ? '+=0.1' : '';
        target.y = this.keyPadContainerBasePosY + 300;
        gsap.timeline().to(target, {y:this.keyPadContainerBasePosY, duration:0.3, ease:'back'}, delayParam);
        gsap.timeline().to(target.scale, {x:1, y:1, duration:0.5, ease:'back'}, delayParam)
            .call(()=>{
                target.interactive = true;
            });

    }

    /* ------------------------------------------------------------
        Submit / Delete
    ------------------------------------------------------------ */
    subDelHander(isSubmit){
        let target1 = isSubmit ? this.submitBtn : this.deleteBtn;
        let target2 = isSubmit ? this.deleteBtn : this.submitBtn;
        target1.scale.set(1.3);
        gsap.to(target1.scale, {x:0.8, y:0.8, duration:0.2, ease:'back.in(3)'})
        gsap.to(target2, {alpha:0, duration:0.1});
        gsap.timeline().to(target1, {alpha:0, duration:0.2})
            .call(() =>{
                target1.visible = false;
                target2.visible = false;
                if(!isSubmit){
                    this.resetKeyPads();
                }
            });

        if(isSubmit){
            // if submit
            dataProvider.data.lastGuess = this.currentGuess;
            let result = this.validGuess();
            console.log('attemp: ' + dataProvider.data.currentAttempt + ' / ' + dataProvider.data.attemptMax);
            switch (result) {
                case 'Match':
                    this.submitAndReset(true);
                    this.parent.attemptContainer.addAttempt(this.currentGuess, 'Match!', 2);
                    this.parent.endGame(true);
                    this.submitAndReset(true);
                    break;
                case 'No match':
                    this.parent.attemptContainer.addAttempt(this.currentGuess, result, 1);
                    if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
                        this.parent.endGame(false);
                        this.submitAndReset(true);
                        return false;
                    }
                    this.submitAndReset();
                    break;
                default:
                    this.parent.attemptContainer.addAttempt(this.currentGuess, result, 0);
                    if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
                        this.parent.endGame(false);
                        this.submitAndReset(true);
                        return false;
                    }
                    this.submitAndReset();
                    break;
            }
                        
        }else{
            // if delete
            let posX = window.innerWidth/2;
            gsap.timeline()
                .to(this.guessText, {x:posX-50, duration:0.05})
                .call(()=> { this.guessText.text = '****'; })
                .to(this.guessText, {x:posX+50, duration:0.05})
                .to(this.guessText, {x:posX, duration:0.05})
            this.guessStyle.letterSpacing = 100;
            gsap.timeline().to(this.guessStyle, {letterSpacing:0, duration:0.2});
            this.currentGuess = '';
        }
    }
 
    /* ------------------------------------------------------------
        Validation
    ------------------------------------------------------------ */
    validGuess(){
        if(dataProvider.data.answerLock){
            dataProvider.data.secret = '1234';
        }

        if(this.currentGuess == dataProvider.data.secret){
            return 'Match';
        }else{
            let isMatch = 0;
            let isIncluded = 0;
            for(let i = 0; i< 4; i++){
                if(this.currentGuess[i] === dataProvider.data.secret[i]){
                    isMatch ++;
                }else if(dataProvider.data.secret.includes(this.currentGuess[i])){
                    isIncluded ++;
                }
            }

            let feedback = '';
            if(isMatch > 0 && isIncluded > 0){
                feedback = `${isMatch}H / ${isIncluded}B`;
            }else{
                if(isMatch == 0 && isIncluded == 0){
                    feedback = 'No match';
                }else{
                    feedback = isMatch > 0 ? `${isMatch}H` : feedback;
                    feedback = isIncluded > 0 ? `${isIncluded}B` : feedback;
                }
            }
            return feedback;
        }
    }

    /* ------------------------------------------------------------
        Submit guess
    ------------------------------------------------------------ */
    submitAndReset(match){
        gsap.killTweensOf(this.guessText);
        gsap.to(this.guessText.scale, {x:0.85, y:0.85, duration:0.2});
        gsap.to(this.guessText, {y:this.guessBasePosY-200, duration:0.2, ease:'back.in(1)'});
        gsap.timeline().to(this.guessText, {alpha:0, duration:0.2})
        .call(()=>{
            if(!match){
                this.guessText.alpha = 0;
                gsap.timeline().to(this.guessText, {alpha:1, duration:0.2}, '+=0.2')
                this.guessStyle.letterSpacing = -50;
                this.guessText.text = '****';
                this.guessText.y = this.guessBasePosY + 200;
                gsap.timeline().to(this.guessText.scale, {x:1, y:1, duration:0.15}, '+=0.2');
                gsap.timeline().to(this.guessText, {y:this.guessBasePosY, duration:0.2, ease:'back.out(1)'}, '+=0.2');
                gsap.timeline().to(this.guessStyle, {letterSpacing:0, duration:0.15, ease:'back.out(1)'}, '+=0.2')
                this.resetKeyPads();
            }
        });
    }
    
    /* ------------------------------------------------------------
        KeyPadsの再活性
    ------------------------------------------------------------ */
    resetKeyPads(){
        for(let i=0; i<10; i++){
            this.keyPadList[i].revibe();
        }
        gsap.to(this.keyPadContainer, {alpha:1, duration:0.2});
        gsap.to(this.keyPadContainer, {y:this.keyPadContainerBasePosY, duration:0.2, ease:'back'});
        gsap.to(this.keyPadContainer.scale, {x:1, y:1, duration:0.25, ease:'back'});
        this.currentGuess = '';
    }
    /* ------------------------------------------------------------

        Animation

    ------------------------------------------------------------ */
    start(){
        this.currentGuess = '';
        this.guessText.text = '****';
        //
        this.guessText.visible = true;
        // ===== KeyPads =====
        this.keyPadContainer.alpha = 0;
        this.keyPadContainer.visible = true;
        gsap.timeline().to(this.keyPadContainer, {alpha:1, duration:0.5}, '+=0.3');
        this.keyPadContainerBasePosY = window.innerHeight - this.keyPadContainer.height/2 - 30;
        this.keyPadContainer.y = this.keyPadContainerBasePosY + 600;
        this.keyPadContainer.scale.set(3);
        gsap.to(this.keyPadContainer.scale, {x:1, y:1, duration:1, ease:'power1.out'});
        gsap.timeline().to(this.keyPadContainer, {y: this.keyPadContainerBasePosY, duration:0.8, ease:'power3.out'}, '+=0.3');
        
        // ===== Guess =====
        this.guessText.y = this.guessBasePosY + 200;
        this.guessText.alpha = 0;
        gsap.timeline().to(this.guessText, {alpha:1, y:this.guessBasePosY, duration:0.3, ease:'power1.out'}, '+=0.6');
        this.guessStyle.letterSpacing = -50;
        gsap.timeline().to(this.guessStyle, { letterSpacing: 0, duration:0.5, ease: 'back'}, '+=0.6')
    }
}
