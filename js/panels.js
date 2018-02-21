const measurement = require('./measurements')

const insertMeasurements = (nodes, type) => {
    let measurementArray = []
    if (!nodes) {
        // Do nothing
    } else {
        if (typeof (type) === 'object') {
            if (typeof (nodes) === 'string' && typeof (type) === 'object') {
                type.forEach((e) => {
                    measurementArray.push(measurement[e](nodes))
                })
            }
            if (nodes.length === 1 && typeof (nodes) === 'object' && typeof (type) === 'object') {
                type.forEach((e) => {
                    measurementArray.push(measurement[e](nodes[0]))
                })
            }
            if (nodes.length >= 2 && typeof (nodes) === 'object' && typeof (type) === 'object') {
                type.forEach((e) => {
                    nodes.forEach((element, i) => {
                        measurementArray.push(measurement[e](nodes[i]))
                    })
                })
            }
        }
        if (typeof (nodes) === 'string' && typeof (type) === 'string') {
            measurementArray.push(measurement[type](nodes))
        }
        if (nodes.length === 1 && typeof (nodes) === 'object' && typeof (type) === 'string') {
            measurementArray.push(measurement[type](nodes[0]))
        }
        if (nodes.length >= 2 && typeof (nodes) === 'object' && typeof (type) === 'string') {
            nodes.forEach((e, i) => {
                measurementArray.push(measurement[type](nodes[i]))
            })
        }
    }
    return measurementArray
}

exports.text = (clusterName) => {
    const id = Math.random(1, 1000000)
    panel = {
        "content": `<p>\n<img src=\"https://confluence.adeo.no/download/thumbnails/245392474/nais-hvit.png?version=1&modificationDate=1510648603680&api=v2\" height=\"150\" align=\"right\" /img>\n<font size=\"40\">${clusterName}</font>\n</p>`,
        "height": "100",
        "id": id,
        "links": [],
        "mode": "html",
        "span": 12,
        "title": "",
        "transparent": true,
        "type": "text"
    }
    console.log(` - Inserting text panel with cluster name ${clusterName}`)
    return panel
}

exports.singleStat = (node, measurement) => {
    const id = Math.random(1, 1000000)
    panel = {
        "cacheTimeout": null,
        "colorBackground": true,
        "colorValue": false,
        "colors": [
            "#299c46",
            "#299c46",
            "#d44a3a"
        ],
        "datasource": "influxdb",
        "format": "none",
        "id": id,
        "interval": null,
        "links": [],
        "mappingType": 1,
        "mappingTypes": [
            {
                "name": "value to text",
                "value": 1
            },
            {
                "name": "range to text",
                "value": 2
            }
        ],
        "maxDataPoints": 100,
        "nullPointMode": "connected",
        "nullText": null,
        "postfix": "",
        "postfixFontSize": "50%",
        "prefix": "",
        "prefixFontSize": "50%",
        "rangeMaps": [
            {
                "from": "null",
                "text": "No data",
                "to": "null"
            }
        ],
        "span": 3,
        "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
        },
        "tableColumn": "",
        "targets": insertMeasurements(node, measurement),
        "thresholds": "0,1",
        "title": node,
        "transparent": true,
        "type": "singlestat",
        "valueFontSize": "120%",
        "valueMaps": [
            {
                "op": "=",
                "text": "Healthy",
                "value": "0"
            },
            {
                "op": "=",
                "text": "Error",
                "value": "1"
            }
        ],
        "valueName": "current"
    }
    console.log(` - Inserting ${measurement} singlestat panel with: ${node}`)
    return panel
}

exports.graph = (nodes, measurement, stack, title) => {
    const id = Math.random(1, 1000000)
    panel = {
        "bars": false,
        "dashLength": 10,
        "dashes": false,
        "datasource": "influxdb",
        "fill": 1,
        "hideTimeOverride": true,
        "id": id,
        "interval": "5m",
        "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "hideEmpty": false,
            "hideZero": false,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
        },
        "lines": true,
        "linewidth": 1,
        "links": [],
        "nullPointMode": "null",
        "percentage": false,
        "pointradius": 5,
        "points": false,
        "renderer": "flot",
        "spaceLength": 10,
        "span": 4,
        "stack": stack,
        "steppedLine": false,
        "targets": insertMeasurements(nodes, measurement),
        "thresholds": [],
        "timeFrom": "1d",
        "timeShift": null,
        "title": title,
        "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
        },
        "transparent": true,
        "type": "graph",
        "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
        },
        "yaxes": [
            {
                "format": "percent",
                "label": null,
                "logBase": 1,
                "max": "100",
                "min": "1",
                "show": true
            },
            {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
            }
        ]
    }
    console.log(` - Inserting graph panel: ${title}, with: ${nodes}`)
    return panel
}
exports.discrete = (node, measurement) => {
    const id = Math.random(1, 1000000)
    panel = {
        "backgroundColor": "rgba(36, 204, 42, 0.68)",
        "colorMaps": [
            {
                "color": "rgb(228, 59, 59)",
                "text": "1"
            },
            {
                "color": "rgb(46, 231, 60)",
                "text": "0"
            }
        ],
        "datasource": "influxdb",
        "display": "timeline",
        "expandFromQueryS": 100,
        "extendLastValue": true,
        "height": "",
        "highlightOnMouseover": true,
        "id": id,
        "legendSortBy": "-ms",
        "lineColor": "rgba(128, 128, 128, 1.0)",
        "links": [],
        "mappingTypes": [
            {
                "name": "Healthy",
                "value": 1
            },
            {
                "name": "Error",
                "value": 0
            }
        ],
        "metricNameColor": "#000000",
        "rangeMaps": [
            {
                "from": "null",
                "text": "N/A",
                "to": "null"
            }
        ],
        "rowHeight": 24,
        "showLegend": false,
        "span": 4,
        "targets": insertMeasurements(node, measurement),
        "textSize": 12,
        "timeFrom": null,
        "title": "",
        "transparent": true,
        "type": "natel-discrete-panel",
        "valueMaps": [
            {
                "op": "=",
                "text": "N/A",
                "value": "null"
            }
        ],
        "valueTextColor": "#000000",
        "writeAllValues": false,
        "writeLastValue": false,
        "writeMetricNames": true
    }
    console.log(` - Inserting discrete panel for ${node} with ${measurement}`)
    return panel
}