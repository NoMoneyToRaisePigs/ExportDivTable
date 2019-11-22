// var toCSV = function() {
    
//     var clean_text = function(text){
//         text = text.replace(/"/g, '\\"').replace(/'/g, "\\'");
//         return '"'+text+'"';
//     };
    
// 	$(this).each(function(){
// 			var table = $(this);
// 			var caption = $(this).find('caption').text();
// 			var title = [];
// 			var rows = [];

// 			$(this).find('tr').each(function(){
// 				var data = [];
// 				$(this).find('th').each(function(){
//                     var text = clean_text($(this).text());
// 					title.push(text);
// 					});
// 				$(this).find('td').each(function(){
//                     var text = clean_text($(this).text());
// 					data.push(text);
// 					});
// 				data = data.join(",");
// 				rows.push(data);
// 				});
// 			title = title.join(",");
// 			rows = rows.join("\n");

// 			var csv = title + rows;
// 			var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
// 			var download_link = document.createElement('a');
// 			download_link.href = uri;
// 			var ts = new Date().getTime();
// 			if(caption==""){
// 				download_link.download = ts+".csv";
// 			} else {
// 				download_link.download = caption+"-"+ts+".csv";
// 			}
// 			document.body.appendChild(download_link);
// 			download_link.click();
//             document.body.removeChild(download_link);

// 	});
    
// };

function toExcel(tableId, rowClassName, columnClassName){
	let data;
	let rows = [];

	let rowElements = document.getElementsByClassName(rowClassName);
	for(let i = 0; i < rowElements.length; i++){
		let columns = [];

		let columnElements = rowElements[i].getElementsByClassName(columnClassName);
		for(let t = 0; t < columnElements.length; t++){
			columns.push(columnElements[t].innerText);
		}

		rows.push(columns.join(','));
	}

	data = rows.join('\n');

	var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
	var download_link = document.createElement('a');
	download_link.href = uri;
	var ts = new Date().getTime();
	download_link.download = "doc-"+ts+".csv";
	document.body.appendChild(download_link);
	download_link.click();
	document.body.removeChild(download_link);
}

//toExcel('xxx', 'row', 'column');

// navigator.clipboard.writeText('Text to be copied')
//   .then(() => {
//     console.log('Text copied to clipboard');
//   })
//   .catch(err => {
//     // This can happen if the user denies clipboard permissions:
//     console.error('Could not copy text: ', err);
//   });


//   navigator.clipboard.readText()
//   .then(text => {
//     console.log('Pasted content: ', text);
//   })
//   .catch(err => {
//     console.error('Failed to read clipboard contents: ', err);
//   });

	var copyText;

  function showme(){
	// navigator.clipboard.readText('Text')
	// .then(text => {
	// 	copyText = text;
	// 	console.log('Pasted content: ', text);
	// })
	// .catch(err => {
	// 	console.error('Failed to read clipboard contents: ', err);
	// });

	// navigator.clipboard.read()
	// .then(text => {
	// 	console.log('Pasted Type: ', text);

	// 	text[0].getType('text/plain').then(x =>{

	// 		console.log(x);
	// 	});
	// })
	// .catch(err => {
	// 	console.error('Failed to read clipboard contents: ', err);
	// });

	document.getElementById('ta').select();

	navigator.permissions.query({name: "clipboard-read"}).then(result => {
		// If permission to read the clipboard is granted or if the user will
		// be prompted to allow it, we proceed.
	  
		if (result.state == "granted" || result.state == "prompt") {
		  navigator.clipboard.read().then(data => {
			console.log(data);
		  });
		}
	  });
  }

  function handlePaste (e) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
	//pastedData = clipboardData.getData('Text');
	pastedData = clipboardData.getData('text/html');
	
	console.log(pastedData);
    // Do whatever with pasteddata
    alert(pastedData);
}

document.getElementById('ta').addEventListener('paste', handlePaste);

document.addEventListener('copy', function(e) {
	// e.clipboardData is initially empty, but we can set it to the
	// data that we want copied onto the clipboard as part of the cut.
	// Write the data that we want copied onto the clipboard.
	//e.clipboardData.setData('text/plain', 'Hello, world!');
	//e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  
	// Since we will be canceling the cut operation, we need to manually
	// update the document to remove the currently selected text.
	//deleteCurrentDocumentSelection();
	var x= e.clipboardData.getData('text/plain');
	console.log(x);
	// This is necessary to prevent the document selection from being
	// written to the clipboard.
	e.preventDefault();
  });

  function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}