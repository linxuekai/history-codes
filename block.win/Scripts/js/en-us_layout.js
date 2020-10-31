

//是否设置过交易密码
var TradePasswordIsSet = $('#TradePasswordIsSet').text();
if (TradePasswordIsSet === 'True') {
    TradePasswordIsSet = true;
}
if (TradePasswordIsSet === true) {
    $('.traPasswodIsSet').text('Old Trade Password');
    $('.traPasswodPlachole').attr('placeholder', 'Old Trade Password');
} else {
    $('.traPasswodIsSet').text('Login Password');
    $('.traPasswodPlachole').attr('placeholder', 'Login Password');
}

$('#navMoblieContent').on('click', function () {
    $('.navbar-toggle').trigger("click");
})

//是否有通知
var MsgCount = $('#MsgCount').text();
if (MsgCount > 0) {
    $('.redCircle').css('visibility','visible');
}


var layoutTitle = $('#layoutTitle').text();
var navLen = $('#accordion a').length;
for (var nav = 0; nav < navLen; nav++) {
    if ($('#accordion a').eq(nav).text().trim() == layoutTitle) {
        var len = $('#accordion a').eq(nav).parent('.panel-heading').length;
        if (len > 0) {
            $('#accordion a').eq(nav).parent('.panel-heading').addClass('active');
        } else {
            $('#accordion a').eq(nav).addClass('c-255 f-s-18');
            $('#accordion a').eq(nav).parent().parent().siblings('.panel-heading').addClass('active');
        }
    }
}

$('.panel-body').on('click', function () {
    $('.panel-body a').removeClass('c-255');
    $(this).find('a').addClass('c-255');
    $('.panel-heading').removeClass('active');
    $(this).parent().siblings('.panel-heading').addClass('active');
});

//切换语言
function SwithLang(langCode) {
    window.location.href = host + 'Home/SwithLang?Lang=' + langCode;
}

var layoutLang = '';
Lang.forEach(function (item) {
    layoutLang += "<li role='presentation' class='w-172 h-40'><a class='h-30 p-0 p-t-2 p-l-6' href=\"../Home/SwithLang?Lang=" + item.value + "><img src='" + item.icon + "' class='f-l w-24 h-24 d-s-i-b' /><span class='f-l f-s-12 m-l-8' role='menuitem' tabindex='-1'>" + item.lang + "</span></a > </li > ";
});
//$('#layoutLang').html(layoutLang);

var lang = $('html').attr('lang');
function openUserInfo() {
    server.LayoutUserInfo({}, function (rel) {
        $('body').append(rel);
    }, lang + '/LayoutPartial/LayoutUserInfo');
}

//打开找回交易密码框
function showForgotTradePass() {
    $('#accountModal').modal('hide');
}
//发送找回交易密码邮件
function SendForgotTradePasswordEmail() {
    server.SendForgotTradePasswordEmail({
        __RequestVerificationToken: getToken(),
        Lang: 'en-US',
    }, function (rel) {
        if (rel.msg === 'StatusOk') {
            var countdown = countDown;
            $('#SendForgotTradePasswordBtn').attr('disabled', 'disabled');
            showAlertBox('ForgotTradePasswordAlertBox', 'Please note that the mail has been sent');
            var cd = setInterval(function () {
                $('#SendForgotTradePasswordBtn').text(countdown + ' Seconds').removeClass('bg-10ADE4').addClass('bg-ccc');
                if (countdown == 0) {
                    clearInterval(cd);
                    $('#SendForgotTradePasswordBtn').text('Send PIN Code').removeClass('bg-ccc').addClass('bg-10ADE4').removeAttr('disabled');
                }
                countdown--;
            }, 1000);

        } else {
            showAlertBox('ForgotTradePasswordAlertBox', getDescript(rel.msg));
        }
    });
}


//通过邮件验证码设置交易密码
function ForgotTradePassword() {
    var Code = $('#forgetNewPasswordCode').val();
    var newTradePassword = $('#newTradePassword').val();
    var ConfirmNewTradePassword = $('#ConfirmNewTradePassword').val();
    if (!Code) {
        showAlertBox('ForgotTradePasswordAlertBox', 'Please Enter The Mailbox Verification Code');
        return;
    }
    if (!newTradePassword) {
        showAlertBox('ForgotTradePasswordAlertBox', 'Please Enter The New Trade Password');
        return;
    }
    if (!ConfirmNewTradePassword) {
        showAlertBox('ForgotTradePasswordAlertBox', 'Please Confirm The New Trade Password ');
        return;
    }
    server.ForgotTradePassword({
        __RequestVerificationToken: getToken(),
        Code: Code,
        Password: newTradePassword,
        ConfirmPassword: ConfirmNewTradePassword
    }, function (rel) {
        if (rel.msg === 'StatusOk') {
            showAlertBox('ForgotTradePasswordAlertBox', 'Modify Successfully');
            setTimeout(function () {
                $('#ForgotTradePasswordModal').modal('hide');
            }, 1500);
        } else {
            showAlertBox('ForgotTradePasswordAlertBox', getDescript(rel.msg));
        }
    })
}

//通过原始登陆密码修改登陆密码
function ChangeLoginPassword() {
    var OldPassword = $('#OldePassword').val();
    var Password = $('#newPassword').val();
    var ConfirmPassword = $('#ConfirmNewPassword').val();
    if (!OldPassword) {
        showTips('Please enter the original login password');
        return;
    }
    if (!Password) {
        showTips('Please enter a new login password');
        return;
    }
    if (!ConfirmPassword) {
        showTips('Duplicate the new login password');
        return;
    }
    server.ChangeLoginPassword({
        __RequestVerificationToken: getToken(),
        OldPassword: OldPassword,
        Password: Password,
        ConfirmPassword: ConfirmPassword,
    }, function (rel) {
        switch (rel.msg) {
            case 'StatusOk': {
                showAlertBox('ChangeLoginPassword', 'Modify successfully');
                $('#OldePassword').val('');
                $('#newPassword').val('');
                $('#ConfirmNewPassword').val('');
                setTimeout(function () {
                    $('#accountModal').modal('hide');
                }, 1500);
                break;
            }
            case rel.msg: {
                showAlertBox('ChangeLoginPassword', getDescript(rel.msg));
                break;
            }
            default: {
                showAlertBox('ChangeLoginPassword', 'Modification failed, error code：' + rel.msg);
            }
        }
    });
}

//交易密码
function InitTradePassword() {
    var OldPassword = $('#OldPassword').val();
    var Password = $('#Password').val();
    var ConfirmPassword = $('#ConfirmPassword').val();
    if (!OldPassword) {
        showTips('Please enter your login password');
        return;
    }
    if (!Password) {
        showTips('Please enter the transaction password');
        return;
    }
    if (!ConfirmPassword) {
        showTips('Please confirm the transaction password');
        return;
    }

    if (TradePasswordIsSet === true) {
        server.ChangeTradePassword({
            __RequestVerificationToken: getToken(),
            OldPassword: OldPassword,
            Password: Password,
            ConfirmPassword: ConfirmPassword,
        }, function (rel) {
            switch (rel.msg) {
                case 'StatusOk': {
                    showAlertBox('InitTradePasswordAlertBox', 'Change Successfully');
                    $('#OldPassword').val('');
                    $('#Password').val('');
                    $('#ConfirmPassword').val('');
                    setTimeout(function () {
                        $('#accountModal').modal('hide');
                    }, 1500);
                    break;
                }
                case rel.msg: {
                    showAlertBox('InitTradePasswordAlertBox', getDescript(rel.msg));
                    break;
                }
                default: {
                    showAlertBox('InitTradePasswordAlertBox', 'Modification failed, error code：' + rel.msg);
                }
            }
        });
    } else {
        server.InitTradePassword({
            __RequestVerificationToken: getToken(),
            OldPassword: OldPassword,
            Password: Password,
            ConfirmPassword: ConfirmPassword,
        }, function (rel) {
            switch (rel.msg) {
                case 'StatusOk': {
                    showAlertBox('InitTradePasswordAlertBox', 'Set successfully');
                    $('#OldPassword').val('');
                    $('#Password').val('');
                    $('#ConfirmPassword').val('');
                    setTimeout(function () {
                        $('#accountModal').modal('hide');
                    }, 1500);
                    break;
                }
                case rel.msg: {
                    showAlertBox('InitTradePasswordAlertBox', getDescript(rel.msg));
                    break;
                }
                default: {
                    showAlertBox('InitTradePasswordAlertBox', 'Modification failed, error code：' + rel.msg);
                }
            }
        });
    }
   
}

function Logout() {
    var lang = $('html').attr('lang');
    server.Logout({}, function () {
        window.location.href = host + '/'+lang;
    })
}

//账户设置选项卡操作
function accountModalTabs(thisIndex) {
    $('.accountModalTabs').hide();
    $('.accountTabsBtn').removeClass('b-b-000');
    $('.accountTabsBtn').eq(thisIndex).addClass('b-b-000')
    $('.accountModalTabs').eq(thisIndex).fadeIn();

    //谷歌认证查看二维码
    if (thisIndex == 2) {
        $('#accountModalGoogleToken').html('');
        server.GoogleToken({
            __RequestVerificationToken: getToken(),
        }, function (rel) {
            switch (rel.msg) {
                case 'StatusOk': {
                    qr(rel.data, 'accountModalGoogleToken');
                    break;
                }
            }
        })
    }
}


//手机顶部导航切换tab
function showNavCon(obj) {
    $('.navMoblieCon').hide();
    $('.navMoblieNav li').removeClass('active');
    $('.nav' + obj).fadeIn();
    switch (obj) {
        case "caiwu": {
            $('.navMoblieNav li').eq(4).addClass('active');
            break;
        }
        case "liandui": {
            $('.navMoblieNav li').eq(5).addClass('active');
            break;
        }
    }

}

//侧边栏
$('div[data-toggle= "collapse"]').on('click', function () {
    var lastStatus = ($(this).siblings(".panel-collapse").hasClass('in'));
    if (lastStatus == false) {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active');
    }

});

//修改个人信息
function UpdateUserInfo() {
    var ID = $('#changePersonID').val();
    var changePersonEmail = $('#changePersonEmail').val();
    var NickName = $('#changePersonNickName').val();
    var changePersonPhone = $('#changePersonPhone').val();
    var Addr = $('#changePersonAddr').val();
    var Birth = $('#changePersonBirthDay').val();
    server.UpdateUserInfo({
        __RequestVerificationToken: getToken(),
        LogoPath: $('#layoutLogo').attr('src'),
        NickName: NickName,
        Addr: Addr,
        Lang: 'DEFAULT',
        Birth: Birth,
    }, function (rel) {
        switch (rel.msg) {
            case 'StatusOk': {
                showAlertBox('UpdateUserInfoAlertBox', 'Modify successfully');
                setTimeout(function () {
                    $('#personalModal').modal('hide');
                }, 1500);
                break;
            }
            case rel.msg: {
                showAlertBox('UpdateUserInfoAlertBox', getDescript(rel.msg));
                break;
            }
            default: {
                showAlertBox('UpdateUserInfoAlertBox', 'Modification failed, error code：' + rel.msg);
            }
        }
    })
}

//获取用户套餐等级
var hasUserLevelInfo = false;
$('#dropdownMenuAccount').on('click', function () {
    if (hasUserLevelInfo == false) {
        server.TakeUserLevelInfo({
            __RequestVerificationToken: getToken(),
        }, function (rel) {
            switch (rel.msg) {
                case 'StatusOk': {
                    rederLevel('navGenerationLevel', rel.data.GenerationLevel);
                    rederLevel('navPackageLevel', rel.data.PackageLevel);
                    rederLevel('navLeaderLevel', rel.data.LeaderLevel);
                    hasUserLevelInfo = true;
                    break;
                }
            }
        })
    }
})
function rederLevel(id, level) {
    if (level == 0) {
        $('#' + id).html('--');
    } else {
        var aHtml = '';
        for (var i = 0; i < level; i++) {
            aHtml += '<i class="navAsideIcon navAsideSTART"></i>';
        }
        $('#' + id).html(aHtml);
    }
}

//获取个人电话邮箱国家生日等
var hasTakeUserInfo = false;
var userLogo = '';
function TakeUserInfo() {
    if (hasTakeUserInfo == false) {
        server.TakeUserInfo({
            __RequestVerificationToken: getToken(),
        }, function (rel) {
            switch (rel.msg) {
                case 'StatusOk': {
                    $('#changePersonID').val(rel.data.UserName);
                    $('#changePersonEmail').val(rel.data.Email);
                    $('#changePersonNickName').val(rel.data.NickName);
                    $('#changePersonPhone').val(rel.data.PhoneNumber);
                    $('#changePersonAddr').val(rel.data.Addr);
                    if (rel.data.Birth) {
                        $('#changePersonBirthDay').val(parseTimeGetDate(rel.data.Birth));
                    }

                    userLogo = rel.data.Logo;
                    hasTakeUserInfo = true;
                    break;
                }
            }
        })
    }
    //日期时间选择
    if ($(".iDate.date").length > 0) {
        $(".iDate.date").datetimepicker({
            locale: "zh-cn",
            format: "YYYY-MM-DD",
            dayViewHeaderFormat: "YYYY年 MMMM"
        });
    }
    $('.stateDate').click(function () {
        $(this).find('.addOn').text('');
    })
};

var asideStatus = 1;
$('.navbar-brand ').on('click', function () {
    if (asideStatus == 1) {
        $('.navAside').fadeOut();
        $('.layoutbox').addClass('p-l-0');
        $('.layoutbox').removeClass('p-l-240');
        asideStatus = 2;
    } else {
        $('.navAside').fadeIn();
        $('.layoutbox').addClass('p-l-240');
        $('.layoutbox').removeClass('p-l-0');
        asideStatus = 1;
    }
})

function closeLayoutFade() {
    $('#layoutFade').hide();
}

//上传图片
var GUID = WebUploader.Base.guid();//一个GUID
var uploader = WebUploader.create({
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method: 'POST',
    host: '',
    // 选完文件后，是否自动上传。
    auto: 'auto',
    // swf文件路径
    swf: '../Content/scripts/plugins/webuploader/Uploader.swf',

    // 文件接收服务端。
    server: '',
    pick: '.uploaderBtn',

    chunked: false,//开始分片上传
    chunkSize: 2048000,//每一片的大小
    formData: {
        guid: GUID //自定义参数，待会儿解释
    },

    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: true,
    multiple: true,
    // compress:true
    threads: 1,//上传并发数。允许同时最大上传进程数。

});

var webUploaderPar = {
    auto: true,
    server: host + 'Image/UpdateImage?ImageType=0&AttchContent="logo& __RequestVerificationToken="' + $("input[name='__RequestVerificationToken']").val()
};

uploader.on('uploadStart', function (file) {
    var uploaderBtnID = file.source.ruid;
    uploader.options.server = webUploaderPar.server;
    $('#layoutShowLoading').fadeIn();
});

uploader.on('fileQueued', function (file) {
    /* uploader.makeThumb( file, function( error, ret ) {
     if(obj==0){
     $('#idenPic1').attr('src',ret);
     }else{
     $('#idenPic2').attr('src',ret);
     }
     });*/
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on('uploadSuccess', function (file, response) {
    var rel = response.msg;
    switch (rel) {
        case 'StatusOk': {
            var imgSrc = host + response.data;
            var url = window.location.href;
            if (url.indexOf('LayoutMobileUserInfo') > -1) {
                $('.avImg').attr('src', imgSrc);
            } else {
                $('#layoutLogo').attr('src', imgSrc);
            }
            showTips('Avatar changes successfully');
            break;
        }
        case rel: {
            showTips(getDescript(rel.msg));
            break;
        }
        default: {
            showTips('Upload failed');
        }
    }
    $('#layoutShowLoading').fadeOut();
});

uploader.on('uploadError', function (file) {
    showTips('Upload failed');
    $('#layoutShowLoading').fadeOut();
});

uploader.on("error", function (type) {
    if (type == "Q_TYPE_DENIED") {
        showTips("Upload JPG, JPEG, PNG format files");
    } else if (type == "F_EXCEED_SIZE") {
        showTips("File size must not exceed 3M");
    }
    $('#layoutShowLoading').fadeOut();
});


