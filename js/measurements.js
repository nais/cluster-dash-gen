const createMeasurement = (node, alias, measurement, key, value) => {
    return  {
        "alias": alias,
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
        "hide": false,
        "measurement": measurement,
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
                    "type": "last"
                }
            ]
        ],
        "tags": [
            {
                "key": key,
                "operator": "=",
                "value": value
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
}

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
        "alias": `${node} CPU load`,
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
        "alias": `${node} - disk usage /var`,
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
        "alias": `${node} used memory`,
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

exports.memoryPercentCached = (node) => {
    measurement = {
        "alias": `${node} cached memory`,
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
                    "none"
                ],
                "type": "fill"
            }
        ],
        "measurement": "memory.percent.cached",
        "orderByTime": "ASC",
        "policy": "default",
        "query": "SELECT mean(\"value\") FROM \"memory.percent.cached\" WHERE (\"hostname\" = 'a01apvl00048.adeo.no' ) AND $timeFilter GROUP BY time($__interval)fill(none)",
        "rawQuery": false,
        "refId": "B",
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

exports.processDockerd = (node) => {
    return createMeasurement(node, 'dockerd', 'nais.process', 'process', 'dockerd')
}

exports.processKubelet = (node) => {
    return createMeasurement(node, 'kubelet', 'nais.process', 'process', 'kubelet')
}

exports.processFlanneld = (node) => {
    return createMeasurement(node, 'flanneld', 'nais.process', 'process', 'flanneld')
}

exports.processKubeProxy = (node) => {
    return createMeasurement(node, 'kube-proxy', 'nais.process', 'process', 'kube-proxy')
}

exports.interfaceDocker0 = (node) => {
    return createMeasurement(node, 'docker0', 'nais.interface', 'interface', 'docker0')
}

exports.interfaceFlannel = (node) => {
    return createMeasurement(node, 'flannel.1', 'nais.interface', 'interface', 'flannel')
}

exports.componentControllerManager = (node) => {
    return createMeasurement(node, 'controller-manager', 'nais.component', 'component', 'controller-manager')
}

exports.componentScheduler = (node) => {
    return createMeasurement(node, 'scheduler', 'nais.component', 'component', 'scheduler')
}

exports.componentEtcd0 = (node) => {
    return createMeasurement(node, 'etcd-0', 'nais.component', 'component', 'etcd-0')
}

exports.addonCoredns = (node) => {
    return createMeasurement(node, 'coredns', 'nais.addon', 'addon', 'coredns')
}

exports.addonKubernetesDashboard = (node) => {
    return createMeasurement(node, 'kubernetes-dashboard', 'nais.addon', 'addon', 'kubernetes-dashboard')
}

exports.addonTillerDeploy = (node) => {
    return createMeasurement(node, 'tiller-deploy', 'nais.addon', 'addon', 'tiller-deploy')
}