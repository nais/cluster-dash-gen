const panel = require('./panels')

const insertPanels = (panels) => {
    let panelArray = []
    panels.forEach((e) => {
        if (e.panel === 'singleStat') {
            if (typeof (e.nodes) === 'string') {
                panelArray.push(panel.singleStat(e.nodes, e.measurement))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length === 1) {
                panelArray.push(panel.singleStat(e.nodes[0], e.measurement))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length > 1) {
                e.nodes.forEach((node) => {
                    panelArray.push(panel.singleStat(node, e.measurement))
                })
            }
        }
        if (e.panel === 'graph') {
            panelArray.push(panel.graph(e.nodes, e.measurement, e.stack, (e.title || false)))
        }
        if (e.panel === 'text') {
            panelArray.push(panel.text(e.text))
        }
    })
    return panelArray
}

module.exports = (config, panels) => {
    row = {
        "collapse": config.collapse || false,
        "height": config.height || 140,
        "panels": insertPanels(panels),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": config.showTitle || false,
        "title": config.title || "Row, Row, Row, Your Boat",
        "titleSize": config.titleSize || "h3"
    }
    return row
}