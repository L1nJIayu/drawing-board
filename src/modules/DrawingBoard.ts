import ToolBar from "./ToolBar"
import ShapeType from "../enum/ShapeType"

class DrawingBoard {
    
    canvasDOM: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    imageDataList: Array<ImageData> = []
    currImageData: ImageData|undefined
    currImageDataIndex: number = 0

    startX: number = 0
    startY: number = 0

    isDrawing: boolean = false

    toolBar: ToolBar = new ToolBar()



    constructor() {
        this.canvasDOM = document.querySelector('canvas')!
        this.ctx = this.canvasDOM.getContext('2d')!

        this.setCanvasSize()

        this.toolBar.init()

    }

    init() {
        // 设置监听事件
        this.setAllEventListener()
        // 将空白的画板内容作为第一个imageData
        this.saveCurrImageData()
    }
    setCanvasSize() {
        this.canvasDOM.width = window.innerWidth - (24 * 2)
        this.canvasDOM.height = window.innerHeight - (80 + 24 * 2)
        
        let editor = document.querySelector('#editor')
        console.log([editor],editor?.getClientRects())
    }

    setAllEventListener() {
        this.canvasDOM.addEventListener('mousedown', e => this.handleBeginDrawing(e))

        this.canvasDOM.addEventListener('mousemove', e => this.handleDrawing(e))


        this.canvasDOM.addEventListener('mouseup', e => this.handleStopDrawing())

        const withdrawBtn = document.querySelector('#withdraw')!
        const recoveryBtn = document.querySelector('#recovery')!
        const downloadBtn = document.querySelector('#download')!
        const clearBtn = document.querySelector('#clear')!
        const importImageInput = document.querySelector('#importImage')!

        withdrawBtn.addEventListener('click', () => this.withdraw())
        recoveryBtn.addEventListener('click', () => this.recovery())
        downloadBtn.addEventListener('click', () => this.download())
        clearBtn.addEventListener('click', () => this.clear())
        importImageInput.addEventListener('change', (e) => this.importImage(e))

        // 响应式控制画布大小
        window.addEventListener('resize', () => this.setCanvasSize())

    }

    // 开始绘制
    handleBeginDrawing(e: MouseEvent) {

        this.isDrawing = true

        const { offsetX, offsetY } = e
        this.startX = offsetX
        this.startY = offsetY

        // 颜色
        this.ctx.strokeStyle = this.toolBar.currColor
        // 大小
        this.ctx.lineWidth = this.toolBar.currSize
        // 每次开始绘制前，都需要更新【图像数据队列】，以保证【当前图像数据】处于队列的最后一项
        this.updateImageDataList()

    }
    // 绘制中
    handleDrawing(e: MouseEvent) {
        if(this.isDrawing) {

            switch(this.toolBar.currShape.type) {
                case ShapeType.DOT:
                    this.drawDot(e)
                    break
                case ShapeType.LINE:
                    this.drawLine(e)
                    break
                case ShapeType.RECT:
                    this.drawRect(e)
                    break
                case ShapeType.CIRCLE:
                    this.drawCircle(e)
                    break
                case ShapeType.TRIANGLE:
                    this.drawTriangle(e)
                    break
                case ShapeType.STAR:
                    this.drawStar(e)
                    break
                case ShapeType.NONE:
                    break
                default:
                    break
            }

        }
    }
    // 停止绘制
    handleStopDrawing() {

        this.isDrawing = false

        this.startX = 0
        this.startY = 0

        this.saveCurrImageData()
    }


    // 将当前画板内容数据存入队列中
    saveCurrImageData() {
        const imageData = this.ctx.getImageData(0,0,window.innerWidth,window.innerHeight)
        this.imageDataList.push(imageData)
        this.currImageData = imageData
    }
    // 更新图像数据队列，让【当前图像数据】处于队列的最后一项
    updateImageDataList() {
        // 找出当前图像数据所处的位置
        const index = this.imageDataList.findIndex(imageData => imageData === this.currImageData)
        // 更新图像数据列表，截取到【当前图像数据】作为最后一项（主要是遇到【撤回】和【恢复】时得处理）
        this.imageDataList = this.imageDataList.slice(0, index + 1)

    }
    // 更新画板内容，将画板显示的内容（图像数据）设置为数据队列的最后一项
    updateDrawingBoard() {

        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        if(this.imageDataList.length > 0) {
            this.ctx.putImageData(this.imageDataList[this.imageDataList.length - 1], 0, 0, 0, 0, window.innerWidth, window.innerHeight)
        }
        
    }




    // 撤销
    withdraw() {
        if(this.imageDataList.length !== 0) {

            const index = this.imageDataList.findIndex(imageData => imageData === this.currImageData)
            if(index !== -1 && index > 0) {
                this.currImageData = this.imageDataList[index - 1]
                this.ctx.putImageData(this.currImageData, 0, 0)
            }

            console.log(this.imageDataList, index - 1)
        }
    }
    // 恢复
    recovery() {
        if(this.imageDataList.length !== 0) {

            const index = this.imageDataList.findIndex(imageData => imageData === this.currImageData)
            if(index !== -1 && index !== this.imageDataList.length - 1) {
                this.currImageData = this.imageDataList[index + 1]
                this.ctx.putImageData(this.currImageData, 0, 0)
            }
            
            console.log(this.imageDataList, index + 1)
        }
    }
    // 清空画板
    clear() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.saveCurrImageData()
    }
    // 导入
    importImage(e: Event) {
        if(e.target && (e.target as HTMLInputElement).files?.length) {
            const files = (e.target as HTMLInputElement).files!
            
            const imageURL = URL.createObjectURL(files[0])
            console.log(imageURL)
            const img = new Image()
            img.src = imageURL
            img.onload = () => {
                this.ctx.drawImage(img, 0 ,0)
                this.saveCurrImageData()
            }
        }
    }
    // 下载画板内容
    download() {
        const aDOM = document.createElement('a')
        aDOM.href = this.canvasDOM.toDataURL("image/png")
        aDOM.download = `${ new Date() }.png`
        aDOM.click()
    }


    // 绘制点
    drawDot(e: MouseEvent) {

    }
    // 绘制矩形
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
    // 绘制线段
    drawLine(e: MouseEvent) {

        this.updateDrawingBoard()

        this.ctx.beginPath()

        const { offsetX, offsetY } = e
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(offsetX, offsetY)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    // 绘制圆
    drawCircle(e: MouseEvent) {
        this.ctx.beginPath()

        // this.ctx.


        this.ctx.closePath()
    }
    // 绘制三角形
    drawTriangle(e: MouseEvent) {
        
    }
    // 绘制星星
    drawStar(e: MouseEvent) {
        
    }


}


export default DrawingBoard