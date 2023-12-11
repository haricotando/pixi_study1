import { dataProvider } from '../DataProvider.js';
// import AlignHelper from '../helper/AlignHelper.js';

export class GuessContainer extends PIXI.Container {
    // static guessText;
    static btnBackspace;
    static stateBackspace;
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();
        this.btnPosY = 300;
        this.init();
    }

    init(){
        // Guess text
        this.txtStyleGuess = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       dataProvider.data.padSize * 1,
            fontWeight:     200,
            fill:           'black',
        });

        // Text
        this.txtGuess = new PIXI.Text('****', this.txtStyleGuess);
        this.txtGuess.x = window.innerWidth / 2;
        this.txtGuess.anchor.set(0.5);
        this.txtGuess.visible = false;
        this.addChild(this.txtGuess);
        this.y = window.innerHeight - 520;
        
       // Guess text
       this.txtStyleSubmit = new PIXI.TextStyle({
           fontFamily:     'Inter',
           fontSize:       dataProvider.data.padSize * 1.4,
           fontWeight:     100,
           fill:           'black',
        });
        
        // Submit
        this.btnSubmit = new PIXI.Text('↑', this.txtStyleSubmit);
        this.addChild(this.btnSubmit);
        this.btnSubmit.interactive = true;
        this.btnSubmit.anchor.set(0.5);
        this.btnSubmit.x = window.innerWidth / 2 + 200;
        this.btnSubmit.y = this.btnPosY;
        this.btnSubmit.visible = false;
        
        this.btnSubmit.on('touchstart', (event) => {
            this.btnSubmit.interactive = false;
            this.btnSubmit.scale.x = 1.3;
            this.btnSubmit.scale.y = 1.3;
            gsap.to(this.btnSubmit.scale, {x:0.9, y:0.9, duration:0.2});
            gsap.timeline().to(this.btnSubmit, {alpha:0, duration:0.2})
                .call(() =>{
                    this.btnSubmit.visible = false;
                    this.btnDelete.visible = false;
                });
            this.parent.guessSubmitHandler();
        });

        //Delete
        this.btnDelete = new PIXI.Text('X', this.txtStyleSubmit);
        this.addChild(this.btnDelete);
        this.btnDelete.interactive = true;
        this.btnDelete.anchor.set(0.5);
        this.btnDelete.x = window.innerWidth / 2 - 200;
        this.btnDelete.y = this.btnPosY;
        this.btnDelete.visible = false;

        this.btnDelete.on('touchstart', (event) => {
            this.btnDelete.interactive = false;
            this.btnDelete.scale.x = 1.3;
            this.btnDelete.scale.y = 1.3;
            gsap.timeline().to(this.btnDelete.scale, {x:0.9, y:0.9, duration:0.2})
                .call(() =>{
                    this.btnSubmit.visible = false;
                    this.btnDelete.visible = false;
                });
            // GuessText
            let tgPos = window.innerWidth/2;
            gsap.timeline().to(this.txtGuess, {x:tgPos-50, duration:0.05}).to(this.txtGuess, {x:tgPos+50, duration:0.05}).to(this.txtGuess, {x:tgPos, duration:0.05})
            this.txtGuess.text = '****';
            this.txtStyleGuess.letterSpacing = 100;
            gsap.timeline().to(this.txtStyleGuess, {letterSpacing:0, duration:0.2});
            //
            this.parent.guessResetHandler();
        });   
    }
    
    start(){
        this.txtGuess.visible = true;
        this.txtGuess.y = 150;
        this.txtGuess.alpha = 0;
        let submitPosX = (window.innerWidth/2 + this.txtGuess.width) + (window.innerWidth/2-this.txtGuess.width)/2
        gsap.timeline().to(this.txtGuess, {alpha:1, y:0, duration:0.3, ease:'power1.out'}, '+=0.6');
        this.txtStyleGuess.letterSpacing = -50;
        gsap.timeline().to(this.txtStyleGuess, { letterSpacing: 0, duration:0.5, ease: 'back'}, '+=0.6')
    }

    submitAnimation(){
        gsap.to(this.txtGuess.scale, {x:0.85, y:0.85, duration:0.2});
        gsap.to(this.txtGuess, {y:-250, duration:0.2});
        gsap.timeline().to(this.txtGuess, {alpha:0, duration:0.2, ease:'power1.in'})
        .call(()=>{
            gsap.timeline().to(this.txtGuess, {alpha:1, duration:0.2})
            this.txtStyleGuess.letterSpacing = -50;
            this.txtGuess.text = '****';
            this.txtGuess.y = 150;
            gsap.timeline().to(this.txtGuess.scale, {x:1, y:1, duration:0.15});
            gsap.timeline().to(this.txtGuess, {y:0, duration:0.2, ease:'power4.out'});
            gsap.timeline().to(this.txtStyleGuess, {letterSpacing:0, duration:0.15, ease:'back'})
            })

    }

    updateGuess(txt){
        this.txtGuess.text = txt;
        gsap.killTweensOf(this.txtGuess);
        this.txtGuess.x = window.innerWidth / 2;
        this.txtGuess.y = 50;
        gsap.to(this.txtGuess, {y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)'});
        gsap.killTweensOf(this.txtStyleGuess);
        this.txtStyleGuess.letterSpacing = -50;
        gsap.to(this.txtStyleGuess, { letterSpacing: 0, duration:0.3, ease: 'back'})
    }

    showSubmit(){
        this.alpha = 1;
        // Submit
        this.btnSubmit.interactive = false;
        this.btnSubmit.scale.x = 0.1;
        this.btnSubmit.scale.y = 0.1;
        this.btnSubmit.alpha = 1;
        this.btnSubmit.y = this.btnPosY+300;
        this.btnSubmit.visible = true;
        gsap.to(this.btnSubmit, {y:this.btnPosY, duration:0.3, ease:'back'})
        gsap.timeline().to(this.btnSubmit.scale, {x:1, y:1, duration:0.5, ease:'back'})
            .call(()=>{
                this.btnSubmit.interactive = true;
            });
        // Delete
        this.btnDelete.interactive = false;
        this.btnDelete.scale.x = 0.1;
        this.btnDelete.scale.y = 0.1;
        this.btnDelete.alpha = 1;
        this.btnDelete.y = this.btnPosY+300;
        this.btnDelete.visible = true;
        gsap.timeline().to(this.btnDelete, {y:this.btnPosY, duration:0.3, ease:'back'}, '+=0.1')
        gsap.timeline().to(this.btnDelete.scale, {x:1, y:1, duration:0.5, ease:'back'}, '+=0.1')
            .call(()=>{
                this.btnDelete.interactive = true;
            });
    }

    matchRainbow(){
        gsap.timeline()
            .to(this.txtStyleGuess, {duration:0.1, fill:'yellow', ease:'steps(1)'})
            .to(this.txtStyleGuess, {duration:0.1, fill:'purple', ease:'steps(1)'})
            .to(this.txtStyleGuess, {duration:0.1, fill:'blue', ease:'steps(1)'})
            .to(this.txtStyleGuess, {duration:0.2, fill:'cyan'})
            .to(this.txtStyleGuess, {duration:0.2, fill:'black'})
        gsap.timeline().to(this.txtStyleGuess, {letterSpacing:100, duration:0.1})
            .to(this.txtStyleGuess, {letterSpacing:0, duration:0.4, ease:'back'});
        gsap.timeline().to(this.txtGuess.scale, {x:1.2, y:1.2, duration:1.2, ease:'back'})
            .to*(this.txtGuess.scale, {x:1, y:1, duration:0.3, ease:'expo'})
    }

    reset(){
        // gsap.to(this, {alpha:0, duration:0.3});
        this.btnSubmit.interactive = false;
        // this.btnSubmit.visible = false;
        
        this.btnDelete.interactive = false;
        // this.btnDelete.visible = false;

    }
}