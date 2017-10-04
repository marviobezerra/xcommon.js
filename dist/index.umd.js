/**
 * xcommon - Tools for TypeScript
 * @version v0.0.5
 * @author undefined
 * @link https://github.com/marviobezerra/xcommon.js#readme
 * @license ISC
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common/http"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common/http"], factory);
	else if(typeof exports === 'object')
		exports["xcommon.js"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common/http"));
	else
		root["xcommon.js"] = factory(root["ng"]["core"], root["ng"]["forms"], root["ng"]["commonHttp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var auto_form_1 = __webpack_require__(6);
var AutoFormService = /** @class */ (function () {
    function AutoFormService(formBuilder) {
        this.formBuilder = formBuilder;
    }
    AutoFormService.prototype.createNew = function () {
        return new auto_form_1.AutoForm(this.formBuilder);
    };
    AutoFormService.prototype.matchValidator = function (mainControlName) {
        var mainControl;
        var result = function (control) {
            if (!mainControl) {
                mainControl = control.parent.get(mainControlName);
                if (!mainControl) {
                    throw new Error("matchValidator(): main control is not found in parent group");
                }
                mainControl.valueChanges.subscribe(function () {
                    control.updateValueAndValidity();
                });
            }
            if (mainControl.value !== control.value) {
                return {
                    matchValidator: true
                };
            }
        };
        return result;
    };
    AutoFormService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], AutoFormService);
    return AutoFormService;
}());
exports.AutoFormService = AutoFormService;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExecuteMessageType;
(function (ExecuteMessageType) {
    ExecuteMessageType[ExecuteMessageType["Error"] = 1] = "Error";
    ExecuteMessageType[ExecuteMessageType["Warning"] = 2] = "Warning";
    ExecuteMessageType[ExecuteMessageType["Exception"] = 3] = "Exception";
})(ExecuteMessageType = exports.ExecuteMessageType || (exports.ExecuteMessageType = {}));
var EntityAction;
(function (EntityAction) {
    EntityAction[EntityAction["None"] = 0] = "None";
    EntityAction[EntityAction["New"] = 1] = "New";
    EntityAction[EntityAction["Update"] = 2] = "Update";
    EntityAction[EntityAction["Delete"] = 3] = "Delete";
})(EntityAction = exports.EntityAction || (exports.EntityAction = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(7);
var HttpUtilService = /** @class */ (function () {
    function HttpUtilService(http) {
        this.http = http;
        this.ApiBaseAddress = "/api/";
    }
    HttpUtilService.prototype.BuidlUrl = function () {
        var url = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            url[_i] = arguments[_i];
        }
        var result = [this.ApiBaseAddress].concat(url).join("/")
            .replace(new RegExp("//", "gm"), "/");
        return result;
    };
    HttpUtilService.prototype.BuildGetParams = function (entity) {
        var result = new http_1.HttpParams();
        if (!entity) {
            return result;
        }
        for (var property in entity) {
            if (entity.hasOwnProperty(property)) {
                var value = entity[property];
                if (!value) {
                    continue;
                }
                if (value === Object(value)) {
                    result = result.set(property, JSON.stringify(value));
                }
                else {
                    result = result.set(property, value);
                }
            }
        }
        return result;
    };
    HttpUtilService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HttpUtilService);
    return HttpUtilService;
}());
exports.HttpUtilService = HttpUtilService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auto_form_service_1 = __webpack_require__(1);
exports.AutoFormService = auto_form_service_1.AutoFormService;
var http_util_service_1 = __webpack_require__(4);
exports.HttpUtilService = http_util_service_1.HttpUtilService;
var entity_1 = __webpack_require__(3);
exports.ExecuteMessageType = entity_1.ExecuteMessageType;
exports.EntityAction = entity_1.EntityAction;
var guid_1 = __webpack_require__(8);
exports.Guid = guid_1.Guid;
var xcommon_js_module_1 = __webpack_require__(9);
exports.XCommonJsModule = xcommon_js_module_1.XCommonJsModule;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__(2);
var entity_1 = __webpack_require__(3);
var AutoForm = /** @class */ (function () {
    function AutoForm(formBuilder) {
        this.formBuilder = formBuilder;
        this.ActionKey = "Action";
        this.DisabledLits = [];
        this.IgnoreLits = [];
        this.Validators = [];
        this.PropertyRegEx = /\.([^\.;]+);?\s*\}$/;
    }
    AutoForm.prototype.Ignore = function (property) {
        this.IgnoreLits.push(this.PropertyRegEx.exec(property.toString())[1]);
        return this;
    };
    AutoForm.prototype.Disable = function (property, disable) {
        if (disable === void 0) { disable = true; }
        if (disable) {
            this.DisabledLits.push(this.PropertyRegEx.exec(property.toString())[1]);
        }
        return this;
    };
    // tslint:disable-next-line:max-line-length
    AutoForm.prototype.AddAsyncValidator = function (property, validator) {
        var propertyName = this.PropertyRegEx.exec(property.toString())[1];
        var existsValidator = this.Validators.find(function (c) { return c.property === propertyName; });
        if (existsValidator) {
            existsValidator.asyncValidator.push(validator);
            return this;
        }
        this.Validators.push({
            property: propertyName,
            async: true,
            isGroup: false,
            asyncValidator: [validator],
            validator: null
        });
        return this;
    };
    AutoForm.prototype.AddValidator = function (property, validator) {
        var propertyName = this.PropertyRegEx.exec(property.toString())[1];
        var existsValidator = this.Validators.find(function (c) { return c.property === propertyName; });
        if (existsValidator) {
            existsValidator.validator.push(validator);
            return this;
        }
        this.Validators.push({
            property: propertyName,
            async: false,
            isGroup: false,
            validator: [validator],
            asyncValidator: null
        });
        return this;
    };
    AutoForm.prototype.AddItemArray = function (property, formGroup, entity) {
        var result = this.BuildInternal(entity);
        formGroup.controls[this.PropertyRegEx.exec(property.toString())[1]].push(result);
        return result;
    };
    AutoForm.prototype.SetAction = function (form, action) {
        form.controls[this.ActionKey].setValue(action);
    };
    AutoForm.prototype.SetUpdate = function (form) {
        if (form.controls[this.ActionKey].value === entity_1.EntityAction.None) {
            form.controls[this.ActionKey].setValue(entity_1.EntityAction.Update);
        }
    };
    AutoForm.prototype.SetDisable = function (property, formGroup, disable) {
        var propertyName = this.PropertyRegEx.exec(property.toString())[1];
        var control = formGroup.controls[propertyName];
        if (disable) {
            control.disable({ onlySelf: true, emitEvent: true });
            return;
        }
        control.enable({ onlySelf: true, emitEvent: true });
    };
    AutoForm.prototype.Build = function (entity) {
        return this.BuildInternal(entity);
    };
    AutoForm.prototype.BuildInternal = function (entity) {
        var result = this.formBuilder.group({});
        var _loop_1 = function (property) {
            if (this_1.IgnoreLits.find(function (c) { return c === property; })) {
                return "continue";
            }
            var object = entity[property];
            if (object instanceof Array) {
                var arrayGroup = this_1.formBuilder.array([]);
                for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
                    var value = object_1[_i];
                    var item = this_1.BuildInternal(value);
                    this_1.OnEntityChange(item);
                    arrayGroup.push(item);
                }
                result.addControl(property, arrayGroup);
                return "continue";
            }
            if (object === Object(object) && !(object instanceof Date)) {
                var item = this_1.formBuilder.group([property], this_1.BuildInternal(object));
                this_1.OnEntityChange(item);
                result.addControl(property, item);
                return "continue";
            }
            result.addControl(property, this_1.formBuilder.control(entity[property]));
        };
        var this_1 = this;
        for (var property in entity) {
            _loop_1(property);
        }
        for (var _i = 0, _a = this.Validators; _i < _a.length; _i++) {
            var validator = _a[_i];
            if (validator.async) {
                result.controls[validator.property].setAsyncValidators(forms_1.Validators.composeAsync(validator.asyncValidator));
            }
            else {
                result.controls[validator.property].setValidators(forms_1.Validators.compose(validator.validator));
            }
        }
        for (var _b = 0, _c = this.DisabledLits; _b < _c.length; _b++) {
            var property = _c[_b];
            result.controls[property].disable({ onlySelf: true, emitEvent: true });
        }
        this.OnEntityChange(result);
        return result;
    };
    AutoForm.prototype.OnEntityChange = function (formGroup) {
        formGroup
            .valueChanges
            .subscribe(function (value) {
            if (value.Action === entity_1.EntityAction.None) {
                value.Action = entity_1.EntityAction.Update;
            }
        });
    };
    return AutoForm;
}());
exports.AutoForm = AutoForm;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.NewGuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            // tslint:disable:one-variable-per-declaration
            // tslint:disable:no-bitwise
            var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            // tslint:enable:one-variable-per-declaration
            // tslint:enable:no-bitwise
            return v.toString(16);
        });
    };
    Guid.Empty = function () {
        return "00000000-0000-0000-0000-000000000000";
    };
    return Guid;
}());
exports.Guid = Guid;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var auto_form_service_1 = __webpack_require__(1);
var http_util_service_1 = __webpack_require__(4);
var core_1 = __webpack_require__(0);
var XCommonJsModule = /** @class */ (function () {
    function XCommonJsModule() {
    }
    XCommonJsModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                auto_form_service_1.AutoFormService,
                http_util_service_1.HttpUtilService
            ]
        })
    ], XCommonJsModule);
    return XCommonJsModule;
}());
exports.XCommonJsModule = XCommonJsModule;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map