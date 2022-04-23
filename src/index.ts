import { Application } from 'pixi.js'
import { settings } from './constants'
import { Game } from './Game';

const application = new Application({
	view: document.getElementById(settings.canvasId) as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: settings.backgroundColor,
	width: settings.width,
	height: settings.height,
  antialias: true
});

new Game(application);