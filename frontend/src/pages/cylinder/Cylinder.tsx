import '@/styles/cylinder/cylinder.scss'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function Cylinder() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // 创建场景
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
        
        // 设置相机位置，拉远并调整为45度俯视角度
        camera.position.set(0, -1000, 800) // x向右，y向上，z向外

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)

        // 添加控制器
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        
        // 设置控制器的目标点
        controls.target.set(0, 0, 0)
        
        // 更新控制器，应用新的相机位置
        controls.update()

        // 创建多个圆柱体
        const cylinderRadius = 25
        const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, 100, 32)
        
        // 移除通用材质
        // const material = new THREE.MeshNormalMaterial()
        
        // 生成饱和度高的随机颜色
        function getRandomVibrantColor() {
            // 使用HSL颜色模型，保持高饱和度
            const hue = Math.random() * 360;     // 随机色相 (0-360)
            const saturation = 0.8 + Math.random() * 0.2; // 高饱和度 (0.8-1.0)
            const lightness = 0.5 + Math.random() * 0.3;  // 适中亮度 (0.5-0.8)
            
            return new THREE.Color().setHSL(hue/360, saturation, lightness);
        }
        
        // 计算视口中可见区域的近似宽度和高度
        const viewportHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
        const viewportWidth = viewportHeight * (window.innerWidth / window.innerHeight)
        
        // 使用六边形网格排列（最紧密的圆形排列）
        const diameter = cylinderRadius * 2
        const horizontalSpacing = diameter; // 水平间距等于直径
        const verticalSpacing = diameter * Math.sqrt(3)/2; // 行间距为直径的sqrt(3)/2
        
        // 计算需要的行数和列数，稍微扩大范围确保覆盖屏幕
        const extraMargin = 800; // 额外边距
        const startX = -viewportWidth/2 - extraMargin;
        const startY = -viewportHeight/2 - extraMargin;
        const endX = viewportWidth/2 + extraMargin;
        const endY = viewportHeight/2 + extraMargin;
        
        const cols = Math.ceil((endX - startX) / horizontalSpacing);
        const rows = Math.ceil((endY - startY) / verticalSpacing);
        
        // 创建六边形排列的圆柱体
        for (let row = 0; row < rows; row++) {
            // 每隔一行，水平位置偏移半个直径
            const offsetX = (row % 2) * (horizontalSpacing / 2);
            
            for (let col = 0; col < cols; col++) {
                const x = startX + col * horizontalSpacing + offsetX;
                const y = startY + row * verticalSpacing;
                
                // 确保在扩展区域内
                if (x >= startX && x <= endX && y >= startY && y <= endY) {
                    // 为每个圆柱体创建材质
                    const randomColor = getRandomVibrantColor();
                    const cylinderMaterial = new THREE.MeshPhongMaterial({ 
                        color: randomColor,
                        shininess: 6000, // 增加光泽度
                        specular: 0x444444, // 添加高光颜色
                        emissive: randomColor.clone().multiplyScalar(0.2) // 添加自发光，使颜色更鲜艳
                    });
                    
                    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
                    
                    cylinder.position.x = x;
                    cylinder.position.y = y;
                    cylinder.position.z = 0;
                    
                    cylinder.rotation.x = 0.5 * Math.PI;
                    
                    scene.add(cylinder);
                }
            }
        }
        
        console.log(`使用六边形网格排列创建圆柱体`);

        // 增强灯光
        // 增加环境光的强度
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) 
        scene.add(ambientLight)

        // 创建36个方向光，按六边形方式排列
        const lightIntensity = 1.8 / 36; // 平均分配总亮度
        const lightDistance = 500; // 光源环的半径
        const layers = 3; // 六边形的层数
        const lightsPerLayer = [6, 12, 18]; // 每层的光源数量
        
        let lightIndex = 0;
        
        // 按照六边形层级创建光源
        for (let layer = 0; layer < layers; layer++) {
            const radius = lightDistance * (layer + 1) / layers;
            const count = lightsPerLayer[layer];
            
            // 在每层创建均匀分布的光源
            for (let i = 0; i < count; i++) {
                // 计算光源在圆周上的角度
                const angle = (i / count) * Math.PI * 2;
                
                // 计算光源的位置（水平面上）
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                // 创建方向光
                const dirLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
                
                // 设置光源位置，z坐标为正，使光照向下
                dirLight.position.set(x, y, 300);
                
                // 让光源指向原点
                dirLight.target.position.set(0, 0, 0);
                scene.add(dirLight.target);
                
                scene.add(dirLight);
                lightIndex++;
            }
        }
        
        // 添加点光源，增强中心区域照明
        const pointLight = new THREE.PointLight(0xffffff, 0.2, 1000)
        pointLight.position.set(0, 0, 300)
        scene.add(pointLight)

        // 渲染循环
        const animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // 窗口大小调整
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize)
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div ref={containerRef} className="cylinder-container"></div>
    )
}

export default Cylinder