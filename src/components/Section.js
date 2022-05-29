export default class Section {
    constructor({items,renderer},container) {
        this._rendererItems=items;
        this._renderer=renderer;
        this._container=container
    }

    addItem(element){
        this._container.prepend(element)
    }
    renderItems(){
        this._rendererItems.forEach(item=>
        this._renderer(item))
    }
}
