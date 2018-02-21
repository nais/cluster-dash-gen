const createRow = require('./rows')

const insertRows = (params) => {
    let rowArray = []
    params.forEach((e) => {
        if (e.repeating) {
            const injectHostname = (panels, node) => {
                let panelArray = []
                panels.forEach((e) => {
                    panelArray.push({
                        ...e,
                        "nodes": node
                    })
                })
                return panelArray
            }
            if (e.nodes) {
                if (e.nodes.length === 1 && typeof (e.nodes) === 'object') {
                    const newConfig = {
                        ...e.config,
                        "title": (e.config.title || "") + " " + e.nodes[0],
                    }
                    rowArray.push(createRow(newConfig, injectHostname(e.panels, e.nodes[0])))
                }
                if (typeof (e.nodes) === 'string') {
                    const newConfig = {
                        ...e.config,
                        "title": (e.config.title || "") + " " + e.nodes
                    }
                    rowArray.push(createRow(newConfig, injectHostname(e.panels, e.nodes)))
                }
                if (e.nodes.length > 1 && typeof (e.nodes) === 'object') {
                    e.nodes.forEach((element) => {
                        const newConfig = {
                            ...e.config,
                            "title": (e.config.title || "") + " " + element
                        }
                        rowArray.push(createRow(newConfig, injectHostname(e.panels, element)))
                    })
                }
            }
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
                            "title": "Master nodes:",
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
                            "title": "Worker nodes:",
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
                            "measurement": ["cpuIdle"],
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
                    {
                        "repeating": true,
                        "nodes": masters,
                        "config": {
                            "collapse": false,
                            "height": 400,
                            "title": "Master node:",
                            "showTitle": true
                        },
                        "panels": [{
                            "panel": "discrete",
                            "nodes": null,
                            "measurement": [
                                "processDockerd",
                                "processKubelet",
                                "interfaceDocker0",
                                "interfaceFlannel",
                                "componentControllerManager",
                                "componentScheduler",
                                "componentEtcd0",
                                "addonCoredns",
                                "addonKubernetesDashboard",
                                "addonTillerDeploy"
                            ]
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "measurement": "cpuIdle",
                            "title": "Node CPU Load"
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "measurement": "diskVarUsage",
                            "title": "Node Disk Usage (/var)"
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "stack": true,
                            "measurement": ["memoryUsageWOBuffersCaches", "memoryPercentCached"],
                            "title": "Node Memory Usage"
                        },

                        ]
                    },
                    {
                        "repeating": true,
                        "nodes": workers,
                        "config": {
                            "collapse": false,
                            "height": 400,
                            "title": "Worker node:",
                            "showTitle": true
                        },
                        "panels": [{
                            "panel": "discrete",
                            "nodes": null,
                            "measurement": [
                                "processDockerd",
                                "processKubelet",
                                "processFlanneld",
                                "processKubeProxy",
                                "interfaceDocker0",
                                "interfaceFlannel"
                            ]
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "measurement": "cpuIdle",
                            "title": "Node CPU Load"
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "measurement": "diskVarUsage",
                            "title": "Node Disk Usage (/var)"
                        },
                        {
                            "panel": "graph",
                            "nodes": null,
                            "stack": true,
                            "measurement": ["memoryUsageWOBuffersCaches", "memoryPercentCached"],
                            "title": "Node Memory Usage"
                        }]
                    }
                    ]),
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true
    }
    return dashboard
}