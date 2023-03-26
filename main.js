// Wait for the document to be ready
$(document).ready(function() {

    // Initialize an empty array to store the name/value pairs
    const pairs = [];
    const body = $('html');

    // Check if the theme option is stored in localStorage, and set the theme accordingly
    if (localStorage.getItem('theme') === 'dark') {
        body.addClass('dark');
    } else {
        body.addClass('light');
    }

    // Handle switching to dark mode
    $('.theme-switcher .dark-mode-icon').click(function() {
        body.removeClass('dark').addClass('light');
        localStorage.setItem('theme', 'light');
    });

    // Handle switching to light mode
    $('.theme-switcher .light-mode-icon').click(function() {
        body.removeClass('light').addClass('dark');
        localStorage.setItem('theme', 'dark');
    });

    // Handle adding a new name/value pair to the list
    $('#add-btn').click(function(e) {
        e.preventDefault();
        addPair();
    });

    // Handle sorting the list by name
    $('#sort-by-name-btn').click(function() {
        sortByName();
    });

    // Handle sorting the list by value
    $('#sort-by-value-btn').click(function() {
        sortByValue();
    });

    // Handle deleting a selected name/value pair from the list
    $('#delete-btn').click(function() {
        deleteSelected();
    });

    // Handle showing the list as an XML string
    $('#show-as-xml-btn').click(function() {
        showAsXml();
    });

    // Add a new name/value pair to the pairs array and update the listbox
    function addPair() {
        const pairInput = $('#pair-input');
        const pair = pairInput.val().trim();
        // Use regex to check that the pair is in the correct format
        const regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;

        if (regex.test(pair)) {
            pairs.push(pair);
            // Create and append a new option to the listbox
            const option = '<option value="' + pair + '">' + pair + '</option>';
            $('#list').append(option);
            pairInput.val('');
            refreshListbox();
        } else {
            alert('Invalid pair syntax. Please enter the format of <name> = <value>.');
        }
    }

    // Delete all selected name/value pairs from the list and the pairs array
    function deleteSelected() {
        const selectedItems = $('#list option:selected');
        selectedItems.each(function() {
            const index = pairs.indexOf($(this).val());
            pairs.splice(index, 1);
        });
        refreshListbox();
    }

    // Sort the list by name and update the listbox and pairs array
    function sortByName() {
        pairs.sort(function(a, b) {
            const nameA = a.split('=')[0].toUpperCase();
            const nameB = b.split('=')[0].toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        refreshListbox();
    }

    // Sort the list by value and update the listbox and pairs array
    function sortByValue() {
        pairs.sort(function(a, b) {
            const valueA = a.split('=')[1].toUpperCase();
            const valueB = b.split('=')[1].toUpperCase();
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
        refreshListbox();
    }

    // Show the list as an XML string
    function showAsXml() {
        let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
        pairs.forEach(function(pair) {
            xmlString += '\t<pair name="' + pair.split('=')[0].trim() + '" value="' + pair.split('=')[1].trim() + '" />\n';
        });
        xmlString += '</root>';
        alert(xmlString);
    }

    // Update the listbox with the current contents of the pairs array
    function refreshListbox() {
        $('#list').empty();
        pairs.forEach(function(pair) {
            const option = '<option value="' + pair + '">' + pair + '</option>';
            $('#list').append(option);
        });
    }

});