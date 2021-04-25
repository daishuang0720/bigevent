// ajax的预处理函数
$.ajaxPrefilter(function (options) {
    // 统一设置请求的url地址，根路径
    // options.url = '根地址' + options.url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 如果请求的url地址是有权限的接口，设置请求头
    // url中包含了/my/说明就是有权限的接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // complete不管请求成功还是失败,都会调用这个函数
    options.complete = function (res) {
        // console.log(res);   这里的res是ajax的对象
        // res.responseJSON是服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = '/login.html'
        }
    }
})