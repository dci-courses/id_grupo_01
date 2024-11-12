let trained=false;

// agregar botones para operar el modelo. Lo más terrible es el uso de callbacks.
function showInputs(){
    let nameInput=createInput('');
    nameInput.position(canvas.position().x+20,canvas.position().y+10)

    const registerFaceBtn=createButton("Tomar foto");
    registerFaceBtn.position(canvas.position().x+220,canvas.position().y+10);
    registerFaceBtn.mousePressed(() => {
        if (nameInput.value()==""){
            alert("No hay una etiqueta utilizable!")
        }
        console.log("taking picture")

        for (let index = 0; index < 20; index++) {
            try{
                classifier.addExample(nameInput.value())
            }
            catch{
                alert("training interrupted")
                break;
            }

        }
        
    })

    const trainBtn=createButton("Entrenar");
    trainBtn.position(canvas.position().x+20,canvas.position().y+50)
    trainBtn.mousePressed(() => {
        classifier.train();
    })
}