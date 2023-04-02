import { Scene, Color3, Color4, CreateGround, CreatePlane, StandardMaterial, Texture} from '@babylonjs/core';

export default function setEnviroment(scene: Scene, x: number, y: number, z: number) {
    const ground = CreateGround("ground", { width: 40, height:40}, scene);
    // set up ground
    ground.position.y = -4.85;
    const groundMaterial = new StandardMaterial("groundMaterial", scene)
    const groundTexture = scene.getTextureByName("./marbleFloor.avif") as Texture;
    groundTexture.uScale = 3;
    groundTexture.vScale = 3;
    groundMaterial.diffuseTexture = groundTexture;
    groundMaterial.diffuseColor = new Color3(0.6,0.6,0.6);
    ground.material = groundMaterial
    //build walls      
    const wall1 = CreatePlane("wall1", { width: x, height: y}, scene);
    wall1.position.z += x/2;
    const wall1Material = new StandardMaterial("wall1Material", scene)
    const wall1Texture = scene.getTextureByName("./wall1.jpg") as Texture;
    wall1Texture.uScale = 4;
    wall1Texture.vScale = 2;
    wall1Material.diffuseTexture = wall1Texture;
    wall1.material = wall1Material
                
    const wall2 = CreatePlane("wall2", { width: z, height: y}, scene);
    wall2.position.x += z / 2;
    wall2.rotation.y = Math.PI/2;
    const wall2Material = new StandardMaterial("wall2Material", scene)
    const wall2Texture = scene.getTextureByName("./wall2.jpg") as Texture;
    wall2Texture.uScale = 2;
    wall2Texture.vScale = 1;
    wall2Material.diffuseTexture = wall2Texture;
    wall2.material = wall2Material
               
    const wall3 = CreatePlane("wall3", { width: x, height: y}, scene);
    wall3.position.z -= x / 2;
    wall3.rotation.y = Math.PI;
    wall3.material = wall1Material
                
    const wall4 = CreatePlane("wall4", { width: z, height: y}, scene);
    wall4.position.x -= z / 2;
    wall4.rotation.y = -Math.PI/2;
    wall4.material = wall2Material
    //add wall colisions  
    wall1.checkCollisions = true;
    wall2.checkCollisions = true;
    wall3.checkCollisions = true;
    wall4.checkCollisions = true;
}