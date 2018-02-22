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

module.exports = (clusterName, masters, workers, config) => {
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": config.dashboard.title,
            "tags": config.dashboard.tags,
            "timezone": "browser",
            "rows":
                insertRows(config.dashboard.rows),
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true
    }
    return dashboard
}