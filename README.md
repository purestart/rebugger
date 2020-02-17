## 项目说明

> rebugger-embed: 埋点项目

    可以收集系统捕获异常和手动上报数据、其中异常包括 unCaught 自动捕获js异常、接口异常、静态资源加载异常、httpError 请求异常

    unhandledRejection 未处理promise异常 handledRejection 已处理promise异常 caught 手动上报异常 warn 手动上报警告信息 
    
    info 手动上报日志信息

> rebugger-service: 接口服务项目

    所用技术 koa2 + typescript + mysql + redis + sequelize + jwt + pm2 + memory-cache(本地缓存和redis可以随时切换)

> rebugger-admin:  控制台项目

    vue2 + vuex + vue-router + element-ui + echarts 等技术

> rebugger-schedule: 定时任务项目 用于报表统计等任务开发

    待补充、可用于用于分析、浏览器设备占比分析、地区分析、操作系统分析、屏幕大小占比分析、等前端决策性数据

该项目为本人业余时间从0开始纯手写项目、项目已在公司多项目中实践，已收集百万异常数据和日志数据，为多项目提前发现大量异常点，保证了项目的稳定和质量

## 埋点接入

> 静态文件脚本引入

```
// 获取城市信息 必须引入
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
// 埋点引入
<script id="rebugger" useCustomField="true" silentDev="false" reportMode="onError" apikey="API-KEY"
 src="/static/js/front_rebugger.min.js" crossorigin="anonymous"></script>
```
> 动态引入

```
// 获取城市信息 必须引入
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
// 动态埋点引入
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
| silentVideo  | Boolean | 选填默认false, 是否开启视频录制, 异常场景还原, 该功能待开发,  |

> 其它配置属性

| params  | Type    | Description                                 |
| ------- | ------  | ------------------------------------------  |
| reportNum      | Number  | 选填默认10, byNum上传模式满n个上传数据，缓解服务端压力      |
| limitNum      | Number  | 选填默认20, byDay上传模式默认超过20个会主动上传数据    |
| baseUrl      | String  | 选填默认http://localhost:9090,定义上报服务器地址   |
| customField      | Object  | 选填和埋点属性同一个属性, 自定义保存字段 数据将会保存在metaData里面 origin: localStorage / sessionStorage / window / cookie 不能获取跨域信息 需要将js文件下载    |

    <script id="rebugger" useCustomField="true" silentDev="false" reportMode="onError" apikey="API-KEY" src="/static/js/rebugger_logger.min.js"></script>
    // 定义属性配置
    <script>
        if(Rebugger){
            // 配置自定义上报字段 这些字段将会以JSON字符串的形式保存在metaDta字段里
            Rebugger.default.options.customField = {
                userName: {
                    origin: "localStorage",
                    paths: "user.userName"
                },
                userId: {
                    origin: "localStorage",
                    paths: "user.id"
                }
            }
            Rebugger.default.options.baseUrl = "http://xxx...";
        }
    </script>

## 上报接口

> 代码中主动上报 使用全局Rebugger对象

```
    // 使用日志对象时必须先判断该对象是否存在
    if ( Rebugger ) {
        ...
        Rebugger.default.上报方法(上报信息对象);
    }
    // 安全使用 添加try catch
    try {
        if ( Rebugger ) {
        ...
        Rebugger.default.上报方法(上报信息对象);
        }
    } catch (error) {
        
    }
```

> 1、日志收集

      Rebugger.default.reportInfo(errorInfo);

> 2、警告信息

     Rebugger.default.reportWarning(errorInfo);

> 3、http请求异常

    Rebugger.default.reportHttpError(errorInfo);

> 4、js异常收集

    Rebugger.default.reportError(errorInfo);

> 5、promise异常上报

    Rebugger.default.reportHandledRejection(errorInfo);

> errorInfo 字段信息对照

```
  // 异常字段
  ReportFieldV = {
    日志名称: "name",
    异常信息: "message",
    异常堆栈: "stack",
    异常文件: "fileName",
    所在文件行: "lineNumber",
    所在文件列: "columnNumber",
    其它信息: "metaData",
    异常组件: "componentName",
    组件参数: "propsData",
    资源接口地址: "src",
    状态码: "status",
    状态内容: "statusText",
  }
```

## 安装部署

> rebugger-embed

        打包埋点文件 npm run build:em

> rebugger-admin

        npm install
        npm run dev
        npm run build

> rebugger-service 和 rebugger-schedule

        npm run serve 开始调试模式
        部署模式需要环境全局安装pm2
        npm install -g pm2 // 安装pm2
        npm run restart:dev // 部署到开发环境
        npm run restart:test // 部署到测试环境
        npm run restart:prod // 部署到生产环境



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
