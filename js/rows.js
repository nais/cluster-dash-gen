const panel = require('./panels')

const injectNodes = (panel, nodes) => {
    return {
        ...panel,
        nodes: nodes
    }
}

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
            console.log('1')
            if (!e.nodes) {
                console.log('2')
                panelArray.push(panel.singleStat(e))
            }
            if (typeof (e.nodes) === 'string') {
                console.log('3')
                panelArray.push(panel.singleStat(e))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length === 1) {
                console.log('4')
                
                panelArray.push(panel.singleStat(injectNodes(e, e.nodes[0])))
            }
            if (typeof (e.nodes) === 'object' && e.nodes.length > 1) {
                console.log('5')
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
    console.log(panelArray)
    return panelArray
}

module.exports = (params) => {
    row = {
        "collapsed": params.config.collapsed || false,
        "gridPos": params.config.gridPos || null,
        "id": Math.random(1, 1000000),
        "panels": [],
        "title": params.config.title || "Row title",
        "type": "row",
    }
    console.log(row)
    return row
}