import { Component, EventEmitter, OnInit, AfterViewInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapService } from '../../services/map/map.service';

declare var ol: any;

/**
* This class represents the main application component.
*/
@Component({
    moduleId: module.id,
    selector: 'sd-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {
    @Output() OnReady = new EventEmitter();
    @ViewChild('infowindow') infowindow: ElementRef;
    @ViewChild('closer') closer: ElementRef;
    @ViewChild('content') content: ElementRef;

    public map: any;
    private id: string = 'm' + (Math.floor(Math.random() * 1000 + Math.random() * 2500)).toString();
    private zoom: number;
    private mouseEventInteraction: any;
    private layers: any[] = [];
    private infowin_layer: any;
    private events: any = {};

    constructor(private map_service: MapService) {
        this.map_service.suscribeMap(this.id, this);
        this.zoom = 14;
        this.makeMap().subscribe(data => {
            this.interactions();
        });
    }

    public ngOnInit() {
        const self = this;
    }

    public getMap() {
        return this.map;
    }

    public makeMap(): Observable<any> {
        return new Observable(observe => {
            const source = new ol.layer.Tile({
                source: new ol.source.OSM()
            });

            this.map = new ol.Map({
                layers: [
                    source
                ],
                controls: ol.control.defaults({
                    zoom: true,
                    attribution: false,
                    rotate: true
                }),
                view: new ol.View({
                    center: ol.proj.fromLonLat([-70.6506, -33.4372]),
                    zoom: this.zoom
                })
            });
            observe.next(true);
            observe.complete();
        });
    }

    // After view init the map target can be set!
    ngAfterViewInit() {
        this.map.setTarget(this.id);
        this.OnReady.emit(this);
        this.infowin();
    }

    public setLatLng(lat: number, lng: number) {
        this.map.getView().setCenter(ol.proj.fromLonLat([lng, lat]));
    }

    public setZoom(lvl: number) {
        this.zoom = lvl;
        this.map.getView().setZoom(lvl);
    }

    public getCoordLatLng(lat: number, lng: number) {
        return ol.proj.fromLonLat([lat, lng]);
    }

    // Events methods
    public interactions() {
        const self = this;
        // ESTE SERVICIO ES EL ENCARGADO DE GESTIONAR LOS EVENTOS DEL MAPA
        // ES IMPORTANTE SABER QUE INVESTIGUE Y PROGRAME ESTE METODO A LAS
        // 21:33 HRS DEL DIA 21 DE ABRIL DEL 2017 CON EVIDENTE ESTADO DE SOLMNOLENCIA

        // DECLARAMOS EL METODO QUE GESTIONARA LOS EVENTOS MOUSEOVER Y MOUSEOUT
        const mouseover = new ol.interaction.Select({
            layers: function(layer: any) {
                return true;
            },
            filter: function(feature: any, layer: any) {
                if (feature === null)
                    return false;
                return true;
            },
            condition: ol.events.condition.pointerMove
        });
        //LUEGO REGISTRAMOS EL EVENTO
        mouseover.on('select', function(e: any) {
            //EL TENER UNA CAPA DESELECCIONADA BAJO ESTA MODALIDAD DENOTA UN EVENTO MOUSEOUT
            if (e.deselected.length > 0) {
                document.body.style.cursor = 'default';
                const hover = e.deselected[0].get('opts').hovercolor;
                const action =  e.deselected[0].get('handlers');
                if (typeof hover !== 'undefined') {
                    if (typeof action.nohover === 'function')
                        action.nohover(e.deselected[0]);
                }
                const mouseout = e.deselected[0].get('opts').mouseout;
                if (typeof mouseout === 'function')
                    mouseout(e, e.deselected[0]);
            }

            //EL TENER UNA CAPA SELECCIONADA BAJO ESTA MODALIDAD DENOTA UN EVENTO MOUSEENTER
            if (e.selected.length > 0) {
                document.body.style.cursor = 'pointer';
                const hover = e.selected[0].get('opts').hovercolor;
                const action =  e.selected[0].get('handlers');
                if (typeof hover !== 'undefined') {
                    if (typeof action.hover === 'function')
                        action.hover(e.selected[0]);
                }
                const mouseenter = e.selected[0].get('opts').mouseenter;
                if (typeof mouseenter === 'function')
                    mouseenter(e, e.selected[0]);
            }
        });

        // LUEGO REGISTRAMOS EL EVENTO
        this.mouseEventInteraction = mouseover;
        this.map.addInteraction(mouseover);

        // DECLARAMOS EL METODO QUE GESTIONARA LOS EVENTOS CLICK
        this.map.getViewport().addEventListener('click', function (evt: any) {
            evt.stopPropagation();
            const feature = self.getMap().forEachFeatureAtPixel(self.getMap().getEventPixel(evt), function(feature: any, layer: any) {
                return feature;
            });

            const coord = self.getMap().getCoordinateFromPixel(self.getMap().getEventPixel(evt));
            if (feature) {
                mouseover.getFeatures().clear();
                const action = feature.get('opts').click;
                const infowindow = feature.get('opts').infowindow;
                if (typeof action === 'function')
                    action(evt, feature);
                if (typeof infowindow === 'function')
                    infowindow(evt, feature, self.infowin_layer, coord, self.infowindow);

                const hover = feature.get('opts').hovercolor;
                if (typeof hover !== 'undefined') {
                    const opts = feature.get('opts');
                    const handlers = feature.get('handlers');
                    if (handlers && handlers.nohover)
                        return handlers.nohover(feature);

                    feature.setStyle(new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: (opts.fillcolor) ? opts.fillcolor : [0, 0, 0, 0.7],
                        }),
                        stroke: new ol.style.Stroke({
                            color: (opts.strokecolor) ? opts.strokecolor : [0, 0, 0, 1],
                            width: (opts.stroke) ? opts.strokecolor : 1
                        })
                    }));
                }
            }
        });

        // DECLARAMOS EL QUE GESTIONA LOS EVENTOS RIGHTCLICK
        this.map.getViewport().addEventListener('contextmenu', function (evt: any) {
            evt.preventDefault();
            const feature = self.getMap().forEachFeatureAtPixel(self.getMap().getEventPixel(evt), function(feature: any, layer: any) {
                return feature;
            });

            if (feature) {
                mouseover.getFeatures().clear();
                const action = feature.get('opts').rightclick;
                if (typeof action === 'function')
                    action(evt, feature);
            }
        });

        this.map.addEventListener('moveend', function (evt: any) {
            evt.preventDefault();

            if (typeof self.events['moveend'] === 'function')
                self.events['moveend'](evt);
        });
    }

    // Definimos el metodo para agregar un marker
    public setMarker(lat: number, lng: number, opts: any) {
        /*var point = new ol.geom.Point(this.getCoordLatLng(lat,lng));
        var iconFeature = new ol.Feature({
            geometry: point,
            opts: opts
        });*/

        /*var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'assets/icon/icon.png'
            }))
        });*/
        const handlers = {
            hover: function(e: any) {
                const style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: opts.hovercolor
                        }),
                        stroke: stroke,
                        radius: 8
                    }),
                    fill: fill,
                    stroke: stroke
                });
                e.setStyle(style);
            },
            nohover: function(e: any) {
                const style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: fill,
                        stroke: stroke,
                        radius: 8
                    }),
                    fill: fill,
                    stroke: stroke
                });
                e.setStyle(style);
            }
        };

        const point = new ol.Feature({
            geometry: new ol.geom.Point(this.getCoordLatLng(lat, lng)),
            opts: opts,
            handlers: handlers
        });

        // iconFeature.setStyle(iconStyle);
        const fill = new ol.style.Fill({
            color: (opts.fillcolor) ? opts.fillcolor : [180, 0, 0, 0.8]
        });

        const stroke = new ol.style.Stroke({
            color: (opts.strokecolor) ? opts.strokecolor : [255, 255, 255, 1],
            width: 1
        });

        const vectorSource = new ol.source.Vector({
            features: [point]
        });

        const vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        const style = new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 8
            }),
            fill: fill,
            stroke: stroke
        });

        point.setStyle(style);
        this.map.addLayer(vectorLayer);
        this.layers.push(vectorLayer);

        return vectorLayer;
    }

    public setMultiPolygon(coords: number[][], opts: any) {
        const coordinates: any = [];

        for (let i = 0; i < coords.length; i++) {
            coordinates[i] = [];
            const cor: any = [];
            for (let l = 0; l < coords[i].length; l += 2) {
                cor.push(this.getCoordLatLng(coords[i][l + 1], coords[i][l]));
            }
            coordinates[i].push(cor);
        }

        const handlers = {
            hover: function(e: any) {
                e.setStyle(new ol.style.Style({
                      fill: new ol.style.Fill({
                          color: (opts.hovercolor) ? opts.hovercolor : [0, 0, 0, 0.4],
                    }),
                    stroke: new ol.style.Stroke({
                      color: (opts.strokecolor) ? opts.strokecolor : [0, 0, 0, 1],
                      width: (opts.stroke) ? opts.strokecolor : 1
                    })
                }));
            },
            nohover: function(e: any) {
                e.setStyle(new ol.style.Style({
                      fill: new ol.style.Fill({
                          color: (opts.fillcolor) ? opts.fillcolor : [0, 0, 0, 0.4],
                    }),
                    stroke: new ol.style.Stroke({
                      color: (opts.strokecolor) ? opts.strokecolor : [0, 0, 0, 1],
                      width: (opts.stroke) ? opts.strokecolor : 1
                    })
                }));
            }
        };

        const linestring_feature = new ol.Feature({
            geometry: new ol.geom.MultiPolygon(coordinates),
            opts: opts,
            handlers: handlers
        });

        const vector_layer: any = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [linestring_feature]
            })
        });

        const style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: (opts.fillcolor) ? opts.fillcolor : [0, 0, 0, 0.7]
            }),
            stroke: new ol.style.Stroke({
                color: (opts.strokecolor) ? opts.strokecolor : [0, 0, 0, 1],
                width: (opts.stroke) ? opts.stroke : 1
            })
        });

        linestring_feature.setStyle(style);
        this.map.addLayer(vector_layer);
        this.layers.push(vector_layer);

        return vector_layer;
    }

    public setPolygonRing(coords: number[][], opts: any) {
        const outer = [
            this.getCoordLatLng(-180, -90),
            this.getCoordLatLng(180, -90),
            this.getCoordLatLng(180, 90),
            this.getCoordLatLng(-180, 90)
        ];
        const polygons = [outer];

        // Anillos interiores
        for (let i = 0; i < coords.length; i++) {
            const cor: any = [];
            for (let l = 0; l < coords[i].length; l += 2) {
                cor.push(this.getCoordLatLng(coords[i][l + 1], coords[i][l]));
            }
            polygons.push(cor);
        }

        const linestring_feature = new ol.Feature({
            geometry: new ol.geom.Polygon(polygons),
            opts: opts,
        });

        const vector_layer: any = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [linestring_feature]
            })
        });

        const style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: (opts.fillcolor) ? opts.fillcolor : [0, 0, 0, 0.4]
            }),
            stroke: new ol.style.Stroke({
              color: (opts.strokecolor) ? opts.strokecolor : [0, 0, 0, 1],
              width: (opts.stroke) ? opts.stroke : 1
            })
        });

        linestring_feature.setStyle(style);
        this.map.addLayer(vector_layer);
        this.layers.push(vector_layer);

        return vector_layer;
    }

    public setMultiPolyLine(coords: number[][], opts: any) {
        const coordinates: any = [];

        for (let i = 0; i < coords.length; i++) {
            coordinates[i] = [];
            for (let l = 0; l < coords[i].length; l += 2) {
                coordinates[i].push(this.getCoordLatLng(coords[i][l], coords[i][l + 1]));
            }
        }

        const linestring_feature = new ol.Feature({
            geometry: new ol.geom.MultiLineString(coordinates),
            opts: opts
        });

        const vector_layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [linestring_feature]
            })
        });

        const fill = new ol.style.Fill({
            color: (opts.fillcolor) ? opts.fillcolor : [226, 139, 46, 1],
            width: 2
        });

        const stroke = new ol.style.Stroke({
          color: (opts.strokecolor) ? opts.strokecolor : [226, 139, 46, 1],
          width: 4
        });

        const style = new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 8
            }),
            fill: fill,
            stroke: stroke
        });

        vector_layer.setStyle(style);
        this.map.addLayer(vector_layer);
        this.layers.push(vector_layer);

        return vector_layer;
    }

    public getVectorRing(coords: number[][]) {
        const polygons = [];

        // Anillos interiores
        for (let i = 0; i < coords.length; i++) {
            const cor: any = [];
            for (let l = 0; l < coords[i].length; l += 2) {
                cor.push(this.getCoordLatLng(coords[i][l + 1], coords[i][l]));
            }
            polygons.push(cor);
        }

        const linestring_feature = new ol.Feature({
            geometry: new ol.geom.Polygon(polygons)
        });

        const vector_layer: any = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [linestring_feature]
            })
        });

        return vector_layer;
    }

    public clear() {
        for (let i = 0; i < this.layers.length; i++) {
            this.map.removeLayer(this.layers[i]);
        }
    }

    public fitToGeometry(extent: any) {
        this.map.getView().fit(extent, this.map.getSize());
    }

    private infowin() {
        const self = this;
        /**
        * Add a click handler to hide the popup.
        * @return {boolean} Don't follow the href.
        */
        self.infowin_layer = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            element: self.infowindow.nativeElement,
            autoPan: true,
            map: this.map,
            autoPanAnimation: {
                duration: 250
            }
        }));
    }

    public getBounds(): number[][] {
        const extent = this.map.getView().calculateExtent();
        return [
            ol.proj.transform(ol.extent.getTopLeft(extent), 'EPSG:3857', 'EPSG:4326'),
            ol.proj.transform(ol.extent.getTopRight(extent), 'EPSG:3857', 'EPSG:4326'),
            ol.proj.transform(ol.extent.getBottomRight(extent), 'EPSG:3857', 'EPSG:4326'),
            ol.proj.transform(ol.extent.getBottomLeft(extent), 'EPSG:3857', 'EPSG:4326')
        ];
    }

    public addEventListener(name: string, event: any) {
        if (typeof event === 'function') {
            this.events[name] = event;
        }
    }

    public removeEventListener(name: string) {
        if (typeof this.events[name] !== 'undefined') {
            delete this.events[name];
        }
    }
}
