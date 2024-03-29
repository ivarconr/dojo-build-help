var profile = {
    basePath: "./",
    layerOptimize: "closure",
    releaseDir: "./release",
    hasReport: true,
    selectorEngine: "acme",

    packages:[
        {
            name: "dojo",
            location: "./dojo-release-1.7.1-src/dojo"
        },
        {
            name: "dijit",
            location: "./dojo-release-1.7.1-src/dijit"
        },
        {
            name: "dojox",
            location: "./dojo-release-1.7.1-src/dojox"
        }
    ],

    layers: {
        "dojo/dojo": {
        boot: true,
        customBase: true,
        include: [
            "dojo/dojo", 
            "dojo/dom", 
            "dojo/domReady", 
            "dojo/i18n", 
            "dojo/parser", 
            "dojo/ready", 
            "dojo/_base/kernel",
            "dojo/_base/loader",
            "dijit/registry"
        ]
        },
        "layers/core": {
            include: [
                "dijit/Dialog",
                "dijit/form/Button",
                "dijit/form/CheckBox",
                "dijit/layout/ContentPane",
                "dijit/Tooltip",                
            ]
        },
        "layers/menu": {
            include: [
                "dijit/form/DropDownButton",
                "dijit/Menu",
                "dijit/MenuItem",
                "dijit/MenuSeparator",
                "dijit/PopupMenuItem",
                "dijit/Toolbar"
            ],
            exclude: [
                "layers/core"
            ]
        }
        , "layers/accordion": {
            include: [
                "dijit/layout/AccordionContainer"
            ]
            , exclude: [
                "layers/core"
                , "layers/menu"
            ]
        }
        , "layers/chart": {
            include: [
                "dojox/charting/Chart2D"
                , "dojox/charting/action2d/Highlight"
                , "dojox/charting/action2d/MoveSlice"
                , "dojox/charting/action2d/Tooltip"
                , "dojox/charting/themes/Julie"
            ]
            , exclude: [
                "layers/core"
                , "layers/menu"
                , "layers/accordion"
            ]
        }
    }
}
