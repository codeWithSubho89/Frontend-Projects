const qrInput = document.querySelector('#qr-input');
const qrShow = document.querySelector('#qrShow');
const generateBtn = document.querySelector('#generateBtn');

generateBtn.addEventListener('click', () => {
    const text = qrInput.value.trim();

    if (!text) {
        alert("Please enter something");
        return;
    }

    qrShow.innerHTML = "";

    new QRCode(qrShow, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
    });
});