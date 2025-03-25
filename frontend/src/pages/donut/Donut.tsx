import { useRef, useEffect } from 'react'
import '@/styles/donut/donut.scss'
import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Donut() {
  const canvasRef = useRef(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth/3, window.innerHeight/3 );

  useEffect(() => {
    const canEle = document.getElementById('maincanvas');
    canEle && canEle.appendChild( renderer.domElement );

    new OrbitControls( camera, renderer.domElement );
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load(
      '/three/model/donate_noplane.gltf',
      function (gltf: GLTF) {
      scene.add(gltf.scene);
      },
      function (xhr: ProgressEvent<EventTarget>) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error: unknown) {
        const err = error as ErrorEvent;
        console.log('error', err);
      }
    )
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    camera.position.x = 0.1;
    camera.position.y = 0.1;
    camera.position.z = 0.1;
    camera.lookAt(0, 0 , 0);

    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0.5, 0.5, 0.5 );
    spotLight.lookAt(0 , 0 , 0)
    scene.add( spotLight );

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();
  });

  return (
    <>
      <div className="ds-flex donut">
        <div className="chapter ds-flex flex-column">
            <div className="chapter__title"><p>Some steps to build a donut</p></div>
            <div className="chapter__phase ds-flex">
                <div className="chapter__content flex-1">
                    <p>Geometry & Vertex 构建几何顶点</p>
                    <span>人类生活于三维，是因为我们不能感知更多。</span>
                    <span>点，线，面，组成空间；时间构成连续空间。</span>
                    <span>点是XY，线是向量，面是向量x向量。</span>
                    <span>万物之初就是顶点着色器。</span>
                    <p><b>Vertex Shader</b></p>
                </div>
                <div className="chapter__imgs ds-flex flex-3">
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/3geooficing.png"/>
                        <div className="chapter__imginfo">糖霜几何体</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/2geoofbread.png"/>
                        <div className="chapter__imginfo">面包几何体</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/1geo.png"/>
                        <div className="chapter__imginfo">整合几何体</div>
                    </div>
                </div>
            </div>

            <div className="chapter__phase ds-flex">
                <div className="chapter__content flex-1">
                    <p>Light: Key, Fill and Rim 三点布光</p>
                    <span>希伯来文יְהִי אוֹר被翻译为Let there be light.</span>
                    <span>摄影领域最基础的三点布光，主体光Key、辅助光Fill、轮廓光Rim。</span>
                    <p>在路边看到摄影师助理满头大汗捧着廉价反光板，正是因为惧怕阴影。光线少了，后期操作空间受限。</p>
                    <span>但其实三点光是否最好，是有讨论空间的。</span>
                    
                    <p>Threejs中把光以投射方式区分</p>
                    <div>[AmbientLight]</div>
                    <div>[DirectionalLight]</div>
                    <div>[SpotLight]</div>
                    <div>[RectAreaLight]</div>
                </div>
                <div className="chapter__imgs ds-flex flex-3">
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/4nolight.png"/>
                        <div className="chapter__imginfo">无光</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/7rimlight.png"/>
                        <div className="chapter__imginfo">轮廓光</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/6filllight.png"/>
                        <div className="chapter__imginfo">辅助光</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/5keylight.png"/>
                        <div className="chapter__imginfo">主光</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/10combine.png"/>
                        <div className="chapter__imginfo">三点布光</div>
                    </div>
                </div>
            </div>

            <div className="chapter__phase ds-flex">
                <div className="chapter__content flex-1">
                    <p>Roughness 粗糙属性</p>
                    <span>物理上f=μN 其中μ为滑动摩擦系数。</span>
                    <p>感官上影响反光效果。</p>
                    <p>底层算法：此顶点法向量与光线向量相交时，影响反射向量的长度和角度。</p>
                </div>
                <div className="chapter__imgs ds-flex flex-3">
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/11roughnone.png"/>
                        <div className="chapter__imginfo">0</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/12roughfull.png"/>
                        <div className="chapter__imginfo">1</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/10combine.png"/>
                        <div className="chapter__imginfo">适合</div>
                    </div>
                </div>
            </div>

            <div className="chapter__phase ds-flex">
                <div className="chapter__content flex-1">
                    <p>简单组合</p>
                    <p>糖霜加点点缀</p>
                    <p>面包加点柔软</p>
                </div>
                <div className="chapter__imgs ds-flex flex-3">
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/8icing.png"/>
                        <div className="chapter__imginfo">糖霜上色</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/9bread.png"/>
                        <div className="chapter__imginfo">面包雕刻</div>
                    </div>
                    <div className="chapter__imgbox ds-flex flex-column">
                        <img className="chapter__img" src="/blender/compress/13wholeee.png"/>
                        <div className="chapter__imginfo">组合</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="ds-flex">
        <div className="ds-flex flex-column ">
            <span>鼠标/手势可以拖拽，缩放可以穿模，低模</span>
            <div id="maincanvas" ref={canvasRef}></div>
        </div>
        <div className="ds-flex flex-column ">
            <span>Blender导出影片，高模</span>
            <video loop width="360" height="480" controls autoPlay muted>
                <source src="/video/donate.mp4" type="video/mp4" />
            </video>
        </div>
      </div>
    </>
  )
}

export default Donut
