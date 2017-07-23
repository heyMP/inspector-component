const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');

/**
 * A short description of the object values.
 * Can be used to render tree node in ObjectInspector
 * or render objects in TableInspector.
 */
class ObjectValue extends HTMLElement {
  constructor({ object, styles }, { theme }) {
    super();

    const themeStyles = createStyles('ObjectValue', theme);
    const mkStyle = key => toCss({ ...themeStyles[key], ...styles });

    this.innerHTML = this.markup(typeof object);
  }

  markup(type) {
    switch (type) {
      case 'number':
        return (`<span style="${mkStyle('objectValueNumber')}">${object}</span>`);
      case 'string':
        return (`<span style="${mkStyle('objectValueString')}">${object}</span>`);
      case 'boolean':
        return (`<span style="${mkStyle('objectValueBoolean')}">${String(object)}</span>`);
      case 'undefined':
        return `<span style="${mkStyle('objectValueUndefined')}">undefined</span>`;
      case 'object':
        if (object === null) {
          return `<span style="${mkStyle('objectValueNull')}">null</span>`;
        }
        if (object instanceof Date) {
          return (`<span>${object.toString()}</span>`);
        }
        if (object instanceof RegExp) {
          return (`<span style="${mkStyle('objectValueRegExp')}">${object.toString()}</span>`);
        }
        if (Array.isArray(object)) {
          return `<span>${`Array[${object.length}]`}</span>`;
        }
        return (`<span>${object.constructor.name}</span>`);
      case 'function':
        return (`
          <span>
            <span style="${mkStyle('objectValueFunctionKeyword')}">function</span>
            <span style="${mkStyle('objectValueFunctionName')}">&nbsp;${object.name}()</span>
          </span>
        `);
      case 'symbol':
        return (`<span style="${mkStyle('objectValueSymbol')}">${object.toString()}</span>`);
      default:
        return `<span />`;
    }
  }
}
customElements.define('object-value', ObjectValue);