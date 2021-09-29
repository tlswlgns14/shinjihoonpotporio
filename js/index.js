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
            count(70, '.html', 15)
            count(60, '.css', 16)
            count(80, '.script', 17)
            count(60, '.jquery', 18)
            count(50, '.react', 19)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
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
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
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
    .append('<button class="prev"><i class="fas fa-angle-left"></i></button><button class="next"><i class="fas fa-angle-right"></i></button>')
    $('.inlayer .close').css({
        border:'none',
        position:'absolute',
        top:'-25px', right:'-25px',
        backgroundColor:'none',
        color:'#fff',
        fontSize:'50px'
    })
    $('.inlayer .prev').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        left:'-100px', fontSize:'80px', color:'#fff',
        border:'none'
    })
    $('.inlayer .next').css({
        position:'absolute',
        top:'50%', transform:'translateY(-50%)',
        right:'-100px', fontSize:'80px', color:'#fff',
        border:'none'
    })
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

$(window).on('load', function(){
    var i = 0;
    var timer = setInterval(add, 25)

    function add(){
        i++
        if (i>=100) {
            clearInterval(timer)
            $('.introAni').animate({ left:'-100%' }, 500, function(){ 
                $(this).hide() 
            
                var cookie = document.cookie
                if ( cookie === "" || cookie === "popupYN=N" ) {
                    // window.open('문서경로', '창이름', '옵션(창크기, 창위치')
                    window.open('./popup.html', '', 'width=500, height=680, top=100, left=100, scrollbars=no, resizable=no')
                } 

            } )
        }
        $('.introAni div').eq(1).text(i+'%')
    }
})
