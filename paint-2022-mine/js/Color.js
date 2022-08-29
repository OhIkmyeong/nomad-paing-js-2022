export class Color{
    constructor(PAINT){
        this.PAINT = PAINT;
        this.$curr = document.getElementById('color-curr');
        this.$plt = document.getElementById('palette');
        this.init();
    }//constructor

    /** 팔레트 관련 기능 총괄(색상 선택 및 변경 반영) */
    init(){
        this.$curr.addEventListener('change', this.change_color);
        this.$plt.addEventListener('click',this.change_color);
    }//init

    /** 색상 바꾸기 */
    change_color = e => {
        if(e.target.tagName !== "INPUT") return;
        const val = e.target.value
        if(e.target !== this.$curr) this.$curr.value = val;
        this.PAINT.ctx.strokeStyle = val;
        this.PAINT.ctx.fillStyle = val;
    }//change_color
}//Color