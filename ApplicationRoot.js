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
        // class整理done
        this.initInfoBtn();
        if(!dataProvider.data.debug){
            // Debug時にはSkip
            this.initStartScreen();
        }
        this.initInputContainer();
        this.initAttemptConatiner();
    }

    /* ------------------------------------------------------------
        StartScreen
    ------------------------------------------------------------ */
    initStartScreen(){
        this.startScreen = new StartScreen();
        this.addChild(this.startScreen);
    }
    
    initEndScreen(){
        this.endScreen = new EndScreen();
        this.addChild(this.endScreen);
    }

    /* ------------------------------------------------------------
        UI/Input - Keypads, Guess, Submit, Delete
    ------------------------------------------------------------ */
    initInputContainer(isReplay){
        if(isReplay){
            this.removeChild(this.inputContainer);
            this.inputContainer = new InputContainer();
            this.inputContainer.start();
        }else{
            this.inputContainer = new InputContainer();
            if(dataProvider.data.debug){
                    this.inputContainer.start();
            }
        }
        this.addChild(this.inputContainer);
    }

    /* ------------------------------------------------------------
        Attempt
    ------------------------------------------------------------ */
    initAttemptConatiner(isReplay){
        if(isReplay){
            this.removeChild(this.attemptContainer);
        }
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
        
        this.infoBtn.alpha = 0;
        gsap.timeline().to(this.infoBtn, {alpha:0, duration:0.1}, '+=4').call(()=>{
            this.infoBtn.interactive = true;
        }).to(this.infoBtn, {alpha:1, duration:0.3});
    }

    startGame(){
        this.inputContainer.start();
    }

    endGame(isMatch){
        this.endScreen = new EndScreen(isMatch);
        this.addChild(this.endScreen);
    }

    resetGame(){
        this.generateSecretCode();
        this.initInputContainer(true);
        
        this.removeChild(this.attemptContainer);
        this.initAttemptConatiner(true);
        this.removeChild(this.endScreen);
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
        dataProvider.data.currentAttempt = 0;
        dataProvider.data.lastGuess = '';
        console.log(`SECRET: ${secretCode}`)
    }

    echo(){
    console.log('works');
    }



  
}