exports.aggregate = (node) => {
    measurement = {
        "dsType": "influxdb",
        "groupBy": [
            {
                "params": [
                    "$__interval"
                ],
                "type": "time"
            },
            {
                "params": [
                    "previous"
                ],
                "type": "fill"
            }
        ],
        "measurement": "nais.aggregate",
        "orderByTime": "ASC",
        "policy": "default",
        "refId": "A",
        "resultFormat": "time_series",
        "select": [
            [
                {
                    "params": [
                        "value"
                    ],
                    "type": "field"
                },
                {
                    "params": [],
                    "type": "mean"
                }
            ]
        ],
        "tags": [
            {
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.cpuIdle = (node) => {
    measurement = {
        "alias": `$tag_category node: ${node}`,
        "dsType": "influxdb",
        "groupBy": [
            {
                "params": [
                    "auto"
                ],
                "type": "time"
            },
            {
                "params": [
                    "linear"
                ],
                "type": "fill"
            }
        ],
        "measurement": "cpu.idle",
        "orderByTime": "ASC",
        "policy": "default",
        "query": `SELECT 100 - mean(\"value\") FROM \"cpu.idle\" WHERE \"hostname\" = '${node}' AND $timeFilter GROUP BY time($interval), cluster, category, hostname`,
        "rawQuery": true,
        "refId": "A",
        "resultFormat": "time_series",
        "select": [
            [
                {
                    "params": [
                        "value"
                    ],
                    "type": "field"
                },
                {
                    "params": [],
                    "type": "mean"
                }
            ]
        ],
        "tags": [
            {
                "key": "cluster",
                "operator": "=~",
                "value": "/^$Cluster$/"
            },
            {
                "condition": "AND",
                "key": "category",
                "operator": "=",
                "value": "master"
            }
        ]
    }
    return measurement
}

exports.diskVarUsage = (node) => {
    measurement = {
        "alias": `$tag_category ${node} - /var`,
        "dsType": "influxdb",
        "groupBy": [
            {
                "params": [
                    "$__interval"
                ],
                "type": "time"
            },
            {
                "params": [
                    "category"
                ],
                "type": "tag"
            },
            {
                "params": [
                    "hostname"
                ],
                "type": "tag"
            },
            {
                "params": [
                    "none"
                ],
                "type": "fill"
            }
        ],
        "measurement": "disk.var.used_percentage",
        "orderByTime": "ASC",
        "policy": "default",
        "refId": "A",
        "resultFormat": "time_series",
        "select": [
            [
                {
                    "params": [
                        "value"
                    ],
                    "type": "field"
                },
                {
                    "params": [],
                    "type": "mean"
                }
            ]
        ],
        "tags": [
            {
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.memoryUsageWOBuffersCaches = (node) => {
    measurement = {
        "alias": `$tag_category node: ${node} memory`,
        "dsType": "influxdb",
        "groupBy": [
            {
                "params": [
                    "$__interval"
                ],
                "type": "time"
            },
            {
                "params": [
                    "category"
                ],
                "type": "tag"
            },
            {
                "params": [
                    "hostname"
                ],
                "type": "tag"
            },
            {
                "params": [
                    "none"
                ],
                "type": "fill"
            }
        ],
        "measurement": "memory.percent.usedWOBuffersCaches",
        "orderByTime": "ASC",
        "policy": "default",
        "refId": "A",
        "resultFormat": "time_series",
        "select": [
            [
                {
                    "params": [
                        "value"
                    ],
                    "type": "field"
                },
                {
                    "params": [],
                    "type": "mean"
                }
            ]
        ],
        "tags": [
            {
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}