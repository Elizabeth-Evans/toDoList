
// I broke it :(

var templates = {};

templates.toDoTmpl = [
  '<ul id="toDoList">',
  '<li><%="newToDo"=%></li>',
  '</ul>'
].join("");


$(document).ready(function() {
  var newToDo = "";
  var toDoTmpl = _.template($('#toDoList').html());

  function addAToDo() {
    var text = $('#newToDo').val();
    $("#addToDo").append(toDoTmpl);
    $("#newToDo").val('');
  }

  function clearCompleted() {
    $("#toDoList .toggle:checked").parent().remove();
  }

  function deleteItem() {
    $(this).parent().remove();
  }

  function completed() {
    if ($(this).parent().css('textDecoration') == 'line-through') {
      $(this).parent().css('textDecoration', 'none');
      $(this).parent().css('opacity', '1');
    }
  }
  $(document).ready(function() {
    $('#newToDo').keyup(function(element) {

// keycode 13 is on enter
      if (element.keyCode === 13) {
        addListItem();
      }
    });

// edits, got help from http://codereview.stackexchange.com/questions/93664/to-do-list-in-jquery

    $(document).on('click', '.destroy', deleteItem);
    $("#deleteToDos").click(function() {
      $('input:checkbox').not(this).prop('checked', this.checked);
      if ($('li').css('textDecoration') == 'line-through') {
        $('li').css('textDecoration', 'none');
        $('li').parent().css('opacity', '1');
      } else {
        $('li').css('textDecoration', 'line-through');
        $('li').parent().css('opacity', '0.5');
      }
    });
    $(document).on('click', '.toggle', completed);
    $("#clearcompleted").click(clearCompleted);
    $('#toDoList').on('dblclick', 'span', function() {
      var thisData = this.innerHTML,
        $el = $('<input type="text" class="in-edit-text"/>');
      $(this).replaceWith($el);
      $el.val(thisData).focus();
      $(this).find(".text").hide();
      $(this).find(".destroy").hide();
    });
    $('#toDoList').on('keyup', '.in-edit-text', (function(element) {
      if (element.keyCode === 13) {
        $(this).replaceWith($('<span class="text">' + $(this).val() +
          '</span>'));
      }
    }));
  });
});
