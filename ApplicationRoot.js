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
        this.initStartScreen();
        this.initInputContainer();
        this.initAttemptConatiner();
        this.initEndScreen();
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

        // if(dataProvider.data.debug){
        //     gsap.timeline().to(this.endScreen, {alpha:1, duration:1})
        //         .call(() => {
        //            this.endScreen.gameover();
        //         });
        // }
        // if(dataProvider.data.debug){
        //     this.endScreen.start('1234');
        // }
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
        
        this.infoBtn.alpha = 0;
        gsap.timeline().to(this.infoBtn, {alpha:0, duration:0.1}, '+=4').call(()=>{
            this.infoBtn.interactive = true;
        }).to(this.infoBtn, {alpha:1, duration:0.3});
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

    gameover(){
        console.log('game is over');
        this.endScreen.gameover();
    }

    resetGame(){
        this.generateSecretCode();
        this.inputContainer.reset();
        // this.removeChild(this.inputContainer);
        // this.inputContainer = new InputContainer();
        this.removeChild(this.attemptContainer);
        this.initAttemptConatiner();
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