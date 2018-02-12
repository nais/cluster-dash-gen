const panel = require('./panels')

exports.header = (clusterName) => {
    const row = {
        "collapse": false,
        "height": "120",
        "panels": [
            panel.text(clusterName)
        ],
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": false,
        "title": `Cluster dashboard for ${clusterName}`,
        "titleSize": "h6"
    }
    console.log(` - Inserting header row`)
    return row
}

exports.nodeAgg = (nodes, type) => {
    const generatePanels = (nodes) => {
        let panels = []
        if (nodes.length === 1) {
            console.log(` - Inserting aggregate singlestat panel for ${type} node: ${nodes[0]}`)
            panels.push(panel.singleAgg(nodes[0]))
        }
        if (nodes.length >= 2) {
            nodes.forEach((e, i) => {
                console.log(` - Inserting aggregate singlestat panel for ${type} node: ${nodes[i]}`)
                panels.push(panel.singleAgg(nodes[i]))
            })
        }
        // console.log(panels)
        return panels
    }
    const row = {
        "collapse": false,
        "height": 150,
        "panels": generatePanels(nodes),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": `${type} nodes:`,
        "titleSize": "h3"
    }
    console.log(` - Inserting ${type} nodes row`)
    return row
}

exports.clusterMetrics = (clusterName, masters, workers) => {
    const nodes = masters.concat(workers)
    const row = {
        "collapse": false,
        "height": 400,
        "panels": [
            panel.clusterCpuLoad(nodes),
            panel.clusterDiskVarUsage(nodes),
            panel.clusterMemoryUsage(nodes)
        ],
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": `cluster metrics:`,
        "titleSize": "h3"
    }
    return row
}