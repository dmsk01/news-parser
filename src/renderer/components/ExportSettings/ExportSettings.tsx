import React from 'react';
import { Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingsState, loadSettings } from 'renderer/store/settingsSlice';

function ExportSettings() {
  const dispatch = useDispatch();

  const settingsState = useSelector(
    (state: { settings: ISettingsState }) => state.settings
  );

  const handleExportSettings = () => {
    window.electron.ipcRenderer
      .invoke('export-settings', JSON.stringify(settingsState))
      .catch(console.log);
  };

  const handleImportSettings = async () => {
    const settings = await window.electron.ipcRenderer
      .invoke('import-settings')
      .catch(console.log);

    if (settings && typeof settings === 'string') {
      const jsonSettings = JSON.parse(settings);
      dispatch(loadSettings({ jsonSettings }));
    }
  };

  return (
    <Space size={10}>
      <Button onClick={handleExportSettings} type="primary" htmlType="button">
        Export settings
      </Button>
      <Button
        onClick={handleImportSettings}
        danger
        type="primary"
        htmlType="button"
      >
        Import settings
      </Button>
    </Space>
  );
}

export default ExportSettings;
