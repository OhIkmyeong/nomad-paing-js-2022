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


/*  */
$canvas.addEventListener('mousedown',on_down,{once:true});
$canvas.addEventListener('mouseup',on_up);
$canvas.addEventListener('mouseleave',on_up);

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

/** line Width */
on_line_width();
$lineWidth.addEventListener('change',on_line_width);
function on_line_width(){
    ctx.lineWidth = $lineWidth.value;
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

$mode.addEventListener('click',on_click_mode);

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

$eraser.addEventListener('click',(e)=>{
    isEraser = !isEraser;
    $eraser.textContent = isEraser ? "지우개 ON" : "지우개 OFF";
});

/** 캔버스 전체 지우기 */
function reset_canvas(){
    if(confirm('캔버스를 지우시겠습니까?')) ctx.clearRect(0,0,finalSize,finalSize);
}//reset_canvas
$reset.addEventListener('click',reset_canvas);
/** 캔버스 저장 */