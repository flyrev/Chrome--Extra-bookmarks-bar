const storage = chrome.storage.sync;
var bookmarks_div = document.createElement("div");
bookmarks_div.id = "extra_bar";

document.body.appendChild(bookmarks_div);

for (var i=0; i<30; i++) {
	var aTag = document.createElement('a');
	aTag.setAttribute('href',"http://www.flyrev.org/");
	aTag.setAttribute('class', "extra_bar_link");
	aTag.setAttribute('id', "extra_bar_link_" + i);
	aTag.innerHTML = "";
	bookmarks_div.appendChild(aTag);
	bookmarks_div.innerHTML += " &nbsp; &nbsp; ";
}

storage.get('link_names', function(r) {
	names_from_storage = r['link_names'];
	
	for (var i = 0; i < 30; i++) {
		if (names_from_storage[i] != undefined && names_from_storage[i] != "") {
			console.log("Adding " + names_from_storage[i]);
			document.getElementById("extra_bar_link_" + i).innerHTML = names_from_storage[i];
		}
	}
});
	
storage.get('link_urls', function(r) {
	urls_from_storage = r['link_urls'];
	
	for (var i = 0; i < 30; i++) {
		if (urls_from_storage[i] != undefined && urls_from_storage[i] != "") {
			console.log("Adding " + urls_from_storage[i]);
			document.getElementById("extra_bar_link_" + i).setAttribute('href',urls_from_storage[i]);
		}
	}
});

var close = document.createElement('a');
close.setAttribute('id', "close_extra_bar");
close.innerHTML = "[X]";
close.setAttribute('style', "position:fixed; right:0px;");


function close_extra_bar() {
	bookmarks_div.style.visibility = 'hidden';
}


bookmarks_div.appendChild(close);

document.querySelector('#close_extra_bar').addEventListener('click', close_extra_bar);