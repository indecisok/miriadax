var map,
    latIni, lngIni,
    latLast, lngLast;

$(function() {
    $.mobile.loading( 'show', {
            text: "Obteniendo localización...",
            textVisible: true,
            theme: 'A',
            textonly: false,
            html: ""
    });

    function enlazar(lat0, lng0, lat1, lng1) {
        //var mode = $('input:radio[name=travelMode]:checked').val();
        var mode = $('#travelMode').val();

        map.drawRoute({
            origin: [lat0, lng0],
            destination: [lat1, lng1],
            travelMode: mode,
            strokeColor: '#000000',
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        latLast = lat1;
        lngLast = lng1;

        map.addMarker({ lat: latLast, lng: lngLast});
    }

    function enlazarMarcador(e) {
        enlazar(latLast, lngLast, e.latLng.lat(), e.latLng.lng());
    }

    function geolocalizar() {
        GMaps.geolocate({
            success: function(position) {
                latIni = position.coords.latitude;
                lngIni = position.coords.longitude;
                latLast = latIni;
                lngLast = lngIni;
                map = new GMaps({
                    el: '#map',
                    lat: latIni,
                    lng: lngIni,
                    title: 'Salida',
                    click: enlazarMarcador,
                    tap: enlazarMarcador
                });
                $.mobile.loading( "hide" );
                map.addMarker({lat: latIni, lng: lngIni});
            },
            error: function(error) {
                $.mobile.loading( "hide" );
                alert('Geolocalización falla: '+error.message);
            },
            not_supported: function() {
                $.mobile.loading( "hide" );
                alert("Su navegador no soporta geolocalización");
            }
        });
    }

    function compactar() {
        map.cleanRoute();
        map.removeMarkers();

        map.addMarker({ lat: latIni, lng: lngIni});
        enlazar(latIni, lngIni, latLast, lngLast);
    }

    function limpiar() {
        map.cleanRoute();
        map.removeMarkers();

        latLast = latIni;
        lngLast = lngIni;
        map.addMarker({ lat: latIni, lng: lngIni});
    }

    $("#compactar").on('click', compactar);
    $("#limpiar").on('click', limpiar);

    geolocalizar();
});
