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
        this.backgroundContainer.scale.x = 2;
        this.backgroundContainer.scale.y = 2;
        this.backgroundContainer.rotation = 0.4;
        this.backgroundContainer.alpha = 0;

        // gsap.to(this.backgroundContainer.scale, {x:1, y:1, duration:.5, ease:'power4.out'})
        // gsap.to(this.backgroundContainer, {alpha:1, duration:1})
        // gsap.to(this.backgroundContainer, {rotation:-0.4, duration:5, ease:'power4.out'})

        this.titleStyle = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       100,
            fontWeight:     600,
            fill:           'black',
            letterSpacing:  1000
        });
        this.titleText = new PIXI.Text('MASTERMIND', this.titleStyle);
        // this.titleText.y = 300;
        this.titleText.anchor.set(0.5);
        // this.titleText.x = 400;
        this.titleText.alpha = 0;

        // TIMELINE
        let timeline = gsap.timeline({repeat:0});
        timeline.to(this.backgroundContainer, {alpha:1, duration:2, ease:'power4.out'});
        timeline.to(this.backgroundContainer.scale, {x:1, y:1, duration:3, ease:'power4.out'}, '-=2');
        timeline.to(this.backgroundContainer, {rotation:-0.4, duration:3, ease:'linear'}, '-=3');
        timeline.to(this.backgroundContainer, {alpha:0, duration:1, ease:'linear'}, '-=2');
        
        gsap.to(this.titleText, { alpha: 1, duration: 1, ease: 'linear'});
        gsap.to(this.titleStyle, { letterSpacing: 20, duration: 1.5, ease: 'power4.out'});
        
        this.addChild(this.titleText);
        
        //
        // this.descStyle = new PIXI.TextStyle({
        //     fontFamily:     'Inter',
        //     fontSize:       32,
        //     fontWeight:     300,
        //     fill:           'black',
        // })
        // this.descText = new PIXI.Text('Guess the 4-digit secret code (no duplicates).', this.descStyle);
        // AlignHelper.center(this.background, this.descText);
        // this.descText.y += 30;
        // this.addChild(this.descText);
    }
}