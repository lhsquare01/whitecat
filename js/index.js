/**
 * Created by lhsquare on 2016/9/3.
 */
$(function(){


/*   轮播图   */

    function banner (){
        /*设置轮播图时间*/
        $('.carousel').carousel({
            interval: 2000
        })
        var data =[
            {
                "bac":"image/1-l.jpg",
                "img":"image/1-s.jpg"
            },
            {
                "bac":"image/2-l.jpg",
                "img":"image/2-s.jpg"
            },
            {
                "bac":"image/3-l.jpg",
                "img":"image/3-s.jpg"
            },
            {
                "bac":"image/4-l.jpg",
                "img":"image/4-s.jpg"
            }
        ]
        var render = function(){
            /*判断当前屏幕大小 移动端小于768*/
            var width = $(window).width();
            var isMobile = false;
            if(width < 768){
                isMobile = true;
                /*移动端汉堡菜单点击选项后隐藏*/
                $(".navbar-nav li").on('touchend',function(){
                    var jump = $('.floor').eq($(this).index()).offset().top;
                    var myJump = jump - 80;
                    $(".navbar-header button").addClass("collapsed").attr("aria-expanded",false);
                    $('body,html').stop().animate({'scrollTop':''+myJump+'px'},500);
                    $(".navbar-collapse").removeClass("in");
                })
            }

            /*渲染模板*/
            var pointTemplateStr = $('#point_template').html();
            var imageTemplateStr = $('#image_template').html();
            /*转化成模版函数*/
            var pointTemplate = _.template(pointTemplateStr);
            var imageTemplate = _.template(imageTemplateStr);

            /*传入数据 解析成 html 字符*/
            var pointHtml = pointTemplate({model:data});
            var imageHtml = imageTemplate({model:data,isMobile:isMobile});//我们只需要再加一个属性
            //console.log(imageHtml);
            /*把html字符串渲染在页面当中*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        }
        render();
        ///*监听屏幕大小改变*/
        //$(window).on('resize',function(){
        //    render();
        //}).trigger('resize');

        /*滑动*/
        var startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
        $('.carousel-inner').on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;
        }).on('touchend',function(e){
            /*当滑动的距离超过了 50 的时候就认为是一个手势*/
            if( Math.abs(distanceX) > 50 && isMove){
                /*判断手势的方向*/
                if(distanceX > 0){
                    /*向右滑 上一张*/
                    $('.carousel').carousel('prev');
                }else{
                    /*向左滑 下一张*/
                    $('.carousel').carousel('next');
                }
            }
            /*重置参数*/
            startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
        });
    }
    banner()

/*导航字变*/
    var myLi;
    $('.navbar-nav li a').hover(function() {
        myLi = $(this).html();
        $(this).html($(this).attr('myName'));
    },function(){
        $(this).html(myLi);
    });
    /*点击导航*/
    $('.navbar-nav li').click(function(e) {

        var jump = $('.floor').eq($(this).index()).offset().top;
        var myJump = jump - 80;
        $('body,html').stop().animate({'scrollTop':''+myJump+'px'},500);
    });

    $('.wct_fixNav li').click(function(e) {

        var jump = $('.floor').eq($(this).index()).offset().top;
        var myJump = jump - 80;
        $('body,html').stop().animate({'scrollTop':''+myJump+'px'},800);
    });
/*微信*/
    $(".wct_fixNav span").on({
        mouseover:function(){
            //alert(1)
            $(".wct_fixNav i").show();
        },
        mouseleave:function(){
            $(".wct_fixNav i").hide();
        }
    })
})
