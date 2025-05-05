/**
 * @name        Paya Calendar
 * @version     1.0.0
 * @author      rebelliume <rebelliume@gmail.com>
 * @contact     rebelliume
 * @copyright   rebelliume
 * @license     MIT
 * @released    2025/05/05
 * 
 * @requires    terminal.js
 * @requires    selector.js
 * @requires    box.js
 * 
 * @returns {object}
 */

(function() {

    if (typeof window.$ID !== 'function') {
        console.error('selector.js is missing');

        return;
    }
    if (typeof window.$BOX !== 'function') {
        console.error('box.js is missing');

        return;
    }
})();

class paya extends terminal{
    #element            = null;
    #hex                = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    #upTime             = new Date();

    #farestPlanet       = 0;
    #farestPlanetDPI    = 0;
    #multDPI            = 22;
    #cosmosSize         = 0;
    #cosmosSizeHDiv     = 0;
    #cosmosSizeWDiv     = 0;
    #defDiffDateErr     = 0;
    #defNowDateErr      = 0;
    #geoLongitude       = {};
    #moonLongitude      = 0;
    #nowDate            = 0;

    #planets    = [
        {
            name: "Solar",
            diameter: 1392700,
            distance: 0,
            rotationPeriod: 25.38,
            alignment: 7.25,
            gravity: 274,
            color: '#ffff00',
            orbitalPeriod: 0,
            temperature: {
              average: 5505,
              min: 5505,
              max: 5778
            }
        },
        {
            name: "Mercury",
            diameter: 4879.4,
            distance: 57910000,
            rotationPeriod: 58.646,
            alignment: 0.03,
            gravity: 3.7,
            color: '#b2b2b2',
            orbitalPeriod: 87.97,
            temperature: {
                average: 167,
                min: -173,
                max: 427
            }
        },            
        {
            name: "Venus",
            diameter: 12103.6,
            distance: 108200000,
            rotationPeriod: -243.018,
            alignment: 177.3,
            gravity: 8.87,
            color: '#e5d400',
            orbitalPeriod: 224.70,
            temperature: {
                average: 464,
                min: 462,
                max: 471
            }
        },
        { 
            name: "Earth", 
            diameter: 12756.2, 
            distance: 149600000, 
            rotationPeriod: 23.936, 
            alignment: -23,
            gravity: 9.8,
            color: '#4444ff',
            orbitalPeriod: 365.25,
            temperature: {
                average: 14,
                min: -89.2,
                max: 57.8
            }
        },
        { 
            name: "Mars", 
            diameter: 6792.4, 
            distance: 227900000, 
            rotationPeriod: 24.632, 
            alignment: 3,
            gravity: 3.7,
            color: '#ff0000',
            orbitalPeriod: 686.97,
            temperature: {
                average: -63,
                min: -143,
                max: 35
            }
        },
        { 
            name: "Jupiter", 
            diameter: 142984, 
            distance: 778300000, 
            rotationPeriod: 9.925, 
            alignment: -38,
            gravity: 24.8,
            color: '#ff7f00',
            orbitalPeriod: 4332.59,
            temperature: {
                average: -145,
                min: -234,
                max: -108
            }
        },
        { 
            name: "Saturn", 
            diameter: 120536, 
            distance: 1400000000, 
            rotationPeriod: 10.56, 
            alignment: -45,
            gravity: 10.4, 
            color: '#ffd700',
            orbitalPeriod: 10759.22,
            temperature: {
                average: -178,
                min: -218,
                max: -139
            }
        },
        { 
            name: "Uranus", 
            diameter: 51118, 
            distance: 2900000000, 
            rotationPeriod: 17.24, 
            alignment: -36,
            gravity: 8.7, 
            color: '#00ffff',
            orbitalPeriod: 30688.50,
            temperature: {
                average: -214,
                min: -224,
                max: -205
            }
        },
        { 
            name: "Neptune", 
            diameter: 49528, 
            distance: 4500000000, 
            rotationPeriod: 16.11, 
            alignment: -47,
            gravity: 11.2, 
            color: '#6666ff',
            orbitalPeriod: 60190.03,
            temperature: {
                average: -200,
                min: -218,
                max: -184
            }
        },
        {
            name: "Pluto",
            diameter: 2370,
            distance: 5906400000,
            rotationPeriod: 6.387,
            alignment: 17.16,
            gravity: 0.62,
            color: '#a67b5b',
            orbitalPeriod: 90560.07,
            temperature: {
                average: -375,
                min: -387,
                max: -369
            }
        },
        { 
            name: "Ceres", 
            diameter: 964.3, 
            distance: 413700000, 
            rotationPeriod: 9.074, 
            alignment: -2,
            gravity: 0.27, 
            color: '#ffffff',
            orbitalPeriod: 1681.63,
            temperature: {
                average: -105,
                min: -153,
                max: -38
            }
        },                            
        {
            name: "Eris",
            diameter: 2326,
            distance: 10138000000,
            rotationPeriod: 25.9,
            alignment: 44.04,
            gravity: 0.82,
            color: '#ffffff',
            orbitalPeriod: 203830,
            temperature: {
                average: -238,
                min: -248,
                max: -228
            }
        },
        {
            name: "Haumea",
            diameter: 1960,
            distance: 6478000000,
            rotationPeriod: 3.915,
            alignment: 28.19,
            gravity: 0.44,
            color: '#ffffff',
            orbitalPeriod: 285195.4,
            temperature: {
                average: -241,
                min: -248,
                max: -234
            }
        },       
        {
            name: "Makemake",
            diameter: 1434,
            distance: 6850000000,
            rotationPeriod: 22.5,
            alignment: 29.006,
            gravity: 0.44,
            color: '#ffffff',
            orbitalPeriod: 309871.9,
            temperature: {
                average: -239,
                min: -243,
                max: -234
            }
        }      
    ];
    #moon       = {
        name: "Moon", 
        diameter: 3474.2, 
        distance: 384400, 
        rotationPeriod: 655.728, 
        alignment: -6,
        gravity: 1.6,
        color: '#ffffff',
        orbitalPeriod: 27.3,
        temperature: {
            average: -20,
            min: -153,
            max: 123
        }
    };
    #zodiac     = [
        { name: "Aries", month: 3, day: 21 },
        { name: "Taurus", month: 4, day: 20 },
        { name: "Gemini", month: 5, day: 21 },
        { name: "Cancer", month: 6, day: 21 },
        { name: "Leo", month: 7, day: 23 },
        { name: "Virgo", month: 8, day: 23 },
        { name: "Libra", month: 9, day: 23 },
        { name: "Scorpio", month: 10, day: 23 },
        { name: "Sagittarius", month: 11, day: 22 },
        { name: "Capricorn", month: 12, day: 22 },
        { name: "Aquarius", month: 1, day: 20 },
        { name: "Pisces", month: 2, day: 19 }
    ];

    #settings = {
        title :         null,
        path :          null,
        user :          null,
        height :        null,
        width :         null,
        opacity :       null,
        fgColor :       null,
        bgColor :       null,
        fontName :      null,
        fontSize :      null,
        dateOption :    null,
        typeMode :      null,
        readOnly :      null,
        disposable:     null,
        minimizable:    null,
        movable:        null,
        resizable:      null
    };

    #hexID = {
        body:           this.#random(8),       
        dataTitleID:    this.#random(8),
        dataBodyID:     this.#random(8),
        termBodyID:     this.#random(8),
    }

    /**
     *  @param {string} Title
     *  @param {string} Height
     *  @param {string} Width
     *  @param {number} Opacity
     *  @param {string} Foreground Color
     *  @param {string} Background Color
     *  @param {string} Title Color
     *  @param {string} Font Name
     *  @param {number} Font Size
     *  @param {boolean} Date Option
     *  @param {boolean} Type Mode
     *  @param {boolean} Read Only
     *  @param {boolean} Disposable
     *  @param {boolean} Minimizable
     *  @param {boolean} Movable
     *  @param {boolean} Resizable
     */
    constructor(config = {}) {
        super({ title: 'Terminal',
                movable: false });

        const defaults = {
            element: 'paya',
            title: 'Paya',
            path: '/',
            user: 'default',
            height: '690px',
            width: '650px',
            opacity: 0.75,
            fgColor: '#ffffff',
            bgColor: '#000000',
            tlColor: '#121212',
            fontName: 'Lucida Console',
            fontSize: 11,
            dateOption: false,
            typeMode: false,
            readOnly: false,
            disposable: true,
            minimizable: true,
            movable: true,
            resizable: false
        };

        this.#settings = { ...defaults, ...config };

        this.#element       = this.#settings.element;

        if(typeof terminal !== 'undefined') {
            if($ID(this.#element) instanceof HTMLDivElement) {     
                this.#create();
            }
            else {
                $ERROR('Element Not Implemented');
            }
        }
        else {
            throw Error('Terminal Not Implemented');
        }
    }

    /**
     *  @param {string} Hex
     *  @return {string} RGB
     */
    #hexRGB() {
        if(arguments.length <= 0) { $ERROR('require args'); return; return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'string')) { $ERROR('arg type mismatch'); return; return; }

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(arguments[0]);

        result = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        return result = `${result.r}, ${result.g}, ${result.b}`;
    }

    /**
     *  @param {string} Date
     *  @return {boolean} Date
    */
    #isDate() {
        if(arguments.length <= 0) { $ERROR('require args'); return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'string')) { $ERROR('arg type mismatch'); return; }

        return /^(?:(?:[1-9]\d{3}|\d{2})[-](?:0[1-9]|1[0-2])[-](?:0[1-9]|1\d|2[0-8])|(?:[1-9]\d{3}|\d{2})[-](?:0[13-9]|1[0-2])[-](?:29|30)|(?:[1-9]\d{3}|\d{2})[-](?:0[13578]|1[02])-31)$/i.test(arguments[0]);
    }

    /**
     *  @param {number} Size
     *  @return {string} Random Hex
     */
    #random() {
        if(arguments.length <= 0) { $ERROR('require args'); return; return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'number')) { $ERROR('arg type mismatch'); return; return; }

        let result = [];

        result.push(this.#hex[Math.floor(Math.random() * (6) + 10)]);

        for (let n = 1; n < arguments[0]; n++) {
            result.push(this.#hex[Math.floor(Math.random() * 16)]);
        }
        return result.join('');
    }

    /**
     *  @param {number} Time
     *  @return {number} Reversed
     */
    #revInt(data){
        if(arguments.length <= 0) { $ERROR('require args'); return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'number')) { $ERROR('arg type mismatch'); return; }

        if(Number(data) > 0)
        { return Number("-" + data.toString()); }
        else
        { return Number(data.toString().substr(1)); }
    }

    /**
     *  @param {object} Object
     *  @param {string} Search
     *  @return {number} Exist
    */
    #objFindIndex(object, string) {
        const keys = Object.keys(object);

        return keys.indexOf(string);
    }

    /**
     *  @param {object} Object
     *  @param {string} Include
     *  @return {boolean} Include
    */
    #objIncludes(object, string) {
        for (const prop in object) {
          if (object[prop] === string) {
            return true;
          }
        }

        return false;
    }

    /**
     *  @param {object} Object
     *  @param {string} Include
     *  @return {boolean} Include
    */
    #objIndexName(object, string) {
        for (let i = 0; i < object.length; i++) {
            if (object[i].name === string) {
              return i;
            }
        }

        return -1;
    }

    /**
     *  @param {number} X1
     *  @param {number} Y1
     *  @param {number} X2
     *  @param {number} Y2
     *  @param {number} Degree
     *  @return {object} X2, Y2
     */
    #calcCoord(x1, y1, x2, y2, degree) {
        if(arguments.length <= 0) { $ERROR('require args'); return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[1], 'undefined')) if(!$TYPE(arguments[1], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[2], 'undefined')) if(!$TYPE(arguments[2], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[3], 'undefined')) if(!$TYPE(arguments[3], 'number')) { $ERROR('arg type mismatch'); return; }

        const radians   = (degree * Math.PI) / 180;
        const dx        = x2 - x1;
        const dy        = y2 - y1;
        const newx2     = x1 + (dx * Math.cos(radians)) - (dy * Math.sin(radians));
        const newy2     = y1 + (dx * Math.sin(radians)) + (dy * Math.cos(radians));

        return { x2: newx2, y2: newy2 };
    }

    /**
     *  @param {number} X1
     *  @param {number} Y1
     *  @param {number} X2
     *  @param {number} Y2
     *  @return {number} Degree
     */
    #calDegree(x1, y1, x2, y2) {
        if(arguments.length <= 0) { $ERROR('require args'); return; }

        if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[1], 'undefined')) if(!$TYPE(arguments[1], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[2], 'undefined')) if(!$TYPE(arguments[2], 'number')) { $ERROR('arg type mismatch'); return; }
        if(!$TYPE(arguments[3], 'undefined')) if(!$TYPE(arguments[3], 'number')) { $ERROR('arg type mismatch'); return; }

        const dx    = x2 - x1;
        const dy    = y2 - y1;
        let degree  = Math.atan2(dy, dx) * (180 / Math.PI);

        if (degree < 0) {
            degree += 360;
        }

        return degree;
    }

    #create() {
        const   cosmos          = $CREATE('div'),         
                data          = $CREATE('div'),
                terminal        = $CREATE('div');

        $OBJ(cosmos).ATTR('id', this.#hexID.body);
        $ID(this.#element).append(cosmos);

        $OBJ(data).ATTR('id', this.#hexID.dataTitleID);
        $ID(this.#element).append(data);

        $OBJ(terminal).ATTR('id', this.#hexID.termBodyID);
        $ID(this.#element).append(terminal);

        const cosmosDefaults = {
            element: `${this.#hexID.body}`,
            height: `${this.#settings.height}`,
            disposable: false,
            movable: false,
            selectable: false
        };
        const cosmosSettings = { ...this.#settings, ...cosmosDefaults };

        const cosmosID = $BOX(cosmosSettings);
        this.#hexID.body = cosmosID.bodyID;

        $ID(this.#hexID.body).ATTR('style', $ID(this.#hexID.body).ATTR('style'). replace(/overflow: [^;]+/, `overflow: hidden`));

        //hidden overflow

        const dataDefaults = {
            element: `${this.#hexID.dataTitleID}`,
            title:  'Data',
            height: '90px',
            disposable: false,
            movable: false
        };
        const dataSettings = { ...this.#settings, ...dataDefaults };

        const dataID = $BOX(dataSettings);

        this.#hexID.dataBodyID = dataID.bodyID;
        
        $ID(this.#hexID.dataBodyID).ATTR('style', `${$ID(this.#hexID.dataBodyID).ATTR('style')}
            height: calc(100% - 26px);
            padding-top: 4px;
        `);

        for(let loop = 0; loop <= 24; loop++)
        {
            $ID(this.#hexID.dataBodyID).innerHTML += `<div id="data${loop}" style="display: inline-block; width: 20%; text-align: center; font-size: 10px;"></div>`;
        }

        const termDefaults = {
            element: this.#hexID.termBodyID,
            title: 'Terminal',
            height: '100px',
            movable: false
        };
        const termSettings = { ...this.#settings, ...termDefaults };

        super.create(termSettings)

        super.clearCommand();
        this.#defaultCommand();

        let datebar_svg    = $CREATENS('http://www.w3.org/2000/svg', 'svg');
        $OBJ(datebar_svg).ATTR('style', `
            width: 100%;
            height: 100%;
            z-index: 1;
            transform-origin: center center;
        `);
        $OBJ(datebar_svg).ATTR('id', 'datebar');
        $ID(this.#hexID.body).append(datebar_svg);

        let cosmos_svg    = $CREATENS('http://www.w3.org/2000/svg', 'svg');
        $OBJ(cosmos_svg).ATTR('style', `
            position: relative;
            display: inline-block;
            top: -100%;
            width: 100%;
            height: 100%;
            z-index: 1;
            transform-origin: center center;
        `);
        $OBJ(cosmos_svg).ATTR('id', 'cosmos');
        $ID(this.#hexID.body).append(cosmos_svg); 

        let scale = 1;
        $ID('cosmos').ADDEVENT('wheel', function(event) { 
            scale += event.deltaY * -0.001;
            scale = Math.min(Math.max(0.8, scale), 2.4);            
            document.getElementById('cosmos').style.transform = `scale(${scale})`;
        });

        for (let loop = 0; loop < this.#planets.length; loop++){
            if ($CAST(this.#planets[loop].distance, 'int') >= this.#farestPlanet)
            {
                this.#farestPlanet = $CAST(this.#planets[loop].distance, 'int');
            }
        }               

        this.#cosmosSize      = $ID('cosmos').getBoundingClientRect();
        this.#cosmosSizeHDiv  = this.#cosmosSize.height / 2;
        this.#cosmosSizeWDiv  = this.#cosmosSize.width / 2;
        this.#farestPlanetDPI = this.#farestPlanet / this.#cosmosSizeWDiv; 

        for (let loop = 0; loop < 12; loop++){
            let xFormul = $CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;             
            let x1Data = (3 * this.#multDPI) + xFormul + this.#cosmosSizeWDiv - 3,
                y1Data = this.#cosmosSizeHDiv - 20,
                x2Data = -200,
                y2Data = this.#cosmosSizeHDiv - 20;
            let newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, (loop * (360 / 12)) - 60);
            let line = $CREATENS('http://www.w3.org/2000/svg', 'line');
            let sign = $CREATENS('http://www.w3.org/2000/svg', 'text');
            $OBJ(line).ATTR('x1', x1Data);
            $OBJ(line).ATTR('y1', y1Data);
            $OBJ(line).ATTR('x2', newCord.x2);
            $OBJ(line).ATTR('y2', newCord.y2);
            $OBJ(line).ATTR('fill', 'none');
            $OBJ(line).ATTR('stroke', '#333333');
            $OBJ(line).ATTR('stroke-width', '0.6');
            $OBJ(line).ATTR('id', 'DivLine' + loop);            
            $ID('cosmos').appendChild(line);  
            newCord = this.#calcCoord(x1Data, y1Data, 180, 180, ((loop + 1) * (360 / 12) + 15) - 60);    
            $OBJ(sign).ATTR('x', newCord.x2);
            $OBJ(sign).ATTR('y', newCord.y2);
            $OBJ(sign).ATTR('text-anchor', 'middle');
            $OBJ(sign).ATTR('font-size', 8);
            $OBJ(sign).ATTR('fill', '#777777');
            $OBJ(sign).ATTR('id', 'Sign' + loop);
            $OBJ(sign).HTML('');
            $ID('cosmos').appendChild(sign);
        }
        
        for (let loop = 0; loop < this.#planets.length; loop++){
            let circute = $CREATENS('http://www.w3.org/2000/svg', 'circle');
            let xFormul = $CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;
            if((xFormul / loop) == 0 || isNaN(xFormul / loop) == true) { xFormul = 0; } else { xFormul = (xFormul / loop)}            
            $OBJ(circute).ATTR('cx', this.#cosmosSizeWDiv);
            $OBJ(circute).ATTR('cy', this.#cosmosSizeHDiv - 20);
            $OBJ(circute).ATTR('r', ((loop * this.#multDPI) + xFormul));
            $OBJ(circute).ATTR('fill', 'none');
            $OBJ(circute).ATTR('stroke', this.#planets[loop].color);
            $OBJ(circute).ATTR('stroke-width', '0.8');
            $OBJ(circute).ATTR('id', this.#planets[loop].name + 'Outline');
            $ID('cosmos').appendChild(circute);
        }

        {        
            let circute     = $CREATENS('http://www.w3.org/2000/svg', 'circle');
            let xFormul     = $CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;
            let earthForul  = (3 * this.#multDPI) + (xFormul / 3) + this.#cosmosSizeWDiv;    
            let moonFormul  = $CAST(this.#moon.distance, 'int') / this.#farestPlanetDPI;            
            $OBJ(circute).ATTR('cx', earthForul);
            $OBJ(circute).ATTR('cy', this.#cosmosSizeHDiv - 20);
            $OBJ(circute).ATTR('r', 15);
            $OBJ(circute).ATTR('fill', 'none');
            $OBJ(circute).ATTR('stroke', 'white');
            $OBJ(circute).ATTR('stroke-width', '0.5');
            $OBJ(circute).ATTR('id',  'MoonOutline');
            $ID('cosmos').appendChild(circute);
        }

        for (let loop = 0; loop < this.#planets.length; loop++){
            let name    = this.#planets[loop].name;
            let planet  = $CREATENS('http://www.w3.org/2000/svg', 'circle');
            let text    = $CREATENS('http://www.w3.org/2000/svg', 'text');
            let degree    = $CREATENS('http://www.w3.org/2000/svg', 'text');
            let xFormul = $CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;                   
            if((xFormul / loop) == 0 || isNaN(xFormul / loop) == true) { xFormul = 0; } else { xFormul = (xFormul / loop)}            
            $OBJ(planet).ATTR('cx', (loop * this.#multDPI) + xFormul + this.#cosmosSizeWDiv);
            $OBJ(planet).ATTR('cy', this.#cosmosSizeHDiv - 20);
            $OBJ(planet).ATTR('r', 6);
            $OBJ(planet).ATTR('fill', this.#planets[loop].color);
            $OBJ(planet).ATTR('id', name);
            $ID('cosmos').appendChild(planet);
            $OBJ(text).ATTR('x', (loop * this.#multDPI) + xFormul + 8 + this.#cosmosSizeWDiv);
            $OBJ(text).ATTR('y', this.#cosmosSizeHDiv - 20);
            $OBJ(text).ATTR('text-anchor', 'start');
            $OBJ(text).ATTR('font-size', 10);
            $OBJ(text).ATTR('fill', this.#planets[loop].color);
            $OBJ(text).ATTR('id', name + 'Text');
            $OBJ(text).HTML(name.charAt(0));
            $ID('cosmos').appendChild(text);
            $OBJ(degree).ATTR('x', (loop * this.#multDPI) + xFormul + 8 + this.#cosmosSizeWDiv);
            $OBJ(degree).ATTR('y', this.#cosmosSizeHDiv - 9);
            $OBJ(degree).ATTR('text-anchor', 'start');
            $OBJ(degree).ATTR('font-size', 8);
            $OBJ(degree).ATTR('fill', this.#planets[loop].color);
            $OBJ(degree).ATTR('id', name + 'Degree');
            $OBJ(degree).HTML('0');
            $ID('cosmos').appendChild(degree);            
   
            $ID(this.#planets[loop].name).ADDEVENT('mouseover', function() { 
                document.getElementById(name + 'Text').ATTR('x', Number(document.getElementById(name + 'Text').ATTR('x')) + 6);
                document.getElementById(name + 'Text').HTML(name);
                document.getElementById(name).ATTR('r', 10);
                document.getElementById(name + 'Degree').ATTR('x', Number(document.getElementById(name + 'Degree').ATTR('x')) + 7);
            });

            $ID(this.#planets[loop].name).ADDEVENT('mouseleave', function() { 
                document.getElementById(name + 'Text').ATTR('x', Number(document.getElementById(name + 'Text').ATTR('x')) - 6);
                document.getElementById(name + 'Text').HTML(name.charAt(0));
                document.getElementById(name).ATTR('r', 6);
                document.getElementById(name + 'Degree').ATTR('x', Number(document.getElementById(name + 'Degree').ATTR('x')) - 7);
            });
        }
        $ID('SolarDegree').HTML('');

        {
            let moon        = $CREATENS('http://www.w3.org/2000/svg', 'circle');
            let title       = $CREATENS('http://www.w3.org/2000/svg', 'title');
            let text        = $CREATENS('http://www.w3.org/2000/svg', 'text');
            let degree      = $CREATENS('http://www.w3.org/2000/svg', 'text');
            let xFormul     = $CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;
            let earthForul  = (3 * this.#multDPI) + (xFormul / 3) + this.#cosmosSizeWDiv;        
            let moonFormul  = $CAST(this.#moon.distance, 'int') / this.#farestPlanetDPI;
            $OBJ(moon).ATTR('cx', earthForul + moonFormul + 15);
            $OBJ(moon).ATTR('cy', this.#cosmosSizeHDiv - 20);
            $OBJ(moon).ATTR('r', 3);
            $OBJ(moon).ATTR('fill', 'white');
            $OBJ(moon).ATTR('id', 'Moon');
            $ID('cosmos').appendChild(moon);
            $OBJ(text).ATTR('x', earthForul + moonFormul + 15 + 4);
            $OBJ(text).ATTR('y', this.#cosmosSizeHDiv - 20 - 4);
            $OBJ(text).ATTR('text-anchor', 'start');
            $OBJ(text).ATTR('font-size', 7);
            $OBJ(text).ATTR('fill', '#ffffff');
            $OBJ(text).ATTR('id', 'MoonText');
            $OBJ(text).HTML('M');
            $ID('cosmos').appendChild(text);
            $OBJ(degree).ATTR('x',earthForul + moonFormul + 15 + 4);
            $OBJ(degree).ATTR('y', this.#cosmosSizeHDiv - 20 + 4);
            $OBJ(degree).ATTR('text-anchor', 'start');
            $OBJ(degree).ATTR('font-size', 7);
            $OBJ(degree).ATTR('fill', '#ffffff');
            $OBJ(degree).ATTR('id', 'MoonDegree');
            $OBJ(degree).HTML('0');
            $ID('cosmos').appendChild(degree);     

            $ID('Moon').ADDEVENT('mouseover', function() { 
                document.getElementById('MoonText').ATTR('x', Number(document.getElementById('MoonText').ATTR('x')) + 6);
                document.getElementById('MoonText').HTML('Moon');
                document.getElementById('Moon').ATTR('r', 7);
                document.getElementById('MoonDegree').ATTR('x', Number(document.getElementById('MoonDegree').ATTR('x')) + 7);
            });

            $ID('Moon').ADDEVENT('mouseleave', function() { 
                document.getElementById('MoonText').ATTR('x', Number(document.getElementById('MoonText').ATTR('x')) - 6);
                document.getElementById('MoonText').HTML('M');
                document.getElementById('Moon').ATTR('r', 3);
                document.getElementById('MoonDegree').ATTR('x', Number(document.getElementById('MoonDegree').ATTR('x')) - 7);
            });
        }

        for (let loop = 0; loop < this.#zodiac.length; loop++) {
            let name = this.#zodiac[loop].name;
            $ID('Sign' + loop).HTML(this.#zodiac[loop].name.substring(0, 3));

            $ID('Sign' + loop).ADDEVENT('mouseover', function() { 
                document.getElementById('Sign' + loop).HTML(name);
            });

            $ID('Sign' + loop).ADDEVENT('mouseleave', function() { 
                document.getElementById('Sign' + loop).HTML(name.substring(0, 3));
            });
        }

        {
            let timeline    = $CREATENS('http://www.w3.org/2000/svg', 'line');
            $OBJ(timeline).ATTR('x1', 20);
            $OBJ(timeline).ATTR('y1', (this.#cosmosSize.height - 25));
            $OBJ(timeline).ATTR('x2', (this.#cosmosSize.width - 25));
            $OBJ(timeline).ATTR('y2', (this.#cosmosSize.height - 25));
            $OBJ(timeline).ATTR('stroke', 'white');
            $OBJ(timeline).ATTR('stroke-width', '2');
            $OBJ(timeline).ATTR('id', 'timeline');
            $ID('datebar').appendChild(timeline);
        }

        {
            let pointer     = $CREATENS('http://www.w3.org/2000/svg', 'circle');
            let text        = $CREATENS('http://www.w3.org/2000/svg', 'text');
            let date        = $CREATENS('http://www.w3.org/2000/svg', 'text');
            $OBJ(pointer).ATTR('cx', 20);
            $OBJ(pointer).ATTR('cy', (this.#cosmosSize.height - 25));
            $OBJ(pointer).ATTR('r', 7);
            $OBJ(pointer).ATTR('fill', 'white');
            $OBJ(pointer).ATTR('id', 'pointer');
            $ID('datebar').appendChild(pointer);            
            $OBJ(text).ATTR('x', 20);
            $OBJ(text).ATTR('y', (this.#cosmosSize.height - 35));
            $OBJ(text).ATTR('text-anchor', 'right');
            $OBJ(text).ATTR('font-size', 10);
            $OBJ(text).ATTR('fill', 'white');
            $OBJ(text).ATTR('id', 'pointerText');
            $OBJ(text).HTML('00000');
            $ID('datebar').appendChild(text);

            $OBJ(date).ATTR('x', 20);
            $OBJ(date).ATTR('y', (this.#cosmosSize.height - 10));
            $OBJ(date).ATTR('text-anchor', 'right');
            $OBJ(date).ATTR('font-size', 10);
            $OBJ(date).ATTR('fill', 'white');
            $OBJ(date).ATTR('id', 'payaDateText');
            $OBJ(date).HTML('Paya: 0.0.0.0');
            $ID('datebar').appendChild(date);
        }

        this.#update();
    }

    /**
     *  @param {number}
     *  @param {string}
    */
    update() {
        this.#update(arguments[0]);
    }    

    /**
     *  @param {number}
     *  @param {string}
    */
    #update() {
        let dFormula        = (1000 * 60 * 60 * 24 * 365.25)
        let observDateErr   = new Date('2023-08-27'),
        MoonobservDateErr   = new Date('2023-09-01'),
        nowDateErr          = new Date(),
        diffDateErr         = (nowDateErr - observDateErr) / dFormula;

        if(!$TYPE(arguments[0], 'undefined')) if(arguments[0] == 'reset') { 
            this.#defNowDateErr     = 0;
            this.#defDiffDateErr    = 0;
        };

        if(!$TYPE(arguments[0], 'undefined')) if(this.#isDate(arguments[0]) == true && isNaN(arguments[0]) == true) { this.#defNowDateErr = ((nowDateErr - new Date(arguments[0])) / (1000 * 60 * 60 * 24 * 365.25)); }
        if(this.#defNowDateErr != 0) { diffDateErr -= this.#defNowDateErr;  }

        if(!$TYPE(arguments[0], 'undefined')) if(this.#isDate(arguments[0]) == false && isNaN(arguments[0]) == false) { this.#defDiffDateErr = arguments[0]; }
        if(this.#defDiffDateErr != 0) { diffDateErr += this.#defDiffDateErr; }

        let firstCalDate    = 7.95750555635508,
        secondCalDate       = 89.4930691205468,
        thirdCalDate        = 171.029007080852,
        periodCalDate       = 81.5359342836194;
    
        let heliocentricLongitude = {
            Mercury:    305.03184,
            Venus:      341.92530,
            Earth:      334.31054,
            Mars:       195.51789,
            Jupiter:    34.295280,
            Saturn:     333.84907,
            Uranus:     50.171940,
            Neptune:    356.13987,
            Pluto:      299.69090,
            Ceres:      218.38950,
            Eris:       20.356800,
            Haumea:     210.61220,
            Makemake:   186.91670,
        };              
        const geoLongitude       = {};

        let loop = 1;
        for (const planet in heliocentricLongitude) {
            let wFormule            = diffDateErr * (360 / (Number(this.#planets[loop].orbitalPeriod) / 365.25));
            geoLongitude[planet]    = ((heliocentricLongitude[planet] + (wFormule)) + 180) % 360;

            let xFormul = $CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;                
            let x1Data  = (Number($ID('Solar').ATTR('cx'))),
                y1Data  = (Number($ID('Solar').ATTR('cy'))),
                x2Data  = (loop * this.#multDPI) + (xFormul / loop) + this.#cosmosSizeWDiv,
                y2Data  = (this.#cosmosSizeHDiv - 20),
                deData  = geoLongitude[planet];

            let newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, deData);        
            
            $ID(planet).ATTR('cx', newCord.x2);
            $ID(planet).ATTR('cy', newCord.y2);

            $ID(planet + 'Text').ATTR('x', newCord.x2 + 8);
            $ID(planet + 'Text').ATTR('y', newCord.y2);

            $ID(planet + 'Degree').ATTR('x', newCord.x2 + 9);
            $ID(planet + 'Degree').ATTR('y', newCord.y2 + 10);
            $ID(planet + 'Degree').HTML(deData.toFixed(0));  

            loop += 1;
        }

        this.#geoLongitude = geoLongitude;        
       
        $ID('MoonOutline').ATTR('cx', Number($ID('Earth').ATTR('cx')));
        $ID('MoonOutline').ATTR('cy', Number($ID('Earth').ATTR('cy')));

        $ID('Moon').ATTR('cx', Number($ID('Earth').ATTR('cx')) + 15);
        $ID('Moon').ATTR('cy', Number($ID('Earth').ATTR('cy')));

        $ID('MoonText').ATTR('x', Number($ID('Earth').ATTR('cx')) + 15 + 4);
        $ID('MoonText').ATTR('y', Number($ID('Earth').ATTR('cy')) - 4);

        $ID('MoonDegree').ATTR('x', Number($ID('Earth').ATTR('cx')) + 15 + 4);
        $ID('MoonDegree').ATTR('y', Number($ID('Earth').ATTR('cy')) + 4); 

        let vFormule        = (nowDateErr - MoonobservDateErr) / (1000 * 60 * 60) + (12) * (360 / (Number(this.#moon.orbitalPeriod)));
        let moonLongitude   = ((355.100  + (vFormule))) % 360;
        this.#moonLongitude = moonLongitude;

        let x1Data      = (Number($ID('Earth').ATTR('cx'))),
            y1Data      = (Number($ID('Earth').ATTR('cy'))),
            x2Data      = (Number($ID('Moon').ATTR('cx'))),
            y2Data      = (Number($ID('Moon').ATTR('cy'))),
            deData      = moonLongitude;

        let newCord     = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, deData);

        $ID('Moon').ATTR('cx', newCord.x2);
        $ID('Moon').ATTR('cy', newCord.y2);

        $ID('MoonText').ATTR('x', newCord.x2 + 4);
        $ID('MoonText').ATTR('y', newCord.y2 - 4);
        
        $ID('MoonDegree').ATTR('x', newCord.x2 + 4);
        $ID('MoonDegree').ATTR('y', newCord.y2 + 4);
        $ID('MoonDegree').HTML(moonLongitude.toFixed(0));


        for (let loop = 0; loop < 12; loop++){
            x1Data = (Number($ID('Earth').ATTR('cx'))),
            y1Data = (Number($ID('Earth').ATTR('cy'))),
            x2Data = -200,
            y2Data = (Number($ID('Earth').ATTR('cy')));
            newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, (loop * 30));
            $ID('DivLine' + loop).ATTR('x1', x1Data);
            $ID('DivLine' + loop).ATTR('y1', y1Data);
            $ID('DivLine' + loop).ATTR('x2', newCord.x2);
            $ID('DivLine' + loop).ATTR('y2', newCord.y2);

            newCord = this.#calcCoord(x1Data, y1Data, Number($ID('Earth').ATTR('cx')) - 200, Number($ID('Earth').ATTR('cy')) + 50, ((loop + 1) * 30));
            $ID('Sign' + loop).ATTR('x', newCord.x2);
            $ID('Sign' + loop).ATTR('y', newCord.y2);
        }

        let cxData  = 0;
        let dayLeft = 0;
        if(diffDateErr <= firstCalDate)
        {
            cxData  = (periodCalDate - firstCalDate + diffDateErr).toFixed(3) * ((this.#cosmosSize.width - 40) / periodCalDate.toFixed(3));            
            $ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((firstCalDate - diffDateErr) * 365.25).toFixed(0);
        }
        else if(diffDateErr <= secondCalDate) {
            cxData = (diffDateErr - firstCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / (secondCalDate - firstCalDate).toFixed(3));
            $ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((secondCalDate - diffDateErr) * 365.25).toFixed(0);
        }
        else if(diffDateErr <= thirdCalDate) {
            cxData = (diffDateErr - secondCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / (thirdCalDate - secondCalDate).toFixed(3));
            $ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((thirdCalDate - diffDateErr) * 365.25).toFixed(0);
        } 
        else {
            cxData = (diffDateErr - thirdCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / periodCalDate.toFixed(3));
            $ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = (((thirdCalDate + periodCalDate) - diffDateErr) * 365.25).toFixed(0);       
        }

        dayLeft = Number(dayLeft) + 1;
        
        $ID('pointerText').HTML(dayLeft);
        $ID('pointerText').ATTR('x', cxData + 30);

        this.#nowDate     = (((nowDateErr) / dFormula) + (diffDateErr) + ((observDateErr - nowDateErr) / dFormula) + (0.0013689253935660506)) * dFormula;

        let payaDate    = this.#PayaDate(new Date(this.#nowDate));
        let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
        let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
        let solarDate   = this.#SolarDate(new Date(this.#nowDate));
        let lunarDate   = this.#LunaDate(new Date(this.#nowDate));

        $ID('payaDateText').HTML(`Paya: ${payaDate.payaColossalYear}.${payaDate.payaLargeYear}.${payaDate.payaYear}.${payaDate.payaMonth}.${payaDate.payaDay}`);
        $ID('data0').TEXT(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}`);
        $ID('data1').TEXT(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}`);
        $ID('data2').TEXT(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}`);
        $ID('data3').TEXT(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}`);
        $ID('data4').TEXT(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}`);
        $ID('data14').TEXT(`Sign: ${this.#ZodiacSign(new Date(this.#nowDate))}`);
                    
        const entries = Object.entries(this.#geoLongitude);
        let calcValue   = 0,
            planetZod   = {};
        entries.unshift(['Moon', 0]);
        entries.unshift(['Solar', 0]);

        for (let loop = 0; loop <= 11; loop++) {
            for (let [key] of entries) {
                calcValue = this.#calDegree(Number($ID('Earth').ATTR('cx')), Number($ID('Earth').ATTR('cy')), Number($ID(key).ATTR('cx')), Number($ID(key).ATTR('cy')));  
                if(((loop + 6) * 30) % 360 <= calcValue && ((loop + 7) * 30) % 360 >= calcValue && key != 'Earth' && loop != 5) {
                    planetZod[key] = this.#zodiac[loop]['name'];                     
                }
                if(((loop + 6) * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && loop == 5) {
                    planetZod[key] = this.#zodiac[loop]['name'];                     
                }               
            }
        }

        $ID('data10').TEXT(`Sol:  ${planetZod['Solar'].substring(0, 3)}`);
        $ID('data11').TEXT(`Moo:  ${planetZod['Moon'].substring(0, 3)}`);
        $ID('data12').TEXT(`Mer:  ${planetZod['Mercury'].substring(0, 3)}`);
        $ID('data13').TEXT(`Ven:  ${planetZod['Venus'].substring(0, 3)}`);
        $ID('data15').TEXT(`Mar:  ${planetZod['Mars'].substring(0, 3)}`);
        $ID('data16').TEXT(`Jup:  ${planetZod['Jupiter'].substring(0, 3)}`);
        $ID('data17').TEXT(`Sat:  ${planetZod['Saturn'].substring(0, 3)}`);
        $ID('data18').TEXT(`Ura:  ${planetZod['Uranus'].substring(0, 3)}`);
        $ID('data20').TEXT(`Nep:  ${planetZod['Neptune'].substring(0, 3)}`);
        $ID('data21').TEXT(`Cer:  ${planetZod['Ceres'].substring(0, 3)}`);
        $ID('data22').TEXT(`Eri:  ${planetZod['Eris'].substring(0, 3)}`);
        $ID('data23').TEXT(`Hau:  ${planetZod['Haumea'].substring(0, 3)}`);
        $ID('data24').TEXT(`Mak:  ${planetZod['Makemake'].substring(0, 3)}`);
        if(!$TYPE(arguments[0], 'undefined')) { 
            setTimeout(() => { this.#update(); }, 60000);
        };
    }

    /**
     *  @param {number} Value
     *  @return {string} Value
    */
    #addZero() {
        if(arguments.length <= 0) { return arguments[0]; }
        if(arguments == undefined) { return 0; }

        if (arguments[0] < 10) {arguments[0] = '0' + arguments[0]}
        return arguments[0].toString();
    }

    /**
     *  @param {number} Value
     *  @return {string} Value
    */
    #addZeroFA() {
        if(arguments.length <= 0) { return arguments[0]; }

        if (arguments[0] == '۱' || arguments[0] == '۲' || arguments[0] == '۳' || arguments[0] == '۴' || arguments[0] == '۵' || arguments[0] == '۶' || arguments[0] == '۷' || arguments[0] == '۸' || arguments[0] == '۹') {arguments[0] = '۰' + arguments[0]}
        return arguments[0].toString();
    }

    /**
     *  @param {number} Value
     *  @return {string} Value
    */
    #addZeroAR() {
        if(arguments.length <= 0) { return arguments[0]; }

        arguments[0] = arguments[0].toString().replace('‏', '');
        arguments[0] = arguments[0].toString().replace('هـ', '');
        arguments[0] = arguments[0].toString().replace(' ', '');

        if (arguments[0] == '١' || arguments[0] == '٢' || arguments[0] == '٣' || arguments[0] == '٤' || arguments[0] == '٥' || arguments[0] == '٦' || arguments[0] == '٧' || arguments[0] == '٨' || arguments[0] == '٩') {arguments[0] = '٠' + arguments[0]}
        return arguments[0].toString();
    }

    /**
     *  @param {object} Date
     *  @return {object} Date
    */
    #LunaDate() {
        let hijriDate = arguments[0].toLocaleDateString("ar-SA-u-ca-islamic");
        var partSplit = hijriDate.split("/");
        
        return {
            hijriYear: partSplit[2],
            hijriMonth: partSplit[1],
            hijriDay: partSplit[0]
        };
    }

    /**
     *  @param {object} Date
     *  @return {object} Date
    */
    #SolarDate() {
        let solarDate   = arguments[0].toLocaleDateString("fa-IR-u-ca-persian");
        var partSplit   = solarDate.split("/");
        
        return {
            solarYear: partSplit[0],
            solarMonth: partSplit[1],
            solarDay: partSplit[2]
        };
    }

    /**
     *  @param {object} Date
     *  @return {object} Date
    */
    #ZodiacDate() {
        let zodiacDate  = arguments[0].toLocaleDateString("en-US-u-ca-chinese");
        var partSplit   = zodiacDate.split("-");
        
        return {
            zodiacYear: partSplit[2],
            zodiacMonth: partSplit[0],
            zodiacDay: partSplit[1]
        };
    }

    /**
     *  @param {object} Date
     *  @return {object} Date
    */
    #MayaDate() {
        let a = Math.floor((14 - (arguments[0].getMonth() + 1)) / 12);
        let y = (arguments[0].getFullYear()) + 4800 - a;
        let m = (arguments[0].getMonth() + 1) + 12 * a - 3;

        let Juli = (arguments[0].getDate()) + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

        const LongCount = Juli - 584283;
        const Baktun    = Math.floor(LongCount / 144000);
        const Katun     = Math.floor((LongCount % 144000) / 7200);
        const Tun       = Math.floor((LongCount % 7200) / 360);
        const Winal     = Math.floor((LongCount % 360) / 20);
        const Kin       = LongCount % 20;
        
        return {
            mayaBaktun: Baktun,
            mayaKatun: Katun,
            mayaTun: Tun,
            mayaWinal: Winal,
            mayaKin: Math.round(Kin)
        };
    }

    /**
     *  @param {object} Date
     *  @return {object} Date
    */
    #PayaDate() {
        const startDate     = new Date('1950-01-28');
        const currentDate   = arguments[0];
        
        if(startDate > currentDate) { 
            return {
                payaColossalYear: 0,
                payaLargeYear: 0,
                payaYear: 0,
                payaMonth: 0,
                payaDay: 0      
            };
        }
        const SinceStart    = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
        const SinceModulo   = (SinceStart % 29781);
        const LastYear      = (SinceModulo - 29440);
        
        const ColossalYear  = Math.floor(SinceStart / 29781);                       //MIN: 0    MAX: INFINIT
        const LargeYear     = Math.floor(SinceModulo / 3309) + 1;                   //MIN: 1    MAX: 9
        const Year          = Math.floor(SinceModulo / 368 % 9) + 1;                //MIN: 1    MAX: 9
        let Month           = Math.floor((SinceModulo % 368) / 28 % 13) + 1;        //MIN: 1    MAX: 9
        let Day             = Math.floor((SinceModulo % 368) % 28) + 1;             //MIN: 1    MAX: 28

        if((SinceModulo % 368) >= 252 && (SinceModulo % 368) <= 367) {
            Month           = Math.floor(((SinceModulo % 368) - 252) / 29) + 10;    //MIN: 10   MAX: 13
            Day             = Math.floor(((SinceModulo % 368) - 252) % 29) + 1;     //MIN: 1    MAX: 29           
        }

        if(LargeYear == 9 && Year == 9) {
            Month           = Math.floor((LastYear) / 28 % 12) + 1;                 //MIN: 1    MAX: 8
            Day             = Math.floor((LastYear) % 28) + 1;                      //MIN: 1    MAX: 28

            if((LastYear) >= 225 && (LastYear) <= 341) {
                Month           = Math.floor(((LastYear) - 224) / 29) + 9;          //MIN: 9    MAX: 12
                Day             = Math.floor(((LastYear) - 224) % 29) + 1;          //MIN: 1    MAX: 29           
            }
        }
        
        //Error Equal 1.14 Days
        
        return {
            payaColossalYear: ColossalYear,
            payaLargeYear: LargeYear,
            payaYear: Year,
            payaMonth: Month,
            payaDay: Day 
        };
    }

    /**
     *  @param {object} Date
     *  @return {string} Sign
    */
    #ZodiacSign() {
        const monthZodiac   = arguments[0].getMonth();
        const dayZodiac     = arguments[0].getDate();
          
        let zodiacIndex     = this.#zodiac.findIndex(({ month, day }) => (monthZodiac === month && dayZodiac <= day));
        if (zodiacIndex === -1) { zodiacIndex = 11; }
        
        return this.#zodiac[zodiacIndex].name;
    }

    #defaultCommand() {
        this.addCommand('date', function () {
            let date = new Date();
            this.log(`${date.getFullYear()}/${this.#addZero(date.getMonth())}/${this.#addZero(date.getDate())}`);
        }, 'show date'
         , '');

        this.addCommand('time', function () {
            let date = new Date();
            this.log(`${this.#addZero(date.getHours())}:${this.#addZero(date.getMinutes())}:${this.#addZero(date.getSeconds())}`);
        }, 'show time'
         , '');

        this.addCommand('get', function () {
            if(arguments.length <= 0) { $ERROR('require args'); return; }

            if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'object')) { $ERROR('arg type mismatch'); return; }

            if(!$TYPE(arguments[0][0], 'undefined')) if(!$TYPE(arguments[0][0], 'string')) { $ERROR('arg type mismatch'); return; }
            if(!$TYPE(arguments[0][1], 'undefined')) if(!$TYPE(arguments[0][1], 'string')) { $ERROR('arg type mismatch'); return; }
            if(!$TYPE(arguments[0][2], 'undefined')) if(!$TYPE(arguments[0][2], 'string')) { $ERROR('arg type mismatch'); return; }
            if(!$TYPE(arguments[0][3], 'undefined')) if(!$TYPE(arguments[0][3], 'string')) { $ERROR('arg type mismatch'); return; }

            if(!$TYPE(arguments[0][1], 'undefined')) {
                if (arguments[0][1].toLowerCase() == 'planet' && $TYPE(arguments[0][2], 'undefined')) {
                    const entries = Object.entries(this.#geoLongitude);
                    let result = '';
    
                    for (let [key, value] of entries) {
                        result += `${key}:&nbsp;${value}<br>`;
                    }
                    this.log(`${result}`);
                }
                if (arguments[0][1].toLowerCase() == 'planet' && !$TYPE(arguments[0][2], 'undefined') && $TYPE(arguments[0][3], 'undefined')) {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    if(this.#objFindIndex(this.#geoLongitude, arguments[0][2]) != -1) {
                        this.log(`${arguments[0][2]}:&nbsp;${this.#geoLongitude[arguments[0][2]]}<br>`);  
                    }
                    if(arguments[0][2] == 'Solar') {
                        this.log(`Solar:&nbsp;0<br>`);  
                    }
                    if(arguments[0][2] == 'Moon') {
                        this.log(`Moon:&nbsp;${this.#moonLongitude}<br>`);  
                    }
                    if(arguments[0][2].toLowerCase() == 'zod') {
                        const entries = Object.entries(this.#geoLongitude);
                        entries.unshift(['Moon', 0]);
                        entries.unshift(['Solar', 0]);
                        let result      = '',
                            calcValue   = 0;
    
                        for (let [key] of entries) {
                            calcValue = this.#calDegree(Number($ID('Earth').ATTR('cx')), Number($ID('Earth').ATTR('cy')), Number($ID(key).ATTR('cx')), Number($ID(key).ATTR('cy')));
                            result += `${key}:&nbsp;${calcValue}<br>`;
                        }
                        this.log(`${result}`); 
                    }
                }
                if (arguments[0][1].toLowerCase() == 'planet' && !$TYPE(arguments[0][2], 'undefined') && !$TYPE(arguments[0][3], 'undefined')) {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    this.#geoLongitude['Solar'] = 0;
                    this.#geoLongitude['Moon'] = 0;
                    if(this.#objFindIndex(this.#geoLongitude, arguments[0][2]) != -1) {
                        if(arguments[0][3].toLowerCase() == 'zod') {
                            this.log(`${arguments[0][2]}:&nbsp;${this.#calDegree(Number($ID('Earth').ATTR('cx')), Number($ID('Earth').ATTR('cy')), Number($ID(arguments[0][2]).ATTR('cx')), Number($ID(arguments[0][2]).ATTR('cy')))}<br>`);
                        }
                    }
                    delete this.#geoLongitude['Solar'];
                    delete this.#geoLongitude['Moon'];
                }
                if (arguments[0][1].toLowerCase() == 'time' && $TYPE(arguments[0][2], 'undefined')) {
                    let nowDateErr = new Date();
                    this.log(`Time: ${this.#addZero(nowDateErr.getHours())}:${this.#addZero(nowDateErr.getMinutes())}`);
                }
    
                if (arguments[0][1].toLowerCase() == 'sign' && $TYPE(arguments[0][2], 'undefined')) {
                    this.log(`Sign: ${this.#ZodiacSign(new Date(this.#nowDate))}`);
                }
    
                if (arguments[0][1].toLowerCase() == 'sign' && !$TYPE(arguments[0][2], 'undefined')) {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    
                    const entries = Object.entries(this.#geoLongitude);
                    entries.unshift(['Moon', 0]);
                    entries.unshift(['Solar', 0]);
                    let result      = '',
                        calcValue   = 0,
                        index       = this.#objIndexName(this.#zodiac, arguments[0][2]);
                            
                    for (let [key] of entries) {
                        calcValue = this.#calDegree(Number($ID('Earth').ATTR('cx')), Number($ID('Earth').ATTR('cy')), Number($ID(key).ATTR('cx')), Number($ID(key).ATTR('cy')));  
                        if(((index + 6) % 12 * 30) % 360 <= calcValue && ((index + 7) % 12  * 30) % 360 >= calcValue && key != 'Earth' && arguments[0][2] != 'Virgo') {
                            result += `${key}:&nbsp;${calcValue}<br>`;                      
                        }
                        if(((index + 6) % 12 * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && arguments[0][2] == 'Virgo') {
                            result += `${key}:&nbsp;${calcValue}<br>`;                 
                        }           
                    }
                    if(!$TYPE(arguments[0][3], 'undefined') && arguments[0][3] == 'adj') {
                        for (let [key] of entries) {
                            calcValue = this.#calDegree(Number($ID('Earth').ATTR('cx')), Number($ID('Earth').ATTR('cy')), Number($ID(key).ATTR('cx')), Number($ID(key).ATTR('cy')));  
                            if(((index + 0) % 12 * 30) % 360 <= calcValue && ((index + 1) % 12 * 30) % 360 >= calcValue && key != 'Earth'&& arguments[0][2] != 'Pisces') {
                                result += `${key}:&nbsp;${calcValue}<br>`;                  
                            }
                            if(((index + 0) % 12 * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && arguments[0][2] == 'Pisces') {
                                result += `${key}:&nbsp;${calcValue}<br>`;                        
                            }             
                        }
                    }
                    
                    this.log(`${result}`); 
                }
    
                if (arguments[0][1].toLowerCase() == 'date' && $TYPE(arguments[0][2], 'undefined')) {
                    let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
                    let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
                    let solarDate   = this.#SolarDate(new Date(this.#nowDate));
                    let lunarDate   = this.#LunaDate(new Date(this.#nowDate));
    
                    this.log(`Paya: ${0}.${0}.${0}.${0}<br>`);
                    this.log(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}<br>`);
                    this.log(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}<br>`);
                    this.log(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}<br>`);
                    this.log(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}<br>`);
                    this.log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);       
                }
                if (arguments[0][1].toLowerCase() == 'date' && !$TYPE(arguments[0][2], 'undefined')) {
                    switch(arguments[0][2].toLowerCase()) {
                        case 'paya':
                            let payaDate    = this.#PayaDate(new Date(this.#nowDate));
                            this.log(`Paya: ${payaDate.payaColossalYear}.${payaDate.payaLargeYear}.${payaDate.payaYear}.${payaDate.payaMonth}.${payaDate.payaDay}`);
                            break;
                        case 'maya':
                            let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
                            this.log(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}<br>`);
                            break;
                        case 'zodi':
                            let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
                            this.log(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}<br>`);
                            break;
                        case 'sola':
                            let solarDate   = this.#SolarDate(new Date(this.#nowDate));
                            this.log(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}<br>`);
                            break;
                        case 'luna':
                            let lunarDate   = this.#LunaDate(new Date(this.#nowDate));
                            this.log(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}<br>`);
                            break;
                        case 'juli':
                            this.log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);
                            break;
                        default:
                            this.log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);
                            break;
                    }
                }   
            }             
        }, 'read cosmos'
         , ' get &lt;date|time&gt; <br> get &lt;date&gt; &lt;paya|maya|zodi|sola|luna|juli&gt; <br>  get &lt;sign&gt; &lt;name&gt; &lt;adj&gt; <br>  get &lt;planet&gt; &lt;name&gt; &lt;zod&gt;');

        this.addCommand('set', function () {
            if(arguments.length <= 0) { $ERROR('require args'); return; }

            if(!$TYPE(arguments[0], 'undefined')) if(!$TYPE(arguments[0], 'object')) { $ERROR('arg type mismatch'); return; }

            if(!$TYPE(arguments[0][0], 'undefined')) if(!$TYPE(arguments[0][0], 'string')) { $ERROR('arg type mismatch'); return; }
            if(!$TYPE(arguments[0][1], 'undefined')) if(!$TYPE(arguments[0][1], 'string')) { $ERROR('arg type mismatch'); return; }
            if(!$TYPE(arguments[0][2], 'undefined')) if(!$TYPE(arguments[0][2], 'string')) { $ERROR('arg type mismatch'); return; }

            if(!$TYPE(arguments[0][1], 'undefined') && arguments[0][1].toLowerCase() == 'date') {
                if (!$TYPE(arguments[0][2], 'undefined') && isNaN(Number(arguments[0][2])) == false) {
                    this.update(Number(arguments[0][2]));            
                } 
                if (!$TYPE(arguments[0][2], 'undefined') && this.#isDate(arguments[0][2]) == true) {
                    this.update(arguments[0][2]);            
                }
                if (!$TYPE(arguments[0][2], 'undefined') && arguments[0][2].toLowerCase() == 'reset') {
                    this.update('reset');            
                }
            }                     
        }, 'update cosmos'
         , 'set &lt;date&gt; &lt;date|multiple|reset&gt;');

        this.addCommand('update', function () {
            this.#update(undefined);
        }, 'update information'
         , '');

        this.addCommand('uptime', function () {
            const calcUpTime = new Date() - this.#upTime;
            this.log(`${calcUpTime}`);
            
        }, 'show up time in milisecond'
         , '');

        this.addCommand('exit', function () {
            $TIMEOUT(() => { this.#exit(); }, 100);
        }, 'terminate application'
         , '');

        this.sortCommand();
    }

    exit() {
        this.#exit();
    }

    #exit() {
        $ID(this.#element).HTML('');
        $ID(this.#element).ATTR('style', '');
    }
}