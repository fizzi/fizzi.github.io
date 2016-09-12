function splitLines(t){return t.split(/\r?\n|\r/)}function StringStream(t){this.pos=this.start=0,this.string=t,this.lineStart=0}StringStream.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(t){var e=this.string.charAt(this.pos);if("string"==typeof t)var n=e==t;else var n=e&&(t.test?t.test(e):t(e));if(n)return++this.pos,e},eatWhile:function(t){for(var e=this.pos;this.eat(t););return this.pos>e},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skipToEnd:function(){this.pos=this.string.length},skipTo:function(t){var e=this.string.indexOf(t,this.pos);if(e>-1)return this.pos=e,!0},backUp:function(t){this.pos-=t},column:function(){return this.start-this.lineStart},indentation:function(){return 0},match:function(t,e,n){if("string"!=typeof t){var r=this.string.slice(this.pos).match(t);return r&&r.index>0?null:(r&&e!==!1&&(this.pos+=r[0].length),r)}var s=function(t){return n?t.toLowerCase():t},i=this.string.substr(this.pos,t.length);if(s(i)==s(t))return e!==!1&&(this.pos+=t.length),!0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(t,e){this.lineStart+=t;try{return e()}finally{this.lineStart-=t}}},exports.StringStream=StringStream,exports.startState=function(t,e,n){return!t.startState||t.startState(e,n)};var modes=exports.modes={},mimeModes=exports.mimeModes={};exports.defineMode=function(t,e){if(arguments.length>2){e.dependencies=[];for(var n=2;n<arguments.length;++n)e.dependencies.push(arguments[n])}modes[t]=e},exports.defineMIME=function(t,e){mimeModes[t]=e},exports.defineMode("null",function(){return{token:function(t){t.skipToEnd()}}}),exports.defineMIME("text/plain","null"),exports.resolveMode=function(t){return"string"==typeof t&&mimeModes.hasOwnProperty(t)?t=mimeModes[t]:t&&"string"==typeof t.name&&mimeModes.hasOwnProperty(t.name)&&(t=mimeModes[t.name]),"string"==typeof t?{name:t}:t||{name:"null"}},exports.getMode=function(t,e){e=exports.resolveMode(e);var n=modes[e.name];if(!n)throw new Error("Unknown mode: "+e);return n(t,e)},exports.registerHelper=exports.registerGlobalHelper=Math.min,exports.runMode=function(t,e,n,r){for(var s=exports.getMode({indentUnit:2},e),i=splitLines(t),o=r&&r.state||exports.startState(s),a=0,h=i.length;a<h;++a){a&&n("\n");var p=new exports.StringStream(i[a]);for(!p.string&&s.blankLine&&s.blankLine(o);!p.eol();){var u=s.token(p,o);n(p.current(),u,a,p.start,o),p.start=p.pos}}},require.cache[require.resolve("../../lib/codemirror")]=require.cache[require.resolve("./runmode.node")];