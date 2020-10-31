var countDown = 60;

var errorCode = {
    "Default": "Operation failed",
    "Success": "Operation succeeded", 
    "InviterNotFound": "No Referees found", 
    "UserNotExists": "User doesn't exist",     
    "EmailNotSet": "Email is available", 
    "PasswordMismatch": "Wrong password",    
    "EmailRequried": "Please type your email", 
    "EmailCodeInvalid": "Wrong verification code", 
    "PasswordTooShort": "Password must be more than 8 digits", 
    "PassMustMathCMPass": "Passwords differ",     
    "ParameterError": "Wrong Parameter", 
    "ServerError": 'Server Error', 
    "CoinTypeNotSupport": "The currency type is not available", 
    "EmailOrUserNameRequried": 'Please type email or user name', 
    "BalanceNotEnough": "Insufficient Balance", 
    "Failed": "Operation failed", 
    "InviterRequried": "Please type ID for the Referee", 
    "SetterNotFound": "No setter found",          
    "SetterRequried": "Please type ID for the Setter",        
    "TypeInvalid": "Invalid category",                 
    "PagingParameterRequired": "Paging Parameters are required", 
    "PagingIndexOutOfRange": "Paging parameters exceeds the limit", 
    "PhoneRequried": "Please type your mobile number",               
    "EmailOrPhoneRequried": "Please type email or mobile number", 
    "EmailOrPhoneFormatInvalid": "The format of account or the fomat of phone number is not correct", 
    "PasswordRequried": "Please type password", 
    "GoogleCodeRequride": "Please type the google verification code",  
    "GoogleCodeInvalid": "The google verification code is not correct", 
    "GoogleTwoFactoryIsActivate": "Google authentication is enabled",  
    "GoogleTwoFactoryNotActivate": "Google authentication is not available", 
    "SMSTwoFactoryIsActivate": "SMS authentication is enabled",      
    "CofirmPasswordRequried": "Please confirm the password", 
    "PassMustMathCMPass": "The two passwords are different", 
    "TwoEleMustMach": "The two parameters are different",              
    "PasswordFormatRequired": "Password strength is not enough",          
    "PasswordRequireDigit": "Password must include the digits",          
    "PasswordRequireLower": "Password must include mixed case",     
    "PasswordRequireUpper": "Password must include mixed case",      
    "PasswordRequireNonLetterOrDigit": "Passowrd must include letters",  
    "AdvancePasswordCanEqualBasicPassword": "The login passowrd can not be the same as trade password", 
    "ParameterError": "Wrong parameter",    
    "OpenTxTimeNotAllow": "The ending time can not be earlier than beginning time", 
    "ValueOutOfRange": "The number typed is out of range", 
    "ModelNotMatch": "Parameter doesn’t meet requirements",    
    "TypeRequired": "Please select the category",         
    "LangTypeRequired": "Please select the language", 
    "LogoUrlRequired": "Please upload the logo", 
    "NickNameRequired": "Please type the nickname", 
    "NickNameExists": "The nickname exists", 
    "CommentLengthTooShortOrTooLong": "The signature is too long or too short", 
    "Commented": "You can not evaluate again if has evaluated", 
    "CountryLengthTooShortOrTooLong": "The length of the country is too short or too long",
    "StateLengthTooShortOrTooLong": "The length of the province  is too short or too long",
    "CityLengthTooShortOrTooLong": "The length of the city  is too short or too long",
    "RegionLengthTooShortOrTooLong": "The length of the town is too short or too long",
    "AddrLengthTooShortOrTooLong": "The length of the address is too short or too long", 
    "FollowerNameTooShortOrTooLong": "The length of the  Followers’ name is too short or too long",
    "TelPhoneAlreadyExist": "The phone number has been registered", 
    "TelPhoneNotSet": "The user does not bind the phone number", 
    "TelPhoneAlreadySet": "The user has binded the phone number",
    "EmailNotSet": "The user does not bind the email",
    "EmailAlreadySet": "The user has binded the email",
    "EmailAlreadyExist": "The email has been registered", 
    "SMSCodeRequired": "Please type the mobile verification code",  
    "RegCodeFailed": "The registration code is not available", 
    "SMSCodeInvalid": "The verification code is not available", 
    "SMSCodeLimited": "The verification code is sent too frequently, please send later", 
    "SMSSendTooBusy": "The verification code is sent too frequently, please send later",
    "EmailCodeInvalid": "The verification code is not available", 
    "EmailCodeOutOfDay": "The verification code is invalid", 
    "SMSCodeOutOfDay": "The verification code is invalid", 
    "EmailSendTooBusy": "Sent too frequently, please send later", 
    "LinkOutOfDay": "The link is invalid", 
    "SMSCodeMustOutOfTime": "The verification code can be sent again in 120 seconds", 
    "RequestLimited": "Operation is too frequent, please try again in 1 hour", 
    "UserExists": "User exists",  
    "UserLogined": "User has logged in", 
    "UserNeedLogin": "Please log in firstly", 
    "UserAlreadyForce": "The user is followed", 
    "RequestAddrFailed": "The request address is not correct", 
    "PicFormatNotSupport": "The format of the pic is not available", 
    "PicNumberNotMatch": "The quantity of the pictures unloaded are not correct", 
    "PicTooLarge": "The image is too large", 
    "PicContentEmpty": "The image unloaded can not be empty", 
    "IdentityPicNotMatch": "The image of ID card is not available", 
    "IdentityConfirmed": "The information of ID card has been approved", 
    "RequiresVerification": "Please verify firstly", 
    "RequireAleadyVerification": "It has already verified, no need to verify again", 
    "UserAlreadyInRole": "You are already in the role", 
    "UserLockout": "Account is frozen", 

    "PaymentTypeRequired": "Please choose the payment terms", 
    "PaymentNameRepeat": "The payer repeats", 
    "PaymentNotExists": "The payment term does not exsit",
    "PaymentAccountNameTooShortOrTooLong": "The length of pay account s not enough", 
    "PaymentServeNameTooShortOrTooLong": "The length of bank account is not enough", 
    "CoinTypeNotSupport": "The currency type is not available", 
    "CoinTypeRequired": "Please choose the currency type", 
    "CoinPriceRequired": "Please choose the currency amount", 
    "CoinAddressRequired": "Please type the address", 
    "CoinAddressTooShortOrTooLong": "The length of address does’t meet requirements", 
    "CoinAddressCommentTooShortOrTooLong": "The length of comments doesn’t meet requirments", 
    "CurrencyTypeRequired": "Please choose currency unit", 
    "ReleaseAmountRequired": "Please type the amount", 
    "FeeRequired": "Please type the handing fee", 
    "FeeOutOfRange": "The range of Handing fee(2-1000)", 
    "MinLimitedRequired": "Please type the min transaction amount", 
    "MaxLimitedRequired": " Please type the max transaction amount",
    "OpenTxTimeRequired": "Please choose the transaction time", 
    "OpenTxTimeNameReapeat": "The transaction time repeats",  
    "OpenTxTimeNameNoExists": " The transaction time is wrong",
    "OpenTxProviRequired": "The trading terms is required",     
    "OpenTxProviRepeat": "The name of trading terms repeat",       
    "OpenTxProviNotExists": "The trading terms do not exist", 
    "OpenTxProviTooShortOrTooLong": "The terms are too long or too short", 
    "AdvancedPasswordRequirdSet": "The secondary password do not be setted up", 
    "AdvancedPasswordSetAlready": "The secondary password has been setted up",
    "OrderTypeRequired": "The order type is required", 
    "TodayBuyLimited": "Exceed daily purchase limit",  
    "TodaySellLimited": "Exceed daily selling imit", 
    "BalanceNotEnough": "Balance is insufficient", 
    "FeeBanlanceNotEnough": "Handing fee is insufficient", 
    "BuyerFeeBanlanceNotEnough": "The handing fee of the buyer is insufficient, so it can not be deducted", 
    "SellFeeBanlanceNotEnough": "The handing fee of the seller is insufficient, so it can not be deducted", 
    "MinPerUnitRequired": "Need meet the min transaction amount", 
    "MaxPerUnitRequired": "Can not be more than max transaction amount", 
    "OrderNotFound": "The order does not exist", 
    "OrderIsclose": "It has been sold out", 
    "OrderInsufficient": "The stock is insufficient", 
    "CanNotHandleSelf": "You can not operate the order yourself", 
    "OrderNeedAuth": "You can not get into the order", 
    "CanNotForceSelf": "You can not follow yourself", 
    "OrderProcessingCanNotCancelled": "The order is under transaction, you need to wait till finished", 
    "OrderRefreshTimeOutOfRange": "The order can be updated in 60 minites", 
    "NotEnoughPlanAMT": "Order balance is insufficient", 
    "OrderIsLocked": "The order is under locked", 
    "OrderIsOverTime": "The order is invalid", 
    "IssueRequestNameIsRequired": "Arbitration applicant is required",
    "IssueOrderIsRequired": "The Arbitration order ID is required", 
    "IssueIdIsRequired": "The arbitration ID is required", 
    "IssueReasonIsRequired": "The reason for arbitration is required", 
    "IssueCommitLenIsTooShort": "The instructions for arbitration can not be less than 10 Characters", 
    "IssueNotFound": "The arbitration does not exist", 
    "IssuePremissonRequired": "You don’t have permission to operate arbitration", 
    "SettleExcepiton": "Abnormal settlement", 
    "NameRequired": "The name is required", 
    "NameTooShortOrTooLong": "The nature is too long or too short", 
    "PaymentLenTooShortOrTooLong": "The payer name is too long or too short", 
    "CoinAddrLimited": "The quantity of address stored exceeds the limit",
    "CoinAddrNotFound": "The address stored does not exist", 
    "ChatRoomIdRequired": "The parameter for chat room number is not correct", 
    "CoinAddrMustUse": "The account can be deleted only after using", 
    "CoinAddrRepeat": "The account exists", 
    "DefaultAddrIsLock": "The address stored doesn’t exist", 
    "QLNNotMatch": "The condition for applying dealer doesn’t meet requirements", 
    "NeedPromoteDealer": "You can’t release because you are not the dealer", 
    "RoleNotFound": "The role doesn’t exist", 
    "RongYunServerError": "RongYun server is abnormal", 
    "MongoServerError": "Mango server is abnormal", 
    "SqlServeServerError": "Sql server is abnormal", 
    "UnkownError": "Unknown error", 
    "ServerError": "Server is abnormal", 
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
    { coin: 'VT', value: 8 },
];
var destCoinType = [
    { coin: 'BTC', value: 0 },
    { coin: 'LTC', value: 1 },
    { coin: 'SC', value: 5 },
    { coin: 'VC', value: 6 },
    { coin: 'VS', value: 7 },
    { coin: 'VT', value: 8 },
];
var Lang = [
    { lang: '中文', value: "zh-CN", icon: '/images/Img/chnai.png' },
    { lang: 'English', value: 'en-US', icon: '/images/Img/america.png' },
    { lang: 'Republik Indonesia', value: 'id-ID', icon: '/images/Img/id.png' },
]