
import ShapeType from "../enum/ShapeType"
class ToolBar {
    
    tools: NodeListOf<Element>
    currShapeType: ShapeType = ShapeType.NONE

    constructor() {

        this.tools = document.querySelectorAll('.tool-item')
    }

    init() {

        document.querySelector('#line')?.addEventListener('click', (e) => {
            this.toolActive(e as PointerEvent)
            this.currShapeType = ShapeType.LINE
        })

        document.querySelector('#rect')?.addEventListener('click', (e) => {
            this.toolActive(e as PointerEvent)
            this.currShapeType = ShapeType.RECT

        })
    }

    toolActive(e: PointerEvent) {
        this.tools.forEach(tool => {
            tool.classList.remove('tool-item-active')
        });

        (e.target as Element).classList.add('tool-item-active')
    }

}

export default ToolBar