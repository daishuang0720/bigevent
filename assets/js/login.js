// 入口函数
$(function () {

    // alert('ok')
    /**** 1-登录表单和注册表单切换 ****/
    // 单击“去注册”
    // $('#link_reg').on('click', function() {
    //     // 注册表单显示
    //     $('.reg-box').show()
    //     // 登录表单隐藏
    //     $('.login-box').hide()
    // })
    // // 单击“去登录”
    // $('#link_login').on('click', function() {
    //     // 注册表单隐藏
    //     $('.reg-box').hide()
    //     // 登录表单显示
    //     $('.login-box').show()
    // })
    $('#link_reg,#link_login').on('click', function () {
        $('.reg-box,.login-box').toggle()
    })
    /**** 2-自定义表单校验规则 ****/
    layui.form.verify({
        // pwd 规则的名称
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        repwd: function (value, item) {
            console.log(item);
            // value 哪个表单项使用了这个规则，vlaue是表单项的值
            // value就是确认密码框的值
            // 获取密码框的值
            var pwd = $('#form_reg [name=password]').val()
            // 判断密码和确定密码是否一致
            if (pwd !== value) {
                return '两次密码必须一致'
            }
        }
    })

    /**** 3-注册功能 ****/
    // (1)给注册表单监听submit事件
    $('#form_reg').on('submit', function (e) {
        console.log(1111);
        // (2)阻止默认提交行为
        e.preventDefault()
        // (3)收集表单数据
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim()
        }
        // console.log(data)
        // (4)发送ajax请求
        $.ajax({
            // type:'post'
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                console.log(res)
                // (5)判断是否成功
                if (res.status !== 0) {
                    // return alert('注册失败')
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('注册用户成功', { icon: 6 }, function () {
                    // 弹窗关闭后执行的回调函数
                    // 触发“去登录”按钮的单击事件
                    $('#link_login').click()
                })

            }
        })
    })
    /**** 4-登录功能 ****/
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        // console.log(data)
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    // 把token保存到本地存储
                    localStorage.setItem('token', res.token)
                    // 跳转到后台首页index.html
                    location.href = '/index.html'
                })
            }
        })
    })
})