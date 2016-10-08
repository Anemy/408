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
        <div className='game-mode'>
          <label>GAME MODE</label>
          <div className='game-mode-select'>
            <select
              onChange={e => {
                this.props.setGameMode(e.target.value);
              }}
              value={this.props.gameMode}
            >
              <option value='ffa'>FREE FOR ALL</option>
              <option value='teams'>TEAMS</option>
            </select>
          </div>
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
