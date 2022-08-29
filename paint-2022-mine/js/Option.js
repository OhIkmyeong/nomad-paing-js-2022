export class Option{
    constructor(PAINT){
        this.PAINT = PAINT;

        this.$lineWidth = document.getElementById('lineWidth');
        this.$reset = document.getElementById('btn-reset');
        this.$save = document.getElementById('btn-save');
        this.InitialSize = this.set_canvas_size();
        this.sizeParam = 0;
    }//constructor

    /** 옵션 총괄(캔버스 사이즈, 브러쉬 굵기, 전부 지우기, 저장)  */
    init(){
        this.set_canvas_size();
        this.set_brush_size();
        this.$lineWidth.addEventListener('change',this.set_brush_size);
        this.$reset.addEventListener('click',this.reset_canvas);
        this.$save.addEventListener('click',this.save_canvas);

        window.addEventListener('resize',this.set_size_param);
    }//init

    /** 캔버스 사이즈 조정 */
    set_canvas_size = ()=>{
        const size = this.PAINT.$canvas.offsetWidth;
        this.PAINT.$canvas.width = size;
        this.PAINT.$canvas.height = size;
        return size;
    }//set_canvas_size

    /** 브라우저 크기 변경시 */
    set_size_param = () =>{
        const size = this.PAINT.$canvas.offsetWidth;
        this.sizeParam = (this.InitialSize - size);
    }//set_size_param

    /** 브러쉬 사이즈 조정 */
    set_brush_size = () =>{
        this.PAINT.ctx.lineWidth = this.$lineWidth.value;
    }//set_brush_size

    /** 캔버스 전부 지우기 */
    reset_canvas = () =>{
        if(confirm('전부 지우시겠습니까?')){
            const size = this.PAINT.$canvas.width;
            this.PAINT.ctx.clearRect(0,0,size,size);
        }//if
    }//reset_canvas

    /** 캔버스 그림 저장 */
    save_canvas = () =>{
        const link = document.createElement('A');
        link.href = this.PAINT.$canvas.toDataURL('image/png');
        const date = new Date();
        const dateStr = `${date.getFullYear()}${number_to_digit(date.getMonth()+1)}${number_to_digit(date.getDate())}-${number_to_digit(date.getHours())}${number_to_digit(date.getMinutes())}${number_to_digit(date.getSeconds())}${date.getMilliseconds()}`;
        link.download = "paintJS-"+dateStr;
        link.click();
    }//save_canvas
}//class-Option

function number_to_digit(num){return String(num).padStart(2,"0");}