var varUA = navigator.userAgent.toLowerCase();

var delay = 300;
var timer = null;
var container = [];
var ratio = 1;

// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    $(".gift-send").click(function () {
        $("#gift-name").text($(this).data("name"));
    })


    $("#reserveGiftButton").click(function () {
        let name = $("#sender-name").val();
        let message = $("#sender-message").val();
        $("#reserveGiftButton").text("전송중...");
        $("#reserveGiftButton").prop("disabled", true);

        emailjs.init("user_yjLL5xG0A3kkOCH5BGIDh");
        emailjs.send("wedding-mail", "gift_send", {
            name: name,
            gift: $("#gift-name").text(),
            message: message
        }).then(function (response) {
            $('#giftMailModal').modal('hide');
            alert(name + "님의 메시지가 정상적으로 전송되었습니다.");

            $("#reserveGiftButton").text("예약하기!");
            $("#sender-name").val('');
            $("#sender-message").val('');
            $("#reserveGiftButton").prop("disabled", false);
        }, function (err) {
            alert("메시지 전송이 실패했습니다. 다시 시도해주세요.");
        });
    })

    //클립보드 복사 - 안드로이드 제외 클릭 이벤트
    $("a.copy_url").on('click', function (e) {
        e.preventDefault();
        copyToClipboard($(this).attr("href"));

        if (varUA.indexOf('android') > -1) {
            return false;
        } else {
            toastPopup('URL이 복사되었습니다.', 1500);
        }
    });
    
    //계좌번호 팝업
    $("a.an_btn").on('click', function (e) {
        e.preventDefault();
        $('div.account_pop').hide();

        var idx = $(this).attr('data-idx');
        $('div.account_pop').each(function(i, popitem) {
            if ($(popitem).attr('data-idx') == idx) {
                $(popitem).show();
                scrollDisable();
            }
        });
    });
    //계좌번호 팝업 닫기
    $('.btn_acc.close').on('click', function (e) {
        e.preventDefault();
        $('div.account_pop').hide();
        scrollAble();
    });
    
    //계좌 클립보드 복사
    $("a.copy_account").on('click', function (e) {
        e.preventDefault();
        var account = $(this).attr('data-account');
        var copyacc = account.replace(/-/g, "");
        copyToClipboard(copyacc);

        if (varUA.indexOf('android') > -1) {
            return false;
        } else {
            toastPopup('복사되었습니다.', 1500);
        }
    });
})


//클립보드 복사
var copyToClipboard = function (text) {
    var aux = document.createElement("textarea");
    aux.value = text;
    document.body.appendChild(aux);
    aux.select();
    aux.setSelectionRange(0, 9999);
    document.execCommand("copy");
    document.body.removeChild(aux);
};

//팝업창 표시
var toastPopup = function (msg, timer) {
    var $elem = $("<p>" + msg + "</p>");

    $("div.toast").html($elem).show();

    $elem.slideToggle(100, function () {
        setTimeout(function () {
            $elem.fadeOut(function () {
                $(this).remove();
                $('div.toast').css('bottom', '');
            });
        }, timer);
        return false;
    });

    $('div.toast').stop().animate({ 'bottom': '5%' });
};

//스크롤 방지 이벤트
var scrollDisable = function () {
    $('body').addClass('scroll_off').on('scroll touchmove mousewheel');
}

//스크롤 방지해제 이벤트
var scrollAble = function () {
    $('body').removeClass('scroll_off').off('scroll touchmove mousewheel');
}


// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
