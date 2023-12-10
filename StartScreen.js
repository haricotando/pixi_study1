import AlignHelper from './helper/AlignHelper.js';

export class StartScreen extends PIXI.Container {
    /* ============================================================
        Constructor
    ============================================================ */
    constructor() {
        super();

        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;

        // -----background
        this.background = new PIXI.Graphics();
        this.background.lineStyle(8, 0x000000);
        this.background.beginFill(0xFFFFFF);
        this.background.drawRect(-300, -150, 600, 300);
        this.background.endFill()

        // -----backgroundCointainer
        this.backgroundContainer = new PIXI.Sprite();
        this.backgroundContainer.addChild(this.background);
        this.addChild(this.backgroundContainer);

        this.backgroundContainer.scale.x = 4;
        this.backgroundContainer.scale.y = 4;
        this.backgroundContainer.rotation = 1.2;
        this.backgroundContainer.alpha = 0;

        gsap.timeline().to(this.backgroundContainer, {alpha:1, duration:2, ease:'none'}, '+=0.5').to(this.backgroundContainer, {alpha:0, duration:2, ease:'expo'});
        gsap.timeline().to(this.backgroundContainer.scale, {x:1, y:1, duration:5, ease:'power4.out'});
        gsap.to(this.backgroundContainer, {rotation:-0.4, duration:7, ease:'power4.out'})

        /* ------------------------------------------------------------
            タイトルテキスト
        ------------------------------------------------------------ */
        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       100,
            fontWeight:     900,
            fill:           'black',
            letterSpacing:  800
        });
        this.titleText = new PIXI.Text('MASTERMIND', this.titleStyle);
        this.titleText.anchor.set(0.5);
        this.titleText.alpha = 0;
        this.addChild(this.titleText);
         
        gsap.timeline()
            .to(this.titleStyle, { letterSpacing: 20, duration: 2, ease: 'power4.out'}, '+=0.3')
            .to(this.titleStyle, { letterSpacing: 5, duration:1, ease: 'none'})
        this.titleText.scale.x = 50;
        this.titleText.scale.y = 50;
        gsap.timeline()
        .to(this.titleText.scale, {x:0.9, y:0.9, duration:2.5, ease:'power2.out'})
        .to(this.titleText.scale, {x:1.15, y:1.15, duration:1.5, ease:'power1.inOut'})

        gsap.to(this.titleText, {alpha:1, duration:1});

        /* ------------------------------------------------------------
            サブテキスト
        ------------------------------------------------------------ */
        this.descStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       39,
            fontWeight:     400,
            fill:           'black',
        })
        this.descText = new PIXI.Text('Guess the 4-digit secret code (no duplicates).', this.descStyle);
        this.descText.anchor.set(0.5);
        this.descText.y += 80;
        this.descText.alpha = 0;
        this.descText.scale.x = 0.6;
        this.descText.scale.y = 0.6;
        this.addChild(this.descText);

        gsap.timeline().to(this.descText, {alpha:1, duration:1}, '+=3.2');
        gsap.timeline().to(this.descText.scale, {x:1, y:1, duration:0.9}, '+=3');

        /* ------------------------------------------------------------
            説明
        ------------------------------------------------------------ */
        this.instStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       39,
            fontWeight:     200,
            fill:           'black',
        })
        this.instText = new PIXI.Text('- instruction - 文章は後で考える', this.instStyle);
        this.instText.anchor.set(0.5);
        this.instText.y += 200;
        this.instText.alpha = 0;
        this.addChild(this.instText);

        gsap.timeline().to(this.instText, {alpha: 1, duration: 1}, '+=3.5')

        /* ------------------------------------------------------------
            startbtn
        ------------------------------------------------------------ */        
        this.btnStart = new PIXI.Sprite();
        this.addChild(this.btnStart);
        
        this.startStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       180,
            fontWeight:     100,
            fill:           'black',
        })
        this.btnStart = new PIXI.Text('↓', this.startStyle);
        this.btnStart.anchor.set(0.5);
        this.btnStart.y = 500;
        this.btnStart.alpha = 0;
        this.addChild(this.btnStart);
        gsap.timeline().to(this.btnStart, {y: 550, duration:0.5, ease:'power1.out'}, '+=4');
        gsap.timeline().to(this.btnStart, {alpha:1, duration: 0.5}, '+=4').call(this.enableStart.bind(this));   
    }
    

    enableStart(){
        this.btnStart.interactive = true;
        this.btnStart.on('touchstart', (event) => {
            this.btnStart.interactive = false;
            this.readyToDie();
        });
    }
    
    readyToDie(){
        this.btnStart.scale.x = 1.3;
        this.btnStart.scale.y = 1.3;
        gsap.timeline().to(this.btnStart.scale, {x:2, y:2, duration:0.1, ease:'expo'})
        gsap.timeline().to(this.btnStart, {y:1000, duration:0.5, ease:'power1.in'}, '+=0.05')
        // this.timeline().to(this.btnStart, {y:600})

        // CIRCLE
        this.circle = new PIXI.Graphics();
        this.addChild(this.circle);
        this.circle.beginFill(0x000000);
        this.circle.drawCircle(0, 0, 20);
        this.circle.y = 500;
        this.circle.alpha =0;
        gsap.to(this.circle, {alpha:1, duration:0.4});
        gsap.timeline().to(this.titleText, {y:-100, alpha:0, duration:0.3, ease:'power1.in'})
        .to(this.descText, {y:-100, alpha:0, duration:0.3, ease:'power1.in'}, '-=50%')
        .to(this.instText, {y:-100, alpha:0, duration:0.3, ease:'power1.in'}, '-=50%')
        
        gsap.timeline().to(this.circle.scale, {x:50, y:50, duration:0.4})
            .call(()=>{
                this.parent.startGame();
            });
        gsap.timeline().to(this.circle, {y:-2500, duration:1, ease:'power4.inOut'}, '+=0.1')
    }

    
}