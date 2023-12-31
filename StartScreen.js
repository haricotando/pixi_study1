import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class StartScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.init();
    }

    /* ------------------------------------------------------------
        init
    ------------------------------------------------------------ */
    init(){
        AlignHelper.centerWindow(this);
        /*
            ===== Background =====
        */
        this.background = GraphicsHelper.exDrawRect(-300, -150, 600, 300, 0xFFFFFF, {lineWidth:8, lineColor:0x000000});
        
        this.background.scale.set(4);
        this.background.rotation = 1.2;
        this.background.alpha = 0;
        this.addChild(this.background);
        
        gsap.timeline()
        .to(this.background, {alpha:1, duration:2, ease:'none'}, '+=0.5')
        .to(this.background, {alpha:0, duration:2, ease:'expo'});
        gsap.to(this.background.scale, {x:1, y:1, duration:5, ease:'power4.out'});
        gsap.to(this.background, {rotation:-0.4, duration:7, ease:'power4.out'});
        /*
            ===== Title =====
        */
        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       100,
            fontWeight:     900,
            fill:           'black',
            letterSpacing:  800
        });
        this.titleText = new PIXI.Text('MASTERMIND', this.titleStyle);
        this.titleText.anchor.set(0.5);
        this.titleText.scale.set(50);
        this.titleText.alpha = 0;
        this.addChild(this.titleText);
         
        gsap.timeline()
            .to(this.titleStyle, { letterSpacing: 20, duration: 2, ease: 'power4.out'}, '+=0.3')
            .to(this.titleStyle, { letterSpacing: 5, duration:1, ease: 'none'})
        gsap.timeline()
            .to(this.titleText.scale, {x:0.9, y:0.9, duration:2.5, ease:'power2.out'})
            .to(this.titleText.scale, {x:1.15, y:1.15, duration:1.5, ease:'power1.inOut'})
        gsap.to(this.titleText, {alpha:1, duration:1});
        /*
            ===== Description =====
        */
        this.descStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       39,
            fontWeight:     400,
            fill:           'black',
        });
        this.descText = new PIXI.Text('Guess the 4-digit secret code (no duplicates).', this.descStyle);
        this.descText.anchor.set(0.5);
        this.descText.y += 80;
        this.descText.alpha = 0;
        this.descText.scale.set(0.6);
        this.addChild(this.descText);

        gsap.timeline().to(this.descText, {alpha:1, duration:1}, '+=3.2');
        gsap.timeline().to(this.descText.scale, {x:1, y:1, duration:0.9}, '+=3');
        /* 
            ===== Instruction =====
        */
        this.instTextContainer = new PIXI.Container();
        this.addChild(this.instTextContainer);
        
        this.instText1 = this.initInstTextContainer('Hit: ', 'means right digit, right place.');
        this.instText2 = this.initInstTextContainer('Blow:  ', 'means right digit, wrong place.');
        this.instTextContainer.addChild(this.instText1);
        this.instTextContainer.addChild(this.instText2);
        this.instText2.y += 60;
        this.instTextContainer.y += 250;
        this.instTextContainer.alpha = 0;

        gsap.timeline().to(this.instTextContainer, {alpha: 1, duration: 1}, '+=3.5');
        /* 
            ===== StartBtn =====
        */
        this.btnStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       180,
            fontWeight:     100,
            fill:           'black',
        });
        this.startBtn = new PIXI.Text('↓', this.btnStyle);
        this.startBtn.anchor.set(0.5);
        this.startBtn.y = window.innerHeight / 4;
        this.startBtn.alpha = 0;
        this.addChild(this.startBtn);

        let tw = gsap.timeline().to(this.startBtn, {y: 550, duration:0.5, ease:'power1.out', repeat:-1, repeatDelay:1}, '+=4');
        gsap.timeline().to(this.startBtn, {alpha:1, duration: 0.5}, '+=4')
            .call(() => {
                this.startBtn.interactive = true;
                this.startBtn.on('touchstart', (event) => {
                    this.startBtn.interactive = false;
                    tw.kill();
                    this.readyToDie();
                });
            });
    }

    /* ------------------------------------------------------------
        説明テキスト用
    ------------------------------------------------------------ */
    initInstTextContainer(txt1, txt2){
        let container = new PIXI.Container();


        let instStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       35,
            fontWeight:     400,
            fill:           'black',
            align: 'center',
        })
        let instBoldStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       35,
            fontWeight:     600,
            fill:           'black',
            align: 'center',
        })
        let instBold = new PIXI.Text(txt1, instBoldStyle);
        let instText = new PIXI.Text(txt2, instStyle);
        instText.x = instBold.width;

        container.addChild(instBold);
        container.addChild(instText);
        container.pivot.set(container.width/2, container.height/2);
        return container;
    }
    
    /* ------------------------------------------------------------
        readyToDie
    ------------------------------------------------------------ */
    readyToDie(){
        this.startBtn.scale.set(1.3);
        gsap.to(this.startBtn.scale, {x:2, y:2, duration:0.1, ease:'expo'})
        gsap.timeline().to(this.startBtn, {y:1000, duration:0.5, ease:'power1.in'}, '+=0.05')

        // CIRCLE
        this.circle = GraphicsHelper.exDrawCircle(0, 0, 20, 0x000000);
        this.addChild(this.circle);
        this.circle.y = window.innerHeight / 4 + 100;
        this.circle.alpha = 0;
        gsap.to(this.circle, {alpha:1, duration:0.4});

        //  Stageout
        gsap.timeline().to(this.titleText, {y:this.titleText.y-200, alpha:0, duration:0.3, ease:'power1.in'})
            .to(this.descText, {y:this.descText.y-200, alpha:0, duration:0.3, ease:'power1.in'}, '-=0.2')
            .to(this.instTextContainer, {y:this.instTextContainer.y-200, alpha:0, duration:0.3, ease:'power1.in'}, '-=0.4')
        
        gsap.timeline().to(this.circle.scale, {x:50, y:50, duration:0.4})
            .call(() => {
                this.parent.startGame();
            });
        gsap.timeline().to(this.circle, {y:-2500, duration:1, ease:'power4.inOut'}, '+=0.1')
        .call(() =>{
            this.parent.removeChild(this);
        });
    }
}