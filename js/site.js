$(function () {
  const event_id = 'dba9339c-625d-453a-b86c-f0d360511b62';
  const ticket_id = '6176';
  const konfHubValidateUrl = 'https://api.konfhub.com/v2/validate';
  const konfHubFormSubmitUrl = 'https://api.konfhub.com/event/capture/v2';
  const eventName = 'AWS Community Day India - Virtual Edition 2022';
  let isEmailValid = false;
  let isPhoneNumberValid = false;
  // if(window.location.href.includes("referred_by")){
    
  // }
  const otp_button = document.getElementById("otp-button");
  const otp_input = document.getElementById("form-reg-otp");
  const otp_verify_button = document.getElementById("otp-verify-button");
  tableScroll();
  
  if ($(window).width() < 996) {
    toastScroll();
  }

  $(document).on("click", ".scroll", function () {
    $("html, body").animate(
      {
        scrollTop: $(window).height() - 70
      },
      500
    );
  });

  // Show and Hide the Errors for inputs
const showAndHideValueError = (key, msg) => {
  $(`#${key}`).html(msg).css("color", "red");
  // document.getElementById("name-empty").style.border = "1px solid red !important"
};
//Show and Hide the success for inputs
const showAndHideValueSuccess = (key, msg) => {
  $(`#${key}`).html(msg).css("color", "green");
  // document.getElementById("name-empty").style.border = "1px solid red !important"
};

  $(function () {
    $(document).on("click", ".ven", function () {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      var latt = parseFloat($(this).attr("data-lat"));
      var lngg = parseFloat($(this).attr("data-lng"));
      var labb = $(this).attr("data-label");
      // console.log(latt + " - " + lngg);
      setCoords(latt, lngg, labb);
    });
    $(document).on("click", "#toggle", function () {
      $(this).toggleClass("on");
      $("#nav-bar").toggleClass("active");
    });
    $("#link").click(function () {
      var src = "https://www.youtube.com/embed/t08KFuSgUZE?&autoplay=1&mute=1";
      $("#myModal").modal("show");
      $("#myModal iframe").attr("src", src);
    });

    $("#myModal button").click(function () {
      $("#myModal iframe").removeAttr("src");
    });
    $(document).on("click", "#nav-bar ul li", function () {
      $("#nav-bar").removeClass("active");
      $("#toggle").removeClass("on");
    });
    $(".section.hdr").css({
      paddingTop: $(".section.hdr > .content").height()
    });
  });

  function toastScroll() {
    var sections = $(".section");
    var targets = [
      "#com_info",
      "#ticktes",
      "#venues",
      "#agenda",
      "#workshop",
      "#sponsors",
      "#speakers",
      "#volunteers",
      "#subscribe"
    ];
    var text = [
      "About Community Day",
      "Buy Tickets",
      "Venues",
      "Agenda",
      "Workshops",
      "Sponsors",
      "Speakers",
      "Volunteers",
      "Share"
    ];
    var secidx = 0;
    $.map(sections, function (val, i) {
      if ($(this).scrollTop() > val.offsetTop) {
        secidx = i + 1;
      }
    });
    if (
      $(this).scrollTop() + $(this).height() >
      $("#volunteers").offset().top
    ) {
      $(".floating_toast a")
        .attr("href", "#home")
        .text("Goto Top");
    } else {
      $(".floating_toast a")
        .attr("href", targets[secidx])
        .text("Goto " + text[secidx]);
    }
  }

  document.getElementById("serverless-workshop").onclick = function () {
    let serverless = "https://konfhub.com/checkout/acd2022-serverless?ticketId=6451";
    window.open(serverless, '_blank');
};

  document.getElementById("data-analytics-workshop").onclick = function () {
    let data_analytics = "https://konfhub.com/checkout/acd2022-data?ticketId=6453";
    window.open(data_analytics, '_blank');

};

  document.getElementById("aiml-workshop").onclick = function () {
    let aiml = "https://konfhub.com/checkout/acd2022-al-ml?ticketId=6452";
    window.open(aiml, '_blank');
};


  function tableScroll() {
    if (
      $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
      $(this).scrollTop() < $(".table").offset().top + $(".table").height()
    ) {
      $(".table").addClass("fixit");
      $(".table").removeClass("absit");
    } else if (
      $(this).scrollTop() > $(".table").offset().top - $("#nav-bar").height() &&
      $(this).scrollTop() > $(".table").offset().top + $(".table").height()
    ) {
      $(".table").addClass("absit");
      $(".table").removeClass("fixit");
    } else if (
      $(this).scrollTop() <
      $(".table").offset().top - $("#nav-bar").height()
    ) {
      $(".table")
        .removeClass("absit")
        .removeClass("fixit");
    }
  }

  $(document).scroll(function () {
    $(".section.hdr > .content").css({
      top: 0 - $(this).scrollTop() / 1.5,
      opacity: 1 - $(this).scrollTop() / $(".section.hdr > .content").height()
    });
    if ($(this).scrollTop() < $(".section.hdr > .content").height()) {
      $(".section.hdr").css({
        background:
          "rgba(0,0,0," +
          $(this).scrollTop() / $(".section.hdr > .content").height() / 0.25 +
          ")"
      });
    }

    tableScroll();

    if ($(window).width() < 996) {
      toastScroll();
    }

    if ($(this).scrollTop() >= $(".section.hdr > .content").height()) {
      $("#nav-bar").addClass("fixi-it");
      $("body").css({
        paddingTop: $("#nav-bar").height()
      });
    } else {
      $("#nav-bar").removeClass("fixi-it");
      $("body").css({
        paddingTop: 0
      });
    }
  });

  $(document).on("click", "a", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70
        },
        700
      );
    }
  });

  const phoneNumber = document.querySelector("#phone_number")

  var iti = window.intlTelInput(phoneNumber, {
    nationalMode: true,
    // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    placeholderNumberType: "MOBILE",
    // preferredCountries: ['cn', 'jp'],
    separateDialCode: true,
    utilsScript: "js/utils.js",
  });

  // User acknowledgements for:
  // AWS Event SMS and WhatsApp updates
  // Konfhub Future contact
  // Konfhub Data share 
  $('.js-terms-conditions').click(function () {
    cb = $(this);
    cb.val(cb.prop('checked'));
  });

  //For UTM Parameters
  let utmParams = null;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const utmParametersObj = Object.fromEntries(urlSearchParams.entries());
  if (
    utmParametersObj.hasOwnProperty("utm_source") ||
    utmParametersObj.hasOwnProperty("utm_medium") ||
    utmParametersObj.hasOwnProperty("utm_campaign")
  ) {
    utmParams = utmParametersObj;
    // console.log(utmParams);
  }

  //referral params
  let referredBy = null;
  let referralMode = null;
  let url_string = window.location.href;
  let referral_url = new URL(url_string);

  if (referral_url.searchParams.has("referred_by")) {
    referredBy = referral_url.searchParams.get("referred_by");
    referralMode = referral_url.searchParams.get("referral_mode");
    
    otp_button.classList.remove("d-none");
  } else {
    referredBy = null;
    referralMode = null;
  }

  //otp
  const loadingAndUnloadingButton = (id, isLoading, text) => {
    if (id == "otp-button") {
      return $(`#${id}`).html(
        isLoading ? `<i class="fa fa-spinner fa-spin"></i>` : text
      );
    }
    $(`#${id}`).prop("disabled", isLoading);
  $(`#${id}`).html(isLoading ? `<i class="fa fa-spinner fa-spin"></i>` : text);
  };

  $("#otp-button").click(function () {
    myOtp();
  });
  
  const myOtp = () => {
    
    var email = document.getElementById("email").value;
    loadingAndUnloadingButton("otp-button", true, "");
    //countdown timer for resend OTP
    // console.log(email);
    if (email === "" && !pattern.test(email)) {
      $("#emailStatus").show();
      showAndHideValueError("emailStatus", "Please enter valid Email id");
      loadingAndUnloadingButton("otp-button", false, "Send OTP");
      return null;
    }
    else{
      sendOtp(email);

    }
    
  };

  let disableFun = function () {
    $("#otp-button").prop("disabled", false);
  };

  const sendOtp = (email) => {
    $("#otp-button").attr("disabled", true);
    var counter = 30;
    var interval = setInterval(function () {
      counter--;
      // Display 'counter' wherever you want to display it.
      if (counter <= 0) {
        clearInterval(interval);
        $("#otp-button").html(`Resend OTP`);
        return;
      } else {
        $("#otp-button").html(`Resend OTP (${counter})`);
      }
    }, 1000);
    setTimeout(disableFun, 30000);
    $.ajax({
      type: "GET",
      url: `https://api.konfhub.com/event/${event_id}/referral/otp?event_name=${eventName}&email_id=${email}`,
      success: (res) => {
        otpsentFlag = true;
        $("#otp_error").css("display", "block");
        $("#email").prop("disabled", true);
        otp_input.classList.remove("d-none");
        $("#emailStatus").show();
        showAndHideValueSuccess("emailStatus", "OTP sent");
        otp_verify_button.classList.remove("d-none");
        loadingAndUnloadingButton("otp-button", false, "Resend OTP");
      },
      error: (res) => {
        // console.log(res);
        loadingAndUnloadingButton("otp-button", false, "Send OTP");
      },
    });
  };

  let otpVerifyFlag;
  const isReferral = window.location.href.includes("referred_by");
  
  //validate otp
  $("#otp-verify-button").on('click',function () {
    if(otp_input.value){
      validateOtp();
    }
  });
  const validateOtp = () => {
    return new Promise((resolve, reject) => {
      
      if (otp_input.value.length !== 4 && otp_input.value === "") {
        
        showAndHideValueError("otp_error", "Please Enter valid OTP");
        return null;
      }
  
      var email = document.getElementById("email").value;
      $.ajax({
        type: "POST",
        url: `https://api.konfhub.com/event/${event_id}/referral/otp`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          email_id: email,
          otp: otp_input.value,
        }),
        success: (res) => {

          if (res.message.otp_verified) {
            otpVerifyFlag = true;
            $("#otp_error").css("display", "none");
            $("#otp-button").hide();
            $("#form-reg-otp").css("display", "none");
            $("#otp-verify-button").css("display", "none");
            $("#otp_2_error").css("display","none");
            $("#emailStatus").show();
            showAndHideValueSuccess("emailStatus", "OTP verified");
  
            resolve(res);
          } else {
            showAndHideValueError("otp_error", "Please Enter valid OTP");
          }
        },
        error: (res) => {
          loadingAndUnloadingButton("form-submit-btn", false, "Register");
          $("#email").prop("disabled", false);
          showAndHideValueError("otp_error", "Please Enter valid OTP");
          reject(res);
        },
      });
    });
  };

  //submit button
  const onFormSubmit = event => {
    event.preventDefault();
    if (!isEmailValid || !isPhoneNumberValid) {
      return;
    }
    loadingAndUnloadingButton("form-submit-btn", true, "Register");
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var designation = document.getElementById("designation").value;
    var organisation = document.getElementById("organisation").value;

    var city = document.getElementById("city").value;
    var consent = document.getElementById("idChk-normal").value;
    var trainingCloud = document.getElementById("training-check").value;
    var otherConsent = document.getElementById("konf-aws").value;
    
    var phone = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    
    var otp = window.location.href.includes("referred_by")? document.getElementById("form-reg-otp").value: null;
    if (!otpVerifyFlag && isReferral) {
      showAndHideValueError("otp_2_error", "Please verify OTP");
      loadingAndUnloadingButton("form-submit-btn", false, "Register");
      error = true;
    }
    let dataBody = {
      event_id,
      "utm": utmParams,
      "otp": otp,
      "consents": {
        is_subscriber: Boolean(trainingCloud),
        consent_to_organiser: Boolean(consent),
        konfhub_consent: true,
        other_consents: {
          "b73c23": Boolean(otherConsent)
        },
      },
      "registration_details": {
        "6176": [
          {
            "name":name,
            "email_id": email,
            "designation": designation,
            "organisation":organisation,
            "country_code": "in",
            "dial_code": "+91",
            "phone_number": $('#phone_number').val(),
            "whatsapp_number": phone,
            "country": "India",
            "referred_by": referredBy,
            "referral_mode": referralMode,
            "referral_campaign_id": window.location.href.includes("referred_by")?386: null,
            "custom_forms": {
              "16796": city
            },
          }
        ]
      }
    };

    if (phone.length <= 13) {
      if(referral_url.searchParams.has("referred_by")){
        if(otpVerifyFlag){
          const settings = {
            "url": konfHubFormSubmitUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(dataBody),
          };
          document.getElementById("register-btn").disabled = true;
        
          $.ajax(settings).done(function (response) {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("designation").value = "";
            document.getElementById("organisation").value = "";
            document.getElementById("phone_number").value = "";
            document.getElementById("city").value = "";
            document.getElementById("idChk-normal").checked = false;
            document.getElementById("konf-aws").checked = false
            document.getElementById("register-btn").disabled = false;
            $('#register').modal('hide');
            // snackbar alert open 
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
            $("#workshop_modal").modal();
            $("#workshop_modal").on("show", function () {
              $("body").addClass("modal-open");
            }).on("hidden", function () {
              $("body").removeClass("modal-open")
            });
            var aTag = document.getElementById("referral_link");
            var bookingId = (response && response.booking_id) ? response.booking_id : null;
            aTag.href = "https://communityday.awsug.in/?utm_source=" + bookingId + "&utm_medium=email&utm_campaign=referral";
          });
        }
      }
      else{
        const settings = {
          "url": konfHubFormSubmitUrl,
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify(dataBody),
        };
        document.getElementById("register-btn").disabled = true;
      
        $.ajax(settings).done(function (response) {
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("designation").value = "";
          document.getElementById("organisation").value = "";
          document.getElementById("phone_number").value = "";
          document.getElementById("city").value = "";
          document.getElementById("idChk-normal").checked = false;
          document.getElementById("konf-aws").checked = false
          document.getElementById("register-btn").disabled = false;
          $('#register').modal('hide');
          // snackbar alert open 
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
          $("#workshop_modal").modal();
          $("#workshop_modal").on("show", function () {
            $("body").addClass("modal-open");
          }).on("hidden", function () {
            $("body").removeClass("modal-open")
          });
          var aTag = document.getElementById("referral_link");
          var bookingId = (response && response.booking_id) ? response.booking_id : null;
          aTag.href = "https://communityday.awsug.in/?utm_source=" + bookingId + "&utm_medium=email&utm_campaign=referral";
        });
      }

      
    } else {
      $('.error').show();
      return false
    }
  }

    $('form').submit(onFormSubmit);
    
      $('#email').change('input', (ev) => {
        let message = '';
        isEmailValid = false;
          const url = `${konfHubValidateUrl}?event_id=${event_id}&ticket_id=${ticket_id}&email_id=${ev.currentTarget.value}`;
          $.get(url, () => {
            $("#emailStatus").hide()
            isEmailValid = true;
            $("#email-label").css("top","-20px");
            $("#otp-button").prop("disabled", false);
          }).fail((err) => {
            $("#otp-button").prop("disabled", true);
            $("#email-label").css("top","-20px");
            $("#emailStatus").show();
            if(err.responseJSON.email_status == 8){
              message= "Another registration with the same email address exists. Please use another email address."
            }
            else{
              message = "The email address provided doesn't seem to be valid. Please enter a valid one."
            }
            showAndHideValueError("emailStatus",message)
          });
    
        }
      );
    
    

  $('#phone_number').change((ev) => {
    const url = `${konfHubValidateUrl}?event_id=${event_id}&ticket_id=${ticket_id}&dial_code=${$('.iti__selected-dial-code').html().split('+')[1]}&phone_number=${ev.currentTarget.value}`;
    message="";
    isPhoneNumberValid = false;

    $.get(url, () => {
      $("#phoneError").hide()
      isPhoneNumberValid = true;
    }).fail((er) => {
      $("#phoneError").show();
      if(er.responseJSON.phone_number_status ===3){
        message = "Another registration with the same phone number exists. Please use another phone number."
      }
      else{
        message = "The phone number provided doesn't seem to be valid. Please enter a valid one"
      }
      showAndHideValueError("phoneError", message);
    });
  });
});

function changeTrack(track, track1color, track2color){
  document.getElementById("livetrack").src = track; 
  document.getElementById("track1btn").style.background = track1color;     
  document.getElementById("track2btn").style.background = track2color;
}