/**
 * @name        Paya Calendar
 * @version     1.0.1
 * @author      rebelliume <rebelliume@gmail.com>
 * @contact     rebelliume
 * @copyright   rebelliume
 * @license     MIT
 * @released    2023/09/21
 * 
 * @returns {object}
 */

class paya {    
    #$ = {
        $: function (element) {
            const defMethod = element;
            
            const attributes = {
                /**
                 *  @return {object} Style
                 */
                get STYLE() {
                    return element.style;
                },
                /**
                 *  @param {string} Value
                 *  @return {string} Text
                 */
                TEXT: function(value = null) {
                    if(value === null){ return element.innerText; }
                    else { return element.innerText = value; }
                },
                /**
                 *  @param {string} Value
                 *  @return {string} HTML
                 */
                HTML: function(value = null) {
                    if(value === null){ return element.innerHTML; }
                    else { return element.innerHTML = value; }
                },
                /**
                 *  @param {string} Value
                 *  @return {string} Value
                 */
                VAL: function(value = null) {
                    if(value === null){ return element.value; }
                    else { return element.value = value; }
                },
                /**
                 *  @param {string} Property
                 *  @param {string} Value
                 *  @return {object} Attribute
                 */
                ATTR: function (prop, value = null) {
                    if(value === null){ return element.getAttribute(prop); }
                    else { element.setAttribute(prop, value); }
                },
                /**
                 *  @param {string} Value
                 *  @return {string} CSSText
                 */
                CSS: function(value = null) {
                    if(value === null){ return element.cssText; }
                    else { return element.cssText = value; }
                },
                /**
                 *  @param {string} Object
                 *  @param {string} Name
                 *  @param {object} Callback
                 */
                ADDEVENT: function (value, callback) {
                    return element.addEventListener(value, callback);
                },
                /**
                 *  @param {string} Object
                 *  @param {string} Name
                 *  @param {object} Callback
                 */
                REMEVENT: function (value, callback) {
                    return element.removeEventListener(value, callback);
                }
            };
    
            Object.keys(attributes).forEach(key => defMethod[key] = attributes[key]);
        
            return defMethod;
        },    
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        ID: function (value) {
            return this.$$(document.getElementById(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        CLASS: function (value) {
            return this.$$(document.getElementsByClassName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        TAG: function (value) {
            return this.$$(document.getElementsByTagName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        NAME: function (value) {
            return this.$$(document.getElementsByName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        QUERY: function (value) {
            return this.$$(document.querySelector(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        QUERYALL: function (value) {
            return this.$$(document.querySelectorAll(value));
        },
        /**
         *  @param {object} Object
         *  @return {object} DOM
         */
        OBJ: function (value) {
            return this.$$(value);
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        CREATE: function (value) {
            return document.createElement(value);
        },
        /**
         *  @param {string} Value
         *  @param {string} Name
         *  @return {object} DOM
         */
        CREATENS: function (value, name) {
            return document.createElementNS(value, name);
        },
        /**
         *  @param {string} Name
         *  @param {string} Value
         *  @param {number} Expire
         *  @return {string} Cookie
         */
        COOKIE: function (name, value = null, expire = null) {
            if(value === null)
            {
                const data = document.cookie.split(';');
                for (let i = 0; i < data.length; i++) {
                    const cookie = data[i].trim();
                    if (cookie.startsWith(name + '=')) {
                        return cookie.substring(name.length + 1);
                    }
                }
                return '';
            }
            else {
                let date = new Date();
                date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
                let expires = 'expires=' + date.toUTCString();
                document.cookie = name + '=' + value + ';' + expires + ';path=/';
            }
        },
        /**
         *  @param {number} Time
         */
        WAIT: async function (value) {
            await new Promise(resolve => setTimeout(resolve, value));
        },
        /**
         *  @param {object} Callback
         *  @param {number} Time
         */
        TIMEOUT: function (callback, value) {
            setTimeout(callback, value);
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @return {boolean} Type
         */
        TYPE: function (value, type = null) {
            if(type === null)
            { return typeof value; }
            else{
                switch (type)
                {
                    case 'object':
                        return typeof value == 'object';
                    break;
                    case 'string':
                        return typeof value == 'string';
                    break;
                    case 'number':
                        return typeof value == 'number';
                    break;
                    case 'boolean':
                        return typeof value == 'boolean';
                    break;
                    case 'function':
                        return typeof value == 'function';
                    break;
                    case 'undefined':
                        return typeof value == 'undefined';
                    break;
                    case 'bigint':
                        return typeof value == 'bigint';
                    break;
                    case 'array':
                        return Array.isArray(value);
                    break;
                    case 'null':
                        return value === null;
                    break;
                    case 'empty':
                        return typeof value === 'undefined' || value === null || value === '';
                    break;
                    case 'defined':
                        return typeof value !== 'undefined' && value !== null;
                    break;
                    default:
                        return false;
                }
            }        
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @return {object} Cast
         */
        CAST: function (value, type) {
            switch (type)
            {
                case 'string':                
                    return String(value);
                break;
                case 'number':
                    return Number(value);
                break;
                case 'int':
                    return parseInt(value);
                break;
                case 'float':
                    return parseFloat(value);
                break;
                case 'boolean':
                    return Boolean(value);
                break;
                case 'bigint':
                    return BigInt(value);
                break;
                default:
                    return value;
            }    
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @param {number} Base
         *  @return {object} Convert
         */
        CONVERT: function (value, type, base) {
            switch (type)
            {
                case 'int':
                    return parseInt(value, base);
                break;
                case 'string':                
                    return value.toString(base);
                break;            
                default:
                    return value;
            }    
        },
        /**
         *  @param {object} Options
         *  @return {object} AJAX
         */
        AJAX: function(options) {
            const xhr = new XMLHttpRequest();
            
            if (options.username && options.password) { 
                xhr.open(options.method, options.url, options.async, options.username, options.password);
            }
            else { 
                xhr.open(options.method, options.url, true);
            }
            if (options.headers) {
                for (let header in options.headers) {
                    xhr.setRequestHeader(header, options.headers[header]);
                }
            }
            if (options.token) {
                options.headers.Authorization = 'Bearer ' + options.token;
            }
            if (options.timeout) {
                xhr.timeout = options.timeout;
                xhr.ontimeout = function () {
                    options.error('error 408');
                }
            }
            xhr.responseType = options.responseType || 'text';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = xhr.response;
                        if (options.responseType === 'json') {
                            response = JSON.parse(response);
                        }
                        options.success(response, xhr.status);
                    } else {
                        options.error(xhr.statusText, xhr.status);
                    }
                }
            };
            if (options.cache) {
                const cachedResponse = localStorage.getItem(options.url);
                if (cachedResponse) {
                    options.success(JSON.parse(cachedResponse), 200);
                    return;
                }
            }        
            if (options.cache) {
                xhr.addEventListener('load', function () {
                    localStorage.setItem(options.url, xhr.responseText);
                });
            }
            if (options.progress) {
                xhr.addEventListener('progress', function (event) {
                    options.progress(event.loaded, event.total);
                });
            }
            if (options.abort) {
                xhr.addEventListener('abort', function () {
                    options.abort();
                });
            }
            if (options.cancel) {
                const cancelToken = options.cancelToken;
                if (cancelToken) {
                    cancelToken.promise.then(function () {
                        xhr.abort();
                    });
                }
            }
            if (options.uploadProgress) {
                const upload = xhr.upload;
                if (upload) {
                    upload.addEventListener('progress', function (event) {
                        options.uploadProgress(event.loaded, event.total);
                    });
                }
            }
            if (options.withCredentials) {
                xhr.withCredentials = true;
            }
            if (options.beforeSend) {
                options.beforeSend(xhr);
            }
            if (options.mimeType) {
                xhr.overrideMimeType(options.mimeType);
            }
            if (options.transformRequest) {
                options.data = options.transformRequest(options.data);
            }
            if (options.transformResponse) {
                xhr.addEventListener('load', function () {
                    xhr.response = options.transformResponse(xhr.response);
                });
            }
            if (options.retry) {
                let retries = 0;
                const retryLimit = options.retryLimit || 3;
                const retryInterval = options.retryInterval || 1000;
        
                xhr.addEventListener('error', function () {
                    if (retries < retryLimit) {
                        setTimeout(function () {
                            retries++;
                            if (options.username && options.password) { 
                                xhr.open(options.method, options.url, options.async, options.username, options.password);
                            }
                            else { 
                                xhr.open(options.method, options.url, true);
                            }
                            xhr.send(options.data);
                        }, retryInterval);
                    } else {
                        options.error(xhr.statusText, xhr.status);
                    }
                });
            }
            if (options.redirect) {
                xhr.addEventListener('load', function () {
                    if (xhr.status >= 300 && xhr.status < 400) {
                        const redirectUrl = xhr.getResponseHeader('Location');
                        if (redirectUrl) {
                            options.url = redirectUrl;
                            if (options.username && options.password) { 
                                xhr.open(options.method, options.url, options.async, options.username, options.password);
                            }
                            else { 
                                xhr.open(options.method, options.url, true);
                            }
                            xhr.send(options.data);
                        } else {
                            options.error('404');
                        }
                    } else {
                        options.success(xhr.response, xhr.status);
                    }
                });
            }
            xhr.send(options.data);
        },
        /**
         *  @param {object} Options
         *  @return {object} Fetch
         */
        FETCH: function(options) {
            let init = {
                method: options.method,
                headers: options.headers || {},
                body: options.data || null,
                responseType: options.responseType || 'text',
                cache: options.cache ? 'default' : 'no-store',
                redirect: options.redirect ? 'follow' : 'manual'
            };
            
            if (options.username && options.password) {
                init.headers.Authorization = 'Basic ' + btoa(options.username + ':' + options.password);
            }
            if (options.token) {
                init.headers.Authorization = 'Bearer ' + options.token;
            }
            if (options.timeout) {
                setTimeout(function () {
                    options.error('error 408');
                }, options.timeout);
            }
            if (options.cache) {
                const cachedResponse = localStorage.getItem(options.url);
                if (cachedResponse) {
                    options.success(JSON.parse(cachedResponse), 200);
                }
            }
            if (options.progress) {
                init.onprogress = function (event) {
                    options.progress(event.loaded, event.total);
                }
            }
            if (options.abort) {
                const abortController = new AbortController();
                const signal = abortController.signal;
        
                signal.addEventListener('abort', function () {
                    options.abort();
                });
            }
            if (options.cancel) {
                const abortController = new AbortController();
                const signal = abortController.signal;
                const cancelToken = options.cancelToken;
                if (cancelToken) {
                    cancelToken.promise.then(function () {
                        abortController.abort();
                    });
                }
            }
            if (options.uploadProgress) {
                init.onUploadProgress = function (event) {
                    options.uploadProgress(event.loaded, event.total);
                }
            }
            if (options.withCredentials) {
                init.credentials = 'include';
            }
            if (options.beforeSend) {
                options.beforeSend(init);
            }
            if (options.mimeType) {
                init.headers['Content-Type'] = options.mimeType;
            }
            if (options.transformRequest) {
                init.body = options.transformRequest(init.body);
            }
            if (options.transformResponse) {
                init.onLoad = function () {
                    init.body = options.transformResponse(init.body);
                }
            }
            if (options.retry) {
                let retries = 0;
                const retryLimit = options.retryLimit || 3;
                const retryInterval = options.retryInterval || 1000;
        
                function doFetch() {
                    fetch(options.url, init)
                        .then(function (response) {
                            if (response.status < 200 || response.status >= 300) {
                                throw new Error(response.statusText);
                            }
                            return response;
                        })
                        .then(function (response) {
                            if (options.responseType === 'json') {
                                return response.json();
                            }
                            return response.text();
                        })
                        .then(function (data) {
                            options.success(data, 200);
                        })
                        .catch(function (err) {
                            if (retries < retryLimit) {
                                retries++;
                                setTimeout(doFetch, retryInterval);
                            } else {
                                options.error(err.message || 'Unknown error', 0);
                            }
                        });
                }
                doFetch();
            } else {
                fetch(options.url, init)
                    .then(function (response) {
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return response;
                    })
                    .then(function (response) {
                        if (options.responseType === 'json') {
                            return response.json();
                        }
                        return response.text();
                    })
                    .then(function (data) {
                        options.success(data, 200);
                    })
                    .catch(function (err) {
                        options.error(err.message || 'Unknown error', 0);
                    });
            }
            if (options.redirect) {
                init.onLoad = function () {
                    if (response.status >= 300 && response.status < 400) {
                        const redirectUrl = response.headers.get('Location');
                        if (redirectUrl) {
                            options.url = redirectUrl;
                            fetch(options.url, init)
                                .then(function (response) {
                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(response.statusText);
                                    }
                                    return response;
                                })
                                .then(function (response) {
                                    if (options.responseType === 'json') {
                                        return response.json();
                                    }
                                    return response.text();
                                })
                                .then(function (data) {
                                    options.success(data, 200);
                                })
                                .catch(function (err) {
                                    options.error('404');
                                });
                        } else {
                            options.error('404');
                        }
                    } else {
                        options.success(response.body, response.status);
                    }
                };
            }
        },
        /**
         *  @param {object} Options
         *  @return {object} Socket
         */
        SOCKET: function(options) {
            const ws = new WebSocket(options.url);

            ws.onopen = function () { 
                if (options.onopen) { options.onopen(); }
            };
            ws.onerror = function (event) {
                if (options.onerror) { options.onerror(event); }
            };
            ws.onclose = function (event) {
                if (options.onclose) { options.onclose(event); }
            };
            ws.onmessage = function (event) {
                if (options.onmessage) { options.onmessage(event.data); }
            };
            this.send = function (data) {
                ws.send(data);
            };
            this.close = function () {
                ws.close();
            };
        },
        /**
         *  @param {string} Value
         *  @param {string} Options
         */
        LOG: function (value, options = null) {    
            if(options === null) { console.log(value); }
            else { console.log(value, options); }
        },
        /**
         *  @param {string} Value
         */
        ERROR: function (value) {
            console.error(value);
        },
        /**
         *  @param {string} Value
         */
        WARN: function (value) {
            console.warn(value);
        },
        CLEAR: function () {
            console.clear();
        }
    };
    #loadSelector(){
        for (const key in this.#$) {
            if (typeof this.#$[key] === 'function') {
                this['$' + key] = this.#$[key].bind(this);
                this.#$[key] = undefined;
            }
        }
    }

    #lineID             = new Map();
    #element            = null;
    #hex                = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    #commands           = new Map();
    #commandsHelp       = new Map();
    #commandsInstruct   = new Map();
    #commandsHistory    = new Array();
    #historyIndex       = 0;
    #returnOutput       = false;
    #outputString       = '';
    #waitInput          = false;
    #waitPrivateInput   = false;
    #privateDate        = '';  
    #privateKeyStore    = '';
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
    
    #attr = {
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
        readOnly :      null
    };

    #hexID = {
        title:  this.#random(8),
        body:   this.#random(8),
        text:   this.#random(8),        
        titleD: this.#random(8),
        bodyD:  this.#random(8),
        textD:  this.#random(8),
        titleC: this.#random(8),
        bodyC:  this.#random(8),
        textC:  this.#random(8),
        inputC:  this.#random(8)
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
     */
    constructor(
        _element    = 'paya',
        _title      = 'Paya',
        _height     = '690px',
        _width      = '650px',
        _opacity    = 0.75,
        _fgColor    = '#ffffff',
        _bfColor    = '#000000',
        _tlColor    = '#121212',
        _fontName   = 'Lucida Console',
        _fontSize   = 11,
        _dateOption = false,
        _typeMode   = false,  
        _readOnly   = false              
    ) {
        this.#element           = _element;
        this.#attr.title        = _title;
        this.#attr.height       = _height;
        this.#attr.width        = _width;
        this.#attr.opacity      = _opacity;
        this.#attr.fgColor      = _fgColor;
        this.#attr.bgColor      = _bfColor;
        this.#attr.tlColor      = _tlColor;
        this.#attr.fontName     = _fontName;
        this.#attr.fontSize     = _fontSize;
        this.#attr.dateOption   = _dateOption;
        this.#attr.typeMode     = _typeMode;
        this.#attr.readOnly     = _readOnly;

        this.#loadSelector();

        this.#upTime = new Date();

        if(this.$ID(this.#element) instanceof HTMLDivElement) {
            this.#create();
        }
        else {
            this.$ERROR('element not implemented');
        } 
    }

    /**
     *  @param {string} Hex Color
     *  @return {boolean} RGB Color
    */
    #hexRGB() {
        let result      = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(arguments[0]);
        result          = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }

        return result   = `${result.r}, ${result.g}, ${result.b}`;
    }

    /**
     *  @param {string} Date
     *  @return {boolean} Date
    */
    #isDate() {
        return /^(?:(?:[1-9]\d{3}|\d{2})[-](?:0[1-9]|1[0-2])[-](?:0[1-9]|1\d|2[0-8])|(?:[1-9]\d{3}|\d{2})[-](?:0[13-9]|1[0-2])[-](?:29|30)|(?:[1-9]\d{3}|\d{2})[-](?:0[13578]|1[02])-31)$/i.test(arguments[0]);
    }

    /**
     *  @param {number} Size
     *  @return {string} Random Hex
     */
    #random() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'number') { this.$ERROR('arg type mismatch'); }

        let result = [];

        for (let n = 0; n < arguments[0]; n++) {
            if(n == 0) {
                result.push(this.#hex[Math.floor(Math.random() * (5) + 11)]);
            }
            else {
                result.push(this.#hex[Math.floor(Math.random() * 16)]);
            }
        }
        return result.join('');
    }

    /**
     *  @param {number} Time
     *  @return {number} Reversed
     */
    #revInt(data){
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
        const dx    = x2 - x1;
        const dy    = y2 - y1;
        let degree  = Math.atan2(dy, dx) * (180 / Math.PI);

        if (degree < 0) {
            degree += 360;
        }

        return degree;
    }

    /**
     *  @param {string}
     *  @return {array}
    */
    #split() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }

        let output =    [],
            current =   null,
            holder =    '',
            quote =     false;

        function push(){
            (holder.slice(-1) === '"') ? holder = holder.slice(0, -1) : null;
            output.push(holder);
            holder = '';
        }

        for (let loop = 0; loop < arguments[0].length; loop++)
        {
            current = arguments[0].charAt(loop);

            (current === '"') ?  quote = !quote : null;

            (quote && current != '"') ? holder += current : null;
            (!quote && current != ' ') ? holder += current : null;

            if (!quote && current == ' ') { push(); }
            else if (loop == (arguments[0].length - 1)) { push(); }
        }
        return output;
    }

    #create() {
        let cosmos          = this.$CREATE('div'),
            cosmos_title    = this.$CREATE('div'),
            cosmos_body     = this.$CREATE('div'),            
            cosmos_style    = this.$CREATE('style'),
            detail          = this.$CREATE('div'),
            detail_title    = this.$CREATE('div'),
            detail_body     = this.$CREATE('div'),
            terminal        = this.$CREATE('div'),
            terminal_title  = this.$CREATE('div'),
            terminal_body   = this.$CREATE('div'),         
            terminal_text   = this.$CREATE('div'),
            terminal_input  = this.$CREATE('span'),
            terminal_sign   = this.$CREATE('span');

        cosmos_style.innerHTML = `
            #${this.#hexID.inputC}::before{ content: '$'; color: #999999; }
            #${this.#hexID.inputC}:focus{ animation: blink 1s step-end infinite; }
            @keyframes blink { from, to { border-color: transparent; } 50% { border-color: #ffffff; } }
            #${this.#hexID.textC}::-webkit-scrollbar { width: 3px; }
            #${this.#hexID.textC}::-webkit-scrollbar-track { background-color: rgba(66, 66, 66, 0.3); }
            #${this.#hexID.textC}::-webkit-scrollbar-thumb { background-color: rgba(129, 129, 129, 0.79); }
            #${this.#hexID.textC}::-webkit-scrollbar-thumb:hover { background-color: rgba(150, 150, 150, 0.79); }
            #${this.#element}::selection { background-color: rgba(152, 152, 152, 0.79); }`;
        document.head.appendChild(cosmos_style);

        this.$OBJ(cosmos).ATTR('style', `
            position: relative;
            margin: 0 auto;
            right: 0px;
            left: 0px;
            display: block;
            width: ${this.#attr.width};
            height: ${this.#attr.height};
            min-width: 650px;
            min-height: 690px;
            max-height: ${this.#attr.height};
            color: ${this.#attr.fgColor};
            font-size: 14px;
            font-family: ${this.#attr.fontName};
            z-index: 1;
            border: 4px solid ${this.#attr.tlColor};
            border-radius: 8px;
        `);
        this.$OBJ(cosmos_title).ATTR('style', `
            width: 98.6%;
            height: 18px; 
            padding-left: 1.5%;
            padding-top: 4px;
            background-color: ${this.#attr.tlColor};
            color: white;
            font-size: 13px;
            font-weight: 100;
            line-height: 16px;
            z-index: 1;
            user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        `);
        this.$OBJ(cosmos_title).ATTR('id', this.#hexID.title);
        this.$OBJ(cosmos_title).TEXT(this.#attr.title);

        this.$OBJ(cosmos_body).ATTR('style', `
            width: 100%;
            height: calc(100% - 22px);
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            background-color: rgba(${this.#hexRGB(this.#attr.bgColor)}, ${this.#attr.opacity});
            z-index: 1;
            overflow: hidden;
            user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        `);
        this.$OBJ(cosmos_body).ATTR('id', this.#hexID.body);

        cosmos.append(cosmos_title, cosmos_body);
        this.$ID(this.#element).append(cosmos);

        this.$OBJ(detail).ATTR('style', `
            position: relative;
            margin: 0 auto;
            right: 0px;
            left: 0px;
            display: block;
            width: ${this.#attr.width};
            height: 100px;
            min-width: 650px;
            min-height: 100px;
            max-height: 100px;
            color: ${this.#attr.fgColor};
            margin-top: 10px;
            font-size: 14px;
            font-family: ${this.#attr.fontName};
            z-index: 1;
            border: 4px solid ${this.#attr.tlColor};
            border-radius: 8px;
        `);
        this.$OBJ(detail_title).ATTR('style', `
            width: 98.6%;
            height: 18px; 
            padding-left: 1.5%;
            padding-top: 4px;
            background-color: ${this.#attr.tlColor};
            color: white;
            font-size: 13px;
            font-weight: 100;
            line-height: 16px;
            z-index: 1;
            user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        `);
        this.$OBJ(detail_title).ATTR('id', this.#hexID.titleD);
        this.$OBJ(detail_title).TEXT('Data');

        this.$OBJ(detail_body).ATTR('style', `
            width: 100%;
            max-height: calc(100px - 22px);
            height: calc(100% - 22px);
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            background-color: rgba(${this.#hexRGB(this.#attr.bgColor)}, ${this.#attr.opacity});
            z-index: 1;
        `);
        this.$OBJ(detail_body).ATTR('id', this.#hexID.bodyD);

        detail.append(detail_title, detail_body);
        this.$ID(this.#element).append(detail);

        for(let loop = 0; loop <= 24; loop++)
        {
            this.$ID(this.#hexID.bodyD).innerHTML += `<div id="data${loop}" style="display: inline-block; width: 20%; text-align: center; font-size: 10px;"></div>`;
        }

        this.$OBJ(terminal).ATTR('style', `
            position: relative;
            margin: 0 auto;
            right: 0px;
            left: 0px;
            display: block;
            width: ${this.#attr.width};
            height: 100px;
            min-width: 650px;
            min-height: 100px;
            max-height: 100px;
            color: ${this.#attr.fgColor};
            margin-top: 10px;
            font-size: 14px;
            font-family: ${this.#attr.fontName};
            z-index: 1;
            border: 4px solid ${this.#attr.tlColor};
            border-radius: 8px;
        `);
        this.$OBJ(terminal_title).ATTR('style', `
            width: 98.6%;
            height: 18px; 
            padding-left: 1.5%;
            padding-top: 4px;
            background-color: ${this.#attr.tlColor};
            color: white;
            font-size: 13px;
            font-weight: 100;
            line-height: 16px;
            z-index: 1;
            user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        `);
        this.$OBJ(terminal_title).ATTR('id', this.#hexID.titleC);
        this.$OBJ(terminal_title).TEXT('Command');

        this.$OBJ(terminal_body).ATTR('style', `
            width: 100%;
            height: calc(100% - 22px);
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            background-color: rgba(${this.#hexRGB(this.#attr.bgColor)}, ${this.#attr.opacity});
            z-index: 1;
        `);
        this.$OBJ(terminal_body).ATTR('id', this.#hexID.bodyC);

        this.$OBJ(terminal_text).ATTR('style', `
            display: inline-block;
            width: 98%;
            height: auto;
            min-width: 0px;
            float: left;
            max-width: 98%;
            max-height: calc(100px - 45px);
            font-size: ${this.#attr.fontSize}px;
            white-space: normal;
            margin-top: 3px;
            resize: none;
            padding-left: 1%;            
            background-color: rgba(0, 0, 0, 0);
            color: white;
            border: none;
            border-right: 0px solid transparent;
            overflow-x: hidden;
            overflow-y: visible;
            caret-color: transparent;
            outline: none;
            z-index: 1;
            text-align: left;
            line-break: anywhere;
            word-break: normal;
        `);
        this.$OBJ(terminal_text).ATTR('id', this.#hexID.textC);

        this.$OBJ(terminal_input).ATTR('style', `
            display: inline-block;
            width: auto;
            height: auto;
            min-width: 6px;
            float: left;
            max-width: 97%;
            font-size: ${this.#attr.fontSize}px;
            white-space: nowrap;
            resize: none;
            padding-left: 1%;
            background-color: rgba(0, 0, 0, 0);
            color: white; border: none;
            border-right: 6px solid transparent;
            overflow: hidden;
            caret-color: transparent;
            outline: none;
            z-index: 1;
            text-align: left;
            line-break: auto;
            word-break: normal;
            user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
        `);
        this.$OBJ(terminal_input).ATTR('role', 'input');
        this.$OBJ(terminal_input).ATTR('contentEditable', 'true');
        this.$OBJ(terminal_input).ATTR('tabindex', '0');
        this.$OBJ(terminal_input).ATTR('autofocus', 'true');
        this.$OBJ(terminal_input).ATTR('id', this.#hexID.inputC);

        terminal.append(terminal_title, terminal_body);
        terminal_body.append(terminal_text, terminal_input);
        this.$ID(this.#element).append(terminal);
    
        const focus = () => {
            window.setTimeout(() => {
                let sel = window.getSelection();
                sel.selectAllChildren(this.$ID(terminal_input.id));
                sel.collapseToEnd();

                this.$ID(terminal_input.id).focus();
            }, 0);
        }
        focus();

        const execute = () => {
            this.$ID(terminal_text.id).innerHTML  += `$${this.$ID(terminal_input.id).TEXT()}<br>`;
            this.$ID(terminal_text.id).scrollTo(0, this.$ID(terminal_text.id).scrollHeight);            
            this.#addCommandHistory(this.$ID(terminal_input.id).TEXT());            
            this.#execute(this.#split(this.$ID(terminal_input.id).TEXT()));
            this.$ID(terminal_input.id).TEXT('');
        }

        const returnInput = () => {
            this.#privateDate   = this.$ID(terminal_input.id).TEXT();
            this.#waitInput     = false;
            this.$ID(terminal_input.id).TEXT('');           
        }

        const returnPrivateInput = () => {
            this.#privateDate       = this.#privateKeyStore;
            this.#privateKeyStore   = '';
            this.#waitPrivateInput  = false;
            this.$ID(terminal_input.id).TEXT('');
        }

        this.#defaultCommand();

        const elements = [];
        elements.push(this.#hexID.titleC);
        elements.push(this.#hexID.bodyC);

        for(let i = 0; i <= (elements.length - 1); i++){
            this.$ID(elements[i]).onfocus = () => {
                focus();
            }
            this.$ID(elements[i]).onmousedown = () => {
                focus();
            }
        }

        this.$ID(this.#hexID.textC).onfocus = (event) => {
            event.stopPropagation();
        }
        this.$ID(this.#hexID.textC).onmousedown = (event) => {
            event.stopPropagation();
        }

        const historyUp = () => {
            if(this.#historyIndex <= 0) { this.#historyIndex = 1; }

            if(this.#commandsHistory.length != 0) {
                this.#historyIndex -= 1;
                this.$ID(terminal_input.id).HTML(this.#commandsHistory[this.#historyIndex]);
                focus();
            }
        }

        const historyDown = () => {
            if(this.#historyIndex < (this.#commandsHistory.length - 1))
            {
                this.#historyIndex += 1;
                this.$ID(terminal_input.id).HTML(this.#commandsHistory[this.#historyIndex]);
                focus();
            }
        }

        this.$ID(this.#hexID.inputC).onkeyup = (event) => {
            if(this.#waitPrivateInput)
            {
                if(event.key == 'Backspace')
                { this.#privateKeyStore = this.#privateKeyStore.slice(0, -1); }                
                else if(event.keyCode >= 33 && event.keyCode <= 254)
                { 
                    if (event.shiftKey)
                    {
                        this.#privateKeyStore += event.key.toUpperCase();
                    } else
                    {
                        this.#privateKeyStore += event.key.toLowerCase();
                    }
                }      
                event.target.textContent = '*'.repeat(this.#privateKeyStore.length);
            }
        }
        this.$ID(this.#hexID.inputC).onkeydown = (event) => {
            if(event.key == 'Enter')
            {
                event.preventDefault();
                if(this.#waitInput)
                {
                    returnInput();
                }
                else if(this.#waitPrivateInput)
                {
                    returnPrivateInput();
                }
                else
                {
                    execute();
                }
            }
            if(this.#waitPrivateInput)
            {               
                event.preventDefault();
            }
            else if((event.key == 'ArrowRight') || (event.key == 'ArrowLeft')) {                
                event.preventDefault();
            }
            else if((event.key == 'End')|| (event.key == 'Home')) {
                event.preventDefault();
            }
            else if(event.key == 'ArrowUp') {
                event.preventDefault();
                historyUp();
            }
            else if(event.key == 'ArrowDown') {
                event.preventDefault();
                historyDown();
            }
        }
        this.$ID(this.#hexID.inputC).onmousedown = (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.setSelectionRange(
                event.currentTarget.selectionEnd,
                event.currentTarget.selectionEnd,
            );
            event.currentTarget.focus();
        }

        
        let datebar_svg    = this.$CREATENS('http://www.w3.org/2000/svg', 'svg');
        this.$OBJ(datebar_svg).ATTR('style', `
            width: 100%;
            height: 100%;
            z-index: 1;
            transform-origin: center center;
        `);
        this.$OBJ(datebar_svg).ATTR('id', 'datebar');
        cosmos_body.append(datebar_svg);

        let cosmos_svg    = this.$CREATENS('http://www.w3.org/2000/svg', 'svg');
        this.$OBJ(cosmos_svg).ATTR('style', `
            position: relative;
            display: inline-block;
            top: -100%;
            width: 100%;
            height: 100%;
            z-index: 1;
            transform-origin: center center;
        `);
        this.$OBJ(cosmos_svg).ATTR('id', 'cosmos');
        cosmos_body.append(cosmos_svg); 

        let scale = 1;
        this.$ID('cosmos').ADDEVENT('wheel', function(event) { 
            scale += event.deltaY * -0.001;
            scale = Math.min(Math.max(0.8, scale), 2.4);            
            document.getElementById('cosmos').style.transform = `scale(${scale})`;
        });

        for (let loop = 0; loop < this.#planets.length; loop++){
            if (this.$CAST(this.#planets[loop].distance, 'int') >= this.#farestPlanet)
            {
                this.#farestPlanet = this.$CAST(this.#planets[loop].distance, 'int');
            }
        }               

        this.#cosmosSize      = this.$ID('cosmos').getBoundingClientRect();
        this.#cosmosSizeHDiv  = this.#cosmosSize.height / 2;
        this.#cosmosSizeWDiv  = this.#cosmosSize.width / 2;
        this.#farestPlanetDPI = this.#farestPlanet / this.#cosmosSizeWDiv; 

        for (let loop = 0; loop < 12; loop++){
            let xFormul = this.$CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;             
            let x1Data = (3 * this.#multDPI) + xFormul + this.#cosmosSizeWDiv - 3,
                y1Data = this.#cosmosSizeHDiv - 20,
                x2Data = -200,
                y2Data = this.#cosmosSizeHDiv - 20;
            let newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, (loop * (360 / 12)) - 60);
            let line = this.$CREATENS('http://www.w3.org/2000/svg', 'line');
            let sign = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            this.$OBJ(line).ATTR('x1', x1Data);
            this.$OBJ(line).ATTR('y1', y1Data);
            this.$OBJ(line).ATTR('x2', newCord.x2);
            this.$OBJ(line).ATTR('y2', newCord.y2);
            this.$OBJ(line).ATTR('fill', 'none');
            this.$OBJ(line).ATTR('stroke', '#333333');
            this.$OBJ(line).ATTR('stroke-width', '0.6');
            this.$OBJ(line).ATTR('id', 'DivLine' + loop);            
            this.$ID('cosmos').appendChild(line);  
            newCord = this.#calcCoord(x1Data, y1Data, 180, 180, ((loop + 1) * (360 / 12) + 15) - 60);    
            this.$OBJ(sign).ATTR('x', newCord.x2);
            this.$OBJ(sign).ATTR('y', newCord.y2);
            this.$OBJ(sign).ATTR('text-anchor', 'middle');
            this.$OBJ(sign).ATTR('font-size', 8);
            this.$OBJ(sign).ATTR('fill', '#777777');
            this.$OBJ(sign).ATTR('id', 'Sign' + loop);
            this.$OBJ(sign).HTML('');
            this.$ID('cosmos').appendChild(sign);
        }
        
        for (let loop = 0; loop < this.#planets.length; loop++){
            let circute = this.$CREATENS('http://www.w3.org/2000/svg', 'circle');
            let xFormul = this.$CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;
            if((xFormul / loop) == 0 || isNaN(xFormul / loop) == true) { xFormul = 0; } else { xFormul = (xFormul / loop)}            
            this.$OBJ(circute).ATTR('cx', this.#cosmosSizeWDiv);
            this.$OBJ(circute).ATTR('cy', this.#cosmosSizeHDiv - 20);
            this.$OBJ(circute).ATTR('r', ((loop * this.#multDPI) + xFormul));
            this.$OBJ(circute).ATTR('fill', 'none');
            this.$OBJ(circute).ATTR('stroke', this.#planets[loop].color);
            this.$OBJ(circute).ATTR('stroke-width', '0.8');
            this.$OBJ(circute).ATTR('id', this.#planets[loop].name + 'Outline');
            this.$ID('cosmos').appendChild(circute);
        }

        {        
            let circute     = this.$CREATENS('http://www.w3.org/2000/svg', 'circle');
            let xFormul     = this.$CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;
            let earthForul  = (3 * this.#multDPI) + (xFormul / 3) + this.#cosmosSizeWDiv;    
            let moonFormul  = this.$CAST(this.#moon.distance, 'int') / this.#farestPlanetDPI;            
            this.$OBJ(circute).ATTR('cx', earthForul);
            this.$OBJ(circute).ATTR('cy', this.#cosmosSizeHDiv - 20);
            this.$OBJ(circute).ATTR('r', 15);
            this.$OBJ(circute).ATTR('fill', 'none');
            this.$OBJ(circute).ATTR('stroke', 'white');
            this.$OBJ(circute).ATTR('stroke-width', '0.5');
            this.$OBJ(circute).ATTR('id',  'MoonOutline');
            this.$ID('cosmos').appendChild(circute);
        }

        for (let loop = 0; loop < this.#planets.length; loop++){
            let name    = this.#planets[loop].name;
            let planet  = this.$CREATENS('http://www.w3.org/2000/svg', 'circle');
            let text    = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            let degree    = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            let xFormul = this.$CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;                   
            if((xFormul / loop) == 0 || isNaN(xFormul / loop) == true) { xFormul = 0; } else { xFormul = (xFormul / loop)}            
            this.$OBJ(planet).ATTR('cx', (loop * this.#multDPI) + xFormul + this.#cosmosSizeWDiv);
            this.$OBJ(planet).ATTR('cy', this.#cosmosSizeHDiv - 20);
            this.$OBJ(planet).ATTR('r', 6);
            this.$OBJ(planet).ATTR('fill', this.#planets[loop].color);
            this.$OBJ(planet).ATTR('id', name);
            this.$ID('cosmos').appendChild(planet);
            this.$OBJ(text).ATTR('x', (loop * this.#multDPI) + xFormul + 8 + this.#cosmosSizeWDiv);
            this.$OBJ(text).ATTR('y', this.#cosmosSizeHDiv - 20);
            this.$OBJ(text).ATTR('text-anchor', 'start');
            this.$OBJ(text).ATTR('font-size', 10);
            this.$OBJ(text).ATTR('fill', this.#planets[loop].color);
            this.$OBJ(text).ATTR('id', name + 'Text');
            this.$OBJ(text).HTML(name.charAt(0));
            this.$ID('cosmos').appendChild(text);
            this.$OBJ(degree).ATTR('x', (loop * this.#multDPI) + xFormul + 8 + this.#cosmosSizeWDiv);
            this.$OBJ(degree).ATTR('y', this.#cosmosSizeHDiv - 9);
            this.$OBJ(degree).ATTR('text-anchor', 'start');
            this.$OBJ(degree).ATTR('font-size', 8);
            this.$OBJ(degree).ATTR('fill', this.#planets[loop].color);
            this.$OBJ(degree).ATTR('id', name + 'Degree');
            this.$OBJ(degree).HTML('0');
            this.$ID('cosmos').appendChild(degree);            
   
            this.$ID(this.#planets[loop].name).ADDEVENT('mouseover', function() { 
                document.getElementById(name + 'Text').ATTR('x', Number(document.getElementById(name + 'Text').ATTR('x')) + 6);
                document.getElementById(name + 'Text').HTML(name);
                document.getElementById(name).ATTR('r', 10);
                document.getElementById(name + 'Degree').ATTR('x', Number(document.getElementById(name + 'Degree').ATTR('x')) + 7);
            });

            this.$ID(this.#planets[loop].name).ADDEVENT('mouseleave', function() { 
                document.getElementById(name + 'Text').ATTR('x', Number(document.getElementById(name + 'Text').ATTR('x')) - 6);
                document.getElementById(name + 'Text').HTML(name.charAt(0));
                document.getElementById(name).ATTR('r', 6);
                document.getElementById(name + 'Degree').ATTR('x', Number(document.getElementById(name + 'Degree').ATTR('x')) - 7);
            });
        }
        this.$ID('SolarDegree').HTML('');

        {
            let moon        = this.$CREATENS('http://www.w3.org/2000/svg', 'circle');
            let title       = this.$CREATENS('http://www.w3.org/2000/svg', 'title');
            let text        = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            let degree      = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            let xFormul     = this.$CAST(this.#planets[3].distance, 'int') / this.#farestPlanetDPI;
            let earthForul  = (3 * this.#multDPI) + (xFormul / 3) + this.#cosmosSizeWDiv;        
            let moonFormul  = this.$CAST(this.#moon.distance, 'int') / this.#farestPlanetDPI;
            this.$OBJ(moon).ATTR('cx', earthForul + moonFormul + 15);
            this.$OBJ(moon).ATTR('cy', this.#cosmosSizeHDiv - 20);
            this.$OBJ(moon).ATTR('r', 3);
            this.$OBJ(moon).ATTR('fill', 'white');
            this.$OBJ(moon).ATTR('id', 'Moon');
            this.$ID('cosmos').appendChild(moon);
            this.$OBJ(text).ATTR('x', earthForul + moonFormul + 15 + 4);
            this.$OBJ(text).ATTR('y', this.#cosmosSizeHDiv - 20 - 4);
            this.$OBJ(text).ATTR('text-anchor', 'start');
            this.$OBJ(text).ATTR('font-size', 7);
            this.$OBJ(text).ATTR('fill', '#ffffff');
            this.$OBJ(text).ATTR('id', 'MoonText');
            this.$OBJ(text).HTML('M');
            this.$ID('cosmos').appendChild(text);
            this.$OBJ(degree).ATTR('x',earthForul + moonFormul + 15 + 4);
            this.$OBJ(degree).ATTR('y', this.#cosmosSizeHDiv - 20 + 4);
            this.$OBJ(degree).ATTR('text-anchor', 'start');
            this.$OBJ(degree).ATTR('font-size', 7);
            this.$OBJ(degree).ATTR('fill', '#ffffff');
            this.$OBJ(degree).ATTR('id', 'MoonDegree');
            this.$OBJ(degree).HTML('0');
            this.$ID('cosmos').appendChild(degree);     

            this.$ID('Moon').ADDEVENT('mouseover', function() { 
                document.getElementById('MoonText').ATTR('x', Number(document.getElementById('MoonText').ATTR('x')) + 6);
                document.getElementById('MoonText').HTML('Moon');
                document.getElementById('Moon').ATTR('r', 7);
                document.getElementById('MoonDegree').ATTR('x', Number(document.getElementById('MoonDegree').ATTR('x')) + 7);
            });

            this.$ID('Moon').ADDEVENT('mouseleave', function() { 
                document.getElementById('MoonText').ATTR('x', Number(document.getElementById('MoonText').ATTR('x')) - 6);
                document.getElementById('MoonText').HTML('M');
                document.getElementById('Moon').ATTR('r', 3);
                document.getElementById('MoonDegree').ATTR('x', Number(document.getElementById('MoonDegree').ATTR('x')) - 7);
            });
        }

        for (let loop = 0; loop < this.#zodiac.length; loop++) {
            let name = this.#zodiac[loop].name;
            this.$ID('Sign' + loop).HTML(this.#zodiac[loop].name.substring(0, 3));

            this.$ID('Sign' + loop).ADDEVENT('mouseover', function() { 
                document.getElementById('Sign' + loop).HTML(name);
            });

            this.$ID('Sign' + loop).ADDEVENT('mouseleave', function() { 
                document.getElementById('Sign' + loop).HTML(name.substring(0, 3));
            });
        }

        {
            let timeline    = this.$CREATENS('http://www.w3.org/2000/svg', 'line');
            this.$OBJ(timeline).ATTR('x1', 20);
            this.$OBJ(timeline).ATTR('y1', (this.#cosmosSize.height - 25));
            this.$OBJ(timeline).ATTR('x2', (this.#cosmosSize.width - 25));
            this.$OBJ(timeline).ATTR('y2', (this.#cosmosSize.height - 25));
            this.$OBJ(timeline).ATTR('stroke', 'white');
            this.$OBJ(timeline).ATTR('stroke-width', '2');
            this.$OBJ(timeline).ATTR('id', 'timeline');
            this.$ID('datebar').appendChild(timeline);
        }

        {
            let pointer     = this.$CREATENS('http://www.w3.org/2000/svg', 'circle');
            let text        = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            let date        = this.$CREATENS('http://www.w3.org/2000/svg', 'text');
            this.$OBJ(pointer).ATTR('cx', 20);
            this.$OBJ(pointer).ATTR('cy', (this.#cosmosSize.height - 25));
            this.$OBJ(pointer).ATTR('r', 7);
            this.$OBJ(pointer).ATTR('fill', 'white');
            this.$OBJ(pointer).ATTR('id', 'pointer');
            this.$ID('datebar').appendChild(pointer);            
            this.$OBJ(text).ATTR('x', 20);
            this.$OBJ(text).ATTR('y', (this.#cosmosSize.height - 35));
            this.$OBJ(text).ATTR('text-anchor', 'right');
            this.$OBJ(text).ATTR('font-size', 10);
            this.$OBJ(text).ATTR('fill', 'white');
            this.$OBJ(text).ATTR('id', 'pointerText');
            this.$OBJ(text).HTML('00000');
            this.$ID('datebar').appendChild(text);

            this.$OBJ(date).ATTR('x', 20);
            this.$OBJ(date).ATTR('y', (this.#cosmosSize.height - 10));
            this.$OBJ(date).ATTR('text-anchor', 'right');
            this.$OBJ(date).ATTR('font-size', 10);
            this.$OBJ(date).ATTR('fill', 'white');
            this.$OBJ(date).ATTR('id', 'payaDateText');
            this.$OBJ(date).HTML('Paya: 0.0.0.0');
            this.$ID('datebar').appendChild(date);
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

        if(typeof arguments[0] !== 'undefined') if(arguments[0] == 'reset') { 
            this.#defNowDateErr     = 0;
            this.#defDiffDateErr    = 0;
        };

        if(typeof arguments[0] !== 'undefined') if(this.#isDate(arguments[0]) == true && isNaN(arguments[0]) == true) { this.#defNowDateErr = ((nowDateErr - new Date(arguments[0])) / (1000 * 60 * 60 * 24 * 365.25)); }
        if(this.#defNowDateErr != 0) { diffDateErr -= this.#defNowDateErr;  }

        if(typeof arguments[0] !== 'undefined') if(this.#isDate(arguments[0]) == false && isNaN(arguments[0]) == false) { this.#defDiffDateErr = arguments[0]; }
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

            let xFormul = this.$CAST(this.#planets[loop].distance, 'int') / this.#farestPlanetDPI;                
            let x1Data  = (Number(this.$ID('Solar').ATTR('cx'))),
                y1Data  = (Number(this.$ID('Solar').ATTR('cy'))),
                x2Data  = (loop * this.#multDPI) + (xFormul / loop) + this.#cosmosSizeWDiv,
                y2Data  = (this.#cosmosSizeHDiv - 20),
                deData  = geoLongitude[planet];

            let newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, deData);        
            
            this.$ID(planet).ATTR('cx', newCord.x2);
            this.$ID(planet).ATTR('cy', newCord.y2);

            this.$ID(planet + 'Text').ATTR('x', newCord.x2 + 8);
            this.$ID(planet + 'Text').ATTR('y', newCord.y2);

            this.$ID(planet + 'Degree').ATTR('x', newCord.x2 + 9);
            this.$ID(planet + 'Degree').ATTR('y', newCord.y2 + 10);
            this.$ID(planet + 'Degree').HTML(deData.toFixed(0));  

            loop += 1;
        }

        this.#geoLongitude = geoLongitude;        
       
        this.$ID('MoonOutline').ATTR('cx', Number(this.$ID('Earth').ATTR('cx')));
        this.$ID('MoonOutline').ATTR('cy', Number(this.$ID('Earth').ATTR('cy')));

        this.$ID('Moon').ATTR('cx', Number(this.$ID('Earth').ATTR('cx')) + 15);
        this.$ID('Moon').ATTR('cy', Number(this.$ID('Earth').ATTR('cy')));

        this.$ID('MoonText').ATTR('x', Number(this.$ID('Earth').ATTR('cx')) + 15 + 4);
        this.$ID('MoonText').ATTR('y', Number(this.$ID('Earth').ATTR('cy')) - 4);

        this.$ID('MoonDegree').ATTR('x', Number(this.$ID('Earth').ATTR('cx')) + 15 + 4);
        this.$ID('MoonDegree').ATTR('y', Number(this.$ID('Earth').ATTR('cy')) + 4); 

        let vFormule        = (nowDateErr - MoonobservDateErr) / (1000 * 60 * 60) + (12) * (360 / (Number(this.#moon.orbitalPeriod)));
        let moonLongitude   = ((355.100  + (vFormule))) % 360;
        this.#moonLongitude = moonLongitude;

        let x1Data      = (Number(this.$ID('Earth').ATTR('cx'))),
            y1Data      = (Number(this.$ID('Earth').ATTR('cy'))),
            x2Data      = (Number(this.$ID('Moon').ATTR('cx'))),
            y2Data      = (Number(this.$ID('Moon').ATTR('cy'))),
            deData      = moonLongitude;

        let newCord     = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, deData);

        this.$ID('Moon').ATTR('cx', newCord.x2);
        this.$ID('Moon').ATTR('cy', newCord.y2);

        this.$ID('MoonText').ATTR('x', newCord.x2 + 4);
        this.$ID('MoonText').ATTR('y', newCord.y2 - 4);
        
        this.$ID('MoonDegree').ATTR('x', newCord.x2 + 4);
        this.$ID('MoonDegree').ATTR('y', newCord.y2 + 4);
        this.$ID('MoonDegree').HTML(moonLongitude.toFixed(0));


        for (let loop = 0; loop < 12; loop++){
            x1Data = (Number(this.$ID('Earth').ATTR('cx'))),
            y1Data = (Number(this.$ID('Earth').ATTR('cy'))),
            x2Data = -200,
            y2Data = (Number(this.$ID('Earth').ATTR('cy')));
            newCord = this.#calcCoord(x1Data, y1Data, x2Data, y2Data, (loop * 30));
            this.$ID('DivLine' + loop).ATTR('x1', x1Data);
            this.$ID('DivLine' + loop).ATTR('y1', y1Data);
            this.$ID('DivLine' + loop).ATTR('x2', newCord.x2);
            this.$ID('DivLine' + loop).ATTR('y2', newCord.y2);

            newCord = this.#calcCoord(x1Data, y1Data, Number(this.$ID('Earth').ATTR('cx')) - 200, Number(this.$ID('Earth').ATTR('cy')) + 50, ((loop + 1) * 30));
            this.$ID('Sign' + loop).ATTR('x', newCord.x2);
            this.$ID('Sign' + loop).ATTR('y', newCord.y2);
        }

        let cxData  = 0;
        let dayLeft = 0;
        if(diffDateErr <= firstCalDate)
        {
            cxData  = (periodCalDate - firstCalDate + diffDateErr).toFixed(3) * ((this.#cosmosSize.width - 40) / periodCalDate.toFixed(3));            
            this.$ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((firstCalDate - diffDateErr) * 365.25).toFixed(0);
        }
        else if(diffDateErr <= secondCalDate) {
            cxData = (diffDateErr - firstCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / (secondCalDate - firstCalDate).toFixed(3));
            this.$ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((secondCalDate - diffDateErr) * 365.25).toFixed(0);
        }
        else if(diffDateErr <= thirdCalDate) {
            cxData = (diffDateErr - secondCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / (thirdCalDate - secondCalDate).toFixed(3));
            this.$ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = ((thirdCalDate - diffDateErr) * 365.25).toFixed(0);
        } 
        else {
            cxData = (diffDateErr - thirdCalDate).toFixed(3) * ((this.#cosmosSize.width - 40) / periodCalDate.toFixed(3));
            this.$ID('pointer').ATTR('cx', cxData + 20);
            dayLeft = (((thirdCalDate + periodCalDate) - diffDateErr) * 365.25).toFixed(0);       
        }

        dayLeft = Number(dayLeft) + 1;
        
        this.$ID('pointerText').HTML(dayLeft);
        this.$ID('pointerText').ATTR('x', cxData + 30);

        this.#nowDate     = (((nowDateErr) / dFormula) + (diffDateErr) + ((observDateErr - nowDateErr) / dFormula) + (0.0013689253935660506)) * dFormula;

        let payaDate    = this.#PayaDate(new Date(this.#nowDate));
        let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
        let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
        let solarDate   = this.#SolarDate(new Date(this.#nowDate));
        let lunarDate   = this.#LunaDate(new Date(this.#nowDate));

        this.$ID('payaDateText').HTML(`Paya: ${payaDate.payaColossalYear}.${payaDate.payaLargeYear}.${payaDate.payaYear}.${payaDate.payaMonth}.${payaDate.payaDay}`);
        this.$ID('data0').TEXT(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}`);
        this.$ID('data1').TEXT(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}`);
        this.$ID('data2').TEXT(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}`);
        this.$ID('data3').TEXT(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}`);
        this.$ID('data4').TEXT(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}`);
        this.$ID('data14').TEXT(`Sign: ${this.#ZodiacSign(new Date(this.#nowDate))}`);
                    
        const entries = Object.entries(this.#geoLongitude);
        let calcValue   = 0,
            planetZod   = {};
        entries.unshift(['Moon', 0]);
        entries.unshift(['Solar', 0]);

        for (let loop = 0; loop <= 11; loop++) {
            for (let [key] of entries) {
                calcValue = this.#calDegree(Number(this.$ID('Earth').ATTR('cx')), Number(this.$ID('Earth').ATTR('cy')), Number(this.$ID(key).ATTR('cx')), Number(this.$ID(key).ATTR('cy')));  
                if(((loop + 6) * 30) % 360 <= calcValue && ((loop + 7) * 30) % 360 >= calcValue && key != 'Earth' && loop != 5) {
                    planetZod[key] = this.#zodiac[loop]['name'];                     
                }
                if(((loop + 6) * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && loop == 5) {
                    planetZod[key] = this.#zodiac[loop]['name'];                     
                }               
            }
        }

        this.$ID('data10').TEXT(`Sol:  ${planetZod['Solar'].substring(0, 3)}`);
        this.$ID('data11').TEXT(`Moo:  ${planetZod['Moon'].substring(0, 3)}`);
        this.$ID('data12').TEXT(`Mer:  ${planetZod['Mercury'].substring(0, 3)}`);
        this.$ID('data13').TEXT(`Ven:  ${planetZod['Venus'].substring(0, 3)}`);
        this.$ID('data15').TEXT(`Mar:  ${planetZod['Mars'].substring(0, 3)}`);
        this.$ID('data16').TEXT(`Jup:  ${planetZod['Jupiter'].substring(0, 3)}`);
        this.$ID('data17').TEXT(`Sat:  ${planetZod['Saturn'].substring(0, 3)}`);
        this.$ID('data18').TEXT(`Ura:  ${planetZod['Uranus'].substring(0, 3)}`);
        this.$ID('data20').TEXT(`Nep:  ${planetZod['Neptune'].substring(0, 3)}`);
        this.$ID('data21').TEXT(`Cer:  ${planetZod['Ceres'].substring(0, 3)}`);
        this.$ID('data22').TEXT(`Eri:  ${planetZod['Eris'].substring(0, 3)}`);
        this.$ID('data23').TEXT(`Hau:  ${planetZod['Haumea'].substring(0, 3)}`);
        this.$ID('data24').TEXT(`Mak:  ${planetZod['Makemake'].substring(0, 3)}`);
        if(typeof arguments[0] !== 'undefined') { 
            setTimeout(() => { this.#update(); }, 60000);
        };
    }

    /**
     *  @param {number} Value
     *  @return {string} Value
    */
    #addZero() {
        if(arguments.length <= 0) { return arguments[0]; }

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
        var partSplit   = zodiacDate.split("/");
        
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
        //Last 4 Months are 29 Days
        //Except Last Year

        if(LargeYear == 9 && Year == 9) {
            Month           = Math.floor((LastYear) / 28 % 12) + 1;                 //MIN: 1    MAX: 8
            Day             = Math.floor((LastYear) % 28) + 1;                      //MIN: 1    MAX: 28

            if((LastYear) >= 225 && (LastYear) <= 341) {
                Month           = Math.floor(((LastYear) - 224) / 29) + 9;          //MIN: 9    MAX: 12
                Day             = Math.floor(((LastYear) - 224) % 29) + 1;          //MIN: 1    MAX: 29           
            }
        }
        //Last Year is 12 Months
        //Last Year is 28 Day

        //Error Equal 1.14 Days
        //Doesn't Count on Calendar
        //New Year
        
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

    /**
     *  @param {string} ID
     *  @param {string} Text
     *  @param {string} Color Code
     */
    log() {
        this.#log(arguments[0], arguments[1], arguments[2]);
    }
    
    /**
     *  @param {string} ID
     *  @param {string} Text
     *  @param {string} Color Code
     */
    #log() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }
        if(typeof arguments[1] !== 'undefined') if(typeof arguments[1] !== 'string') { this.$ERROR('arg type mismatch'); }
        if(typeof arguments[2] !== 'undefined') if(typeof arguments[2] !== 'string') { this.$ERROR('arg type mismatch'); }

        if(this.#returnOutput)
        {
            this.#returnOutput = false;
            this.#outputString = arguments[0];
            return;
        }

        let color       = null,
            dateString  = '',
            logID       = `log${Date.now().toString()}`,
            date        = new Date();

        if(arguments[2] == null) {
            color = '#ffffff';
        } else {
            color = arguments[2];
        }

        if(arguments[1] != null) {
            if(this.$ID(arguments[0]) instanceof HTMLDivElement) {
                this.$ID(arguments[0]).innerHTML += `<div style="color:${color};" id="${logID}"></div>`;
                this.#lineID.set(logID);       
    
                if(this.#attr.dateOption == true)
                {
                    dateString = `[${this.#addZero(date.getHours())}:${this.#addZero(date.getMinutes())}:${this.#addZero(date.getSeconds())}:${this.#addZero(date.getMilliseconds()).toString().slice(0, 2)}]`;                
    
                    if(this.#attr.typeMode == true || arguments[3] == true)
                    {
                        for (let i = 0; i <= arguments[1].length + 13; i++) {
                            setTimeout(() => { this.$ID(logID).innerHTML += `${dateString} ${arguments[1].toString()}`.charAt(i); }, (i * 15));
                        }
                    }
                    else
                    {
                        this.$ID(logID).innerHTML += `${dateString} ${arguments[1].toString()}`;
                    }  
                }
                else {                
                    if(this.#attr.typeMode == true || arguments[3] == true)
                    {
                        for (let i = 0; i <= arguments[1].length; i++) {
                            setTimeout(() => { this.$ID(logID).innerHTML += arguments[1].charAt(i); }, (i * 15));
                        }
                    }
                    else
                    {
                        this.$ID(logID).innerHTML += arguments[1].toString();
                    }               
                }   
            }
            this.$ID(this.#hexID.textC).scrollTo(0, this.$ID(this.#hexID.textC).scrollHeight);          
        }
        else {
            this.#log(this.#hexID.textC, arguments[0], arguments[1] != undefined ? arguments[1] : undefined, arguments[2] != undefined ? arguments[2] : undefined);
        }        
    }

    /**
     *  @param {string} Command
     *  @param {object} Function
     *  @param {string} Instruction
     */
    addCommand() {
        if(!this.#attr.readOnly) this.#addCommand(arguments[0], arguments[1], arguments[2]);        
    }

    /**
     *  @param {string} Command
     *  @param {object} Function
     *  @param {string} Instruction
     */
    #addCommand() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }
        if(typeof arguments[1] !== 'undefined') if(typeof arguments[1] !== 'function') { this.$ERROR('arg type mismatch'); }
        if(typeof arguments[2] !== 'undefined') if(typeof arguments[2] !== 'string') { this.$ERROR('arg type mismatch'); }
        if(typeof arguments[3] !== 'undefined') if(typeof arguments[3] !== 'string') { this.$ERROR('arg type mismatch'); }

        if((arguments[0] != null && arguments[0] != '') && (arguments[1] != null)) {
            this.#commands.set(arguments[0].toString().toLowerCase(), arguments[1]);
            this.#commandsHelp.set(arguments[0].toString().toLowerCase(), arguments[2]);
            this.#commandsInstruct.set(arguments[0].toString().toLowerCase(), arguments[3]);
        }
    }

    /**
     *  @param {string} Command
     */
    removeCommand() {
        this.#removeCommand(arguments[0]);
    }

    /**
     *  @param {string} Command
     */
    #removeCommand() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }

        if((arguments[0] != null && arguments[0] != '')) {
            this.#commands.delete(arguments[0].toString().toLowerCase());
            this.#commandsHelp.delete(arguments[0].toString().toLowerCase());
        }
    }

    /**
     *  @param {string} Command
     */
    #addCommandHistory() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }

        if(arguments[0] != null && arguments[0] != '') {
            if(this.#commandsHistory.length == 0){
                this.#commandsHistory.push(arguments[0].toString().toLowerCase());
            }
            else {
                if(this.#commandsHistory[this.#commandsHistory.length - 1] != arguments[0].toString().toLowerCase()){
                    this.#commandsHistory.push(arguments[0].toString().toLowerCase());
                }
            }
            this.#historyIndex = (this.#commandsHistory.length);
        }
    }

    #sortCommand() {
        if(this.#commands.length != 0 && this.#commandsHelp.length != 0){
            this.#commandsHelp = new Map(Array.from(this.#commandsHelp).sort((a, b) => a[0].localeCompare(b[0])));
        }
    }

    #defaultCommand() {
        this.#addCommand('clear', function () {
            this.#lineID.clear();
            this.$ID(this.#hexID.textC).HTML('');            
        }, 'clear terminal screen'
         , '');

        this.#addCommand('date', function () {
            let date = new Date();
            this.#log(`${date.getFullYear()}/${this.#addZero(date.getMonth())}/${this.#addZero(date.getDate())}`);
        }, 'show date'
         , '');

        this.#addCommand('time', function () {
            let date = new Date();
            this.#log(`${this.#addZero(date.getHours())}:${this.#addZero(date.getMinutes())}:${this.#addZero(date.getSeconds())}`);
        }, 'show time'
         , '');

        this.#addCommand('get', function () {
            if(arguments.length <= 0) { this.$ERROR('require args'); }

            if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'object') { this.$ERROR('arg type mismatch'); }

            if(typeof arguments[0][0] !== 'undefined') if(typeof arguments[0][0] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][1] !== 'undefined') if(typeof arguments[0][1] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][2] !== 'undefined') if(typeof arguments[0][2] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][3] !== 'undefined') if(typeof arguments[0][3] !== 'string') { this.$ERROR('arg type mismatch'); }

            if(typeof arguments[0][1] !== 'undefined') {
                if (arguments[0][1].toLowerCase() == 'planet' && typeof arguments[0][2] === 'undefined') {
                    const entries = Object.entries(this.#geoLongitude);
                    let result = '';
    
                    for (let [key, value] of entries) {
                        result += `${key}:&nbsp;${value}<br>`;
                    }
                    this.#log(`${result}`);
                }
                if (arguments[0][1].toLowerCase() == 'planet' && typeof arguments[0][2] !== 'undefined' && typeof arguments[0][3] === 'undefined') {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    if(this.#objFindIndex(this.#geoLongitude, arguments[0][2]) != -1) {
                        this.#log(`${arguments[0][2]}:&nbsp;${this.#geoLongitude[arguments[0][2]]}<br>`);  
                    }
                    if(arguments[0][2] == 'Solar') {
                        this.#log(`Solar:&nbsp;0<br>`);  
                    }
                    if(arguments[0][2] == 'Moon') {
                        this.#log(`Moon:&nbsp;${this.#moonLongitude}<br>`);  
                    }
                    if(arguments[0][2].toLowerCase() == 'zod') {
                        const entries = Object.entries(this.#geoLongitude);
                        entries.unshift(['Moon', 0]);
                        entries.unshift(['Solar', 0]);
                        let result      = '',
                            calcValue   = 0;
    
                        for (let [key] of entries) {
                            calcValue = this.#calDegree(Number(this.$ID('Earth').ATTR('cx')), Number(this.$ID('Earth').ATTR('cy')), Number(this.$ID(key).ATTR('cx')), Number(this.$ID(key).ATTR('cy')));
                            result += `${key}:&nbsp;${calcValue}<br>`;
                        }
                        this.#log(`${result}`); 
                    }
                }
                if (arguments[0][1].toLowerCase() == 'planet' && typeof arguments[0][2] !== 'undefined' && typeof arguments[0][3] !== 'undefined') {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    this.#geoLongitude['Solar'] = 0;
                    this.#geoLongitude['Moon'] = 0;
                    if(this.#objFindIndex(this.#geoLongitude, arguments[0][2]) != -1) {
                        if(arguments[0][3].toLowerCase() == 'zod') {
                            this.#log(`${arguments[0][2]}:&nbsp;${this.#calDegree(Number(this.$ID('Earth').ATTR('cx')), Number(this.$ID('Earth').ATTR('cy')), Number(this.$ID(arguments[0][2]).ATTR('cx')), Number(this.$ID(arguments[0][2]).ATTR('cy')))}<br>`);
                        }
                    }
                    delete this.#geoLongitude['Solar'];
                    delete this.#geoLongitude['Moon'];
                }
                if (arguments[0][1].toLowerCase() == 'time' && typeof arguments[0][2] === 'undefined') {
                    let nowDateErr = new Date();
                    this.#log(`Time: ${this.#addZero(nowDateErr.getHours())}:${this.#addZero(nowDateErr.getMinutes())}`);
                }
    
                if (arguments[0][1].toLowerCase() == 'sign' && typeof arguments[0][2] === 'undefined') {
                    this.#log(`Sign: ${this.#ZodiacSign(new Date(this.#nowDate))}`);
                }
    
                if (arguments[0][1].toLowerCase() == 'sign' && typeof arguments[0][2] !== 'undefined') {
                    arguments[0][2] = arguments[0][2].charAt(0).toUpperCase() + arguments[0][2].slice(1).toLowerCase();
                    
                    const entries = Object.entries(this.#geoLongitude);
                    entries.unshift(['Moon', 0]);
                    entries.unshift(['Solar', 0]);
                    let result      = '',
                        calcValue   = 0,
                        index       = this.#objIndexName(this.#zodiac, arguments[0][2]);
                            
                    for (let [key] of entries) {
                        calcValue = this.#calDegree(Number(this.$ID('Earth').ATTR('cx')), Number(this.$ID('Earth').ATTR('cy')), Number(this.$ID(key).ATTR('cx')), Number(this.$ID(key).ATTR('cy')));  
                        if(((index + 6) % 12 * 30) % 360 <= calcValue && ((index + 7) % 12  * 30) % 360 >= calcValue && key != 'Earth' && arguments[0][2] != 'Virgo') {
                            result += `${key}:&nbsp;${calcValue}<br>`;                      
                        }
                        if(((index + 6) % 12 * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && arguments[0][2] == 'Virgo') {
                            result += `${key}:&nbsp;${calcValue}<br>`;                 
                        }           
                    }
                    if(typeof arguments[0][3] !== 'undefined' && arguments[0][3] == 'adj') {
                        for (let [key] of entries) {
                            calcValue = this.#calDegree(Number(this.$ID('Earth').ATTR('cx')), Number(this.$ID('Earth').ATTR('cy')), Number(this.$ID(key).ATTR('cx')), Number(this.$ID(key).ATTR('cy')));  
                            if(((index + 0) % 12 * 30) % 360 <= calcValue && ((index + 1) % 12 * 30) % 360 >= calcValue && key != 'Earth'&& arguments[0][2] != 'Pisces') {
                                result += `${key}:&nbsp;${calcValue}<br>`;                  
                            }
                            if(((index + 0) % 12 * 30) % 360 <= calcValue && 360 >= calcValue && key != 'Earth' && arguments[0][2] == 'Pisces') {
                                result += `${key}:&nbsp;${calcValue}<br>`;                        
                            }             
                        }
                    }
                    
                    this.#log(`${result}`); 
                }
    
                if (arguments[0][1].toLowerCase() == 'date' && typeof arguments[0][2] === 'undefined') {
                    let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
                    let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
                    let solarDate   = this.#SolarDate(new Date(this.#nowDate));
                    let lunarDate   = this.#LunaDate(new Date(this.#nowDate));
    
                    this.#log(`Paya: ${0}.${0}.${0}.${0}<br>`);
                    this.#log(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}<br>`);
                    this.#log(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}<br>`);
                    this.#log(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}<br>`);
                    this.#log(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}<br>`);
                    this.#log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);       
                }
                if (arguments[0][1].toLowerCase() == 'date' && typeof arguments[0][2] !== 'undefined') {
                    switch(arguments[0][2].toLowerCase()) {
                        case 'paya':
                            let payaDate    = this.#PayaDate(new Date(this.#nowDate));
                            this.#log(`Paya: ${payaDate.payaColossalYear}.${payaDate.payaLargeYear}.${payaDate.payaYear}.${payaDate.payaMonth}.${payaDate.payaDay}`);
                            break;
                        case 'maya':
                            let mayaDate    = this.#MayaDate(new Date(this.#nowDate));
                            this.#log(`Maya: ${mayaDate.mayaBaktun}.${mayaDate.mayaKatun}.${mayaDate.mayaTun}.${mayaDate.mayaWinal}.${mayaDate.mayaKin}<br>`);
                            break;
                        case 'zodi':
                            let zodiacDate  = this.#ZodiacDate(new Date(this.#nowDate));
                            this.#log(`Zodi: ${this.#addZero(zodiacDate.zodiacYear)}/${this.#addZero(zodiacDate.zodiacMonth)}/${this.#addZero(zodiacDate.zodiacDay)}<br>`);
                            break;
                        case 'sola':
                            let solarDate   = this.#SolarDate(new Date(this.#nowDate));
                            this.#log(`Sola: ${this.#addZeroFA(solarDate.solarYear)}/${this.#addZeroFA(solarDate.solarMonth)}/${this.#addZeroFA(solarDate.solarDay)}<br>`);
                            break;
                        case 'luna':
                            let lunarDate   = this.#LunaDate(new Date(this.#nowDate));
                            this.#log(`Luna: ${this.#addZeroAR(lunarDate.hijriYear)}/${this.#addZeroAR(lunarDate.hijriMonth)}/${this.#addZeroAR(lunarDate.hijriDay)}<br>`);
                            break;
                        case 'juli':
                            this.#log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);
                            break;
                        default:
                            this.#log(`Juli: ${this.#addZero(new Date(this.#nowDate).getFullYear())}/${this.#addZero(new Date(this.#nowDate).getMonth() + 1)}/${this.#addZero(new Date(this.#nowDate).getDate())}<br>`);
                            break;
                    }
                }   
            }             
        }, 'read cosmos'
         , ' get &lt;date|time&gt; <br> get &lt;date&gt; &lt;paya|maya|zodi|sola|luna|juli&gt; <br>  get &lt;sign&gt; &lt;name&gt; &lt;adj&gt; <br>  get &lt;planet&gt; &lt;name&gt; &lt;zod&gt;');

        this.#addCommand('set', function () {
            if(arguments.length <= 0) { this.$ERROR('require args'); }

            if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'object') { this.$ERROR('arg type mismatch'); }

            if(typeof arguments[0][0] !== 'undefined') if(typeof arguments[0][0] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][1] !== 'undefined') if(typeof arguments[0][1] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][2] !== 'undefined') if(typeof arguments[0][2] !== 'string') { this.$ERROR('arg type mismatch'); }

            if(typeof arguments[0][1] !== 'undefined' && arguments[0][1].toLowerCase() == 'date') {
                if (typeof arguments[0][2] !== 'undefined' && isNaN(Number(arguments[0][2])) == false) {
                    this.update(Number(arguments[0][2]));            
                } 
                if (typeof arguments[0][2] !== 'undefined' && this.#isDate(arguments[0][2]) == true) {
                    this.update(arguments[0][2]);            
                }
                if (typeof arguments[0][2] !== 'undefined' && arguments[0][2].toLowerCase() == 'reset') {
                    this.update('reset');            
                }
            }                     
        }, 'update cosmos'
         , 'set &lt;date&gt; &lt;date|multiple|reset&gt;');

        this.#addCommand('sch', function () {
            if(arguments.length <= 0) { this.$ERROR('require args'); }

            if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'object') { this.$ERROR('arg type mismatch'); }

            if(typeof arguments[0][0] !== 'undefined') if(typeof arguments[0][0] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][1] !== 'undefined') if(typeof arguments[0][1] !== 'string') { this.$ERROR('arg type mismatch'); }
            if(typeof arguments[0][2] !== 'undefined') if(typeof arguments[0][2] !== 'string') { this.$ERROR('arg type mismatch'); }
            
            if (this.#commands.has(arguments[0][2].toLowerCase()) && arguments[0][2].toLowerCase() != 'sch') {
                const run = () => this.#commands.get(arguments[0][2].toLowerCase());
                this.$TIMEOUT(() => { run().call(this, arguments[0].splice(2, arguments[0].length)); }, (this.$CAST(arguments[0][1], 'number') * 1000) || 1000);                
            }                    
        }, 'Scheduale a Command'
         , 'sch &lt;time&gt; &lt;command&gt;');

        this.#addCommand('update', function () {
            this.#update(undefined);
        }, 'update information'
         , '');

        this.#addCommand('uptime', function () {
            const calcUpTime = new Date() - this.#upTime;
            this.#log(`${calcUpTime}`);
            
        }, 'show up time in milisecond'
         , '');

        this.#addCommand('exit', function () {
            this.$TIMEOUT(() => { this.#exit(); }, 100);
        }, 'terminate application'
         , '');

        this.#addCommand('history', function () {
            let _data = '';
            for(let i = 0; i <= (this.#commandsHistory.length - 2); i++){
                _data += `${this.#commandsHistory[i]}<br>`;
            }
            if(this.$TYPE(_data, 'empty'))
            { this.#log('no command in history'); }
            else
            { this.#log(_data); }
            
        }, 'list history commands'
         , '');

        this.#addCommand('help', function () {
            let _data = '';
            for(let [key, value] of this.#commandsHelp){
                _data += `${key}:&nbsp;${value}<br>`;
            }
            if(this.$TYPE(_data, 'empty'))
            { this.#log('no command is registered'); }
            else
            { this.#log(_data); }
        }, 'commands & helps'
         , '');

        this.#sortCommand();
    }

    /**
     *  @param {boolean} State
     */
    lock() {
        this.#lock(arguments[0]);
    }

    /**
     *  @param {boolean} State
     */
    #lock() {        
        if(arguments[0])
        {
            this.$ID(this.#hexID.inputC).contentEditable = false;
            this.$ID(this.#hexID.inputC).STYLE.display = 'none';            
        }
        else
        {
            this.$ID(this.#hexID.inputC).contentEditable = true;
            this.$ID(this.#hexID.inputC).STYLE.display = 'inline-block';
            this.$ID(this.#hexID.inputC).focus();
        }
    }

    /**
     *  @return {string} Data
     */
    async getInput() {
        return this.#getInput();
    }

    /**
     *  @return {string} Data
     */
    async #getInput() {
        this.$ID(this.#hexID.inputC).TEXT('');
        this.#waitInput     = true;
        this.#privateDate   = '';
        return new Promise(resolve => {
          const interval = setInterval(() => {
            if (this.#privateDate !== '') {
              clearInterval(interval);
              resolve(this.#privateDate);
              this.#privateDate = '';
            }
          }, 250);
        });
    }

    /**
     *  @return {string} Data
     */
    async getKeyInput() {
        return this.#getKeyInput();
    }

    /**
     *  @return {string} Data
     */
    async #getKeyInput() {
        this.$ID(this.#hexID.inputC).TEXT('');
        this.#waitPrivateInput  = true;
        this.#privateDate       = '';
        return new Promise(resolve => {
          const interval = setInterval(() => {
            if (this.#privateDate !== '') {
              clearInterval(interval);
              resolve(this.#privateDate);
              this.#privateDate = '';
            }
          }, 250);
        });
    }

    /**
     *  @param {string} Command
     *  @return {string} Result
     */
    runCommand() {
        return this.#runCommand(arguments[0]);
    }

    /**
     *  @param {string} Command
     *  @return {string} Result
     */
    async #runCommand() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }
   
        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'string') { this.$ERROR('arg type mismatch'); }        

        if(!this.$TYPE(arguments[0], 'empty'))
        {
            const _arguments = this.#split(arguments[0]); 
            if (_arguments[0] != undefined && _arguments[0] != '' ) {                  
                if (this.#commands.has(_arguments[0].toLowerCase())) {
                    this.#returnOutput = true;
                    if(_arguments[0] != 'help' && _arguments.includes('help') || _arguments.includes('?'))
                    {
                        return this.#commandsInstruct.get(_arguments[0].toLowerCase());
                    }
                    else
                    {
                        const run = () => this.#commands.get(_arguments[0].toLowerCase());
                        await run().call(this, _arguments);
                    }                    
                    const tempOutput = this.#outputString;
                    this.#outputString = '';
                    return tempOutput;
                } else {
                    return 'unknown command executed';
                }
            } else {
                return '';
            }
        }
        else { return ''; }
    }

    /**
     *  @param {array} Commands
     */
    #execute() {
        if(arguments.length <= 0) { this.$ERROR('require args'); }

        if(typeof arguments[0] !== 'undefined') if(typeof arguments[0] !== 'object') { this.$ERROR('arg type mismatch'); }        
        
        if (arguments[0][0] != undefined && arguments[0][0] != '' ) {               
            if (this.#commands.has(arguments[0][0].toLowerCase())) {
                if(arguments[0][0] != 'help' && arguments[0].includes('help') || arguments[0].includes('?'))
                {
                    let msg = this.#commandsHelp.get(arguments[0][0].toLowerCase());
                                            
                    if(this.#commandsInstruct.get(arguments[0][0].toLowerCase()) != '') {
                        msg += '<br>usage: ' + this.#commandsInstruct.get(arguments[0][0].toLowerCase());                        
                    }                    

                    this.#log(msg);
                }
                else
                {
                    const run = () => this.#commands.get(arguments[0][0].toLowerCase());
                    run().call(this, arguments[0]);
                }                
            } else {
                this.#log('unknown command executed');
            }
        } else {
            this.#log('');
        }
    }

    exit() {
        this.#exit();
    }

    #exit() {
        this.$ID(this.#element).HTML('');
        this.$ID(this.#element).ATTR('style', '');
    }
}