const panel = require('./panels')

const insertPanels = (params) => {
    let panelArray = []
    params.forEach((e) => {
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
            panelArray.push(panel.graph(e.nodes, e.measurement, e.title))
        }
        if (e.panel === 'text') {
            panelArray.push(panel.text(e.text))
        }
    })

    return panelArray
}

module.exports = (title, height, params) => {
const size = 'h3'
    row = {
        "collapse": false,
        "height": height,
        "panels": insertPanels(params),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": title,
        "titleSize": size
    }
    return row
}