
import ShapeObject from "../interface/ShapeObject"
import ToolShape from "./ToolShape"
import ToolColor from "./ToolColor"
import ToolSize from './ToolSize'
class ToolBar {
    
    sizeList: NodeListOf<Element>
    toolShape: ToolShape
    toolColor: ToolColor
    toolSize: ToolSize


    constructor() {

        this.sizeList = document.querySelectorAll('#size .size-list > span')
        this.toolShape = new ToolShape()
        this.toolColor = new ToolColor()
        this.toolSize = new ToolSize()

    }

    init() {

    }


    get currShape(): ShapeObject { return this.toolShape.currShape }
    get currColor(): string { return this.toolColor.currColor }
    get currSize(): number { return this.toolSize.currSize }

}

export default ToolBar