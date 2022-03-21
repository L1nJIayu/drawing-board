import ToolBar from "./ToolBar"
import ShapeType from "../enum/ShapeType"

class DrawingBoard {
    
    canvasDOM: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    imageDataList: Array<ImageData> = []

    startX: number = 0
    startY: number = 0

    isDrawing: boolean = false

    toolBar: ToolBar = new ToolBar()


    constructor() {
        this.canvasDOM = document.querySelector('canvas')!
        this.ctx = this.canvasDOM.getContext('2d')!

        this.canvasDOM.width = window.innerWidth
        this.canvasDOM.height = window.innerHeight - 80

        this.toolBar.init()
    }

    init() {

        this.canvasDOM.addEventListener('mousedown', e => {
            console.log('开始画画')

            this.isDrawing = true

            const { offsetX, offsetY } = e
            this.startX = offsetX
            this.startY = offsetY

            console.log('startX：', this.startX, '\nstarY:', this.startY)


        })

        this.canvasDOM.addEventListener('mousemove', e => {
            if(this.isDrawing) {
                
                switch(this.toolBar.currShapeType) {
                    case ShapeType.LINE:
                        this.drawLine(e)
                        break
                    case ShapeType.RECT:
                        this.drawRect(e)
                        break
                }
                
            }
        })


        this.canvasDOM.addEventListener('mouseup', e => {
            console.log('停止画画')

            this.isDrawing = false

            this.startX = 0
            this.startY = 0

            this.imageDataList.push(this.ctx.getImageData(0,0,window.innerWidth,window.innerHeight))
        })



    }

    // 更新画板
    updateDrawingBoard() {

        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        if(this.imageDataList.length > 0) {
            this.ctx.putImageData(this.imageDataList[this.imageDataList.length - 1], 0, 0, 0, 0, window.innerWidth, window.innerHeight)
        }
        
    }

    // 画矩形
    drawRect(e: MouseEvent) {

        const { offsetX, offsetY } = e
        let width = offsetX - this.startX
        let height = offsetY - this.startY

                this.updateDrawingBoard()

        this.ctx.beginPath()

        this.ctx.rect(this.startX, this.startY, width, height)
        
        this.ctx.stroke()
        this.ctx.closePath()
        // ctx.fill()

    }
    // 画线段
    drawLine(e: MouseEvent) {

        this.updateDrawingBoard()

        this.ctx.beginPath()

        const { offsetX, offsetY } = e
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(offsetX, offsetY)
        this.ctx.stroke()
        this.ctx.closePath()
    }
}


export default DrawingBoard