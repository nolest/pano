import '@/styles/archi/archi.scss'

function Archi() {
    return (
        <>
            <div className="ds-flex flex-wrap">
                <div className="archi-app-container">
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`从Flutter了解到的BLOC架构`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`业务调用、业务逻辑`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`数据管理、数据来源`}</p>
                    {/* BLoC 架构层级展示 */}
                    <div className="archi-layer ui-layer">
                        <h3>UI Components</h3>
                        <p>展示用户界面，接收用户输入</p>
                        <div className="data-flow">用户事件 → BLoC</div>
                    </div>

                    <div className="archi-layer bloc-layer">
                        <h3>BLoC Layer</h3>
                        <p>处理业务逻辑，管理状态</p>
                        <div className="data-flow">状态流 → UI</div>
                        <div className="data-flow">事件流 → Repository</div>
                    </div>

                    <div className="archi-layer repository-layer">
                        <h3>Repository</h3>
                        <p>数据管理，提供数据访问接口</p>
                        <div className="data-flow">请求数据 → Data Sources</div>
                        <div className="data-flow">返回数据 → BLoC</div>
                    </div>

                    <div className="archi-layer data-layer">
                        <h3>Data Sources</h3>
                        <p>数据来源，如API或本地数据库</p>
                        <div className="data-flow">API / Local DB</div>
                    </div>

                </div>

                <div className="archi-app-container">
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`现代前端框架的MVVM架构`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`双向数据绑定`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`Vue、React、Angular`}</p>
                    <div className="archi-layer ui-layer">
                        <h4>View</h4>
                        <p>展示用户界面，接收用户输入</p>
                        <div className="data-flow">用户事件 → ViewModel</div>
                    </div>

                    <div className="archi-layer viewmodel-layer">
                        <h4>ViewModel</h4>
                        <p>处理UI逻辑，管理UI状态</p>
                        <div className="data-flow">状态流 → View</div>
                        <div className="data-flow">事件流 → Model</div>
                    </div>

                    <div className="archi-layer model-layer">
                        <h4>Model</h4>
                        <p>数据管理，提供数据访问接口</p>
                        <div className="data-flow">请求数据 → 数据源</div>
                        <div className="data-flow">返回数据 → ViewModel</div>
                    </div>

                    <div className="archi-layer data-sources-layer">
                        <h4>Data Sources</h4>
                        <p>数据来源，如API或本地数据库</p>
                        <div className="data-flow">API / Local DB</div>
                    </div>
                </div>
            
                <div className="archi-app-container">
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`可以应用于任何地方的MVC架构`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`例如JSP 、 express`}</p>
                    <p className="ds-flex flex-center" style={{ color: '#fff' }}>{`例如Backbone + handlebars`}</p>
                        <div className="archi-layer v-layer">
                            <h4>View</h4>
                            <p>展示用户界面，接收用户输入</p>
                            <div className="data-flow">用户事件 → Controller</div>
                        </div>

                        <div className="archi-layer c-layer">
                            <h4>Controller</h4>
                            <p>处理用户输入，更新Model和View</p>
                            <div className="data-flow">更新数据 → Model</div>
                            <div className="data-flow">更新视图 → View</div>
                        </div>

                        <div className="archi-layer m-layer">
                            <h4>Model</h4>
                            <p>数据管理，提供数据访问接口</p>
                            <div className="data-flow">请求数据 → 数据源</div>
                            <div className="data-flow">返回数据 → Controller</div>
                        </div>

                        <div className="archi-layer data-sources-layer">
                            <h4>Data Sources</h4>
                            <p>数据来源，如API或本地数据库</p>
                            <div className="data-flow">API / Local DB</div>
                        </div>
                  
                </div>
            </div>

        </>
    )
}

export default Archi
