import { KeyPad } from './KeyPad.js';
import AlignHelper from './AlignHelper.js';

/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */
// メインコンテナ
let container = new PIXI.Container();
// リサイズイベントのtimeout
let timeoutID = 0;
let numberContainer = [];

/* ============================================================
    ステージの初期化
============================================================ */
let app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window
});
document.body.appendChild(app.view);
app.stage.addChild(container);

/* ------------------------------------------------------------
    ここで諸々初期化
------------------------------------------------------------ */
function init(){
    
    // パッドの初期化
    let padSize = 180;
    let padMargin = 8;
    for(let i=0; i<10; i++){
        let pad = new KeyPad(padSize, i+1);
        container.addChild(pad);
        pad.x = i*(padSize + padMargin);
        if(i>4){
            pad.y = padSize + padMargin;
            pad.x = (i-5)*(padSize + padMargin);
        }
        numberContainer.push(pad);
    }
}

init();
alignHandler();

/* ------------------------------------------------------------
    リサイズイベント
------------------------------------------------------------ */
function alignHandler(){
    // let stageCenterX = app.screen.width / 2;
    // let stageCenterY = app.screen.height / 2;
    
    // let target = container;
    // target.x = stageCenterX - (target.width / 2);
    // target.y = stageCenterY - (target.height / 2);
    AlignHelper.center(app.screen, container);
}

window.addEventListener('resize', function(){
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        alignHandler();
    }, 50);
}, false);












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

// function addRect(){
//     let rect = new PIXI.Graphics();
//     rect.beginFill(0xffee88);
//     rect.drawRect(0, 0, 100, 100); 
//     rect.endFill();
    
    
//     container.addChild(rect);
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