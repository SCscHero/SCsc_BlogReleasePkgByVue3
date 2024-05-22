"use strict";(self.webpackChunkufqi_CnBlog=self.webpackChunkufqi_CnBlog||[]).push([[729],{"9bdccf646e07a1d88cb5":(t,i,e)=>{function n(t,i){i=t.indexOf(i);-1!=i&&t.splice(i,1)}e.r(i),e.d(i,{demo:()=>E}),h=(r={}).util={},o=Array.prototype.concat,a=Array.prototype.slice,h.bind=function(t,i){var e=a.call(arguments,2);return function(){t.apply(i,o.call(e,a.call(arguments)))}},h.extend=function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])},e=r.SpringSystem=function(t){this._springRegistry={},this._activeSprings=[],this.listeners=[],this._idleSpringIndices=[],this.looper=t||new c,this.looper.springSystem=this},h.extend(e.prototype,{_springRegistry:null,_isIdle:!0,_lastTimeMillis:-1,_activeSprings:null,listeners:null,_idleSpringIndices:null,setLooper:function(t){(this.looper=t).springSystem=this},createSpring:function(t,i){t=void 0===t||void 0===i?l.DEFAULT_ORIGAMI_SPRING_CONFIG:l.fromOrigamiTensionAndFriction(t,i);return this.createSpringWithConfig(t)},createSpringWithBouncinessAndSpeed:function(t,i){t=void 0===t||void 0===i?l.DEFAULT_ORIGAMI_SPRING_CONFIG:l.fromBouncinessAndSpeed(t,i);return this.createSpringWithConfig(t)},createSpringWithConfig:function(t){var i=new v(this);return this.registerSpring(i),i.setSpringConfig(t),i},getIsIdle:function(){return this._isIdle},getSpringById:function(t){return this._springRegistry[t]},getAllSprings:function(){var t,i=[];for(t in this._springRegistry)this._springRegistry.hasOwnProperty(t)&&i.push(this._springRegistry[t]);return i},registerSpring:function(t){this._springRegistry[t.getId()]=t},deregisterSpring:function(t){n(this._activeSprings,t),delete this._springRegistry[t.getId()]},advance:function(t,i){for(;0<this._idleSpringIndices.length;)this._idleSpringIndices.pop();for(var e=0,n=this._activeSprings.length;e<n;e++){var s=this._activeSprings[e];s.systemShouldAdvance()?s.advance(t/1e3,i/1e3):this._idleSpringIndices.push(this._activeSprings.indexOf(s))}for(;0<this._idleSpringIndices.length;){var r=this._idleSpringIndices.pop();0<=r&&this._activeSprings.splice(r,1)}},loop:function(t){-1===this._lastTimeMillis&&(this._lastTimeMillis=t-1);for(var i,e=t-this._lastTimeMillis,n=(this._lastTimeMillis=t,0),s=this.listeners.length,n=0;n<s;n++)(i=this.listeners[n]).onBeforeIntegrate&&i.onBeforeIntegrate(this);for(this.advance(t,e),0===this._activeSprings.length&&(this._isIdle=!0,this._lastTimeMillis=-1),n=0;n<s;n++)(i=this.listeners[n]).onAfterIntegrate&&i.onAfterIntegrate(this);this._isIdle||this.looper.run()},activateSpring:function(t){t=this._springRegistry[t];-1==this._activeSprings.indexOf(t)&&this._activeSprings.push(t),this.getIsIdle()&&(this._isIdle=!1,this.looper.run())},addListener:function(t){this.listeners.push(t)},removeListener:function(t){n(this.listeners,t)},removeAllListeners:function(){this.listeners=[]}}),v=r.Spring=function t(i){this._id="s"+t._ID++,this._springSystem=i,this.listeners=[],this._currentState=new u,this._previousState=new u,this._tempState=new u},h.extend(v,{_ID:0,MAX_DELTA_TIME_SEC:.064,SOLVER_TIMESTEP_SEC:.001}),h.extend(v.prototype,{_id:0,_springConfig:null,_overshootClampingEnabled:!1,_currentState:null,_previousState:null,_tempState:null,_startValue:0,_endValue:0,_wasAtRest:!0,_restSpeedThreshold:.001,_displacementFromRestThreshold:.001,listeners:null,_timeAccumulator:0,_springSystem:null,destroy:function(){this.listeners=[],this.frames=[],this._springSystem.deregisterSpring(this)},getId:function(){return this._id},setSpringConfig:function(t){return this._springConfig=t,this},getSpringConfig:function(){return this._springConfig},setCurrentValue:function(t,i){return this._startValue=t,this._currentState.position=t,i||this.setAtRest(),this.notifyPositionUpdated(!1,!1),this},getStartValue:function(){return this._startValue},getCurrentValue:function(){return this._currentState.position},getCurrentDisplacementDistance:function(){return this.getDisplacementDistanceForState(this._currentState)},getDisplacementDistanceForState:function(t){return Math.abs(this._endValue-t.position)},setEndValue:function(t){if(this._endValue!=t||!this.isAtRest()){this._startValue=this.getCurrentValue(),this._endValue=t,this._springSystem.activateSpring(this.getId());for(var i=0,e=this.listeners.length;i<e;i++){var n=this.listeners[i].onSpringEndStateChange;n&&n(this)}}return this},getEndValue:function(){return this._endValue},setVelocity:function(t){return t!==this._currentState.velocity&&(this._currentState.velocity=t,this._springSystem.activateSpring(this.getId())),this},getVelocity:function(){return this._currentState.velocity},setRestSpeedThreshold:function(t){return this._restSpeedThreshold=t,this},getRestSpeedThreshold:function(){return this._restSpeedThreshold},setRestDisplacementThreshold:function(t){this._displacementFromRestThreshold=t},getRestDisplacementThreshold:function(){return this._displacementFromRestThreshold},setOvershootClampingEnabled:function(t){return this._overshootClampingEnabled=t,this},isOvershootClampingEnabled:function(){return this._overshootClampingEnabled},isOvershooting:function(){var t=this._startValue,i=this._endValue;return 0<this._springConfig.tension&&(t<i&&this.getCurrentValue()>i||i<t&&this.getCurrentValue()<i)},advance:function(t,i){var e=this.isAtRest();if(!e||!this._wasAtRest){for(var n,s,r,o,a,h,u,l,c=i,_=(i>v.MAX_DELTA_TIME_SEC&&(c=v.MAX_DELTA_TIME_SEC),this._timeAccumulator+=c,this._springConfig.tension),p=this._springConfig.friction,g=this._currentState.position,d=this._currentState.velocity,f=this._tempState.position,S=this._tempState.velocity;this._timeAccumulator>=v.SOLVER_TIMESTEP_SEC;)this._timeAccumulator-=v.SOLVER_TIMESTEP_SEC,this._timeAccumulator<v.SOLVER_TIMESTEP_SEC&&(this._previousState.position=g,this._previousState.velocity=d),n=d,s=_*(this._endValue-f)-p*d,f=g+n*v.SOLVER_TIMESTEP_SEC*.5,r=S=d+s*v.SOLVER_TIMESTEP_SEC*.5,o=_*(this._endValue-f)-p*S,f=g+r*v.SOLVER_TIMESTEP_SEC*.5,a=S=d+o*v.SOLVER_TIMESTEP_SEC*.5,h=_*(this._endValue-f)-p*S,f=g+a*v.SOLVER_TIMESTEP_SEC*.5,u=S=d+h*v.SOLVER_TIMESTEP_SEC*.5,l=_*(this._endValue-f)-p*S,g+=1/6*(n+2*(r+a)+u)*v.SOLVER_TIMESTEP_SEC,d+=1/6*(s+2*(o+h)+l)*v.SOLVER_TIMESTEP_SEC;this._tempState.position=f,this._tempState.velocity=S,this._currentState.position=g,this._currentState.velocity=d,0<this._timeAccumulator&&this._interpolate(this._timeAccumulator/v.SOLVER_TIMESTEP_SEC),(this.isAtRest()||this._overshootClampingEnabled&&this.isOvershooting())&&(0<this._springConfig.tension?(this._startValue=this._endValue,this._currentState.position=this._endValue):(this._endValue=this._currentState.position,this._startValue=this._endValue),this.setVelocity(0),e=!0);i=!1,c=(this._wasAtRest&&(i=!(this._wasAtRest=!1)),!1);e&&(c=this._wasAtRest=!0),this.notifyPositionUpdated(i,c)}},notifyPositionUpdated:function(t,i){for(var e=0,n=this.listeners.length;e<n;e++){var s=this.listeners[e];t&&s.onSpringActivate&&s.onSpringActivate(this),s.onSpringUpdate&&s.onSpringUpdate(this),i&&s.onSpringAtRest&&s.onSpringAtRest(this)}},systemShouldAdvance:function(){return!this.isAtRest()||!this.wasAtRest()},wasAtRest:function(){return this._wasAtRest},isAtRest:function(){return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(this.getDisplacementDistanceForState(this._currentState)<=this._displacementFromRestThreshold||0===this._springConfig.tension)},setAtRest:function(){return this._endValue=this._currentState.position,this._tempState.position=this._currentState.position,this._currentState.velocity=0,this},_interpolate:function(t){this._currentState.position=this._currentState.position*t+this._previousState.position*(1-t),this._currentState.velocity=this._currentState.velocity*t+this._previousState.velocity*(1-t)},getListeners:function(){return this.listeners},addListener:function(t){return this.listeners.push(t),this},removeListener:function(t){return n(this.listeners,t),this},removeAllListeners:function(){return this.listeners=[],this},currentValueIsApproximately:function(t){return Math.abs(this.getCurrentValue()-t)<=this.getRestDisplacementThreshold()}}),u=function(){},h.extend(u.prototype,{position:0,velocity:0}),l=r.SpringConfig=function(t,i){this.tension=t,this.friction=i},c=r.AnimationLooper=function(){this.springSystem=null;function t(){i.springSystem.loop(Date.now())}var i=this;this.run=function(){h.onFrame(t)}},r.SimulationLooper=function(t){this.springSystem=null;var i=0,e=!1;t=t||16.667,this.run=function(){if(!e){for(e=!0;!this.springSystem.getIsIdle();)this.springSystem.loop(i+=t);e=!1}}},r.SteppingSimulationLooper=function(t){this.springSystem=null;var i=0;this.run=function(){},this.step=function(t){this.springSystem.loop(i+=t)}},_=r.OrigamiValueConverter={tensionFromOrigamiValue:function(t){return 3.62*(t-30)+194},origamiValueFromTension:function(t){return(t-194)/3.62+30},frictionFromOrigamiValue:function(t){return 3*(t-8)+25},origamiFromFriction:function(t){return(t-25)/3+8}},e=r.BouncyConversion=function(t,i){this.bounciness=t,this.speed=i;t=this.normalize(t/1.7,0,20),t=this.projectNormal(t,0,.8),i=this.normalize(i/1.7,0,20);this.bouncyTension=this.projectNormal(i,.5,200),this.bouncyFriction=this.quadraticOutInterpolation(t,this.b3Nobounce(this.bouncyTension),.01)},h.extend(e.prototype,{normalize:function(t,i,e){return(t-i)/(e-i)},projectNormal:function(t,i,e){return i+t*(e-i)},linearInterpolation:function(t,i,e){return t*e+(1-t)*i},quadraticOutInterpolation:function(t,i,e){return this.linearInterpolation(2*t-t*t,i,e)},b3Friction1:function(t){return 7e-4*Math.pow(t,3)-.031*Math.pow(t,2)+.64*t+1.28},b3Friction2:function(t){return 44e-6*Math.pow(t,3)-.006*Math.pow(t,2)+.36*t+2},b3Friction3:function(t){return 45e-8*Math.pow(t,3)-332e-6*Math.pow(t,2)+.1078*t+5.84},b3Nobounce:function(t){return t<=18?this.b3Friction1(t):18<t&&t<=44?this.b3Friction2(t):this.b3Friction3(t)}}),h.extend(l,{fromOrigamiTensionAndFriction:function(t,i){return new l(_.tensionFromOrigamiValue(t),_.frictionFromOrigamiValue(i))},fromBouncinessAndSpeed:function(t,i){t=new r.BouncyConversion(t,i);return this.fromOrigamiTensionAndFriction(t.bouncyTension,t.bouncyFriction)},coastingConfigWithOrigamiFriction:function(t){return new l(0,_.frictionFromOrigamiValue(t))}}),l.DEFAULT_ORIGAMI_SPRING_CONFIG=l.fromOrigamiTensionAndFriction(40,7),h.extend(l.prototype,{friction:0,tension:0}),p={},h.hexToRGB=function(t){var i;return p[t]||(i=(t=3===(t=t.replace("#","")).length?t[0]+t[0]+t[1]+t[1]+t[2]+t[2]:t).match(/.{2}/g),i={r:parseInt(i[0],16),g:parseInt(i[1],16),b:parseInt(i[2],16)},p[t]=i)},h.rgbToHex=function(t,i,e){return t=t.toString(16),i=i.toString(16),e=e.toString(16),"#"+(t=t.length<2?"0"+t:t)+(i=i.length<2?"0"+i:i)+(e=e.length<2?"0"+e:e)},e=r.MathUtil={mapValueInRange:function(t,i,e,n,s){return n+(t-i)/(e-i)*(s-n)},interpolateColor:function(t,i,e,n,s,r){n=void 0===n?0:n,s=void 0===s?1:s,i=h.hexToRGB(i),e=h.hexToRGB(e);var o=Math.floor(h.mapValueInRange(t,n,s,i.r,e.r)),a=Math.floor(h.mapValueInRange(t,n,s,i.g,e.g)),t=Math.floor(h.mapValueInRange(t,n,s,i.b,e.b));return r?"rgb("+o+","+a+","+t+")":h.rgbToHex(o,a,t)},degreesToRadians:function(t){return t*Math.PI/180},radiansToDegrees:function(t){return 180*t/Math.PI}},h.extend(h,e),(s="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}:s)||"undefined"==typeof process||"node"!==process.title||(s=setImmediate),h.onFrame=function(t){return s(t)},"undefined"!=typeof exports?h.extend(exports,r):"undefined"!=typeof window&&(window.rebound=r);var s,r,h,o,a,v,u,l,c,_,p,i=function(t,i,e){return i&&g(t.prototype,i),e&&g(t,e),t};function g(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}i(S,[{key:"_getRegularPolygonPoints",value:function(){for(var t=[],i=0;i<this._sides;){var e=-this._radius*Math.sin(2*i*Math.PI/this._sides),n=this._radius*Math.cos(2*i*Math.PI/this._sides);t.push({x:e,y:n}),i++}return t}},{key:"_getInscribedPoints",value:function(e,n){var s=this,r=[];return e.forEach(function(t,i){i=(i=e[i+1])||e[0],t=s._getInterpolatedPoint(t,i,n);r.push(t)}),r}},{key:"_getInterpolatedPoint",value:function(t,i,e){var n=t.x,t=t.y;return{x:n+(i.x-n)*e,y:t+(i.y-t)*e}}},{key:"_getUpdatedChildren",value:function(t){for(var i=[],e=0;e<this._depth;e++){var n=i[e-1]||this.points,n=this._getInscribedPoints(n,t);i.push(n)}return i}},{key:"renderChildren",value:function(n,t){var s=this,r=this._getUpdatedChildren(t);r.forEach(function(t,i){n.beginPath(),t.forEach(function(t){return n.lineTo(t.x,t.y)}),n.closePath();var t=s._colors.stroke,e=s._colors.child;t&&(n.strokeStyle=t,n.stroke()),e&&(t=rebound.util.hexToRGB(e),e=1/r.length,t="rgba("+t.r+", "+t.g+", "+t.b+", "+(e+e*i)+")",n.fillStyle=t,n.shadowColor="rgba(0,0,0, 0.1)",n.shadowBlur=10,n.shadowOffsetX=0,n.shadowOffsetY=0,n.fill())})}},{key:"render",value:function(i){i.save(),i.translate(this._x,this._y),0!==this.rotation&&i.rotate(rebound.MathUtil.degreesToRadians(this.rotation)),1!==this.scale&&i.scale(this.scale,this.scale),i.beginPath(),this.points.forEach(function(t){return i.lineTo(t.x,t.y)}),i.closePath();var t=this._colors.stroke,e=this._colors.base;t&&(i.strokeStyle=t,i.stroke()),e&&(i.fillStyle=e,i.fill()),i.restore()}}]);var f=S;function S(){var t=arguments.length<=0||void 0===arguments[0]?100:arguments[0],i=arguments.length<=1||void 0===arguments[1]?3:arguments[1],e=arguments.length<=2||void 0===arguments[2]?0:arguments[2],n=arguments[3];d(this,S),this._radius=t,this._sides=i,this._depth=e,this._colors=n,this._x=0,this._y=0,this.rotation=0,this.scale=1,this.points=this._getRegularPolygonPoints()}i(y,[{key:"init",value:function(t,i,e){this._containDom=e,this._canvas.style.backgroundColor="body"==this._containDom.localName?R.loading.spinner.colors.background:"white",this._addCanvas(),this._spring=t,this._addSpringListener(),(this._isAutoSpin=i)?this._spin():(this._spring.setEndValue(0),this.render())}},{key:"_addCanvas",value:function(){("body"==this._containDom.localName?document.body:this._containDom).appendChild(this._canvas),this._context=this._canvas.getContext("2d"),this._setCanvasSize()}},{key:"_setCanvasSize",value:function(){var t;"body"==this._containDom.localName?(this._canvasW=this._canvas.width=window.innerWidth,this._canvasH=this._canvas.height=window.innerHeight):(t=getComputedStyle(this._containDom),this._canvasW=this._canvas.width=t.width.replace("px",""),this._canvasH=this._canvas.height=t.height.replace("px","")),this._canvas.style.margin="inherit",this._canvas.style.position="fixed",this._canvas.style.top=0,this._canvas.style.left=0,this._centerX=this._canvasW/2,this._centerY=this._canvasH/2}},{key:"_addSpringListener",value:function(){var n=this;this._spring.addListener({onSpringUpdate:function(t){var t=t.getCurrentValue(),i=n._springRangeLow,e=n._springRangeHigh,t=rebound.MathUtil.mapValueInRange(t,0,1,i,e);n.render(t)}})}},{key:"setComplete",value:function(){this._isCompleting=!0}},{key:"_completeAnimation",value:function(){this._canvasOpacity-=.1,this._canvas.style.opacity=this._canvasOpacity,this._canvasOpacity<=0&&(this._isAutoSpin=!1,this._spring.setAtRest(),this._canvas.remove())}},{key:"_spin",value:function(){var t;this._alwaysForward&&(t=this._spring.getCurrentValue(),this._restThreshold&&1===t&&this._switchSpringRange(),1===t)&&this._spring.setCurrentValue(0).setAtRest(),this._spring.setEndValue(1===this._spring.getCurrentValue()?0:1)}},{key:"_switchSpringRange",value:function(){var t=this._restThreshold;this._springRangeLow=this._springRangeLow===t?0:t,this._springRangeHigh=this._springRangeHigh===t?1:t}},{key:"render",value:function(t){t&&(this._progress=Math.round(1e4*t)/1e4),this._isAutoSpin&&this._spring.isAtRest()&&this._spin(),this._isCompleting&&this._completeAnimation(),this._context.clearRect(0,0,this._canvasW,this._canvasH),this._context.save(),this._context.translate(this._centerX,this._centerY),this._context.lineWidth=1.5,this._renderBase&&this._basePolygon.render(this._context),this._basePolygon.renderChildren(this._context,this._progress),this._context.restore()}}]);var m=y;function y(t){d(this,y);t.id;var i=t.radius,e=t.sides,n=t.depth,s=t.colors,r=t.alwaysForward,o=t.restAt,t=t.renderBase;e<3&&(e=3),this._canvas=document.createElement("canvas"),this._canvasW=null,this._canvasH=null,this._canvasOpacity=1,this._centerX=null,this._centerY=null,this._alwaysForward=r,this._restThreshold=o,this._renderBase=t,this._springRangeLow=0,this._springRangeHigh=this._restThreshold||1,this._basePolygon=new f(i,e,n,s),this._progress=0,this._isAutoSpin=null,this._isCompleting=null}var R={Author:"SCscHero",loading:{rebound:{tension:16,friction:5},spinner:{id:"spinner",radius:45,sides:3,depth:4,colors:{background:"#f0f0f0",stroke:"#272633",base:null,child:"#272633"},alwaysForward:!0,restAt:.5,renderBase:!1}}},E={settings:R.loading,spring:null,spinner:null,initRebound:function(){var t=E.settings.rebound,i=new rebound.SpringSystem;E.spring=i.createSpring(t.tension,t.friction)},initSpinner:function(){var t=E.settings.spinner;E.spinner=new m(t)},loadSomething:function(){var t=new XMLHttpRequest;t.addEventListener("progress",function(t){t.lengthComputable&&(t=Math.ceil(t.loaded/t.total*100),E.spring.setEndValue(.01*t))}),t.addEventListener("load",function(t){E.spinner.setComplete()}),t.open("GET","/img/something.jpg"),t.send()}}}}]);