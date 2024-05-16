import template from './template/IText.html'
// import otherTemplate from './template/IText.html'
import 'layui/dist/layui'

class IText {
    propData = {
        title: '测试文本'
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
    // 渲染数据
    render(_cb) {
        const _this = this, laytpl = layui.laytpl
        laytpl(template).render({ propData: this.propData, moduleObject: this.moduleObject}, function (html) {
            $('#idm_' + _this.moduleObject.id + (_this.moduleObject.routerId ? _this.moduleObject.routerId : '')).html(html)
            _cb?.() // 先回调
            _this.convertAttrToStyleObject()
            _this.initData()
        })
    }
}

export default IText
