export class MenuComp {
    constructor(options = ["Entrar", "Configurações"]) {
        this.options = options;
        this.selected = 0;
    }

    moveUp() {
        this.selected = (this.selected - 1 + this.options.length) % this.options.length;
    }

    moveDown() {
        this.selected = (this.selected + 1) % this.options.length;
    }

    getSelectedOption() {
        return this.options[this.selected];
    }
}
