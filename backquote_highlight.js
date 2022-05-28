function bq_highlight() {
    highlight_codeblock_with_prism()

    var lines = $('div.tt_article_useless_p_margin p, div.tt_article_useless_p_margin li, div.tt_article_useless_p_margin div:not(:has(div,p))');
    var re = /``(?:([0-9a-z\-]*)(\s|(?:&nbsp;)))?(.*?)``/g;
    
    for (var i = 0, lines_length = lines.length; i < lines_length; i++) {
        if (lines[i].innerText.startsWith('```')) {
            for (var j = i + 1; j < lines_length; j++) {
                if (lines[j].innerText.startsWith('```')) {
                    block_highlight(lines, i, j);
                    i = j;
                    break;
                }
            }
        } else { //inline_highlight
            /*innerHTML로 받으면 내부에 <pre> 등 강제 개행 태그가 있을 때
            자동으로 개행하게 되어 제대로 적용되지 않지만, <p> 또는 leaf node인 <div>에 <pre>가
            있을 가능성은 희박하기 때문에 innerHTML로 처리했다.*/
            var line_buf = lines[i].innerHTML;
            var matches = re.exec(line_buf);
            var lang = '';
            var code = '';
            while (matches) {
                lang = (matches[1]) ? matches[1].substr(0, 12) : '';

                if(matches[3] === ''){
                    console.log("``lang `` is invalid syntax");
                    code = matches[1];
                }
                else{
                    code = matches[3];
                }
                
                var inline_highlight = '<code class="language-' + lang + '">' + code + '</code>';
                lines[i].innerHTML = lines[i].innerHTML.replace(matches[0], inline_highlight);

                matches = re.exec(line_buf);
            }
        }
    }
}

function block_highlight(lines, i, j) {
    var lang = lines[i].innerText.substr(3, 15);
    var div_pre_code = $('<div><pre><code class="language-' + lang + '"></code></pre></div>');
    var code = $(div_pre_code).children().children();

    for (var k = i + 1; k < j; k++) {
        code.append(lines[k].innerHTML === "<br>" ? "\n" : lines[k].innerHTML + "\n");
        $(lines[k]).remove();
    }
    $(lines[i]).after(div_pre_code);
    $(lines[i]).remove();
    $(lines[j]).remove();

}

function highlight_codeblock_with_prism() {
    const pre_doms = $('article pre:has(code)[data-ke-language]')
    for (let pre_dom of pre_doms) {
        const lang = pre_dom.getAttribute('data-ke-language')
        const code_dom = $(pre_dom).children('code')
        code_dom.addClass('language-' + lang)
    }
}