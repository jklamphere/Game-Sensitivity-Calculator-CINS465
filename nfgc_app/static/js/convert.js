
  "use strict";

  // Enable tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  var games = {
    "Apex Legends": {
      degree_per_dot: 0.022,
      info:
        "Uses the Source game engine, so shares settings with other Source games.",
    },
    "Battlefield V": { degree_per_dot: 0.022 }, // Using CS sens as reference
    "Borderlands 2": { degree_per_dot: 0.0055 },
    "Call of Duty: Warzone": { degree_per_dot: 0.0066 },
    "Counter-Strike": {
      degree_per_dot: 0.022,
      info:
        "Uses the Source game engine, so shares settings with other Source games.",
    },
    Fortnite: { degree_per_dot: 0.5715 },
    "Half-Life 1 & 2": { degree_per_dot: 0.022 },
    Overwatch: { degree_per_dot: 0.0066 },
    "Quake Live": { degree_per_dot: 0.022 },
    "Team Fortress 2": {
      degree_per_dot: 0.022,
      info:
        "Uses the Source game engine, so shares settings with other Source games.",
    },
    "Unreal Tournament": { degree_per_dot: 0.0596 },
  };

  var html = "";
  for (var game in games) {
    html += '<option value="' + game + '">' + game + "</option>";
  }

  $(".game").html(html);

  $(".game").change(function () {
    $(this).parents(".row").find(".fov").parents(".form-group").hide();

    calculate();
  });

  $(".source .sensitivity, .source .fov, .target .fov, .source .dpi").on(
    "input",
    calculate
  );

  $(".game").change(function () {
    $(this).parents(".row").find(".fov").parents(".form-group3").hide();

    calculate3();
  });

  $(" .dest .fov, .dest .dpi, .dest .dest-cm-per-360").on("input", calculate3);

  // Default settings
  $(".source .sensitivity").val("1.2");
  $(".source .game").val("Counter-Strike");
  $(".target .game").val("Fortnite").change();

  // TODO: Support for changing target sens/cm360/in360

  function calculate3() {
    var cm = $(".dest .dest-cm-per-360");
    var targetGame = $(".target .game").val();
    var targetdegree_per_dot = games[targetGame].degree_per_dot;
    var sourceDpi = $(".dpi").val();
    var in360 = cm.val() * 0.393701;

    var targetSens = 360 / (sourceDpi * targetdegree_per_dot * in360);

    //sourceSens =360/ (sourceDpi *sourcedegree_per_dot * in360;

    $(".dest .sensitivity").val(round(targetSens, 6));
  }

  function calculate() {
    var sourceGame = $(".source .game").val();
    var targetGame = $(".target .game").val();
    var sourcedegree_per_dot = games[sourceGame].degree_per_dot;
    var targetdegree_per_dot = games[targetGame].degree_per_dot;
    var sourceDpi = $(".dpi").val();
    var sourceSens = $(".source .sensitivity").val();

    // New Game linear sensitivity from actual sens
    if (sourceGame == "Battlefield V") {
      sourceSens =
        (5 / 32) *
        (Math.pow(5, 0.5) * Math.pow(6400 * sourceSens + 51061373, 0.5) -
          15975);
    }

    // Adjust for the degree_per_dot-difference between the two games.
    var targetSens = sourceSens * (sourcedegree_per_dot / targetdegree_per_dot);

    // Old Game linear sensitivity to actual sens
    if (targetGame == "Battlefield V") {
      targetSens = 0.00128 * Math.pow(targetSens, 2) + 6.39 * targetSens - 3.32;
    }

    var in360 = 360 / (sourceDpi * sourcedegree_per_dot * sourceSens);
    var cm360 = in360 * 2.54;

    //sourceSens =360/ (sourceDpi *sourcedegree_per_dot * in360;

    $(".target .sensitivity").val(round(targetSens, 6));
    $(".cm-per-360").val(round(cm360, 3));
    $(".in-per-360").val(round(in360, 3));
  }

  function round(num, decimals) {
    if (num == Infinity) {
      return "";
    }
    var rounding = Math.pow(10, decimals);
    return Math.round(num * rounding) / rounding;
  }
















