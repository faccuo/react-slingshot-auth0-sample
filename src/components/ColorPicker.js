import React, { Component, PropTypes } from 'react';
import { SliderPicker} from 'react-color';
import TextField from 'material-ui/TextField';

class ColorPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: '#000000'
    };
  }

  render() {
    return (<div>
      <TextField
        disabled={true}
        hintText="Disabled Hint Text"
        floatingLabelText="Favourite color"
        value={this.state.color}
      />
      <SliderPicker onChangeComplete={this.updateColor.bind(this)} color={this.state.color}/>
    </div>);
  }

  updateColor(newColor) {
    this.setState({
      color: newColor.hex
    });
    this.props.onChange(newColor.hex);
  }
}

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
