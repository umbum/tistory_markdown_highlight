$(document).ready(function () {
    var lines = $('div.article > div > p');
    var re = /``(?:([0-9a-z\-]*)\s)?.*?``/g;
    for (var i = 0; i < lines.length; i++){

        if( lines[i].innerText.startsWith('```')){
            for ( var j = i+1; j < lines.length; j++){

                if (lines[j].innerText.startsWith('```')){
                    wrapping(lines, i, j);
                    i = j+1;
                    break;
                }
            }
        } else {
            var matches = re.exec(lines[i].innerText);
            while(matches){
                var k = '';
                matches.forEach(function (item, index){
                    k += index + ": " + "{"+ item + "}"+"\n";
                });

                if(matches[1]){
                    var lang = matches[1];
                    var start_idx = 3+matches[1].length;
                }else{
                    var lang = undefined;
                    var start_idx = 2;
                }

                var bq_inner = matches[0].substring(start_idx, matches[0].length-2);
                bq_inner = bq_inner.replace('<', '&lt;');
                bq_inner = bq_inner.replace('>', '&gt;');
                var code = '<code class="language-'+lang+'">'+bq_inner+'</code>';
                lines[i].innerHTML = lines[i].innerHTML.replace(matches[0], code);

                matches = re.exec(lines[i].innerText);
            }
        }
    }
});

function wrapping(lines, i, j){
    var lang = lines[i].innerText.substr(3, 15)
    var div_pre_code = $('<div><pre><code class="language-'+lang+'"></code></pre></div>');
    var code = $(div_pre_code).children().children();

    for(var k = i+1; k < j; k++){
        code.append(lines[k].innerHTML+"\n");
				$(lines[k]).remove();
    }
    $(lines[i]).after(div_pre_code);
	  $(lines[i]).remove();
    $(lines[j]).remove();

}