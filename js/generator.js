const createRow = require('./rows')

const insertRows = (params) => {
    let rowArray = []
    params.forEach((e) => {
        if (e.repeating) {
            //Do repeating stuff
        }
        if (!e.repeating) {
            rowArray.push(createRow(e.config, e.panels))
        }
    })
    return rowArray
}

module.exports = (clusterName, masters, workers) => {
    const nodes = masters.concat(workers)
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": `NAIS cluster ${clusterName} dashboard`,
            "tags": ["kubernetes", "nais"],
            "timezone": "browser",
            "rows":
                // createRow('Header header', 120,
                //     [{
                //         "panel": "text",
                //         "text": clusterName
                //     }]),
                // createRow('master nodes:', 150,
                //     [{
                //         "panel": "singleStat",
                //         "nodes": masters,
                //         "measurement": "aggregate"
                //     }]),
                // createRow('master nodes:', 150,
                //     [{
                //         "panel": "singleStat",
                //         "nodes": workers,
                //         "measurement": "aggregate"
                //     }]),
                // createRow('Row row, row the boat', 400,
                    // [{
                    //     "panel": "graph",
                    //     "nodes": nodes,
                    //     "measurement": "cpuIdle",
                    //     "title": "Cluster CPU Load"
                    // },
                    // {
                    //     "panel": "graph",
                    //     "nodes": nodes,
                    //     "measurement": "diskVarUsage",
                    //     "title": "Cluster Disk Usage (/var)"
                    // },
                    // {
                    //     "panel": "graph",
                    //     "nodes": nodes,
                    //     "measurement": "memoryUsageWOBuffersCaches",
                    //     "title": "Cluster Memory Usage"
                    // }]),
                insertRows(
                    [{
                        "repeating": false,
                        "nodes": null,
                        "config": {
                            "collapse": false,
                            "height": 100,
                            "titleSize": "h6",
                            "showTitle": false
                        },
                        "panels": [{
                            "panel": "text",
                            "text": clusterName
                        }]
                    },
                    {
                        "repeating": false,
                        "nodes": null,
                        "config": {
                            "collapse": false,
                            "height": 150,
                            "title": "master nodes:",
                            "showTitle": true
                        },
                        "panels": [{
                            "panel": "singleStat",
                            "nodes": masters,
                            "measurement": "aggregate"
                        }]
                    },
                    {
                        "repeating": false,
                        "nodes": null,
                        "config": {
                            "collapse": false,
                            "height": 150,
                            "title": "worker nodes:",
                            "showTitle": true
                        },
                        "panels": [{
                            "panel": "singleStat",
                            "nodes": workers,
                            "measurement": "aggregate"
                        }]
                    },
                    {
                        "repeating": false,
                        "nodes": null,
                        "config": {
                            "collapse": false,
                            "height": 400,
                            "showTitle": false
                        },
                        "panels": [{
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
                        }]
                    },
                ]),
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true
    }
    return dashboard
}