export class Palette{
    constructor(PAINT){
        this.PAINT = PAINT;
        this.$plt = document.getElementById('ul_plt');
        this.$stroke = document.getElementById('ipt_stroke');
    
        this.currColor = "#2c2c2c";
        this.currWidth = undefined;
    }//constructor

    set_color = (e) => {
        const target = e.target;
        if(target.tagName !== "LI") return;
        this.currColor = target.style.backgroundColor;
        this.set_palette(target);
        this.change_color();
    }//set_color

    set_palette(target){
        const $$colors = Array.from(target.parentElement.children);
        $$colors.forEach($color => {
            if($color == target){
                $color.classList.add('on');
            }else{
                $color.classList.remove('on');
            }//if else
        });//forEach
    }//set_palette

    change_color(){
        this.PAINT.ctx.strokeStyle = this.currColor;
    }//change_color

    set_line_width = () =>{
        this.currWidth = this.$stroke.value;
        this.PAINT.ctx.lineWidth = this.currWidth;
    }//set_line_width

    /* Event Handler */
    add_event(){
        //팔레트 색 지정
        this.$plt.addEventListener('click',this.set_color);

        //선 굵기 지정
        this.$stroke.addEventListener('change', this.set_line_width);
    }//add_event
}//Plt