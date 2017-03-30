//  例子抄自 http://openlayers.org/en/latest/apidoc/ol.interaction.Select.html
var selectedF;
var geometry;
var select = null;  // ref to currently selected interaction

// Popup showing the position the user clicked
var popup = new ol.Overlay({
  element: document.getElementById('popup')
});
map.addOverlay(popup);

// select interaction working on "click"
// var selectClick = new ol.interaction.Select({
//   condition: ol.events.condition.click
// });

var selectClick = new ol.interaction.Select({});

var selectElement = document.getElementById('select-type');

var changeInteraction = function() {
  if (select !== null) {
    map.removeInteraction(select);
  }
  var value = selectElement.value;
  if (value == 'click') {
    select = selectClick;
  } else {
    select = null;
  }
  if (select !== null) {
    map.addInteraction(select);
    select.on('select', function(e) {

      // 这一段是用来说明有几个元素被选取，有几个元素失去选取
      document.getElementById('status').innerHTML = '&nbsp;' +
          e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' + e.selected.length +
          ' and deselected ' + e.deselected.length + ' features)';


          if (e.selected.length == 1) {
            // 被选中的 feature 个数为 1 的时候
            // 显示地图上的坐标
            var element = popup.getElement();
            var coordinate = e.mapBrowserEvent.coordinate;

            // console.log('e.target', e.target);
            // e.target 是一个 ol.interaction.Select 对象
            // 使用 getFeatures 方法可以获得一个 ol.Collection

            // selectedFeature = e.target.getFeatures().array_[0]
            var selectedFeatures = e.target.getFeatures().getArray()
            var selectedF = selectedFeatures[0] // 表示第一个被选中的 feature
            console.log('selectedF', selectedF);

            var geometry = selectedF.getGeometry() // 得到被选中元素的几何结构
            console.log('selectedF geometry', geometry);

            var type = geometry.getType()
            console.log('geometry type', type);
            switch (type) {
              case 'Point':
                var coordinates = geometry.getCoordinates()
                console.log('selectedF geometry coordinates', coordinates);

                break;
              case 'LineString':
                var coordinates = geometry.getCoordinates()
                console.log('selectedF geometry coordinates', coordinates);

                break;
              case 'Polygon':
                var coordinates = geometry.getCoordinates()
                console.log('selectedF geometry coordinates', coordinates);

                break;
              case 'Circle':
                var center = geometry.getCenter()
                var radius = geometry.getRadius()
                console.log('center radius', center, radius);
                break;
              default:

            }
            // console.log('selectedF geometry getProperties', coordinates);
            // console.log('selectedF geometry getLayout', geometry.getLayout());

            // console.log('e.selected[0].getGeometry().extent_', e.selected[0].getGeometry().extent_);
            // var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
            //     coordinate, 'EPSG:3857', 'EPSG:4326'));

            $(element).popover('destroy');
            popup.setPosition(coordinate);
            // the keys are quoted to prevent renaming in ADVANCED mode.
            $(element).popover({
              'placement': 'top',
              'animation': false,
              'html': true,
              'content': '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
            });
            $(element).popover('show');



            // console.log('featureOverlay.getSource().getFeatures()', featureOverlay.getSource().getFeatures());


          } else {
            // console.log('1111111111111');
            var element = popup.getElement();
            $(element).popover('destroy');
          }

    });
  }
};


/**
 * onchange callback on the select element.
 */
selectElement.onchange = changeInteraction;
changeInteraction();




// 从另一个地方抄的例子  http://anzhihun.coding.me/ol3-primer/ch09/09-03.html

// var selectSingleClick = new ol.interaction.Select({});
//  map.addInteraction(selectSingleClick);
//  // 监听选中事件，然后在事件处理函数中改变被选中的`feature`的样式
//  selectSingleClick.on('select', function(event){
//    console.log('11111111111111');
//     //  event.selected[0].setStyle(new ol.style.Style({
//     //      image: new ol.style.Circle({
//     //          radius: 10,
//     //          fill: new ol.style.Fill({
//     //              color: 'blue'
//     //          })
//     //      })
//     //  }));
//  })
