import {Glowparticle} from "./glowparticle.js";

const COLORS= [
    {r:120, g:226, b:255},
    {r:251, g:213, b:107},
    {r:237, g:136, b:255},
    {r:229, g:111, b:170}
]

class App{
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2:1;

        this.totalParticles = 15;
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;

        window.addEventListener('resize',this.resize.bind(this),false)
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio,this.pixelRatio);

        this.createParticles();
    }

    createParticles(){
        let curColor = 0;
        this.particles = [];

        for(let i = 0; i<this.totalParticles;i++){
           const item = new Glowparticle(
               Math.random() * this.stageWidth,
               Math.random() * this.stageHeight,
               Math.random() *
               (this.maxRadius-this.minRadius)+this.minRadius,
               COLORS[curColor]
           );

           if(++curColor >= COLORS.length){
               curColor = 0;
           }

           this.particles[i] = item;
        }
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        for(let i=0;i<this.totalParticles;i++){
            const item = this.particles[i];
            item.animate(this.ctx,this.stageWidth,this.stageHeight);
        }

    }
}


window.onload=() =>{
    new App();
}

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;

let heightScale = clientHeight/942;
let svgwidth = 1030*heightScale;

let svg=document.getElementById('svg');

svg.setAttribute("height",clientHeight);
svg.setAttribute("width",svgwidth);
svg.setAttribute("viewbox","0,0,"+svgwidth+","+clientHeight);

let right = document.getElementById('right');
right.style.width=clientWidth-svgwidth+"px";
right.style.marginLeft=svgwidth+"px";

let fish=document.getElementById('fish');
fish.setAttribute("height",clientHeight);
fish.setAttribute("width",svgwidth);