class AlignHelper {
    
    /*

    AlignHelper.center(parent, this);
    作りながら最適化していく

    */

    static hello(){
        console.log('hello');
    }

    static centerWindow(target){
        target.x = window.innerWidth / 2;
        target.y = window.innerHeight / 2;
    }

    // static horizontalCenter(parent, target){
    //     let parentWidth = parent == window ? window.innerWidth : parent.width;
    //     target.x = Math.round((parentWidth - target.width) / 2);
    // }
    
    // static verticalCenter(parent, target){
    //     target.y = Math.round((parent.height - target.height) / 2);
    // }
    
    // static verticalBottom(parent, target){
    //     let parentHeight = parent == window ? window.innerHeight : parent.height;
    //     target.y = Math.round(parentHeight - target.height);
    // }
    
    // static top(parent, target){
    //     this.horizontalCenter(parent, target);
    //     target.y = 0;
        
    // }

    // static center(parent, target){
    //     this.horizontalCenter(parent, target);
    //     this.verticalCenter(parent, target);
    // }

    // static bottom(parent, target){
    //     this.horizontalCenter(parent, target);
    //     this.verticalBottom(parent, target);
    // }

    // static lt(parent, target){
    // }

    // static rt(parent, target){
    // }

    // static left(parent, target){
    //     target.x = 0;
    // }

    // static right(parent, target){
    //     let parentWidth = parent == window ? window.innerWidth : parent.width;
    //     target.x = parentWidth;
    // }

    // static lb(parent, target){
    // }

    // static rb(parent, target){
    // }
}

export default AlignHelper;