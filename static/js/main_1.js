
// ********************* 强行修改源码进行瓦片加载 好用 start ***********************
// var center = [0, 0];
var center = [91000, -61000];

// 图片要放大，才能显示得看得见
var imgSize = [46000*1000, 32914*1000]
// var center = [imgSize[0]/2, -imgSize[1]/2]

// console.log('center', center);
// var center = ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');
var extent = [0, -imgSize[1], imgSize[0], 0];
// var extent = [center[0]- 1024, center[1]-1024, center[0]+1024, center[1]+1024];

//创建地图
var map = new ol.Map({
    view: new ol.View({
        center: center,
        extent: extent,
        zoom: 10,
        minZoom: 8,
        maxZoom: 15
    }),
    target: 'map'
});

// 设置 sourse 的 URL 加载方式
var zoomifySourse = new ol.source.Zoomify({
    size: imgSize,
    // tierSizeCalculation: 'truncated',
    // tilePixelRatio: 2,
    url: 'images/c/CMU-1_files/{z}/{x}_{y}.jpeg',
});
// 这个好像是设置 url 的函数
// zoomifySourse.setTileUrlFunction(function(zoomifySourse) {
//     return a1.url.replace("{z}", zoomifySourse[0].toString()).replace("{x}", zoomifySourse[1].toString()).replace("{y}", (-zoomifySourse[2] - 1).toString())
// });

// 加载图层
map.addLayer(new ol.layer.Tile({
    source: zoomifySourse,
}));
// ********************* 瓦片加载 完成 end ***********************
