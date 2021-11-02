
    for(var i = 0; i < 40; i++) {
        var radius = (rnd(1600,3400)/10);
        var modifier = radius/160;
        $(".loader").append("<div class=\"spinner\" style=\"animation: bar " + 4*modifier + "s linear infinite; height: " + radius + "px; animation-delay: -" + (rnd(40,80)/10) + "s\"></div>");
     }
     
     var loaded = 0;
     function loader() {
        if(rnd(0,1) == 1) {
           loaded++;
           $(".spinner:nth-child(" + Math.floor(loaded/2.5) + ")").css("height", "0px");
           $(".loaded").css("width", (loaded + "%"));
        }
        if(loader >= 100) {
           clearInterval(runloader)
        }
        
     }
     var runloader = setInterval(loader,1); 
     
     function rnd(m,n) {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor( Math.random() * (n - m + 1) ) + m;
     }



     $(window).on('load', function(){
        skroll.recalcPosition();


        $('.loader').delay(4000).fadeOut()
        // "popupYN=Y", "popupYN=N"
        // 레이어 팝업 (오늘하루그만보기)
            var cookie = document.cookie
            console.log(cookie)
            var cookieArray = cookie.split(';')
            if ( cookie !== "" && cookieArray[0] === "popupYN=Y" ) {
                $('.popup').hide()
            } else {
                $('.popup').show()
            }
            $(".grid").isotope({
                filter:"*",
                layoutMode:'masonry',
                itemSelector:'.item',
            })
     })
    


     $('.popup a').on("click",function(){
        if ( $(this).prev().prev().prop('checked') ) {
            var d = new Date()
            d.setTime(d.getTime()+(24*60*60*1000))
            var expires = "expires="+d.toUTCString()
            document.cookie = "popupYN=Y;"+expires
     } else {
            document.cookie = "popupYN=N"
     }
        $('.popup').hide()
    })



$('html, body').stop().animate({
    scrollTop : 0
}, 1000)


$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a').on('click focus', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()
    if (num<1) {
        $('.skillContainer > div').find('.score').css({ height:'0%' })
        $('.skillContainer').removeClass('on')
    } else {
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(70, '.html', 15)
            count(60, '.css', 16)
            count(80, '.script', 17)
            count(60, '.jquery', 18)
            count(50, '.react', 19)
        }
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({
            transitionDelay:'0s'
        })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }
    
    if (num<3) {
        $('#sect4').removeClass('on')
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else {
        $('#sect4 .formbox').css({
            transitionDelay:'1s'
        })
        $('#sect4').addClass('on')
    }

    var secDist = $('section').eq(num).offset().top
    $('html, body').stop().animate({
        scrollTop : secDist
    }, 1000, function(){
        cflag = false
    })
})


function count(jumsu, cname, time) {
    let num = 0; 
    var stop = setInterval(function(){
        num++;
        if (num<=jumsu) {
            $(cname).find('.score').css({ height:num+'%', transition:'all 0s' })
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
            $(cname).find('.score').css({ transition:'all 1s' })
        }
    }, time)
}



var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top
var sDist3 = $('#sect4').offset().top

// 마지막구간이 윈도우높이보다 클때
// var lastSect = $('#sect4').offset().top             
// 마지막구간이 윈도우높이보다 작을때
var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    var sct = $(this).scrollTop()
    if(sct>=100) {
        $('.gotop').addClass('on')   
       } else if (sct<100) {
           $('.gotop').removeClass('on')
       }


    if ( sct>=sDist0 && sct<sDist1 && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer > div').find('.score').css({ height:'0%' })
        $('.skillContainer').removeClass('on')
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(95, '.html', 15)
            count(85, '.css', 16)
            count(50, '.script', 17)
            count(65, '.jquery', 18)
            count(50, '.react', 19)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else if ( sct>=sDist2 && sct< sDist3 && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else if ( sct>=sDist3 && sct<lastSect && !cflag ){
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(4).addClass('on')
        $('#menu li').eq(4).siblings().removeClass('on')
        $('#sect4').addClass('on')
    } 

})


$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 600)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 600)
    }
})


$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }

})


// 세번째 박스
var linum = 0;
$('#sect3 ul li a').on('click', function(e){
    e.preventDefault()
    linum = $(this).parent().index()
    var src = $(this).find('img').attr('src')
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var desc = $(this).attr('data-desc')
    var font = $(this).attr('data-font')
    var color1 = $(this).attr('data-color1')
    var color2 = $(this).attr('data-color2')
    var color3 = $(this).attr('data-color3')
    // console.log(src)
    $('body').append('<div class="outlayer"><div class="inlayer"><img src="" alt=""><div class="text"><h2></h2><p class="p1"></p><p class="p2"></p><p class="p3"><span></span><span></span></p></div></div></div>')
    $('.outlayer').css({ position:'fixed',
        backgroundColor:'rgba(0,0,0,0.8)',
        zIndex:99999, top:0, left:0, right:0, bottom:0
    })
    $('.inlayer')
    .css({ position:'relative',
        top:'50%', transform:'translateY(-50%)',
        width:'1000px', margin:'0 auto',
        textAlign:'center', fontSize:'20px', color:'#fff',
    })
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append(`<div><a href="${href}" target="_blank" title="${title}">사이트 이동하기</a></div>`)
    // .append('<button class="prev"><i class="fas fa-angle-left"></i></button><button class="next"><i class="fas fa-angle-right"></i></button>')
    $('.inlayer .close').css({
        border:'none',
        position:'absolute',
        top:'-25px', right:'-25px',
        backgroundColor:'none',
        color:'#fff',
        fontSize:'50px'
    })
    // $('.inlayer .prev').css({
    //     position:'absolute',
    //     top:'50%', transform:'translateY(-50%)',
    //     left:'-100px', fontSize:'80px', color:'#fff',
    //     border:'none'
    // })
    // $('.inlayer .next').css({
    //     position:'absolute',
    //     top:'50%', transform:'translateY(-50%)',
    //     right:'-100px', fontSize:'80px', color:'#fff',
    //     border:'none'
    // })
    $('.inlayer .text').css({
        display:'inline-block',
        width:'40%',
        height:'300px',
        backgroundColor:'#fff',
        verticalAlign:'middle',
        color:'#000'
    })
    $('.inlayer .text h2').text(title).css({
        fontSize:'30px',
        textAlign:'center',
        color:'green',
        margin:'10px 0'
    })
    $('.inlayer .text .p1').text(desc).css({
        padding:'10px',
        fontSize:'14px',
        marginBottom:'10px'
    })
    $('.inlayer .text .p2').text(font)
    $('.inlayer .text .p3 span').eq(0).before(color1)
    $('.inlayer .text .p3 span').eq(0).css({
        padding:'4px 30px',
        backgroundColor:color1,
        margin:'0 20px 0 5px'
    })
    $('.inlayer .text .p3 span').eq(1).before(color2)
    $('.inlayer .text .p3 span').eq(1).css({
        padding:'4px 30px',
        backgroundColor:color2,
        margin:'0 0 0 5px'
    })

    $('.inlayer img').attr('src', src).css({
        width:'50%',
        verticalAlign:'middle',
        marginRight:'10px'
    })
})


$('body').on('click', '.outlayer', function(){
    // p.498
    $('.outlayer').remove()
})

$('body').on('click', '.inlayer a, .inlayer img, .inlayer .text', function(e){
    e.stopPropagation()
})


function gallery(num) {
    let href = $('#sect3 ul li').eq(num).find('a').attr('href')
    let title = $('#sect3 ul li').eq(num).find('a').attr('title')
    let src = $('#sect3 ul li').eq(num).find('img').attr('src')
    let alt = $('#sect3 ul li').eq(num).find('img').attr('alt')
    $('.inlayer a').attr({
        'href' : href,
        'title' : title
    })
    $('.inlayer img').attr({
        'src' : src,
        'alt' : alt
    })
}

$('body').on('click', '.inlayer .next', function(e){
    e.preventDefault()
    e.stopPropagation()
    linum++
    if (linum>7) {
        linum = 0
    }
    gallery(linum)
})

$('body').on('click', '.inlayer .prev', function(e){
    e.preventDefault()
    e.stopPropagation()
    linum--
    if (linum<0) {
        linum = 7
    }
    gallery(linum)
})


// 햄버거 클릭시 메뉴박스 오픈하기
$('.open').on('click', function(){

    if ( !$(this).hasClass('on') ) {
        $(this).addClass('on')
        // $(this).find('i').removeClass('fa-times').addClass('fa-bars')
    } else {
        $(this).removeClass('on')
        // $(this).find('i').removeClass('fa-bars').addClass('fa-times')
    }

})

$('.openlist li a').click(function(){
    $('.open').removeClass('on');
});

$('.gotop a').on('click',function(e){
    e.preventDefault()
    $('html,body').animate({
        scrollTop:0
    },600)
})

// istope 플러그인 연결(갤러리필터링)
$(".category a").on("click", function(){
    var filterValue =  $(this).attr("data-filter")
     $(".grid").isotope({
         filter:filterValue,
         layoutMode:'masonry', // fitRows, masonry
         itemSelector:'.item',
     })
     return false
 })

 $('.article6 dt').eq(0).next().slideDown()
$('.article6 dt').on('click', function(){
    // $(this).toggleClass('on')
    $(this).next().slideToggle(500)

    if ( $(this).find('i').hasClass('fa-plus') ){
        $(this).find('i').addClass('fa-minus').removeClass('fa-plus')
    } else {
        $(this).find('i').addClass('fa-plus').removeClass('fa-minus')
    }
    // $(this).siblings('dt').removeClass('on')
    $(this).siblings('dt').next().slideUp(500)

    $(this).siblings('dt').find('i').removeClass('fa-minus').addClass('fa-plus')
})

$('.article6 dt a').on('click',function(e){
    e.preventDefault()
    //e.stopPropagation()
})


// duration(진행시간), wait(대기시간), 
    // delay(같은줄에 있는 동일클래스들간의 간격시간),
    // repeat:true (반복가능)
    var skroll = new Skroll()
    .add(".sk1", {animation:"zoomIn", duration:1000, wait:500, delay:300, repeat:true
})
    .add(".sk2", {animation:"fadeInUp", duration:1000, delay:300, repeat:true
})
    .add(".sk3", {animation:"fadeInLeft", duration:1000, delay:300, repeat:true})
    .add(".sk4", {animation:"fadeInUp", duration:1000, delay:300, repeat:true})
    .add(".sk5", {animation:"fadeInRight", duration:1000, delay:300, repeat:true})
    // .add(".sk4", {animation:"rotateRightIn", duration:1000})
    .init()
