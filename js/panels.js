const measurement = require('./measurements')

const insertMeasurements = (nodes, type) => {
    let measurementArray = []
    if (!nodes) {
        // Probably a cluster query, inserting empty string
        nodes = ""
    }
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
    return measurementArray
}

exports.text = (params) => {
    const id = Math.random(1, 1000000)
    panel = {
        "content": `<p>\n<img src=\"https://confluence.adeo.no/download/thumbnails/245392474/nais-hvit.png?version=1&modificationDate=1510648603680&api=v2\" height=\"150\" align=\"right\" /img>\n<font size=\"40\">${params.text}</font>\n</p>`,
        "height": "100",
        "id": params.id,
        "links": [],
        "mode": "html",
        "span": params.width || 4,
        "title": "",
        "transparent": true,
        "type": "text"
    }
    console.log(` - Inserting text panel with cluster name ${params.text}`)
    return panel
}

exports.singleStat = (params) => {
    // return default panel if nothing else is specified
    if (params.subtype === 'normal' || !params.subtype) { 
        panel = {
            "cacheTimeout": null,
            "colorValue": false,
            "datasource": params.datasource || "influxdb",
            "format": params.format || "none",
            "id": Math.random(1, 1000000),
            "interval": null,
            "links": [],
            "nullText": null,
            "span": params.width || 3,
            "targets": insertMeasurements(params.nodes, params.measurement),
            "title": params.title || params.nodes || "",
            "transparent": true,
            "type": "singlestat",
            "valueFontSize": "120%",
            "postfix": ` ${params.postfix || ""}`,
            "postfixFontSize": "80%",
            "prefix": ` ${params.prefix || ""}`,
            "prefixFontSize": "80%"
        }
        console.log(` - Inserting ${params.measurement} normal singlestat panel with: ${params.nodes || "cluster query"}`)
        return panel
    }
    if (params.subtype === 'healthCheck') {
        panel = {
            "cacheTimeout": null,
            "colorBackground": true,
            "colorValue": false,
            "colors": [
                "#299c46",
                "#299c46",
                "#d44a3a"
            ],
            "datasource": params.datasource || "influxdb",
            "format": params.format || "none",
            "id": Math.random(1, 1000000),
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
            "span": params.width || 3,
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": insertMeasurements(params.nodes, params.measurement),
            "thresholds": "0,1",
            "title": params.title || params.nodes || "",
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
        console.log(` - Inserting ${params.measurement} ${params.subtype} singlestat panel with: ${params.nodes}`)
        return panel
    }

}

exports.graph = (params) => {
    panel = {
        "bars": false,
        "dashLength": 10,
        "dashes": false,
        "datasource": "influxdb",
        "fill": 1,
        "hideTimeOverride": true,
        "id": params.id,
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
        "span": params.width || 4,
        "stack": params.stack || false,
        "steppedLine": false,
        "targets": insertMeasurements(params.nodes, params.measurement),
        "thresholds": [],
        "timeFrom": "1d",
        "timeShift": null,
        "title": params.title || "",
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
    console.log(` - Inserting graph panel: ${params.title || "With no title"}, with: ${params.nodes}`)
    return panel
}
exports.discrete = (params) => {
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
        "id": params.id,
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
        "span": params.width || 4,
        "targets": insertMeasurements(params.nodes, params.measurement),
        "textSize": 12,
        "timeFrom": null,
        "title": params.title || "",
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
    console.log(` - Inserting discrete panel for ${params.nodes} with ${params.measurement}`)
    return panel
}