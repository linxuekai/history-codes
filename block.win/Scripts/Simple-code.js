var countDown = 60;

var errorCode = {
    "Default": "操作失败",
    "Success": "操作成功",
    "InviterNotFound": "未找到推荐人",
    "UserNotExists": "用户不存在",
    "EmailNotSet": "邮箱可用",
    "PasswordMismatch": "密码错误",
    "EmailRequried": "请输入邮箱",
    "EmailCodeInvalid": "验证码错误",
    "PasswordTooShort": "密码最低为8位数",
    "PassMustMathCMPass": "密码不一致",
    "ParameterError": "参数错误",
    "ServerError": '服务器错误',
    "CoinTypeNotSupport": "不支持的货币类型",
    "EmailOrUserNameRequried": '请输入邮箱或用户名',
    "BalanceNotEnough": "可用余额不足",
    "Failed": "操作失败",
    "InviterRequried": "请输入推荐人ID",
    "SetterNotFound": "安置人不存在",
    "SetterRequried": "请输入安置人ID",
    "TypeInvalid": "类型无效",
    "PagingParameterRequired": "分页参数是必填项",
    "PagingIndexOutOfRange": "分页参数超出限制",
    "PhoneRequried": "请输入手机号",
    "EmailOrPhoneRequried": "请输入邮箱或者手机号",
    "EmailOrPhoneFormatInvalid": "账号或者电话号码格式错误",
    "PasswordRequried": "请输入密码",
    "GoogleCodeRequride": "请输入谷歌验证码",
    "GoogleCodeInvalid": "谷歌验证码错误",
    "GoogleTwoFactoryIsActivate": "谷歌验证已开启",
    "GoogleTwoFactoryNotActivate": "谷歌验证未开启",
    "SMSTwoFactoryIsActivate": "SMS验证已开启",
    "CofirmPasswordRequried": "请确认密码",
    "PassMustMathCMPass": "两次输入的密码不一致",
    "TwoEleMustMach": "输入参数前后一致",
    "PasswordFormatRequired": "密码强度不足",
    "PasswordRequireDigit": "密码需包含数字",
    "PasswordRequireLower": "密码必需包含大小写",
    "PasswordRequireUpper": "密码必需包含大小写",
    "PasswordRequireNonLetterOrDigit": "密码必需包含字母",
    "AdvancePasswordCanEqualBasicPassword": "登陆密码不能和交易密码相同",
    "ParameterError": "参数错误",
    "OpenTxTimeNotAllow": "结束时间不能早于开始时间",
    "ValueOutOfRange": "输入的数字超出了选择范围",
    "ModelNotMatch": "参数不符合要求",
    "TypeRequired": "请选择类型",
    "LangTypeRequired": "请选择语言",
    "LogoUrlRequired": "请上传Logo",
    "NickNameRequired": "请输入昵称",
    "NickNameExists": "昵称已存在",
    "CommentLengthTooShortOrTooLong": "个性签名长度过长或过短",
    "Commented": "已经评价过无法再次评价",
    "CountryLengthTooShortOrTooLong": "国家长度过长或过短",
    "StateLengthTooShortOrTooLong": "省份长度过长或过短",
    "CityLengthTooShortOrTooLong": "城市长度过长或过短",
    "RegionLengthTooShortOrTooLong": "城镇长度过长或过短",
    "AddrLengthTooShortOrTooLong": "地址详情长度过长或过短",
    "FollowerNameTooShortOrTooLong": "关注用户的长度过长或过短",
    "TelPhoneAlreadyExist": "电话号码已注册",
    "TelPhoneNotSet": "用户未绑定手机",
    "TelPhoneAlreadySet": "用户已绑定手机",
    "EmailNotSet": "用户未绑定邮件",
    "EmailAlreadySet": "用户已绑定邮件",
    "EmailAlreadyExist": "邮件已注册",
    "SMSCodeRequired": "请输入手机验证码",
    "RegCodeFailed": "注册码无效",
    "SMSCodeInvalid": "验证码无效",
    "SMSCodeLimited": "验证码发送过于频繁，请稍后发送",
    "SMSSendTooBusy": "验证码发送过于频繁，请稍后发送",
    "EmailCodeInvalid": "验证码无效",
    "EmailCodeOutOfDay": "验证码过期",
    "SMSCodeOutOfDay": "验证码已过期",
    "EmailSendTooBusy": "发送太频繁，请稍后发送",
    "LinkOutOfDay": "链接已过期",
    "SMSCodeMustOutOfTime": "验证码需要等待120秒才能重新发送",
    "RequestLimited": "操作太频繁，请一小时后再试",
    "UserExists": "用户已存在",
    "UserLogined": "用户已经登陆",
    "UserNeedLogin": "请先登录",
    "UserAlreadyForce": "已关注此用户",
    "RequestAddrFailed": "申请地址错误",
    "PicFormatNotSupport": "图片格式不支持",
    "PicNumberNotMatch": "上传的图片数量不对",
    "PicTooLarge": "图片太大",
    "PicContentEmpty": "上传的图片不能为空",
    "IdentityPicNotMatch": "身份证图片不符合要求",
    "IdentityConfirmed": "身份证已通过审核",
    "RequiresVerification": "请先认证",
    "RequireAleadyVerification": "已认证,无需重复认证",
    "UserAlreadyInRole": "您已经是该角色",
    "UserLockout": "账户冻结",
    "PaymentTypeRequired": "请选择支付方式",
    "PaymentNameRepeat": "支付名称重复",
    "PaymentNotExists": "支付方式不存在",
    "PaymentAccountNameTooShortOrTooLong": "支付账号名称长度不足",
    "PaymentAccountNoTooShortOrTooLong": "支付账号名称长度不足",
    "PaymentServeNameTooShortOrTooLong": "支付银行账号名称长度不足",
    "CoinTypeNotSupport": "货币类型不支持",
    "CoinTypeRequired": "请选择币种类型",
    "CoinPriceRequired": "请输入币种数量",
    "CoinAddressRequired": "请输入地址",
    "CoinAddressTooShortOrTooLong": "地址名称长度不符合要求",
    "CoinAddressCommentTooShortOrTooLong": "地址注释长度不符合要求",
    "CurrencyTypeRequired": "请选择货币单位",
    "ReleaseAmountRequired": "请输入数量",
    "FeeRequired": "请输入手续费",
    "FeeOutOfRange": "手续费 区间(2-1000)",
    "MinLimitedRequired": "请输入最小成交数",
    "MaxLimitedRequired": "请输入最大成交数",
    "OpenTxTimeRequired": "请选择交易时间",
    "OpenTxTimeNameReapeat": "交易时间名称重复",
    "OpenTxTimeNameNoExists": "交易时间不存在",
    "OpenTxProviRequired": "交易条款是必填项",
    "OpenTxProviRepeat": "交易条款名称重复",
    "OpenTxProviNotExists": "交易条款不存在",
    "OpenTxProviTooShortOrTooLong": "条款文字太长或者太短",
    "AdvancedPasswordRequirdSet": "二级密码未设定",
    "AdvancedPasswordSetAlready": "二级密码已设定",
    "OrderTypeRequired": "订单类型是必填项",
    "TodayBuyLimited": "超出每日购买限制",
    "TodaySellLimited": "超出每日卖出限制",
    "BalanceNotEnough": "余额不足",
    "FeeBanlanceNotEnough": "手续费不足",
    "BuyerFeeBanlanceNotEnough": "买家手续费不足,无法扣除",
    "SellFeeBanlanceNotEnough": "卖家手续费不足,无法扣除",
    "MinPerUnitRequired": "需要满足最小成交量",
    "MaxPerUnitRequired": "不能超出最大成交量",
    "OrderNotFound": "订单不存在",
    "OrderIsclose": "订单已卖完",
    "OrderInsufficient": "订单库存不足",
    "CanNotHandleSelf": "不能操作自己的订单",
    "OrderNeedAuth": "无权操作订单",
    "CanNotForceSelf": "不能关注自己",
    "OrderProcessingCanNotCancelled": "订单在交易状态,需要等待订单完成",
    "OrderRefreshTimeOutOfRange": "订单需要在60分钟才能刷新",
    "NotEnoughPlanAMT": "订单余额不足",
    "OrderIsLocked": "订单锁定状态",
    "OrderIsOverTime": "订单已过期",
    "IssueRequestNameIsRequired": "仲裁申请人是必填项",
    "IssueOrderIsRequired": "仲裁订单ID是必填项",
    "IssueIdIsRequired": "仲裁Id是必填项",
    "IssueReasonIsRequired": "仲裁原因是必填项",
    "IssueCommitLenIsTooShort": "仲裁说明不能少于 10个字符",
    "IssueNotFound": "仲裁不存在",
    "IssuePremissonRequired": "没有权限对仲裁操作",
    "SettleExcepiton": "结算异常",
    "NameRequired": "名称是必填项",
    "NameTooShortOrTooLong": "属性名称过长或过短",
    "PaymentLenTooShortOrTooLong": "支付名称长度过长或过短",
    "CoinAddrLimited": "存储的地址数量超过限制",
    "CoinAddrNotFound": "存储的地址不存在",
    "ChatRoomIdRequired": "聊天房间号参数错误",
    "CoinAddrMustUse": "账号必须使用过才能删除",
    "CoinAddrRepeat": "账号已存在",
    "DefaultAddrIsLock": "存储的地址不存在",
    "QLNNotMatch": "申请交易商条件不满足",
    "NeedPromoteDealer": "您还不是成为交易商，没有权限发布",
    "RoleNotFound": "角色不存在",
    "WebActionNotExists":"暂不开放",
    "RongYunServerError": "RongYun服务器异常",
    "MongoServerError": "Mongo服务器异常",
    "SqlServeServerError": "SqlServer服务器异常",
    "UnkownError": "未知错误",
    "ServerError": "服务器异常",
};

function getDescript(key) {
    if (errorCode != null && errorCode[key] != null) {
        return errorCode[key];
    } else {
        return errorCode["Default"];
    }
}

function getToken() {
    return $("input[name='__RequestVerificationToken']").val();
}

//生成二维码
function qr(msg, id, width, height) {
    var qrcode = new QRCode(id, {
        text: msg,
        width: width ? width : 114,
        height: height ? height : 114,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

//转换成时间戳
function parseTimStamp(str) {
    var date = new Date(str); 
    var time = date.getTime();
    return time;
}

//获取当前时间戳
function getNowTimeStamp() {
    var timestamp = Date.parse(new Date());
    return timestamp;
}

//获取时间字符串的日期
function parseTimeGetDate(obj) {
    if (obj) {
        return obj.split(' ')[0];
    } else {
        return obj;
    }
}

//保留小数点
function numToFixed(num, fix) {
    var type = typeof (num);
    var objType = type.toLowerCase();

    if (objType != 'number' ) {
        return num;
    } else if (objType==0){
        return 0;
    } else {
        return num.toFixed(fix);
    } 
}

//深克隆
function deepClone(initalObj) {
    var obj = {};
    obj = JSON.parse(JSON.stringify(initalObj));
    return obj;
}  

function checkTrue(obj) {
    if (obj === 'undefined' || obj === null || obj === '') {
        return false;
    } else {
        return true;
    }
}

function showTips(text) {
    $('#showTips').fadeIn(); 
    $('#showTipsMsg').text(text);
    setTimeout(function () {
        $('#showTips').fadeOut();
    }, 1500);
}

function setTimeOUT(callback) {
    setTimeout(callback, 1500);
};

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

function ValidateValue(value, check) {
    var reg;
    switch (check) {
        case 'Require': 
             reg = RegArray.Require;
             break;
        case 'Email':
            reg = RegArray.Email;
            break;
        case 'Phone':
            reg = RegArray.Phone;
            break;
        case 'Mobile':
            reg = RegArray.Mobile;
            break;
        case 'Url':
            reg = RegArray.Url;
            break;
        case 'Currency':
            reg = RegArray.Currency;
            break;
        case 'Number':
            reg = RegArray.Number;
            break;
        case 'Float':
            reg = RegArray.Float;
            break;
        case 'Zip':
            reg = RegArray.Zip;
            break;
        case 'QQ':
            reg = RegArray.QQ;
            break;
        case 'Integer':
            reg = RegArray.Integer;
            break;
        case 'Double':
            reg = RegArray.Double;
            break;
        case 'English':
            reg = RegArray.English;
            break;
        case 'Chinese':
            reg = RegArray.Chinese;
            break;
        case 'Username':
            reg = RegArray.Username;
            break;
        case 'Password':
            reg = RegArray.Password;
            break;
        case 'UnSafe':
            reg = RegArray.UnSafe;
            break;
        case 'Ip':
            reg = RegArray.Ip;
            break;
        case 'IDCard':
            reg = RegArray.IDCard;
            break;
    }
    return reg.test(value);
}

function showAlertBox(id, text) {
    var newid = $("#" + id);
    if (text != "") {
        newid.text(text);
    }
    newid.fadeIn();
    setTimeout(function () {
        newid.fadeOut(1000)
    }, 3000);
}

function addClass(prototyName, cla) {
    $(prototyName).addClass(cla);
}
function removeClass(prototyName, cla) {
    $(prototyName).removeClass(cla);
}


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
    { lang: 'English', value: 'en-US', icon: '/images/Img/america.png' },
    { lang: 'Republik Indonesia', value: 'id-ID', icon: '/images/Img/id.png' },
]