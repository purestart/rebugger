## 项目说明

> rebugger-embed: 埋点项目

    可以收集系统捕获异常和手动上报数据、其中异常包括 unCaught 自动捕获js异常、接口异常、静态资源加载异常、httpError 请求异常

    unhandledRejection 未处理promise异常 handledRejection 已处理promise异常 caught 手动上报异常 warn 手动上报警告信息 info 
    
    手动上报日志信息

> rebugger-service: 接口服务项目

    所用技术 koa2 + typescript + mysql + redis + sequelize + jwt + pm2 + memory-cache(本地缓存和redis可以随时切换)

> rebugger-admin:  控制台项目

    vue2 + vuex + vue-router + element-ui + echarts 等技术

> rebugger-schedule: 定时任务项目 用于报表统计等任务开发

    待补充、可用于用于分析、浏览器设备占比分析、地区分析、操作系统分析、屏幕大小占比分析、等前端决策性数据

该项目为本人业余时间从0开始纯手写项目、项目已在公司多项目中实践，已收集百万异常数据和日志数据，为多项目提前发现大量异常点，保证了项目的稳定和质量

## 埋点接入

> 静态文件脚本接入

```
<script id="rebugger" useCustomField="true" silentDev="false" reportMode="onError" apikey="API-KEY" src="/static/js/front_rebugger.min.js" crossorigin="anonymous"></script>
```
> 动态接入

```
<script type="text/javascript">

function loadScript(url, apikey) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.setAttribute("id", "rebugger");
    script.setAttribute("apikey", apikey);
    script.setAttribute("reportMode", "onError");
    document.body.appendChild(script);
}

loadScript("/static/js/front_rebugger.min.js", "API-KEY")
</script>
```
## 项目控制台截图

<img src="https://gitee.com/_pure/codes/dn4u2bw65zxemfklcao9i45/raw?blob_name=rebugger1.png" >

<img src="https://gitee.com/_pure/codes/dn4u2bw65zxemfklcao9i45/raw?blob_name=rebugger2.png" >

<img src="https://gitee.com/_pure/codes/dn4u2bw65zxemfklcao9i45/raw?blob_name=rebugger3.png" >

<img src="https://gitee.com/_pure/codes/dn4u2bw65zxemfklcao9i45/raw?blob_name=rebugger4.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger5.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger6.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger7.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger8.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger9.png" >

<img src="https://gitee.com/_pure/codes/ve2q9k657h0yfnlbcruij93/raw?blob_name=rebugger10.png" >

解决github图片不显示问题

解决方法，打开路径C:\Windows\System32\drivers\etc下的hosts文件 添加如下地址
```
# GitHub Start 
192.30.253.112 github.com
192.30.253.119 gist.github.com
151.101.184.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.184.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.184.133 camo.githubusercontent.com
151.101.184.133 avatars0.githubusercontent.com
151.101.184.133 avatars1.githubusercontent.com
151.101.184.133 avatars2.githubusercontent.com
151.101.184.133 avatars3.githubusercontent.com
151.101.184.133 avatars4.githubusercontent.com
151.101.184.133 avatars5.githubusercontent.com
151.101.184.133 avatars6.githubusercontent.com
151.101.184.133 avatars7.githubusercontent.com
151.101.184.133 avatars8.githubusercontent.com
```
修改hosts文件后，刷新githab页面

## 埋点属性
  埋点属性提供了apikey 、环境禁用设置、异常上传模式、自定义字段收集等配置信息
> 属性配置方式，只需要将配置script标签属性即可 例如：
```
  <script id="rebugger" useCustomField="true" silentDev="false" reportMode="onError" apikey="API-KEY" src="/static/js/front_rebugger.min.js" crossorigin="anonymous"></script>
```
> 动态接入属性配置 通过setAttribute方法配置埋点属性 例如
```
<script type="text/javascript">

function loadScript(url, apikey) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.setAttribute("id", "rebugger");
    script.setAttribute("apikey", apikey);
    script.setAttribute("reportMode", "onError");
    document.body.appendChild(script);
}

loadScript("/static/js/front_rebugger.min.js", "API-KEY")
</script>
```
> 埋点属性

| params  | Type    | Description                                 |
| ------- | ------  | ------------------------------------------  |
| id      | String  | 必填, 且值为rebugger                        |
| apikey  | String  | 必填, 用于项目区分，不同项目apikey不一样     |
| silent  | Boolean | 选填默认false, 如果为true,禁用rebugger不收集任何数据             |
| silentDev  | Boolean | 选填默认false, 如果为true,不再收集开发环境的错误             |
| silentTest  | Boolean | 选填默认false, 如果为true,不再收集测试环境的错误             |
| silentPre  | Boolean | 选填默认false, 如果为true,不再收集预发布环境的错误             |
| reportMode  | String | 选填默认onError, 异常上传模式 onError 立即上传 byNum 按天存储满多少个上传 byDay 按天上传 onErrorOffline 立即上报且支持线下缓存             |
| useCustomField  | Boolean | 选填默认false, 是否收集自定义字段，保存在metaData里面     |
| customField  | Object | 选填, 通过埋点设置必须是json字符串建议在埋点后script标签里面定义，配置的数据将被保存在metaData字段里面     |

## 上报接口

## 安装部署

## Changelog

### 2019.07.18

> v0.0.1 \* 初始化项目

### 2019.08.01

> v0.0.1 \* rebugger-embed 开发完成

### 2019.08.12

> v0.0.1 \* rebugger-server 和 rebugger-admin 开发完成

### 2019.08.20

> v0.0.1 \* 项目开始应用于生产

### 2019.10.15

> v0.0.2 \* 更新异常上传方式和rebugger-schedule

### 2019.12.15

> v0.1.1 \* 开始迁移到github,开源此项目

### 2020.2.9

> v0.1.3 \* 拆分项目

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
