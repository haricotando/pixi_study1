import { KeyPadContainer } from './keypad/KeyPadContainer.js';
import { GuessContainer } from './guess/GuessContainer.js';

// import AlignHelper from './helper/AlignHelper.js';

export class ApplicationRoot extends PIXI.Container {
    static keyPadContainer;
    static guessContainer;
    static timeoutID;
    static attempt;
    static currentGuess;

    /* ============================================================
        Constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.timeoutID = 0;
        this.attempt = 0;
        this.currentGuess = '';

        // KeyPad
        this.keyPadContainer = new KeyPadContainer();
        this.addChild(this.keyPadContainer);

        // Guess
        this.guessContainer = new GuessContainer();
        this.addChild(this.guessContainer);
        
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.resizeHandler();

        // debug
        this.setBG();

        this.secretCode = this.generateSecretCode();
    }

    onKeyPad(number){
        console.log('keyPaddddd')
        this.guessContainer.number.text = "xx";
        if(this.currentGuess.includes(number.toString())){
            return false;
        }
        this.currentGuess += number.toString();
        console.log(this.currentGuess);
        if(this.currentGuess.length !== 4){
            // this.guessContainer.number.text = ('***' + this.currentGuess).slice(-4);    
        // document.getElementById("currentGuess").textContent = ('***' + currentGuess).slice(-4);    
        }else{
        // validGuess(currentGuess);
        // document.getElementById("currentGuess").textContent = "****";
        // currentGuess = "";
        }



    }

    echo() {
        console.log('here');
    }

    setBG(){
        let g = new PIXI.Graphics();
        g.beginFill(0xFF0000);
        g.drawCircle(0,0,20);
        g.endFill();
        this.addChild(g)
    }

/* ------------------------------------------------------------
    リサイズイベント
------------------------------------------------------------ */
    resizeHandler(){
        console.log(this);
        this.keyPadContainer.position.set(
            (window.innerWidth - this.keyPadContainer.width)/2, 
            window.innerHeight - this.keyPadContainer.height
            );

        this.guessContainer.position.set(
            (window.innerWidth - this.guessContainer.width)/2, 
            // window.innerHeight - this.guessContainer.height
            );
    }

/* ==================================================
  ロジック
================================================== */
generateSecretCode() {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let secretCode = '';
    while (secretCode.length < 4) {
      const randomIndex = Math.floor(Math.random() * digits.length);
       const digit = digits.splice(randomIndex, 1)[0];
       secretCode += digit;
    }
    return secretCode;
  }



  
}