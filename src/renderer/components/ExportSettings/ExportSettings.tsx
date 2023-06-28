import React from 'react';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { loadSettings } from 'renderer/store/settingsSlice';

function ExportSettings() {
  const dispatch = useDispatch();

  const handleExportSettings = () => {
    const ls = localStorage.getItem('persist:root');
    if (!ls) return;
    const { settings } = JSON.parse(ls);

    window.electron.ipcRenderer
      .invoke('export-settings', settings)
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
