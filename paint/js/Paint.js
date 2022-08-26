import { Drawing } from "./drawing.js";
import { Palette } from "./plt.js";
import { SettingPaint } from "./setting.js";

export class Paint{
    constructor(){
        this.$canvas = document.getElementById('cv');
        this.ctx = this.$canvas.getContext('2d');

        this.SETTING = new SettingPaint(this);
        this.PLT = new Palette(this);
        this.DRAW = new Drawing(this);
    }//constructor

    init(){
        /* ModiFier */
        this.SETTING.set_size();
        this.PLT.change_color();
        this.PLT.set_line_width();

        /* Event Handler */
        //팔레트 색 지정, 선 굵기 지정
        this.PLT.add_event();
        
        //캔버스 저장 및 리셋
        this.SETTING.add_event();

        //fill, brush
        this.DRAW.add_event();
    }//init
}//class-Paint