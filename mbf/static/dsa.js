'use strict';

// putting the utilities in the main file
function colorNameToHex(colour) {
    var colours = {"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo ": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}




function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


// Initialization of angular root application
var app = angular
    .module('dsapp', ['ui.bootstrap', 'ngSanitize', 'xml', 'infinite-scroll', 'vr.directives.slider', 'ngPrettyJson'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    });

app.value("ol", ol);
app.value("chromeTabs", window.chromeTabs);

var olViewer = app.factory('olViewer', function (ol, $http, xmlParser) {

        var olViewer = function (viewer_options) {

            var self = this;

            // Instance variables
            this.image_source = undefined;
            this.image_layer = undefined;

            this.map = undefined;
            this.draw_mode = undefined;

            this.last_image_layer = undefined;

            var styleFunction = (function () {
                return function (feature, resolution) {

                    if (feature.get('hexcolor')) {
                        return [new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: feature.get('hexcolor'),
                                width: 3
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(0,0,0,0.0)'
                                // color: feature.get('rgbacolor'),
                            }),
                            text: new ol.style.Text({
                                textAlign: "start",
                                textBaseline: "top",
                                font: "20px Arial",
                                text: feature.get('title'),
                                fill: new ol.style.Fill({color: "#000000"}),
                                stroke: new ol.style.Stroke({color: feature.get('hexcolor'), width: 3}),
                                offsetX: 0,
                                offsetY: 0,
                                rotation: 0
                            })
                        })]
                    }
                    else {
                        return [new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 255, 255, 0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'ffffff',
                                width: 1
                            }),
                            image: new ol.style.Circle({
                                radius: 1,
                                fill: new ol.style.Fill({
                                    color: '#ffffff'
                                })
                            })
                        })]
                    }
                };
            })();


            this.vector_source = new ol.source.Vector();
            this.vector_layer = new ol.layer.Vector({
                source: this.vector_source,
                style: styleFunction
            });


            this.map = new ol.Map({
                target: 'map',
                renderer: 'canvas',
                rotateControl: false
            });

            this.scaleLineControl =   new ol.control.ScaleLine({
                units: 'pixels'
            });


            this.overviewmap = new ol.control.OverviewMap({
              maximized: true
            });
// var scaleLineControl =   new ol.control.ScaleLine({
//                     units: 'pixels'
//                 });

                // var overviewmap = new ol.control.OverviewMap({
                //   maximized: true
                // });



        };


//            this.draw_interaction = new ol.interaction.Draw({
//                source: this.vector_source,
//                type: 'Polygon'
//            })
//
//            this.draw_interaction.on('drawend', function(e){
//                // need to manually update the angular state, since they're not directly linked
//                externalApply();
//            });

//            // initialize map (imageviewer)
//            this.map = new ol.Map({
//                renderer:'canvas',
//                target: 'map'
//            });


        // set map event handlers


//            $(this.map.getViewport()).on('mousemove', function(evt) {
//              var pixel = self.map.getEventPixel(evt.originalEvent);
//              self.featuresAtPoint(pixel);
//            });
//
//
////            add zoom slider
//            var zoomslider = new ol.control.ZoomSlider();
//            this.map.addControl(zoomslider);


        // Define the "instance" methods using the prototype
        // and standard prototypal inheritance.
        olViewer.prototype = {

            clearCurrentImage: function () {

                if (this.image_layer) {

                    this.vector_source.clear();

                    this.map.removeLayer(this.image_layer);
                    this.map.removeLayer(this.vector_layer);

                    this.image_layer = undefined;
                    this.vector_layer = undefined;

                    this.image_source = undefined;

                }

            },

            setlayerz : function(new_z) {

                if(this.image_layer != undefined){
                    this.addSimpleMBFLayerFromMetadata(this.last_image_result, new_z);    
                }
            },

            loadBiolucidaImage : function (base_path, image_id) {

                var metadata_url = base_path + 'image/' + image_id;
                var self = this;
                console.log(metadata_url);

                $.ajax({
                    url: metadata_url,
                    success: function (data) {

         
        ////                var tmp = xmldata.split('|');
                        var w = parseInt(data.levels[0].w);
                        var h = parseInt(data.levels[0].h);
        //                var h = parseInt(tmp[1]);
        //
        //                var appmag = parseInt(tmp[7].split('=')[1].trim())
                        var tsx = parseInt(data.tile_x);
                        var tsy = parseInt(data.tile_y);
        //
        //                // Calculate the number of resolutions - smallest fits into a tile
                        var max = (w>h)? w : h;
                        var n = 1;

                        while( max > 256 ){
                          max = Math.floor( max/2 );
                          n++;
                        }

                        var result = {
        //                  'appmag' : appmag,
                          'max_size': { w: w, h: h },
                          'tileSize': { w: tsx, h: tsy },
                          'num_resolutions': n
                        };

                        result['url'] = base_path + 'tile/' + image_id + '/';
                        result['thumbnail'] = data.thumbnail;
                        result['servermeta'] = data;

                        self.last_image_result = result;

                        self.addMBFLayerFromMetadata(result, 0);

                    }
                });

            },





            // loadAperioImage : function(base_path) {

            //     this.clearCurrentImage();

            //     var metadata_url = base_path + '?XINFO';

            //     var self = this;

            //     $("#image_search_url").val(base_path);

            //     $http.get(metadata_url).then(function (response) {

            //         var attributes = response.xml.find('xinfo');

            //         var w = parseInt(attributes.find('width')[0].textContent);
            //         var h = parseInt(attributes.find('height')[0].textContent);

            //         var tsx = parseInt(attributes.find('tilewidth')[0].textContent);
            //         var tsy = parseInt(attributes.find('tileheight')[0].textContent);

            //         var max = (w>h)? w : h;
            //         var n = 1;

            //         while( max > tsx ){
            //           max = Math.floor( max/2 );
            //           n++;
            //         }

            //         var image_metadata = {
            //             'max_size': { w: w, h: h },
            //             'tileSize': { w: tsx, h: tsy },
            //             'num_resolutions': n,
            //             'url' : base_path,
            //             'thumbnail' : base_path + "?0+0+0+256+-1+80"
            //         };

            //         console.log(image_metadata);

            //         self.image_metadata = image_metadata;

            //         self.addAperioLayer(image_metadata);
            //     })


            // },

//             addAperioLayer: function(metadata) {


//                 this.imageCenter = [metadata.max_size.w / 2, -metadata.max_size.h / 2];
// //                this.proj = new ol.proj.NativeProjection('pixels', [0, 0, metadata.max_size.w, metadata.max_size.h], 'pixels');

//                 this.proj = new ol.proj.Projection({
//                   code: 'ZOOMIFY',
//                   units: 'pixels',
//                   extent: [0, 0, metadata.max_size.w, metadata.max_size.h]
//                 });

//                 this.crossOrigin = 'anonymous';

//                 this.image_source = new ol.source.Leica({
//                     url: metadata.url,
//                     size: [metadata.max_size.w, metadata.max_size.h],
//                     crossOrigin: this.crossOrigin
//                 });

//                 this.image_layer = new ol.layer.Tile({
//                     source: this.image_source,
//                     preload: 1
//                 });

//                 this.view = new ol.View({
//                     projection: this.proj,
//                     center: this.imageCenter,
//                     zoom: 0,
//                     maxZoom: metadata.num_resolutions
//                 });


//                 this.map.addLayer(this.image_layer);
//                 this.map.addLayer(this.vector_layer);

//                 this.map.setView(this.view);

//                 this.map.addControl(this.scaleLineControl);
//                 this.map.addControl(this.overviewmap);

//                 this.addAperioAnnotation(metadata.url)

//             },

            addSimpleMBFLayerFromMetadata: function (metadata, base_z){

                this.imageCenter = [metadata.max_size.w / 2, - metadata.max_size.h / 2];
                this.projection = new ol.proj.Projection({
                  code: 'ZOOMIFY',
                  units: 'pixels',
                  extent: [0, 0, metadata.max_size.w, metadata.max_size.h]
                });

                Array.prototype.contains = function(v) {
                    for(var i = 0; i < this.length; i++) {
                        if(this[i] === v) return true;
                    }
                    return false;
                };

                Array.prototype.unique = function() {
                    var arr = [];
                    for(var i = 0; i < this.length; i++) {
                        if(!arr.contains(this[i])) {
                            arr.push(this[i]);
                        }
                    }
                    return arr;
                };


                var zm =  JSON.parse(metadata.servermeta.zoom_map);
                var zmu = zm.unique();

                var z_spacing = parseInt(metadata.servermeta.focal_spacing);
                var z_planes = parseInt(metadata.servermeta.focal_planes);

                console.log(z_planes, z_spacing);
//
                this.layers = [];

                var crossOrigin = 'anonymous';

                this.image_source = new ol.source.Biolucida({
                    url: metadata.url,
                    zoommap: zmu,
                    z_index: base_z,
                    size: [metadata.max_size.w, metadata.max_size.h],
                    crossOrigin: crossOrigin
                });


                if(this.last_image_layer != undefined){
                    this.map.removeLayer(this.last_image_layer);
                }

                this.last_image_layer = this.image_layer;
                
                this.image_layer = new ol.layer.Tile({
                    source: this.image_source,
                    preload: 1
                });

                this.view = new ol.View({
                  projection: this.projection,
                  center: this.imageCenter,
                  zoom: zmu[0],
                  maxZoom: metadata.num_resolutions
                });

                this.map.addLayer(this.image_layer);

                // this.map.setView(this.view);

                // var scaleLineControl =   new ol.control.ScaleLine({
                //     units: 'pixels'
                // });
                // this.map.addControl(scaleLineControl);

                // var overviewmap = new ol.control.OverviewMap({
                //   maximized: true
                // });
                // this.map.addControl(overviewmap);

            },


            addMBFLayerFromMetadata: function (metadata, base_z){

                console.log(metadata);

                this.imageCenter = [metadata.max_size.w / 2, - metadata.max_size.h / 2];
                this.projection = new ol.proj.Projection({
                  code: 'ZOOMIFY',
                  units: 'pixels',
                  extent: [0, 0, metadata.max_size.w, metadata.max_size.h]
                });

                Array.prototype.contains = function(v) {
                    for(var i = 0; i < this.length; i++) {
                        if(this[i] === v) return true;
                    }
                    return false;
                };

                Array.prototype.unique = function() {
                    var arr = [];
                    for(var i = 0; i < this.length; i++) {
                        if(!arr.contains(this[i])) {
                            arr.push(this[i]);
                        }
                    }
                    return arr;
                };


                var zm =  JSON.parse(metadata.servermeta.zoom_map);
                var zmu = zm.unique();

                var z_spacing = parseInt(metadata.servermeta.focal_spacing);
                var z_planes = parseInt(metadata.servermeta.focal_planes);

                console.log(z_planes, z_spacing);
//
                this.layers = [];

                var crossOrigin = 'anonymous';

                this.image_source = new ol.source.Biolucida({
                    url: metadata.url,
                    zoommap: zmu,
                    z_index: base_z,
                    size: [metadata.max_size.w, metadata.max_size.h],
                    crossOrigin: crossOrigin
                });

                this.image_layer = new ol.layer.Tile({
                    source: this.image_source,
                    preload: 1
                });

                this.view = new ol.View({
                  projection: this.projection,
                  center: this.imageCenter,
                  zoom: zmu[0],
                  maxZoom: metadata.num_resolutions
                });

                // this.image_layer = this.layers[0];

                this.map.addLayer(this.image_layer);
        //        map.addLayer(vector_layer);

                this.map.setView(this.view);

                this.map.removeControl(this.scaleLineControl);
                this.map.removeControl(this.overviewmap);


                this.map.addControl(this.scaleLineControl);

                this.map.addControl(this.overviewmap);

            },



            addAperioAnnotation: function (aperio_url) {

                var annotation_url = aperio_url + '?GETANNOTATIONS';

                var self = this;

                $http.get(annotation_url).then(function(response){

                    console.log(response);
                    var annotationList = response.xml.find('Annotation');
                    $(annotationList).each(function (index, annotation) {

                        var returnobj = parseSingleAnnotation(annotation);

                        if(returnobj.Regions.length > 0){

                            for(var i in returnobj.Regions){

                                var current_region = returnobj.Regions[i];

                                var feature = new ol.Feature({
                                    layer: returnobj.AnnotationProperties.Name,
                                    title: i,
                                    aperio: returnobj
                                });

                                var lineColorFlip = decimalToHex(returnobj.AnnotationProperties.LineColor, 6);
                                var lineColor = lineColorFlip[4] + lineColorFlip[5] + lineColorFlip[2]
                                    + lineColorFlip[3]
                                    + lineColorFlip[0]
                                    + lineColorFlip[1];
                                lineColor = "#" + lineColor;

                                feature.set('hexcolor', lineColor);
                                feature.setGeometry(new ol.geom.Polygon([current_region.vertices]));

                                self.vector_source.addFeatures([feature]);

                            }

                        }


                    });
                });
            },

            moveToFeature: function (feature) {
                var featuresExtent = ol.extent.createEmpty();
                ol.extent.extend(featuresExtent, feature.getGeometry().getExtent());
                this.map.getView().fitExtent(featuresExtent, this.map.getSize());
            },

            featuresAtPoint: function (pixel) {

                var feature = this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                    return feature;
                });
                var info = document.getElementById('objectinfo');

                if (feature) {
                    var icon = feature.get('icon');
                    if (icon) {
                        info.src = icon;
                    }
                    else {
                        info.src = 'static/na.jpg'
                    }
                } else {
                }
            },


            getFeatures: function () {
                return this.vector_source.getFeatures();
            },

            setAnnotations: function (features) {
                if (features) {
                    this.vector_source.addFeatures(features);
                }
            },

            clearLayerAnnotations: function (step) {
                this.vector_source.clear();
            },


            removeDrawInteraction: function () {

                if (this.draw_interaction) {
                    this.map.removeInteraction(this.draw_interaction);
                }
            },

            addSelectInteraction: function () {

                if (this.select_interaction) {
                    this.map.addInteraction(this.select_interaction);
                }

            },

            removeSelectInteraction: function () {

                if (this.select_interaction) {
                    this.map.removeInteraction(this.select_interaction);
                }

            },


            setDrawMode: function (draw_mode) {

                this.draw_mode = draw_mode;

                console.log(this.draw_mode);

                if (draw_mode == 'navigate') {
                } else if (draw_mode == 'paintbrush') {
                } else if (draw_mode == 'autofill') {
                } else if (draw_mode == 'pointlist') {

                    this.map.addInteraction(this.draw_interaction)

                }
            }
        }

        return( olViewer );

    }
);


// Initialization of angular app controller with necessary scope variables. Inline declaration of external variables
// needed within the controller's scope. State variables (available between controllers using $rootScope). Necessary to
// put these in rootScope to handle pushed data via websocket service.
var appController = app.controller('ApplicationController', ['$scope', '$rootScope', '$location', '$timeout', '$http', 'olViewer',
    function ($scope, $rootScope, $location, $timeout, $http, olViewer) {

        // global ready state variable
        $rootScope.applicationReady = false;

        $rootScope.imageviewer = undefined;

        $rootScope.useOpenSeadragon = false;

        $rootScope.last_image_metadata ='';

        $rootScope.gallery_url = undefined;

        // $scope.base_gallery_url = 

        $scope.show_z_nav = false;

        // pull user variables (via template render) in js app...
        var current_user = $("#user_email").val();
        var current_user_id = $("#user_id").val();

        $rootScope.user_email = current_user;
        $rootScope.user_id = current_user_id;

        // initial layout    
        updateLayout();


        // main application, gives a bit of a delay before loading everything
        $rootScope.ApplicationInit = function () {
            $rootScope.imageviewer = new olViewer({'div': 'annotationView'});
            $rootScope.applicationReady = true;
        };
        $rootScope.ApplicationInit();


        $scope.selectImage = function (image) {
            console.log(image);
//            $rootScope.imageviewer.loadAperioImage(image.imagepath)

            $rootScope.imageviewer.clearCurrentImage();

            // $rootScope.imageviewer.loadBiolucidaImage(image.basepath, image.imagepath);
            // loadBiolucidaImage : function (base_path, image_id) {

            var base_path = image.basepath;
            var image_id = image.imagepath;

            var metadata_url = base_path + 'image/' + image_id;
            var self = this;
            console.log(metadata_url);


            $http.get(metadata_url).then(function (response) {

                var data = response.data;
                var w = parseInt(data.levels[0].w);
                var h = parseInt(data.levels[0].h);
                var tsx = parseInt(data.tile_x);
                var tsy = parseInt(data.tile_y);
                var max = (w>h)? w : h;
                var n = 1;

                if(response.data.focal_planes != "1"){
                    $scope.show_z_nav = true;
                }
                else{
                    $scope.show_z_nav = false;
                }

                while( max > 256 ){
                  max = Math.floor( max/2 );
                  n++;
                }

                var result = {
//                  'appmag' : appmag,
                  'max_size': { w: w, h: h },
                  'tileSize': { w: tsx, h: tsy },
                  'num_resolutions': n
                };

                result['url'] = base_path + 'tile/' + image_id + '/';
                result['thumbnail'] = data.thumbnail;
                result['servermeta'] = data;

                $rootScope.last_image_metadata = result;

                $rootScope.imageviewer.last_image_result = result;

                $rootScope.imageviewer.addMBFLayerFromMetadata(result, 0);

            });
    
        };
    

        $scope.loadImageFromURL = function(){

            var image_path_to_load = $("#image_search_url").val();



            var final_path = 'http://107.170.194.205:1234/wiley.biolucida.net/api/v1/slides/0/30/collections/' + image_path_to_load;
            // if(image_path_to_load.indexOf('svs') != -1){
            //     if(image_path_to_load.indexOf('?') != -1){
            //         final_path = image_path_to_load.substring(0, image_path_to_load.indexOf('?'));
            //     }
            //     else {
            //         final_path = image_path_to_load.substring(0, image_path_to_load.indexOf('svs') + 3);
            //     }
            // }
            // else {
            //     alert('currently only supports svs images');
            // }

            if(final_path.length > 2){

                // GaillardKartenandSauve_NileRat/NR_1002_BilatCTb_Retina_Fluor_Sag02
                // console.log('loading ', final_path);
                // $rootScope.imageviewer.loadAperioImage(final_path);
                $rootScope.gallery_url = final_path;
            }


        };

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

    }]);


var image_browser = app.controller('ImageBrowserController', ['$scope', '$rootScope', '$location', '$timeout', '$http',
    function ($scope, $rootScope, $location, $timeout, $http) {

        $scope.image_list = [];


        $scope.currentz = 0;

        $scope.$watch('currentz', function(newValue, oldValue){

            console.log(newValue);

            $rootScope.imageviewer.setlayerz(newValue);
        })

        $scope.getImages = function() {

            // var image_url = 'http://107.170.194.205:1234/wiley.biolucida.net/api/v1/slides/0/30/collections/GaillardKartenandSauve_NileRat/NR_1002_BilatCTb_Retina_Fluor_Sag02';

            $http.get($scope.gallery_url).then(function (response) {

                var image_cache = response.data.images;
                var temporary_list = [];

                angular.forEach(image_cache, function (image) {

//                    ,"images":[{"original_name":"18_2010-11-09 16.31.52.ndpi","title":"18_2010-11-09 16.31.52.ndpi","description":"Nile Rat (Arvicanthis niloticus) NR_0177 CTb in eye. Horizontal plane of section. 30um section; every third section is displayed.","url":"477","height":"29696","width":"92160","thumbnail":"http://wiley.biolucida.net:80/download.php?type=api&file=C:/Users/biolucidaservice/AppData/Local/MBF Bioscience/.imagedata/wileyadmin/catalog/thumbnails/477.jpeg","image_type":"image","collection_id":"10","zsize":"1"},
//                    var el = $(image_cache[image])
//                    var file_name = el.find('filename').text().replace(' ', '%20');

                    var image_description = {
                        name: image.title,
                        size: {
                            w: parseInt(image.width),
                            h: parseInt(image.height)
                        },
                        thumbnail: image.thumbnail,
                        imagepath: image.url,
                        basepath: 'http://107.170.194.205:1234/wiley.biolucida.net/api/v1/'
                    };

                    console.log(image_description);

                    temporary_list.push(image_description);

                });

                $scope.image_list = temporary_list;

            });

        };



        $scope.getImagesOld = function () {

            var gallery_url = "http://images.aperio.com";
            var url = "http://images.aperio.com/stats.xml";

            $http.get(url).then(function (response) {

                var image_cache = response.xml.find('image');
                var temporary_list = [];

                image_cache.each(function (image) {

                    var el = $(image_cache[image])

                    var file_name = el.find('filename').text().replace(' ', '%20');

                    var image_description = {
                        name: file_name,
                        size: {
                            w: parseInt(el.find('width').text()),
                            h: parseInt(el.find('height').text())
                        },
                        thumbnail: gallery_url + '/' + file_name + '?0+0+0+256+-1+80',
                        imagepath: gallery_url + '/' + file_name
                    };

                    console.log(image_description);

                    temporary_list.push(image_description);

                });

                $scope.image_list = temporary_list;

            });
        };




        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.$watch('gallery_url', function(newValue, oldValue){

            if(newValue != undefined){
                $scope.getImages();    
            }
            
            // var image_url = 'http://107.170.194.205:1234/wiley.biolucida.net/api/v1/slides/0/30/collections/Chin';

        });

        // run me!
        // $scope.getImages();


    }]);


// handle window resize events
function updateLayout() {

    var bar_offset = 50;

    $("#angular_id").height(window.innerHeight - bar_offset);
    $("#image_browser").height(window.innerHeight - bar_offset);
    $("#site-wrapper").height(window.innerHeight);
    $("#map").height(window.innerHeight - bar_offset);
    $("#map").width(window.innerWidth - 210);
    $("#inner_thumbnail_container").height(window.innerHeight - bar_offset);
}

function externalApply() {
    var scope = angular.element($("#angular_id")).scope();
    scope.safeApply(function () {
    })
}

$(function() {
    $('.toggle-nav').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav();
    });
});

function toggleNav() {
    if ($('#site-wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav');
    }
}

 function decimalToHex(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
        while (hex.length < padding) {
            hex = "0" + hex;
        }
        return hex;
    }



function parseSingleAnnotation(annotationXML) {

    var returnobj = {}

    //  <Annotation Id="2" Name="Report Image" ReadOnly="0" NameReadOnly="0" LineColorReadOnly="0"
    //  Incremental="0" Type="8" LineColor="65535" Visible="1" Selected="1" MarkupImagePath="" MacroName="">
    var annotation_attributes = annotationXML.attributes; // obvious.
    var annotation_properties = {}
    for (var j = 0; j < annotation_attributes.length; j++) {
        var at = annotation_attributes[j];
        var nm = at.name;
        annotation_properties[nm] = at.value
    }

    // annotation (global) attributes
    var global_attributes = $(annotationXML)
        .find('Attributes')
        .filter(function () {
            return $(this).parent()[0].tagName === "Annotation";
        });

    var global_properties = []
    global_attributes.each(function (n, attribs) {
        $(attribs).children().each(function (i, val) {
            var prop = {}
            for (var j = 0; j < val.attributes.length; j++) {
                var at = val.attributes[j];
                var nm = at.name;
                prop[nm] = at.value
            }
            global_properties.push(prop);
        })
    });

    // annotation (global) attributes
    var region_header_attributes = $(annotationXML)
        .find('AttributeHeader')
        .filter(function () {
            return $(this).parent()[0].tagName === "RegionAttributeHeaders";
        });

    var region_header_properties = [];
    region_header_attributes.each(function (n, attribs) {
        var prop = {}
        for (var j = 0; j < attribs.attributes.length; j++) {
            var at = attribs.attributes[j];
            var nm = at.name;
            prop[nm] = at.value
        }
        region_header_properties.push(prop);
    });

    var regions = []

    var regionXML = $(annotationXML).find("Region")
    regionXML.each(function (n, region) {
        var region_properties = []
        for (var j = 0; j < region.attributes.length; j++) {
            var at = region.attributes[j];
            var nm = at.name;
            region_properties[nm] = at.value
        }

        // annotation (global) attributes
        var region_attributes = $(region)
            .find('Attributes')

        var region_attribute_properties = [];
        region_attributes.children().each(function (n, attribs) {
            var prop = {}
            for (var j = 0; j < attribs.attributes.length; j++) {
                var at = attribs.attributes[j];
                var nm = at.name;
                prop[nm] = at.value;
            }
            region_attribute_properties.push(prop);
        });

        var region_vertices = $(region).find('Vertex');
        var vertex_list = [];
        region_vertices.each(function (n, vert) {
            var x = parseInt(vert.attributes['X'].nodeValue);
            var y = -1 * parseInt(vert.attributes['Y'].nodeValue);
            vertex_list.push([x, y]);
        })


        var region_data = {
            properties: region_properties,
            attributes: region_attribute_properties,
            vertices: vertex_list
        }

        regions.push(region_data);

    });


    returnobj = {
        GlobalAttributes: global_properties,
        AnnotationProperties: annotation_properties,
        RegionAttributeHeaders: region_header_properties,
        Regions: regions
    }

    return returnobj;
}

window.onresize = updateLayout;









































