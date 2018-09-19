var llllllll = true;
function isAddOrOrder(a,b){
    // var orderList;
    var bool = false;
    $.ajax({
        url: 'https://www.hsjbg.top/bookDinner/staff/getByDateAndOpenid',
        type:"POST",
        dataType:"json",
        async:false,
        data:{
            openid:localStorage.openid
        },
        success:function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (Date.parse(data[i].date.replace(/-/g, '/'))<Date.parse(new Date())) {
                    if (data[i].breakfast==b&&a) {
                        bool = true;
                    }
                }else {
                    if (data[i].breakfast==b&&!a) {
                        bool = true;
                    }
                }
            }
        },

    });
    return bool;

}
$('.radio>.btn').on('click',function () {
	$('.radio>.btn').attr("class","btn");
	$(this).attr("class", "btn checkBtn");
});
$('.btnBox>.btn').on('click',function () {
    $('.btnBox>.btn').attr("class","btn");
    $(this).attr("class", "btn checkBtn");
});
function addOrder() {
    
    if($('.btnBox .checkBtn').length <= 0){
        alert("请选择用餐类型");
        return;
    }
    if(!llllllll){
        return;
    }
    llllllll = false;
    // $('.addOrder').attr('onclick','');
    var url;
    var breakfast=null;
    var lunch=null;
    var dinner=null;
    var breakfastP = null,
        ap = null,
        bp = null,
        cp = null;
    var totalFee=0;
    var name = window.localStorage.getItem("userName");
    var tel = window.localStorage.getItem("userTel");
    var openid = window.localStorage.getItem("openid");
    var factory = $('.radio>.checkBtn').text();
    var x=$('.btnBox>.checkBtn')[0].id;
    var aaaaa =false;
    console.log(x);
    console.log(factory);
    var nnnn = '1000'+ Math.floor(Math.random()*9999);
       var outTradeNo = Date.parse(new Date())+nnnn[nnnn.length-3]+nnnn[nnnn.length-2]+nnnn[nnnn.length-1];
    $.ajax({
        type:"POST",
        url: "https://www.hsjbg.top/bookDinner/meals/getPrice",
        dataType:"json",
        async:false,
        success:function(data){
            console.log(data);
                lunch=data.lunch;
                dinner=data.dinner;
                breakfastP = data.breakfast;
                ap=data.a;
                bp = data.b;
                cp = data.c;

        },
    });
   
    switch (Number(x)) {
                    case 1:
                        console.log(111111111111111111111111)
                        url ="/staff/today";
                        breakfast=b;
                        if(b==0){
                            totalFee=bp;
                        }else if(b==1){
                            totalFee=cp;
                        }else if(b==2){
                            totalFee=ap;
                        }
                    
                        aaaaa = true;
                    break;
                    case 2:
                        url ="/staff/tomorrow";
                        breakfast=0;
                        totalFee=lunch;
                        aaaaa=false;
                    break;
                    case 3:
                        url ="/staff/tomorrow";
                        breakfast=1;
                        totalFee=dinner;
                        aaaaa=false;
                        break;
                    case 4:
                        url ="/staff/tomorrowBreakfast";
                        breakfast=2;
                        totalFee=breakfastP;
                        aaaaa=false;
                        break;
                    default:
                        console.log(45555555555555)
                        break;
                   }
                console.log(url+'====='+breakfast+"===="+totalFee)
       if(isAddOrOrder(aaaaa,breakfast)){
            llllllll = true;

            alert('已经订过了');
            return;
       }
   $.ajax({
    type:"POST",
    url: 'https://www.hsjbg.top/bookDinner'+url,
    data:{
        openid:openid,
        breakfast:breakfast,
        lunch:totalFee,
        empty2:factory,
        empty3:outTradeNo
    },
    success:function(res) {
        if (res.msg == 'OK') {
            $.ajax({
                type: "POST",
                url: "https://www.hsjbg.top/bookDinner/wxpay/unifiedOrder",
                dataType: "json",
                async: false,
                data: {
                    body: "bookDinner",
                    totalFee: totalFee*100,
                    openid: openid,
                    outTradeNo:outTradeNo
                },
                success: function (data) {
                    setTimeout(function(){
                       llllllll = true;

                    },1000)
                    // alert(data.outTradeNo)
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":data.appId,     //公众号名称，由商户传入
                            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr":data.nonceStr, //随机串
                            "package":data.package,
                            "signType":"MD5",         //微信签名方式：
                            "paySign":data.paySign //微信签名
                        },
                        function(res){
                            // alert(JSON.stringify(res));
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                    );
                },

            });
        } else {
            llllllll = true;
            alert(res.data);


        }
    }// window.location.h
})

    

}



function addClientOrder() {
    var clientname=$('#clientname').val();//手机号
    var clientnumber = $('#clientnumber').val();//份数
    var company = $('#company').val();//单位名称
    var proposertel = $('#proposertel').val();//申请人
    var factory = $('.radio>.checkBtn').text();

    if(clientname&&clientnumber&&company&&proposertel&&factory){

        if($('.btnBox>.checkBtn').length <= 0){
            alert("请选择用餐类型")
        }   else    {

    var name = window.localStorage.getItem("userName");
    var tel = window.localStorage.getItem("userTel");
    var openid = window.localStorage.getItem("openid");

    var x=$('.btnBox>.checkBtn')[0].id;
    console.log(x);
    console.log(factory);
            $.ajax({
                url: 'https://www.hsjbg.top/bookDinner/date/req',
                type: "POST",
                crossDomain: true,
                async:false,
                success: function(res) {
                    console.log(res);
                    // if(res.breakfast){
                    //     b=0;//定午餐
                    // }else{
                    //     $('#4').hide();
                    // }
                    if(res.clunch){
                        b=0;//定午餐
                    }else{
                        $('#0').hide();
                    }
                    if(res.cdinner){
                        b=1;//定晚餐
                    }   else    {
                        $('#1').hide();
                    }

                }
            });



    $.ajax({

        type:"POST",
        url: "https://www.hsjbg.top/bookDinner/clien/addStatement",
        async:false,
        data:{
            breakfast:openid,
            clientname:clientname,
            company:company,
            proposertel :proposertel,
            dinner:x>0?"晚餐":"午餐",
            empty2:factory,
            clientnumber:clientnumber,
        },

        success:function(data){
            console.log(data);
            alert("申请成功，等待审核")

        },
        error:function(data){
            alert("error");
        }
    })
    }  
    } else    {
        alert("请填完所有信息")
    }
    
}




