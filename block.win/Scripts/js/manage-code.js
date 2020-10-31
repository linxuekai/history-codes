var host = 'http://192.168.1.3:20003/';

//判断
if (/w{3}/i.test(window.location.href)) {
    host = 'http://192.168.1.3:20003/';
} 

function jqReq(type, url, params, async, successCallback, cache, api) {
    $.ajax({
        type: type,
        url: api ? host + api : host + url,
        data: params,
        async: async,
        cache: cache ? false : cache,
        success: function (rel) {
            if (rel.msg == 'UserNeedLogin') {
                var lang = $('html').attr('lang');
                window.location.href = host + lang + '/manage/console';
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
            window.location.href='/manage/console';
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

var errorCodeM = {
    "Default": "操作失败",
    "Success": "操作成功",
    "InviterNotFound": "未找到推荐人",
    "Failed": "操作失败",
    "UserNotExists": "用户不存在",
    "PhraseFaild": "密码错误",
    "InvalidAddress": "无效的地址",
    "SetFeeFaild": "设置的手续费异常",
    "BanlanceNotEnough": "钱包余额不足",
    "UnlockWalletFaild": "解锁钱包失败",
    "ServerError":'服务器错误，获取数据失败'
}
function showTips(text) {
	$('#showTips').fadeIn();
	$('#showTipsMsg').text(text);
	setTimeout(function () {
		$('#showTips').fadeOut();
	}, 1500);
}
function getToken() {
	return $("input[name='__RequestVerificationToken']").val();
}
function getDescriptM(key) {
    if (errorCodeM != null && errorCodeM[key] != null) {
        return errorCodeM[key];
    } else {
        return errorCodeM["Default"];
    }
}
var RegArray = {
	Require: /.+/,
	Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
	Mobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
	Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	Currency: /^\d+(\.\d+)?$/,
	Number: /^\d+$/,
	Float: /^[0-9]+(.[0-9]{1,5})?$/,
	Zip: /^[1-9]\d{5}$/,
	QQ: /^[1-9]\d{4,8}$/,
	Integer: /^[-\+]?\d+$/,
	Double: /^[-\+]?\d+(\.\d+)?$/,
	English: /^[A-Za-z]+$/,
	Chinese: /^[\u0391-\uFFE5]+$/,
	Username: /^[a-z]\w{3,}$/i,
	Password: /^[\@A-Za-z0-9\!_\#\$\%\^\&\*\.\~]{8,22}$/,
	UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	Ip: /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/,
	IDCard: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
};
var coinType = [
	{ coin: 'BTC', value: 0 },
	{ coin: 'LTC', value: 1 },
	{ coin: 'ETH', value: 2 },
	{ coin: 'VTC', value: 3 },
	{ coin: 'ETC', value: 4 },
	{ coin: 'SC', value: 5 },
	{ coin: 'VC', value: 6 },
	{ coin: 'VS', value: 7 },
	{ coin: 'VT', value: 8 },
	{ coin: 'VTS', value: 9 }
];
var exchangeCoin = [
	{ coin: 'BTC', value: 0 },
	{ coin: 'LTC', value: 1 },
	{ coin: 'SC', value: 5 },
	{ coin: 'VS', value: 7 },
	{ coin: 'VT', value: 8 }
];
var destCoinType = [
	{ coin: 'BTC', value: 0 },
	{ coin: 'LTC', value: 1 },
	{ coin: 'SC', value: 5 },
	{ coin: 'VC', value: 6 },
	{ coin: 'VS', value: 7 },
	{ coin: 'VT', value: 8 }
];
var Lang = [
	{ lang: '中文', value: "zh-CN", icon: '/images/Img/chnai.png' },
	{ lang: 'Englist', value: 'en-US', icon: '/images/Img/america.png' },
	{ lang: 'ID', value: 'id-ID', icon: '/images/Img/id.png' },
]
var server = {
    //请求后台订单数据
    QueryUnConfirmSendOut: function (params, callback) {
        var api = "Console/QueryUnConfirmSendOut"
        jqReqNoLoading('post', api, params, true, callback);
    },
    //处理后台订单
    ConfirmSendOut: function (params, callback) {
        var api = "Console/ConfirmSendOut"
        jqReq('post', api, params, true, callback);
    },
    //请求后台首页数据
    TaskSummary: function (params, callback) {
        var api = "Console/TaskSummary"
        jqReqNoLoading('post', api, params, true, callback);
    },
    //请求后台支出数据
    TakeOutput: function (params, callback) {
        var api = "Console/TakeOutput"
        jqReq('post', api, params, true, callback);
    },
    //请求后台事件数据
    TakeEvent: function (params, callback) {
        var api = "Console/TakeEvent"
        jqReq('post', api, params, true, callback);
    },
    //获取全部币互转统计
    QueryExchangeSummary: function (params, callback) {
        var api = "Console/QueryExchangeSummary"
        jqReq('post', api, params, true, callback);
    },
    //获取为币互转详细记录
    QueryExchange: function (params, callback) {
        var api = "Console/QueryExchange"
        jqReq('post', api, params, true, callback);
    },
    //后台查询用户
    QueryUser: function (params, callback) {
        var api = "Console/QueryUser"
        jqReqNoLoading('post', api, params, true, callback);
    },
    //后台修改用户登陆密码
    ResetUserPassword: function (params, callback) {
        var api = "Console/ResetUserPassword"
        jqReq('post', api, params, true, callback);
    },
    //后台修改用户交易密码
    ResetUserTradePassword: function (params, callback) {
        var api = "Console/ResetUserTradePassword"
        jqReq('post', api, params, true, callback);
    },
    //后台冻结用户
    FreeUsers: function (params, callback) {
        var api = "Console/FreeUsers"
        jqReq('post', api, params, true, callback);
    },
    //后台解冻用户
    UnFreeUser: function (params, callback) {
        var api = "Console/UnFreeUser"
        jqReq('post', api, params, true, callback);
    },
    //查询后台钱包转账统计
    QueryStatisticsendOut: function (params, callback) {
        var api = "Console/QueryStatisticsendOut"
        jqReq('post', api, params, true, callback);
    },
    //查询后台钱包转账明细
    QuerySendOutIn: function (params, callback) {
        var api = "Console/QuerySendOutIn"
        jqReq('post', api, params, true, callback);
    },
    //查询后台分红明细直代联队
    QueryGenerationIncome: function (params, callback) {
        var api = "Console/QueryGenerationIncome"
        jqReq('post', api, params, true, callback);
    },
    //查询后台分红明细整体联队
    QueryAllianceIncome: function (params, callback) {
        var api = "Console/QueryAllianceIncome"
        jqReq('post', api, params, true, callback);
    },
    //查询后台联队表单代数关系
    QueryGenerationRelationship: function (params, callback) {
        var api = "Console/QueryGenerationRelationship"
        jqReq('post', api, params, true, callback);
    },
    //查询后台联队表单体系关系
    QueryAlianceRelationship: function (params, callback) {
        var api = "Console/QueryAlianceRelationship"
        jqReq('post', api, params, true, callback);
    }
}