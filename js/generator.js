const createRow = require('./rows')

module.exports = (clusterName, masters, workers) => {
    const nodes = masters.concat(workers)
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": `NAIS cluster ${clusterName} dashboard`,
            "tags": ["kubernetes", "nais"],
            "timezone": "browser",
            "rows": [
                createRow('Header header', 120,
                    [{
                        "panel": "text",
                        "text": clusterName
                    }]),
                createRow('master nodes:', 150,
                    [{
                        "panel": "singleStat",
                        "nodes": masters,
                        "measurement": "aggregate"
                    }]),
                createRow('master nodes:', 150,
                    [{
                        "panel": "singleStat",
                        "nodes": workers,
                        "measurement": "aggregate"
                    }]),
                createRow('Row row, row the boat', 400,
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