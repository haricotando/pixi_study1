// import { KeyPad } from './keypad/KeyPad.js';
import AlignHelper from './helper/AlignHelper.js';
import { KeyPadContainer } from './keypad/KeyPadContainer.js';

/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */
// メインコンテナ
let container = new PIXI.Container();
// リサイズイベントのtimeout
let timeoutID = 0;
let keyPadContainer;

/* ============================================================
    ステージの初期化
============================================================ */
let app = new PIXI.Application({
    background: '#FFFFFF',
    resizeTo: window
});

/* ------------------------------------------------------------
    ここで諸々初期化
------------------------------------------------------------ */
function init(){
    document.body.appendChild(app.view);
    app.stage.addChild(container);

    keyPadContainer = new KeyPadContainer();
    container.addChild(keyPadContainer);

    // パッドの初期化
    // let keyPadContainerBackground = new PIXI.Graphics();
    // keyPadContainerBackground.beginFill(0xFFFFFF);
    // keyPadContainerBackground.drawRect(0, 0, 100, 400);
    // keyPadContainerBackground.endFill();
    // keyPadContainer.addChild(keyPadContainerBackground);

    // let padSize = 180;
    // let padMargin = 8;
    // for(let i=0; i<10; i++){
    //     let pad = new KeyPad(padSize, i+1);
    //     keyPadContainer.addChild(pad);
    //     pad.x = i*(padSize + padMargin);
    //     if(i>4){
    //         pad.y = padSize + padMargin;
    //         pad.x = (i-5)*(padSize + padMargin);
    //     }
    //     keyPadList.push(pad);
    // }
    
    // app.stage.addChild(keyPadContainer)
}

init();
alignHandler();



    //    function loadFonts() {
    //         return new Promise(resolve => {
    //             const fontLink = document.getElementById('google-fonts');
    //             if (fontLink.sheet) {
    //                 resolve();
    //             } else {
    //                 fontLink.onload = resolve;
    //             }
    //         });
    //     }

    //     loadFonts().then(() => {
    //         addRect();
            
    //     });






/* ------------------------------------------------------------
リサイズイベント
------------------------------------------------------------ */
function alignHandler(){
    AlignHelper.bottom(app.screen, keyPadContainer);
}

window.addEventListener('resize', function(){
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        alignHandler();
    }, 50);
}, false);







// function anim(){
//     let gcon = new PIXI.Sprite();
//     let g = new PIXI.Graphics();
//     g.beginFill(0xFF0000);
//     g.drawRect(-50, -50, 100, 100);
//     g.endFill();
//     gcon.addChild(g);
//     container.addChild(gcon);
//     gsap.to(gcon, {alpha: 0.5, duration: 1.5})
// }





/* ------------------------------------------------------------
    
------------------------------------------------------------ */
// function addText(arg){
//     text = new PIXI.Text('This is a PixiJS text ++++ superupser   ', {
//         fontFamily: 'Arial',
//         fontSize: 24,
//         fill: 0xff1010,
//         align: 'center',
//     });
//     container.addChild(text);
// }



// function addBunny(){
//     let bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
//     bunny.anchor.set(0.5);
//     container.addChild(bunny);
// }












// var circle = new PIXI.Graphics();
// circle.beginFill(0xFF0000);
// circle.drawCircle(-20, -20, 40, 40);
// circle.endFill();

// container.addChild(circle);
// app.stage.addChild(container);

/*
    https://qiita.com/geregeregere/items/d8b7b51dd60f22d5e88a
    ここみながら再開する
*/

/* ------------------------------------------------------------
その他の処理
------------------------------------------------------------ */
// app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png')
//     .load(drawBunny);

// function drawBunny()
// {
//     var bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);

//     // Center the sprite's anchor point
//     bunny.anchor.set(0.5);

//     // Move the sprite to the center of the screen
//     bunny.x = app.renderer.width / 2;
//     bunny.y = app.renderer.height / 2;

//     app.stage.addChild(bunny);
// }


// 新しいSpriteを作成
// const sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');

// // anchorを設定
// sprite.anchor.set(0.5); // 例えば、中心点を基準に設定
// app.stage.addChild(sprite)