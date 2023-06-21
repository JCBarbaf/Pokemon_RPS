setInterval(TitleAnim, 50);
maxsize = 1.05;
size = 1.01;
grow = true;
increment = 0.004;
function TitleAnim() {
    if (size >= maxsize) {
        grow = false;
    } else if (size <= 1) {
        grow = true;
    }
    if (grow) {
        size += increment;
    } else {
        size -= increment;
    }
    document.getElementById("titleimg").style.transform = "scale(" + size + ")";
}