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
            var line_buf = lines[i].innerText;
            var matches = re.exec(line_buf);

            while(matches){
                var k = '';
                var lang = '';
                var start_idx = 2;
                if(matches[1]){
                    lang += matches[1].substr(0, 12);
                    start_idx += matches[1].length+1;
                }

                var escaped = matches[0].replace('<', '&lt;').replace('>', '&gt;');
                var code = '<code class="language-'+lang+'">'+escaped.substring(start_idx, escaped.length-2)+'</code>';
                lines[i].innerHTML = lines[i].innerHTML.replace(escaped, code);

                matches = re.exec(line_buf);
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