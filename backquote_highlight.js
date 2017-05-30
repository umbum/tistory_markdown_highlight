function bq_highlight() {
    var lines = $('div.article > div p, div.article > div div:not(:has(div,p))');
    var re = /``(?:([0-9a-z\-]*)(\s|(&nbsp;)))?.*?``/g;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].innerText.startsWith('```')) {

            for (var j = i + 1; j < lines.length; j++) {

                if (lines[j].innerText.startsWith('```')) {
                    wrapping(lines, i, j);
                    i = j;
                    break;
                }
            }
        } else {
            /*innerHTML로 받으면 내부에 <pre> 등 강제 개행 태그가 있을 때
            자동으로 개행하게 되어 제대로 적용되지 않지만, <p> 또는 leaf node인 <div>에 <pre>가
            있을 가능성은 희박하기 때문에 innerHTML로 처리했다.
            innerHTML로 받으면 <b>, <s>, <i> 등을 적용할 수 있다는 장점이 있다.*/
            var line_buf = lines[i].innerHTML;
            var matches = re.exec(line_buf);
            while (matches) {
                var k = '';
                var lang = '';
                var start_idx = 2;
                if (matches[1]) {
                    lang += matches[1].substr(0, 12);
                    start_idx += matches[1].length + matches[2].length;
                }

                var code = '<code class="language-' + lang + '">' + matches[0].substring(start_idx, matches[0].length - 2) + '</code>';
                lines[i].innerHTML = lines[i].innerHTML.replace(matches[0], code);

                matches = re.exec(line_buf);
            }
        }
    }
}

function wrapping(lines, i, j) {
    var lang = lines[i].innerText.substr(3, 15)
    var div_pre_code = $('<div><pre><code class="language-' + lang + '"></code></pre></div>');
    var code = $(div_pre_code).children().children();

    for (var k = i + 1; k < j; k++) {
        code.append(lines[k].innerHTML + "\n");
        $(lines[k]).remove();
    }
    $(lines[i]).after(div_pre_code);
    $(lines[i]).remove();
    $(lines[j]).remove();

}

