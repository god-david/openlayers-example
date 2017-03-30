
var features = new ol.Collection();
var featuresSource = new ol.source.Vector({features: features})
// console.log('features', features);
var featureOverlay = new ol.layer.Vector({
  source: featuresSource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
      // 白色 透明度 0.2
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      // 黄色
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      // 半径 7
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
featureOverlay.setMap(map);

// ****************监听地图上的 feature 数量
var listenerKey = featuresSource.on('change', function(){
    if (featuresSource.getState() === 'ready') {    // 判定是否加载完成
        document.getElementById('count').innerHTML = featureOverlay.getSource().getFeatures().length;
        // featureOverlay.getSource().unByKey(listenerKey); // 注销监听器
        // console.log('featuresSource.getFeatures()', featuresSource.getFeatures());
    }
});



// ***************** modify section **yi************************
// var modify = new ol.interaction.Modify({
//   features: features,
//   // the SHIFT key must be pressed to delete vertices, so
//   // that new vertices can be drawn at the same position
//   // of existing vertices
//   deleteCondition: function(event) {
//     return ol.events.condition.shiftKeyOnly(event) &&
//         ol.events.condition.singleClick(event);
//   }
// });
// map.addInteraction(modify);

var draw; // global so we can remove it later
var drawTypeSelect = document.getElementById('draw-type');

function addInteraction() {
  let value = drawTypeSelect.value
  console.log('value', value);
  if (value != 'None') {
    draw = new ol.interaction.Draw({
      features: features,
      type: /** @type {ol.geom.GeometryType} */ (drawTypeSelect.value)
    });
    map.addInteraction(draw);

    // 注册事件，判断是否画完，画完则触发响应函数
    draw.on('drawend', function(event) {
      console.log('drawend event', event);
      drawendEvent(event)
    })
  }
}


var drawendEvent = function(event) {
  // 先取得画出来的这个 feature
  var drawendFeature = event.feature
  console.log('drawendFeature', drawendFeature);
  // 取得这个 feature 的各项参数
  getFeaturesParameters(drawendFeature)
  var mousePosition = document.querySelector('.ol-mouse-position').innerText
  mousePosition = mousePosition.split(",")
  console.log('mousePosition', mousePosition);
  setmessage(mousePosition)
}


var getFeaturesParameters = function(feature) {
  var geometry = feature.getGeometry() // 得到被选中元素的几何结构
  console.log('selectedF geometry', geometry);
  // 得到 feature 的类型
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
}

var message = new ol.Overlay({
  element: document.getElementById('message')
});
map.addOverlay(message);

var setmessage = function(coordinate) {
  var $element = $('#message')
  $element.popover('destroy');
  message.setPosition(coordinate);
  // the keys are quoted to prevent renaming in ADVANCED mode.
  $element.popover({
    'placement': 'top',
    'animation': false,
    'html': true,
    'content': `<p>
      id: <input id="message-id" type="text" name="" value="">
      message: <input id="message-message" type="text" name="" value="">
      <button id="commit-message" type="button" name="button">保存</button>
    </p>`
  });
  $element.popover('show');
  $('#commit-message').one("click", function(){
    $element.popover('destroy');

  });
}






/**
 * Handle change event.
 */
drawTypeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();


// 在地图上添加一个圆
 var circle2 = new ol.Feature({
     geometry: new ol.geom.Point([66467.43255275112,-39534.11226989])
 })
 // 此处不再为feature设置style
 featuresSource.addFeature(circle2);







// var bindEvent = function() {
//   let openA = document.querySelector('#openAddInteraction')
//   let closeA = document.querySelector('#closeAddInteraction')
//   openA.addEventListener('click', function() {
//     addInteraction();
//
//   })
//   closeA.addEventListener('click', function() {
//     map.removeInteraction(draw);
//   })
// }
// bindEvent()
// ************************************
