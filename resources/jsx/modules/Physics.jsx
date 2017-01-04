import * as Physics from 'physicsjs'

require('jquery-mobile/dist/jquery.mobile.js')
$(document).ready( function() {
	$(".ui-loader").hide();
})


export function physics (el) {
	let
		windowWidth   = window.innerWidth,
		windowHeight  = window.innerHeight,
		stepNo        = 0,
		cherryCounter = 0

	const
		g        = 0.0004,
		renderer = Physics.renderer('canvas', { el }),
		options  = {
			warp: 5,
			renderSteps: 2,
			gravityFactor: 2
		},
		cherryBox  = Physics.aabb(0, 0, windowWidth, windowHeight),
		edgeBounce = Physics.behavior('edge-collision-detection', {
			aabb: cherryBox,
			restitution: 0.5,
			cof: 0.5
		}),
		images = [
			'images/image1.png',
			'images/image2.png',
			'images/image3.png',
			'images/image4.png',
			'images/image5.png'
		]
			.map( url => {
				const image = new Image()
				image.src   = require(`../../${url}`)
				return image
			})




	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function getRandomXPosition() {
		return getRandomInt(0, windowWidth)
	}


	function getRandomFrom(arr) {
		const lastIndex = arr.length - 1
		return arr[getRandomInt(0, lastIndex)]
	}


	function generateCherrys(n) {
		cherryCounter = cherryCounter + n

		if(cherryCounter >= 340) {
			return []
		}

		const circles = []
		while( n--) {
			const circle = Physics.body('circle', {
				x: getRandomXPosition(), // x-coordinate
				y: 30, // y-coordinate
				vx: 0, // velocity in x-direction
				vy: 0.01, // velocity in y-direction
				mass: 500,
				radius: 40
			})
			circle.view = getRandomFrom(images)
			circles.push(circle)
		}
		return circles
	}


	function resize() {
		const newCherryBox = Physics.aabb(0, 0, windowWidth, windowHeight)
		edgeBounce.setAABB(newCherryBox)
		renderer.resize(windowWidth, windowHeight)
	}


	function cherryDropper(n) {
		return () => {
			const cherry = generateCherrys( n )

			if (cherry.length == 0) {
				alert( 'Cherry finished' )
			} else {
				this.add( cherry )
			}
		}
	}



	Physics.world(world => {
		world.add(renderer); resize()

		world.add([
			edgeBounce,
			Physics.behavior('constant-acceleration')
				.setAcceleration({
					x: 0,
					y: g * options.gravityFactor
				}),
			Physics.behavior('body-collision-detection'),
			Physics.behavior('body-impulse-response'),
			Physics.behavior('sweep-prune')
		])

		world.warp(options.warp);

		world.on('step', function () {
			++stepNo;
			if (stepNo % options.renderSteps === 0) {
				world.render();
			}
		})

		Physics.util.ticker.on( time => {
			world.step( time );
		})

		Physics.util.ticker.start();

		window.addEventListener('resize', event => {
			windowWidth  = event.target.innerWidth
			windowHeight = event.target.innerHeight
			world.wakeUpAll()
			resize()
		}, true)

		document.addEventListener('wheel', cherryDropper.call(world, 1))
		$(document).swipe(cherryDropper.call(world, 5))
	})
}
