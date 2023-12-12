// JavaScript to handle modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");


btn.onclick = function() {
modal.style.display = "flex";
}

function closeModal() {
modal.style.display = "none";
}

// Close modal if user clicks outside the modal content
window.onclick = function(event) {
if (event.target == modal) {
closeModal();
}
}



$('table').on('click', '.delete-button', function() {


    const userId = $(this).data('id');
    console.log(userId);

    // Store the reference to the current table row
    let $tableRow = $(this).closest('tr');
    if ($tableRow.length === 0) {
    // Try to find the parent tr if closest doesn't work
    $tableRow = $(this).parents('tr');
    }

    // Send an Ajax request to delete the user
    $.ajax({
    url: `/delete/${userId}`,
    type: 'DELETE',
    })
    .done(function() {

    // Remove the table row on success
    $tableRow.remove();

    // Show an alert for successful deletion
    })
    .fail(function(err) {
    console.error('Error deleting user:', err);

    // Show an alert for failed deletion
    alert('Failed to delete user. Please try again.');
    });

});



$(document).ready(function() {
    // Your existing code...
  
    $('#saveButton').on('click', function() {
      const formData = $('#userForm').serialize();
  
      // Make an AJAX request to create a new user
      $.ajax({
        url: '/create-user',
        type: 'POST',
        data: formData,
        success: function(user) {
          console.log('Ajax request to create user successful');
          closeModal();
          console.log(user[0][0])
          updateTableWithLatestUser(user[0][0])
  
          // Make another AJAX request to fetch all users and update the table
          $.ajax({
            url: '/Alluser', // Assuming you have a route for fetching all users
            type: 'GET',
            dataType: 'json', // Make sure to specify the data type as JSON
            success: function(response) {
              console.log('Ajax request to fetch all users successful');
              console.log(response.results); // JSON data received
  
              // Assuming results is a valid JavaScript object
              const usersArray = response.results;
              console.log(usersArray); // JSON data received

  
              //updateTableWithAllUsers(usersArray);
            },
            error: function(err) {
              console.error('Error fetching all users:', err);
            }
          });
        },
        error: function(err) {
          console.error('Error creating user:', err);
          alert('Failed to create user. Please try again.');
        }
      });
    });
  
    function updateTableWithLatestUser(user) {
        console.log("user:", user);
      
        // Create a new row for the table
        const newRow = `<tr>
                          <td>${user.name}</td>
                          <td>${user.email}</td>
                          <td>${user.phone}</td>
                          <td>
                            <button onclick="window.location.href='/editUser/${user.id}'">Edit</button>
                            <button class="delete-button" data-id="${user.id}">Delete</button>
                          </td>
                        </tr>`;
      
        // Insert the new row after the header row (the first row)
        $('table tr:first').after(newRow);
      }
            
  });
  