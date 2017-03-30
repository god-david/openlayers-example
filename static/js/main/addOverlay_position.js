// ************************************
var pos = ol.proj.fromLonLat([31731.04969870986,-32960.52783737421]);

// Vienna marker
var marker = new ol.Overlay({
  position: pos,
  positioning: 'center-center',
  element: document.getElementById('marker'),
  stopEvent: false
});
map.addOverlay(marker);

// var vienna = new ol.Overlay({
//         position: pos,
//         element: document.getElementById('vienna')
//       });
//
//       map.addOverlay(vienna);


//  ###点击显示注释
// Popup showing the position the user clicked

// var popup = new ol.Overlay({
//   element: document.getElementById('popup')
// });
// map.addOverlay(popup);




// map.on('click', function(evt) {
//   console.log('evt', evt);
//   var element = popup.getElement();
//   var coordinate = evt.coordinate;
//   // var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
//   //     coordinate, 'EPSG:3857', 'EPSG:4326'));
//
//   $(element).popover('destroy');
//   popup.setPosition(coordinate);
//   // the keys are quoted to prevent renaming in ADVANCED mode.
//   $(element).popover({
//     'placement': 'top',
//     'animation': false,
//     'html': true,
//     'content': '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
//   });
//   $(element).popover('show');
// });
