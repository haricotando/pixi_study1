/* ============================================================
    ステージの初期化
============================================================ */
let app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window
});
document.body.appendChild(app.view);

let g = new PIXI.Graphics();
g.beginFill(0xffee88);
g.drawRect(-50, -50, 100, 100); 
g.endFill();

app.stage.addChild(g);
centering();


/*
    https://qiita.com/geregeregere/items/d8b7b51dd60f22d5e88a
    ここみながら再開する
*/

/* ------------------------------------------------------------
その他の処理
------------------------------------------------------------ */
app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png')
    .load(drawBunny);

function drawBunny()
{
    var bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    app.stage.addChild(bunny);
}








/* 色々とセンタリングする */
function centering(){
    g.x = app.screen.width / 2;
    g.y = app.screen.height / 2;
}

let timeoutID = 0;
window.addEventListener('resize', function(){
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        centering();
    }, 100);
}, false);