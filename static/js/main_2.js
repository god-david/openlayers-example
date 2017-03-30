// ********************* 抄的一个例子 好用 start ***********************
// 地图设置中心，设置到成都，在本地离线地图 offlineMapTiles刚好有一张zoom为4的成都瓦片
// var center = [0, 0];
var center = [1024, -1024]
// console.log('center', center);
// var center = ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');
// 计算熊猫基地地图映射到地图上的范围，图片像素为 550*344，保持比例的情况下，把分辨率放大一些
// var extent = [center[0]- 1920*1000/2, center[1]-1080*1000/2, center[0]+1920*1000/2, center[1]+1080*1000/2];
var extent = [
    center[0] - 1024,
    center[1] - 1024,
    center[0] + 1024,
    center[1] + 1024
];

//创建地图
var map = new ol.Map({
    view: new ol.View({
      center: center, extent: extent, zoom: 16, minZoom: 14, maxZoom: 18
    }),
    target: 'map'
});

// 加载熊猫基地静态地图层
map.addLayer(new ol.layer.Tile({
    source: new ol.source.Zoomify({
        size: [
            2048, 2048
        ],
        // tileSize: "256",
        url: 'images/ZoomifyImageExample/', // 熊猫基地地图
        // imageExtent: extent,     // 映射到地图的范围
    })
}));
// ********************* 抄的一个例子 好用 end ***********************

// var map = new ol.Map({
//   target: 'map',
//   layers: [
//     new ol.layer.Tile({
//       source: new ol.source.Zoomify(options)
//       // url: 'images/1.jpg'
//     })
//   ],
//   view: new ol.View({
//     center: [0, 0],
//     // center: ol.proj.fromLonLat([37.41, 8.82]),
//     zoom: 3
//   })
// });

// function(a, b, c) {
//     b = t(b, c);
//     var d,
//         e;
//     if (A(a))
//         for (d = 0, e = a.length; e > d; d++)
//             b(a[d], d, a);
//         else {
//             var f = s.keys(a);
//         for (d = 0, e = f.length; e > d; d++)
//             b(a[f[d]], f[d], a)
//     }
//     return a
// }
