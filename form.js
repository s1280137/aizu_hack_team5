const textInput = document.getElementById("text")
let titles = []

sendButton.addEventListener("click", () => {
    // 送信の処理
    fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest")
        .then(r => r.json())
        .then(j => {
            titles = j

            const titleText = textasdfInput.value
            const task = {
                text: titleText
            }
            titles.push(task)

            fetch("https://api.jsonbin.io/b/60f25118a917050205c940d1/latest", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(titles)
                })
            textInput.value = ""
        })
})