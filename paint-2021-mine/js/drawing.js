export class Drawing{
    constructor(PAINT){
        this.PAINT = PAINT;
        this.$mode = document.getElementById('btn_mode');
        this.PAINTING = false;
        this.FILLING = false;
    }//constructor

    /* 이벤트 추가 */
    add_event(){
        this.set_toggle_mode();

        this.PAINT.$canvas.addEventListener('mousedown',this.start,{once:true});
        this.PAINT.$canvas.addEventListener('mousemove',this.on_move);
        this.PAINT.$canvas.addEventListener('mouseleave',this.stop);
        this.PAINT.$canvas.addEventListener('mouseup',this.stop);
        this.PAINT.$canvas.addEventListener('click',this.on_click);
    }//add_event
    
    /** 모드전환 - brush or fill */
    set_toggle_mode(){
        this.$mode.addEventListener('click',()=>{
            const currMode = this.$mode.dataset.mode;
            this.$mode.dataset.mode = currMode == "fill" ? "brush" : "fill";
            this.FILLING = currMode == "fill" ? false : true;
            this.$mode.innerText = currMode == "fill" ? "brush" : "fill";
        });//click
    }//set_toggle_mode

    /* 캔버스 드로잉 관련 */   
    /** 그리기 시작 */
    start = () => { this.PAINTING = true; }//start
    
    /** 그리기 종료 */
    stop = () => {
        this.PAINTING = false;
        this.PAINT.ctx.closePath();
        this.PAINT.$canvas.addEventListener('mousedown',this.start,{once:true});
    }//stop

    /** 드로잉-brush-움직일때 */
    on_move = e => {
        const {offsetX:posX, offsetY:posY} = e;
        if(!this.PAINTING){
            this.PAINT.ctx.beginPath();
            this.PAINT.ctx.moveTo(posX,posY);
        }else{
            this.PAINT.ctx.lineTo(posX,posY);
            this.PAINT.ctx.stroke();
        }//if else
    }//on_move

    /** 드로잉-fill 모드인지 확인하여 채움 여부 결정 */
    on_click = e => {
        if(!this.FILLING) return;
        const {wid,hei} = this.PAINT.SETTING.SIZE;
        this.PAINT.ctx.fillStyle = this.PAINT.PLT.currColor;
        this.PAINT.ctx.fillRect(0,0,wid,hei);
    }//on_click
}//class-Drawing