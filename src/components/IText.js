import template from './template/IText.html'
import jsrender from 'jsrender'

class IText {
    componentData = {
        number: 123
    }
    constructor() {
        this.template = jsrender.templates(template)
    }
    setComponentData(data) {
        this.componentData = { ...this.componentData, ...data }
        this.render()
    }
    propDataWatchHandle(propData) {
        this.componentData = { ...this.componentData, propData }
        this.refreshHtml()
    }
    // 渲染数据
    render() {
        this.html = this.template.render(this.componentData)
    }
    // 刷新页面
    refreshHtml() {
        this.render()
        $(this.selector).html(this.html)
    }
    mount(selector) {
        this.selector = selector
        this.refreshHtml()
    }
}

export default IText
