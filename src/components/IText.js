import template from './template/IText.html'
// import otherTemplate from './template/IText.html'

class IText {
    propData = {
        title: '测试文本_渲染'
    }
    moduleObject = {}
    initComponent(moduleObject) {
        this.propData = moduleObject?.props?.compositeAttr || this.propData
        this.moduleObject = moduleObject
        this.render(() => {
            moduleObject?.mountComplete?.(moduleObject)
        })
    }
    propDataWatchHandle(propData) {
        this.propData = propData
        this.render()
    }
    convertAttrToStyleObject() {
        var styleObject = {}
        for (const key in this.propData) {
            const element = this.propData[key]
            switch (key) {
                case 'width':
                case 'height':
                    styleObject[key] = element
                    break
                case 'box':
                    IDM.style.setBoxStyle(styleObject, element)
                    break
                case 'border':
                    IDM.style.setBorderStyle(styleObject, element)
                    break
                case 'font':
                    IDM.style.setFontStyle(styleObject, element)
                    break
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
        }
    }
    initData() {
        
    }
    // 接受消息
    receiveBroadcastMessage(message){}
    // 设置组件的上下文内容值
    setContextValue(object) {}
    // 获取组件的上下文内容值
    getContextValue(){}
    // 渲染数据
    render(_cb) {
        const _this = this
        IDM.laytpl(template).render({ propData: this.propData, moduleObject: this.moduleObject}, (html) => {
            $('#idm_' + this.moduleObject.id + (this.moduleObject?.routerId ?? '')).html(html)
            _cb?.() // 先回调
            this.convertAttrToStyleObject()
            this.initData()
        })
    }
}

export default IText
