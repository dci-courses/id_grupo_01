const imgSize=64;

//Esto solo existe para posicionar la label generada para una cara en un índice igual a esta
//ej: hay dos caras, por lo que el label de la cara en 0 será posicionado en labels[0]
let currentFace=-1;

class ClassifierNN{
    classifier;
    constructor(options={
        inputs: [imgSize, imgSize, 4],
        task: 'imageClassification',
        debug: true,
      }){
        this.classifier=ml5.neuralNetwork(options);
    }



    //agrega una imagen para asociar con una label. la imagen la obtiene directametne del video del canvas.
    addExample(label){
        if (faces.length==0){
            console.error("No faces found")
            alert("No se detectó ninguna cara!")
        }
        else if (faces.length===1){
            const box=faces[0].box;
            console.log("data")
            //esto obtiene la imagen del canvas
            let img = get(box.xMin, box.yMin, box.width, box.height)
            img.resize(imgSize, imgSize)
            console.log(img)
            console.log('Agregando info a: ' + label);
            this.classifier.addData({ image: img }, { label });
        }
        else{
            console.error("una cara a la vez, por favor!")
            alert("Una cara a la vez.")
        }
    }



    //usar los datos que se le han agregado con tomar foto para entrenar y hacer que pueda reconocer caras.
    train(){
        console.log("normalizando")
        //es necesario normalizar. tiene que ver con pasar los datos a una variable interna usada en train
        //si solo hay una label, da un error "raro" de que cosa debía ser >=2, por razones obvias de que deben ser
        //al menos 2 clases diferentes para entrenar.
        this.classifier.normalizeData();
        console.log("entrenando")
        this.classifier.train({epochs:50},()=>{
            console.log("entrenado")
            trained=true;
        })
    }



    classifyFaces(){
        //si no está entrenado aún, para qué intentar.
        if (!trained) return;
        
        for (let i = 0; i < faces.length; i++) {
            //obtener imagen, tratarla y clasificarla.
            const box = faces[i].box;
            let img = get(box.xMin, box.yMin, box.width, box.height)
            img.resize(imgSize, imgSize)
            currentFace=i;
            this.classifier.classify({image: img}, gotLabels)
        }
    }
}