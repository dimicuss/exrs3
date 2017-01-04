import '../stylus/app.styl'
import '../stylus/normalize.css'

import Canvas from './modules/Canvas.jsx'
import Background from './modules/Background.jsx'
import Shadow from './modules/Shadow.jsx'

function Root(props) {
	return <div className="root">
		{props.children}
	</div>
}

ReactDOM.render(
	<Root>
		<Background/>
		<Canvas canvasId="physics-entry"/>
		<Shadow />
	</Root>,
	document.querySelector('#react-entry'))
