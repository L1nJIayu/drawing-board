
import ShapeObject from "../interface/ShapeObject"
import ToolShape from "./ToolShape"
import ToolColor from "./ToolColor"
class ToolBar {
    
    sizeList: NodeListOf<Element>
    toolShape: ToolShape
    toolColor: ToolColor


    constructor() {

        this.sizeList = document.querySelectorAll('#size .size-list > span')
        this.toolShape = new ToolShape()
        this.toolColor = new ToolColor()

    }

    init() {

    }

    get currShape(): ShapeObject { return this.toolShape.currShape }
    get currColor(): string { return this.toolColor.currColor }

}

export default ToolBar