function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    const inputField = document.getElementById('name').value;
    // checkForName(formText)
    // Client.checkForName(formText)

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })

    //check if the input field is not blank
    const formText = inputField.value.trim();
    if (formText === '') {
        alert('Please enter a valid name.');
        return;
    }

    //send a POST request to the server with the text data
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputField })
    })
    .then(response => response.json())
    .then(function(response) {
        //update the view with the sentiment analysis results
        document.getElementById('results').innerHTML = `
            <p>Polarity: ${response.polarity}</p>
            <p>Subjectivity: ${response.subjectivity}</p>
            <p>Text: ${response.text}</p>
        `;
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('Error occurred during analysis!');
    });
}

export { handleSubmit }
