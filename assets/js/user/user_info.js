// 入口函数
$(function () {
    // alert('ok')
    // 1.获取用户的信息,把它展示到表单中
    // 获取用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            mthod: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // 获取用户信息失败
                    // 弹出对话框,获取用户信息失败
                    layui.layer.msg(res.message, { icon: 5 })
                }
                // 此时获取用户信息成功,把用户信息展示到表单中
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)

                // 快速给所有的表单项赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    // 2.重置表单信息
    // 效果:重新把用户信息展示到表单中
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为(重置按钮的默认行为是清空表单项)
        e.preventDefault()
        // 重新获取用户信息,重新赋值,再次调用获取用户信息的方法
        initUserInfo()
    })

    // 自定义一个验证昵称的长度的规则
    layui.form.verify({
        nickname: function (value, item) {
            // value是昵称的值
            // console.log(value);
            if (value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })
    // 3.完成用户信息的修改功能
    $('.layui-form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        var data = $(this).serialize()
        // console.log(data);
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })

                window.parent.getUserInfo()
            }
        })
    })
})