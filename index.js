var fighterr =  require('fighterr');
var isString = fighterr.isString;
var isFunction = fighterr.isFunction
var isArray = fighterr.isArray;

function reduce(getter, reducer) {
  var reducerIsFunction = isFunction(reducer);
  var reducerIsArray = isArray(reducer);

  if (!reducerIsFunction && !reducerIsArray) {
    throw new Error('reduce: reducer needs to be a function or array!');
  }

  if (reducerIsArray && !isFunction(reducer[reducer.length - 1])) {
    throw new Error('reduce: when reducer is defined as array, last member needs to be reduce function');
  }

  if (reducerIsFunction) {
    return [
      getter,
      reducer,
    ];
  }

  // otherwise reducer is defined through array
  if (isString(getter[0])) {
    return [[getter]].concat(reducer);
  }

  return [getter].concat(reducer);
}

function transform(getterList) {
  var wrapped = getterList.shift();
  var next = getterList.shift();

  while (next) {
    wrapped = reduce(wrapped, next);
    next = getterList.shift();
  }

  return wrapped;
}

module.exports = {
  transform: transform,
  reduce: reduce,
};
