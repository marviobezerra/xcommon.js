"use strict";
var SpecificationValidation = (function () {
    function SpecificationValidation() {
        this.Expressions = [];
    }
    SpecificationValidation.prototype.And = function (expression, condition, stopIfInvalid) {
        if (condition === void 0) { condition = true; }
        if (stopIfInvalid === void 0) { stopIfInvalid = false; }
        this.Expressions.push({ Expression: expression, Condition: condition, StopIfInvalid: stopIfInvalid });
        return this;
    };
    SpecificationValidation.prototype.Or = function (expression1, expression2, condition, stopIfInvalid) {
        if (condition === void 0) { condition = true; }
        if (stopIfInvalid === void 0) { stopIfInvalid = false; }
        this.Expressions.push({ Expression: function (arg) { return expression1(arg) || expression2(arg); }, Condition: condition, StopIfInvalid: stopIfInvalid });
        return this;
    };
    SpecificationValidation.prototype.Validate = function (entity) {
        var result = true;
        for (var _i = 0, _a = this.Expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            if (expression.Condition && !expression.Expression(entity)) {
                result = false;
                if (expression.StopIfInvalid) {
                    break;
                }
            }
        }
        return result;
    };
    return SpecificationValidation;
}());
exports.SpecificationValidation = SpecificationValidation;
//# sourceMappingURL=specification-validation.js.map