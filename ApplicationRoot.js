import { AttemptContainer } from './AttemptContainer.js';
import { dataProvider } from './DataProvider.js';
import { EndScreen } from './EndScreen.js';
import { InfoContainer } from './InfoContainer.js';
import { InputContainer } from './InputContainer.js';
import { StartScreen } from './StartScreen.js';

export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();

        this.generateSecretCode();
        this.initInfoBtn();
        this.initEndScreen();
        this.initStartScreen();
        this.initInputContainer();
        this.initAttemptConatiner();
    }

    /* ------------------------------------------------------------
        StartScreen
    ------------------------------------------------------------ */
    initStartScreen(){
        // Debugモードではイントロを省略する
        if(!dataProvider.data.debug){
            this.startScreen = new StartScreen();
            this.addChild(this.startScreen);
        }
    }
    
    initEndScreen(){
        this.endScreen = new EndScreen();
        this.addChild(this.endScreen);
        if(dataProvider.data.debug){
            this.endScreen.start('1234');
        }
    }

    /* ------------------------------------------------------------
        UI/Input - Keypads, Guess, Submit, Delete
    ------------------------------------------------------------ */
    initInputContainer(){
        this.inputContainer = new InputContainer();
        this.addChild(this.inputContainer);
        if(dataProvider.data.debug){
            this.inputContainer.start();
        }
    }

    /* ------------------------------------------------------------
        Attempt
    ------------------------------------------------------------ */
    initAttemptConatiner(){
        this.attemptContainer = new AttemptContainer();
        this.addChild(this.attemptContainer);
    }

    /* ------------------------------------------------------------
        Information btn / Info Container
    ------------------------------------------------------------ */
    initInfoBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 70,
            fill: 'gray',
            });

        this.infoBtn = new PIXI.Text('\ue88e', style);
        this.addChild(this.infoBtn);
        this.infoBtn.x = window.innerWidth - this.infoBtn.width -40;
        this.infoBtn.y = 40;
        
        this.infoBtn.on('touchstart', (event) => {
            this.infoBtn.interactive = false;
            this.infoContainer = new InfoContainer();
            this.addChild(this.infoContainer);
        });
        
        // this.infoBtn.alpha = 0;
        // gsap.timeline().to(this.infoBtn, {alpha:0, duration:0.1}, '+=4').call(()=>{
            this.infoBtn.interactive = true;
        // }).to(this.infoBtn, {alpha:1, duration:0.3});
    }

    startGame(){
        this.inputContainer.start();
        // this.infoContainer.start();
        // this.keyPadContainer.start();
        // this.guessContainer.start();
    }

    endGame(guess){
        console.log('endgame')
        this.endScreen.start(guess);
    }







    // ここから上が最適化済み






    // old_initBtnInfo(){
    //     const style = new PIXI.TextStyle({
    //         fontFamily: 'Material Icons',
    //         fontSize: 70,
    //         fill: 'gray',
    //         });

    //     this.btnInfo = new PIXI.Text('\ue88e', style);
    //     this.addChild(this.btnInfo);
    //     this.btnInfo.x = window.innerWidth - this.btnInfo.width -40;
    //     this.btnInfo.y = 40;
        
    //     this.btnInfo.on('touchstart', (event) => {
    //         this.btnInfo.interactive = false;
    //         this.infoContainer = new InfoContainer();
    //         this.addChild(this.infoContainer);
            
    //         // const blurFilter = new PIXI.filters.BlurFilter();
    //         // blurFilter.blur = 5;
    //         // this.filters = [blurFilter];
            
    //     });
        
    //     this.btnInfo.alpha = 0;
    //     gsap.timeline().to(this.btnInfo, {alpha:0, duration:0.1}, '+=4').call(()=>{
    //         this.btnInfo.interactive = true;
    //     }).to(this.btnInfo, {alpha:1, duration:0.3});
    // }
    /* ------------------------------------------------------------
        ゲーム開始のイントロ
    ------------------------------------------------------------ */
    // startGame(){
    //     this.keyPadContainer.start();
    //     this.guessContainer.start();
    // }
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
        dataProvider.data.secret = secretCode;
        console.log(`SECRET: ${secretCode}`)
        // return secretCode;
    }

    echo(){
    console.log('works');
    }



  
}