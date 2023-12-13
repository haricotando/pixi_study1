class GraphicsHelper {

    static hello(){
        console.log('hello');
    }

    static exDrawRect(x, y, width, height, fillColor, opt) {
        const graphics = new PIXI.Graphics();
        if(opt){
            if(opt.lineWidth > 0, opt.lineColor != undefined){
                graphics.lineStyle(opt.lineWidth, opt.lineColor);
            }
        }
        graphics.beginFill(fillColor);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
        return graphics;
    }

    static exDrawCircle(x, y, radius, fillColor, opt){
        const graphics = new PIXI.Graphics();
        if(opt){
            if(opt.lineWidth > 0, opt.lineColor != undefined){
                graphics.lineStyle(opt.lineWidth, opt.lineColor);
            }
        }
        graphics.beginFill(fillColor);
        graphics.drawCircle(x, y, radius);
        graphics.endFill();
        return graphics;
    };

}

export default GraphicsHelper;



