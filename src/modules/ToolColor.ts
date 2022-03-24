class ToolColor {

    get currColor(): string { return (document.querySelector("input[type='color']")! as HTMLInputElement).value}
}
export default ToolColor