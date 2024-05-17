import config from '../../public/static/config.json'
//闭包方法
;(() => {
    //这里把classId+@+version作为入口方法名（组件的包名）
    const className = window.IDM && window.IDM.url.queryString('className')
    const requireComponent = require.context('../components', true, /[A-Z]\w+\.(js)$/)
    const componentsMap = new Map()
    requireComponent.keys().forEach((fileName) => {
        const componentConfig = requireComponent(fileName)
        const componentName = fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        // 将全部组件放到一个Map里
        componentsMap.set(componentName, componentConfig.default || componentConfig)
    })
    var defining = {}
    config &&
        config.module.forEach((item) => {
            defining[item.classId + '@' + config.version] = function (moduleObject) {
                const componentClass = componentsMap.get(moduleObject.className || className)
                const componentInstance = new componentClass()
                //把组件定义的属性返回给核心框架
                moduleObject.compositeAttr = item.compositeAttr
                //把组件定义的组件内属性返回给核心框架(如果有的话)
                if (item.innerAttr) {
                    moduleObject.innerAttr = item.innerAttr
                }
                //组件内部容器组件的名称
                if (item.innerComName) {
                    moduleObject.innerComName = item.innerComName
                }
                // 编辑属性更新
                moduleObject.idmProps = (props) => componentInstance.propDataWatchHandle(props)
                // 接收消息
                moduleObject.idmBroadcastMessage = (object) => componentInstance?.receiveBroadcastMessage?.(object)
                // 交互功能：设置组件的上下文内容值
                moduleObject.idmSetContextValue = (object) => componentInstance?.setContextValue?.(object)
                // 交互功能：获取需要返回的值
                moduleObject.idmGetContextValue = () => componentInstance?.getContextValue?.()

                componentInstance.initComponent(moduleObject)
            }
        })
    Object.keys(defining).forEach((key) => {
        window[key] = defining[key]
    })
    setTimeout(function () {
        if (window.IDM && window.IDM.url.queryString('className')) {
            config &&
                config.module.forEach((item) => {
                    if (item.className == window.IDM.url.queryString('className')) {
                        window[item.classId + '@' + config.version].call(this, {
                            id: 'module_demo'
                        })
                    }
                })
        }
    }, 100)
})()
