
import './style/index.scss'
import DrawingBoard from './modules/DrawingBoard'



new DrawingBoard().init()


// setTool()


// // 设置工具
// function setTool() {
//     let tools = document.querySelectorAll('.tool-item')

//     tools.forEach(tool => {
//         tool.addEventListener('click', e => {
//             console.log(e)
//             tools.forEach(tool => tool.className = 'tool-item')
//             e.target.className = 'tool-item tool-item-active'
//         })
//     })
// }

