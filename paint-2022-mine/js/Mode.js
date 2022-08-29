export class Mode{
    constructor(PAINT){
        this.PAINT = PAINT;
        this.$mode = document.getElementById('mode');
        this.modeType = {brush:"brush", fill:"fill", eraser:"eraser"};
        this.mode = this.modeType.brush;
    }//constructor

    /** 모드 관련 총괄 */
    init(){
        this.$mode.addEventListener('click', (e)=>{
            if(e.target.tagName !== "INPUT") return;
            const mode = e.target.value; 
            this.mode = this.modeType[mode];
            switch(mode){
                case "brush" :
                    break;
                case "fill" :
                    break;
                case "eraser" :
                    break;
            }//switch
        });//click
    }//init
}//Mode