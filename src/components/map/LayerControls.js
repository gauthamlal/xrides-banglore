import React from "react";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";

const LayerControls = props => {
  const handleValueChange = (settingName, newValue) => {
    const { settings } = props;
    if (settings[settingName] !== newValue) {
      const newSettings = {
        ...props.settings,
        [settingName]: newValue
      };

      props.handleLayerSettings(newSettings);
    }
  };

  const { showSettings, toggleSettings, settings, plotTypes = {} } = props;

  const jsx = showSettings ? (
    <div className="layer-controls">
      <div className="controls-toggle__holder">
        <i className="controls-toggle fas fa-times" onClick={toggleSettings} />
      </div>
      {Object.keys(settings).map(key => (
        <div key={key}>
          <label>{plotTypes[key].displayName}</label>
          <div style={{ display: "inline-block", float: "right" }}>
            {settings[key]}
          </div>
          <Setting
            settingName={key}
            value={settings[key]}
            plopType={plotTypes[key]}
            onChange={handleValueChange}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="layer-controls controls-toggle__holder">
      <i className="controls-toggle fas fa-cog" onClick={toggleSettings} />
    </div>
  );

  return jsx;
};

const Setting = props => {
  const { plopType } = props;
  if (plopType && plopType.type) {
    switch (plopType.type) {
      case "range":
        return <Slider {...props} />;

      case "boolean":
        return <Checkbox {...props} />;
      default:
        return <input {...props} />;
    }
  }
};

const Checkbox = ({ settingName, value, onChange }) => {
  return (
    <div key={settingName}>
      <div className="input-group">
        <SemanticCheckbox
          toggle
          id={settingName}
          checked={value}
          onChange={e => onChange(settingName, e.target.checked)}
        />
        {/* <input
          type="checkbox"
          id={settingName}
          checked={value}
          onChange={e => onChange(settingName, e.target.checked)}
        /> */}
      </div>
    </div>
  );
};

const Slider = ({ settingName, value, plopType, onChange }) => {
  const { max = 100 } = plopType;

  return (
    <div key={settingName}>
      <div className="input-group">
        <div>
          <input
            type="range"
            id={settingName}
            min={0}
            max={max}
            step={max / 100}
            value={value}
            onChange={e => onChange(settingName, Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default LayerControls;
