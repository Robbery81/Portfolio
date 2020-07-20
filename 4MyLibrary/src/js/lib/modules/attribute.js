import $ from '../core';

$.prototype.addAttr = function(name, value) {
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(name, value);
    }

    return this;
}