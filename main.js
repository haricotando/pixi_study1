import { ApplicationRoot } from './ApplicationRoot.js';

/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */
// リサイズイベントのtimeout
let timeoutID = 0;

/* ------------------------------------------------------------
    アセット読み込み
------------------------------------------------------------ */
WebFont.load({
    google: {
      families: ['Inter:100,200,300,400,500,600,700,800,900'],
    },
    
    active: () => {
        init();
        console.log('OK: Font');
    },
    // フォント読み込み失敗時
    inactive: () => {
        console.log("ER: Font");
    },
  });

function init(){
    let app = new PIXI.Application({
        background: '#FFFFFF',
        resizeTo: window
    });
    document.body.appendChild(app.view);
    
    const applicationRoot = new ApplicationRoot();
    app.stage.addChild(applicationRoot);
}




























/* ============================================================
    ステージの初期化
============================================================ */
// let app = new PIXI.Application({
//     background: '#FFFFFF',
//     resizeTo: window
// });
// document.body.appendChild(app.view);

/* ------------------------------------------------------------
    ここで諸々初期化
------------------------------------------------------------ */
// function init(){
//     root = new PIXI.Container();
//     app.stage.addChild(root);
    
//     keyPadContainer = new KeyPadContainer();
//     root.addChild(keyPadContainer);

//     guessContainer = new GuessContainer();
//     root.addChild(guessContainer);


// }

/* ------------------------------------------------------------
リサイズイベント
------------------------------------------------------------ */
// function alignHandler(){
//     AlignHelper.bottom(app.screen, keyPadContainer);
// }

// window.addEventListener('resize', function(){
//     clearTimeout(timeoutID);
//     timeoutID = setTimeout(function(){
//         alignHandler();
//     }, 50);
// }, false);



// function addBunny(){
//     let bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
//     bunny.anchor.set(0.5);
//     container.addChild(bunny);
// }