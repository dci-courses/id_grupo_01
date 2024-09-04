
class FaceDetector{
    detector;

    //realmente esta clase es una excusa para configurar e iniciar facemesh
    constructor(options={ maxFaces: 10, refineLandmarks: false, flipHorizontal: false }){
        this.detector=ml5.faceMesh(options)
    }

    startDetection(source,onFaceDetected){
        this.detector.detectStart(source,onFaceDetected)
    }

    
}