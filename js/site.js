$(function () {
  const event_id = 'dba9339c-625d-453a-b86c-f0d360511b62';
  const ticket_id = '6176';
  const konfHubValidateUrl = 'https://api.konfhub.com/v2/validate';
  const konfHubFormSubmitUrl = 'https://api.konfhub.com/event/capture/v2';
  let isEmailValid = false;
  let isPhoneNumberValid = false;

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

  $(function () {
    $(document).on("click", ".ven", function () {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      var latt = parseFloat($(this).attr("data-lat"));
      var lngg = parseFloat($(this).attr("data-lng"));
      var labb = $(this).attr("data-label");
      console.log(latt + " - " + lngg);
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
    // allowDropdown: false,
    // autoHideDialCode: false,
    // autoPlaceholder: "off",
    // dropdownContainer: document.body,
    // excludeCountries: ["us"],
    // formatOnDisplay: false,
    // geoIpLookup: function(callback) {
    //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
    //     var countryCode = (resp && resp.country) ? resp.country : "";
    //     callback(countryCode);
    //   });
    // },
    // hiddenInput: "full_number",
    // initialCountry: "auto",
    // localizedCountries: { 'de': 'Deutschland' },
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

  const onFormSubmit = event => {
    event.preventDefault();
    if (!isEmailValid || !isPhoneNumberValid) {
      return;
    }

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var designation = document.getElementById("designation").value;
    var organisation = document.getElementById("organisation").value;

    var city = document.getElementById("city").value;
    var consent = document.getElementById("idChk-normal").value;
    var trainingCloud = document.getElementById("training-check").value;
    var otherConsent = document.getElementById("konf-aws").value;
    
    var phone = iti.getNumber(intlTelInputUtils.numberFormat.E164);

    let dataBody = {
      event_id,
      "utm": utmParams,
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
            name,
            "email_id": email,
            designation,
            organisation,
            "country_code": "in",
            "dial_code": "+91",
            "phone_number": $('#phone_number').val(),
            "whatsapp_number": phone,
            "country": "India",
            "custom_forms": {
              "16796": city
            },
          }
        ]
      }
    };

    // if (location.search) {
    //   dataBody['utm'] = utm
    // }

    if (phone.length <= 13) {
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
        var aTag = document.getElementById("referral_link");
        var bookingId = (response && response.booking_id) ? response.booking_id : null;
        aTag.href = "https://communityday.awsug.in/?utm_source=" + bookingId + "&utm_medium=email&utm_campaign=referral";
      });
    } else {
      $('.error').show();
      return false
    }
  }

  $('form').submit(onFormSubmit);

  $('#email').change((ev) => {
    const url = `${konfHubValidateUrl}?event_id=${event_id}&ticket_id=${ticket_id}&email_id=${ev.currentTarget.value}`;

    let message = '';
    isEmailValid = false;

    $.get(url, ({ email_status }) => {
      if ((email_status === 1) || (email_status === 3)) {
        isEmailValid = true;
      } else if (email_status === 8) {
        message = 'The email is either already registered. Please use a different email to register.';
      } else {
        message = "The email is invalid.";
      }
      $("#emailStatus").html(message);
    }).fail(() => {
      $("#emailStatus").html("The email is invalid.")
    });
  });

  $('#phone_number').change((ev) => {
    const url = `${konfHubValidateUrl}?event_id=${event_id}&ticket_id=${ticket_id}&dial_code=${$('.iti__selected-dial-code').html().split('+')[1]}&phone_number=${ev.currentTarget.value}`;

    isPhoneNumberValid = false;

    $.get(url, ({ phone_number_status }) => {
      if (phone_number_status === 1) {
        isPhoneNumberValid = true;
        $("#phoneError").hide()
      } else {
        $("#phoneError").show()
      }
    }).fail((er) => {
      $("#phoneError").show()
    });
  });
});
