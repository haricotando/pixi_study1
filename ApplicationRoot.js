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

        // Logic
        this.secretCode = this.generateSecretCode();

        // KeyPad
        this.keyPadContainer = new KeyPadContainer();
        this.addChild(this.keyPadContainer);

        // Guess
        this.guessContainer = new GuessContainer();
        this.addChild(this.guessContainer);
        
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.resizeHandler();
    }

/* ------------------------------------------------------------
    キーパッドイベント
------------------------------------------------------------ */
    onGuessHandler(number){
        if(this.currentGuess.includes(number.toString())){
            return false;
        }
        console.log('this.currentGuess.length: ' + this.currentGuess.length);
        this.currentGuess += number.toString();
        if(this.currentGuess.length !== 4){
            console.log("AAAAA");
            this.guessContainer.number.text = ('***' + this.currentGuess).slice(-4);
        }else{
            console.log("BBBBB");
            this.validGuess(this.currentGuess);
        this.currentGuess = "";
        }
    }

    echo() {
        console.log('here');
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
    console.log(`SECRET: ${secretCode}`)
    return secretCode;
  }

  validGuess(guess){
    this.attempt ++;
    if (this.currentGuess === this.secretCode) {
        alert("Great");
    } else {
      let isMatch = '';
      let isIncluded = '';
      for(let i = 0; i< 4; i++){
        if(this.currentGuess[i] === this.secretCode[i]){
          isMatch += "🙆‍♂";
        }else if(this.secretCode.includes(this.currentGuess[i])){
          isIncluded +="🤔";
        }
      }
      let feedback = isMatch + isIncluded;
      console.log(`Attempt ${this.attempt}: ${this.currentGuess} → ${feedback}`);
    }
  }



  
}