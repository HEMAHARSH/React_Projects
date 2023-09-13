import { useState } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const [text, setText] = useState(`
  # H1
  ## H2
  [title](https://www.example.com)
  \`code\`

  \`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

- First item
- Second item
- Third item

1. First item
2. Second item
3. Third item

*italicized text*

**bold text**
> blockquote
![alt text](image.jpg)

  `);

  marked.setOptions({
    breaks:true
  })
  return (
    <div className="App">
      <h2 id ="head1">Editor</h2>
      <textarea
        id="editor"
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
      ></textarea>
      <h2 >Previewer</h2>
      <div id="preview" dangerouslySetInnerHTML={{__html:marked(text)}}></div>
    </div>
  );
}

export default App;
