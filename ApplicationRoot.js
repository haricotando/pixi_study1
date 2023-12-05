import { KeyPadContainer } from './keypad/KeyPadContainer.js';
import { GuessContainer } from './guess/GuessContainer.js';
import { AttemptContainer } from './attempt/AttemptContainer.js';
// import AlignHelper from './helper/AlignHelper.js';

export class ApplicationRoot extends PIXI.Container {
    static keyPadContainer;
    static guessContainer;
    static timeoutID;
    static attempt;
    //
    static guessList;

    /* ============================================================
        Constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.timeoutID = 0;
        this.attempt = 0;
        this.guessList = [];

        // ----------- Logic
        this.secretCode = this.generateSecretCode();
        
        // 
        // ----------- KeyPad
        this.keyPadContainer = new KeyPadContainer();
        this.addChild(this.keyPadContainer);
        
        // ----------- Guess
        this.guessContainer = new GuessContainer();
        this.addChild(this.guessContainer);

        // ----------- Attempt
        this.attemptContainer = new AttemptContainer();
        this.addChild(this.attemptContainer);
        
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.resizeHandler();
    }

/* ------------------------------------------------------------
    キーパッドイベント
------------------------------------------------------------ */
    onGuessHandler(number){
        if(this.guessList.length < 4){
            this.guessList.push(number);
            this.updateGuessContainer();
            if(this.guessList.length == 4){
                console.log('Limit reach')
                this.guessContainer.switchSubmit(true);
                this.keyPadContainer.inactiveByLimit4();
            }
        }
        if(!this.guessContainer.stateBackspace){
            this.guessContainer.switchBackspace(true);
        }
        this.guessContainer.onInput();
    }

    guessSubmitHandler(){
        this.attempt ++;
        let guessAsText = this.guessList.join('');
        if(guessAsText === this.secretCode){
            alert('Match');
        }else{
            let isMatch = 0;
            let isIncluded = 0;
            for(let i = 0; i< 4; i++){
                if(guessAsText[i] === this.secretCode[i]){
                    isMatch ++;
                }else if(this.secretCode.includes(guessAsText[i])){
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

            this.guessResetHandler();
            this.updateGuessContainer();
            this.attemptContainer.addAttemptLog(guessAsText, feedback);
        }
    }

    guessResetHandler(){
        this.guessList = [];
        this.keyPadContainer.resetKeyPads();
        this.guessContainer.switchSubmit(false);
        this.guessContainer.switchBackspace(false);
        this.updateGuessContainer();
    }
    
    updateGuessContainer(){
        let output = '';
        for(let i=0; i<4; i++){
            output += this.guessList[i] === undefined ? '*' : this.guessList[i];
        }
        this.guessContainer.number.text = output;
    }
/* ------------------------------------------------------------
    リサイズイベント
------------------------------------------------------------ */
    resizeHandler(){
        this.keyPadContainer.position.set(
            (window.innerWidth - this.keyPadContainer.width)/2, 
            window.innerHeight - this.keyPadContainer.height
            );

        this.guessContainer.position.set(
            (window.innerWidth - this.guessContainer.width)/2, 
            window.innerHeight - this.guessContainer.height-400
            );

        this.attemptContainer.position.set(
            (window.innerWidth - this.attemptContainer.width)/2, 
            0
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
    // if (this.currentGuess === this.secretCode) {
    //     alert("Great");
    // } else {
    //     let isMatch = '';
    //     let isIncluded = '';
    //     for(let i = 0; i< 4; i++){
    //         if(this.currentGuess[i] === this.secretCode[i]){
    //             isMatch += "🙆‍♂";
    //         }else if(this.secretCode.includes(this.currentGuess[i])){
    //             isIncluded +="🤔";
    //         }
    //     }
    //     let feedback = isMatch + isIncluded;
    //     console.log(`Attempt ${this.attempt}: ${this.currentGuess} → ${feedback}`);
    // }
  }

    echo(){
    console.log('works');
    }



  
}