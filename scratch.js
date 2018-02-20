{
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
  "id": 9,
  "legendSortBy": "-ms",
  "lineColor": "rgba(128, 128, 128, 1.0)",
  "links": [],
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
  "metricNameColor": "#000000",
  "rangeMaps": [
    {
      "from": "null",
      "text": "N/A",
      "to": "null"
    }
  ],
  "rowHeight": 24,
  "showDistinctCount": false,
  "showLegend": false,
  "showLegendCounts": false,
  "showLegendNames": false,
  "showLegendPercent": false,
  "showLegendTime": false,
  "showLegendValues": false,
  "showTransitionCount": false,
  "span": 6,
  "targets": [
    {
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
      "alias": "etcd",
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
      "measurement": "nais.process",
      "orderByTime": "ASC",
      "policy": "default",
      "refId": "C",
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
          "value": "etcd"
        },
        {
          "condition": "AND",
          "key": "hostname",
          "operator": "=",
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "refId": "D",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "measurement": "nais.interface",
      "orderByTime": "ASC",
      "policy": "default",
      "refId": "E",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "measurement": "nais.component",
      "orderByTime": "ASC",
      "policy": "default",
      "refId": "F",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "refId": "G",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
      "alias": "etcd-0",
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
      "measurement": "nais.component",
      "orderByTime": "ASC",
      "policy": "default",
      "refId": "H",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "measurement": "nais.addon",
      "orderByTime": "ASC",
      "policy": "default",
      "query": "SELECT last(\"value\") FROM \"nais.addon\" WHERE (\"addon\" = 'coredns' AND \"hostname\" =~ /^$masters$/) AND $timeFilter GROUP BY time($__interval) fill(previous)",
      "rawQuery": false,
      "refId": "I",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "measurement": "nais.addon",
      "orderByTime": "ASC",
      "policy": "default",
      "query": "SELECT last(\"value\") FROM \"nais.addon\" WHERE (\"addon\" = 'kubernetes-dashboard' AND \"hostname\" =~ /^$masters$/) AND $timeFilter GROUP BY time($__interval) fill(previous)",
      "rawQuery": false,
      "refId": "J",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    },
    {
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
      "measurement": "nais.addon",
      "orderByTime": "ASC",
      "policy": "default",
      "query": "SELECT last(\"value\") FROM \"nais.addon\" WHERE (\"addon\" = 'tiller-deploy' AND \"hostname\" =~ /^$masters$/) AND $timeFilter GROUP BY time($__interval) fill(previous)",
      "rawQuery": false,
      "refId": "K",
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
          "value": "a01apvl00048.adeo.no"
        }
      ]
    }
  ],
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
  "writeMetricNames": true,
  "scopedVars": {
    "masters": {
      "selected": false,
      "text": "a01apvl00048.adeo.no",
      "value": "a01apvl00048.adeo.no"
    }
  }
}