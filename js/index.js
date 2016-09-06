/**
 * Created by lhsquare on 2016/9/3.
 */
$(function(){


/*   �ֲ�ͼ   */

    function banner (){
        /*�����ֲ�ͼʱ��*/
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
            /*�жϵ�ǰ��Ļ��С �ƶ���С��768*/
            var width = $(window).width();
            var isMobile = false;
            if(width < 768){
                isMobile = true;
                /*�ƶ��˺����˵����ѡ�������*/
                $(".navbar-nav li").on('touchend',function(){
                    var jump = $('.floor').eq($(this).index()).offset().top;
                    var myJump = jump - 80;
                    $(".navbar-header button").addClass("collapsed").attr("aria-expanded",false);
                    $('body,html').stop().animate({'scrollTop':''+myJump+'px'},500);
                    $(".navbar-collapse").removeClass("in");
                })
            }

            /*��Ⱦģ��*/
            var pointTemplateStr = $('#point_template').html();
            var imageTemplateStr = $('#image_template').html();
            /*ת����ģ�溯��*/
            var pointTemplate = _.template(pointTemplateStr);
            var imageTemplate = _.template(imageTemplateStr);

            /*�������� ������ html �ַ�*/
            var pointHtml = pointTemplate({model:data});
            var imageHtml = imageTemplate({model:data,isMobile:isMobile});//����ֻ��Ҫ�ټ�һ������
            //console.log(imageHtml);
            /*��html�ַ�����Ⱦ��ҳ�浱��*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        }
        render();
        ///*������Ļ��С�ı�*/
        //$(window).on('resize',function(){
        //    render();
        //}).trigger('resize');

        /*����*/
        var startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
        $('.carousel-inner').on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;
        }).on('touchend',function(e){
            /*�������ľ��볬���� 50 ��ʱ�����Ϊ��һ������*/
            if( Math.abs(distanceX) > 50 && isMove){
                /*�ж����Ƶķ���*/
                if(distanceX > 0){
                    /*���һ� ��һ��*/
                    $('.carousel').carousel('prev');
                }else{
                    /*���� ��һ��*/
                    $('.carousel').carousel('next');
                }
            }
            /*���ò���*/
            startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
        });
    }
    banner()

/*�����ֱ�*/
    var myLi;
    $('.navbar-nav li a').hover(function() {
        myLi = $(this).html();
        $(this).html($(this).attr('myName'));
    },function(){
        $(this).html(myLi);
    });
    /*�������*/
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
/*΢��*/
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
