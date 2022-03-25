class ToolSize {
    private _currSize: number = 1
    sizeDOMList: NodeListOf<Element>

    constructor() {
        this.sizeDOMList = document.querySelectorAll('#size .size-list > span')!
        this.setAllEventListener()
    }

    setAllEventListener() {
        this.sizeDOMList.forEach((dom) => {
            dom.addEventListener('click', e => {
                this.changeSize(dom)
            })
        })
    }

    changeSize(dom: Element) {
        // 设置样式
        this.sizeDOMList.forEach(dom => {
            dom.classList.remove('size-active')
        })
        dom.classList.add('size-active')
        
        // 设置画笔大小
        this._currSize = parseInt(dom.id.split('-')[1])
        
    }


    get currSize(): number { return this._currSize }
}
export default ToolSize