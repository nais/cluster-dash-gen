const createRow = require('./rows')
const createPanel = require('./panels')

module.exports = (config) => {
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": config.dashboard.title,
            "tags": config.dashboard.tags,
            "timezone": "browser",
            "panels": insertPanels(config.dashboard.panels),
            "refresh": "30s",
            "schemaVersion": 6,
            "version": 0,
            "time": {
                "from": "now-15m",
                "to": "now"
            },
        },
        "folderId": config.dashboard.folderId,
        "overwrite": true,
        "message": "templated cluster dashboard",
    }
    return dashboard
}
// Default size of panels
const defaultSize = {
    discrete: {
        h: 8,
        w: 8
    },
    graph: {
        h: 8,
        w: 8
    },
    row: {
        h: 1,
        w: 24
    },
    singleStat: {
        h: 3,
        w: 4
    },
    singleStatGauge: {
        w: 8,
        h: 6
    },
    statusPanel: {
        h: 3,
        w: 12
    },
    text: {
        w: 8,
        h: 3
    }
}
//Global gridpositioning
let gridPos = {
    h: 0,
    w: 0,
    x: 0,
    y: 0
}

const insertPanels = (panels) => {
    let panelArray = []
    panels.forEach((panel, index) => {
        // Check if panel has a gridPos object, add empty one if not
        if (!panel.gridPos) {
            panel.gridPos = {}
        }
        // Check if this is a repeating panel.
        if (panel.repeating) {
            // Iterate trough node array and add one panel to every node
            panel.nodes.forEach(node => {
                if (panel.type === 'row') {
                    // Add row first, then the rows own panels second
                    const panelWidthGridPos = updateGridPos({ ...panel, title: node }) // Enrich panel object with title
                    panelArray.push(createPanel[panel.type](panelWidthGridPos))
                    // If we're adding a row, we need to iterate trough the rows own panel array
                    panel.panels.forEach(rowPanel => {
                        const panelWidthGridPos = updateGridPos({ ...rowPanel, gridPos: {}, nodes: node }) // Enrich panel object with empty gridPos object, node and title
                        panelArray.push(createPanel[rowPanel.type](panelWidthGridPos))
                    })
                } else {
                    // If repeating panel while not a row, add one panel for each node in array
                    const panelWidthGridPos = updateGridPos({ ...panel, nodes: node }) // Enrich panel object with node and title
                    panelArray.push(createPanel[panel.type](panelWidthGridPos))
                }
            })
        } else {
            // For non-repeating panels, only update gridposition 

            const panelWidthGridPos = updateGridPos(panel)
            if (panel.type === 'graph') {
            }
            panelArray.push(createPanel[panel.type](panelWidthGridPos))
        }
    })
    return panelArray
}

const updateGridPos = (panel) => {
    // Set panel dimensions to default size if not otherwise specified
    gridPos.h = panel.gridPos.h || defaultSize[panel.type].h
    gridPos.w = panel.gridPos.w || defaultSize[panel.type].w

    // Check if there is space for the current panel on the row. 
    if (gridPos.x + gridPos.w > 24) {       // Check if there is room for this panel
        gridPos.x = 0                       // If not, move panel to next row.
        gridPos.y = gridPos.y + gridPos.h   // Y is based on current panel height
    }
    // Update gridPos for current panel
    panel.gridPos = {
        ...gridPos
    }
    // Update gridPos
    gridPos.x = gridPos.x + gridPos.w
    return panel
}