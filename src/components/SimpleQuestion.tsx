'use client'
import * as React from "react"

function SimpleQuestion() {
  const [input, setInput] = React.useState('')
  const [result, setResult] = React.useState('')

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (input.length === 0) {
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( { input })
      })

      console.log({ response })
      const data = await response.json();
      console.log({ data })

      if (response.status !== 200) {
        throw data.error || new Error('Request Failed')
      }

      setResult(data);
      setInput('');
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div>
        <span>질문을 입력해주세요</span>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='input'
            placeholder='질문을 입력해주세요'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <input type='submit' value='제출하기' />
        </form>
      </div>
      <div>
        답변:&nbsp;<span>{result}</span>
      </div>
    </section>
  )
}

export default SimpleQuestion;