// 入口函数
$(function () {
    // alert('ok')
    // 1.获取用户的基本信息
    getUserInfo()

    // 2.退出登录功能
    $('#logout').on('click', function () {
        // console.log('ok');
        layui.layer.confirm('您确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = '/login.html'
            // 关闭弹窗
            layer.close(index);
        });
    })
})

// 把获取用户信息和渲染用户信息的函数,放入到函数的外面
// 把全局函数和都是window对象的方法
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);  res是服务器响应回来的数据
            // 判断是否获取成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户信息
            renderAvatar(res.data)
        },
        // // complete不管请求成功还是失败,都会调用这个函数
        // complete: function (res) {
        //     // console.log(res);   这里的res是ajax的对象
        //     // res.responseJSON是服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清除token
        //         localStorage.removeItem('token')
        //         // 跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }

    })
}
function renderAvatar(user) {
    // console.log(user);
    // 获取用户的名称(有nickname就用nickname,没有就用username)
    var name = user.nickname || user.username
    // 渲染欢迎语
    $('#welcome').html('欢迎  ' + name)

    // 渲染头像(有图片头像则渲染,没有则渲染文字头像)
    if (user.user_pic !== null) {
        // 渲染图片头像,隐藏文字头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像,隐藏图片头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}