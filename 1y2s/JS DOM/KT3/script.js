let root = document.querySelector('#root');
let rootRect = root.getBoundingClientRect();
let target = document.querySelector('#target');
let output = document.querySelector('#output');
output.textContent = 0;

target.onmousedown = function(event) {

let targetRect = target.getBoundingClientRect();
let shiftX = event.pageX - targetRect.x;

function moveElem(event){
    let x_pos = event.pageX - rootRect.x - shiftX;
    if (x_pos < 0) x_pos = 0;
    if (x_pos > root.clientWidth) x_pos = root.clientWidth;
    target.style.left = x_pos + 'px';
    output.style.left = x_pos - 15+ 'px';
    let output_value = target.offsetLeft - root.offsetLeft;
    output.textContent = Math.floor(output_value / 5);
}

document.addEventListener("mousemove", moveElem);

function onMouseUp() {
    document.removeEventListener("mousemove", moveElem);
    document.removeEventListener("mouseup", onMouseUp);
};

document.addEventListener("mouseup", onMouseUp);

}
