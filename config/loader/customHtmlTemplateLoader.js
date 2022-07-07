module.exports = (source) => {
    source = source.replace(/[\r\n]/g, '')
    return `export default '${source}'`
}
