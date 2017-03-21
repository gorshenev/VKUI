import './Input.css';
import React, { Component, PropTypes } from 'react';
import getClassName from '../../helpers/getClassName';
import removeObjectKeys from '../../lib/removeObjectKeys';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Input');

export default class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.initialValue || ''
    };
  }
  static propTypes = {
    type: PropTypes.oneOf([
      'text', 'password',
      'date', 'datetime-local', 'time', 'month',
      'email', 'number', 'tel', 'url'
    ]),
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    initialValue: PropTypes.string,
    onChange: PropTypes.func
  };
  static defaultProps = {
    type: 'text',
    initialValue: '',
    alignment: 'left'
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  render () {
    const { alignment } = this.props;
    const modifiers = {
      'Input--left': alignment === 'left',
      'Input--center': alignment === 'center',
      'Input--right': alignment === 'right'
    };

    return (
      <input
        className={classnames(baseClassNames, modifiers)}
        {...removeObjectKeys(this.props, ['onChange', 'initialValue', 'alignment'])}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
