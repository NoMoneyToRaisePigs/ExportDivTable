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

  function showme(){
	navigator.clipboard.read()
	.then(text => {
		console.log('Pasted content: ', text);
	})
	.catch(err => {
		console.error('Failed to read clipboard contents: ', err);
	});

  }

  function handlePaste (e) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    // Do whatever with pasteddata
    alert(pastedData);
}

document.getElementById('ta').addEventListener('paste', handlePaste);