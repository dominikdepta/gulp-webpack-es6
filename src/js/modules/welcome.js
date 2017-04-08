const welcomeMessage = (msg = 'Hi!') => {
    document.getElementById('welcome').innerText = msg;
    console.log(msg);
};

export default welcomeMessage;