let app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

let g = new PIXI.Graphics();
g.beginFill(0xffee88);
g.drawRect(0, 0, 250, 250);
g.endFill();

app.stage.addChild(g);

g.x = app.screen.width / 2;
g.y = app.screen.height / 2;