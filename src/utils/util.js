import $ from 'jquery'

/**
 * 弹出loading界面,一般在收集掌脉信息时调用
 * */
function loading() {
  $('body').before('<div class="box-loading-border"></div><div class="box-loading"></div>');
}

/**
 * 关闭loading界面,在掌脉信息上传成功后调用
 * */
function closeLoading() {
  $('.box-loading-border, .box-loading').remove();
}

export  default {loading,closeLoading}