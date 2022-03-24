
import ShapeType from "../enum/ShapeType"
import ShapeObject from "../interface/ShapeObject"

class Shape {
    
    shapeList: Array<ShapeObject> = []
    shapeDOMList: NodeListOf<Element>
    
    _currShape: ShapeObject

    constructor() {

        this.shapeDOMList = document.querySelectorAll('#shape .shape-list > span')

        // 默认选中 dot
        this._currShape  = {
            type: ShapeType.NONE,
            DOM: document.querySelector('#shape .shape-list > #shape-dot')!
        }
        
        this.init()
    }

    init() {
        // 遍历形状DOM列表，对每个形状设置【点击事件】以及设置一个自定义【shapeList】，方便使用
        this.shapeDOMList.forEach(node => {
            this.setShapeDOMClickEvent(node)
            this.setShapeList(node)
        })

    }

    setShapeDOMClickEvent(node: Element) {

        node.addEventListener('click', (e) => {
            this.changeShape(e as PointerEvent)
        })
    }

    setShapeList(node: Element) {
        const shapeObj: ShapeObject = {
            type: ShapeType.NONE,
            DOM: node
        }

        switch(node.id) {
            case 'shape-dot':
                shapeObj.type = ShapeType.DOT
                break
            case 'shape-line':
                shapeObj.type = ShapeType.LINE
                break
            case 'shape-rect':
                shapeObj.type = ShapeType.RECT
                break
            case 'shape-circle':
                shapeObj.type = ShapeType.CIRCLE
                break
            case 'shape-triangle':
                shapeObj.type = ShapeType.TRIANGLE
                break
            case 'shape-star':
                shapeObj.type = ShapeType.STAR
                break
        }
        
        this.shapeList.push(shapeObj)
    }

    changeShape(e: PointerEvent) {
        // 样式设置（active）
        this.shapeDOMList.forEach(shape => {
            shape.classList.remove('shape-active')
        });
        (e.target as Element).classList.add('shape-active')

        // 设置当前形状 currShape
        let target: ShapeObject | undefined = this.shapeList.find(shape => {
            return e.target === shape.DOM
        })
        target && (this._currShape = target)
        
        // console.log('currShape', this.currShape)
    }

    get currShape(): ShapeObject { return this._currShape }

}

export default Shape