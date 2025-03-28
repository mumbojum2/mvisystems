(function( $ ) {

    /**
     * initMap
     *
     * Renders a Google Map onto the selected jQuery element
     *
     * @date    22/10/19
     * @since   5.8.6
     *
     * @param   jQuery $el The jQuery element.
     * @return  object The map instance.
     */
    var infoWindows = [];
    function initMap( $el ) {
    
        // Find marker elements within map.
        var $markers = $el.find('.marker');

        var default_zoom = $el.data('zoom') || 12;
    
        // Create gerenic map.
        var mapArgs = {
            zoom        : default_zoom,
            mapTypeId   : google.maps.MapTypeId.ROADMAP,
            styles       : [
              {
                  "featureType": "all",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "saturation": 36
                      },
                      {
                          "color": "#333333"
                      },
                      {
                          "lightness": 40
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 16
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#fefefe"
                      },
                      {
                          "lightness": 20
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#fefefe"
                      },
                      {
                          "lightness": 17
                      },
                      {
                          "weight": 1.2
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#f5f5f5"
                      },
                      {
                          "lightness": 20
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#f5f5f5"
                      },
                      {
                          "lightness": 21
                      }
                  ]
              },
              {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#dedede"
                      },
                      {
                          "lightness": 21
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 29
                      },
                      {
                          "weight": 0.2
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 18
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 16
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#f2f2f2"
                      },
                      {
                          "lightness": 19
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#e9e9e9"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              }
          ]
          
            // maxZoom     : default_zoom + 2, // limit how far in the map can be zoomed
        };
        var map = new google.maps.Map( $el[0], mapArgs );
    
        // Add markers.
        map.markers = [];
        $markers.each(function(){
            initMarker( $(this), map );
        });
    
        // Center map based on markers.
        centerMap( map, default_zoom );
    
        // Return map instance.
        return map;
    }
    
    /**
     * initMarker
     *
     * Creates a marker for the given jQuery element and map.
     *
     * @date    22/10/19
     * @since   5.8.6
     *
     * @param   jQuery $el The jQuery element.
     * @param   object The map instance.
     * @return  object The marker instance.
     */
    function initMarker( $marker, map ) {
    
        // Get position from marker.
        var lat = $marker.data('lat');
        var lng = $marker.data('lng');
        var latLng = {
            lat: parseFloat( lat ),
            lng: parseFloat( lng )
        };
    
        // Create marker instance.
        var marker = new google.maps.Marker({
            position : latLng,
            map: map,
            icon: '/wp-content/uploads/2023/01/Ellipse-603.png',
        });
    
        // Append to reference for later use.
        map.markers.push( marker );
    
        // If marker contains HTML, add it to an infoWindow.
        if( $marker.html() ){
    
            if ( $marker.hasClass('dealers-marker') ) {
                // Create info window.
                var infowindow = new google.maps.InfoWindow({
                    content: $marker.html()
                });

                infoWindows.push(infowindow);
        
                // Show info window when marker is clicked.
                google.maps.event.addListener(marker, 'click', function() {
                    // clear all infoWindows
			        closeAllInfoWindows();
                    infowindow.open( map, marker );
                });
            }
        }
    }
    
    /**
     * centerMap
     *
     * Centers the map showing all markers in view.
     *
     * @date    22/10/19
     * @since   5.8.6
     *
     * @param   object The map instance.
     * @return  void
     */
    function centerMap( map, default_zoom ) {
        // lat/lng for Manhattan
        var lat = '40.8431';
        var lng = '-73.6512';

        if ( map.markers.length > 1) {
            lat = '37.0902';
            lng = '-95.7129';
            default_zoom = 5;
            
            if ( window.innerWidth < 768 ) {
                default_zoom = 3;
            }
        }

        map.setZoom(default_zoom);
        map.setCenter(new google.maps.LatLng(lat, lng));
    }

    // Close all marker info boxes
    function closeAllInfoWindows() {
        for (var i=0;i<infoWindows.length;i++) {
        infoWindows[i].close();
        }
    }
    
    // Render maps on page load.
    $(function(){
        $('.acf-map').each(function(){
            var map = initMap( $(this) );
        });
    });
    
})(jQuery);