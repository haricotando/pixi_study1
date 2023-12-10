import { KeyPadContainer } from './keypad/KeyPadContainer.js';
import { GuessContainer } from './guess/GuessContainer.js';
import { LogContainer } from './log/LogContainer.js';
import { StartScreen } from './StartScreen.js';
import AlignHelper from './helper/AlignHelper.js';

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
        // this.debug = true;
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
    /* ------------------------------------------------------------
        Info
    ------------------------------------------------------------ */
    initBtnInfo(){
        // iconStyle
        const style = new PIXI.TextStyle({
        fontFamily: 'Material Icons',
        fontSize: 70,
        fill: 'gray',
        });
        
        // set container
        let infoContainer = new PIXI.Container();
        this.addChild(infoContainer);
        // infoContainer.pivot.set(infoContainer.width/2, infoContainer.height/2);
        // infoContainer.x = window.innerWidth / 2;
        // infoContainer.y = window.innerHeight / 2;

        // background
        let bg = new PIXI.Graphics();
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, window.innerWidth, window.innerHeight);
        bg.endFill();
        // bg.pivot.set(bg.width/2, bg.height/2);
        bg.alpha = 0.1;
        infoContainer.addChild(bg);
        infoContainer.visible = false;

        // dialog
         const dialog = new PIXI.Graphics();
        dialog.beginFill(0xFFFFFF);
        dialog.drawRoundedRect(0, 0, 800, 800, 40);
        dialog.endFill();
        dialog.pivot.set(400,400);
        dialog.x = window.innerWidth / 2;
        dialog.y = window.innerHeight / 2;
        infoContainer.addChild(dialog);

        const qr = qrcode(0, 'M');
        qr.addData(window.location.href);
        qr.make();
        const qrDataURL = qr.createDataURL(10, 0);
        const texture = PIXI.Texture.from(qrDataURL);
        const qrContainer = new PIXI.Sprite(texture);
        qrContainer.width = 600;
        qrContainer.height = 600;
        qrContainer.x = 100;
        qrContainer.y = 100;
        dialog.addChild(qrContainer);

        // infoBtn
        const btnInfo = new PIXI.Text('\ue88e', style);
        this.addChild(btnInfo);
        btnInfo.x = window.innerWidth - btnInfo.width -40;
        btnInfo.y = 40;

        btnInfo.on('touchstart', (event) => {
            btnInfo.interactive = false;
            infoContainer.visible = true;
            bg.interactive = true;
        });
        btnInfo.alpha = 0;
        gsap.timeline().to(btnInfo, {alpha:0, duration:0.1}, '+=4').call(()=>{
            btnInfo.interactive = true;
        }).to(btnInfo, {alpha:1, duration:0.3});

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