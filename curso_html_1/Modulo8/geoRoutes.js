var map,
    lat, lng,
    latPrev, lngPrev;

$(function() {

    function enlazarMarcador(e) {
        latPrev = lat;
        lngPrev = lng;
        lat = e.latLng.lat();
        lng = e.latLng.lng();

        map.drawRoute({
            origin: [latPrev, lngPrev],
            destination: [lat, lng],
            travelMode: 'driving',
            strokeColor: '#000000',
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        map.addMarker({ lat: lat, lng: lng});
    }

    function geolocalizar() {
        GMaps.geolocate({
            success: function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                map = new GMaps({
                    el: '#map',
                    lat: lat,
                    lng: lng,
                    click: enlazarMarcador,
                    tap: enlazarMarcador
                });
                map.addMarker({ lat: lat, lng: lng});
            },
            error: function(error) {
                alert('Geolocalización falla: '+error.message);
            },
            not_supported: function() {
                alert("Su navegador no soporta geolocalización");
            }
        });
    }

    geolocalizar();
});