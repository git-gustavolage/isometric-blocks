export class CheckboxComp {
    constructor({ value = true, labelId = null, boxId = null, markId = null } = {}) {
        this.value = !!value;
        this.labelId = labelId; // id do LabelComp que mostra o texto
        this.boxId = boxId;     // id do RectComp que funciona como box visual
        this.markId = markId;   // id do LabelComp que mostra 'X' quando marcado
    }

    toggle() { this.value = !this.value; }
}
