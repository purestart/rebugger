## 项目说明

> rebugger-embed: 埋点项目

> rebugger-service: 接口服务项目

> rebugger-admin:  控制台项目

> rebugger-schedule: 定时任务项目 用于报表统计等任务开发

项目已在公司多项目中实践，已收集百万异常数据和日志数据

## 埋点接入

> 静态文件脚本接入

```
<script id="rebugger" useCustomField="true" silentDev="false" reportMode="onError" apikey="9638ef8d-4f4d-4c31-b952-d9947f7054b1" src="/static/js/front_rebugger.min.js" crossorigin="anonymous"></script>
```
> 动态接入

```
<script type="text/javascript">

function loadScript(url, apikey) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.setAttribute("id", "rebugger");
    script.setAttribute("id", "rebugger");
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

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
