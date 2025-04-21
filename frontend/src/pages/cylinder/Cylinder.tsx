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
        const cylinderHeight = 100
        const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32)
        
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
        
        // 为鼠标交互准备
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let intersectedObject: THREE.Object3D | null = null;
        const cylinders: THREE.Mesh[] = [];
        const originalScales: {[key: string]: number} = {};
        const cylinderPositions: {[key: string]: THREE.Vector2} = {}; // 存储每个圆柱体的位置
        
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
                    
                    // 为每个圆柱体存储原始缩放值
                    const uuid = cylinder.uuid;
                    originalScales[uuid] = 1.0;
                    // 存储位置信息
                    cylinderPositions[uuid] = new THREE.Vector2(x, y);
                    
                    cylinders.push(cylinder);
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

        // 处理鼠标移动
        function onMouseMove(event: MouseEvent) {
            // 计算鼠标在归一化设备坐标中的位置
            // (-1 到 +1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        // 添加鼠标移动事件监听器
        window.addEventListener('mousemove', onMouseMove, false);

        // 寻找指定圆柱体周围的6个相邻圆柱体
        function findNeighborCylinders(targetCylinder: THREE.Object3D): THREE.Object3D[] {
            const neighbors: THREE.Object3D[] = [];
            const targetPosition = cylinderPositions[targetCylinder.uuid];
            if (!targetPosition) return neighbors;
            
            const row = Math.round((targetPosition.y - startY) / verticalSpacing);
            const isOddRow = row % 2 === 1;
            
            // 计算六个方向的相邻位置
            const neighborOffsets = [
                // 右上, 左上
                {x: isOddRow ? horizontalSpacing / 2 : -horizontalSpacing / 2, y: verticalSpacing},
                {x: isOddRow ? horizontalSpacing * 1.5 : horizontalSpacing / 2, y: verticalSpacing},
                // 右, 左
                {x: horizontalSpacing, y: 0},
                {x: -horizontalSpacing, y: 0},
                // 右下, 左下
                {x: isOddRow ? horizontalSpacing / 2 : -horizontalSpacing / 2, y: -verticalSpacing},
                {x: isOddRow ? horizontalSpacing * 1.5 : horizontalSpacing / 2, y: -verticalSpacing},
            ];
            
            // 找到每个方向上最接近的圆柱体
            for (const offset of neighborOffsets) {
                const neighborX = targetPosition.x + offset.x;
                const neighborY = targetPosition.y + offset.y;
                
                // 找到最接近这个位置的圆柱体
                let closestCylinder: THREE.Object3D | null = null;
                let minDistance = Number.MAX_VALUE;
                
                for (const cylinder of cylinders) {
                    const cylinderPos = cylinderPositions[cylinder.uuid];
                    if (!cylinderPos) continue;
                    
                    const distance = Math.sqrt(
                        Math.pow(cylinderPos.x - neighborX, 2) + 
                        Math.pow(cylinderPos.y - neighborY, 2)
                    );
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCylinder = cylinder;
                    }
                }
                
                // 如果找到足够近的圆柱体，加入邻居列表
                if (closestCylinder && minDistance < horizontalSpacing * 1.5) {
                    neighbors.push(closestCylinder);
                }
            }
            
            return neighbors;
        }

        // 当前高亮的圆柱体集合（中心+周围）
        let highlightedCylinders: THREE.Object3D[] = [];

        // 渲染循环
        const clock = new THREE.Clock();
        let animationFrameId: number;
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // 更新射线投射器
            raycaster.setFromCamera(mouse, camera);
            
            // 检查射线与哪些物体相交
            const intersects = raycaster.intersectObjects(cylinders);
            
            // 如果有相交的物体
            if (intersects.length > 0) {
                // 获取第一个相交的物体
                const firstIntersected = intersects[0].object;
                
                // 如果是一个新的相交物体
                if (intersectedObject !== firstIntersected) {
                    // 恢复之前所有高亮的圆柱体
                    highlightedCylinders.forEach(cylinder => {
                        animateScale(cylinder, 1.0);
                    });
                    highlightedCylinders = [];
                    
                    // 设置新的中心圆柱体
                    intersectedObject = firstIntersected;
                    
                    // 找到周围的6个圆柱体
                    const neighbors = findNeighborCylinders(intersectedObject);
                    
                    // 高亮中心圆柱体和周围圆柱体
                    highlightedCylinders = [intersectedObject, ...neighbors];
                    highlightedCylinders.forEach(cylinder => {
                        animateScale(cylinder, 1.8);
                    });
                }
            } else {
                // 如果没有相交的物体，但之前有相交物体
                if (intersectedObject) {
                    // 恢复所有高亮的圆柱体
                    highlightedCylinders.forEach(cylinder => {
                        animateScale(cylinder, 1.0);
                    });
                    highlightedCylinders = [];
                    intersectedObject = null;
                }
            }
            
            // 更新缩放动画
            const delta = clock.getDelta();
            updateAnimations(delta);
            
            controls.update();
            renderer.render(scene, camera);
        }
        
        // 保存动画状态
        const animations: {
            object: THREE.Object3D;
            targetScale: number;
            currentScale: number;
            speed: number;
        }[] = [];
        
        // 添加缩放动画
        function animateScale(object: THREE.Object3D, targetScale: number) {
            // 查找是否已存在该对象的动画
            const existingAnimation = animations.find(a => a.object === object);
            
            if (existingAnimation) {
                // 更新现有动画的目标缩放
                existingAnimation.targetScale = targetScale;
            } else {
                // 创建新的动画
                animations.push({
                    object,
                    targetScale,
                    currentScale: originalScales[object.uuid] || 1.0,
                    speed: 1.0 / 0.3 // 0.3秒完成动画
                });
            }
        }
        
        // 更新所有动画
        function updateAnimations(deltaTime: number) {
            for (let i = animations.length - 1; i >= 0; i--) {
                const anim = animations[i];
                
                // 计算当前缩放与目标缩放的差距
                const diff = anim.targetScale - anim.currentScale;
                
                if (Math.abs(diff) < 0.001) {
                    // 动画完成，从列表中移除
                    animations.splice(i, 1);
                    anim.object.scale.y = anim.targetScale;
                } else {
                    // 更新当前缩放
                    const step = anim.speed * deltaTime * Math.sign(diff) * Math.min(Math.abs(diff) * 5, 1);
                    anim.currentScale += step;
                    
                    // 应用缩放
                    anim.object.scale.y = anim.currentScale;
                }
            }
        }
        
        animate();

        // 窗口大小调整
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // 清理函数
        return () => {
            // 取消动画循环
            cancelAnimationFrame(animationFrameId);
            
            // 移除事件监听器
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            
            // 清理Three.js资源
            scene.clear(); // 清空场景中的所有对象
            
            // 释放几何体和材质
            cylinderGeometry.dispose();
            cylinders.forEach(cylinder => {
                if (cylinder.material instanceof THREE.Material) {
                    cylinder.material.dispose();
                } else if (Array.isArray(cylinder.material)) {
                    cylinder.material.forEach(material => material.dispose());
                }
            });
            
            // 释放渲染器资源
            renderer.dispose();
            renderer.forceContextLoss();
            
            // 移除DOM元素
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            
            // 清空引用
            highlightedCylinders = [];
            intersectedObject = null;
            
            console.log('Cylinder component cleaned up');
        }
    }, [])

    return (
        <div ref={containerRef} className="cylinder-container"></div>
    )
}

export default Cylinder