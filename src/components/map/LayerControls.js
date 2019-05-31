import React from "react";

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

  const { settings, plotTypes = {} } = props;

  return (
    <div className="layer-controls">
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
  );
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
        <input
          type="checkbox"
          id={settingName}
          checked={value}
          onChange={e => onChange(settingName, e.target.checked)}
        />
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
