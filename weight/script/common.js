/**
 * Created by PhpStorm.
 * User: 835173372@qq.com
 * NickName: 半城村落
 * Date: 2016/9/2 16:04
 */

var Baseurl = 'http://wx.qgnix.cn/index.php';//App全局域名

/**
 *
 * 首页数据操作
 */
var index_goodsUrl = Baseurl+'/app/index/goods_list';
var goods_detailUrl = Baseurl+'/app/index/goods_detail';
var goods_category_listlUrl = Baseurl+'/app/index/goods_category_list';//商品分类


/**
 *
 * 用户中心操作
*/
var loginUrl = Baseurl+'/app/base/login';//登录
var registerUrl = Baseurl+'/app/member/register';//注册
var smscode_registerUrl = Baseurl+'/app/member/sendsms';//注册获取验证码

var resetpasswordUrl = Baseurl+'/app/member/resetPassword';//重置密码
var resetpassword_sendsmsUrl = Baseurl+'/app/member/resetPassword_sendsms';//重置密码获取验证码
var add_update_addressUrl =  Baseurl+'/app/member/add_update_address';//添加或则更新地址

/**
 *
 * 购物车操作
 */
var add_to_cartsUrl =  Baseurl+'/app/member/add_to_cart';//购物车加1/n
var cutdown_to_cartsUrl =  Baseurl+'/app/member/cutdown_to_cart';//购物车减1/n
var add_collectUrl =  Baseurl+'/app/member/add_collect';//添加收藏
var cart_listtUrl =  Baseurl+'/app/member/cart_list';//购物车数据列表
var delete_to_cartUrl =  Baseurl+'/app/member/delete_to_cart';//购物车删除一条记录
var collect_listtUrl =  Baseurl+'/app/member/collect_list';//我的收藏列表
var delete_collecttUrl =  Baseurl+'/app/member/delete_collect';//删除收藏一条记录
var update_cart_numberUrl =  Baseurl+'/app/index/update_cart_number';//删除收藏一条记录

/**
 *
 * 订单操作
 */
var create_ordertUrl =  Baseurl+'/app/member/create_order';//创建订单
var after_create_orderUrl =  Baseurl+'/app/member/after_create_order';//订单展示
var order_goods_listUrl =  Baseurl+'/app/member/order_goods_list';//订单商品列表
var update_order_addressUrl =  Baseurl+'/app/member/update_order_address';//确认订单过程中更新收货地址操作
var order_listUrl =  Baseurl+'/app/member/order_list';//订单列表
var order_pay_daofuUrl =  Baseurl+'/app/member/order_pay_daofu';//订单支付-货到付款
var order_pay_alipayfuUrl =  Baseurl+'/app/member/order_pay_alipay';//订单支付-支付宝
var delete_orderUrl =  Baseurl+'/app/member/delete_order';//删除订单


//关闭当前窗口
function closeme() {
    api.closeWin();
}

//打开商品详情
function openwin_goods_detail(id) {
    if(!id){
       return false;
    }
    api.openWin({
        name: 'goods_detail_win',
        url: 'widget://html/goods/goods_detail_win.html',
        pageParam: {
            id: id
        }
    });
}

//打开商品gallery相册
function openwin_goods_gallery(id) {
    if(!id){
        return false;
    }
    api.openWin({
        name: 'goods_gallery',
        url: 'widget://html/goods/goods_gallery.html',
        pageParam: {
            id: id
        }
    });
}

//验证登录状态，设置直接的登录
function is_login() {
    var is_login = parseInt($api.getStorage('is_login'));
    if(is_login == 1){
        return true;
    }else{
        return false;
    }

}

//购物车加1/n
function add_to_cart(id) {
    var minfo = $api.getStorage('minfo');
    if(parseInt(id) == 0){
        api.alert('非法操作');
    }
    if(is_login()){
        api.ajax({
            url: add_to_cartsUrl,
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                values: {
                    id: id,
                    token: minfo.token,
                    deviceid: api.deviceId,
                }
            }
        }, function (ret, err) {
            if (ret) {
                if(ret.status == 1){
                    api.sendEvent({
                        name: 'update_cart_number',//更新购物车全局显示数量
                        extra: {
                            status: 1
                        }
                    });
                }else{
                    api.toast({
                        msg: '添加失败',
                        duration: 2000,
                        location: 'bottom'
                    });
                }
            }
        });
    }else{
        api.openWin({
            name: 'login',
            url: 'widget://html/member/login.html'//登录
        });
    }
}
//购物车减1/n
function cutdown_to_cart(id) {
    var minfo = $api.getStorage('minfo');
    if(parseInt(id) == 0){
        api.alert('非法操作');
    }
    if(is_login()){
        api.ajax({
            url: cutdown_to_cartsUrl,
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                values: {
                    id: id,
                    token: minfo.token,
                    deviceid: api.deviceId,
                }
            }
        }, function (ret, err) {
            if (ret) {
                if(ret.status == 1){
                    api.sendEvent({
                        name: 'update_cart_number',//更新购物车全局显示数量
                        extra: {
                            status: 1
                        }
                    });
                }else{
                    api.toast({
                        msg: '操作失败',
                        duration: 2000,
                        location: 'bottom'
                    });
                }
            }
        });
    }else{
        api.openWin({
            name: 'login',
            url: 'widget://html/member/login.html'//登录
        });
    }
}
//添加收藏
function add_collect(id) {
    var minfo = $api.getStorage('minfo');
    if(parseInt(id) == 0){
        api.alert('非法操作');
    }
    if(is_login()){
        api.ajax({
            url: add_collectUrl,
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                values: {
                    id: id,
                    token: minfo.token,
                    deviceid: api.deviceId,
                }
            }
        }, function (ret, err) {
            if (ret) {
                if(ret.status == 1){
                    api.toast({
                        msg: ret.msg,
                        duration: 2000,
                        location: 'bottom'
                    });
                }else{
                    api.toast({
                        msg: ret.msg,
                        duration: 2000,
                        location: 'bottom'
                    });
                }
            }
        });
    }else{
        api.openWin({
            name: 'login',
            url: 'widget://html/member/login.html'//登录
        });
    }
}
//跳转到购物车
function jump_add_cart() {
    api.sendEvent({
        name: 'show_goods_cart'
    });
    api.closeWin({
        name: 'collect_win'
    });
    closeme();
}

//创建订单
function create_order() {
    var minfo = $api.getStorage('minfo');
    if(is_login()){
        api.ajax({
            url: create_ordertUrl,
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                values: {
                    token: minfo.token,
                    deviceid: api.deviceId
                }
            }
        }, function (ret, err) {
            if (ret) {
                if(ret.status == 1){
                    api.openWin({
                        name: 'createorder_win',
                        url: 'widget://html/cart/createorder_win.html',
                        pageParam: {
                            order_id: ret.data.order_id
                        }
                    });
                }else{
                    api.toast({
                        msg: ret.msg,
                        duration: 2000,
                        location: 'bottom'
                    });
                }
            }
        });
    }else{
        api.openWin({
            name: 'login',
            url: 'widget://html/member/login.html'//登录
        });
    }
}

//打开订单商品
function open_ordergoodslist_win(order_id) {
    api.openWin({
        name: 'ordergoodslist_win',
        url: 'widget://html/cart/ordergoodslist_win.html',
        pageParam: {
            order_id: order_id
        }
    });
}