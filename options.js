const storage = chrome.storage.sync;

function save_options() {
	var bookmark_form = document.getElementById('bookmark_links');
	
	var link_names = bookmark_form.elements['link_names[]'];
	var link_urls = bookmark_form.elements['link_hrefs[]'];
	 
	var name_array = [];
	var url_array = [];
	
	for (var i = 0; i < 30; i++) {
		console.log(link_names[i].value);
		console.log(link_urls[i].value);
		if (link_names[i] != undefined && link_names[i].value != "" && link_urls[i] != undefined && link_urls[i].value != "") {
			name_array.push(link_names[i].value);
			url_array.push(link_urls[i].value);
		}
	}

	console.log("Arrays:");
	console.log(name_array);
	console.log(url_array);
	
	localStorage["link_names"] = name_array;
	localStorage["link_urls"] = url_array;
	
	storage.set({'link_names': name_array}, function() {
		console.log("Saved data");
		console.log(name_array);
	});
	
	storage.set({'link_urls': url_array}, function() {
		console.log("Saved data");
		console.log(url_array);
	});
}

function restore_options() {
	var names_from_storage = [];
	var urls_from_storage = [];
	var bookmark_form = document.getElementById('bookmark_links');
	var link_names_form = bookmark_form.elements['link_names[]'];
	var link_urls_form = bookmark_form.elements['link_hrefs[]'];
	
	storage.get('link_names', function(r) {
		names_from_storage = r['link_names'];
		
		for (var i = 0; i < 30; i++) {
			if (names_from_storage[i] != undefined && names_from_storage[i] != "") {
				console.log("Adding " + names_from_storage[i]);
				link_names_form[i].value = names_from_storage[i];
			}
		}
	});
	
	storage.get('link_urls', function(r) {
		urls_from_storage = r['link_urls'];
		
		for (var i = 0; i < 30; i++) {
			if (urls_from_storage[i] != undefined && urls_from_storage[i] != "") {
				console.log("Adding " + urls_from_storage[i]);
				link_urls_form[i].value = urls_from_storage[i];
			}
		}
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);