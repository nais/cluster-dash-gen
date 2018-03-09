const createRow = require('./rows')
const panel = require('./panels')

const injectNodes = (panel, nodes) => {
    return {
        ...panel,
        nodes: nodes
    }
}

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

const injectGridPosAndNodes = (panel, grid, nodes) => {
    return {
        ...panel,
        "gridPos": grid,
        "nodes": nodes
    }
}

const insertElements = (dashboard) => {
    let elementArray = []
    if (dashboard.panels) {
        console.log('panels!')
        dashboard.panels.forEach(e => {
            console.log('WUUUUTU1', elementArray)
            if (e.panel === 'singleStat') {
                console.log('singlestat')
                if (!e.nodes) {
                    elementArray.push(panel.singleStat(e))
                }
                if (typeof (e.nodes) === 'string') {
                    elementArray.push(panel.singleStat(e))
                }
                if (typeof (e.nodes) === 'object' && e.nodes.length === 1) {

                    elementArray.push(panel.singleStat(injectNodes(e, e.nodes[0])))
                }
                if (typeof (e.nodes) === 'object' && e.nodes.length > 1) {
                    e.nodes.forEach((node, i) => {
                        let gridPos = e.gridPos
                        if (i === 0) {
                        } else {
                            gridPos.x = gridPos.x + e.gridPos.w
                            if (gridPos.x > 23) {
                                gridPos.x = 0
                                gridPos.y = gridPos.y + e.gridPos.h
                            }
                        }
                        const grid = {
                            ...gridPos
                        }
                        elementArray.push(panel.singleStat(injectGridPosAndNodes(e, grid, node)))
                        
                    })
                }
            }
            if (e.type === 'row') {
                console.log('row')
                elementArray.push(createRow(e))
            }
            if (e.panel === 'graph') {
                elementArray.push(panel.graph(e))
            }
            if (e.panel === 'text') {
                elementArray.push(panel.text(e))
            }
            if (e.panel === 'discrete') {
                elementArray.push(panel.discrete(e))
            }
        })
    }

    console.log(elementArray)
    return elementArray
}

module.exports = (clusterName, masters, workers, config) => {
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": config.dashboard.title,
            "tags": config.dashboard.tags,
            "timezone": "browser",
            "panels": insertElements(config.dashboard),
            "refresh": "30s",
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true,
        "message": "templated cluster dashboard",
        "time": {
            "from": "now-15m",
            "to": "now"
        },
    }
    // console.log("SELVE DAHSboRD", dashboard.dashboard.panels)
    return dashboard
}