$(function() {

    var baseLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Data from <a href="http://www.veloh.lu">veloh.lu</a> Made by <a href="https://mona.lu">Thierry</a> Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }
    );

    var heatmapLayer = L.TileLayer.heatMap({
        radius: 40,
        opacity: 0.7,
        gradient: {
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"
        }
    });

    loadData( heatmapLayer );

    setInterval(function() {

      loadData( heatmapLayer )

    }, 60000);

    var overlayMaps = {
        'Veloh Heatmap': heatmapLayer
    };

    var controls = L.control.layers(null, overlayMaps, {collapsed: false});

    var map = new L.Map('heatmapArea', {
        center: new L.LatLng(49.6096, 6.129),
        zoom: 13,
        layers: [baseLayer, heatmapLayer]
    });

    controls.addTo(map);

});

function loadData(heatmapLayer) {

    var request = $.ajax({
        type: 'get',
        url: 'getData.php',
        dataType: 'json',
        success: function(data) {

            heatmapLayer.addData( data );
            heatmapLayer.bringToFront();
            heatmapLayer.redraw();

        }
    });

}