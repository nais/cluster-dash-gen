const panel = require('./panels')

const insertPanels = (panels) => {
    let panelArray = []
    const injectNodes = (panel, nodes) => {
        return {
            ...panel,
            nodes: nodes
        }
    }
    panels.forEach((e) => {
        e.id = Math.random(1, 1000000)
        if (e.panel === 'singleStat') {
            if (!e.nodes) {
                panelArray.push(panel.singleStat(e))
            }
            if (typeof (e.nodes) === 'string') {
                panelArray.push(panel.singleStat(e))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length === 1) {
                
                panelArray.push(panel.singleStat(injectNodes(e, e.nodes[0])))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length > 1) {
                e.nodes.forEach((node) => {
                    panelArray.push(panel.singleStat(injectNodes(e, node)))
                })
            }
        }
        if (e.panel === 'graph') {
            panelArray.push(panel.graph(e))
        }
        if (e.panel === 'text') {
            panelArray.push(panel.text(e))
        }
        if (e.panel === 'discrete') {
            panelArray.push(panel.discrete(e))
        }
    })
    return panelArray
}

module.exports = (params, panels) => {
    row = {
        "collapse": params.collapse || false,
        "height": params.height || 140,
        "panels": insertPanels(panels),
        "showTitle": params.showTitle || false,
        "title": params.title || "Row, Row, Row, Your Boat",
        "titleSize": params.titleSize || "h3"
    }
    return row
}