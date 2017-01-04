import React   from 'react'
import { physics } from './Physics.jsx'


export default class Canvas extends React.Component {
	componentDidMount() {
		physics(this.props.canvasId)
	}

	render() {
		return <canvas className="canvas" id={this.props.canvasId}></canvas>
	}
}