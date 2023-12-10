function display() {
    parent.display(document);
}
window.onblur = function () {
    parent.resetDisplay(document);
}