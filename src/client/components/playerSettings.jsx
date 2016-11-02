import React, {PropTypes} from 'react';

class PlayerSettings extends React.Component {
  render() {
    return (
      <div className='player-settings'>
        <div className='display-name'>
          <label>DISPLAY NAME</label>
          <input
            className='text-input'
            onChange={e => {
              this.props.setDisplayName(e.target.value);
            }}
            type='text'
            value={this.props.displayName} />
        </div>
      </div>
    );
  }
}

PlayerSettings.propTypes = {
  displayName: PropTypes.string,
  gameMode: PropTypes.string,
  setDisplayName: PropTypes.func,
  setGameMode: PropTypes.func
};


module.exports = PlayerSettings;
