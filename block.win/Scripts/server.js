var host = 'http://192.168.1.3:20003/';

//判断
if (/w{3}/i.test(window.location.href)) {
    host = 'http://192.168.1.3:20003/';
} 
//创建 jquery 请求
function jqReq(type, url, params, async, successCallback, cache,api) {
    $.ajax({
        type: type,
        url: api ? host +api:host + url,
        data: params,
        async: async,
        cache: cache ? false : cache,
        success: function (rel) {
            if (rel.msg == 'UserNeedLogin') {
                var lang = $('html').attr('lang');
                window.location.href = host + lang + '/Account/Entry';
                $state.go('login');
                return;
            }
            successCallback(rel); 
        },
        complete: function () {
            $('#layoutShowLoading').fadeOut();
        },
        beforeSend: function () {
            $('#layoutShowLoading').fadeIn();
        },
        error: function (err) {
            console.log(err);
            $('#layoutShowLoading').fadeOut();
        }
    });
}

//创建 jquery 请求,无加载提示
function jqReqNoLoading(type, url, params, async, successCallback, cache, api) {
    $.ajax({
        type: type,
        url: api ? host + api : host + url,
        data: params,
        async: async,
        cache: cache ? false : cache,
        success: function (rel) {
            successCallback(rel);

        },
        complete: function () { },
        beforeSend: function () { },
        error: function (err) {
            console.log(err);
        }
    });
}

var server = {
    //获取国家地区
    getCountry: function (callback) {
        $http.get('doc/Location.json')
            .success(function (rel) {
                callback(rel);
            });
    },
    //提交注册信息
    Register: function (params, callback) {
        var api = "Account/Register";
        jqReq('post', api, params, true, callback);
    },
    //发送注册邮件
    SendRegisterEmail: function (params, callback) {
        var api = "Account/SendRegisterEmail";
        jqReq('post', api, params, true, callback);
    },
    //通过用户名查找用户是否存在
    FindByUserName: function (params, callback) {
        var api = "Account/FindByUserName";
        jqReq('post', api, params, true, callback);
    },
    //通过邮件查找邮件是否已注册
    FindByEmail: function (params, callback) {
        var api = "Account/FindByEmail";
        jqReq('post', api, params, true, callback);
    },
    //通过手机查找手机是否已注册
    FindByPhoneNumber: function (params, callback) {
        var api = "Account/FindByPhoneNumber";
        jqReq('post', api, params, true, callback);
    },
    //提交注册信息
    Register: function (params, callback) {
        var api = "Account/Register";
        jqReq('post', api, params, true, callback);
    },
    //登陆账号
    SignIn: function (params, callback) {
        var api = "Account/SignIn";
        jqReq('post', api, params, true, callback);
    },
    //发送忘记登陆密码邮件
    SendForgotPasswordEmail: function (params, callback) {
        var api = "Account/SendForgotPasswordEmail";
        jqReq('post', api, params, true, callback);
    },
    //验证邮箱验证码并修改密码
    ForgotPassword: function (params, callback) {
        var api = "Account/ForgotPassword";
        jqReq('post', api, params, true, callback);
    },
    //升级套餐(转换VC)
    TransferToVC: function (params, callback) {
        var api = "Finance/TransferToVC";
        jqReq('post', api, params, true, callback);
    },
    //BTC LTC SC VT转账给其他用户
    TransferTo: function (params, callback) {
        var api = "Finance/TransferTo";
        jqReq('post', api, params, true, callback);
    },
    //钱包转账记录查询
    TakeTransferRecord: function (params, callback) {
        var api = "Finance/TakeTransferRecord";
        jqReq('post', api, params, true, callback);
    },
    //通过用户名和币种查询地址
    QueryAddressByName: function (params, callback) {
        var api = "Finance/QueryAddressByName";
        jqReq('post', api, params, true, callback);
    },
    //查询货币是否支持转换
    ExchangeCoinValid: function (params, callback) {
        var api = "Finance/ExchangeCoinValid";
        jqReq('post', api, params, true, callback);
    },
    //获取用户余额
    GetBalance: function (params, callback) {
        var api = "Finance/GetBalance";
        jqReq('post', api, params, true, callback);
    },
    //导航栏用户信息下拉菜单
    LayoutUserInfo: function (params, callback, api) {
       // api = "LayoutPartial/LayoutUserInfo";
        jqReq('get', api, params, true, callback);
    },
    //初始化交易密码
    InitTradePassword: function (params, callback) {
        var api = "Account/InitTradePassword";
        jqReq('post', api, params, true, callback);
    },
    //兑换VC历史记录
    TakeChargeRecord: function (params, callback) {
        var api = "Finance/TakeChargeRecord";
        jqReq('post', api, params, true, callback);
    },
    //直推收益明细
    TakeGenIncome: function (params, callback) {
        var api = "Finance/TakeGenIncome";
        jqReq('post', api, params, true, callback);
    },
    //联队收益明细
    TakeAllianceIncome: function (params, callback) {
        var api = "Finance/TakeAllianceIncome";
        jqReq('post', api, params, true, callback);
    },
    //通过原始登陆密码修改登陆密码
    ChangeLoginPassword: function (params, callback) {
        var api = "Account/ChangeLoginPassword";
        jqReq('post', api, params, true, callback);
    },
    //退出登录
    Logout: function (params, callback) {
        var api = "Account/Logout";
        jqReq('post', api, params, true, callback);
    },
    //BTC,LTC,SC VT 转成其他货币
    ExchangeCoin: function (params, callback) {
        var api = "Finance/ExchangeCoin";
        jqReq('post', api, params, true, callback);
    },
    //查询BTC,LTC,SC VT转成其他货币记录
    TakeExchangeRecord: function (params, callback) {
        var api = "Finance/TakeExchangeRecord";
        jqReq('post', api, params, true, callback);
    },
    //查询数字货币单价
    MarketTicker: function (params, callback) {
        var api = "api/Market/ticker";
        jqReqNoLoading('get', api, params, true, callback);
    },
    //读取市场所有价格
    MarketTickerList: function (params, callback) {
        var api = "api/Market/list";
        jqReqNoLoading('get', api, params, true, callback);
    },
    //直推关系表
    Generation: function (params, callback) {
        var api = "RelationShip/Generation";
        jqReq('post', api, params, true, callback);
    },

    //体系关系图
    Alliance: function (params, callback) {
        var api = "RelationShip/Alliance";
        jqReq('post', api, params, true, callback);
    },
    //切换语言
    SwithLang: function (params, callback, api) {
       // var api = "Home/SwithLang";
        jqReq('get', api, params, true, callback);
    },
    //获取个人电话邮箱国家生日等
    TakeUserInfo: function (params, callback) {
        var api = "Account/TakeUserInfo";
        jqReq('post', api, params, true, callback);
    },
    //更改个人地址生日昵称logo等
    UpdateUserInfo: function (params, callback) {
        var api = "Account/UpdateUserInfo";
        jqReq('post', api, params, true, callback);
    },
    //获取用户套餐等级
    TakeUserLevelInfo: function (params, callback) {
        var api = "Account/TakeUserLevelInfo";
        jqReq('post', api, params, true, callback);
    },
    //获取谷歌验证码
    GoogleToken: function (params, callback) {
        var api = "Account/GoogleToken";
        jqReq('post', api, params, true, callback);
    },
    //上传图片
    UpdateImage: function (params, callback) {
        var api = "Image/UpdateImage";
        jqReq('post', api, params, true, callback);
    },
    //通过原始登陆密码修改登陆密码
    ChangeLoginPassword: function (params, callback) {
        var api = "Account/ChangeLoginPassword";
        jqReq('post', api, params, true, callback);
    },
    //通过原始交易密码修改交易密码
    ChangeTradePassword: function (params, callback) {
        var api = "Account/ChangeTradePassword"
        jqReq('post', api, params, true, callback);
    },
    //获取用户每年总账单
    GetYearStatistics: function (params, callback) {
        var api = "Finance/GetYearStatistics"
        jqReq('post', api, params, true, callback);
    },
    //获取用户当月月总账单
    GetMonthStatistics: function (params, callback) {
        var api = "Finance/GetMonthStatistics"
        jqReq('post', api, params, true, callback);
    },
    //获取钱包转账的接收地址
    GetReceiveAddr: function (params, callback) {
        var api = "Finance/GetReceiveAddr"
        jqReq('post', api, params, true, callback);
    },
    //检测发送地址是否合法
    validateaddress: function (params, callback) {
        var api = "Finance/validateaddress"
        jqReq('post', api, params, true, callback);
    },
    //获取用户系统日志
    GetEvent: function (params, callback) {
        var api = "Account/GetEvent"
        jqReq('post', api, params, true, callback);
    },
    //转账给其他用户
    TransferTo: function (params, callback) {
        var api = "Finance/TransferTo";
        jqReq('post', api, params, true, callback);
    },
    //添加留言
    AddFeedback: function (params, callback) {
        var api = "Account/AddFeedback"
        jqReq('post', api, params, true, callback);
    },
    //添加留言详情
    UpdateFeedbackDetail: function (params, callback) {
        var api = "Account/UpdateFeedbackDetail"
        jqReq('post', api, params, true, callback);
    },
    //提取留言目录
    TakeFeedback: function (params, callback) {
        var api = "Account/TakeFeedback"
        jqReq('post', api, params, true, callback);
    },
    //提取留言详情
    TakeFeedbackDetail: function (params, callback) {
        var api = "Account/TakeFeedbackDetail"
        jqReq('post', api, params, true, callback);
    },
    //评论留言详情
    RateFeedbackl: function (params, callback) {
        var api = "Account/RateFeedbackl"
        jqReq('post', api, params, true, callback); 
    },
    //查询货币是否支持转换
    ExchangeCoinValid: function (params, callback) {
        var api = "Finance/ExchangeCoinValid"
        jqReq('post', api, params, true, callback);
    },
    //添加留言
    AddFeedback: function (params, callback) {
        var api = "Account/AddFeedback"
        jqReq('post', api, params, true, callback);
    },
    //添加留言详情
    UpdateFeedbackDetail: function (params, callback) {
        var api = "Account/UpdateFeedbackDetail"
        jqReq('post', api, params, true, callback);
    },
    //提取留言目录
    TakeFeedback: function (params, callback) {
        var api = "Account/TakeFeedback"
        jqReq('post', api, params, true, callback);
    },
    //提取留言详情
    TakeFeedbackDetail: function (params, callback) {
        var api = "Account/TakeFeedbackDetail"
        jqReq('post', api, params, true, callback);
    },
    //评论留言详情
    RateFeedbackl: function (params, callback) {
        var api = "Account/RateFeedbackl"
        jqReq('post', api, params, true, callback);
    },
    //获取消息标题
    TakeNotifyTitle: function (params, callback) {
        var api = "News/TakeNotifyTitle"
        jqReq('post', api, params, true, callback);
    },
    //获取消息详情
    TakeNotifyDetail: function (params, callback) {
        var api = "News/TakeNotifyDetail"
        jqReq('post', api, params, true, callback);
    },
    //根据用户名获取直推关系
    GenerationByName: function (params, callback) {
        var api = "RelationShip/GenerationByName"
        jqReq('post', api, params, true, callback);
    },
    //根据用户名获取安置关系
    AllianceByName: function (params, callback) {
        var api = "RelationShip/AllianceByName"
        jqReq('post', api, params, true, callback);
    },
    //发送忘记交易密码验证码
    SendForgotTradePasswordEmail: function (params, callback) {
        var api = "Account/SendForgotTradePasswordEmail"
        jqReq('post', api, params, true, callback);
    },
    //通过邮件验证码设置交易密码
    ForgotTradePassword: function (params, callback) {
        var api = "Account/ForgotTradePassword"
        jqReq('post', api, params, true, callback);
    },
    //代数业绩详情
    GenerationAchievement: function (params, callback) {
        var api = "RelationShip/GenerationAchievement"
        jqReq('post', api, params, true, callback);
    },
    //联队业绩详情
    TeamAchievement: function (params, callback) {
        var api = "RelationShip/TeamAchievement"
        jqReq('post', api, params, true, callback);
    }
   
};