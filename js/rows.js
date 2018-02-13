const panel = require('./panels')

const insertPanels = (params) => {
    let panelArray = []
    // console.log(params)
    params.forEach((e) => {
        if (e.panel === 'singleStat') {
            if (typeof (e.nodes) === 'string') {
                panelArray.push(panel.singleStat(e.nodes, e.measurement))
            }
            if (typeof(e.nodes) === 'object' && e.nodes.length === 1) {
                panelArray.push(panel.singleStat(e.nodes[0], e.measurement))
            }
            if (typeof(e.nodes) === 'object' && e.nodes.length > 1) {
                e.nodes.forEach((node) => {
                    panelArray.push(panel.singleStat(node, e.measurement))
                })
            }
            console.log(` - Inserting singlestat panel with ${e.measurement} measurement with:  ${e.nodes}`)
        }
        if (e.panel === 'graph') {
            panelArray.push(panel.graph(e.nodes, e.measurement, e.title))
        }    
    })

    return panelArray
}

exports.headerRow = (clusterName) => {
    row = {
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

exports.nodeAggRow = (nodes, category) => {
    row = {
        "collapse": false,
        "height": 150,
        "panels": insertPanels
            ([
                {
                    "panel": "singleStat", 
                    "nodes": nodes, 
                    "measurement": "aggregate"
                }
            ]),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": `${category} nodes:`,
        "titleSize": "h3"
    }
    // console.log(` - Inserting ${category} nodes row`)
    return row
}

exports.clusterMetricsRow = (clusterName, masters, workers) => {
    const nodes = masters.concat(workers)
    row = {
        "collapse": false,
        "height": 400,
        "panels": insertPanels
        ([
            {
                "panel": "graph", 
                "nodes": nodes, 
                "measurement": "cpuIdle",
                "title": "Cluster CPU Load"
            },
            {
                "panel": "graph", 
                "nodes": nodes, 
                "measurement": "diskVarUsage",
                "title": "Cluster Disk Usage (/var)"
            },
            {
                "panel": "graph", 
                "nodes": nodes, 
                "measurement": "memoryUsageWOBuffersCaches",
                "title": "Cluster Memory Usage"
            },
        ]),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": `cluster metrics:`,
        "titleSize": "h3"
    }
    return row
}

exports.newRow = (title, height, params) => {
    row = {
        "collapse": false,
        "height": height,
        "panels": insertPanels(params),
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": title,
        "titleSize": "h3"
    }
    return row
}

exports.MasterNodeMetricsRow = (master) => {
    row = {
        "collapse": false,
        "height": 400,
        "panels": [
            // panel.clusterCpuLoad(nodes),
            // panel.clusterDiskVarUsage(nodes),
            // panel.clusterMemoryUsage(nodes)
        ],
        "repeat": null,
        "repeatIteration": null,
        "repeatRowId": null,
        "showTitle": true,
        "title": `master node: ${master}`,
        "titleSize": "h3"
    }
    return row
}