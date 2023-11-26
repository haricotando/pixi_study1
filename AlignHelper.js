class AlignHelper {
    
    static hello(){
        console.log('hello');
    }
    
    static horizontalCenter(parent, target){
        target.x = Math.round((parent.width - target.width) / 2);
    }

    static verticalCenter(parent, target){
        target.y = Math.round((parent.height - target.height) / 2);
    }

    static top(parent, target){
        
    }

    static center(parent, target){
        this.horizontalCenter(parent, target);
        this.verticalCenter(parent, target);
    }

    static bottom(parent, target){

    }
}

export default AlignHelper;