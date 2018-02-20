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
    measurement = {
        "alias": "dockerd",
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
        "measurement": "nais.process",
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
                "key": "process",
                "operator": "=",
                "value": "dockerd"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.processKubelet = (node) => {
    measurement = {
        "alias": "kubelet",
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
        "measurement": "nais.process",
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
                "key": "process",
                "operator": "=",
                "value": "kubelet"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.interfaceDocker0 = (node) => {
    measurement = {
        "alias": "docker0",
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
        "measurement": "nais.interface",
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
                "key": "interface",
                "operator": "=",
                "value": "docker0"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.interfaceDocker0 = (node) => {
    measurement = {
        "alias": "docker0",
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
        "measurement": "nais.interface",
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
                "key": "interface",
                "operator": "=",
                "value": "docker0"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.interfaceFlannel = (node) => {
    measurement = {
        "alias": "flannel.1",
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
        "measurement": "nais.interface",
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
                "key": "interface",
                "operator": "=",
                "value": "flannel"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.componentControllerManager = (node) => {
    measurement = {
        "alias": "controller-manager",
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
        "measurement": "nais.component",
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
                "key": "component",
                "operator": "=",
                "value": "controller-manager"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.componentScheduler = (node) => {
    measurement = {
        "alias": "scheduler",
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
        "measurement": "nais.component",
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
                "key": "component",
                "operator": "=",
                "value": "scheduler"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.componentEtcd0 = (node) => {
    measurement = {
        "alias": "etcd-o",
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
        "measurement": "nais.component",
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
                "key": "component",
                "operator": "=",
                "value": "etcd-0"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.addonCoredns = (node) => {
    measurement = {
        "alias": "coredns",
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
        "measurement": "nais.addon",
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
                "key": "addon",
                "operator": "=",
                "value": "coredns"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.addonKubernetesDashboard = (node) => {
    measurement = {
        "alias": "kubernetes-dashboard",
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
        "measurement": "nais.addon",
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
                "key": "addon",
                "operator": "=",
                "value": "kubernetes-dashboard"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}

exports.addonTillerDeploy = (node) => {
    measurement = {
        "alias": "tiller-deploy",
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
        "measurement": "nais.addon",
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
                "key": "addon",
                "operator": "=",
                "value": "tiller-deploy"
            },
            {
                "condition": "AND",
                "key": "hostname",
                "operator": "=",
                "value": node
            }
        ]
    }
    return measurement
}