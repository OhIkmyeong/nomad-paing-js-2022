export class SettingPaint{
    constructor(PAINT){
        this.PAINT = PAINT;

        this.SIZE = Object.freeze({
            wid : 700, 
            hei : 700
        });

        this.$save = document.getElementById('btn_save');
        this.$reset = document.getElementById('btn_reset');
    }//constructor

    /** 캔버스 사이즈 조정 */
    set_size(){
        const {wid,hei} = this.SIZE;
        this.PAINT.$canvas.width = wid;
        this.PAINT.$canvas.height = hei;
    }//set_size
    
    /** 캔버스 리셋 */
    reset = () =>{
        const {wid,hei} = this.SIZE;
        this.PAINT.ctx.clearRect(0,0,wid,hei);
    }//reset

    /** 캔버스 이름으로 저장 */
    save = ()=>{
        const LINK = document.createElement('A');
        LINK.href = this.PAINT.$canvas.toDataURL('image/png');
        LINK.download = "노마드코더 그림판";
        LINK.click();
    }//save

    /* Event Handler */
    add_event(){
        this.$save.addEventListener('click',this.save);
        this.$reset.addEventListener('click',this.reset);
    }//add_event
}//SettingPaint