import ReactDom, { findDOMNode } from 'react-dom'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Rnd from 'react-rnd-rotate'

export default class GestView extends Component {
    constructor(props) {
        super(props)

        const s = StyleSheet.flatten(props.style);

        this.state = {
            default: { x: s.left || 0, y: s.top || 0, width: s.width || 0, height: s.height || 0 }
        }
    }
    handleResize(e, direction, ref, delta, position) {
        if (this.props.toStyle) {
            let convert = {
                y: position.y,
                x: position.x,
                width: delta.newWidth,
                height: delta.newHeight,
                rotate: delta.degree
            }
            this.props.toStyle(convert);
        }
    }
    componentWillReceiveProps(np) {
        if (np.hideRotate && !this.props.hideRotate) {
            let node = findDOMNode(this);
            node.style.borderColor = 'transparent';
            for (var i = 0; i < node.children.length; i++) {
                let c = node.children[i];
                if (c.classList.length === 0) {
                    c.style.display = 'none';
                    break;
                }
            }
        }
    }
    render() {
        const state = this.state;

        return (
            <Rnd ref={"container"} default={state.default} style={this.props.style} onResize={this.handleResize.bind(this)}>
                {this.props.children}
            </Rnd>
        )
    }
}