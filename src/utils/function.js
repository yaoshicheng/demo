import $ from 'jquery'

var InitDeviceNo = window.external.InitDeviceNo;
var CurrentVersion = window.external.CurrentVersion;
var VienAPIPath = window.external.VienAPIPath;
var OrderAPIPath = window.external.OrderAPIPath;
var alipayUserID;
var phoneNumber;
var Page = {};
var count = 0;

function NavigateToPage(url) {
  window.external.NavigateToPage(url);
}

//重新识别
$(".recognition").click(function () {
  NavigateToPage("PhoneNumber.html?PhoneNumber=" + GetUrlParms()['PhoneNumber']);
});


function ClosePlamControls(type) {
  var timer = setInterval(function () {
    clearInterval(timer);
    window.external.ClosePlamControls(type);
  }, 90000);
}

/**
 * 购物车
 */
function getGoodsMessage(Result) {
  $(".shoppingCart").html('');
  var result = $.parseJSON(Result);
  var str = "";
  var price = 0;
  var number = 0;
  var weight = 0;
  var Tip = "识别商品中，请耐心等待";
  if (window.external.IsDebug.toString() == "true") {
    $(".total-weight").show();
    $(".com-weight").show();
  }
  else {
    $(".total-weight").hide();
    $(".com-weight").hide();
  }
  if (result.checkoutCartList) {
    for (var i = 0; i < result.checkoutCartList.length; i++) {
      str += "<div class='goods'><span class='goods-name'>" + result.checkoutCartList[i].gdsName + "</span><span class='goods-number'>" + result.checkoutCartList[i].num + "</span><span class='goods-price'>" + result.checkoutCartList[i].marketPrice + "</span></div>"
      price += result.checkoutCartList[i].marketPrice * result.checkoutCartList[i].num;
      number += result.checkoutCartList[i].num;
      weight += result.checkoutCartList[i].weight * result.checkoutCartList[i].num;
    }
    $(".total-number").html("共" + number + "件");
    $(".total-price").html("￥" + price.toFixed(2));
    $(".total-weight").html("系统:" + weight);
    $(".com-weight").html("称重:" + result.comWeight);
  }
  if (result.status == 0) {//0检测中
    $(".errMsg").html("识别商品中，请耐心等待");
    $(".pay-button").hide();
    $(".total").show();
  }
  else if (result.status == 1) {//1有商品未入库
    $(".errMsg").html("有商品未入库");
    $(".pay-button").hide();
    $(".total").show();
  }
  else if (result.status == 2)
  {//2正常购物
    $(".errMsg").html("");
    $(".pay-button").show();
    $(".total").show();
    if (price.toFixed(2) > 200)
    {
      //TODO:hide the plam pay
      //$(".logo").attr('src', "img/alipay.png");
      var data = { product_barcode: InitDeviceNo, num: InitDeviceNo };
      for (var i = 0; i < result.checkoutCartList.length; i++) {
        data.product_barcode = result.checkoutCartList[i].product_barcode;
        data.num = result.checkoutCartList[i].num;
      }
      var list = [];
      list.push(data);
      var data = { InitDeviceNo: InitDeviceNo, BarcodeList: list };
      JSWriteLog("请求settleAccounts/qrcode，入参：" + JSON.stringify(data));
      PostRequset("/settleAccounts/qrcode", data, function (result) {
        JSWriteLog("请求result" + result);
        var pic = window.external.Getbase64Code(result)
        JSWriteLog("请求pic" + pic);
        $("#logo").attr('src', "data:image/png;base64," + pic);
      }, function (result) {
        $("#logo").attr('src', "img/weChat.png");
      });
    }
  }
  else
  {
    $(".errMsg").html("检测异常，请重新放置商品");
    $(".pay-button").hide();
    $(".total").show();
  }
  //JSWriteLog(window.external.FunIsDebug);
  $(".shoppingCart").prepend(str);



}

function GetStoreStatus(callback) {
  var data = { initDeviceNo: InitDeviceNo };
  var resultStatus;
  JSWriteLog("请求/common/getStoreStatus，入参：" + JSON.stringify(data));
  PostRequset("/common/getStoreStatus", data, function (result) {
    JSWriteLog("返回：" + JSON.stringify(result));
    if (result.resultCode == "1") {
      resultStatus = true;
    } else {
      resultStatus = false;
    }
    callback(resultStatus);
  });
  return resultStatus;
}

function JSWriteLog(strLog) {
  window.external.SaveLog(strLog);
}
/**
 * 手脉登陆识别
 */
function chkHandvein(phoneSuffix) {
  ClosePlamControls(1);
  $(this).palmload({
    palmTypeKey: 'check',
    callback: function () {
      loading();
      var identifyData = {
        "capture": $('#veinData').val(),
        "phoneSuffix": phoneSuffix
      };
      phoneNumber = phoneSuffix;
      VeinPostRequest("/api/grampus/palm/identify", identifyData, IdentifyCallBack);
    }
  });
}

function IdentifyCallBack(result) {
  if (result.resultCode.toString() == "1") {
    alipayUserID = result.data.palmRes.userId;
    LoginMemberStatus(alipayUserID);
  } else {
    NavigateToPage("RecognitionFail.html?PhoneNumber=" + phoneNumber);
    //JSWriteLog("识别失败，页面跳转RecognitionFail.html");
  }
}

function LoginMemberStatus(data) {
  var loginData = { "alipayUserID": data, "initDeviceNo": InitDeviceNo };
  alipayUserID = data;
  JSWriteLog("请求loginMemberStatus，入参:" + JSON.stringify(loginData));
  PostRequset("/memberInfo/loginMemberStatus", loginData, LoginSuccessCallBack);
}
function LoginSuccessCallBack(result) {
  JSWriteLog("请求loginMemberStatus，返回参数:" + JSON.stringify(result));
  switch (result.memberResult) {
    case "0":
      JSWriteLog("用户状态正常");
      PostRequset("/common/getShoppingToken", { "initDeviceNo": InitDeviceNo }, function (result) {
        if (result.resultCode == "1") {
          //生成订单
          window.external.Debit(alipayUserID, result.data); //开门
        } else {
          NavigateToPage("StopBusiness.html");
        }
      });
      break;
    case "1":
      JSWriteLog("有未支付订单");
      NavigateToPage("Order.html");
      break;
    case "2":
      JSWriteLog("已解约");
      NavigateToPage("AgainReg.html");
      break;

    case "3":
      JSWriteLog("用户错误");
      NavigateToPage("Abnormal.html");
      break;
    case "4":
    case "5":
      JSWriteLog("信用不足");
      NavigateToPage("CreditBad.html");
      break;
    default:
      JSWriteLog("用户错误");
      NavigateToPage("Abnormal.html");
      break;
  }
}




/**手脉注册调用**/
function registerHandvein(phoneNumber, userID) {
  ClosePlamControls(2);
  $(this).palmload({
    palmTypeKey: 'register',
    callback: function () {
      Page.veinData = $('#veinData').val();
      JSWriteLog("扫码注册:" + Page.veinData + "palm");
      alipayUserID = userID;
      SaveMember(phoneNumber, userID); //调用注册
    }
  });
}

function SaveMember(phoneNumber, userID) {
  Page.veinData = $('#veinData').val();
  CreatePersoon(phoneNumber, userID);
}

function CreatePersoon(phoneNumber, userID) {
  var vienData = {
    "mobile": phoneNumber,
    "userId": userID,
    "type": 1,
    "vein": Page.veinData
  };
  VeinPostRequest('/api/grampus/palm/operation/mobile', vienData, PersonCreateCallback);
}

function PersonCreateCallback(result) {
  JSWriteLog("手脉注册成功，结果:" + JSON.stringify(result));
  if (result.resultCode.toString() == "1" || result.resultCode.toString() == "5002") {
    NavigateToPage("RegSuccess.html?userID=" + alipayUserID);
  } else {
    NavigateToPage("RegFail.html");
  }
}

/**
 *
 * 手脉请求
 */
function VeinPostRequest(url, data, callback) {
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: VienAPIPath + url,
    timeout: 5000,
    data: JSON.stringify(data),
    cache: false,
    async: true,
    success: function (result, textStatus) {
      count = 0;
      callback(result);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      count++;
      if (count > 9) {
        count = 0;
        NavigateToPage("NetErr.html");
      }
      VeinPostRequest(url, data, callback);
    }
  });
}
//普通请求
function AjaxRequset(type, url, data, callback) {
  $.ajax({
    type: type,
    data: JSON.stringify(data),
    url: OrderAPIPath + url,
    contentType: "application/json",
    cache: false,
    async: true,
    timeout: 20000,
    success: function (result, textStatus) {
      count = 0;
      callback(result);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      count++;
      if (count > 9) {
        count = 0;
        NavigateToPage("NetErr.html");
      }
      AjaxRequset(type, url, data, callback);
    }
  });
}
function PostRequset(url, data, callback, errorCallBack) {
  JSWriteLog(url + data + "Post");
  AjaxRequset("Post", url, data, callback, errorCallBack);
}
function ShowVersionAndDeviceID() {
  $('.deviceID').html("设备号:" + InitDeviceNo);
  $('.version').html("版本号:" + CurrentVersion);
  autoClear();
}
function autoClear() {
  var count = 0;
  var timer = setInterval(function () {
    count++;
    if (count > 5) {
      $('.deviceID').html("");
      $('.version').html("");
      clearInterval(timer);
    }
  }, 1000);
}

/**
 * loading显示
 */
function loading() {
  $('body').append('<div class="box"></div><div class="box1"></div>');
}
/**
 * 实时时间
 */
setInterval(function () {
  var date = new Date();
  var now;
  var h = date.getHours();
  var m = date.getMinutes();
  if (m > -1 && m < 10) {
    now = h + ":" + "0" + m;
  } else {
    now = h + ":" + m;
  }
  $('.nowtime').text(now);
}, 100);


/**URL传值**/
function GetUrlParms() {
  var args = new Object();
  var query = location.search.substring(1); //获取查询串
  var pairs = query.split("&"); //在逗号处断开

  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('='); //查找name=value
    if (pos == -1) continue; //如果没有找到就跳过
    var argname = pairs[i].substring(0, pos); //提取name
    var value = pairs[i].substring(pos + 1); //提取value
    args[argname] = unescape(value); //存为属性
  }
  return args;
}


// 取消右击
document.oncontextmenu = function () {
  return false;
};

//取消文字选中  IE
document.onselectstart = function () {
  return false;
};

$('.pay-button').click(function () {
  GetStoreStatus(function (status) {
    if (!status) {
      window.external.CloseGravityPauseVision(0);
      return;
    } else {
      window.external.CloseGravityPauseVision(1);
    }
  });
})
$('.register').click(function () {
  GetStoreStatus(function (status) {
    if (!status) {
      window.external.CloseGravityPauseVision(0);
      return;
    } else {
      window.external.CloseGravityPauseVision(2);
    }
  });

})
$('.index-btn').click(function () {
  NavigateToPage("Index.html");
})
function timeJump() {
  setTimeout(function () {
    NavigateToPage("Index.html");
  }, 5000)
}