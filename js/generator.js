const row = require('./rows')

let rows = []

const generateRows = (nodes, type) => {
    let rows = []
    if (typeof (nodes) === 'string') {
        return (row[type](nodes))
    }
    if (nodes.length === 1 && typeof (nodes) === 'object') {
        return (row[type](nodes[0]))
    }
    if (nodes.length >= 2 && typeof (nodes) === 'object') {
        nodes.forEach((e, i) => {
            console.log(row[type](nodes[i]))
        })
    }
    // console.log('test', rows)
    // return rows
}

module.exports = (clusterName, masters, workers) => {
    const nodes = masters.concat(workers)
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": `NAIS cluster ${clusterName} dashboard`,
            "tags": ["kubernetes", "nais"],
            "timezone": "browser",
            "rows": [
                row.headerRow(clusterName),
                row.newRow('master nodes:', 150,
                    [{
                        "panel": "singleStat",
                        "nodes": masters,
                        "measurement": "aggregate"
                    }]),
                row.newRow('master nodes:', 150,
                    [{
                        "panel": "singleStat",
                        "nodes": workers,
                        "measurement": "aggregate"
                    }]),
                row.newRow('Row row, row the boat', 400,
                    [{
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
                    }]),

            ],
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true
    }
    return dashboard
}