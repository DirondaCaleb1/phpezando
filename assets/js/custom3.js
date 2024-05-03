$(document).ready(function () {
  $(document).on("click", ".delete-question-btn", function () {
    let question_id = $(this).val();

    $.ajax({
      method: "POST",
      url: "server/forms/client/forum-action.php",
      data: {
        question_id: question_id,
        scope: "question-delete",
      },
      success: function (response) {
        if (response == 200) {
          alertify.success("Une question a été supprimée avec succès");
          $("#questions").load(location.href + " #questions");
        } else {
          alertify.success(response);
        }
      },
    });
  });
});
