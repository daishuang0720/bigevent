// 入口函数
$(function () {
    // // 1.登录表单和注册表单的切换
    // // 点击去注册按钮触发事件
    // $('#link_reg').on('click', function () {
    //     // 让登录表单隐藏
    //     $('.login-box').hide()
    //     // 让注册表单显示
    //     $('.reg-box').show()
    // })
    // // 点击去登录按钮触发事件
    // $('#link_login').on('click', function () {
    //     // 让注册表单隐藏
    //     $('.reg-box').hide()
    //     // 让登录表单显示
    //     $('.login-box').show()


    // 或者用并级选择器来写,通过切换方法.toggle()来实现功能
    $('#link_reg,#link_login').on('click', function () {
        $('.login-box,.reg-box').toggle()
    })

    // 2.自定义校验表单的验证规则
    layui.form.verify({
        // pwd规则的名称
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须为6到12位,不能有空格'
        ],
        // 自定义校验确认密码框
        repwd: function (value, item) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '输入密码必须一致'
            }
        }
    })

    // 3.注册功能
    // 给注册表单添加submit监听事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 收集表单数据
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim()
        }
        // console.log(data);
        // 发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                // 判断注册是否成功
                if (res.status != 0) {
                    // return '注册失败!'
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('注册用户成功', { icon: 6 }, function () {
                    // 触发去登录按钮的单击事件
                    $('#link_login').click()
                })

            }
        })
    })

    // 4.登录功能
    // 给登录表单添加监听submit事件
    $('#form_login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 收集表单数据
        var data = $(this).serialize()
        // console.log(data);
        // 发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                console.log(res);
                // 判断注册是否成功
                if (res.status !== 0) {
                    // return '注册失败!'
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    // 把token保存到本地存储,token是凭据的意思,后面个人中心调用接口都需要有凭据权限才可以调用
                    localStorage.setItem('token', res.token)
                    // 跳转到后台首页index.html
                    location.herf = '/index.html'
                })
            }
        })
    })
})