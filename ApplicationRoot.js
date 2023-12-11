import { KeyPadContainer } from './keypad/KeyPadContainer.js';
import { GuessContainer } from './guess/GuessContainer.js';
import { LogContainer } from './log/LogContainer.js';
import { StartScreen } from './StartScreen.js';
import AlignHelper from './helper/AlignHelper.js';
import { InfoContainer } from './InfoContainer.js';

export class ApplicationRoot extends PIXI.Container {
    static keyPadContainer;
    static guessContainer;
    static startScreen;
    static timeoutID;
    static attempt;
    //
    static guessList;

    /* ============================================================
        Constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        // ****************
        this.debug = false;
        this.debug = true;
        // ****************

        this.timeoutID = 0;
        this.attempt = 0;
        this.guessList = [];

        // ----------- Logic
        this.secretCode = this.generateSecretCode();
        
        // 
        // ----------- KeyPad
        this.keyPadContainer = new KeyPadContainer();
        this.addChild(this.keyPadContainer);
        if(this.debug){
            this.keyPadContainer.start();
        }
        
        // ----------- Guess
        this.guessContainer = new GuessContainer();
        this.addChild(this.guessContainer);
        if(this.debug){
            this.guessContainer.start();
        }

        // ----------- Attempt
        this.logContainer = new LogContainer();
        this.addChild(this.logContainer);
        
        // ----------- StartSceen
        this.startScreen = new StartScreen();
        if(!this.debug){
            this.addChild(this.startScreen);
        }

        this.initBtnInfo();
    }

    initBtnInfo(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 70,
            fill: 'gray',
            });

        this.btnInfo = new PIXI.Text('\ue88e', style);
        this.addChild(this.btnInfo);
        this.btnInfo.x = window.innerWidth - this.btnInfo.width -40;
        this.btnInfo.y = 40;
        
        this.btnInfo.on('touchstart', (event) => {
            this.btnInfo.interactive = false;
            this.infoContainer = new InfoContainer();
            this.addChild(this.infoContainer);
            
            // const blurFilter = new PIXI.filters.BlurFilter();
            // blurFilter.blur = 5;
            // this.filters = [blurFilter];
            
        });
        
        this.btnInfo.alpha = 0;
        gsap.timeline().to(this.btnInfo, {alpha:0, duration:0.1}, '+=4').call(()=>{
            this.btnInfo.interactive = true;
        }).to(this.btnInfo, {alpha:1, duration:0.3});
    }
    /* ------------------------------------------------------------
        ゲーム開始のイントロ
    ------------------------------------------------------------ */
    startGame(){
        this.keyPadContainer.start();
        this.guessContainer.start();
    }
    /* ------------------------------------------------------------
        キーパッドイベント
    ------------------------------------------------------------ */
    onGuessHandler(number){
        if(this.guessList.length < 4){
            this.guessList.push(number);
            if(this.guessList.length == 4){
                this.keyPadContainer.inactiveByLimit4();
                this.guessContainer.showSubmit();
            }
        }
        let output = '';
        for(let i=0; i<4; i++){
            output += this.guessList[i] === undefined ? '*' : this.guessList[i];
        }
        this.guessContainer.updateGuess(output);
    }
    /* ------------------------------------------------------------
        サブミット
    ------------------------------------------------------------ */
    guessSubmitHandler(){

        if(this.debug){
            this.guessContainer.reset();
            this.logContainer.guessMatch('2958');
            this.guessContainer.matchRainbow();
            return false;
        }

        this.attempt ++;
        let guessAsText = this.guessList.join('');
        if(guessAsText === this.secretCode){
            this.guessContainer.reset();
            this.logContainer.guessMatch(guessAsText);
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

            this.logContainer.addAttemptLog(guessAsText, feedback, isMatch == 0 && isIncluded == 0);
            this.guessList = [];
            this.keyPadContainer.resetKeyPads();
            this.guessContainer.reset();
            this.guessContainer.submitAnimation();
        }
    }
    /* ------------------------------------------------------------
        DeleteKey
    ------------------------------------------------------------ */
    guessResetHandler(){
        this.guessList = [];
        this.keyPadContainer.resetKeyPads();
        this.guessContainer.reset();
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

    echo(){
    console.log('works');
    }



  
}