import AlignHelper from './helper/AlignHelper.js';
import { dataProvider } from './DataProvider.js';
import { KeyPad } from './KeyPad.js';

export class InputContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.currentGuess = '';
        this.keyPadList = [];
        this.padMargin = 8;

        this.initKeyPads();
        this.initGuess();
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
                this.showBtns();
            }
        }
        let output = '';
        for(let i=0; i<4; i++){
            output += this.currentGuess[i] === undefined ? '*' : this.currentGuess[i];
        }

        this.guessText.text = output;
        gsap.killTweensOf(this.guessText);
        this.guessText.x = window.innerWidth / 2;
        this.guessText.y = this.guessBasePosY + 50;
        gsap.to(this.guessText, {y: this.guessBasePosY, duration: 1, ease: 'elastic.out(1,0.3)'});
        gsap.killTweensOf(this.guessStyle);
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
        this.guessBasePosY = window.innerHeight - this.keyPadContainer.height - 150;
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
            // ToDo リファクタする
            // this.submitBtn.scale(1.3);
            this.submitBtn.scale.x = 1.3;
            this.submitBtn.scale.y = 1.3;
            gsap.to(this.deleteBtn, {alpha:0, duration:0.1});
            gsap.to(this.submitBtn.scale, {x:0.8, y:0.8, duration:0.2, ease:'back.in(3)'})
            gsap.timeline().to(this.submitBtn, {alpha:0, duration:0.2})
            .call(() =>{
                this.submitBtn.visible = false;
                this.deleteBtn.visible = false;
            });
            // this.submitAndReset();
            this.validGuess();
            // this.parent.attemptContainer.addAttempt('1234', 'ss',9)
            // this.parent.guessSubmitHandler();
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
            this.deleteBtn.scale.x = 1.3;
            this.deleteBtn.scale.y = 1.3;
            gsap.to(this.submitBtn, {alpha:0, duration:0.1});
            gsap.timeline().to(this.deleteBtn.scale, {x:0.8, y:0.8, duration:0.2, ease:'back.in(3)'})
                .call(() =>{
                    this.submitBtn.visible = false;
                    this.deleteBtn.visible = false;
                    this.resetKeyPads();
                });
            
            // ===== Reset guess =====
            let posX = window.innerWidth/2;
            gsap.timeline()
                .to(this.guessText, {x:posX-50, duration:0.05})
                .call(()=> { this.guessText.text = '****'; })
                .to(this.guessText, {x:posX+50, duration:0.05})
                .to(this.guessText, {x:posX, duration:0.05})
            this.guessStyle.letterSpacing = 100;
            gsap.timeline().to(this.guessStyle, {letterSpacing:0, duration:0.2});
            this.currentGuess = '';
        });   
    }

    /* ------------------------------------------------------------
        Show Submit / Delete
    ------------------------------------------------------------ */
    showBtns(){
        // ===== Submit =====
        this.submitBtn.interactive = false;
        this.submitBtn.scale.x = 0.1;
        this.submitBtn.scale.y = 0.1;
        this.submitBtn.alpha = 1;
        this.submitBtn.visible = true;
        this.submitBtn.y = this.keyPadContainerBasePosY + 300;
        gsap.to(this.submitBtn, {y:this.keyPadContainerBasePosY, duration:0.3, ease:'back'})
        gsap.timeline().to(this.submitBtn.scale, {x:1, y:1, duration:0.5, ease:'back'})
            .call(()=>{
                this.submitBtn.interactive = true;
            });
        // ===== Delete =====
        this.deleteBtn.interactive = false;
        this.deleteBtn.scale.x = 0.1;
        this.deleteBtn.scale.y = 0.1;
        this.deleteBtn.alpha = 1;
        this.deleteBtn.y = this.keyPadContainerBasePosY + 300;
        this.deleteBtn.visible = true;
        gsap.timeline().to(this.deleteBtn, {y:this.keyPadContainerBasePosY, duration:0.3, ease:'back'}, '+=0.1')
        gsap.timeline().to(this.deleteBtn.scale, {x:1, y:1, duration:0.5, ease:'back'}, '+=0.1')
            .call(()=>{
                this.deleteBtn.interactive = true;
            });
    }

    /* ------------------------------------------------------------
        Validation
    ------------------------------------------------------------ */
    validGuess(){
        if(dataProvider.data.debug){
            dataProvider.data.secret = '1234';
        }

        if(this.currentGuess == dataProvider.data.secret){
            this.submitAndReset(1);
            this.parent.attemptContainer.addAttempt(this.currentGuess, 'Match!', 2);
            this.parent.endGame(this.currentGuess);
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
            let flag = isMatch == 0 && isIncluded == 1 ? 0:1;
            this.submitAndReset();
            this.parent.attemptContainer.addAttempt(this.currentGuess, feedback, flag);
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
