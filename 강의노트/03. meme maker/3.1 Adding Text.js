const $canvas = document.getElementById('cv');
const ctx = $canvas.getContext("2d");
const wWid = window.innerWidth * 0.9;
const wHei = window.innerHeight * 0.9;
const finalSize = wWid > wHei ?  wHei : wWid;
$canvas.width = finalSize > 800 ? 800 : finalSize;
$canvas.height = $canvas.width;
let isPainting = false;
let isFilling = false;
let isEraser = false;

const $lineWidth = document.getElementById('line-width');
const $color = document.getElementById('clr');
const $palette = document.getElementById('palette');
const $mode = document.getElementById('btn-mode');
const $eraser = document.getElementById('btn-eraser');
const $reset = document.getElementById('btn-reset');
const $save = document.getElementById('btn-save');
const $file = document.getElementById('file-meme');
const $txt = document.getElementById('txt-meme');

/*  */
$canvas.addEventListener('mousedown',on_down,{once:true});
$canvas.addEventListener('mouseup',on_up);
$canvas.addEventListener('mouseleave',on_up);
$canvas.addEventListener('dblclick',on_double_click);

$lineWidth.addEventListener('change',on_line_width);
$mode.addEventListener('click',on_click_mode);

$eraser.addEventListener('click',(e)=>{
    isEraser = !isEraser;
    $eraser.textContent = isEraser ? "지우개 ON" : "지우개 OFF";
});

$reset.addEventListener('click',reset_canvas);
$save.addEventListener('click',save_canvas);

$file.addEventListener('change',on_file_change);

/*  */
on_line_width();


/*  */
function on_down(e){
    if(isEraser){
        $canvas.addEventListener('mousemove',on_eraser);
        return;
    }//if
    
    if(isFilling){
        fill_canvas();
        return;
    }//if

    ctx.beginPath();
    ctx.moveTo(e.offsetX ,e.offsetY);
    isPainting = true;
    $canvas.addEventListener('mousemove',on_move);
}//on_down

function on_move(e){
    console.log('on_move');
    if(!isPainting) return;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}//on_move

function on_up(e){
    isPainting = false;
    $canvas.removeEventListener('mousemove',on_move);
    $canvas.removeEventListener('mousemove',on_eraser);
    $canvas.addEventListener('mousedown',on_down,{once:true});
}//on_up

/** line Width 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
*/
function on_line_width(){
    ctx.lineWidth = $lineWidth.value;
    ctx.lineCap = "round"; //butt | round | square
}//on_line_width

/** color */
function on_color(e){
    const val = e.target.value;
    ctx.strokeStyle = val;
    ctx.fillStyle = val;
}//on_color

$color.addEventListener('change',(e)=>{
    on_color(e);
    const $$plt = Array.from($palette.querySelectorAll('input'));
    const $checked = $$plt.find($plt => $plt.checked);
    if($checked) $checked.checked = false;
});

$palette.addEventListener('click',(e)=>{
    if(e.target.tagName !== "INPUT") return;
    on_color(e);
    $color.value = e.target.value;
});

/** 모드 전환 */
function on_click_mode(e){
    isEraser = false;
    $eraser.textContent = isEraser ? "지우개 ON" : "지우개 OFF";
    const $btn = e.currentTarget;
    const mode = $btn.dataset.mode;
    const changeMode = mode == "brush" ? "fill" : "brush";
    $btn.dataset.mode = changeMode;
    $btn.textContent = changeMode;
    isFilling = changeMode == "brush" ? false : true;
}//on_click_mode

/** 캔버스 색상 채우기 */
function fill_canvas(){
    ctx.fillRect(0,0,finalSize,finalSize);
}//fill_canvas

/** 캔버스 지우개 */
function on_eraser(e){
    console.log('asdf');
    const {offsetX,offsetY} = e;
    const size = ctx.lineWidth;
    ctx.clearRect(offsetX - size / 2, offsetY - size / 2, size, size);
}//on_eraser


/** 캔버스 전체 지우기 */
function reset_canvas(){
    if(confirm('캔버스를 지우시겠습니까?')) ctx.clearRect(0,0,finalSize,finalSize);
}//reset_canvas

/** 캔버스 저장 */
function save_canvas(){
    const link = document.createElement('A');
    link.href = $canvas.toDataURL('image/png');
    const date = new Date();
    const dateStr = `${date.getFullYear()}${number_to_digit(date.getMonth()+1)}${number_to_digit(date.getDate())}-${number_to_digit(date.getHours())}${number_to_digit(date.getMinutes())}${number_to_digit(date.getSeconds())}${date.getMilliseconds()}`;
    link.download = "paintJS-"+dateStr;
    link.click();
}//save_canvas

/** 숫자를 2자리의 문자로 반환 */
function number_to_digit(num){return String(num).padStart(2,"0");}

/** 이미지 file 등록시 */
function on_file_change(e){
    // console.dir(e);
    const file =  e.target.files[0]
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload= function(){
        const per = img.width / img.height;
        const sizeW = img.width > $canvas.width ? $canvas.width : img.width;
        const sizeH = img.width > $canvas.height ? sizeW / per  : img.height; 
        const dx = ($canvas.width / 2) - (sizeW / 2);
        const dy = ($canvas.height / 2) - (sizeH / 2);
        ctx.drawImage(img,dx,dy,sizeW,sizeH);
        $file.value = null;
    };
}//on_file_change

/** 캔버스 더블클릭시 */
function on_double_click(e){
    ctx.save();
    const txt = $txt.value;
    if(!txt) return;
    const {offsetX, offsetY} = e;
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    // ctx.strokeText(txt, offsetX, offsetY);
    ctx.fillText(txt, offsetX, offsetY);
    ctx.restore();
    
}//on_double_click