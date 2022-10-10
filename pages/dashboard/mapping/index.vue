<template>
     <v-container fluid fill-height id="mapContainer">
        
     </v-container>
</template>
<style scoped>
@import url('https://js.arcgis.com/4.2/esri/css/main.css');
#mapContainer {
  height: 90vh;
  width: 100%;
}
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
<script>
import { loadModules } from 'esri-loader';

export default {
    auth: false,

    data() {
        return {
            apiKey: process.env.gisApiKey,
            mapKey: process.env.webmapKey
        }
    },

    mounted() {

        loadModules(["esri/config", 'esri/views/MapView', 'esri/WebMap', 'esri/widgets/Search', 'esri/layers/FeatureLayer', 'esri/Graphic', 'esri/layers/GraphicsLayer'])
        .then(([esriConfig, MapView, WebMap, Search, FeatureLayer, Graphic, GraphicsLayer]) => {
            // then we load a web map from an id
            esriConfig.apiKey = this.apiKey;
            const graphicsLayer = new GraphicsLayer();

            var webmap = new WebMap({
                portalItem: { // autocasts as new PortalItem()
                    id: this.mapKey
                },
                layers: [graphicsLayer]
            });
            webmap.add(graphicsLayer)
            // and we show that map in a container w/ id #viewDiv
            var view = new MapView({
                map: webmap,
                container: "mapContainer",
                zoom: 14,
                layers: [graphicsLayer]
            });

            const search = new Search({
                view
            })

            const point = { //Create a point
                type: "point1",
                longitude: -6.949786,
                latitude: 107.635173
            };
            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            graphicsLayer.add(pointGraphic);

            view.when(() => {
            })
            view.ui.add(search, "top-right")
            

            view.when(() => { console.log('view ready'); })
        })
        .catch(err => {
            // handle any errors
            console.error(err);
        });
    },

}
</script>