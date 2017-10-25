# tistory_markdown_highlight
  
티스토리 에디터에서 글 작성 시, 마크다운 문법으로 코드 하이라이팅 할 수 있도록 지원하는 플러그인이다.  
highlighting 기능을 적용하기 위해서 매번 HTML tag를 입력하는 것이 귀찮아서 만들었기 때문에  
**단순히 치환하는 기능만 있고 자체 highlighting 기능은 없다.**  
**따라서, highlightjs나 prismjs같은 HTML5 표준 문법을 지키는 highlight plugin과 함께 사용해야 한다.**  

### block highlighting
글 작성 시 highlighting처리 하고 싶은 부분 위 아래를 markdown처럼 \`\`\`로 감싸면  
본문에서 이를 인식해 `<div><pre><code class="language-*>`로 치환해준다.  
  
\`\`\`python  
def foo:
    bar = 1  
\`\`\`  
=>  
```python
def foo:
    bar = 1
```
  
### inline highlighting
\`\`로 감싸면 `<code class="language-*>`로 치환해준다.  
개인적으로 \`를 사용해야 하는 경우가 있어 \`\`로 지정했다.  
  
\`\`python code\`\`  
=>  `code`

inline highlighting 시 띄어쓰기가 있는 code 조각을 입력하는 경우, 첫 번째 공백이 나오기 전에 있는 문자열은 lang으로 인식한다.  
그래서 \`\`code1 code2\`\` 처럼 작성하는 경우 code1을 lang으로 인식하므로, \`\` code1 code2\`\`로 작성해야 한다.  
  
  
### Usage
티스토리에 파일을 업로드 하고 다음 코드를 HTML에 추가하면 적용된다.  
jQuery를 사용했기 때문에, 다음 코드가 jQuery를 불러오는 부분보다 더 아래에 위치하도록 해야 한다.  
```
<script src=jQuery...></script>
...
<script defer src="./images/backquote_highlight.min.js" onload="bq_highlight()"></script>
```
